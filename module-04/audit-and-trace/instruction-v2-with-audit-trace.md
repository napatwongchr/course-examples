# Instruction V2 — Task Planning (With Auditability + Traceability)
> ใช้ใน Scene "หลัง" — เพิ่ม Auditability และ Traceability เข้าไป
> copy ทั้งหมดนี้ไปวางใน Claude Project Instructions แทน V1

---

## วิธีใช้
1. เปิด Claude Desktop → Project "Task Planning"
2. กด **Edit Project Instructions**
3. **ลบ** Instruction V1 ออกทั้งหมด
4. วาง Instruction ด้านล่างนี้ → Save
5. เริ่มสนทนาใหม่ → แนบไฟล์ `prd-demo.md` → ส่ง

---

## Instruction (copy ข้างล่างนี้)

```

รูปแบบ Output:

## Task List — [ชื่อโปรเจกต์]

### [Feature Group]
| # | Task | Effort (SP) | มาจาก |
|---|------|-------------|-------|
| 1 | ชื่อ task | SP | ← "[ข้อความที่ตัดมาจาก PRD]" |

**รวม:** X tasks | X Story Points

---AUDIT LOG---
Input: [ชื่อเอกสาร หรือ 2 บรรทัดแรกของ requirement ที่รับมา]
วันเวลา: [วันที่และเวลาปัจจุบัน]
Rule ที่ใช้แตก Task: [เช่น "แตก task จาก Functional Requirements ทุกข้อ", "แตก task จาก User Stories ที่ระบุ Acceptance Criteria"]
จำนวน Task ทั้งหมด: [X tasks]
จำนวน Feature Group: [X groups]
---END AUDIT---
```

---

## สิ่งที่เปลี่ยนจาก V1

### เพิ่ม Traceability
คอลัมน์ **"มาจาก"** ใน Task table — ทุก task มีเส้นเชื่อมกลับไปยัง PRD บรรทัดที่เป็นต้นทาง

```
| สร้างระบบ CRUD สำหรับ Project | 3 | ← "รองรับ CRUD operations ครบถ้วน (F01 ข้อ 1)" |
```

→ เห็นทันทีว่า task มาจากไหน และถ้า task ไหนหายไป → ค้นใน PRD ได้เลยว่า requirement นั้นมีหรือไม่

### เพิ่ม Auditability
**Audit Block** ท้าย response — บันทึกว่า:
- Input คืออะไร (เอกสารไหน)
- ทำเมื่อไหร่
- ใช้ rule อะไรในการแตก task
- ได้ผลลัพธ์กี่ task

→ ถ้าวันหลังเกิดปัญหา เปิด conversation history มาดู Audit Block ได้ทันที

---

> **หมายเหตุสำหรับการสาธิต:**
> 
> เมื่อรันกับ `prd-demo.md` แล้วไม่มี Task ด้าน Testing ออกมา
> ให้เปิด PRD ขึ้นมาเทียบ → ค้นหาคำว่า "Test" หรือ "Vitest" → **ไม่พบ**
> 
> นี่คือจุดที่แสดงให้ผู้ชมเห็นว่า:
> - **Traceability** → "AI ไม่แตก Task Testing เพราะ PRD ไม่ได้ระบุ" (ดูจากคอลัมน์ "มาจาก")  
> - **Auditability** → "เราย้อนดูได้ว่า Input ที่ส่งให้ AI คือ PRD ฉบับนี้" (ดูจาก Audit Block)
> 
> ปัญหาอยู่ที่ Input ไม่ใช่ที่ AI
