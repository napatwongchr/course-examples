# 🔄 ปรับ Plan ก่อน Implement — Scene 3

หลังจาก AI เสนอ Plan มาแล้ว ตรวจดูและส่ง prompt นี้เพื่อ revise ก่อนกด Implement:

```
Plan ดีครับ แต่ขอเพิ่ม:
- lib/mock/topics.ts ให้มี helper function: getTopicById,
  sortByLastStudied, filterByNoteCount
- TopicCard ต้องแสดง totalStudyMinutes เป็นชั่วโมง:นาที (เช่น 1h 30m)
- เพิ่ม loading state และ error state ใน TopicList

ถ้า Plan อัปเดตแล้ว ค่อย Implement ครับ
```

---

> 💬 จุดนี้คือข้อดีหลักของ Plan mode ครับ —
> เราสามารถปรับ Plan ได้ก่อนที่จะมีโค้ดแม้แต่บรรทัดเดียว
> ไม่ต้องมา refactor ทีหลัง ไม่ต้อง undo งาน implement ที่ทำไปแล้ว
> Plan → Review → Revise → Implement คือลำดับที่ลด rework ได้มากที่สุด

---

**ตัวอย่าง Plan ที่ AI เสนอก่อน revise:**

```
📋 Plan: F01 Topic Manager

ไฟล์ที่จะสร้าง:
├── lib/mock/topics.ts          ← mock data + CRUD functions
├── app/topics/page.tsx         ← Topic list page
├── app/topics/[id]/page.tsx    ← Topic detail page
├── components/topics/
│   ├── TopicList.tsx           ← แสดงรายการ topics
│   ├── TopicCard.tsx           ← card แสดง topic เดี่ยว
│   └── TopicForm.tsx           ← form สำหรับ create/edit
└── types/topic.ts              ← TypeScript interfaces

ลำดับการสร้าง:
1. types/topic.ts (interfaces ก่อน)
2. lib/mock/topics.ts (mock data + functions)
3. components/ (UI components)
4. app/topics/ (pages ที่ใช้ components)
```

> 💬 Plan นี้ดีมากครับ แต่สังเกตว่า lib/mock/topics.ts ยังไม่มี helper functions
> ที่เราต้องการ เช่น getTopicById, sortByLastStudied
> และ TopicCard ยังไม่ได้ระบุว่าจะ format เวลายังไง
> เลยปรับ Plan ก่อนด้วย prompt ด้านบน — แล้วค่อย Implement
