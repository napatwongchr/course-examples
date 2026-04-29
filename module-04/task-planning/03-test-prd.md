# Product Requirements Document (PRD)

## Task Tracker Pro

> **เวอร์ชัน:** 1.0
> **สถานะ:** Draft — ใช้สำหรับ Demo AI Workflow (4.13)

---

## 1. Overview & Problem Statement

นักพัฒนาซอฟต์แวร์ในทีมขนาดเล็ก (3–6 คน) มักเสียเวลา 30–60 นาทีต่อ Sprint ในการนั่งแตก Task จาก Requirement ด้วยมือ โดยเฉพาะเมื่อ PRD มีหลาย Feature และหลาย Requirement ซ้อนกัน

ปัญหาที่พบบ่อย:
- Task บางอันถูกมองข้ามเพราะอ่าน Requirement ไม่ครบ
- Effort estimate ไม่สม่ำเสมอ ขึ้นอยู่กับว่าใครเป็นคนประเมิน
- ไม่มีเส้นเชื่อมระหว่าง Task กับ Requirement ต้นทาง

**Task Tracker Pro** คือเว็บแอปสำหรับทีม Dev ขนาดเล็กที่ต้องการ จัดการ Task, ติดตาม Sprint Progress, และใช้ AI ช่วยแตก Requirement เป็น Task List พร้อม Effort estimate ก่อนเริ่ม Sprint

Phase 1 เป็น MVP ใช้ mock data ไม่มี database จริง เพื่อ validate core workflow ก่อน

---

## 2. Project Information

| ข้อมูล | รายละเอียด |
|--------|------------|
| **Product Name** | Task Tracker Pro |
| **Platform** | Web App |
| **กลุ่มเป้าหมาย** | Dev Team ขนาดเล็ก 3–6 คน |
| **ปัญหาที่แก้** | เสียเวลาแตก Task และ estimate ผิดพลาด |
| **Team** | 1 Frontend + 1 Backend Developer |
| **Timeline** | 6 สัปดาห์ |

### Tech Stack

| Layer | Technology | หมายเหตุ |
|-------|-----------|---------|
| Framework | Next.js 14 + TypeScript | App Router |
| UI | Shadcn UI + Tailwind CSS | — |
| State | Zustand | Client-side only |
| AI | Claude API (Anthropic SDK) | สำหรับ Task Planning |
| Database | — | Phase 1 ใช้ in-memory |
| Testing | Vitest + Testing Library | Unit + Integration |

---

## 3. Goals & Success Metrics

### Business Goals

- ลดเวลา Sprint Planning จาก 60 นาที เหลือ 20 นาที
- ทุก Task มี Requirement ที่ map กลับได้เสมอ

### Success Metrics (KPIs)

| # | Metric | เป้าหมาย |
|---|--------|---------|
| KPI-1 | เวลา AI แตก Task จาก PRD ขนาดกลาง (5 Feature) | < 10 วินาที |
| KPI-2 | อัตราการครอบคลุม Requirement | ≥ 95% ของ Functional Req |
| KPI-3 | Kanban board render time | < 300ms |

---

## 4. User Stories

### F01 — Sprint Management

- **US-01:** As a dev, I want to create a Sprint with a name and date range so that my team has a clear timeframe to work in.
- **US-02:** As a dev, I want to view all Sprints and their statuses so that I can track past and current work.
- **US-03:** As a dev, I want to close a Sprint and move unfinished tasks to the next Sprint automatically.

### F02 — Task Management

- **US-04:** As a dev, I want to create tasks manually with title, description, assignee, priority, and story points.
- **US-05:** As a dev, I want to move tasks between columns (Backlog / In Progress / In Review / Done) via drag-and-drop.
- **US-06:** As a dev, I want to filter tasks by assignee or priority so that I can focus on what matters.
- **US-07:** As a dev, I want to see tasks that are overdue highlighted so that nothing falls through the cracks.

### F03 — AI Task Planner

- **US-08:** As a dev, I want to paste a PRD and have AI break it down into a Task List with Story Point estimates.
- **US-09:** As a dev, I want each AI-generated task to reference the Requirement it came from so that I can verify coverage.
- **US-10:** As a dev, I want to edit or delete AI-generated tasks before adding them to the Sprint.
- **US-11:** As a dev, I want to add all approved AI tasks to the current Sprint in one click.

### F04 — Sprint Summary

- **US-12:** As a dev, I want to see a Sprint burndown showing tasks completed per day.
- **US-13:** As a dev, I want AI to generate a Sprint Summary report showing what was done and what was left.

---

## 5. Functional Requirements

### F01 — Sprint Management

1. CRUD operations สำหรับ Sprint (ชื่อ, Start Date, End Date, Status)
2. Status ของ Sprint: Planning / Active / Closed
3. Sprint หนึ่งๆ มี Task ได้ไม่จำกัด
4. ปิด Sprint แล้ว ย้าย Task ที่ยังไม่ Done ไปที่ Backlog โดยอัตโนมัติ

### F02 — Task Management

1. Task มี fields: Title, Description, Assignee, Priority (P0–P3), Story Points, Status, Due Date
2. Drag-and-drop ข้าม column ได้บน Kanban Board
3. Filter task ตาม Assignee, Priority, Status
4. Highlight task ที่ overdue (due date ผ่านแล้ว status ไม่ใช่ Done) ด้วยสีแดง
5. Phase 1 ใช้ in-memory mock data

### F03 — AI Task Planner

1. รับ PRD เป็น plain text หรือ markdown ผ่าน textarea
2. ส่ง PRD ให้ Claude API วิเคราะห์และแตก Task List
3. แต่ละ Task ที่ AI สร้าง ต้องมี: ชื่อ Task, Effort (SP), และ Reference (quote จาก PRD)
4. แสดงผลใน Preview Table ก่อน Confirm
5. ผู้ใช้สามารถ Edit, Delete Task ใน Preview ได้ก่อน Add to Sprint
6. กด "Add to Sprint" แล้ว Tasks ทั้งหมดใน Preview ถูก Add เข้า Active Sprint

### F04 — Sprint Summary

1. Burndown Chart แสดง: แกน X = วันใน Sprint, แกน Y = Story Points คงเหลือ
2. AI Sprint Summary: ส่ง task list ทั้งหมดพร้อม status ให้ Claude สรุป
3. Output ของ Summary: ภาพรวม Sprint, Tasks ที่ Done, Tasks ที่ค้างอยู่, และ Recommendation
4. Export Summary เป็น plain text

---

## 6. Non-Functional Requirements

| Requirement | เป้าหมาย |
|------------|---------|
| AI Task Planning response time | < 10 วินาที (PRD ขนาด 5 Feature) |
| Kanban board render | < 300ms |
| Test coverage | ≥ 80% (Happy path + edge cases, Vitest) |
| TypeScript | Strict mode ทุกไฟล์ |

---

## 7. Out of Scope

- User authentication
- Real-time collaboration
- File attachments
- Notification system (email / push)
- Mobile app
- Time tracking
- GitHub / Jira integration
