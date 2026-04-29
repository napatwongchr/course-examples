# Test Data Prompt — Scene 5 (สร้าง Test Data สำหรับแต่ละ Test Case)

> **วิธีใช้:** ส่ง prompt นี้ใน **Claude conversation เดิมต่อจาก Scene 4**
> ไม่ต้องเริ่ม conversation ใหม่ — AI จะมีบริบท Test Cases จาก Scene 4 อยู่แล้ว

---

## Prompt (copy ข้างล่างนี้)

```
จาก Test Cases ที่เราออกแบบไว้ด้านบน
ช่วยสร้าง Test Data ที่ใช้จริงสำหรับแต่ละ Case ให้หน่อยครับ

โปรเจ็กต์นี้ใช้:
- Vitest + TypeScript
- calculateSM2 เป็น pure function — ไม่มี database, ไม่ต้อง mock อะไร
- SM2Input = { score, easeFactor, repetitionInterval, consecutiveCorrect }

สำหรับแต่ละ Case ให้ระบุ:
- Input: SM2Input object ที่ใช้จริง
- Expected Output: ค่าที่คาดหวัง หรือ condition ที่ต้อง assert

Format เป็นตาราง Markdown พร้อมคอลัมน์:
TC-ID | Input | Expected Output
```

---

## ผลลัพธ์ที่คาดว่า AI จะตอบ (สำหรับเตรียมตัวก่อนบันทึก)

| TC-ID | Input | Expected Output |
|-------|-------|----------------|
| TC-P01 | `{ score: 100, easeFactor: 2.5, repetitionInterval: 0, consecutiveCorrect: 0 }` | `{ repetitionInterval: 1, consecutiveCorrect: 1 }` |
| TC-P02 | `{ score: 100, easeFactor: 2.5, repetitionInterval: 1, consecutiveCorrect: 1 }` | `{ repetitionInterval: 6, consecutiveCorrect: 2 }` |
| TC-P03 | `{ score: 100, easeFactor: 2.5, repetitionInterval: 6, consecutiveCorrect: 2 }` | `{ repetitionInterval: 15, consecutiveCorrect: 3 }` |
| TC-P04 | `{ score: 100, easeFactor: 2.5, repetitionInterval: 0, consecutiveCorrect: 0 }` ซ้ำ 3 รอบ (ส่ง output ของรอบก่อนเป็น input) | interval รอบ1=1, รอบ2=6, รอบ3=15 |
| TC-N01 | `{ score: 40, easeFactor: 2.5, repetitionInterval: 10, consecutiveCorrect: 3 }` | `{ repetitionInterval: 1, consecutiveCorrect: 0 }` |
| TC-N02 | `{ score: 0, easeFactor: 2.5, repetitionInterval: 25, consecutiveCorrect: 5 }` | `{ repetitionInterval: 1, consecutiveCorrect: 0 }` |
| TC-E01 | `{ score: 60, easeFactor: 2.5, repetitionInterval: 0, consecutiveCorrect: 0 }` | `consecutiveCorrect: 1` (ไม่ reset) |
| TC-E02 | `{ score: 59, easeFactor: 2.5, repetitionInterval: 6, consecutiveCorrect: 3 }` | `{ repetitionInterval: 1, consecutiveCorrect: 0 }` |
| TC-E03 | `{ score: 0, easeFactor: 1.3, repetitionInterval: 1, consecutiveCorrect: 0 }` ซ้ำ 5 รอบ | `easeFactor ≥ 1.3` ทุกรอบ |
| TC-E04 | `{ score: 100, easeFactor: 2.5, repetitionInterval: 1, consecutiveCorrect: 0 }` | `nextReviewAt.getTime() > Date.now()` |

---

## ขั้นตอนหลังได้ Test Data

1. **Review** ว่า Expected Output ระบุชัดพอที่จะเขียน assertion ในโค้ด test ได้
2. **บันทึก** Test Data นี้ไว้ใน `demos/course-examples/module-05/unit-test/01-test-case-data.md`
3. ไปต่อ **Scene 3 ของ Lesson 5.5** เพื่อสร้างโค้ด Unit Test จาก Test Case + Test Data ที่ออกแบบไว้
