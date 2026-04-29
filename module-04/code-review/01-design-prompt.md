# Design Prompt — Scene 3 (ออกแบบ AI Workflow: Code Review)

> **วิธีใช้:** Copy prompt ด้านล่างไปวางใน Claude Desktop
> Project ใน Claude Desktop ควรชื่อ **"Code review assistant"** ยังไม่มี Instructions

---

## Prompt (copy ข้างล่างนี้)

```
ช่วยออกแบบ AI Workflow สำหรับ Code Review ก่อน Merge ให้หน่อยครับ

Context:
ทีม Dev ที่ใช้ Git และ Pull Request
เมื่อ Developer เขียนโค้ดเสร็จและสร้าง PR
ต้องการ AI ช่วย Review โค้ดตาม Convention ของทีม
ก่อนที่ Reviewer จะตัดสินใจ Approve หรือ Request Changes

ช่วยออกแบบ 5 องค์ประกอบนี้ให้ครบ:

1. Input — AI จะรับอะไรเข้ามา? ระบุรูปแบบและเนื้อหาให้ชัด
2. Output — AI ควร Output อะไรออกมา? ระบุโครงสร้างที่ต้องการ
3. Context — AI ต้องรู้อะไรเพิ่มเติมเพื่อให้ Review ได้ตรงจุด?
4. Checkpoint — จุดไหนที่มนุษย์ต้องตัดสินใจก่อนดำเนินการต่อ?
5. Criteria — จะรู้ได้อย่างไรว่า Review ที่ได้ดีพอ? ระบุเป็นเกณฑ์ที่ตรวจสอบได้

Claude ควรตอบครอบ 5 ข้อดังนี้:

**1. Input**
- Code diff / PR diff (Markdown หรือ plain text)
- Code Review Convention ของทีม (ไฟล์แนบ)

**2. Output**
- รายการปัญหาที่พบ จัดกลุ่มตาม severity (Critical / Warning / Suggestion)
- แต่ละปัญหาระบุ: ไฟล์ + บรรทัด, ข้อความปัญหา, วิธีแก้ที่แนะนำ
- สรุป: Approved / Needs Changes

**3. Context**
- Code Review Convention ของทีม (naming, error handling, security rules)
- Tech stack และ pattern ที่ทีมใช้

**4. Checkpoint**
- หลัง AI ให้ผล → Reviewer มนุษย์ต้องตัดสินใจ Approve หรือ Request Changes ด้วยตัวเอง
- ห้าม AI Approve แทน โดยเฉพาะโค้ดที่เกี่ยวกับ auth, payment, security

**5. Criteria**
- ทุกปัญหาระบุตำแหน่งได้ชัด (ไฟล์ + บรรทัด)
- มี Suggestion ที่นำไปแก้ได้ทันที ไม่ใช่แค่บอกว่าผิด
- ครอบคลุม Convention ทุกข้อที่กำหนดไว้


```

---

## ผลลัพธ์ที่คาดว่า Claude จะตอบ (สำหรับเตรียมตัวก่อนบันทึก)

**1. Input**
- Code diff / PR diff (Markdown หรือ plain text)
- Code Review Convention ของทีม (ไฟล์แนบ)

**2. Output**
- รายการปัญหาที่พบ จัดกลุ่มตาม severity (Critical / Warning / Suggestion)
- แต่ละปัญหาระบุ: ไฟล์ + บรรทัด, ข้อความปัญหา, วิธีแก้ที่แนะนำ
- สรุป: Approved / Needs Changes

**3. Context**
- Code Review Convention ของทีม (naming, error handling, security rules)
- Tech stack และ pattern ที่ทีมใช้

**4. Checkpoint**
- หลัง AI ให้ผล → Reviewer มนุษย์ต้องตัดสินใจ Approve หรือ Request Changes ด้วยตัวเอง
- ห้าม AI Approve แทน โดยเฉพาะโค้ดที่เกี่ยวกับ auth, payment, security

**5. Criteria**
- ทุกปัญหาระบุตำแหน่งได้ชัด (ไฟล์ + บรรทัด)
- มี Suggestion ที่นำไปแก้ได้ทันที ไม่ใช่แค่บอกว่าผิด
- ครอบคลุม Convention ทุกข้อที่กำหนดไว้
