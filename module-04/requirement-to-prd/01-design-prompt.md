# Design Prompt — Scene 3 (ออกแบบ AI Workflow: Requirement → PRD)

> **วิธีใช้:** Copy prompt ด้านล่างไปวางใน Claude Desktop
> แนบไฟล์ `02-prd-template.md` ไปพร้อมกันด้วย
> Project ใน Claude Desktop ควรชื่อ **"PRD Generator"** ยังไม่มี Instructions

---

## Prompt (copy ข้างล่างนี้)

```
ช่วยออกแบบ AI Workflow สำหรับสรุป Requirement ของลูกค้าออกมาเป็น PRD ให้หน่อยครับ

Context:
ทีม Software Development ที่รับงานจาก Client
PM หรือ BA จะไปคุยกับลูกค้า จดโน้ต Requirement มา
แล้วต้องการ AI ช่วยสรุปและเรียบเรียงออกมาเป็น PRD
ตาม Template ของทีม (แนบมาด้วย)
ก่อนที่ Dev จะเริ่มทำงาน

ช่วยออกแบบ 5 องค์ประกอบนี้ให้ครบ:

1. Input — AI จะรับอะไรเข้ามา? ระบุรูปแบบและเนื้อหาให้ชัด
2. Output — AI ควร Output อะไรออกมา? ระบุโครงสร้างที่ต้องการ
3. Context — AI ต้องรู้อะไรเพิ่มเติมเพื่อให้สรุปได้ตรงกับที่ทีมต้องการ?
4. Checkpoint — จุดไหนที่มนุษย์ต้องตรวจสอบก่อนดำเนินการต่อ?
5. Criteria — จะรู้ได้อย่างไรว่า PRD ที่ได้ดีพอ? ระบุเป็นเกณฑ์ที่ตรวจสอบได้

Claude ควรตอบครอบ 5 ข้อดังนี้:
**1. Input**
- โน้ต Requirement จากลูกค้า (bullet points หรือ paragraph)
- ข้อมูลโปรเจ็กต์: ชื่อ, กลุ่มเป้าหมาย, Platform, Timeline

**2. Output**
- PRD ตาม Template ที่ทีมกำหนด
- ครอบคลุม: Overview, Goals, User Stories, Functional Requirements, Out of Scope

**3. Context**
- PRD Template ของทีม (แนบมาแล้ว)
- Tech Stack ของทีม
- ภาษาที่ใช้เขียน PRD (ไทย/อังกฤษ)

**4. Checkpoint**
- ก่อนป้อน Requirement: ตรวจว่าโน้ตครบ ไม่มีจุดที่ยังต้องถามลูกค้าเพิ่ม
- หลัง PRD เสร็จ: PM หรือ Dev review ก่อน Kickoff

**5. Criteria**
- ครอบคลุม Requirement ทุกข้อที่ลูกค้าพูดถึง
- User Story เขียนในรูปแบบ "As a… I want… So that…" ครบทุก Feature
- ไม่มีข้อมูลที่ขัดแย้งกันใน PRD
- Out of Scope ระบุชัดเจน ไม่คลุมเครือ

```

แนบไฟล์ `02-prd-template.md` ไปพร้อมกัน

---

## ผลลัพธ์ที่คาดว่า Claude จะตอบ (สำหรับเตรียมตัวก่อนบันทึก)

**1. Input**
- โน้ต Requirement จากลูกค้า (bullet points หรือ paragraph)
- ข้อมูลโปรเจ็กต์: ชื่อ, กลุ่มเป้าหมาย, Platform, Timeline

**2. Output**
- PRD ตาม Template ที่ทีมกำหนด
- ครอบคลุม: Overview, Goals, User Stories, Functional Requirements, Out of Scope

**3. Context**
- PRD Template ของทีม (แนบมาแล้ว)
- Tech Stack ของทีม
- ภาษาที่ใช้เขียน PRD (ไทย/อังกฤษ)

**4. Checkpoint**
- ก่อนป้อน Requirement: ตรวจว่าโน้ตครบ ไม่มีจุดที่ยังต้องถามลูกค้าเพิ่ม
- หลัง PRD เสร็จ: PM หรือ Dev review ก่อน Kickoff

**5. Criteria**
- ครอบคลุม Requirement ทุกข้อที่ลูกค้าพูดถึง
- User Story เขียนในรูปแบบ "As a… I want… So that…" ครบทุก Feature
- ไม่มีข้อมูลที่ขัดแย้งกันใน PRD
- Out of Scope ระบุชัดเจน ไม่คลุมเครือ
