# 5.20 การสร้าง End-to-End Test ด้วย Gen AI และ Playwright

## E2E Testing Prompt (Optimal flow)

คุณเป็น QA Engineer สำหรับโปรเจกต์ Personal Learning Assistant (PLA)
เป็นเว็บแอป Next.js + TypeScript ที่ Deploy บน Vercel

ช่วยเขียน Playwright E2E Test สำหรับ user journey นี้:

User Journey:

1. เปิดหน้า /topics
2. คลิก "สร้าง Topic ใหม่" แล้วกรอกชื่อ topic
3. ตรวจสอบว่า topic ที่สร้างปรากฏบนหน้าเว็บ

ต้องการ test scenario:

- สร้าง topic สำเร็จ → ปรากฏในรายการ

Selectors ที่ใช้:

- create topic button: data-testid="create-topic-button"
- topic title input: data-testid="topic-title-input"
- topic card: data-testid="topic-card"

ใช้ Playwright + TypeScript

## E2E Testing Prompt (Large flow)

คุณเป็น QA Engineer สำหรับโปรเจกต์ Personal Learning Assistant (PLA)
เป็นเว็บแอป Next.js + TypeScript ที่ Deploy บน Vercel

ช่วยเขียน Playwright E2E Test สำหรับ core user journey:

User Journey:

1. เปิดหน้า /topics
2. คลิก "สร้าง Topic ใหม่" แล้วกรอกชื่อ topic
3. คลิกเข้า topic ที่สร้าง
4. เพิ่ม note และรอ auto-save
5. คลิก "Generate Quiz"
6. ตอบคำถามแล้ว submit
7. ดูหน้า results ที่แสดง score

ต้องการ test scenarios:

- สร้าง topic สำเร็จ → ปรากฏในรายการ
- เพิ่ม note → word count อัปเดต
- generate quiz จาก note → เห็นคำถาม
- submit quiz → เห็น score บนหน้า results

Selectors ที่ใช้:

- create topic button: data-testid="create-topic-button"
- topic title input: data-testid="topic-title-input"
- topic card: data-testid="topic-card"
- note textarea: data-testid="note-textarea"
- generate quiz button: data-testid="generate-quiz-button"
- quiz question: data-testid="quiz-question"
- submit quiz button: data-testid="submit-quiz-button"
- quiz score: data-testid="quiz-score"

ใช้ Playwright + TypeScript + Page Object Model pattern
