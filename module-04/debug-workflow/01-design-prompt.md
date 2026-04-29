# Design Prompt — Scene 3 (ออกแบบ AI Workflow: Debug)

> **วิธีใช้:** Copy prompt ด้านล่างไปวางใน Claude Desktop
> Project ใน Claude Desktop ควรชื่อ **"Help me debug"** ยังไม่มี Instructions

---

## Prompt (copy ข้างล่างนี้)

```
ช่วยออกแบบ AI Workflow สำหรับการวิเคราะห์และแก้ไข Bug ให้หน่อยครับ

Context:
Developer ที่ทำงานกับ Next.js + TypeScript App
เมื่อเจอ Error ใน Console หรือใน Production
ต้องการ AI ช่วยวิเคราะห์สาเหตุและเสนอแนวทางแก้ไข
ก่อนที่ Developer จะเลือกวิธีแก้เอง

ช่วยออกแบบ 5 องค์ประกอบนี้ให้ครบ:

1. Input — AI จะรับอะไรเข้ามา? ระบุรูปแบบและเนื้อหาให้ชัด
2. Output — AI ควร Output อะไรออกมา? ระบุโครงสร้างที่ต้องการ
3. Context — AI ต้องรู้อะไรเพิ่มเติมเพื่อวิเคราะห์ได้แม่นขึ้น?
4. Checkpoint — จุดไหนที่มนุษย์ต้องตัดสินใจก่อนดำเนินการต่อ?
5. Criteria — จะรู้ได้อย่างไรว่า Output ที่ได้ดีพอ? ระบุเป็นเกณฑ์ที่ตรวจสอบได้

Claude ควรตอบครอบ 5 ข้อดังนี้:
**1. Input**
- Error message + Stack trace
- โค้ดส่วนที่เกิด Error (ไฟล์ + บรรทัด)
- สิ่งที่ทำก่อน Error เกิด (optional)

**2. Output**
- สาเหตุที่น่าจะเป็น (1–3 ข้อ เรียงตามความน่าจะเป็น)
- แนวทางแก้ไข (step-by-step) สำหรับแต่ละสาเหตุ
- สรุป: สาเหตุที่น่าจะเป็นมากที่สุด

**3. Context**
- Tech stack: Next.js 14, TypeScript, ชื่อ library ที่ใช้
- สภาพแวดล้อม: Development / Production / Test
- โค้ดที่เกี่ยวข้องกับ Error (ถ้าแนบมาได้)

**4. Checkpoint**
- AI เสนอแนวทาง → Developer ตัดสินใจเลือกวิธีแก้เอง
- ห้าม AI แก้ไขโค้ดใน production โดยไม่ผ่าน Developer

**5. Criteria**
- ระบุสาเหตุได้ชัดกว่าแค่ "Error ที่บรรทัด X"
- แต่ละ solution มีขั้นตอนที่ทำตามได้เลย
- ถ้ามีหลาย solution ต้องบอก trade-off ของแต่ละทาง

```

---

## ผลลัพธ์ที่คาดว่า Claude จะตอบ (สำหรับเตรียมตัวก่อนบันทึก)

**1. Input**
- Error message + Stack trace
- โค้ดส่วนที่เกิด Error (ไฟล์ + บรรทัด)
- สิ่งที่ทำก่อน Error เกิด (optional)

**2. Output**
- สาเหตุที่น่าจะเป็น (1–3 ข้อ เรียงตามความน่าจะเป็น)
- แนวทางแก้ไข (step-by-step) สำหรับแต่ละสาเหตุ
- สรุป: สาเหตุที่น่าจะเป็นมากที่สุด

**3. Context**
- Tech stack: Next.js 14, TypeScript, ชื่อ library ที่ใช้
- สภาพแวดล้อม: Development / Production / Test
- โค้ดที่เกี่ยวข้องกับ Error (ถ้าแนบมาได้)

**4. Checkpoint**
- AI เสนอแนวทาง → Developer ตัดสินใจเลือกวิธีแก้เอง
- ห้าม AI แก้ไขโค้ดใน production โดยไม่ผ่าน Developer

**5. Criteria**
- ระบุสาเหตุได้ชัดกว่าแค่ "Error ที่บรรทัด X"
- แต่ละ solution มีขั้นตอนที่ทำตามได้เลย
- ถ้ามีหลาย solution ต้องบอก trade-off ของแต่ละทาง
