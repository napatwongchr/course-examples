# 5.19 การสร้าง Integration Test ด้วย Generative AI

## Integration test creation prompt

คุณเป็น QA Engineer สำหรับโปรเจกต์ Personal Learning Assistant (PLA)
Tech stack: Next.js 14 + TypeScript + Vitest + in-memory store (Map)

ช่วยเขียน Integration Test สำหรับ quiz submission flow ที่ต้องทำงานร่วมกัน:

- store.quizzes — ดึงข้อมูล quiz จาก in-memory store
- calculateScore() ใน src/lib/score.ts — คำนวณ score จาก answers เทียบกับ questions[i].correctIndex
- calculateNextReview() ใน src/lib/sm2.ts — อัพเดต ReviewSchedule ด้วย SM-2 algorithm
- store.quizAttempts + store.reviewSchedules — บันทึกผลลัพธ์กลับไป

API: POST /api/quiz/[id]/submit รับ { answers: number[] }
Requirements:

1. submit สำเร็จ: บันทึก QuizAttempt + score + อัพเดต ReviewSchedule → return 201
2. quiz ไม่มีในระบบ: return 404
3. answers ไม่ตรงจำนวน questions: return 400

ใช้ Vitest + NextRequest mock + TypeScript
แสดง test ที่ run ได้เลยโดยไม่ต้องแก้ไขมาก
