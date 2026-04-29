# ตัวอย่าง Test Suite ของ PLA — สำหรับประเมินด้วย Rubric

> **วิธีใช้:** แนบไปกับ Prompt ใน `02-rubric-assessment-prompt.md`

---

## ข้อมูล Test Suite ปัจจุบัน

**โปรเจกต์:** PLA (Personal Learning Assistant)  
**จำนวน Test ทั้งหมด:** 34 test cases  
**เวลารัน:** 42 วินาที (Unit + Integration รวมกัน)  
**Coverage Report (จาก Vitest):**
- Statements: 62.4%
- Branches: 51.3%
- Functions: 58.1%
- Lines: 62.4%

---

## รายการ Test Files และ Test Cases

### Unit Tests (18 tests)

**`__tests__/sm2.test.ts`** (8 tests)
```
✅ sets interval to 1 on first correct answer
✅ sets interval to 6 on second consecutive correct
✅ multiplies interval by easeFactor from third correct onwards
✅ resets interval and consecutiveCorrect when score is below 60
✅ nextReviewAt is always in the future
✅ score 60 is treated as pass (not reset)
✅ test1  ← ชื่อไม่สื่อความหมาย
✅ test2  ← ชื่อไม่สื่อความหมาย
```

**`__tests__/validators.test.ts`** (6 tests)
```
✅ CreateTopicSchema rejects empty title
✅ CreateTopicSchema rejects title over 100 characters
✅ UpdateNoteSchema requires content field
✅ SubmitQuizSchema accepts valid answers array
✅ edge case missing: answers array with values outside 0–3
✅ edge case missing: durationSeconds negative value
```

**`__tests__/quiz-generator.test.ts`** (4 tests)
```
✅ returns null when notes have fewer than 3 sentences
✅ returns quiz with questions when notes have enough content
❌ edge case missing: notes with only very short sentences (< 30 chars)
❌ edge case missing: notes with no key terms
```

---

### Integration Tests (10 tests)

**`__tests__/quiz-service.integration.test.ts`** (6 tests)
```
✅ returns quiz when notes have enough content
✅ returns null when notes are insufficient
✅ saves attempt with correct score
✅ returns null when quizId does not exist
❌ missing: schedule progression across 3 submissions
❌ missing: store isolation between two topics
```

**`__tests__/topic-service.integration.test.ts`** (4 tests)
```
✅ creates and retrieves topic by id
✅ updates topic title
✅ deletes topic successfully
❌ missing: error handling when topic not found on update
```

---

### E2E Tests (6 tests)

**`e2e/topics.spec.ts`** (3 tests)
```
✅ user can create a new topic and see it in the list
✅ user sees empty state when no topics exist
❌ missing: create topic with empty title shows validation error
```

**`e2e/quiz.spec.ts`** (3 tests)
```
✅ user can generate quiz from topic with notes
✅ user can submit quiz and see score
❌ missing: cannot generate quiz when topic has no notes
```

---

## สรุปข้อมูลสำหรับประเมิน

- **Coverage:** 62.4% (เป้าหมาย 80%)
- **Edge Cases:** ครอบคลุม Null/Empty บางส่วน, Boundary Value น้อยมาก, Error Path ปานกลาง
- **ชื่อ Test:** บางตัวไม่สื่อความหมาย (test1, test2)
- **เวลารัน:** 42 วินาที (Unit + Integration)
- **E2E:** รันแยก ใช้เวลา ~3 นาที
