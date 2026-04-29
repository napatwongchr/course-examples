# Unit Test Prompt — Scene 2 (สั่ง Claude Code เขียน Unit Test)

> **วิธีใช้:** รัน Claude Code ใน Terminal แล้ว Paste prompt นี้
> Claude Code จะสร้างไฟล์ test ให้โดยอัตโนมัติ

---

## Prompt (copy ข้างล่างนี้)

```
ช่วยสร้าง Unit Test สำหรับฟังก์ชัน calculateSM2 ใน lib/sm2.ts ให้หน่อยครับ

ไฟล์ที่ต้องทดสอบ: lib/sm2.ts
Test framework: Vitest + TypeScript
Import path: @/lib/sm2

หมายเหตุ: calculateSM2 เป็น pure function — ไม่มี database ไม่ต้อง mock อะไรเลย
ฟังก์ชันนี้ถูกเรียกใน quizService.submit() ทุกครั้งที่ผู้ใช้ส่งคำตอบ quiz

Test Cases ที่ต้องครอบคลุม:

1. Pass Path (score ≥ 60)
   - score=100, consecutive=0 → interval=1, consecutive=1
   - score=100, consecutive=1, interval=1 → interval=6, consecutive=2
   - score=100, consecutive=2, interval=6, EF=2.5 → interval=round(6×2.5)=15, consecutive=3
   - nextReviewAt ต้องอยู่ในอนาคตเสมอ

2. Fail Path (score < 60)
   - score=40, consecutive=3, interval=10 → interval=1, consecutive=0 (reset ทันที)
   - score=0 ต้องทำให้ reset เหมือนกัน

3. Boundary Values
   - score=60 (boundary pass) → ต้อง pass ไม่ reset
   - score=59 (boundary fail) → ต้อง fail และ reset

4. EaseFactor clamp
   - ไม่ว่า score จะเป็น 0 กี่รอบ easeFactor ต้องไม่ต่ำกว่า 1.3 เสมอ

เงื่อนไข:
- ชื่อ test สื่อความหมาย เช่น 'resets interval to 1 when score is below 60'
- จัดกลุ่มด้วย describe() แยกตาม scenario (pass / fail / boundary / easeFactor)
- บันทึกไฟล์ที่ __tests__/sm2.test.ts
```

---

## ตัวอย่างโครงสร้าง Test ที่คาดว่าจะได้

```typescript
import { describe, it, expect } from 'vitest'
import { calculateSM2 } from '@/lib/sm2'
import type { SM2Input } from '@/lib/sm2'

// ── Base input helper ─────────────────────────────────────
const base: SM2Input = {
  score: 100,
  easeFactor: 2.5,
  repetitionInterval: 1,
  consecutiveCorrect: 0,
}

describe('calculateSM2 — pass path (score ≥ 60)', () => {
  it('sets interval to 1 on first correct answer (consecutive=0)', () => {
    const result = calculateSM2({ ...base, score: 100, consecutiveCorrect: 0 })
    expect(result.repetitionInterval).toBe(1)
    expect(result.consecutiveCorrect).toBe(1)
  })

  it('sets interval to 6 on second consecutive correct', () => {
    const result = calculateSM2({ ...base, score: 100, consecutiveCorrect: 1, repetitionInterval: 1 })
    expect(result.repetitionInterval).toBe(6)
    expect(result.consecutiveCorrect).toBe(2)
  })

  it('multiplies interval by easeFactor from third correct onwards', () => {
    const result = calculateSM2({ ...base, score: 100, consecutiveCorrect: 2, repetitionInterval: 6 })
    expect(result.repetitionInterval).toBe(Math.round(6 * 2.5))  // 15
    expect(result.consecutiveCorrect).toBe(3)
  })

  it('nextReviewAt is always in the future', () => {
    const now = Date.now()
    const result = calculateSM2({ ...base, score: 100 })
    expect(result.nextReviewAt.getTime()).toBeGreaterThan(now)
  })
})

describe('calculateSM2 — fail path (score < 60)', () => {
  it('resets interval to 1 and consecutiveCorrect to 0 when score is 40', () => {
    const result = calculateSM2({ ...base, score: 40, consecutiveCorrect: 3, repetitionInterval: 10 })
    expect(result.repetitionInterval).toBe(1)
    expect(result.consecutiveCorrect).toBe(0)
  })

  it('resets when score is 0', () => {
    const result = calculateSM2({ ...base, score: 0, consecutiveCorrect: 5, repetitionInterval: 25 })
    expect(result.repetitionInterval).toBe(1)
    expect(result.consecutiveCorrect).toBe(0)
  })
})

describe('calculateSM2 — boundary values', () => {
  it('score 60 is treated as pass (not reset)', () => {
    const result = calculateSM2({ ...base, score: 60, consecutiveCorrect: 0 })
    expect(result.consecutiveCorrect).toBe(1)
  })

  it('score 59 is treated as fail (reset)', () => {
    const result = calculateSM2({ ...base, score: 59, consecutiveCorrect: 3 })
    expect(result.consecutiveCorrect).toBe(0)
    expect(result.repetitionInterval).toBe(1)
  })
})

describe('calculateSM2 — easeFactor clamp', () => {
  it('easeFactor never drops below 1.3 even after repeated failures', () => {
    let input: SM2Input = { ...base, easeFactor: 1.3, score: 0 }
    for (let i = 0; i < 5; i++) {
      const result = calculateSM2(input)
      expect(result.easeFactor).toBeGreaterThanOrEqual(1.3)
      input = { ...input, easeFactor: result.easeFactor, score: 0 }
    }
  })
})
```

---

## เกณฑ์ตรวจสอบผลลัพธ์ (Criteria Check)

หลังรัน Claude Code และ `npx vitest run` ให้ตรวจว่า:

- [ ] ไฟล์ `__tests__/sm2.test.ts` ถูกสร้างขึ้น
- [ ] มี describe block แยก pass / fail / boundary / easeFactor
- [ ] ชื่อ test อ่านแล้วเข้าใจว่าทดสอบอะไร
- [ ] ไม่มี import prisma หรือ vi.mock ใดๆ (pure function ไม่ต้อง mock)
- [ ] รัน `npx vitest run` แล้ว test ผ่านทั้งหมด
