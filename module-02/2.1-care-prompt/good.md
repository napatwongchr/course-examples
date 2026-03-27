# ✅ CARE Prompt — Quiz Feature

**Context:** แอป PLA (Personal Learning Assistant) เขียนด้วย Next.js 14 + TypeScript
ไฟล์ที่เกี่ยวข้อง: `lib/quiz.ts`, `types/quiz.ts`

**Action:** สร้างฟังก์ชัน `fetchQuizQuestions(topicId: string)` ที่ดึง quiz questions จาก Anthropic API

**Result:** ฟังก์ชันต้อง return `Question[]` ตาม interface ใน `types/quiz.ts`, handle error กรณี API timeout

**Example:** ดูตัวอย่างการเรียก API ที่ `lib/notes.ts` สำหรับ pattern เดียวกัน
