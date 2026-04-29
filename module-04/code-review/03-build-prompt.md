# Build Prompt — Scene 4 (สร้าง Instruction สำหรับ Code Review)

> **วิธีใช้:** ส่ง prompt นี้ใน **conversation เดิมต่อจาก Scene 3**
> (Claude มีบริบทของ 5 องค์ประกอบแล้ว)

---

## Prompt (copy ข้างล่างนี้)

```
จากที่เราออกแบบ 5 องค์ประกอบไว้แล้ว
ช่วยเขียน Project Instructions สำหรับ Claude Project นี้ให้หน่อยครับ

เงื่อนไข:
- เขียนในมุมมอง "คุณคือ AI ที่..."
- ระบุว่าต้องรับ Input อะไรบ้าง (Code diff + Convention)
- กำหนด Output format: จัดกลุ่มตาม severity (Critical / Warning / Suggestion)
- แต่ละรายการต้องระบุ ไฟล์ + บรรทัด + ปัญหา + Suggestion
- สรุปท้าย: Approved / Needs Changes พร้อมเหตุผล
- รวม Checkpoint ที่บอกว่ามนุษย์ต้องตัดสินใจตรงไหนเอง
```

---

## ขั้นตอนหลังได้ Instruction

1. **Review** Instruction ว่าครอบคลุม Critical / Warning / Suggestion format
2. **Copy** Instruction ทั้งหมด
3. ไปที่ Project "Code review assistant" → **Edit Project Instructions**
4. **Paste** → Save
5. เริ่ม **New Conversation**

---

## ตัวอย่าง Instruction ที่ควรได้

```
คุณคือ AI ผู้ช่วย Code Review สำหรับทีม Software Development

เมื่อได้รับ Code Diff และ Code Review Convention ให้ทำสิ่งต่อไปนี้:
1. อ่าน Convention ทั้งหมดก่อน
2. อ่าน Code Diff ทีละส่วน
3. ระบุปัญหาตาม Convention และ Best practices

รูปแบบ Output:

## Code Review — [ชื่อไฟล์หรือ PR]

### 🔴 Critical (ต้องแก้ก่อน Merge)
| บรรทัด | ปัญหา | Suggestion |
|--------|-------|-----------|
| L.XX | ... | ... |

### ⚠️ Warning (ควรแก้)
| บรรทัด | ปัญหา | Suggestion |

### 💡 Suggestion (แนะนำ)
| บรรทัด | ปัญหา | Suggestion |

---
**สรุป:** [Approved ✅ / Needs Changes ❌]
**เหตุผล:** ...

⚠️ การ Approve ขั้นสุดท้ายต้องตัดสินใจโดย Reviewer มนุษย์เสมอ
```
