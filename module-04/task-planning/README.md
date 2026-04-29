# Demo Guide — 4.13 AI Workflow สำหรับ Task Planning

> คู่มือสำหรับผู้บันทึกวิดีโอ — เปิดไฟล์นี้ไว้ข้างๆ ขณะสาธิต

---

## ภาพรวม Demo Flow

```
Scene 3 (Design)   →   Scene 4 (Build)   →   Scene 5 (Test)
01-design-prompt       02-build-prompt        03-test-prd
     ↓                       ↓                      ↓
ออกแบบ 5 องค์ประกอบ    สร้าง Instruction        ทดสอบด้วย PRD จริง
```

---

## เตรียมก่อนบันทึก

1. เปิด **Claude Desktop**
2. สร้าง Project ใหม่ → ชื่อ **"Task Planning"** → Description: "ช่วยวางแผนงาน และแบ่ง Task จาก Requirement"
3. **อย่าใส่ Instructions** ใน Project ก่อน (จะทำในขั้นตอน Build)
4. เปิดไฟล์ทั้ง 3 ไว้บน text editor อีกหน้าต่างเพื่อ copy-paste ได้สะดวก

---

## Scene 3 — Design (ใช้ไฟล์ `01-design-prompt.md`)

**เป้าหมาย:** ให้ผู้ชมเห็นว่า เราใช้ AI ช่วยออกแบบ Workflow ก่อนลงมือ Build

**ขั้นตอน:**
1. เปิด Claude Desktop → Project "Task Planning"
2. เริ่ม New Conversation
3. Copy prompt จากไฟล์ `01-design-prompt.md` → Paste → Send
4. อธิบายผลลัพธ์ที่ได้ (5 องค์ประกอบ)

**จุดที่ต้องพูดถึง:**
- Input = PRD
- Output = Task List + Story Points
- Criteria = ทุก Requirement ต้อง map ได้

---

## Scene 4 — Build (ใช้ไฟล์ `02-build-prompt.md`)

**เป้าหมาย:** แปลง Design → Instruction ที่ใช้งานได้จริง

**ขั้นตอน:**
1. **ใน conversation เดิม** (ต่อจาก Scene 3)
2. Copy prompt จากไฟล์ `02-build-prompt.md` → Paste → Send
3. รับ Instruction จาก Claude
4. ไปที่ Project Settings → Edit Project Instructions
5. Paste Instruction → Save
6. เริ่ม **New Conversation**

**จุดที่ต้องพูดถึง:**
- "เราเอา 5 องค์ประกอบมาแปลงเป็น Instruction"
- Instruction บอก AI ว่าต้องทำอะไร กับ Input แบบไหน ให้ Output แบบไหน

---

## Scene 5 — Test (ใช้ไฟล์ `03-test-prd.md`)

**เป้าหมาย:** ทดสอบว่า Workflow ทำงานตรง Criteria ที่ออกแบบไว้

**ขั้นตอน:**
1. เปิด New Conversation ใน Project "Task Planning"
2. Attach ไฟล์ `03-test-prd.md` → Send (ไม่ต้องพิมพ์อะไรเพิ่ม)
3. ดู Output ที่ได้

**เช็คผลลัพธ์ตาม Criteria:**
- [ ] Task จัดกลุ่มตาม Feature (F01, F02, F03, F04) ✓
- [ ] แต่ละ Task มี Story Points ✓
- [ ] มีสรุปรวม Total SP ✓
- [ ] ครอบคลุม Requirement ทุก Feature ✓

---

## ไฟล์ทั้งหมดในโฟลเดอร์นี้

| ไฟล์ | ใช้ใน | คำอธิบาย |
|------|-------|---------|
| `01-design-prompt.md` | Scene 3 | Prompt สำหรับออกแบบ 5 องค์ประกอบ |
| `02-build-prompt.md` | Scene 4 | Prompt สำหรับสร้าง Instruction |
| `03-test-prd.md` | Scene 5 | PRD ของ Task Tracker Pro สำหรับทดสอบ |
| `README.md` | ก่อนบันทึก | คู่มือ Demo นี้ |

### ไฟล์เพิ่มเติม (จาก audit-and-trace)

| ไฟล์ | ใช้สำหรับ |
|------|---------|
| `../audit-and-trace/instruction-v1-basic.md` | Reference Instruction แบบ Basic |
| `../audit-and-trace/prd-demo.md` | PRD สำรอง (Group Project Tracker) |
