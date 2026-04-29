# Rubric Assessment Prompt — Scene 3 (ประเมิน Test Suite)

> **วิธีใช้:** Copy prompt ด้านล่าง พร้อม Test Suite จาก `01-test-suite-sample.md`
> Paste ทั้งหมดใน Claude.ai แล้ว Send

---

## Prompt (copy ข้างล่างนี้ พร้อมกับ Test Suite จาก 01)

```
ช่วยประเมินคุณภาพ Test Suite ข้างต้นตาม Test Quality Rubric นี้ให้หน่อยครับ

**Test Quality Rubric (4 มิติ, 1-5 คะแนนต่อมิติ, รวม 20 คะแนน)**

มิติที่ 1: Test Coverage
- 5: 80%+ | 4: 60-79% | 3: 40-59% | 2: 20-39% | 1: ต่ำกว่า 20%

มิติที่ 2: Edge Cases Testing (ครอบคลุม Null/Empty, Boundary, Error Path)
- 5: ครบ 3 อย่าง + มี Edge Case เฉพาะของ Business Logic
- 4: ครบทั้ง 3 อย่างพื้นฐาน
- 3: มีแค่ 2 อย่าง | 2: มีแค่ 1 อย่าง | 1: ไม่มีเลย

มิติที่ 3: Code Maintainability (ชื่อ Test สื่อความหมาย + Refactor แล้วแก้ Test ไม่เกิน 20%)
- 5: ชื่อสื่อทุกตัว + แก้ Test ≤10% เมื่อ Refactor
- 4: ชื่อสื่อเป็นส่วนใหญ่ + แก้ ≤20% | 3: พอเข้าใจ | 2: คลุมเครือ | 1: อ่านไม่รู้เรื่อง

มิติที่ 4: Performance Impact (เวลารัน Unit + Integration รวม)
- 5: <30 วินาที | 4: 30 วิ-2 นาที | 3: 2-5 นาที | 2: 5-10 นาที | 1: >10 นาที

ผลการตัดสิน: 16-20 = ✅ ดีเยี่ยม | 12-15 = ⚠️ ดีแต่ปรับได้ | <12 = ❌ ต้องปรับก่อน Deploy

โปรดประเมินแต่ละมิติ พร้อม:
1. คะแนนที่ให้ (1-5) + เหตุผล
2. สิ่งที่ดีอยู่แล้ว
3. สิ่งที่ต้องปรับปรุง
4. คะแนนรวม + สรุปว่าพร้อม Deploy หรือไม่
```

---

## ผลลัพธ์ที่คาดว่า AI จะตอบ (สำหรับเตรียมตัวก่อนบันทึก)

```
**ผลการประเมิน Test Suite — PLA Project**

มิติที่ 1: Test Coverage → คะแนน 3/5
- เหตุผล: Coverage 62.4% อยู่ในช่วง 40-59%
- ดีอยู่แล้ว: Quiz-related files มี Coverage 78-91%
- ต้องปรับ: lib/auth/ Coverage ต่ำมาก (28-45%) ต้องเร่งเพิ่ม

มิติที่ 2: Edge Cases → คะแนน 3/5
- เหตุผล: มี Null/Empty และ Error Path แต่ขาด Boundary Value
- ดีอยู่แล้ว: submitQuizAnswers ครอบคลุม empty array, duplicate submission
- ต้องปรับ: ขาด boundary test เช่น title ยาวเกิน limit, quizId เป็น empty string

มิติที่ 3: Maintainability → คะแนน 3/5
- เหตุผล: ส่วนใหญ่ชื่อดี แต่มี test1, test2 ที่ไม่สื่อความหมาย
- ดีอยู่แล้ว: submitQuizAnswers tests ชื่อชัดเจนมาก
- ต้องปรับ: แก้ชื่อ test1, test2 ใน calculateScore.test.ts

มิติที่ 4: Performance → คะแนน 4/5
- เหตุผล: Unit + Integration รัน 42 วินาที อยู่ในช่วง 30 วิ-2 นาที

**คะแนนรวม: 13/20**
**ระดับ: ⚠️ ดี แต่ยังปรับปรุงได้**

สรุป: ยังไม่พร้อม Deploy ทันที ต้องปรับ 2 อย่างก่อน:
1. เพิ่ม Test ใน lib/auth/ ให้ Coverage ขึ้นถึง 60%+
2. เพิ่ม Boundary Value tests ใน createTopic และ getQuizById
```
