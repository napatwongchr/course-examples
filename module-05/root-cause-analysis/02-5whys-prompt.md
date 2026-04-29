# 5 Whys Prompt — Scene 2 (Root Cause Analysis)

> **วิธีใช้:** Copy prompt ด้านล่าง พร้อมกับเนื้อหาจาก `01-bug-report-input.md`
> Paste ทั้งหมดใน Claude.ai แล้ว Send

---

## Prompt (copy ข้างล่างนี้ พร้อมกับ Bug Report จาก 01-bug-report-input.md)

```
จาก Bug Report ข้างต้น ช่วยทำ Root Cause Analysis โดยใช้เทคนิค 5 Whys ให้หน่อยครับ

เงื่อนไข:
- ถาม "ทำไม?" 5 ครั้งต่อเนื่อง เพื่อขุดลึกไปถึง Root Cause ที่แท้จริง
- แต่ละ Why ต้องต่อเนื่องจากคำตอบก่อนหน้า
- Root Cause ต้องเป็นสิ่งที่แก้แล้วป้องกัน Bug นี้ได้ถาวร
- สรุปท้ายว่า Root Cause คืออะไร และวิธีแก้ที่ตรงจุดคืออะไร

Format:
**5 Whys Analysis**
Why 1: [อาการ] → เพราะ [สาเหตุ]
Why 2: ทำไม [สาเหตุจาก Why 1] → เพราะ [สาเหตุ]
Why 3: ทำไม [สาเหตุจาก Why 2] → เพราะ [สาเหตุ]
Why 4: ทำไม [สาเหตุจาก Why 3] → เพราะ [สาเหตุ]
Why 5: ทำไม [สาเหตุจาก Why 4] → **Root Cause: [สาเหตุแท้จริง]**

**แนวทางแก้ไขที่ตรง Root Cause:**
[อธิบายวิธีแก้]
```

---

## ผลลัพธ์ที่คาดว่า AI จะตอบ (สำหรับเตรียมตัวก่อนบันทึก)

```
**5 Whys Analysis**

Why 1: ทำไม {topic.totalStudyMinutes} min บน Topic Card ถึงไม่อัปเดตหลังกด Stop?
→ เพราะ React Query re-fetch GET /api/topics แล้วได้ totalStudyMinutes: 0 กลับมา
   — UI แสดงตามข้อมูลที่ได้จาก server ซึ่งยังเป็นค่าเดิม

Why 2: ทำไม GET /api/topics ถึงยังคืน totalStudyMinutes: 0 แม้จะ POST session ไปแล้ว?
→ เพราะ store.getTopics() ที่ GET route ใช้ไม่ได้รับการอัปเดตจาก POST route
   — store ทั้งสอง route เป็นคนละ instance กัน

Why 3: ทำไม store ใน GET route กับ POST route จึงเป็นคนละ instance?
→ เพราะ Next.js App Router (development mode + HMR) อาจ reload module
   ทำให้ export const store = new MockStore() ถูก execute ใหม่
   — แต่ละ route handler จึงได้ MockStore ที่ fresh และว่างเปล่า

Why 4: ทำไม MockStore ถึง reset ได้ง่ายแค่ module reload?
→ เพราะ MockStore เก็บข้อมูลทั้งหมดไว้ใน JavaScript heap memory เท่านั้น
   — private topics: Map<string, Topic> = new Map() สูญหายทันทีที่ instance ใหม่ถูกสร้าง
   — ไม่มี mechanism ใดเลยที่ persist state ข้ามรอบ module load

Why 5: ทำไมถึงออกแบบ data layer ด้วย in-memory store โดยไม่มี persistence?
→ **Root Cause: ไม่มี persistent data layer จริงๆ ในระบบ**
   — MockStore ถูกออกแบบมาเพื่อ prototype เท่านั้น ไม่ใช่ production data store
   — ไม่มี database (SQLite, PostgreSQL ฯลฯ) ที่เก็บ state ไว้นอก process memory
   — ทำให้ state ไม่ consistent ระหว่าง request และหายทุกครั้งที่ server restart

**แนวทางแก้ไขที่ตรง Root Cause:**
1. แก้จริง (ระยะยาว): เพิ่ม database จริง เช่น SQLite ผ่าน Prisma หรือ Drizzle ORM
   — ทุก route handler อ่าน/เขียนข้อมูลจากที่เดียวกัน ไม่ขึ้นกับ module instance
2. Quick fix (ระยะสั้น): ใช้ global singleton pattern
   — เปลี่ยน export const store = new MockStore()
   — เป็น const globalStore = global as { __plaStore?: MockStore }
            if (!globalStore.__plaStore) globalStore.__plaStore = new MockStore()
            export const store = globalStore.__plaStore
   — ป้องกัน HMR สร้าง instance ใหม่ แต่ยังสูญหายเมื่อ server restart อยู่ดี
3. เพิ่ม error visibility: ใน createStudySession ถ้า topic ไม่พบควร throw Error
   แทนการ silent skip — ทำให้ตรวจพบปัญหาได้เร็วขึ้น
```
