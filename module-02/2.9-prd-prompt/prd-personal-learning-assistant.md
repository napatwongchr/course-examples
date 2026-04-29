# Product Requirements Document (PRD)
# Personal Learning Assistant (PLA)

---

| เวอร์ชัน | วันที่อัปเดต | สถานะ |
|---------|------------|------|
| v1.0 | 2026-03-31 | Draft |

---

## 1. Overview & Problem Statement

### ปัญหา

งานวิจัยด้านจิตวิทยาการเรียนรู้พบว่ามนุษย์ลืมข้อมูลที่ได้รับอย่างรวดเร็วหากไม่มีการทบทวน ตาม **Forgetting Curve** ของ Hermann Ebbinghaus เราลืมเนื้อหาถึง 70% ภายใน 24 ชั่วโมงหลังเรียน และ 90% ภายใน 1 สัปดาห์หากไม่มีการทบทวน

นักศึกษามหาวิทยาลัยไทยอายุ 18–24 ปี เผชิญกับปัญหาหลัก 3 ประการ:

1. **ไม่มีระบบทบทวนที่เป็นระบบ** — จดโน้ตแล้วไม่ได้กลับมาอ่าน
2. **ไม่รู้ว่าควรทบทวนอะไรก่อน** — ไม่มีลำดับความสำคัญที่ชัดเจน
3. **ขาด feedback loop** — ไม่ทราบว่าตนเองเข้าใจเนื้อหาจริงหรือเปล่า

### PLA คืออะไร

**Personal Learning Assistant (PLA)** คือ Web Application ที่ช่วยนักศึกษาจัดการการเรียนรู้แบบครบวงจร ผ่าน 4 ฟีเจอร์หลัก:

- **จัดการหัวข้อการเรียน** (Topic Manager)
- **บันทึกเนื้อหาและจับเวลาเรียน** (Note Editor + Study Timer)
- **ทบทวนด้วย Quiz แบบ Spaced Repetition** (Smart Quiz & Review System)
- **สร้างข้อสอบอัตโนมัติด้วย AI** (AI Quiz Generator)

PLA ใช้หลักการ **Spaced Repetition** (SM-2 Algorithm) ซึ่งพิสูจน์แล้วว่าช่วยให้จำเนื้อหาได้ดีกว่าการอ่านซ้ำแบบทั่วไปถึง 2–3 เท่า

### Phased Approach

**Phase 1 — Prototype (เดือนที่ 1)**
มุ่งเน้น validate UX และ core logic โดยใช้ mock data แบบ in-memory ไม่ต่อ database จริง เพื่อให้ทีมสามารถปรับ UI และ flow ได้รวดเร็ว

**Phase 2 — Production (เดือนที่ 2)**
ต่อ PostgreSQL database จริง + deploy บน Vercel ด้วย GitHub Actions CI/CD pipeline พร้อมใช้งานจริง

---

## 2. Project Information

### Project Info

| รายการ | รายละเอียด |
|-------|-----------|
| Product Name | Personal Learning Assistant (PLA) |
| Platform | Web App (ไม่ใช่ Mobile) |
| กลุ่มเป้าหมาย | นักศึกษามหาวิทยาลัยไทย อายุ 18–24 ปี |
| ปัญหาหลัก | นักศึกษาลืมเนื้อหาที่เรียน เพราะขาดระบบทบทวนที่เป็นระบบ |
| Competitors | Anki (flashcard), Notion (note-taking) |
| Team | 2 Frontend Developer + 1 Fullstack Developer |
| Timeline | 2 เดือน (Phase 1: เดือนที่ 1, Phase 2: เดือนที่ 2) |

### Tech Stack

| Layer | Technology | หมายเหตุ |
|-------|-----------|---------|
| Framework | Next.js 14 + TypeScript (App Router) | Strict mode เปิดใช้งาน |
| UI Library | Shadcn UI บน Tailwind CSS | Component-first approach |
| Data Fetching | TanStack Query | Client-side caching |
| AI Integration | Vercel AI SDK + Claude API (Anthropic) | สำหรับ F04 |
| Database | PostgreSQL | Phase 2 เท่านั้น |
| Deployment | Vercel | Phase 2 เท่านั้น |
| Testing | Vitest | ไม่ใช่ Jest |

---

## 3. Goals & Success Metrics

### Business Goals

- **ลดเวลาทบทวน** — นักศึกษาสามารถทบทวนเนื้อหาได้อย่างมีประสิทธิภาพภายในเวลาที่สั้นลง
- **สร้าง Daily Study Habit** — กระตุ้นให้นักศึกษาเข้าใช้งานและทบทวนเนื้อหาทุกวัน
- **เพิ่มความเข้าใจเนื้อหา** — ใช้ Quiz และ AI เพื่อให้นักศึกษาประเมินความเข้าใจตนเองได้จริง
- **Validate Product-Market Fit** — พิสูจน์ว่า PLA แก้ปัญหาจริงของกลุ่มเป้าหมายก่อน scale

### KPIs

| # | Metric | เป้าหมาย | วัดที่ |
|---|--------|---------|------|
| KPI-1 | อัตราผู้ใช้ที่ทำ Quiz อย่างน้อย 3 ครั้ง/สัปดาห์ | ≥ 70% ของ active users | ภายใน 30 วันหลัง launch |
| KPI-2 | Response time ของ AI Quiz Generator | < 5 วินาที ต่อ 1 quiz set | ทุก request |
| KPI-3 | Response time ของ UI interactions (non-AI) | < 300ms | 95th percentile |
| KPI-4 | จำนวน Quiz attempts ทั้งหมด | ≥ 500 attempts | ภายใน 30 วันแรก |
| KPI-5 | อัตราความสำเร็จของ AI Quiz generation | ≥ 90% (ไม่ตก fallback) | ต่อ request |
| KPI-6 | Vitest test coverage | ≥ 80% ใน core modules | ก่อน Phase 2 deploy |

---

## 4. User Stories

### F01 — Topic Manager

**US-01:** As a student, I want to create a new study topic with a name and description,
so that I can organize my learning materials by subject.

**US-02:** As a student, I want to view all my topics sorted by last modified date,
so that I can quickly find what I was recently studying.

**US-03:** As a student, I want to delete a topic I no longer need,
so that my dashboard stays clean and focused on current subjects.

### F02 — Note Editor + Study Timer

**US-04:** As a student, I want to write and save notes within each topic,
so that I can capture what I learned during a study session.

**US-05:** As a student, I want my notes to auto-save every 30 seconds,
so that I never lose progress even if I forget to save manually.

**US-06:** As a student, I want to start and stop a study timer per topic,
so that I can track how much time I spend on each subject per week.

### F03 — Smart Quiz & Review System

**US-07:** As a student, I want to take a multiple-choice quiz based on my topic's notes,
so that I can test how well I understand the material.

**US-08:** As a student, I want to see my quiz score (0–100) after each attempt,
so that I know exactly where I stand.

**US-09:** As a student, I want the system to schedule my next review using Spaced Repetition,
so that I review topics at the optimal time to maximize retention.

**US-10:** As a student, I want to see a list of topics due for review today,
so that I know what to prioritize in my study session.

### F04 — AI Quiz Generator

**US-11:** As a student, I want to generate a quiz from my saved notes using AI,
so that I can test my own understanding without creating questions manually.

**US-12:** As a student, I want the system to fall back to rule-based quiz if AI is unavailable,
so that I can always practice even when the AI service has issues.

---

## 5. Functional Requirements

### F01 — Topic Manager

| ID | Requirement |
|----|------------|
| F01-1 | ระบบต้องรองรับการสร้าง Topic ใหม่พร้อม name และ description |
| F01-2 | ระบบต้องรองรับการแก้ไข Topic (name, description) |
| F01-3 | ระบบต้องรองรับการลบ Topic พร้อม confirmation dialog |
| F01-4 | ระบบต้องแสดง Topic list เรียงตาม last modified date (ล่าสุดก่อน) |
| F01-5 | Phase 1 ใช้ mock data แบบ in-memory (ไม่ต่อ database) |

### F02 — Note Editor + Study Timer

| ID | Requirement |
|----|------------|
| F02-1 | ระบบต้องมี plain text editor สำหรับบันทึก Note ภายใน Topic |
| F02-2 | ระบบต้อง auto-save Note ทุก 30 วินาที โดยแสดง indicator สถานะ |
| F02-3 | ระบบต้องมี Study Timer (start/pause/stop) ต่อ Topic |
| F02-4 | ระบบต้องบันทึก study time ลง localStorage ใน Phase 1 |
| F02-5 | ระบบต้องแสดง Weekly Study Summary (เวลาเรียนรวมต่อสัปดาห์ต่อ Topic) |

### F03 — Smart Quiz & Review System

| ID | Requirement |
|----|------------|
| F03-1 | ระบบต้องสร้าง Quiz แบบ rule-based จาก Note content |
| F03-2 | แต่ละ Quiz question ต้องเป็น multiple choice: 1 คำถาม + 4 ตัวเลือก |
| F03-3 | ระบบต้องคำนวณ score 0–100 หลังจบ Quiz แต่ละชุด |
| F03-4 | ระบบต้องใช้ SM-2 Algorithm คำนวณ nextReviewAt, easeFactor, repetitionInterval |
| F03-5 | ระบบต้องมี Review Queue แสดง Topic ที่ถึงเวลาทบทวนวันนี้ |

### F04 — AI Quiz Generator

| ID | Requirement |
|----|------------|
| F04-1 | ระบบต้องมี API route: `GET /api/quiz/generate?mode=ai` |
| F04-2 | ระบบต้องส่ง Note content ไปยัง Claude API เพื่อสร้าง Quiz |
| F04-3 | Response จาก Claude ต้องถูก parse เป็น JSON format ที่ตรงตาม Quiz interface |
| F04-4 | ระบบต้อง handle error และ fallback ไปใช้ rule-based quiz หาก AI ล้มเหลว |
| F04-5 | ระบบต้อง rate limit AI generation ที่ 10 requests/hour ต่อ user |

---

## 6. Non-Functional Requirements

### Performance

| Component | Response Time Target | หมายเหตุ |
|-----------|---------------------|---------|
| Topic list load | < 200ms | Phase 1: mock data |
| Note auto-save | < 100ms (background) | ไม่บล็อก UI |
| Quiz generation (rule-based) | < 300ms | Client-side |
| AI Quiz generation | < 5,000ms | รวม Claude API latency |
| Study Timer update | < 16ms (60fps) | UI smooth |

### Security

- **API Key Management:** Claude API key ต้องเก็บใน environment variable เท่านั้น ห้าม hardcode ใน source code
- **Cron Authentication:** Cron job endpoints ต้องใช้ secret header authentication
- **No Sensitive Data in Phase 1:** Phase 1 ไม่เก็บข้อมูลส่วนตัวผู้ใช้ใดๆ ใน database (ใช้ in-memory เท่านั้น)
- **Input Validation:** ทุก input จากผู้ใช้ต้องผ่าน validation ก่อน process

### Reliability

- **AI Fallback:** ทุกครั้งที่ AI Quiz generation ล้มเหลว ระบบต้อง fallback ไปใช้ rule-based quiz อัตโนมัติโดยไม่แสดง error ให้ผู้ใช้เห็น
- **Auto-save Resilience:** หาก auto-save ล้มเหลว ระบบต้องแสดง warning และ retry ภายใน 5 วินาที
- **Offline Graceful Degradation:** Phase 1 ทำงานได้ offline เนื่องจากใช้ in-memory data

### Developer Experience

- **TypeScript Strict Mode:** เปิดใช้งาน `strict: true` ใน `tsconfig.json` ทุกไฟล์ต้องมี type annotation ชัดเจน
- **Vitest Coverage:** Core modules (Quiz logic, SM-2 algorithm, API routes) ต้องมี coverage ≥ 80%
- **Code Conventions:** ใช้ ESLint + Prettier ทุก PR ต้องผ่าน lint check ก่อน merge

---

## 7. Feature Roadmap ตาม Phase

### Phase 1 — Prototype

| Feature | สถานะ | หมายเหตุ |
|---------|------|---------|
| F01: Topic Manager (CRUD) | 🔨 In Development | สร้างใน Module 3 |
| F02: Note Editor | 🔨 In Development | สร้างใน Module 3 |
| F02: Study Timer + localStorage | 🔨 In Development | สร้างใน Module 4 |
| F03: Rule-based Quiz | 🔨 In Development | สร้างใน Module 4 |
| F03: SM-2 Spaced Repetition | 🔨 In Development | สร้างใน Module 5 |
| F04: AI Quiz Generator | 🔨 In Development | สร้างใน Module 6 |
| Mock Data Layer | 🔨 In Development | ใช้แทน database ใน Phase 1 |

### Phase 2 — Production

| Feature | สถานะ | หมายเหตุ |
|---------|------|---------|
| PostgreSQL Integration | 🔜 Planned | แทน mock data |
| Vercel Deployment | 🔜 Planned | พร้อม environment variables |
| GitHub Actions CI/CD | 🔜 Planned | Auto-deploy on merge to main |
| User Authentication | 🔜 Planned | ระบุ scope เพิ่มเติม |
| Cron Job (daily review reminder) | 🔜 Planned | ส่ง notification รายวัน |
| Analytics Dashboard | 🔜 Planned | ติดตาม KPIs |

---

## 8. API Routes

| Method | Path | Description | Phase |
|--------|------|-------------|-------|
| GET | `/api/topics` | ดึง Topic ทั้งหมด | 1 |
| POST | `/api/topics` | สร้าง Topic ใหม่ | 1 |
| PUT | `/api/topics/[id]` | แก้ไข Topic | 1 |
| DELETE | `/api/topics/[id]` | ลบ Topic | 1 |
| GET | `/api/topics/[id]/notes` | ดึง Note ทั้งหมดของ Topic | 1 |
| POST | `/api/topics/[id]/notes` | สร้าง Note ใหม่ | 1 |
| PUT | `/api/notes/[id]` | บันทึก/แก้ไข Note content | 1 |
| POST | `/api/study-sessions` | บันทึก study session | 1 |
| GET | `/api/study-sessions/summary` | ดึง weekly study summary | 1 |
| GET | `/api/quiz/generate` | สร้าง Quiz (mode=rule-based หรือ mode=ai) | 1 |
| POST | `/api/quiz/attempt` | บันทึกผล Quiz attempt | 1 |
| GET | `/api/review/queue` | ดึง Review queue วันนี้ | 1 |
| POST | `/api/review/schedule` | อัปเดต SM-2 schedule หลัง review | 1 |
| POST | `/api/cron/daily-review` | Cron job ส่ง review reminder (authenticated) | 2 |

---

## 9. Out of Scope

รายการต่อไปนี้ถูกตัดออกจาก v1.0 เพื่อให้ทีมโฟกัสกับ core value proposition:

| รายการ | เหตุผล |
|-------|-------|
| Content Sharing / Public Notes | เพิ่มความซับซ้อนด้าน privacy และ content moderation |
| Real-time Collaboration | ต้องการ WebSocket infrastructure ที่เกินขอบเขต 2 เดือน |
| User Authentication (Phase 1) | ใช้ mock user ใน Phase 1 เพื่อเร่ง validate UX |
| File Attachment (PDF, Image) | เพิ่ม storage cost และ complexity ในการ parse |
| Rich Text Editor (WYSIWYG) | Plain text เพียงพอสำหรับ validate core value |
| Mobile App (iOS/Android) | Web-first approach ก่อน ไม่ต้องการ separate codebase |
| Custom AI Model (Fine-tuning) | Claude API เพียงพอสำหรับ scope นี้ |
| Gamification / Badges | Nice-to-have แต่ไม่ใช่ core learning mechanic |
| Import จาก Anki / Notion | Integration complexity สูง ไม่คุ้มค่าใน Phase 1 |

---

## 10. Open Questions

| # | คำถาม | คำแนะนำ | สถานะ |
|---|------|---------|------|
| OQ-1 | SM-2 algorithm ควร reset easeFactor เมื่อไหร่? (เช่น เมื่อ score < 60%) | กำหนด threshold ที่ score < 60 reset easeFactor กลับเป็น 2.5 | 🔄 |
| OQ-2 | Rate limit 10 AI requests/hour — ควรจัดการอย่างไรเมื่อผู้ใช้หลายคนใช้งานพร้อมกัน? | Phase 1: ใช้ in-memory counter, Phase 2: Redis | 🔄 |
| OQ-3 | Note auto-save ควร debounce กี่ milliseconds ก่อน save? | แนะนำ 1,000ms debounce + 30 วินาที force save | 🔄 |
| OQ-4 | Quiz ควรมีกี่ข้อต่อชุด? มีผลต่อ SM-2 score calculation อย่างไร? | แนะนำ 5–10 ข้อต่อชุด, score = (correct/total) × 100 | 🔄 |
| OQ-5 | จะ handle กรณี Claude API return invalid JSON อย่างไร? | ใช้ Zod schema validation + retry 1 ครั้ง ก่อน fallback | ✅ |

---

## 11. TypeScript Interfaces หลัก

```typescript
// Topic — หัวข้อการเรียน
interface Topic {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date // ใช้สำหรับ sort "last modified"
}

// Note — เนื้อหาบันทึกภายใต้ Topic
interface Note {
  id: string
  topicId: string
  content: string // plain text
  lastSavedAt: Date // อัปเดตทุก auto-save
  createdAt: Date
}

// StudySession — บันทึกแต่ละ session ที่ผู้ใช้เรียน
interface StudySession {
  id: string
  topicId: string
  startedAt: Date
  endedAt: Date
  durationSeconds: number // คำนวณจาก endedAt - startedAt
}

// Quiz — ชุดคำถามที่สร้างจาก Note
interface Quiz {
  id: string
  topicId: string
  noteId: string
  questions: Question[]
  generatedBy: 'rule-based' | 'ai' // ระบุว่าสร้างด้วยวิธีใด
  createdAt: Date
}

// Question — คำถามแบบ multiple choice
interface Question {
  id: string
  quizId: string
  text: string // ตัวคำถาม
  options: string[] // array of 4 ตัวเลือก
  correctIndex: number // index ของตัวเลือกที่ถูก (0–3)
}

// QuizAttempt — ผลการทำ Quiz แต่ละครั้ง
interface QuizAttempt {
  id: string
  quizId: string
  topicId: string
  score: number // 0–100
  answers: number[] // index ที่ผู้ใช้เลือกแต่ละข้อ
  attemptedAt: Date
}

// ReviewSchedule — ตาราง Spaced Repetition ตาม SM-2 Algorithm
interface ReviewSchedule {
  topicId: string
  lastReviewedAt?: Date
  nextReviewAt: Date
  repetitionInterval: number // days (SM-2 parameter: จำนวนวันก่อน review ครั้งถัดไป)
  easeFactor: number // SM-2 ease factor (เริ่มต้นที่ 2.5, ปรับตาม performance)
  consecutiveCorrect: number // จำนวนครั้งที่ตอบถูกติดต่อกัน
}
```

---

_PRD ฉบับนี้สร้างโดยใช้ CARE Prompt Framework และ Claude AI
— ใช้เป็น reference ตลอดทั้งคอร์ส AI for Software Engineering_
