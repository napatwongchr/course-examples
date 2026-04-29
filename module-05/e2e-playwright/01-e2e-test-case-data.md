# Test Case และ Test Data — E2E Test (Topic Manager)

> **ที่มา:** ออกแบบ E2E Test Case สำหรับฟีเจอร์ Topic Manager ของ PLA
> ใช้เป็น Input ให้ Claude Code สร้าง Playwright Test

---

## ฟีเจอร์ที่จะทดสอบ

**Topic Manager (F01)** — ผู้ใช้สร้าง, แก้ไข, และลบ Topic การเรียนส่วนตัวในระบบ PLA

**User Flow หลักที่ต้องทดสอบ:**
```
เปิดหน้า /topics → กดปุ่ม "New Topic" → กรอกชื่อ → กด Create → ตรวจว่าปรากฏในรายการ
```

> **หมายเหตุ:** PLA Phase 1 ไม่มี login/authentication — ผู้ใช้ทุกคน anonymous
> ไม่มีหน้า `/admin/topics` ไม่มี role admin/student

---

## E2E Test Cases

| TC-ID | ชื่อ Test Case | ประเภท | Steps | Expected Result |
|-------|---------------|--------|-------|----------------|
| E2E-01 | สร้าง Topic ใหม่สำเร็จ → ปรากฏในรายการ | Happy Path | 1. ไปหน้า `/topics`<br>2. กดปุ่ม `getByRole('button', { name: 'New Topic' })`<br>3. กรอก "Machine Learning Basics" ใน `getByLabel('Title')`<br>4. กดปุ่ม `getByRole('button', { name: 'Create' })` | card ที่มีข้อความ "Machine Learning Basics" ปรากฏในรายการ |
| E2E-02 | ไม่สามารถสร้าง Topic ที่ title ว่างได้ | Edge Case | 1. ไปหน้า `/topics`<br>2. กดปุ่ม New Topic<br>3. ไม่กรอก title<br>4. พยายามกด Create | ปุ่ม Create disabled (HTML required attribute) หรือ dialog ยังเปิดอยู่ |
| E2E-03 | ลบ Topic สำเร็จ → หายจากรายการ | Happy Path | 1. ไปหน้า `/topics`<br>2. สร้าง topic ก่อน (setup ด้วย API หรือ UI)<br>3. คลิก Trash icon บน card นั้น<br>4. confirm dialog | card นั้นหายจากรายการ |
| E2E-04 | หน้าแสดง empty state เมื่อยังไม่มี Topic | Edge Case | 1. ไปหน้า `/topics` (store เปล่า)<br>2. ดู UI | แสดงข้อความ "No topics yet" |

---

## Test Data

```
Test Topic:
  title: "Machine Learning Basics"
  description: "Introduction to ML concepts"

Unique title pattern (ป้องกัน conflict ระหว่าง test runs):
  title: `Test Topic ${Date.now()}`
```

---

## Selectors จริงจาก Components ใน PLA (ไม่มี data-testid)

```
ปุ่ม New Topic:       getByRole('button', { name: 'New Topic' })
Input Title:          getByLabel('Title')  ← id="title" ใน TopicDialog
Input Description:    getByLabel('Description (optional)')
ปุ่ม Create:          getByRole('button', { name: 'Create' })
Topic card text:      getByText('Machine Learning Basics')
ปุ่ม Delete (Trash):  getByRole('button', { name: /delete/i }) หรือ locator('.lucide-trash-2').first()
Empty state text:     getByText('No topics yet')
```

> อ้างอิงจาก `components/topic-dialog.tsx` (id="title"), `components/topic-card.tsx` (Trash2 icon),
> และ `app/topics/page.tsx` (button "New Topic", text "No topics yet")

---

## หมายเหตุสำหรับ Playwright

- PLA Phase 1 ใช้ **In-memory MockStore** — store reset ทุกครั้งที่ server รีสตาร์ท
- ถ้าต้องการ isolation ระหว่าง test แนะนำให้ใช้ `page.goto('/topics')` ในแต่ละ test
- ไม่มี database จริง ไม่ต้องทำ seed SQL ก่อนรัน
- Confirm dialog ใช้ `window.confirm()` → ใน Playwright ต้อง handle ด้วย `page.on('dialog', dialog => dialog.accept())`
