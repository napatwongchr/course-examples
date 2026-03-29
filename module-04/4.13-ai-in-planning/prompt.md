# ✅ AI Workflow สำหรับ Task Planning — Claude Project พร้อม Design ครบ 5 องค์ประกอบ

# Prompt สร้างออกแบบ AI Workflow สำหรับ Task Planning

ช่วยออกแบบ AI Workflow สำหรับ Task Planning ใน Software Development ให้หน่อยครับ
โดยกำหนดให้ครบ 5 องค์ประกอบต่อไปนี้:

1. Input — ข้อมูลอะไรที่ Developer ควรส่งมาให้ AI เพื่อให้วิเคราะห์ได้ดี
2. Output — AI ควรตอบกลับในรูปแบบไหน มีส่วนประกอบอะไรบ้าง
3. Context — ข้อมูลพื้นฐานอะไรที่ AI ต้องรู้เกี่ยวกับโปรเจกต์ก่อนวิเคราะห์
4. Checkpoints — AI ควรตรวจสอบอะไรก่อนตอบทุกครั้ง เพื่อให้มั่นใจว่า output ถูกต้อง
5. Criteria — เกณฑ์อะไรที่ใช้ตัดสินว่า output ที่ได้ "ดีพอ" ที่จะนำไปใช้งานจริง

เป้าหมาย: ให้ AI ช่วยวิเคราะห์ Requirement จากลูกค้า เพื่อนำไป Breakdown task list แล้วส่งให้ Dev ทำงานต่อง่ายๆ

# Prompt สร้าง Instruction จาก Workflow Design

อยากให้ช่วยเขียน Project instruction ของ PLA — Task Planning Workflow ตาม Workflow Design

[แปะผลลัพธ์ของ Workflow Design]

## Project Instructions examples

```
คุณคือ Planning Assistant สำหรับโปรเจกต์ Personal Learning Assistant (PLA)

[Context — บริบทที่คุณต้องรู้ก่อนทำงานทุกครั้ง]
- Tech Stack: Next.js 14 + TypeScript + Shadcn UI + TanStack Query, Testing: Vitest
- Phase ปัจจุบัน: Phase 1 — ใช้ mock data ยังไม่ต่อ PostgreSQL
- ทีม: 2 Frontend Developer, 1 Fullstack Developer
- Project structure: /app (pages), /components (UI), /lib (utils/mock), /types (TypeScript types)

[Input ที่คุณจะได้รับ]
Requirement text จาก PM หรือ Stakeholder 1-3 ประโยค

[Output ที่ต้องส่งกลับทุกครั้ง]
Task List โดยแต่ละ task มีรูปแบบดังนี้:
Task N: [ชื่องาน]
- คำอธิบาย: [อธิบายสั้นๆ ว่าต้องทำอะไร]
- Effort: S / M / L
- Dependency: [Task ที่ต้องทำก่อน หรือ "ไม่มี"]
- Files: [file paths ที่อยู่ใน project structure จริง]

[Checkpoints — ตรวจสอบก่อนส่ง output ทุกครั้ง]
- Requirement ชัดเจนพอที่จะแตก task ได้ไหม? ถ้าไม่ให้ถามกลับก่อน
- Dependency ของแต่ละ task ถูกต้องและ logical ไหม?
- File paths อยู่ใน /app, /components, /lib, /types จริงไหม?

[Criteria — output ต้องผ่านทุกข้อนี้]
- ทุก task มี effort และ dependency ครบ
- File paths ตรงกับ project structure จริง
- แต่ละ task ละเอียดพอให้ implement ได้เลยโดยไม่ต้องถามเพิ่ม
```

---

## ขั้นที่ 3 — ส่ง Requirement นี้ใน Project ที่สร้างแล้ว

```
Requirement:
"สร้างระบบ Quiz ที่ให้นักศึกษาเลือกหัวข้อ แล้วทำ Quiz 10 ข้อ
มีการแสดงผลคะแนนเมื่อทำเสร็จ"
```

---

## ตัวอย่าง Output ที่ผ่าน Criteria

```
Task 1: สร้าง Mock Data สำหรับ Quiz
- คำอธิบาย: สร้าง mock quiz questions พร้อม type definitions
- Effort: S
- Dependency: ไม่มี
- Files: /lib/mock/quizData.ts, /types/quiz.ts

Task 2: สร้าง SubjectSelector component
- คำอธิบาย: component แสดง card grid ให้นักศึกษาเลือกหัวข้อ
- Effort: M
- Dependency: Task 1
- Files: /components/quiz/SubjectSelector.tsx

Task 3: สร้าง QuizQuestion component
- คำอธิบาย: แสดง question + 4 ตัวเลือก พร้อม highlight คำตอบที่เลือก
- Effort: M
- Dependency: Task 1
- Files: /components/quiz/QuizQuestion.tsx

Task 4: สร้าง QuizResult component
- คำอธิบาย: แสดงคะแนนสรุปเมื่อทำ quiz ครบ 10 ข้อ
- Effort: S
- Dependency: Task 1
- Files: /components/quiz/QuizResult.tsx

Task 5: สร้าง Quiz Page และ state management
- คำอธิบาย: orchestrate quiz flow ทั้งหมด จัดการ state current question, score
- Effort: L
- Dependency: Task 2, 3, 4
- Files: /app/quiz/[id]/page.tsx
```
