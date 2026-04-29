# Coverage Analysis Prompt — Scene 2 (แปลผล Coverage Report)

> **วิธีใช้:** Copy prompt ด้านล่าง พร้อม Coverage Report จาก `01-coverage-report-input.md`
> Paste ทั้งหมดใน Claude.ai แล้ว Send

---

## Prompt (copy ข้างล่างนี้ พร้อมกับ Coverage Report จาก 01)

```
จาก Coverage Report ข้างต้น ช่วยวิเคราะห์และแนะนำขั้นตอนถัดไปให้หน่อยครับ

Context:
- เป้าหมาย Coverage: 80% ก่อน Deploy
- Deadline: 1 สัปดาห์
- Team มี Developer 2 คน

ช่วยตอบ:
1. Coverage สรุปภาพรวมตอนนี้อยู่ที่เท่าไหร่ และห่างจากเป้าหมาย 80% แค่ไหน?
2. ไฟล์ไหนบ้างที่ Coverage ต่ำที่สุดและต้องแก้ก่อน? (เรียง Priority)
3. Uncovered Lines ที่สำคัญที่สุดอยู่ที่ไฟล์ไหน?
4. ถ้าต้องเลือก 3 ไฟล์ที่จะเพิ่ม Test ก่อนเพื่อให้ Coverage รวมขึ้นเร็วที่สุด ควรเลือกไฟล์ไหน?
5. Action Items ที่ทีมต้องทำใน 1 สัปดาห์ให้ถึงเป้า 80% คืออะไร?

Format เป็นรายการที่ทำตามได้เลยครับ
```

---

## ผลลัพธ์ที่คาดว่า AI จะตอบ (สำหรับเตรียมตัวก่อนบันทึก)

**1. ภาพรวม Coverage**
- ตอนนี้: Statements 62.4%, Branches 51.3%, Functions 58.1%
- ห่างจากเป้า 80%: ต้องเพิ่มขึ้นประมาณ 17-29% แล้วแต่ metric

**2. Priority Files (ต่ำที่สุด):**
1. `AuthGuard.tsx` — Statements 28.6%, Branches 16.7% ← เร่งด่วนที่สุด
2. `refreshToken.ts` — Statements 33.3%, Branches 0%
3. `validateSession.ts` — Statements 45.2%, Branches 25%

**3. Top 3 ไฟล์ที่ควรเพิ่ม Test ก่อน (เพื่อยก Coverage รวมเร็วที่สุด):**
1. `AuthGuard.tsx` — มี uncovered lines มาก + เป็น Component หลักด้าน Security
2. `refreshToken.ts` — Branch Coverage 0% อันตราย
3. `validateSession.ts` — ใช้ทุก Route ถ้าปิดได้จะช่วย Coverage ทั้ง Project

**4. Action Items (1 สัปดาห์):**
- วันที่ 1-2: เขียน Test สำหรับ `AuthGuard.tsx` และ `refreshToken.ts`
- วันที่ 3-4: เขียน Test สำหรับ `validateSession.ts` และ `deleteTopic.ts`
- วันที่ 5: รัน Coverage Report ใหม่ ตรวจผล
