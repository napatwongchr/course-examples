# ✅ CARE Prompt สำหรับสร้าง PRD — Smart Quiz Feature

```
[C - Context]
คุณเป็น product manager ที่เชี่ยวชาญการเขียน PRD
สำหรับเว็บแอปในวงการ EdTech

ข้อมูลโปรเจกต์:
- Product: Personal Learning Assistant (PLA) — เว็บแอป
- กลุ่มเป้าหมาย: นักศึกษามหาวิทยาลัยไทย อายุ 18-24 ปี
- ปัญหาหลัก: นักศึกษาลืมเนื้อหาที่เรียน เพราะขาดระบบทบทวนที่เป็นระบบ
- Platform: Web app (Next.js + TypeScript)
- UI: Shadcn UI / TanStack Query
- Stage: Prototype (ยังใช้ mock data, ยังไม่ต่อ DB จริง)
- อนาคต: ต่อ PostgreSQL + deploy บน Vercel

[A - Action]
สร้าง Product Requirements Document (PRD)
สำหรับ feature ใหม่: "Smart Quiz & Review System"

[R - Result]
PRD ต้องมีโครงสร้างดังนี้:
1. Overview & Problem Statement (2-3 ย่อหน้า)
2. Goals & Success Metrics (KPIs วัดได้ 3-5 ข้อ)
3. User Stories (อย่างน้อย 5 ข้อ format: As a... I want... So that...)
4. Functional Requirements (numbered list)
5. Non-Functional Requirements (performance, accessibility)
6. Out of Scope
7. Open Questions

ความยาว: กระชับ ชัดเจน ไม่เกิน 2 หน้า A4

[E - Example]
ตัวอย่าง Success Metric ที่ต้องการ:
"70% ของ active users ทำ quiz อย่างน้อย 3 ครั้งต่อสัปดาห์
ภายใน 30 วันหลัง launch"
```

---

> 💬 สังเกตว่าเราใส่ทั้ง current stage (prototype + mock data) และ future state
> (PostgreSQL + Vercel) ลงใน Context — ทำให้ AI เข้าใจว่า PRD ฉบับนี้
> ต้องรองรับทั้งสองระยะ และ scope ของ prototype ไม่จำเป็นต้องครบทุกอย่างตั้งแต่แรก
