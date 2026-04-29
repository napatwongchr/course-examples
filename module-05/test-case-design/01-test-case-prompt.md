# Test Case Design Prompt — Scene 4 (ออกแบบ Test Case ของ Unit Test)

> **วิธีใช้:** Copy prompt ด้านล่างไปวางใน Claude.ai หรือ Claude Desktop
> ใช้ได้กับ Conversation ทั่วไป ไม่ต้องสร้าง Project พิเศษ

---

## Context ของโปรเจ็กต์จริง (ใช้ประกอบการสาธิต)

- **โปรเจ็กต์:** PLA (Personal Learning Assistant)
- **Feature:** Quiz Submission
- **Stack:** Next.js 14, TypeScript, **Vitest**, In-memory MockStore (Phase 1)
- **Unit test target:** `calculateSM2()` ใน `lib/sm2.ts`
  - เป็น **pure function** — ไม่มี database ไม่ต้อง mock อะไร
  - ถูกเรียกใน `quizService.submit()` ทุกครั้งที่ผู้ใช้ส่งคำตอบ quiz
  - รับ `SM2Input` → คำนวณ interval / easeFactor / consecutiveCorrect → คืน `SM2Output`
- **เหตุผลที่ทดสอบ calculateSM2 แยก:** ถ้า algorithm คิดผิด review schedule ทั้งหมดจะพัง — unit test ช่วยตรวจจับปัญหานี้ก่อนที่จะไปถึง integration level

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

---

## Prompt (copy ข้างล่างนี้)

```
คุณเป็น QA Engineer ที่ทำงานกับโปรเจ็กต์ Personal Learning Assistant (PLA)
เป็นเว็บแอปสำหรับนักศึกษาไทย สร้างด้วย Next.js 14 + TypeScript + Vitest

Feature: Quiz Submission
ฟังก์ชันที่ต้องการ Unit Test: calculateSM2() ใน lib/sm2.ts
ฟังก์ชันนี้ถูกเรียกทุกครั้งที่ quizService.submit() ถูกเรียก
เพื่อคำนวณ review schedule ถัดไปจากคะแนน quiz ที่ส่ง

SM2Input:
  score: number           // 0–100 (คะแนน quiz)
  easeFactor: number      // ค่า EF ก่อนหน้า (default 2.5)
  repetitionInterval: number  // interval วันก่อนหน้า
  consecutiveCorrect: number  // จำนวนครั้งที่ผ่านติดต่อกัน

Requirements ที่สำคัญ:
- score ≥ 60 = pass (quality ≥ 3)
  - consecutive 0 → interval = 1
  - consecutive 1 → interval = 6
  - consecutive 2+ → interval = round(interval × easeFactor)
  - consecutiveCorrect เพิ่มขึ้น 1
- score < 60 = fail (quality < 3)
  - interval reset = 1, consecutiveCorrect reset = 0
- easeFactor อัปเดตตามสูตร SM-2: EF + (0.1 - (5-q) × (0.08 + (5-q) × 0.02))
- easeFactor ต้องไม่ต่ำกว่า 1.3 เสมอ (clamp)
- nextReviewAt ต้องอยู่ในอนาคตเสมอ (interval วัน นับจากปัจจุบัน)

กรุณาออกแบบ Test Cases แยกเป็น 3 กลุ่ม:
1. Pass Scenarios (score ≥ 60 — interval เพิ่มตาม consecutive)
2. Fail Scenarios (score < 60 — reset)
3. Edge Cases (boundary 59/60, easeFactor clamp, nextReviewAt อยู่ในอนาคต)

สำหรับแต่ละ Test Case ให้ระบุ:
- TC-ID และชื่อที่สื่อความหมาย
- Input ที่ใส่เข้าไป (SM2Input)
- Expected Output หรือ condition ที่ต้องตรวจ
```

---

## ผลลัพธ์ที่คาดว่า AI จะตอบ (สำหรับเตรียมตัวก่อนบันทึก)

### Pass Scenarios (score ≥ 60)

| TC-ID | ชื่อ | Input | Expected Output |
|-------|------|-------|----------------|
| TC-P01 | consecutive=0 → interval=1 | score=100, consecutive=0, EF=2.5, interval=0 | interval=1, consecutive=1 |
| TC-P02 | consecutive=1 → interval=6 | score=100, consecutive=1, EF=2.5, interval=1 | interval=6, consecutive=2 |
| TC-P03 | consecutive=2 → interval × EF | score=100, consecutive=2, EF=2.5, interval=6 | interval=15, consecutive=3 |
| TC-P04 | consecutive 3 รอบต่อเนื่อง → interval เพิ่มตาม SM-2 | score=100 ซ้ำ 3 รอบต่อกัน, EF=2.5 | interval รอบ1=1, รอบ2=6, รอบ3=15 |

### Fail Scenarios (score < 60)

| TC-ID | ชื่อ | Input | Expected Output |
|-------|------|-------|----------------|
| TC-N01 | score=40 → reset ทันที | score=40, consecutive=3, EF=2.5, interval=10 | interval=1, consecutive=0 |
| TC-N02 | score=0 → reset เช่นกัน | score=0, consecutive=5, EF=2.5, interval=25 | interval=1, consecutive=0 |

### Edge Cases

| TC-ID | ชื่อ | Input | Expected Output |
|-------|------|-------|----------------|
| TC-E01 | score=60 (boundary pass) | score=60, consecutive=0, EF=2.5, interval=0 | consecutive=1 (ไม่ reset) |
| TC-E02 | score=59 (boundary fail) | score=59, consecutive=3, EF=2.5, interval=6 | interval=1, consecutive=0 |
| TC-E03 | easeFactor clamp ที่ 1.3 | score=0, EF=1.3 ซ้ำ 5 รอบ | easeFactor ≥ 1.3 ทุกรอบ |
| TC-E04 | nextReviewAt อยู่ในอนาคต | score=100, interval=1 | nextReviewAt.getTime() > Date.now() |
