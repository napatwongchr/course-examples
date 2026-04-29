# Integration Test Prompt — Scene 2 (สั่ง Claude Code สร้าง Integration Test)

> **วิธีใช้:** รัน Claude Code ใน Terminal แล้ว Paste prompt นี้
> Claude Code จะสร้างไฟล์ Integration Test ให้โดยอัตโนมัติ

---

## Prompt (copy ข้างล่างนี้)

```
ช่วยสร้าง Integration Test สำหรับ quizService ของ PLA Project ให้หน่อยครับ

Flow ที่ต้องทดสอบ:
quizService.generate(topicId) → store → generateQuizFromNotes()
quizService.submit(quizId, answers, durationSeconds) → score calculation → store.saveQuizAttempt() → calculateSM2() → store.saveReviewSchedule()

Test framework: Vitest + TypeScript
Data Layer: In-memory MockStore (store/mock-store.ts) — ใช้ของจริง ไม่ต้อง mock
Import paths: @/services/quiz.service, @/store/mock-store, @/types

Test Cases ที่ต้องครอบคลุม:

1. Quiz Generation
   - topic มี notes เนื้อหาพอ (≥ 3 ประโยคยาว) → generate คืน quiz ที่มี questions
   - topic มี notes น้อยเกินไป → generate คืน null

2. Quiz Submit — Happy Path
   - submit ถูกทุกข้อ → attempt.score = 100, บันทึกลง store
   - submit ถูก 3/5 (score=60) → pass, consecutiveCorrect เพิ่ม
   - submit ถูก 1/5 (score=20) → fail, schedule reset interval=1

3. Quiz Submit — Error Cases
   - quizId ไม่มีใน store → return null, ไม่มี attempt ใน store
   - answers.length ไม่ตรงกับ questions.length → return null

4. Schedule Progression
   - submit ถูก 3 รอบติดต่อกัน → interval = 1, 6, >6 ตามลำดับ

5. Store Integrity
   - quiz 2 topic ต่างกัน → schedule ไม่ปนกัน

เงื่อนไข:
- สร้าง helper function seedTopicWithNotes() ที่ใช้ store.createTopic() + store.createNote() พร้อม randomUUID()
- Notes ต้องมี key terms: ประโยคภาษาอังกฤษ ≥ 30 ตัวอักษร มีคำยาว > 4 ตัวอักษร
- ไม่ต้องมี beforeAll / afterAll / database connection ใดๆ
- บันทึกไฟล์ที่ __tests__/quiz-service.integration.test.ts
```

---

## ตัวอย่างโครงสร้าง Test ที่คาดว่าจะได้

```typescript
import { describe, it, expect } from 'vitest'
import { randomUUID } from 'crypto'
import { store } from '@/store/mock-store'
import { quizService } from '@/services/quiz.service'
import type { Quiz } from '@/types'

// Helper: seed topic + notes พร้อม content ที่ generateQuizFromNotes รับได้
function seedTopicWithNotes() {
  const topic = store.createTopic({ title: `Topic ${randomUUID()}` })
  store.createNote(topic.id, {
    content: 'Supervised learning is a type of machine learning where the model learns from labeled training data.',
  })
  store.createNote(topic.id, {
    content: 'Neural networks are computational models inspired by the structure of the human brain.',
  })
  store.createNote(topic.id, {
    content: 'Gradient descent is an optimization algorithm used to minimize the loss function during training.',
  })
  return topic
}

describe('quizService — generate', () => {
  it('returns a quiz with questions when notes have enough content', () => {
    const topic = seedTopicWithNotes()
    const quiz = quizService.generate(topic.id)
    expect(quiz).not.toBeNull()
    expect(quiz!.questions.length).toBeGreaterThan(0)
  })

  it('returns null when topic has no notes', () => {
    const topic = store.createTopic({ title: `Empty ${randomUUID()}` })
    const quiz = quizService.generate(topic.id)
    expect(quiz).toBeNull()
  })
})

describe('quizService — submit', () => {
  it('saves attempt with score 100 when all answers are correct', () => {
    const topic = seedTopicWithNotes()
    const quiz = quizService.generate(topic.id)!
    const correctAnswers = quiz.questions.map(q => q.correctAnswer)

    const attempt = quizService.submit(quiz.id, correctAnswers, 90)

    expect(attempt).not.toBeNull()
    expect(attempt!.score).toBe(100)

    const saved = store.getQuizAttemptsByTopicId(topic.id)
    expect(saved).toHaveLength(1)
    expect(saved[0].score).toBe(100)
  })

  it('returns null when quizId does not exist', () => {
    const result = quizService.submit('non-existent-id', [0, 1, 2], 30)
    expect(result).toBeNull()
  })

  it('returns null when answers length does not match questions', () => {
    const topic = seedTopicWithNotes()
    const quiz = quizService.generate(topic.id)!
    const result = quizService.submit(quiz.id, [0], 30)
    expect(result).toBeNull()
  })
})

describe('quizService — SM-2 schedule progression', () => {
  it('interval increases across 3 consecutive correct submissions', () => {
    const topic = seedTopicWithNotes()
    const intervals: number[] = []

    for (let round = 0; round < 3; round++) {
      const quiz = quizService.generate(topic.id)!
      const correctAnswers = quiz.questions.map(q => q.correctAnswer)
      quizService.submit(quiz.id, correctAnswers, 60)
      const schedule = store.getReviewSchedule(topic.id)!
      intervals.push(schedule.repetitionInterval)
    }

    expect(intervals[0]).toBe(1)
    expect(intervals[1]).toBe(6)
    expect(intervals[2]).toBeGreaterThan(6)
  })
})
```

---

## เกณฑ์ตรวจสอบผลลัพธ์ (Criteria Check)

หลังรัน Claude Code และ `npx vitest run` ให้ตรวจว่า:

- [ ] ไฟล์ `__tests__/quiz-service.integration.test.ts` ถูกสร้างขึ้น
- [ ] ไม่มี import prisma, ไม่มี vi.mock ใดๆ (ใช้ store จริง)
- [ ] มี `seedTopicWithNotes()` helper ที่สร้าง topic + notes จริงใน store
- [ ] มีการตรวจสอบ store จริง เช่น `store.getQuizAttemptsByTopicId()`, `store.getReviewSchedule()`
- [ ] รัน `npx vitest run` ผ่านทั้งหมด ไม่มี DB-related error
