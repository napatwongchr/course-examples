# PRD: InternTrack — ระบบติดตามการฝึกงานนักศึกษามหาวิทยาลัย

**Version:** 1.0  
**Last Updated:** 2026-04-12  
**Product Owner:** ฝ่ายสหกิจศึกษา / วิชาชีพ  
**Status:** Draft

---

## 1. Overview & Problem Statement

### Overview
InternTrack คือ Web Application สำหรับบริหารจัดการและติดตามการฝึกงานของนักศึกษา ครอบคลุมตั้งแต่การสมัครสถานที่ฝึกงาน การบันทึก log รายวัน การส่งรายงาน ไปจนถึงการประเมินผลจากอาจารย์และผู้ดูแลจากบริษัท

### Problem Statement
ปัจจุบันกระบวนการฝึกงานยังพึ่งพาเอกสาร Word/PDF และ Email เป็นหลัก ทำให้:
- อาจารย์ที่ปรึกษาไม่ทราบ progress ของนักศึกษา real-time
- นักศึกษาลืมส่ง log / รายงานไม่ตรงเวลา
- ไม่มีประวัติย้อนหลังสำหรับการประเมิน
- บริษัทไม่มี channel กลางสำหรับให้ feedback

### Target Users
| Role | คำอธิบาย |
|------|-----------|
| **นักศึกษา** | บันทึก log งาน, ส่งรายงาน, ดูคะแนน |
| **อาจารย์ที่ปรึกษา** | ติดตาม นักศึกษาในความดูแล, approve log, ให้คะแนน |
| **Supervisor (บริษัท)** | ประเมินนักศึกษา, อนุมัติ attendance |
| **Admin (มหาวิทยาลัย)** | จัดการผู้ใช้, บริษัท, รอบการฝึกงาน |

---

## 2. User Stories แบ่งตาม Feature Group

### F01 — Authentication & User Management
- US-01: ในฐานะ Admin ฉันต้องการ import นักศึกษาจากไฟล์ CSV เพื่อสร้าง account จำนวนมากพร้อมกัน
- US-02: ในฐานะผู้ใช้ทุก Role ฉันต้องการ login ด้วย University SSO (OAuth2) เพื่อไม่ต้องจำรหัสผ่านแยก
- US-03: ในฐานะ Admin ฉันต้องการ assign Role ให้ผู้ใช้และ deactivate account ได้

### F02 — Internship Placement Management
- US-04: ในฐานะ Admin ฉันต้องการสร้าง "รอบฝึกงาน" (Internship Batch) พร้อมกำหนด start/end date
- US-05: ในฐานะนักศึกษา ฉันต้องการบันทึกข้อมูลสถานที่ฝึกงาน (บริษัท, แผนก, ที่อยู่, supervisor) เพื่อให้อาจารย์ confirm
- US-06: ในฐานะอาจารย์ ฉันต้องการ approve/reject placement ของนักศึกษา พร้อมระบุเหตุผล

### F03 — Daily Log & Attendance
- US-07: ในฐานะนักศึกษา ฉันต้องการบันทึก daily work log (วันที่, งานที่ทำ, ชั่วโมง, ความรู้สึก/reflection) ได้ทุกวัน
- US-08: ในฐานะนักศึกษา ฉันต้องการ check-in/check-out ผ่าน mobile browser (geolocation optional)
- US-09: ในฐานะ Supervisor ฉันต้องการ approve หรือ flag log ของนักศึกษาในบริษัทตนเองได้
- US-10: ในฐานะอาจารย์ ฉันต้องการดู attendance summary ของนักศึกษาแต่ละคนเป็น calendar view

### F04 — Report Submission
- US-11: ในฐานะนักศึกษา ฉันต้องการส่ง "รายงานฝึกงาน" (PDF/DOCX ≤ 20MB) ตาม milestone ที่กำหนด
- US-12: ในฐานะอาจารย์ ฉันต้องการ review รายงานพร้อม comment inline และส่งกลับให้นักศึกษาแก้ไขได้
- US-13: ในฐานะนักศึกษา ฉันต้องการดูสถานะและ comment ของรายงานแต่ละฉบับ

### F05 — Evaluation & Scoring
- US-14: ในฐานะ Supervisor ฉันต้องการกรอกแบบประเมินนักศึกษาตาม rubric ที่มหาวิทยาลัยกำหนด (คะแนน 0–100 แต่ละ criteria)
- US-15: ในฐานะอาจารย์ ฉันต้องการกรอกคะแนนฝั่งมหาวิทยาลัยและดู final score ที่รวมจากทั้งสองฝั่ง
- US-16: ในฐานะนักศึกษา ฉันต้องการดูผลการประเมินหลังอาจารย์ publish

### F06 — Notification & Dashboard
- US-17: ในฐานะนักศึกษา ฉันต้องการได้รับ notification (In-app + Email) เมื่อ log ถูก flag หรือ deadline ใกล้ครบ
- US-18: ในฐานะอาจารย์ ฉันต้องการ dashboard แสดง overview ของนักศึกษาในความดูแลทั้งหมด (log status, report status, คะแนน)
- US-19: ในฐานะ Admin ฉันต้องการ export รายงาน summary ของรอบฝึกงานเป็น Excel

---

## 3. Functional Requirements

### F01 — Authentication & User Management
- FR-01-1: ระบบต้อง support OAuth2 login ผ่าน University Identity Provider (IdP)
- FR-01-2: ระบบต้อง support bulk import users จากไฟล์ CSV (fields: student_id, name, email, advisor_id)
- FR-01-3: Admin สามารถ assign/change Role ได้ (Student, Advisor, Supervisor, Admin)
- FR-01-4: Admin สามารถ deactivate/reactivate account ได้โดยไม่ลบข้อมูล

### F02 — Internship Placement Management
- FR-02-1: Admin สร้าง Internship Batch พร้อม batch_name, start_date, end_date, enrollment_deadline
- FR-02-2: นักศึกษาบันทึก placement: company_name, department, supervisor_name, supervisor_email, address, start_date, end_date
- FR-02-3: อาจารย์ approve/reject placement พร้อม comment; นักศึกษา re-submit ได้หาก rejected

### F03 — Daily Log & Attendance
- FR-03-1: นักศึกษาสร้าง daily log: date, tasks (text), hours_worked (0.5–12), mood (1–5 scale), is_wfh (boolean)
- FR-03-2: แก้ไข log ได้ภายใน 24 ชั่วโมงหลังสร้าง; หลังจากนั้น read-only
- FR-03-3: Check-in บันทึก timestamp + optional GPS coordinate; Check-out คำนวณ duration อัตโนมัติ
- FR-03-4: Supervisor เห็น log ของนักศึกษาในบริษัทตน; กด approve หรือ flag พร้อม note ได้
- FR-03-5: ระบบคำนวณ attendance_rate = (วันที่มี approved log / วันทำงานทั้งหมด) × 100

### F04 — Report Submission
- FR-04-1: Admin กำหนด Report Milestone (milestone_name, due_date) ต่อ Batch
- FR-04-2: นักศึกษา upload ไฟล์ PDF หรือ DOCX ขนาดไม่เกิน 20MB ต่อ milestone
- FR-04-3: อาจารย์ download ไฟล์, เพิ่ม comment (text), เปลี่ยน status: Submitted → Reviewed → Approved / Needs Revision
- FR-04-4: นักศึกษา re-upload ได้เมื่อ status = Needs Revision; version เดิมยังเก็บไว้

### F05 — Evaluation & Scoring
- FR-05-1: Admin กำหนด Evaluation Template: criteria list, weight ต่อ criteria, passing_score
- FR-05-2: Supervisor กรอกคะแนน (0–100) ต่อ criteria + overall_comment; submit ครั้งเดียว แก้ได้ก่อน deadline
- FR-05-3: อาจารย์กรอกคะแนน advisor_score (0–100) + comment
- FR-05-4: Final Score = (supervisor_score × weight_supervisor) + (advisor_score × weight_advisor); ค่า default 50/50
- FR-05-5: อาจารย์ publish ผล → นักศึกษาเห็น breakdown คะแนน

### F06 — Notification & Dashboard
- FR-06-1: Trigger notification events: log flagged, report deadline -3 days, placement approved/rejected, evaluation published
- FR-06-2: Notification ส่งทาง In-app (bell icon) และ Email (template HTML)
- FR-06-3: Advisor Dashboard แสดง: นักศึกษาที่ขาด log >3 วัน, รายงานที่รอ review, placement pending
- FR-06-4: Admin export Excel: นักศึกษาทุกคนใน batch พร้อม attendance_rate, final_score, report_status

---

## 4. API Routes (REST)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/oauth/callback` | SSO callback, issue JWT |
| POST | `/admin/users/import` | Bulk import CSV |
| PATCH | `/admin/users/:id/role` | Change user role |
| POST | `/batches` | Create internship batch |
| POST | `/placements` | Student submit placement |
| PATCH | `/placements/:id/approve` | Advisor approve/reject |
| GET | `/logs` | List logs (filter by student, date) |
| POST | `/logs` | Create daily log |
| POST | `/logs/:id/checkin` | Check-in |
| POST | `/logs/:id/checkout` | Check-out |
| PATCH | `/logs/:id/review` | Supervisor approve/flag |
| POST | `/reports/:milestoneId/submit` | Upload report file |
| PATCH | `/reports/:id/review` | Advisor comment + status change |
| POST | `/evaluations` | Supervisor submit evaluation |
| POST | `/evaluations/:id/advisor-score` | Advisor submit score |
| POST | `/evaluations/:id/publish` | Publish result to student |
| GET | `/dashboard/advisor` | Advisor overview data |
| GET | `/admin/batches/:id/export` | Export Excel summary |

---

## 5. Out of Scope (v1.0)

- Mobile Native App (iOS/Android) — Web responsive เท่านั้น
- Video/call feature ระหว่างอาจารย์และนักศึกษา
- AI summarization ของ daily log
- Integration กับระบบ ERP หรือ HR ของบริษัท
- Multi-language (ภาษาอังกฤษ) — ใช้ภาษาไทยเท่านั้น
- Peer evaluation ระหว่างนักศึกษา

---

## 6. Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), Tailwind CSS, shadcn/ui |
| Backend | Node.js + Express หรือ NestJS |
| Database | PostgreSQL + Prisma ORM |
| File Storage | AWS S3 หรือ compatible (MinIO) |
| Auth | OAuth2 + JWT (university IdP) |
| Email | SendGrid / Resend |
| Deployment | Docker + Railway / Render |

---

## 7. Timeline & Team

| รายการ | รายละเอียด |
|--------|-----------|
| Sprint Duration | 2 สัปดาห์ |
| Team Size | 4 คน (2 Full-stack, 1 Backend, 1 Frontend/UX) |
| Target MVP | 3 Sprints (6 สัปดาห์) |
| MVP Scope | F01 + F02 + F03 + F04 (F05, F06 = Sprint 3+) |

---

## 8. Non-Functional Requirements

- ระบบต้องรองรับผู้ใช้พร้อมกัน 500 คน โดยไม่มี degradation
- File upload ต้องแสดง progress bar และ timeout ที่ 60 วินาที
- ข้อมูล log และรายงานต้อง retain ≥ 5 ปี
- Responsive design รองรับ mobile browser (min-width: 375px)