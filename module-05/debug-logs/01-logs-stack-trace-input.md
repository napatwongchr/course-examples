# Logs และ Stack Trace สำหรับ Demo — Scene 2

> **วิธีใช้:** Copy ทั้งหมดด้านล่าง → Paste ใน Claude.ai แล้วกด Send

---

## Input (copy ข้างล่างนี้ แล้ว Paste ใน Claude.ai)

```
ช่วยวิเคราะห์ Log และ Stack Trace นี้ให้หน่อยครับ
บอกว่าสาเหตุของ Error คืออะไร และวิธีแก้ไขทำยังไง

**Environment:** Next.js (App Router), TypeScript, In-memory MockStore (PLA Phase 1)
**เวลาที่เกิดปัญหา:** 2026-04-14 09:15:42 UTC
**พฤติกรรม:** User กด "Submit Quiz" แล้วหน้าจอแสดง 500 Internal Server Error

**Server Log (จาก Next.js Dev Server):**

[09:15:42.101] INFO  POST /api/quiz/550e8400-e29b-41d4-a716-446655440000/submit - Request received
[09:15:42.102] INFO  Parsed answers=[0,1,2,3,0] durationSeconds=95
[09:15:42.103] INFO  Fetching quiz from store...
[09:15:42.104] ERROR TypeError: Cannot read properties of undefined (reading 'questions')
    at POST (/app/app/api/quiz/[id]/submit/route.ts:22:52)
    at async /app/node_modules/next/dist/server/lib/router-utils/resolve-routes.js:249:32
[09:15:42.105] INFO  Response: 500 Internal Server Error

**Stack Trace:**

TypeError: Cannot read properties of undefined (reading 'questions')
    at POST (/app/app/api/quiz/[id]/submit/route.ts:22:52)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

**โค้ดส่วนที่เกิด Error (route.ts ฉบับ buggy — บรรทัด 1-30):**

import { NextResponse } from 'next/server'
import { quizService } from '@/services/quiz.service'
import { SubmitQuizSchema } from '@/lib/validators'

type Params = { params: Promise<{ id: string }> }

export async function POST(request: Request, { params }: Params) {
  const { id } = await params

  // ❌ BUG: ตรวจสอบ answers ก่อน แต่ยังไม่ได้ดึง quiz มา
  const body = await request.json()
  const parsed = SubmitQuizSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const quiz = quizService.getById(id)

  // ❌ BUG: ตรวจสอบ answers.length กับ quiz.questions.length
  //         แต่ quiz อาจเป็น undefined ถ้า quizId ไม่มีใน MockStore
  if (parsed.data.answers.length !== quiz.questions.length) {  // ← บรรทัด 22: TypeError ตรงนี้
    return NextResponse.json(
      { error: `Expected ${quiz.questions.length} answers, got ${parsed.data.answers.length}` },
      { status: 400 }
    )
  }

  const attempt = quizService.submit(id, parsed.data.answers, parsed.data.durationSeconds)
  return NextResponse.json(attempt)
}
```

---

## เกณฑ์ตรวจสอบผลลัพธ์ (Criteria Check)

หลังรัน AI วิเคราะห์แล้วให้ตรวจว่า:

- [ ] AI ระบุ **สาเหตุหลัก** ได้: `quizService.getById()` คืนค่า `undefined` เมื่อ quizId ไม่มีใน MockStore — ไม่มีการตรวจสอบก่อนใช้
- [ ] AI ชี้ **บรรทัดที่เกิด Error** ได้: `route.ts:22` — `quiz.questions.length` ที่ quiz เป็น undefined
- [ ] AI อธิบาย **ลำดับโค้ดที่ผิด** ได้: ควร check `if (!quiz)` ก่อน แล้วค่อย validate answers
- [ ] AI เสนอ **วิธีแก้** ที่ถูกต้อง: เพิ่ม `if (!quiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })` ก่อนบรรทัด 22
