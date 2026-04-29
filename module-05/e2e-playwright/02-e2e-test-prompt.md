# E2E Test Prompt — Scene 2 (สั่ง Claude Code สร้าง Playwright Test)

> **วิธีใช้:** รัน Claude Code ใน Terminal แล้ว Paste prompt นี้
> Claude Code จะสร้างไฟล์ Playwright test ให้โดยอัตโนมัติ

---

## Prompt (copy ข้างล่างนี้)

```
ช่วยสร้าง E2E Test สำหรับฟีเจอร์ Topic Manager ของ PLA App โดยใช้ Playwright ให้หน่อยครับ

App URL: http://localhost:3000
Framework: Next.js (App Router), TypeScript
Test Framework: Playwright

Context:
- PLA Phase 1 ไม่มี authentication — ไม่ต้อง login ทุก test
- หน้า Topics อยู่ที่ /topics (ไม่ใช่ /admin/topics)
- Components ไม่มี data-testid → ใช้ role/label/text selector
- ลบ topic ใช้ window.confirm() — ต้องจัดการ dialog ด้วย page.on('dialog')

Test Cases ที่ต้องครอบคลุม:

1. Happy Path: สร้าง Topic ใหม่สำเร็จ
   - ไปหน้า /topics
   - กดปุ่ม getByRole('button', { name: 'New Topic' }) (เปิด dialog)
   - กรอก title ด้วย getByLabel('Title').fill("Machine Learning Basics")
   - กดปุ่ม getByRole('button', { name: 'Create' })
   - ตรวจสอบว่า getByText("Machine Learning Basics") ปรากฏในหน้า

2. Edge Case: ไม่กรอก title → ปุ่ม Create disabled
   - ไปหน้า /topics, กด New Topic
   - ไม่กรอก title
   - ตรวจสอบว่าปุ่ม Create disabled (required attribute)

3. Happy Path: ลบ Topic สำเร็จ
   - สร้าง topic ก่อน (ใช้ unique title ด้วย Date.now())
   - handle window.confirm ด้วย page.on('dialog', d => d.accept())
   - คลิก Trash icon บน card นั้น
   - ตรวจสอบว่า topic card นั้นหายจากหน้า

4. Edge Case: Empty state เมื่อไม่มี Topic
   - ไปหน้า /topics (เปิด browser ใหม่, store ยัง empty)
   - ตรวจสอบว่า getByText('No topics yet') ปรากฏ

เงื่อนไข:
- ใช้ TypeScript
- ใช้ role/label/text selector (ไม่ใช่ data-testid เพราะ component ไม่มี)
- ใช้ unique title (เช่น `Test Topic ${Date.now()}`) เพื่อป้องกัน conflict
- บันทึกที่ e2e/topics.spec.ts
- ไม่ต้องมี loginAs helper
```

---

## ตัวอย่างโครงสร้าง Test ที่คาดว่าจะได้

```typescript
import { test, expect } from '@playwright/test'

test.describe('Topics page', () => {
  test('สร้าง topic สำเร็จ → ปรากฏในรายการ', async ({ page }) => {
    await page.goto('/topics')

    // เปิด dialog
    await page.getByRole('button', { name: 'New Topic' }).click()

    // กรอกชื่อ (unique ป้องกัน conflict)
    const topicTitle = `Machine Learning Basics ${Date.now()}`
    await page.getByLabel('Title').fill(topicTitle)

    // submit
    await page.getByRole('button', { name: 'Create' }).click()

    // ตรวจผล
    await expect(page.getByText(topicTitle)).toBeVisible()
  })

  test('ไม่กรอก title → ปุ่ม Create disabled', async ({ page }) => {
    await page.goto('/topics')
    await page.getByRole('button', { name: 'New Topic' }).click()

    // ปุ่ม Create ควร disabled เมื่อ title ว่าง
    await expect(
      page.getByRole('button', { name: 'Create' })
    ).toBeDisabled()
  })

  test('ลบ topic → หายจากรายการ', async ({ page }) => {
    await page.goto('/topics')

    // สร้าง topic ก่อน
    const topicTitle = `Delete Me ${Date.now()}`
    await page.getByRole('button', { name: 'New Topic' }).click()
    await page.getByLabel('Title').fill(topicTitle)
    await page.getByRole('button', { name: 'Create' }).click()
    await expect(page.getByText(topicTitle)).toBeVisible()

    // handle window.confirm
    page.on('dialog', (dialog) => dialog.accept())

    // คลิก Trash icon
    await page.getByText(topicTitle).locator('..').locator('..').locator('..').getByRole('button').nth(1).click()

    // ตรวจว่าหายแล้ว
    await expect(page.getByText(topicTitle)).not.toBeVisible()
  })

  test('empty state เมื่อไม่มี topic', async ({ page }) => {
    // store reset ทุกครั้งที่ dev server restart — test นี้เหมาะรันก่อน test อื่น
    await page.goto('/topics')
    // ถ้า store ว่างจะเห็น empty state
    // ถ้าไม่ว่าง ใช้ browserContext ใหม่หรือ API reset
  })
})
```

> **อ้างอิง:** อิงจาก `components/topic-dialog.tsx` (Label "Title", Button "Create"),
> `components/topic-card.tsx` (Trash2 icon), `app/topics/page.tsx` (Button "New Topic", "No topics yet")

---

## เกณฑ์ตรวจสอบผลลัพธ์ (Criteria Check)

หลังรัน Claude Code และ `npx playwright test` ให้ตรวจว่า:

- [ ] ไฟล์ `e2e/topics.spec.ts` ถูกสร้าง
- [ ] ไม่มี `loginAs()` หรือ `/login` URL
- [ ] ใช้ `getByRole`, `getByLabel`, `getByText` — ไม่ใช้ `data-testid` ที่ไม่มีใน component
- [ ] URL ที่ใช้คือ `/topics` ไม่ใช่ `/admin/topics`
- [ ] มีการ handle `window.confirm` ด้วย `page.on('dialog', ...)`
- [ ] `npx playwright test` รันผ่านอย่างน้อย 2 เคส (บน dev server)
