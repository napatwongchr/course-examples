# Integration Test Data Design Prompt — Scene 2 (ออกแบบ Test Data)

> **วิธีใช้:** ส่ง prompt นี้ใน **Claude.ai conversation เดิม ต่อจาก Scene 1**
> ไม่ต้องเริ่ม conversation ใหม่ — AI จะมีบริบท IT Cases จาก Scene 1 อยู่แล้ว

---

## Prompt (copy ข้างล่างนี้)

```
จาก Integration Test Cases ที่เราออกแบบไว้ด้านบน
ช่วยระบุ Test Data ที่ใช้จริงสำหรับแต่ละ Case ให้หน่อยครับ

โปรเจ็กต์นี้ใช้:
- Vitest + TypeScript
- In-memory MockStore — ใช้ store.saveQuiz() เพื่อ seed quiz พร้อม correctAnswer ที่รู้ค่าแน่นอน
- Quiz มี questions ที่แต่ละข้อมี field: correctAnswer (number, 0–3)
- quizService.submit(quizId, answers, durationSeconds) — ต้องส่ง durationSeconds ด้วยเสมอ
- answers เป็น number array ความยาวต้องเท่ากับ quiz.questions.length

สำหรับแต่ละ IT Case ให้ระบุ:
1. Quiz Setup — quiz มี questions กี่ข้อ, correctAnswer แต่ละข้อคืออะไร
2. Submit Call — quizService.submit(quizId, answers, durationSeconds) ที่ใส่เข้า test
3. Expected Store State — หลัง submit จบ ต้องตรวจ store ว่าอะไร
4. วิธี isolate — ใช้ UUID ยังไงให้ test ไม่ปนกัน

Format เป็นตาราง Markdown:
IT-ID | Quiz Setup | Submit Call | Expected Store State | Isolation Note
```

---

## ผลลัพธ์ที่คาดว่า AI จะตอบ (สำหรับเตรียมตัวก่อนบันทึก)

| IT-ID | Quiz Setup | Submit Call | Expected Store State | Isolation Note |
|-------|-----------|-------------|---------------------|----------------|
| IT-01 | 5 ข้อ (correctAnswer: [0,1,2,3,0]) | `submit(quizId, [0,1,2,3,0], 90)` ถูกทุกข้อ | `attempt.score = 100`, attempts มี 1 record, schedule บันทึกแล้ว | `randomUUID()` ต่อ topic |
| IT-02 | 5 ข้อ (correctAnswer: [0,1,2,3,0]) | `submit(quizId, [0,1,2,0,1], 60)` ถูก 3 ข้อ (score=60) | `schedule.consecutiveCorrect = 1`, `schedule.repetitionInterval ≥ 1` | `randomUUID()` ต่อ topic |
| IT-03 | 5 ข้อ (correctAnswer: [0,1,2,3,0]) | `submit(quizId, [0,1,0,0,1], 60)` ถูก 2 ข้อ (score=40) | `schedule.repetitionInterval = 1`, `schedule.consecutiveCorrect = 0` | `randomUUID()` ต่อ topic |
| IT-04 | 5 ข้อ | `submit(quizId, [0,1], 30)` (2 answers สำหรับ quiz 5 ข้อ) | return `null`, `getQuizAttemptsByTopicId()` ว่างเปล่า | `randomUUID()` ต่อ topic |
| IT-05 | ไม่ seed quiz | `submit("non-existent-id", [0,1,2,3,0], 30)` | return `null`, ไม่มี attempt ใน store | ใช้ UUID ที่ไม่ตรงกับ store |
| IT-06 | generate quiz ใหม่ต่อรอบ (topicId เดิม) | `submit(quizId, correctAnswers, 60)` × 3 รอบ | รอบ1: interval=1, รอบ2: interval=6, รอบ3>6 | `randomUUID()` ต่อ topic, สร้าง quiz ใหม่ต่อรอบ |
| IT-07 | quiz A (topicId A), quiz B (topicId B) | A: `submit(quizA.id, allCorrect, 60)`, B: `submit(quizB.id, allWrong, 60)` | `scheduleA.consecutiveCorrect=1`, `scheduleB.consecutiveCorrect=0` | UUID แยกกัน 2 ชุด |

---

## ขั้นตอนหลังได้ Test Data

1. **Review** ว่าแต่ละ IT Case มี Expected Store State ที่ตรวจสอบได้จริงจาก MockStore
2. **บันทึก** Test Data นี้ไว้ใน `demo/module05/integration-test/01-integration-test-case-data.md` (หรืออัปเดต)
3. ไปต่อ **Scene 3** เพื่อสร้างโค้ด Integration Test จาก Test Case + Test Data ที่ออกแบบไว้
