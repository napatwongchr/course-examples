# Test Case และ Test Data — Integration Test (Quiz Submission)

> **ที่มา:** ออกแบบจาก Lesson 5.19 ใช้เป็น Input ให้ Claude Code สร้าง Integration Test
> อิงจาก codebase จริงใน `pla-app-live-demo/pla`

---

## Entry Point ที่ทดสอบ

```typescript
// services/quiz.service.ts
quizService.submit(quizId: string, answers: number[], durationSeconds: number): QuizAttempt | null
```

**Flow จริงใน `quizService.submit()`:**
```
1. store.getQuizById(quizId)             → undefined  → return null
2. answers.length !== quiz.questions.length           → return null
3. score = Math.round((correct / total) * 100)
4. store.saveQuizAttempt({ id, quizId, answers, score, completedAt, durationSeconds })
5. store.getReviewSchedule(quiz.topicId) → existing schedule หรือ default (easeFactor=2.5)
6. calculateSM2({ score, easeFactor, repetitionInterval, consecutiveCorrect })
7. store.saveReviewSchedule(schedule)
8. return attempt
```

> **หมายเหตุ:** Phase 1 ใช้ **In-memory MockStore** (`store/mock-store.ts`) ไม่มี database จริง
> ทดสอบโดยดูสถานะ store จริงหลัง submit — ไม่ต้อง mock อะไร

---

## Integration Test Cases

| TC-ID | ชื่อ Test Case | ประเภท | Input | Expected Result |
|-------|---------------|--------|-------|----------------|
| IT-01 | ตอบถูกทั้งหมด → score 100, attempt ถูก save | Happy Path | answers ทุกข้อ ตรงกับ `q.correctAnswer`, durationSeconds=90 | `attempt.score = 100`, `getQuizAttemptsByTopicId()` มี 1 record |
| IT-02 | ตอบถูก 3/5 (score=60) → pass, schedule อัปเดต | Happy Path | answers ถูก 3 ข้อ จาก 5 ข้อ, durationSeconds=60 | `schedule.consecutiveCorrect > 0`, `schedule.repetitionInterval ≥ 1` |
| IT-03 | ตอบถูก 2/5 (score=40) → fail, schedule reset | Happy Path | answers ถูก 2 ข้อ จาก 5 ข้อ, durationSeconds=60 | `schedule.repetitionInterval = 1`, `schedule.consecutiveCorrect = 0` |
| IT-04 | answers น้อยกว่า questions → return null, ไม่มีอะไร save | Error Case | answers: `[0, 1]` สำหรับ quiz 5 ข้อ, durationSeconds=30 | `quizService.submit()` คืน `null`, `getQuizAttemptsByTopicId()` ว่างเปล่า |
| IT-05 | quizId ไม่มีใน store → return null ทันที | Error Case | quizId: `"non-existent-id"`, answers: `[0]` | `quizService.submit()` คืน `null`, ไม่มี attempt ใน store |
| IT-06 | submit ถูก 3 รอบติดกัน → interval เพิ่มตาม SM-2 | Schedule Progression | generate quiz ใหม่ต่อรอบ → ตอบถูกทุกข้อทุกรอบ 3 รอบ | interval รอบ1=1, รอบ2=6, รอบ3>6 |
| IT-07 | quiz 2 topic ต่างกัน → schedule ไม่ปนกัน | Store Integrity | topicA ตอบถูกหมด (pass), topicB ตอบผิดหมด (fail) | `scheduleA.consecutiveCorrect=1`, `scheduleB.consecutiveCorrect=0` |

---

## Stack สำหรับ Integration Test

- **Test Framework:** Vitest
- **Data Layer:** In-memory MockStore (`store/mock-store.ts`) — ใช้ของจริง ไม่ต้อง mock
- **Isolation:** ใช้ `randomUUID()` สร้าง topic ใหม่ต่อ test เพื่อไม่ให้ data ปน
- **File location:** `__tests__/quiz-service.integration.test.ts`
- **Import paths:**
  - `@/services/quiz.service`
  - `@/store/mock-store`
  - `@/types`

---

## Test Data Setup Pattern

```typescript
import { describe, it, expect } from 'vitest'
import { randomUUID } from 'crypto'
import { store } from '@/store/mock-store'
import { quizService } from '@/services/quiz.service'
import type { Quiz, Question } from '@/types'

// Helper: seed quiz ที่มี questions และ correctAnswer ที่รู้ค่าแน่นอน
// ใช้ store.saveQuiz() โดยตรง เพื่อควบคุม correctAnswer ของแต่ละ question
function seedQuiz(topicId: string, numQuestions = 5): Quiz {
  const questions: Question[] = Array.from({ length: numQuestions }, (_, i) => ({
    id: randomUUID(),
    quizId: '',          // กรอกหลัง quizId ถูกสร้าง
    questionText: `Question ${i + 1}`,
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: i % 4, // สลับ 0,1,2,3,0,1,...
    sourceNoteId: randomUUID(),
  }))

  const quiz: Quiz = {
    id: randomUUID(),
    topicId,
    noteIds: [],
    questions: questions.map(q => ({ ...q, quizId: '' })),
    generatedAt: new Date(),
    generatedBy: 'rule-based',
  }
  // ผูก quizId กลับ
  quiz.questions = quiz.questions.map(q => ({ ...q, quizId: quiz.id }))

  return store.saveQuiz(quiz)
}

// Helper: สร้าง topic และ quiz พร้อมใช้ต่อ test เดียว
function seedTopicAndQuiz(numQuestions = 5) {
  const topic = store.createTopic({ title: `Test Topic ${randomUUID()}` })
  const quiz = seedQuiz(topic.id, numQuestions)
  return { topic, quiz }
}
```

---

## หมายเหตุสำคัญ

- `quizService.submit()` รับ **3 parameter**: `quizId`, `answers`, `durationSeconds`
- `durationSeconds` ต้องใส่เสมอ — เก็บลงใน `QuizAttempt.durationSeconds`
- `quiz.questions[i].correctAnswer` เป็น field ที่เก็บ index คำตอบที่ถูกต้อง (0–3)
- การคำนวณ score เกิดขึ้น **inline** ใน `quizService.submit()` — ไม่ใช่ฟังก์ชันแยก
- MockStore เป็น **singleton** — ใช้ `randomUUID()` ต่อ topic เพื่อ isolate แทนการ reset
- `quizService.submit()` คืน `null` (ไม่ throw) เมื่อ quizId ไม่พบ หรือ answers.length ไม่ตรง
