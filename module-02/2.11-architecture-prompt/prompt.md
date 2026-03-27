# ✅ CARE Prompt สำหรับวางแผน System Architecture — PLA Smart Quiz

> ใช้ PRD จาก 2.9 เป็น Context แล้ว request Architecture แบบ 2 ระยะ

```
[C - Context]
คุณเป็น senior software architect ที่เชี่ยวชาญ Next.js full-stack
สไตล์การตอบ: ใช้ภาษาเรียบง่าย เน้น practical สำหรับทีมขนาดเล็ก

PRD Summary — Personal Learning Assistant: Smart Quiz Feature
- Platform: Next.js + TypeScript (Web app)
- UI: Shadcn UI
- Data Fetching: TanStack Query
- Database: PostgreSQL (ยังไม่ใช้ใน prototype ระยะแรก)
- Deployment: Vercel (ระยะถัดไป)
- Target load: ~500 concurrent users (เริ่มต้น)

Feature หลักของ Smart Quiz:
  • สร้าง quiz อัตโนมัติจากบันทึกที่นักศึกษาเพิ่มไว้
  • ระบบ spaced repetition (ทบทวนซ้ำตามช่วงเวลาที่เหมาะสม)
  • ติดตาม score และ progress

ข้อจำกัด: ทีม 3 คน, ต้อง ship prototype ได้ใน 4 สัปดาห์

[A - Action]
ออกแบบ System Architecture แบบ 2 ระยะ:
- ระยะ 1: Prototype (mock data, ไม่มี backend จริง)
- ระยะ 2: Production-ready (PostgreSQL + Vercel)

[R - Result]
ตอบในรูปแบบ:
1. Folder structure (Next.js App Router)
2. Data flow diagram (อธิบายเป็นข้อความ)
3. TypeScript interfaces หลัก (Quiz, Question, QuizAttempt)
4. API Routes ที่ต้องสร้าง (Next.js Route Handlers)
5. Mock data strategy สำหรับ prototype

[E - Example]
รูปแบบ API Route ที่ต้องการ:
| Method | Path | Description |
|--------|------|-------------|
| GET  | /api/quiz/generate | สร้าง quiz จาก notes |
| POST | /api/quiz/[id]/submit | ส่งคำตอบและคำนวณ score |
```

---

> 💬 สังเกตว่าเราออกแบบ 2 ระยะในครั้งเดียว — prototype ที่ ship ได้เร็ว
> และ production path ที่ scale ได้ การวาง architecture แบบนี้ช่วยให้ทีม
> เห็นภาพทั้ง short-term และ long-term ในทีเดียว
