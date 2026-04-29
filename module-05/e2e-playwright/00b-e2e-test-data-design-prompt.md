# E2E Test Data Design Prompt — Scene 2 (ออกแบบ Test Data)

> **วิธีใช้:** ส่ง prompt นี้ใน **Claude.ai conversation เดิม ต่อจาก Scene 1**
> ไม่ต้องเริ่ม conversation ใหม่ — AI จะมีบริบท E2E Cases จาก Scene 1 อยู่แล้ว

---

## Prompt (copy ข้างล่างนี้)

```
จาก E2E Test Cases ที่เราออกแบบไว้ด้านบน
ช่วยระบุ Test Data และ Selectors ที่ใช้จริงสำหรับแต่ละ Case ให้หน่อยครับ

โปรเจ็กต์นี้ใช้:
- Playwright + TypeScript
- URL base: http://localhost:3000
- Components ไม่มี data-testid → ใช้ role/label/text selector
- PLA Phase 1 ไม่มี authentication
- ลบ topic ใช้ window.confirm() → ต้อง page.on('dialog', d => d.accept())

Selectors จริงที่ได้จาก Components ใน PLA:
- ปุ่ม New Topic:     getByRole('button', { name: 'New Topic' })
- Input ชื่อ Topic:   getByLabel('Title')  ← id="title" ใน TopicDialog
- ปุ่ม Create:        getByRole('button', { name: 'Create' })
- Topic card text:    getByText(topicTitle)
- Empty state:        getByText('No topics yet')

สำหรับแต่ละ E2E Case ให้ระบุ:
1. URL ที่ต้องเปิด
2. Selectors ที่ใช้ในแต่ละ step
3. Test Data — ข้อมูลที่ใส่เข้า input (ถ้ามี)
4. Assertion — สิ่งที่ต้อง expect() บนหน้าจอ
5. วิธีป้องกัน data conflict ระหว่าง test runs

Format เป็นตาราง Markdown:
E2E-ID | URL | Key Selectors | Test Data | Assertion | Conflict Prevention
```

---

## ผลลัพธ์ที่คาดว่า AI จะตอบ (สำหรับเตรียมตัวก่อนบันทึก)

| E2E-ID | URL | Key Selectors | Test Data | Assertion | Conflict Prevention |
|--------|-----|--------------|-----------|-----------|---------------------|
| E2E-01 | `/topics` | `getByRole('button',{name:'New Topic'})` → `getByLabel('Title')` → `getByRole('button',{name:'Create'})` | title: `` `Test Topic ${Date.now()}` `` | `expect(page.getByText(title)).toBeVisible()` | ใช้ `Date.now()` ต่อ title |
| E2E-02 | `/topics` | `getByRole('button',{name:'New Topic'})` → `getByRole('button',{name:'Create'})` | title: (ว่าง — ไม่กรอก) | ปุ่ม Create disabled: `expect(page.getByRole('button',{name:'Create'})).toBeDisabled()` | ไม่มี data ต้อง isolate |
| E2E-03 | `/topics` | สร้าง topic ก่อน → `page.on('dialog',d=>d.accept())` → Trash icon | title: `` `Delete Me ${Date.now()}` `` | topic หาย: `expect(page.getByText(title)).not.toBeVisible()` | ใช้ `Date.now()` ต่อ title |
| E2E-04 | `/topics` | `getByText('No topics yet')` | ไม่มี topic ใน store | `expect(page.getByText('No topics yet')).toBeVisible()` | รันบน fresh store หรือก่อน test อื่น |

---

## ขั้นตอนหลังได้ Test Data

1. **Review** ว่าทุก Assertion ระบุ element ที่ตรวจสอบได้บนหน้าจอจริง
2. **บันทึก** Test Data นี้ไว้ใน `demo/module05/e2e-playwright/01-e2e-test-case-data.md` (หรืออัปเดต)
3. ไปต่อ **Scene 3** เพื่อสั่ง Claude Code สร้าง Playwright test จาก Test Case + Test Data ที่ออกแบบไว้
