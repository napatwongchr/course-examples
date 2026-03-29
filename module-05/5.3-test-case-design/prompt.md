# 5.3 การใช้ Generative AI ช่วยออกแบบ Test Case และ Test Data จาก Requirement

## Test case design Prompt

คุณเป็น QA Engineer ที่ทำงานกับโปรเจกต์ Personal Learning Assistant (PLA)
เป็นเว็บแอปสำหรับนักศึกษาไทย สร้างด้วย Next.js + TypeScript + Vitest

Feature: Quiz Submission
API: POST /api/quiz/[id]/submit รับ body { answers: number[] }

Requirement:

- ระบบต้องบันทึก score (0-100) และ timestamp ของการส่งคำตอบ
- จำนวน answers ต้องตรงกับจำนวน questions ใน quiz
- หาก quiz ไม่มีในระบบ ระบบต้องคืน 404
- หาก answers ไม่ใช่ array หรือจำนวนไม่ตรง ระบบต้องคืน 400
- หลังส่งสำเร็จ ระบบต้องอัพเดต Review Schedule ผ่าน SM-2 algorithm

กรุณาสร้าง test cases ที่ครอบคลุม:

1. Positive scenarios (การทำงานปกติ)
2. Negative scenarios (input ผิด, เงื่อนไขไม่ครบ)
3. Edge cases (ค่าขีดจำกัด, กรณีพิเศษ)
4. ระบุ precondition, input, expected output แต่ละ case ให้ชัดเจน

## Test data creation prompt

สร้าง test data สำหรับ Quiz Submission feature ของ PLA โปรเจกต์
API: POST /api/quiz/[id]/submit รับ body { answers: number[] }
Tech stack: Next.js + TypeScript + Vitest

ต้องการ test data ครอบคลุม:

1. ข้อมูลปกติ: quiz ที่มี 5 คำถาม (Question[] พร้อม correctIndex), answers ครบทุกข้อ
2. Edge case data: quiz ที่มี 1 คำถาม, answers ถูกหมด vs ผิดหมด
3. Invalid data: answers เป็น array ว่าง, answers มีจำนวนไม่ตรงกับ questions
4. Boundary data: score = 0 (ตอบผิดทุกข้อ), score = 100 (ตอบถูกทุกข้อ)

ออกมาในรูปแบบ TypeScript object ที่ใช้ใน Vitest ได้เลย

## Test assertion creation prompt

ฉันกำลังออกแบบ test สำหรับ Quiz Submission API ของ PLA (Personal Learning Assistant)

API: POST /api/quiz/[id]/submit
Input: { answers: number[] } ใน request body, quiz id ใน URL params
Expected behavior ตาม requirement:

- บันทึกคำตอบและคำนวณ score (0-100) เทียบกับ questions[i].correctIndex
- บันทึก timestamp (completedAt) ที่ส่งคำตอบ
- อัพเดต ReviewSchedule ผ่าน SM-2 algorithm หลัง submit สำเร็จ
- คืน 404 ถ้า quiz ไม่มีในระบบ
- คืน 400 ถ้า answers ไม่ใช่ array หรือจำนวนไม่ตรงกับ questions

ช่วยสร้าง assertion checklist ว่าต้องตรวจสอบอะไรบ้างให้ครอบคลุม
ระบุเป็นหัวข้อภาษาไทย ไม่ต้องเขียนเป็นโค้ด
