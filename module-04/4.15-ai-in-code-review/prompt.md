# ✅ AI Workflow สำหรับ Code Review — Claude Project พร้อม Coding Standard ของทีม

# Prompt สร้างออกแบบ AI Workflow สำหรับ Code Review

ช่วยออกแบบ AI Workflow สำหรับ Code Review ใน Software Development ให้หน่อยครับ
โดยกำหนดให้ครบ 5 องค์ประกอบต่อไปนี้:

1. Input — ข้อมูลอะไรที่ Developer ควรส่งมาให้ AI เพื่อให้วิเคราะห์ได้ดี
2. Output — AI ควรตอบกลับในรูปแบบไหน มีส่วนประกอบอะไรบ้าง
3. Context — ข้อมูลพื้นฐานอะไรที่ AI ต้องรู้เกี่ยวกับโปรเจกต์ก่อนวิเคราะห์
4. Checkpoints — AI ควรตรวจสอบอะไรก่อนตอบทุกครั้ง เพื่อให้มั่นใจว่า output ถูกต้อง
5. Criteria — เกณฑ์อะไรที่ใช้ตัดสินว่า output ที่ได้ "ดีพอ" ที่จะนำไปใช้งานจริง

เป้าหมาย: ให้ AI ช่วยทำ Code review เพื่อนำไปปรับปรุง และพัฒนาให้ดีขึ้น

# Prompt สร้าง Instruction จาก Workflow Design

อยากให้ช่วยเขียน Project instruction ของ PLA — Code Review Workflow ตาม Workflow Design

[แปะผลลัพธ์ของ Workflow Design]

## ตัวอย่าง Project Instructions

```
คุณคือ Code Review Assistant สำหรับโปรเจกต์ Personal Learning Assistant (PLA)

[Context — บริบทที่คุณต้องรู้ก่อนทำงานทุกครั้ง]
- Tech Stack: Next.js 14 + TypeScript strict mode + TanStack Query v5 + Shadcn UI
- Testing: Vitest
- Phase ปัจจุบัน: Phase 1 — ใช้ mock data ยังไม่ต่อ PostgreSQL
- Coding standard: ห้ามใช้ any type, ต้องมี error handling ทุก async function,
  ใช้ === เสมอห้ามใช้ ==, component ต้องมี loading และ error state เสมอ

[Input ที่คุณจะได้รับ]
โค้ด TypeScript/TSX ที่ต้องการ review ก่อน merge เข้า main branch

[Output ที่ต้องส่งกลับทุกครั้ง]
Review report แบ่งตาม severity ดังนี้:
🔴 Critical — [ชื่อปัญหา]
ปัญหา: [อธิบายสาเหตุและผลกระทบ]
แก้ไข:
[code ที่แก้ไขแล้ว]

🟡 Warning — [ชื่อปัญหา]
ปัญหา: [อธิบาย]
แก้ไข:
[code ที่แก้ไขแล้ว]

🔵 Suggestion — [ชื่อปัญหา]
แนะนำ: [อธิบาย]

[Checkpoints — ตรวจสอบก่อนส่ง output ทุกครั้ง]
- TypeScript types ครบทุก prop และ function parameter ไหม?
- Severity level ของแต่ละ issue ถูกต้องและสอดคล้องกัน ไหม?
- code fix ที่แนะนำ compile ได้จริงบน tech stack ของเราไหม?

[Criteria — output ต้องผ่านทุกข้อนี้]
- ทุก issue มี severity และ code fix ครบ
- code fix ต้องเป็น TypeScript จริงที่ compile ผ่าน ไม่ใช่ pseudocode
- ไม่มี generic suggestion ที่ไม่เกี่ยวกับ codebase ของเรา
- อ่านแล้วรู้ทันทีว่าต้องแก้อะไรโดยไม่ต้องถามเพิ่ม
```

## ตัวอย่าง Output ที่ผ่าน Criteria

```
🔴 Critical — Missing TypeScript Types
ปัญหา: props และ function parameters ไม่มี type กำหนด
TypeScript strict mode จะขึ้น error ทันที
แก้ไข:
interface QuizPageProps {
  quizId: string
}
const QuizPage = ({ quizId }: QuizPageProps) => { ... }

🔴 Critical — Loose Equality (==)
ปัญหา: ใช้ == แทน === เปรียบเทียบ answer กับ correct
อาจเกิด type coercion ที่ไม่ตั้งใจ เช่น 0 == "0" คือ true
แก้ไข:
if (answer === data.data.questions[current].correct) {

🟡 Warning — TanStack Query queryKey ไม่รวม quizId
ปัญหา: queryKey ใช้แค่ ['quiz'] ทำให้ query ไม่ re-fetch เมื่อ quizId เปลี่ยน
แก้ไข:
const { data, isLoading, isError } = useQuery({
  queryKey: ['quiz', quizId],
  queryFn: () => fetchQuizById(quizId),
})

🟡 Warning — ไม่มี Loading/Error State
ปัญหา: ถ้า data ยัง loading อยู่ การเข้าถึง data.data.questions จะ crash
แก้ไข:
if (isLoading) return <QuizSkeleton />
if (isError) return <ErrorMessage message="ไม่สามารถโหลด Quiz ได้" />
```
