# module-04 — Course Examples

Demo prompts สำหรับ Module 04: AI-assisted Workflow Design

| Lesson | หัวข้อ Demo | ไฟล์ |
|--------|------------|------|
| 4.13 | AI Workflow สำหรับ Task Planning — Design → Build → Test | `4.13-ai-in-planning/` |
| 4.15 | AI Workflow สำหรับ Code Review — พร้อม Coding Standard ของทีม | `4.15-ai-in-code-review/` |
| 4.20 | AI Workflow วิเคราะห์ Bug — Claude Project ครบ 5 องค์ประกอบ | `4.20-ai-workflow/` |

## วิธีใช้

แต่ละ folder ประกอบด้วย:
- `bad.md` — ❌ Prompt แบบไม่มี context ส่งก่อนเพื่อให้เห็นว่า AI ตอบแบบ generic
- `good.md` — ✅ Claude Project Instructions + Prompt ที่มีโครงสร้างครบ 5 องค์ประกอบ

## ขั้นตอนการ Demo

1. เปิด Claude.ai
2. ส่ง `bad.md` ใน Chat ธรรมดา → แสดงผลลัพธ์ที่ได้
3. สร้าง Claude Project ตามขั้นตอนใน `good.md` → วาง Custom Instructions
4. ส่ง Prompt ใน Project → เปรียบเทียบผลลัพธ์

## หมายเหตุ

Demo ทุกหัวข้อใน Module 04 ใช้ **Claude Project** เป็นเครื่องมือหลัก
เพื่อแสดงให้เห็นความแตกต่างระหว่างการถาม AI แบบ ad-hoc
กับการออกแบบ Workflow ที่มีโครงสร้างและ reusable
