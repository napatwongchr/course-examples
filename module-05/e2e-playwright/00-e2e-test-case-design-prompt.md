# E2E Test Case Design Prompt — Scene 1 (ออกแบบ Test Case)

> **วิธีใช้:** Copy prompt ด้านล่างไปวางใน Claude.ai หรือ Claude Desktop
> ใช้ได้กับ Conversation ทั่วไป ไม่ต้องสร้าง Project พิเศษ

---

## Context ของโปรเจ็กต์จริง (ใช้ประกอบการสาธิต)

- **โปรเจ็กต์:** PLA (Personal Learning Assistant)
- **Feature:** Topic Manager (F01)
- **Stack:** Next.js (App Router), TypeScript, Playwright
- **User Flow หลักที่ต้องทดสอบ:**
  ```
  เปิดหน้า /topics
       ↓
  กดปุ่ม "New Topic"
       ↓
  กรอกชื่อ Topic
       ↓
  กดปุ่ม Create
       ↓
  ตรวจว่า topic ปรากฏในรายการ
  ```

---

## Prompt (copy ข้างล่างนี้)

```
คุณเป็น QA Engineer ที่ทำงานกับโปรเจ็กต์ Personal Learning Assistant (PLA)
เป็นเว็บแอปสำหรับนักศึกษาไทย สร้างด้วย Next.js + TypeScript + Playwright

Feature: Topic Manager — E2E Test
ต่างจาก Unit/Integration Test ตรงที่ ทดสอบในมุมผู้ใช้จริง
Playwright เปิด browser จริง → ทำ action เหมือน user → ตรวจผลบนหน้าจอ

Context ของแอป:
- หน้า Topics อยู่ที่ /topics
- PLA Phase 1 ไม่มี authentication — ไม่ต้อง login
- ผู้ใช้สามารถสร้าง, ดู, และลบ Topic ได้ในหน้าเดียว
- dialog popup สำหรับสร้าง topic

Actions ที่ user ทำได้:
1. กดปุ่ม "New Topic" → เปิด dialog
2. กรอก title ใน input field → กดปุ่ม Create → topic ปรากฏในรายการ
3. กดปุ่ม delete บน topic card → topic หายจากรายการ
4. เปิดหน้า /topics ตอนยังไม่มี topic → เห็น empty state

กรุณาออกแบบ E2E Test Cases แยกเป็นกลุ่ม:
1. Happy Path (user ทำ action สำเร็จ)
2. Edge Cases (input ไม่ถูกต้อง, state พิเศษ)

สำหรับแต่ละ Test Case ให้ระบุ:
- E2E-ID และชื่อที่บอกว่า user ทำอะไร → เห็นอะไร
- ประเภท (Happy Path / Edge Case)
- User Steps — สิ่งที่ user ทำตามลำดับ (action บน browser)
- Expected UI Result — สิ่งที่ต้องเห็นบนหน้าจอหลังทำ action
```

---

## ผลลัพธ์ที่คาดว่า AI จะตอบ (สำหรับเตรียมตัวก่อนบันทึก)

### Happy Path

| E2E-ID | ชื่อ Test Case | ประเภท | User Steps | Expected UI Result |
|--------|--------------|--------|------------|-------------------|
| E2E-01 | สร้าง Topic ใหม่ → ปรากฏในรายการ | Happy Path | 1. ไปหน้า /topics<br>2. กดปุ่ม New Topic (เปิด dialog)<br>3. กรอก "Machine Learning Basics"<br>4. กดปุ่ม Create | topic card ที่มีชื่อ "Machine Learning Basics" ปรากฏในรายการ |
| E2E-03 | ลบ Topic → หายจากรายการ | Happy Path | 1. ไปหน้า /topics<br>2. สร้าง topic ก่อน<br>3. กดปุ่ม delete บน topic card<br>4. ยืนยันการลบ | topic card นั้นหายจากรายการ |

### Edge Cases

| E2E-ID | ชื่อ Test Case | ประเภท | User Steps | Expected UI Result |
|--------|--------------|--------|------------|-------------------|
| E2E-02 | กด Create โดยไม่กรอก title → dialog ไม่ปิด | Edge Case | 1. ไปหน้า /topics<br>2. กดปุ่ม New Topic<br>3. ไม่กรอกอะไร<br>4. กดปุ่ม Create | dialog ยังเปิดอยู่ หรือแสดง validation error |
| E2E-04 | เปิดหน้าเมื่อยังไม่มี Topic → เห็น empty state | Edge Case | 1. ไปหน้า /topics (store เปล่า) | แสดงข้อความ empty state ไม่แสดง topic card |
