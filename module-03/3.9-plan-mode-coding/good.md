# ✅ ใช้ Plan mode — ให้ AI วางแผนก่อน implement

ใช้ Plan mode ใน Claude Code แล้วส่ง prompt นี้:

```
[C - Context]
คุณเป็น senior developer กำลัง build PLA (Personal Learning Assistant)
Web app สำหรับนักศึกษามหาวิทยาลัยไทย

Tech Stack:
- Next.js 14 + TypeScript (App Router)
- Shadcn UI สำหรับ UI components
- TanStack Query สำหรับ data fetching
- Phase 1: ใช้ mock data (in-memory JSON) ยังไม่ต่อ database
- Testing: Vitest

[A - Action]
ใช้ Plan mode สร้าง F01 Topic Manager อ้างอิงตาม PLA-PRD.md:

User Stories (Section 4 — F01):
- US-01: As a student, I want to create a new topic with a name and description so that I can organize the content I want to learn in a systematic way.
- US-02: As a student, I want to view all my topics so that I know what I am currently studying.
- US-03: As a student, I want to edit and delete topics so that I can keep my content up to date at all times.

Functional Requirements (Section 5 — F01):
1. รองรับ CRUD operations ครบ (Create, Read, Update, Delete)
2. แสดงจำนวน notes และ total study time ใน topic list
3. Sort topics ตาม last studied date (ล่าสุดขึ้นก่อน)
4. ใช้ mock data (in-memory) ใน Phase 1

TypeScript Interface (Section 11):
interface Topic {
  id: string
  title: string
  description?: string
  createdAt: Date
  updatedAt: Date
  totalStudyMinutes: number
  noteCount: number
}

[R - Result]
ก่อน implement ขอ Plan ก่อนนะครับ แสดง:
1. ไฟล์ทั้งหมดที่จะสร้าง (file tree)
2. สิ่งที่แต่ละ component ทำ
3. ลำดับการสร้าง (dependency order)
```

---

> 💬 สังเกตนะครับ — เราบอกชัดเจนตอนท้ายว่า "ขอ Plan ก่อน" ไม่ใช่ implement ทันที
> พอ AI เสนอ Plan มา เราสามารถ review ว่าถูกทิศทางหรือไม่
> มีไฟล์อะไรขาดหายไปไหม มี component ที่ไม่ต้องการไหม
> แก้ได้ก่อนที่จะมีโค้ดแม้แต่บรรทัดเดียว — นี่คือข้อดีของ Plan mode
