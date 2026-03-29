# 5.11 การวิเคราะห์ช่องว่างของการทดสอบและกรณีขอบที่ Generative AI มักพลาด

## Coverage gap analyse

นี่คือ function และ test ที่ AI เขียนให้สำหรับ PLA โปรเจกต์:

// function จาก src/lib/quiz-generator.ts
export function generateRuleBasedQuiz(notes: Note[], quizId: string): Quiz {
const totalWords = notes.reduce((sum, n) => sum + n.wordCount, 0)

if (notes.length < 3 || totalWords < 50) {
throw new InsufficientContentError()
}

const sentences = notes.flatMap(n => extractSentences(n.content))

if (sentences.length < 4) {
throw new InsufficientContentError()
}

const shuffled = [...sentences].sort(() => Math.random() - 0.5)
const questionCount = Math.min(5, Math.floor(sentences.length / 4))
const selected = shuffled.slice(0, Math.max(1, questionCount))
// ...สร้าง questions และ return Quiz
}

// tests ที่ AI สร้าง
it('should generate quiz when notes are sufficient', ...)
it('should throw InsufficientContentError when notes < 3', ...)
it('should throw InsufficientContentError when totalWords < 50', ...)

ช่วยวิเคราะห์ Coverage Gap:

1. Branch coverage ที่ขาด
2. Condition combinations ที่ยังไม่ได้ทดสอบ
3. เขียน test cases เพิ่มเติมที่ขาด
