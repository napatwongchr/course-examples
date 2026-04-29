# Product Requirements Document (PRD)

## Group Project Tracker (GPT)

> **เวอร์ชัน:** 1.0  
> **สถานะ:** Draft — ใช้สำหรับ Demo AI Workflow

---

## 1. Overview & Problem Statement

นักศึกษามหาวิทยาลัยไทยเกือบทุกคนต้องทำงานกลุ่มอย่างน้อยภาคการศึกษาละหลายครั้ง แต่ปัญหาที่พบซ้ำๆ คือ **ไม่รู้ว่าใครทำอะไรถึงไหน** งานซ้ำซ้อน และมักรู้ตัวอีกทีก็ใกล้ deadline แล้ว

เครื่องมือที่ใช้กันอยู่อย่าง Line Group หรือ Google Docs ไม่ได้ออกแบบมาสำหรับการจัดการโปรเจกต์ ทำให้ขาด visibility และ accountability ในทีม

**Group Project Tracker (GPT)** คือเว็บแอปที่ช่วยให้ทีมนักศึกษาสามารถสร้างโปรเจกต์ แบ่ง task ให้สมาชิก ติดตาม progress แบบ Kanban และได้รับการสรุปสถานะโปรเจกต์จาก AI เพื่อให้ส่งงานได้ตรงเวลา

Phase 1 เป็น Prototype ใช้ mock data ไม่มี database จริง เพื่อ validate UX และ core logic ก่อน

---

## 2. Project Information

| ข้อมูล            | รายละเอียด                                                 |
| ----------------- | ---------------------------------------------------------- |
| **Product Name**  | Group Project Tracker (GPT)                                |
| **Platform**      | Web App                                                    |
| **กลุ่มเป้าหมาย** | นักศึกษามหาวิทยาลัยไทย อายุ 18–24 ปี                       |
| **ปัญหาที่แก้**   | ทีมไม่รู้ว่าใครทำอะไร งานหลุด deadline เพราะขาด visibility |
| **Team**          | 2 Frontend Developer + 1 Fullstack Developer               |
| **Timeline**      | 2 เดือน                                                    |

### Tech Stack

| Layer          | Technology              | หมายเหตุ                |
| -------------- | ----------------------- | ----------------------- |
| Framework      | Next.js 14 + TypeScript | App Router, strict mode |
| UI Components  | Shadcn UI               | บน Tailwind CSS         |
| Data Fetching  | TanStack Query          | Client-side caching     |
| AI Integration | Vercel AI SDK           | สำหรับ Project Summary  |
| Database       | PostgreSQL              | Phase 2 เท่านั้น        |
| Deployment     | Vercel                  | Phase 2 เท่านั้น        |

---

## 3. Goals & Success Metrics

### Business Goals

- ลดจำนวนงานที่ส่งไม่ทันหรือทำซ้ำซ้อนในทีม
- ให้ทุกคนในทีมรู้สถานะโปรเจกต์โดยไม่ต้องถามกันใน chat

### Success Metrics (KPIs)

| #     | Metric                                               | เป้าหมาย               |
| ----- | ---------------------------------------------------- | ----------------------- |
| KPI-1 | อัตราทีมที่ update task status อย่างน้อย 1 ครั้ง/วัน | ≥ 60% ของ active teams  |
| KPI-2 | เวลาโหลด Kanban board                                | < 300ms                 |
| KPI-3 | เวลาสร้าง AI Project Summary                         | < 5 วินาที              |

---

## 4. User Stories

### F01 — Project Manager

- **US-01:** As a student, I want to create a new project with a name, description, and due date so that my team has a shared space to work in.
- **US-02:** As a student, I want to view all my projects so that I can switch between them easily.
- **US-03:** As a student, I want to edit and delete projects so that I can keep my workspace up to date.

### F02 — Member Manager

- **US-04:** As a student, I want to add team members to a project by name so that everyone in my group has access.
- **US-05:** As a student, I want to see all members in a project so that I know who is on the team.
- **US-06:** As a student, I want to remove a member from a project so that the team list stays accurate.

### F03 — Kanban Task Board

- **US-07:** As a student, I want to create tasks and assign them to a team member so that everyone knows what they are responsible for.
- **US-08:** As a student, I want to move tasks across columns (To Do / In Progress / Done) so that the team can see progress at a glance.
- **US-09:** As a student, I want to set a due date and priority on each task so that the team knows what to focus on first.
- **US-10:** As a student, I want to filter tasks by member or status so that I can quickly see what is blocked or overdue.

### F04 — AI Project Summary

- **US-11:** As a student, I want AI to summarize the current project status so that I don't have to read through every task manually.
- **US-12:** As a student, I want AI to flag tasks that are overdue or at risk so that the team can take action before it's too late.

---

## 5. Functional Requirements

### F01 — Project Manager

1. รองรับ CRUD operations ครบถ้วน
2. แสดง due date และ progress % (done/total tasks) ใน project list
3. Sort projects ตาม due date ที่ใกล้ที่สุดขึ้นก่อน
4. ใช้ mock data (in-memory) ใน Phase 1

### F02 — Member Manager

1. เพิ่มสมาชิกด้วยชื่อ (ไม่มี authentication ใน Phase 1)
2. แสดงรายชื่อสมาชิกพร้อมจำนวน task ที่ assigned
3. ลบสมาชิกออกจากโปรเจกต์ได้ (task ที่ assigned ยังคงอยู่ แต่ unassigned)

### F03 — Kanban Task Board

1. Board มี 3 columns: To Do / In Progress / Done
2. Drag-and-drop task ข้าม column ได้
3. แต่ละ task มี: ชื่อ, description, assignee, due date, priority (Low / Medium / High)
4. Filter task ตาม assignee และ status ได้
5. Highlight task ที่ overdue ด้วยสีแดง
6. บันทึก task ใน mock data (in-memory) ใน Phase 1

### F04 — AI Project Summary

1. API Route `POST /api/projects/[id]/summary` เรียก Claude ผ่าน Vercel AI SDK
2. ส่ง task list ทั้งหมด (ชื่อ, status, assignee, due date) เป็น context ให้ Claude สรุป
3. Output: สถานะภาพรวม, tasks ที่ overdue, tasks ที่ at risk, และ recommendation
4. Fallback message กรณี API timeout: "ไม่สามารถสร้างสรุปได้ในขณะนี้"

---

## 6. Non-Functional Requirements

### Performance

| Requirement            | เป้าหมาย                     |
| ---------------------- | ---------------------------- |
| Project list load time | < 300ms (Phase 1, mock data) |
| Kanban board render    | < 300ms                      |
| AI Summary generation  | < 5 วินาที (รวม API call)    |

### Reliability

- ระบบต้องมี fallback message เมื่อ Claude API ไม่พร้อมใช้งาน

---

## 7. Feature Roadmap ตาม Phase

### Phase 1 — Prototype

| Feature                | สถานะ       |
| ---------------------- | ----------- |
| F01 Project Manager    | ✅ in scope |
| F02 Member Manager     | ✅ in scope |
| F03 Kanban Task Board  | ✅ in scope |
| F04 AI Project Summary | ✅ in scope |

### Phase 2 — Production

| Feature                       | สถานะ |
| ----------------------------- | ----- |
| PostgreSQL Integration        | 🔜    |
| Vercel Deployment             | 🔜    |
| User Authentication           | 🔜    |
| Real-time updates (WebSocket) | 🔜    |

---

## 8. Out of Scope

- Real-time collaboration (WebSocket / live cursor)
- File attachments ใน task
- Comment thread ใน task
- Notification system (email / push)
- User authentication / login (Phase 1 ใช้ anonymous)
- Mobile app
- Calendar view
- Time tracking
