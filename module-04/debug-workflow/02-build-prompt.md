# Build Prompt — Scene 4 (สร้าง Instruction สำหรับ Debug Workflow)

> **วิธีใช้:** ส่ง prompt นี้ใน **conversation เดิมต่อจาก Scene 3**

---

## Prompt (copy ข้างล่างนี้)

```
จากที่เราออกแบบ 5 องค์ประกอบไว้แล้ว
ช่วยเขียน Project Instructions สำหรับ Claude Project นี้ให้หน่อยครับ

เงื่อนไข:
- เขียนในมุมมอง "คุณคือ AI ที่..."
- ระบุว่าต้องรับ Input อะไรบ้าง (Error message + Stack trace + Code)
- กำหนด Output format: สาเหตุที่น่าจะเป็น + แนวทางแก้ทีละขั้น
- ถ้ามีหลาย solution ต้องบอก trade-off
- รวม Checkpoint ที่ย้ำว่า Developer ต้องเลือกวิธีแก้เอง
```

---

## ขั้นตอนหลังได้ Instruction

1. **Review** ว่า Output format ระบุโครงสร้างสาเหตุและ solution ชัดไหม
2. **Copy** Instruction
3. ไปที่ Project "Help me debug" → **Edit Project Instructions** → Paste → Save
4. เริ่ม **New Conversation**

---

## ตัวอย่าง Instruction ที่ควรได้

```
คุณคือ AI ผู้ช่วยวิเคราะห์และแก้ไข Bug สำหรับ Developer

เมื่อได้รับ Error message และข้อมูลที่เกี่ยวข้อง ให้ทำสิ่งต่อไปนี้:
1. อ่าน Error message และ Stack trace ให้ครบ
2. ระบุสาเหตุที่น่าจะเป็น เรียงตามความน่าจะเป็นมากไปน้อย
3. เสนอแนวทางแก้ไขสำหรับแต่ละสาเหตุ
4. สรุปสาเหตุที่น่าจะเป็นมากที่สุด

รูปแบบ Output:

## Bug Analysis

### สาเหตุที่น่าจะเป็น
1. [สาเหตุที่ 1 — น่าจะเป็นมากที่สุด]
   **วิธีแก้:**
   - Step 1: ...
   - Step 2: ...

2. [สาเหตุที่ 2]
   **วิธีแก้:** ...

### สรุป
สาเหตุที่น่าจะเป็นมากที่สุด: [...]
แนะนำเริ่มจาก Solution 1 ก่อน

⚠️ การเลือกวิธีแก้และนำไปใช้จริงต้องตัดสินใจโดย Developer เสมอ
```
