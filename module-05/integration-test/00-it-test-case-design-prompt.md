# Integration Test Case Design Prompt — Scene 1 (ออกแบบ Test Case)

> **วิธีใช้:** Copy prompt ด้านล่างไปวางใน Claude.ai หรือ Claude Desktop
> ใช้ได้กับ Conversation ทั่วไป ไม่ต้องสร้าง Project พิเศษ

---

## Context ของโปรเจ็กต์จริง (ใช้ประกอบการสาธิต)

- **โปรเจ็กต์:** PLA (Personal Learning Assistant)
- **Feature:** Quiz Submission
- **Stack:** Next.js 14, TypeScript, Vitest, In-memory MockStore (Phase 1)
- **Entry point ที่ทดสอบ:** `quizService.submit(quizId, answers, durationSeconds)` ใน `services/quiz.service.ts`
- **Flow จริงใน `quizService.submit()`:**
  ```
  quizService.submit(quizId, answers, durationSeconds)
       ↓
  store.getQuizById(quizId)          // คืน null → return null ทันที
       ↓
  answers.length === quiz.questions.length  // ไม่ตรง → return null
       ↓
  คำนวณ score inline                 // correct/total × 100 (round)
       ↓
  store.saveQuizAttempt(attempt)
       ↓
  store.getReviewSchedule(topicId)   // ดึง schedule เดิม (หรือ default 2.5)
       ↓
  calculateSM2(sm2Input)
       ↓
  store.saveReviewSchedule(schedule)
       ↓
  return attempt
  ```

---

## Prompt (copy ข้างล่างนี้)

```
คุณเป็น QA Engineer ที่ทำงานกับโปรเจ็กต์ Personal Learning Assistant (PLA)
เป็นเว็บแอปสำหรับนักศึกษาไทย สร้างด้วย Next.js 14 + TypeScript + Vitest

Feature: Quiz Submission — Integration Test
ต่างจาก Unit Test ตรงที่ ไม่ทดสอบ function เดี่ยวๆ
แต่ทดสอบว่า flow ทั้งหมดใน quizService.submit() ทำงานร่วมกับ store ได้ถูกต้อง

Entry point: quizService.submit(quizId: string, answers: number[], durationSeconds: number): QuizAttempt | null

Flow ที่เกิดขึ้นใน quizService.submit() (ทั้งหมดนี้เกิดขึ้นใน 1 call):
1. store.getQuizById(quizId) — คืน null ถ้า quiz ไม่มีในระบบ
2. ตรวจ answers.length === quiz.questions.length — return null ถ้าไม่ตรง
3. คำนวณ score = round(correct / total × 100)
4. store.saveQuizAttempt({ quizId, answers, score, completedAt, durationSeconds })
5. store.getReviewSchedule(topicId) — ดึง schedule เดิม หรือใช้ default (easeFactor=2.5)
6. calculateSM2({ score, easeFactor, repetitionInterval, consecutiveCorrect })
7. store.saveReviewSchedule(schedule)
8. return attempt

Data Layer: In-memory MockStore — ไม่มี database จริง ไม่ต้อง mock อะไร
เมื่อ saveQuizAttempt() ถูกเรียก → getQuizAttemptsByTopicId() จะเห็น record จริงๆ

Requirements ที่สำคัญ:
- score ≥ 60 = pass → consecutiveCorrect เพิ่ม, interval เพิ่มตาม SM-2
- score < 60 = fail → repetitionInterval = 1, consecutiveCorrect = 0
- quiz ไม่มีใน store หรือ answers.length ไม่ตรง → return null, ไม่มีอะไรถูก save เลย

กรุณาออกแบบ Integration Test Cases แยกเป็นกลุ่ม:
1. Happy Path (flow ปกติ ตอบถูกมากพอ)
2. Error Cases (quiz ไม่มีใน store, answers.length ไม่ตรง)
3. Schedule Progression (submit หลายรอบ → ดู interval เพิ่มตาม SM-2)
4. Store Integrity (หลาย topic ในการทดสอบเดียว → ข้อมูลไม่ปน)

สำหรับแต่ละ Test Case ให้ระบุ:
- IT-ID และชื่อที่บอก Flow และผลลัพธ์ที่คาดหวัง
- ประเภท (Happy Path / Error / Schedule / Integrity)
- สรุป Flow ที่จะเกิดขึ้น
- Expected Result ที่ตรวจสอบได้จาก store จริง
```

---

## ผลลัพธ์ที่คาดว่า AI จะตอบ (สำหรับเตรียมตัวก่อนบันทึก)

### Happy Path

| IT-ID | ชื่อ Test Case | ประเภท | Flow | Expected Result |
|-------|---------------|--------|------|----------------|
| IT-01 | ตอบถูกทั้งหมด → score 100, attempt และ schedule ถูก save | Happy Path | answers ทุกข้อ ตรงกับ `correctAnswer` → score=100 → saveQuizAttempt → calculateSM2 → saveReviewSchedule | `getQuizAttemptsByTopicId()` มี 1 record, `attempt.score = 100`, schedule บันทึกแล้ว |
| IT-02 | ตอบถูก 3/5 (score 60) → pass, consecutiveCorrect เพิ่ม | Happy Path | answers ถูก 3 ข้อ → score=60 → flow ปกติ | `schedule.consecutiveCorrect > 0`, `schedule.repetitionInterval ≥ 1` |
| IT-03 | ตอบถูก 2/5 (score 40) → fail, schedule reset | Happy Path | answers ถูก 2 ข้อ → score=40 → flow ปกติ | `schedule.repetitionInterval = 1`, `schedule.consecutiveCorrect = 0` |

### Error Cases

| IT-ID | ชื่อ Test Case | ประเภท | Flow | Expected Result |
|-------|---------------|--------|------|----------------|
| IT-04 | answers น้อยกว่า questions → return null, ไม่มีอะไร save | Error | answers.length ≠ quiz.questions.length → return null ทันที | `quizService.submit()` คืน `null`, `getQuizAttemptsByTopicId()` ว่างเปล่า |
| IT-05 | quizId ไม่มีใน store → return null ทันที | Error | store.getQuizById() คืน undefined → return null | `quizService.submit()` คืน `null`, ไม่มี attempt ใน store |

### Schedule Progression

| IT-ID | ชื่อ Test Case | ประเภท | Flow | Expected Result |
|-------|---------------|--------|------|----------------|
| IT-06 | submit ถูก 3 ครั้งติดกัน → interval เพิ่มตาม SM-2 | Progression | generate quiz ใหม่ต่อรอบ → submit ด้วย answers ถูกทุกครั้ง 3 รอบ | interval รอบ 1 = 1, รอบ 2 = 6, รอบ 3 > 6 |

### Store Integrity

| IT-ID | ชื่อ Test Case | ประเภท | Flow | Expected Result |
|-------|---------------|--------|------|----------------|
| IT-07 | quiz 2 topic ต่างกัน → schedule ไม่ปนกัน | Integrity | topicA ตอบถูกหมด (pass), topicB ตอบผิดหมด (fail) | `scheduleA.consecutiveCorrect = 1`, `scheduleB.consecutiveCorrect = 0` |
