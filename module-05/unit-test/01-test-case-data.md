# Test Case และ Test Data — Unit Test (calculateSM2)

> **ที่มา:** ออกแบบจาก Lesson 5.3 ใช้เป็น Input ให้ Claude Code สร้าง Unit Test
> อิงจาก codebase จริงใน `pla-app-live-demo/pla/lib/sm2.ts`

---

## ฟังก์ชันที่จะทดสอบ

```typescript
// lib/sm2.ts

export interface SM2Input {
  score: number          // 0–100 (คะแนน quiz ที่ submit)
  easeFactor: number     // ค่า EF ก่อนหน้า (default 2.5)
  repetitionInterval: number  // interval วันก่อนหน้า
  consecutiveCorrect: number  // จำนวนครั้งที่ผ่านติดต่อกัน
}

export interface SM2Output {
  nextReviewAt: Date
  easeFactor: number
  repetitionInterval: number
  consecutiveCorrect: number
}

export function calculateSM2(input: SM2Input): SM2Output
```

> **หมายเหตุ:** `calculateSM2` เป็น **pure function** — ไม่มี database ไม่ต้อง mock อะไร
> ถูกเรียกใน `quizService.submit()` ทุกครั้งที่ผู้ใช้ส่งคำตอบ quiz เพื่อคำนวณ review schedule ถัดไป

---

## Unit Test Cases

| TC-ID | ประเภท | Test Data (SM2Input) | Expected Result |
|-------|--------|----------------------|----------------|
| TC-P01 | Pass | score=100, EF=2.5, interval=0, consecutive=0 | interval=1, consecutive=1 |
| TC-P02 | Pass | score=100, EF=2.5, interval=1, consecutive=1 | interval=6, consecutive=2 |
| TC-P03 | Pass | score=100, EF=2.5, interval=6, consecutive=2 | interval=15, consecutive=3 |
| TC-P04 | Pass | score=100 ซ้ำ 3 รอบ ต่อเนื่องกัน | interval ต่อกัน = 1 → 6 → 15 |
| TC-N01 | Fail | score=40, EF=2.5, interval=10, consecutive=3 | interval=1, consecutive=0 (reset) |
| TC-N02 | Fail | score=0, EF=2.5, interval=25, consecutive=5 | interval=1, consecutive=0 (reset) |
| TC-E01 | Edge | score=60 (boundary pass), consecutive=0 | consecutive=1 (ไม่ reset) |
| TC-E02 | Edge | score=59 (boundary fail), consecutive=3 | interval=1, consecutive=0 |
| TC-E03 | Edge | score=0, EF=1.3 ซ้ำ 5 รอบ | easeFactor ≥ 1.3 ทุกรอบ (clamp) |
| TC-E04 | Edge | score=100, interval ใดก็ได้ | nextReviewAt.getTime() > Date.now() |

---

## Logic ของ SM-2 ที่ควรเข้าใจก่อนออกแบบ Test

```
quality = round(score / 100 × 5)   // 0–5

if quality >= 3 (pass — score ≥ 60):
  consecutive 0 → interval = 1
  consecutive 1 → interval = 6
  consecutive 2+ → interval = round(interval × easeFactor)
  consecutiveCorrect += 1
else (fail — score < 60):
  interval = 1
  consecutiveCorrect = 0

easeFactor = EF + (0.1 - (5 - quality) × (0.08 + (5 - quality) × 0.02))
easeFactor = max(1.3, easeFactor)   // clamp ต้องไม่ต่ำกว่า 1.3
nextReviewAt = now + interval days
```

---

## Stack ที่ใช้ในโปรเจ็กต์

- **Testing Framework:** **Vitest** (ไม่ใช่ Jest)
- **Language:** TypeScript
- **Mock:** ไม่ต้อง mock อะไร — `calculateSM2` เป็น pure function ทดสอบได้โดยตรง
- **File location:** `__tests__/sm2.test.ts`
- **Import path:** `@/lib/sm2`
