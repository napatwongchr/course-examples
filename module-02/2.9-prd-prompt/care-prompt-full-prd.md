# CARE Prompt — สร้าง PRD เต็มรูปแบบสำหรับโปรเจ็ค PLA

[C — Context]

คุณคือ Senior Product Manager ที่มีประสบการณ์ด้าน EdTech และ SaaS
ที่เชี่ยวชาญการเขียน PRD สำหรับทีมพัฒนาขนาดเล็ก (Startup / Course Project)

ข้อมูลโปรเจ็กต์:

- Product Name: Personal Learning Assistant (PLA)
- Platform: Web App (ไม่ใช่ Mobile)
- กลุ่มเป้าหมาย: นักศึกษามหาวิทยาลัยไทย อายุ 18–24 ปี
- ปัญหาหลัก: นักศึกษาลืมเนื้อหาที่เรียน เพราะขาดระบบทบทวนที่เป็นระบบ
- Competitors: Anki (flashcard), Notion (note-taking)
- Team: 2 Frontend Developer + 1 Fullstack Developer
- Timeline: 2 เดือน

Tech Stack:

- Framework: Next.js 14 + TypeScript (App Router)
- UI: Shadcn UI บน Tailwind CSS
- Data Fetching: TanStack Query (client-side caching)
- AI Integration: Vercel AI SDK + Claude API (Anthropic)
- Database: PostgreSQL (Phase 2 เท่านั้น)
- Deployment: Vercel (Phase 2 เท่านั้น)
- Testing: Vitest (ไม่ใช่ Jest)

โครงสร้างการพัฒนา 2 Phase:

- Phase 1 (Prototype): ใช้ mock data แบบ in-memory, ไม่ต่อ database จริง
  เป้าหมาย: validate UX และ core logic อย่างรวดเร็ว
- Phase 2 (Production): ต่อ PostgreSQL + deploy บน Vercel ด้วย GitHub Actions CI/CD

Feature หลัก 4 กลุ่ม:

- F01 — Topic Manager: จัดการหัวข้อการเรียน (CRUD)
- F02 — Note Editor + Study Timer: บันทึกเนื้อหา + จับเวลาเรียน
- F03 — Smart Quiz & Review System: Quiz แบบ rule-based + Spaced Repetition (SM-2)
- F04 — AI Quiz Generator: ใช้ Claude API สร้างข้อสอบอัตโนมัติจาก note

[A — Action]

สร้าง Product Requirements Document (PRD) ฉบับสมบูรณ์ครอบคลุมทั้งโปรเจ็กต์
โดยใช้ข้อมูลทั้งหมดจาก Context ด้านบน

PRD ต้องมีโครงสร้าง 11 sections ดังนี้:

1. Overview & Problem Statement
   - อธิบายปัญหาและงานวิจัยที่สนับสนุน (เช่น Spaced Repetition ช่วยให้จำได้ดีกว่า)
   - อธิบาย PLA คืออะไร ทำอะไรได้บ้าง
   - อธิบาย phased approach (Phase 1 → Phase 2)

2. Project Information
   - ตาราง Project Info (Product Name, Platform, กลุ่มเป้าหมาย, ปัญหา, Competitors, Team, Timeline)
   - ตาราง Tech Stack (Layer / Technology / หมายเหตุ)

3. Goals & Success Metrics
   - Business Goals (เชิงคุณภาพ เช่น ลดเวลาทบทวน / สร้าง daily habit)
   - ตาราง KPIs (# / Metric / เป้าหมาย / วัดที่) อย่างน้อย 5 ตัว
   - KPI ต้องระบุตัวเลขที่วัดได้ชัดเจน เช่น ≥70%, <300ms, ≥500 attempts

4. User Stories (จัดกลุ่มตาม Feature F01–F04)
   - รูปแบบ: As a student, I want to [action] so that [benefit]
   - F01: 3 stories, F02: 3 stories, F03: 4 stories, F04: 2 stories
   - ID: US-01 ถึง US-12

5. Functional Requirements (จัดกลุ่มตาม F01–F04)
   - F01: CRUD, sorting, mock data
   - F02: plain text editor, auto-save 30 วินาที, study timer + localStorage, weekly summary
   - F03: rule-based quiz, multiple choice (1 คำถาม + 4 ตัวเลือก), score 0–100, SM-2 algorithm, review queue
   - F04: API route GET /api/quiz/generate?mode=ai, Claude API integration, JSON parsing, error handling, fallback mechanism, rate limit 10/hour

6. Non-Functional Requirements
   - Performance: ตารางระบุ response time ของแต่ละส่วน
   - Security: API key management, cron authentication, no sensitive data Phase 1
   - Reliability: fallback จาก AI → rule-based เสมอ
   - Developer Experience: TypeScript strict mode, Vitest coverage

7. Feature Roadmap ตาม Phase
   - Phase 1 ตาราง (Feature / สถานะ / หมายเหตุ) — ระบุว่าสร้างใน Module ไหน
   - Phase 2 ตาราง (Feature / สถานะ / หมายเหตุ) — ระบุ 🔜

8. API Routes
   - ตารางครบทุก endpoint (Method / Path / Description / Phase)
   - ครอบคลุม: topics, notes, study-sessions, quiz, review, cron

9. Out of Scope
   - รายการสิ่งที่ตัดออกจาก v1.0 พร้อมเหตุผล
   - ครอบคลุม: sharing, collaboration, auth, file attachment, rich text, mobile app, custom AI model

10. Open Questions
    - ตาราง (# / คำถาม / คำแนะนำ / สถานะ 🔄/✅)
    - อย่างน้อย 4 ข้อที่ยังต้องตัดสินใจ

11. TypeScript Interfaces หลัก
    - code block typescript
    - ครอบคลุม: Topic, Note, StudySession, Quiz, Question, QuizAttempt, ReviewSchedule
    - ใส่ comment อธิบาย field ที่สำคัญ

[R — Result]

ผลลัพธ์ที่ต้องการ:

- ภาษา: ไทยสำหรับคำอธิบาย, อังกฤษสำหรับ technical terms และ code
- Format: Markdown พร้อม header, table, code block ครบถ้วน
- ความยาว: ครอบคลุมทุก section โดยไม่ตัดทอน
- Tone: เป็นทางการแบบ Technical Document แต่อ่านง่าย
- เพิ่ม metadata header: เวอร์ชัน, วันที่อัปเดต, สถานะ

ผลลัพธ์ต้องพร้อมใช้เป็น reference document ให้ทีมพัฒนาใช้ตลอดโปรเจ็กต์

[E — Example]

ตัวอย่างที่ 1 — รูปแบบ KPI ที่ต้องการ:
| KPI-1 | อัตราผู้ใช้ที่ทำ Quiz อย่างน้อย 3 ครั้ง/สัปดาห์ | ≥ 70% ของ active users | ภายใน 30 วันหลัง launch |

ตัวอย่างที่ 2 — รูปแบบ User Story ที่ต้องการ:
US-07: As a student, I want to generate a quiz from my saved notes
so that I can test my own understanding without creating questions manually.

ตัวอย่างที่ 3 — รูปแบบ TypeScript Interface ที่ต้องการ:
interface ReviewSchedule {
topicId: string
lastReviewedAt?: Date
nextReviewAt: Date
repetitionInterval: number // days (SM-2 parameter)
easeFactor: number // SM-2 ease factor
consecutiveCorrect: number
}

ตัวอย่างที่ 4 — Footer ของ PRD:
_PRD ฉบับนี้สร้างโดยใช้ CARE Prompt Framework และ Claude AI
— ใช้เป็น reference ตลอดทั้งคอร์ส AI for Software Engineering_
