# module-01 — Course Examples

Demo prompts สำหรับ Module 01: GenAI Fundamentals & Developer Mindset

| Lesson | หัวข้อ Demo | ไฟล์ |
|--------|------------|------|
| 1.8 | Developer Role Change — Snake Game | `1.8-developer-role/` |
| 1.23 | Vibe Coding — Pomodoro Timer | `1.23-vibe-coding/` |
| 1.33 | PRD Example — Study Buddy | `1.33-prd-example/` |
| 1.38 | PRD in Context — เปรียบเทียบมี/ไม่มี PRD | `1.38-prd-in-context/` |
| 1.39 | Choosing Models — เปรียบเทียบ Opus / Sonnet / Haiku | `1.39-choosing-models/` |

## วิธีใช้

แต่ละ folder ประกอบด้วย:
- `bad.md` — ❌ Prompt แบบคลุมเครือ ส่งก่อนเพื่อให้เห็นผลลัพธ์ที่ไม่ดี
- `good.md` — ✅ Prompt ที่ระบุ Requirement ชัดเจน เปิด chat ใหม่แล้วเปรียบเทียบ
- `prompt.md` — Prompt เดียว (ใช้ใน Demo ที่ไม่มี bad/good comparison)

## หมายเหตุ

Demo ที่ไม่ต้องใช้ไฟล์ prompt:
- **1.5 Token & Context Window** → เปิด https://platform.openai.com/tokenizer แล้วพิมพ์ข้อความตาม script
- **1.34 Claude Code Intro** → สาธิต Mode ต่างๆ ใน Claude Code CLI โดยตรง
- **1.35 Context Management** → รันคำสั่ง `/context` และ `/clear` ใน Claude Code
