# Blueprint Prompt — Scene 3 (สร้าง AI Workflow Blueprint)

> **วิธีใช้:** Copy prompt ด้านล่างไปวางใน Claude Desktop (ไม่ต้องสร้าง Project ใหม่)
> ใช้ใน Project "Task planning" ที่สร้างไว้แล้วจาก 4.13
> หรือจะใช้ Conversation ทั่วไปก็ได้

---

## Prompt (copy ข้างล่างนี้)

```
ช่วยสร้าง AI Workflow Blueprint สำหรับ Workflow "Task Planning" ให้หน่อยครับ

บริบทของ Workflow:
- ชื่อ: Task Planning Workflow
- ใครใช้: Developer ในทีม Software Development
- ทำอะไร: รับ PRD → AI แตกออกมาเป็น Task List พร้อม Story Points
- Project ใน Claude: "Task planning"
- Instruction ที่ใช้: วิเคราะห์ PRD แล้วแตก Task จัดกลุ่มตาม Feature พร้อม Effort estimate

ช่วยสร้างเอกสาร Blueprint ที่มี 6 ส่วนต่อไปนี้:

1. Overview — Workflow นี้ชื่ออะไร ทำอะไร และใครใช้
2. Input — ต้องเตรียมข้อมูลอะไรก่อนรัน
3. Steps — ขั้นตอนการใช้งานทีละขั้น (numbered list)
4. Responsibility — AI ช่วยตรงไหน คนทำตรงไหน (ทำเป็นตาราง)
5. Output — ผลลัพธ์ที่คาดหวังคืออะไร พร้อมตัวอย่างโครงสร้าง
6. Notes — ข้อควรระวัง หรือ Tips จากประสบการณ์ใช้จริง

Format เป็น Markdown ที่พร้อม Share ในทีมได้เลยครับ
```

---

## ผลลัพธ์ที่คาดว่า Claude จะตอบ (สำหรับเตรียมตัวก่อนบันทึก)

Blueprint ที่ดีควรมี:

**1. Overview**
```
ชื่อ: Task Planning Workflow
ทำอะไร: รับ PRD → แตก Task List พร้อม Story Points
ใครใช้: Developer / Tech Lead ก่อนเริ่ม Sprint
เมื่อใช้: เมื่อได้รับ PRD ใหม่หรือ Feature ใหม่
```

**4. Responsibility (ตาราง)**
| ขั้นตอน | AI ทำ | คนทำ |
|--------|-------|------|
| อ่าน PRD | ✅ | — |
| แตก Task | ✅ | — |
| ประเมิน Effort | ✅ (initial estimate) | ✅ (final review) |
| Approve Task List | — | ✅ |

**6. Notes**
- PRD ที่ขาด Requirement ด้าน Testing → AI จะไม่แตก Task Testing ออกมา
- ควร Review Task list ก่อน Sprint Planning เสมอ
- Effort estimate เป็นจุดเริ่มต้น ให้ทีมปรับตามความเป็นจริง
