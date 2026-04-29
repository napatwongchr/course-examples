# Software Architecture Document
# Personal Learning Assistant (PLA)

---

| เวอร์ชัน | วันที่อัปเดต | สถานะ |
|---------|------------|------|
| v1.0 | 2026-03-31 | Draft |

---

## 1. Architecture Overview

PLA เป็น **Full-stack Web Application** ที่สร้างบน Next.js 14 App Router ใช้ pattern แบบ **Layered Architecture** แบ่งชัดเจนระหว่าง Presentation, Application, และ Data Layer

```
┌─────────────────────────────────────────────────┐
│                   Browser                        │
│  ┌───────────────────────────────────────────┐  │
│  │          React Components (UI)            │  │
│  │   Shadcn UI + Tailwind CSS                │  │
│  └──────────────┬────────────────────────────┘  │
│                 │  TanStack Query (cache)         │
│  ┌──────────────▼────────────────────────────┐  │
│  │         Client-side Logic                  │  │
│  │   SM-2 Algorithm │ Timer │ Auto-save       │  │
│  └──────────────┬────────────────────────────┘  │
└─────────────────┼───────────────────────────────┘
                  │ HTTP / fetch
┌─────────────────▼───────────────────────────────┐
│              Next.js App Router                  │
│  ┌─────────────────────────────────────────┐    │
│  │         API Routes (/api/*)             │    │
│  │  Topics │ Notes │ Quiz │ Review │ Cron  │    │
│  └──────────────┬──────────────────────────┘    │
│                 │                                │
│  ┌──────────────▼──────────────────────────┐    │
│  │           Service Layer                  │    │
│  │  TopicService │ QuizService │ SM2Service │    │
│  └──────────────┬──────────────────────────┘    │
│                 │                                │
│  ┌──────────────▼──────────────────────────┐    │
│  │           Data Layer                     │    │
│  │  Phase 1: In-Memory Store                │    │
│  │  Phase 2: PostgreSQL (via Prisma ORM)    │    │
│  └─────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│           External Services                      │
│  Claude API (Anthropic) │ Vercel (Phase 2)       │
└─────────────────────────────────────────────────┘
```

---

## 2. Tech Stack

| Layer | Technology | เหตุผล |
|-------|-----------|--------|
| Framework | Next.js 14 (App Router) + TypeScript | SSR/API routes ใน repo เดียว, strict mode สำหรับ type safety |
| UI | Shadcn UI + Tailwind CSS | Component-first, ไม่ต้องเขียน CSS เอง |
| State / Cache | TanStack Query | Server state caching, auto-invalidation, loading states |
| AI | Vercel AI SDK + Claude API | Streaming support, built-in error handling |
| Database | PostgreSQL (Phase 2 เท่านั้น) | Relational data ที่เหมาะกับ relation ของ Topic → Note → Quiz |
| ORM | Prisma (Phase 2) | Type-safe queries, migration management |
| Testing | Vitest | Fast, compatible กับ TypeScript และ ESM |
| Deployment | Vercel | Zero-config Next.js deployment, environment variables |
| CI/CD | GitHub Actions (Phase 2) | Auto-deploy on merge to main |

---

## 3. Project Directory Structure

```
pla/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout + providers
│   ├── page.tsx                  # Dashboard (Review Queue + Topic list)
│   ├── topics/
│   │   ├── page.tsx              # Topic list page
│   │   └── [id]/
│   │       ├── page.tsx          # Topic detail (Notes + Timer)
│   │       └── quiz/
│   │           └── page.tsx      # Quiz page
│   └── api/                      # API Routes
│       ├── topics/
│       │   ├── route.ts          # GET, POST /api/topics
│       │   └── [id]/
│       │       ├── route.ts      # PUT, DELETE /api/topics/[id]
│       │       └── notes/
│       │           └── route.ts  # GET, POST /api/topics/[id]/notes
│       ├── notes/
│       │   └── [id]/
│       │       └── route.ts      # PUT /api/notes/[id]
│       ├── study-sessions/
│       │   ├── route.ts          # POST /api/study-sessions
│       │   └── summary/
│       │       └── route.ts      # GET /api/study-sessions/summary
│       ├── quiz/
│       │   ├── generate/
│       │   │   └── route.ts      # GET /api/quiz/generate?mode=ai|rule-based
│       │   └── attempt/
│       │       └── route.ts      # POST /api/quiz/attempt
│       ├── review/
│       │   ├── queue/
│       │   │   └── route.ts      # GET /api/review/queue
│       │   └── schedule/
│       │       └── route.ts      # POST /api/review/schedule
│       └── cron/
│           └── daily-review/
│               └── route.ts      # POST /api/cron/daily-review (Phase 2)
│
├── components/                   # Shared UI components
│   ├── ui/                       # Shadcn UI components (auto-generated)
│   ├── topic-card.tsx
│   ├── note-editor.tsx
│   ├── study-timer.tsx
│   ├── quiz-card.tsx
│   └── review-queue.tsx
│
├── lib/                          # Business logic & utilities
│   ├── sm2.ts                    # SM-2 Algorithm implementation
│   ├── quiz-generator.ts         # Rule-based quiz generation
│   ├── rate-limiter.ts           # In-memory rate limiter (Phase 1)
│   └── validators.ts             # Zod schemas สำหรับ input validation
│
├── services/                     # Service layer (ระหว่าง API routes กับ data)
│   ├── topic.service.ts
│   ├── note.service.ts
│   ├── quiz.service.ts
│   ├── review.service.ts
│   └── study-session.service.ts
│
├── store/                        # Phase 1: In-memory data store
│   └── mock-store.ts             # Singleton store แทน database
│
├── types/                        # TypeScript interfaces
│   └── index.ts                  # Topic, Note, Quiz, ReviewSchedule, ...
│
├── hooks/                        # Custom React hooks
│   ├── use-topics.ts             # TanStack Query hooks สำหรับ Topics
│   ├── use-notes.ts
│   ├── use-quiz.ts
│   └── use-study-timer.ts        # Timer logic + localStorage
│
└── __tests__/                    # Vitest test files
    ├── sm2.test.ts
    ├── quiz-generator.test.ts
    └── api/
        ├── topics.test.ts
        └── quiz.test.ts
```

---

## 4. Component Architecture

### 4.1 Presentation Layer (React Components)

Components แบ่งเป็น 2 ระดับ:

**Page Components** — orchestrate data fetching และ layout
```
Dashboard Page
├── ReviewQueue         (ดึง /api/review/queue)
└── TopicList           (ดึง /api/topics)

Topic Detail Page
├── NoteEditor          (ดึง + บันทึก /api/topics/[id]/notes)
├── StudyTimer          (อ่านจาก localStorage)
└── WeeklyStudySummary  (ดึง /api/study-sessions/summary)

Quiz Page
├── QuizCard            (แสดง questions ทีละข้อ)
├── ScoreSummary        (แสดงหลังจบ quiz)
└── AIGenerateButton    (trigger /api/quiz/generate?mode=ai)
```

**Shared Components** — reusable UI ไม่มี data fetching ของตัวเอง
- `TopicCard` — แสดง Topic + action buttons
- `QuestionCard` — แสดง 1 question + 4 options
- `TimerDisplay` — แสดงเวลาที่นับ
- `SaveIndicator` — แสดงสถานะ auto-save

### 4.2 Data Fetching (TanStack Query)

ใช้ custom hooks ห่อหุ้ม TanStack Query ทั้งหมด:

```typescript
// hooks/use-topics.ts
export function useTopics() {
  return useQuery({ queryKey: ['topics'], queryFn: () => fetch('/api/topics') })
}

export function useCreateTopic() {
  return useMutation({
    mutationFn: (data: CreateTopicInput) => fetch('/api/topics', { method: 'POST', body: JSON.stringify(data) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['topics'] })
  })
}
```

Pattern นี้ทำให้ components ไม่รู้เรื่อง HTTP โดยตรง — เปลี่ยน API layer ได้โดยไม่กระทบ UI

---

## 5. Data Layer Strategy

### Phase 1 — In-Memory Store

ใช้ **Singleton pattern** เพื่อ simulate database ใน memory:

```typescript
// store/mock-store.ts
class MockStore {
  private topics: Map<string, Topic> = new Map()
  private notes: Map<string, Note> = new Map()
  private quizzes: Map<string, Quiz> = new Map()
  private reviewSchedules: Map<string, ReviewSchedule> = new Map()
  private studySessions: StudySession[] = []

  // CRUD methods สำหรับแต่ละ entity
}

export const store = new MockStore() // singleton
```

**ข้อจำกัด Phase 1:** ข้อมูลหายเมื่อ server restart — เป็น known trade-off เพื่อ validate UX ก่อน

### Phase 2 — PostgreSQL + Prisma

**Schema Design:**

```
topics
  id          UUID PRIMARY KEY
  name        TEXT NOT NULL
  description TEXT
  created_at  TIMESTAMPTZ DEFAULT NOW()
  updated_at  TIMESTAMPTZ DEFAULT NOW()

notes
  id            UUID PRIMARY KEY
  topic_id      UUID REFERENCES topics(id) ON DELETE CASCADE
  content       TEXT
  last_saved_at TIMESTAMPTZ
  created_at    TIMESTAMPTZ DEFAULT NOW()

study_sessions
  id               UUID PRIMARY KEY
  topic_id         UUID REFERENCES topics(id)
  started_at       TIMESTAMPTZ NOT NULL
  ended_at         TIMESTAMPTZ NOT NULL
  duration_seconds INTEGER NOT NULL

quizzes
  id           UUID PRIMARY KEY
  topic_id     UUID REFERENCES topics(id)
  note_id      UUID REFERENCES notes(id)
  generated_by TEXT CHECK (generated_by IN ('rule-based', 'ai'))
  created_at   TIMESTAMPTZ DEFAULT NOW()

questions
  id            UUID PRIMARY KEY
  quiz_id       UUID REFERENCES quizzes(id) ON DELETE CASCADE
  text          TEXT NOT NULL
  options       TEXT[] NOT NULL  -- array of 4 options
  correct_index INTEGER NOT NULL CHECK (correct_index BETWEEN 0 AND 3)

quiz_attempts
  id           UUID PRIMARY KEY
  quiz_id      UUID REFERENCES quizzes(id)
  topic_id     UUID REFERENCES topics(id)
  score        INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100)
  answers      INTEGER[] NOT NULL
  attempted_at TIMESTAMPTZ DEFAULT NOW()

review_schedules
  topic_id              UUID PRIMARY KEY REFERENCES topics(id)
  last_reviewed_at      TIMESTAMPTZ
  next_review_at        TIMESTAMPTZ NOT NULL
  repetition_interval   INTEGER NOT NULL DEFAULT 1
  ease_factor           NUMERIC(4,2) NOT NULL DEFAULT 2.5
  consecutive_correct   INTEGER NOT NULL DEFAULT 0
```

**Data Migration Strategy:** Service layer interface ไม่เปลี่ยน — เพียงสลับ implementation จาก MockStore ไป Prisma Client โดยไม่กระทบ API routes หรือ components

---

## 6. Core Algorithm — SM-2 Spaced Repetition

### Algorithm Flow

```
หลัง Quiz attempt:
  score = (correct answers / total questions) × 100

  if score < 60:
    reset easeFactor = 2.5
    repetitionInterval = 1 day
    consecutiveCorrect = 0
  else:
    grade = score / 20  (แปลงเป็น 0–5 scale สำหรับ SM-2)

    // SM-2 formula
    easeFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
    easeFactor = max(1.3, easeFactor)  // ไม่ต่ำกว่า 1.3

    if consecutiveCorrect == 0:
      repetitionInterval = 1
    elif consecutiveCorrect == 1:
      repetitionInterval = 6
    else:
      repetitionInterval = round(repetitionInterval × easeFactor)

    consecutiveCorrect += 1

  nextReviewAt = today + repetitionInterval days
```

### Implementation

```typescript
// lib/sm2.ts
interface SM2Input {
  score: number           // 0–100
  currentSchedule: ReviewSchedule
}

interface SM2Output {
  nextReviewAt: Date
  repetitionInterval: number
  easeFactor: number
  consecutiveCorrect: number
}

export function calculateNextReview(input: SM2Input): SM2Output { ... }
```

SM-2 logic อยู่ใน pure function — ทดสอบด้วย Vitest ได้โดยไม่ต้องการ mock

---

## 7. AI Integration Architecture

### Request Flow

```
User คลิก "Generate AI Quiz"
         │
         ▼
QuizPage → POST /api/quiz/generate?mode=ai
         │
         ▼
Rate Limiter (10 req/hr per user)
  ├── limit exceeded → 429 Too Many Requests
  └── ok ▼
         │
         ▼
Quiz Service → ดึง Note content จาก store/DB
         │
         ▼
Vercel AI SDK → Claude API (claude-sonnet-4-6)
         │
  ┌──────┴──────┐
  │ Success      │ Failure / Invalid JSON
  ▼              ▼
parse JSON     Zod validation fail / timeout
via Zod          │
  │              ▼
  │         Rule-based Quiz Generator (fallback)
  └──────┬──────┘
         ▼
  Return Quiz JSON to client
```

### Prompt Engineering (Claude API)

```typescript
const prompt = `
You are a quiz generator for students. 
Given the following study notes, generate exactly 5 multiple-choice questions.

Return ONLY valid JSON matching this schema:
{
  "questions": [
    {
      "text": "question text",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0
    }
  ]
}

Study notes:
${noteContent}
`
```

### Error Handling & Fallback

```typescript
// services/quiz.service.ts
async function generateAIQuiz(noteContent: string): Promise<Quiz> {
  try {
    const response = await generateWithClaude(noteContent)
    const parsed = QuizSchema.parse(JSON.parse(response))  // Zod validation
    return parsed
  } catch (error) {
    // fallback — ไม่ throw error ให้ user เห็น
    console.warn('AI quiz generation failed, falling back to rule-based', error)
    return generateRuleBasedQuiz(noteContent)
  }
}
```

### Rate Limiting

Phase 1 — In-memory counter (reset เมื่อ server restart):
```typescript
// lib/rate-limiter.ts
const requestCounts = new Map<string, { count: number; resetAt: Date }>()

export function checkRateLimit(userId: string): boolean {
  const now = new Date()
  const entry = requestCounts.get(userId)
  if (!entry || entry.resetAt < now) {
    requestCounts.set(userId, { count: 1, resetAt: addHours(now, 1) })
    return true
  }
  if (entry.count >= 10) return false
  entry.count++
  return true
}
```

Phase 2 — ใช้ Redis หรือ Upstash สำหรับ distributed rate limiting

---

## 8. Auto-save Architecture

```
User พิมพ์ใน NoteEditor
         │
         ▼
onChange → debounce(1000ms)
         │ (ถ้าหยุดพิมพ์ > 1 วินาที)
         ▼
triggerSave() → PUT /api/notes/[id]
         │
  ┌──────┴──────────┐
  │ Success          │ Failure
  ▼                  ▼
ShowSaved indicator  ShowWarning → retry after 5s
                           │
                     (max 3 retries)
                           │ all fail
                     ShowError + keep draft in state
```

Force-save เพิ่มเติม: `setInterval(forceSave, 30_000)` ทำงานคู่กับ debounce เสมอ

---

## 9. Study Timer Architecture

Timer logic ทำงาน **client-side ทั้งหมด** ใน Phase 1:

```
User คลิก Start
  │
  ▼
startedAt = Date.now()
setInterval(updateDisplay, 1000)  ← อัปเดต UI ทุก 1 วินาที

User คลิก Stop
  │
  ▼
endedAt = Date.now()
durationSeconds = (endedAt - startedAt) / 1000
  │
  ▼
POST /api/study-sessions { topicId, startedAt, endedAt, durationSeconds }
  │
  ▼
บันทึกลง localStorage (Phase 1) หรือ PostgreSQL (Phase 2)
```

localStorage key format: `pla:study-sessions:[topicId]`

---

## 10. Security Architecture

| ประเด็น | มาตรการ | ระดับ |
|--------|---------|------|
| API Key | เก็บใน `ANTHROPIC_API_KEY` env var เท่านั้น, ไม่ expose ใน client bundle | Critical |
| Cron Authentication | ตรวจ `Authorization: Bearer ${CRON_SECRET}` ทุก request ที่ `/api/cron/*` | Phase 2 |
| Input Validation | ใช้ Zod validate ทุก request body ก่อนเข้า service layer | Critical |
| SQL Injection | ใช้ Prisma parameterized queries — ไม่มี raw SQL | Phase 2 |
| XSS | Next.js ทำ auto-escaping, plain text content ไม่ render HTML | Covered |
| CORS | Next.js default: same-origin เท่านั้น | Covered |

**Validation Example:**
```typescript
// lib/validators.ts
import { z } from 'zod'

export const CreateTopicSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional()
})

// ใน API route
const body = await request.json()
const parsed = CreateTopicSchema.safeParse(body)
if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 })
```

---

## 11. Testing Strategy

### Test Pyramid

```
         ┌──────┐
         │  E2E │  (ไม่อยู่ใน scope v1.0)
        ┌┴──────┴┐
        │Integration│  API routes + mock store
       ┌┴──────────┴┐
       │    Unit     │  SM-2, quiz-generator, validators
      └─────────────┘
```

### Unit Tests (ต้อง coverage ≥ 80%)

| Module | Test Cases |
|--------|-----------|
| `lib/sm2.ts` | score < 60 resets, SM-2 formula correctness, easeFactor floor, interval progression |
| `lib/quiz-generator.ts` | generates correct structure, handles short notes, returns 4 options per question |
| `lib/validators.ts` | rejects invalid input, accepts valid input |
| `lib/rate-limiter.ts` | blocks after 10 requests, resets after 1 hour |

### Integration Tests

```typescript
// __tests__/api/topics.test.ts
describe('POST /api/topics', () => {
  it('creates topic and returns 201', async () => { ... })
  it('returns 400 for missing name', async () => { ... })
  it('returns 400 for name > 100 chars', async () => { ... })
})
```

---

## 12. Phase Transition Plan

### Phase 1 → Phase 2 Migration Checklist

- [ ] เพิ่ม Prisma schema และ run `prisma migrate dev`
- [ ] สร้าง `services/db/` ที่ implement interface เดียวกับ MockStore
- [ ] สลับ import ใน service layer จาก `store/mock-store` ไป `services/db/`
- [ ] ย้าย rate limiter จาก in-memory ไป Redis/Upstash
- [ ] ตั้ง `ANTHROPIC_API_KEY` และ `CRON_SECRET` ใน Vercel environment variables
- [ ] ตั้งค่า GitHub Actions: `.github/workflows/deploy.yml`
- [ ] ทดสอบ `POST /api/cron/daily-review` พร้อม secret header

### Environment Variables

| Variable | Phase | หมายเหตุ |
|----------|-------|---------|
| `ANTHROPIC_API_KEY` | 1, 2 | Claude API key |
| `DATABASE_URL` | 2 | PostgreSQL connection string |
| `CRON_SECRET` | 2 | Secret สำหรับ authenticate cron endpoint |
| `NEXT_PUBLIC_APP_URL` | 2 | Base URL สำหรับ cron callback |

---

## 13. Key Design Decisions

| Decision | เหตุผล | Alternative ที่พิจารณา |
|----------|--------|----------------------|
| Next.js App Router | API + UI ใน repo เดียว, ลด overhead | Express.js backend แยก |
| Service layer แยกจาก API routes | ทดสอบ business logic ได้โดยไม่ต้องทำ HTTP request | Logic ใน API routes โดยตรง |
| In-memory store Phase 1 | เร่ง validate UX โดยไม่ต้องตั้ง database | SQLite local |
| Zod validation | Type-safe runtime validation + schema ใช้ร่วมกับ TypeScript types | Manual validation |
| TanStack Query | Cache management + loading/error states อัตโนมัติ | SWR, custom fetch hooks |
| Rule-based fallback สำหรับ AI | ป้องกัน single point of failure จาก Claude API | Error toast แล้วหยุด |

---

_เอกสารนี้อ้างอิงจาก PRD v1.0 ของ Personal Learning Assistant
— ใช้เป็น reference สำหรับ implementation ตลอดทั้งคอร์ส_
