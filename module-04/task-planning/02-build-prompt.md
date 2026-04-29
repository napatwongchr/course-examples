# Build Prompt — Scene 4 (สร้าง Instruction)

> **วิธีใช้:** ส่ง prompt นี้ใน **conversation เดิมต่อจาก Scene 3** (ไม่ต้องเริ่ม conversation ใหม่)
> Claude จะมีบริบทของ 5 องค์ประกอบที่ออกแบบไว้แล้ว

---

## Prompt (copy ข้างล่างนี้)

```
จากที่เราออกแบบ 5 องค์ประกอบไว้แล้ว
ช่วยเขียน Project Instructions สำหรับ Claude Project นี้ให้หน่อยครับ

เงื่อนไข:
- เขียนในมุมมอง "คุณคือ AI ที่..."
- ระบุว่าต้องรับ Input แบบไหน และทำอะไรกับมัน
- กำหนด Output format ที่ชัดเจน (โครงสร้างตาราง)
- รวม Criteria การตรวจสอบ Output เข้าไปด้วย
- ใช้ภาษาที่ตรงไปตรงมา ไม่ยาวเกินไป

```


---

## ขั้นตอนหลังได้ Instruction จาก Claude

1. **Review** — อ่านดูว่า Instruction ครอบคลุม 5 องค์ประกอบที่ออกแบบไว้หรือเปล่า
2. **Copy** Instruction ที่ได้
3. ไปที่ Claude Project **"Task Planning"** → กด **Edit Project Instructions**
4. **Paste** แล้ว Save
5. เริ่ม **conversation ใหม่** (สำคัญ — ต้องเริ่มใหม่เพื่อให้ Instruction มีผล)

---

## ตัวอย่าง Instruction ที่ควรได้ (Reference)

> ดูไฟล์ `../audit-and-trace/instruction-v1-basic.md` สำหรับตัวอย่าง Instruction เวอร์ชัน Basic
> ที่จะนำไปใช้ใน Scene 4 และ Scene 5

Instruction ที่ดีควรมีลักษณะ:

```
คุณคือ AI ผู้ช่วยวางแผนงานสำหรับทีม Software Development

เมื่อได้รับ Product Requirements Document (PRD) ให้ทำสิ่งต่อไปนี้:
1. อ่านและวิเคราะห์ PRD ทั้งฉบับ
2. แตก Task ออกมาจากทุก Feature และ Requirement ที่ระบุใน PRD
3. จัดกลุ่ม Task ตาม Feature (F01, F02, F03 ...)
4. ประเมิน Effort ของแต่ละ Task เป็น Story Points (1, 2, 3, 5, 8)
5. แสดงผลในรูปแบบตารางที่อ่านง่าย

รูปแบบ Output:
## Task List — [ชื่อโปรเจกต์]

### [Feature Group]
| # | Task | Effort (SP) |
|---|------|-------------|
| 1 | ชื่อ task | SP |

**รวม:** X tasks | X Story Points
```

---

## หมายเหตุสำหรับการสาธิต

- Scene 4 ไม่จำเป็นต้องแสดง Instruction ทั้งหมด — แค่ **highlight โครงสร้างหลัก** ก็พอ
- เน้นจุดที่ Design → Build: "เราเอา 5 องค์ประกอบที่ออกแบบไว้ มาแปลงเป็น Instruction ที่ AI ทำตามได้จริง"
- ถ้า Claude ให้ Instruction ยาวมาก ให้บอกว่า "เราจะ paste เฉพาะส่วนสำคัญ"
