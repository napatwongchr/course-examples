# Design Prompt — Scene 3 (ออกแบบ AI Workflow)

> **วิธีใช้:** Copy prompt ด้านล่างไปวางใน Claude Desktop ในขั้นตอน Scene 3
> Project ใน Claude Desktop ควรชื่อ **"Task Planning"** และยังไม่มี Instructions ใดๆ

---

## Prompt (copy ข้างล่างนี้)

```
ช่วยออกแบบ AI Workflow สำหรับ Task Planning ให้หน่อยครับ

Context:
ทีม Software Development ที่รับ PRD (Product Requirements Document) จาก PM
และต้องการ AI ช่วยแตก Requirement ออกมาเป็น Task List พร้อม Effort estimate
ก่อนเริ่ม Sprint Planning

ช่วยออกแบบ 5 องค์ประกอบนี้ให้ครบ:

1. Input — AI จะรับอะไรเข้ามา? ระบุรูปแบบและเนื้อหาให้ชัด
2. Output — AI ควร Output อะไรออกมา? ระบุโครงสร้างที่ต้องการ
3. Context — AI ต้องรู้อะไรเพิ่มเติมเพื่อให้ทำงานได้แม่นขึ้น?
4. Checkpoint — จุดไหนที่มนุษย์ควรเข้ามาตรวจสอบก่อนดำเนินการต่อ?
5. Criteria — จะรู้ได้อย่างไรว่า Output ที่ได้ดีพอ? ระบุเป็นเกณฑ์ที่ตรวจสอบได้

Claude ควรตอบครอบ 5 ข้อดังนี้:

**1. Input**
- PRD ฉบับเต็ม (Markdown หรือ Plain text)
- อาจมี Tech Stack, Timeline, Team size ประกอบ

**2. Output**
- Task List แบ่งตาม Feature Group (F01, F02, ...)
- แต่ละ Task มีชื่อ + Effort (Story Points: 1/2/3/5/8)
- สรุปรวมจำนวน Task และ Total Story Points

**3. Context**
- ประสบการณ์และ Tech Stack ของทีม
- Definition of Done ของโปรเจกต์
- ขนาด Sprint (ปกติ 1-2 สัปดาห์)

**4. Checkpoint**
- หลัง AI แตก Task → มนุษย์ Review ว่าครอบคลุม Requirement ทุกข้อ
- ก่อน Sprint Planning → ทีมปรับ Effort ตามความเป็นจริง

**5. Criteria**
- ทุก Functional Requirement มี Task ที่ map กลับได้
- Task แต่ละอันชัด ไม่กว้างเกิน (ทำได้ภายใน 1 Sprint)
- Effort estimate สมเหตุสมผลกับ Complexity
- ไม่มี Task ที่ซ้ำซ้อนกัน

รูปแบบโครงสร้าง PRD จะเหมือนกับไฟล์ที่แนบ (PRD นี้ เป็นแค่ตัวอย่างรูปแบบ ไม่ต้องอ้างอิงบริบทของโปรเจ็กต์ เพราะว่า อยากจะให้ Workflow นี้ใช้ได้กับทุกๆ โปรเจ็กต์)
ทำแค่ออกแบบยังไม่ต้องลองแบ่ง task ให้ดูจริงๆ 
```

---

## ผลลัพธ์ที่คาดว่า Claude จะตอบ (สำหรับเตรียมตัวก่อนบันทึก)

Claude ควรตอบครอบ 5 ข้อดังนี้:

**1. Input**
- PRD ฉบับเต็ม (Markdown หรือ Plain text)
- อาจมี Tech Stack, Timeline, Team size ประกอบ

**2. Output**
- Task List แบ่งตาม Feature Group (F01, F02, ...)
- แต่ละ Task มีชื่อ + Effort (Story Points: 1/2/3/5/8)
- สรุปรวมจำนวน Task และ Total Story Points

**3. Context**
- ประสบการณ์และ Tech Stack ของทีม
- Definition of Done ของโปรเจกต์
- ขนาด Sprint (ปกติ 1-2 สัปดาห์)

**4. Checkpoint**
- หลัง AI แตก Task → มนุษย์ Review ว่าครอบคลุม Requirement ทุกข้อ
- ก่อน Sprint Planning → ทีมปรับ Effort ตามความเป็นจริง

**5. Criteria**
- ทุก Functional Requirement มี Task ที่ map กลับได้
- Task แต่ละอันชัด ไม่กว้างเกิน (ทำได้ภายใน 1 Sprint)
- Effort estimate สมเหตุสมผลกับ Complexity
- ไม่มี Task ที่ซ้ำซ้อนกัน
