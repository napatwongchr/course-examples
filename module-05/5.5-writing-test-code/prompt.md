# 5.5 การเขียน Test Code จริงในแต่ละระดับด้วย Generative AI (Unit, Integration, End-to-End)

ช่วยเขียน unit tests สำหรับ calculateScore function ใน src/lib/score.ts
โดยใช้ Vitest + TypeScript

Function signature:
calculateScore(answers: number[], questions: Question[]): number

Business logic ที่ต้องทดสอบ:

1. คำนวณ score โดยเปรียบเทียบ answers[i] กับ questions[i].correctIndex
2. คืนค่า score เป็น percentage (0-100) แบบ Math.round
3. หาก questions ว่าง (length === 0) ให้ return 0

ต้องการ test ครอบคลุม:

- Happy path (คำตอบถูกทั้งหมด / บางส่วน / ไม่มีข้อถูก)
- Edge cases (questions ว่าง)

format: Vitest describe/it blocks พร้อม TypeScript types
ใช้ import alias @/\* และ import type { Question } from '@/types'
