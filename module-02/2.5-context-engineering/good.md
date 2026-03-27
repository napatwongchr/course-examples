# ✅ สองชั้นทำงานร่วมกัน — Context Layer + Prompt Layer

เปิด chat ใหม่ แล้วส่ง prompt นี้:

```
## Context: Personal Learning Assistant (PLA)

**ปัญหาที่แก้:** นักศึกษาไทยลืมเนื้อหาเร็ว ไม่มีระบบทบทวนที่ดี
**Target Users:** นักศึกษา ปี 1-4 อายุ 18-24 ปี ใช้เว็บเบราว์เซอร์ (desktop + mobile)
**Tech stack:** Next.js + TypeScript, Shadcn UI, TanStack Query
**Feature ใน PRD (วางแผนแล้ว ยังไม่ได้ build):** Topic Manager, Note Editor, Study Timer
**Competitors:** Anki (flashcard), Notion (note-taking)

**ข้อจำกัดของทีม:**
- Developer: 2 frontend, 1 fullstack
- Timeline: เหลืออีก 2 เดือน
- ต้องเลือก feature ที่ impact สูง effort ต่ำก่อน
- ยังอยู่ช่วง prototype — ยิ่งไม่ต้องการ backend ซับซ้อนในตอนนี้ยิ่งดี

---

คุณเป็น product manager ผู้เชี่ยวชาญ EdTech
จากข้อมูล PLA ข้างต้น แนะนำ feature ที่ควรพัฒนาลำดับถัดไป
พร้อมเหตุผลที่สอดคล้องกับข้อจำกัดของทีม ตอบเป็น bullet points ภาษาไทย
```

---

> 💬 สังเกตความต่างเลยครับ —
> ครึ่งบนคือ **Context Layer**: ข้อมูล PLA, tech stack, constraint ทีม
> ครึ่งล่างคือ **Prompt Layer**: role, action, format เหมือนเดิมทุกอย่าง
>
> คำตอบจะพูดถึง spaced repetition quiz เพราะมันต่อยอดจาก Feature ที่มีอยู่,
> ทำได้ด้วย mock data ยังไม่ต้องการ DB จริง และตรงกับ constraint ทีม
> ไม่ใช่เพราะ Prompt ดีขึ้น แต่เพราะ AI รู้จัก project ของเราแล้ว
