# โค้ดสำหรับ OWASP Security Review

> **วิธีใช้:** นำโค้ดนี้แนบไปกับ Prompt ใน `02-owasp-review-prompt.md`
> โค้ดนี้คือ **code จริง** จาก `demos/pla-app-live-demo/pla/` — ไม่ได้แต่งขึ้น

---

## ไฟล์ที่ 1: `app/api/notes/[id]/route.ts`

```typescript
import { NextResponse } from 'next/server'
import { noteService } from '@/services/note.service'
import { UpdateNoteSchema } from '@/lib/validators'

type Params = { params: Promise<{ id: string }> }

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params
  const body = await request.json()
  const parsed = UpdateNoteSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }
  const note = noteService.update(id, parsed.data)
  if (!note) return NextResponse.json({ error: 'Note not found' }, { status: 404 })
  return NextResponse.json(note)
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params
  const deleted = noteService.delete(id)
  if (!deleted) return NextResponse.json({ error: 'Note not found' }, { status: 404 })
  return new NextResponse(null, { status: 204 })
}
```

---

## ไฟล์ที่ 2: `app/api/topics/route.ts`

```typescript
import { NextResponse } from 'next/server'
import { topicService } from '@/services/topic.service'
import { CreateTopicSchema } from '@/lib/validators'

export async function GET() {
  const topics = topicService.getAll()
  return NextResponse.json(topics)
}

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = CreateTopicSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }
  const topic = topicService.create(parsed.data)
  return NextResponse.json(topic, { status: 201 })
}
```

---

## ไฟล์ที่ 3: `app/api/study-sessions/route.ts`

```typescript
import { NextResponse } from 'next/server'
import { studySessionService } from '@/services/study-session.service'
import { z } from 'zod'

const CreateStudySessionSchema = z.object({
  topicId: z.string().min(1),
  startedAt: z.string().datetime(),
  endedAt: z.string().datetime().optional(),
  durationMinutes: z.number().min(0),
})

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = CreateStudySessionSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }
  const session = studySessionService.create({
    topicId: parsed.data.topicId,
    startedAt: new Date(parsed.data.startedAt),
    endedAt: parsed.data.endedAt ? new Date(parsed.data.endedAt) : undefined,
    durationMinutes: parsed.data.durationMinutes,
  })
  return NextResponse.json(session, { status: 201 })
}
```

---

## ไฟล์ที่ 4: `lib/validators.ts`

```typescript
import { z } from 'zod'

export const CreateTopicSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
  description: z.string().max(500, 'Description must be 500 characters or less').optional(),
})

export const UpdateTopicSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
})

export const CreateNoteSchema = z.object({
  content: z.string(),
})

export const UpdateNoteSchema = z.object({
  content: z.string().min(1, 'Content is required'),
})
```

---

## ไฟล์ที่ 5: `next.config.ts`

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
}

export default nextConfig
```

---

## Context ของโปรเจ็กต์

- **Framework:** Next.js 15 App Router
- **Data Layer:** In-memory MockStore (Phase 1 — ไม่มี database)
- **Auth:** ยังไม่มีใน Phase 1 → เป็น known risk ที่ต้องแก้ใน Phase 2
- **Deployment:** Vercel (Phase 2)
