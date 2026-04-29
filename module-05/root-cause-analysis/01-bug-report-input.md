# Bug Report สำหรับ Demo — 5 Whys Root Cause Analysis

> **ที่มา:** Bug ที่เกิดซ้ำๆ ในระบบ PLA — ใช้เป็น Input สำหรับ Prompt ใน Scene 2

---

## Bug Report

**Bug ID:** BUG-2024-089  
**ระบบ:** PLA (Platform Learning App) — `components/topic-card.tsx`  
**วันที่รายงาน:** 2024-02-03  
**ความรุนแรง:** Medium — ข้อมูลไม่ถูกต้อง ส่งผลกับ User ทุกคนที่ใช้ Study Timer

**อาการ:**  
User กด "Start Studying" จับเวลาเรียน แล้วกด "Stop" — แต่ตัวเลข `X min` บน Topic Card  
ไม่เปลี่ยนแปลง ยังแสดงค่าเดิมอยู่ (หรือยังเป็น 0) แม้ว่า session จะจบแล้ว

**สิ่งที่เกิดขึ้น (Timeline):**  
1. User กด Stop → `useStudyTimer.stop()` คำนวณ `durationMinutes`  
2. `stop()` ส่ง `POST /api/study-sessions` พร้อม `{ topicId, durationMinutes }` → 201 Created  
3. ฝั่ง server: `studySessionService.create()` เรียก `store.createStudySession()` — อัปเดต `totalStudyMinutes` ใน MockStore instance A  
4. `stop()` เรียก `qc.invalidateQueries({ queryKey: ['topics'] })` → React Query re-fetch `GET /api/topics`  
5. ฝั่ง server: `topicService.getAll()` เรียก `store.getTopics()` — แต่เป็น MockStore instance B (ต่างจาก instance A) ที่ยังมี `totalStudyMinutes: 0`  
6. UI ได้รับข้อมูลเก่า → `{topic.totalStudyMinutes} min` ยังแสดงค่าเดิม

**ผลกระทบ:**  
- User ทุกคนเห็น `totalStudyMinutes` ไม่อัปเดต ทำให้ไม่รู้ว่าตัวเองเรียนไปกี่นาที  
- หาก reload หน้า — ข้อมูลหายหมด เพราะ MockStore เป็น in-memory ที่ไม่ persistent  
- Team แก้ไขโดย "เพิ่ม `console.log` debug" และ "ลอง invalidate query หลายรอบ" — แต่ไม่ได้ผล

**ประวัติการแก้ไข:**  
- ครั้งที่ 1: เพิ่ม `await` หน้า `qc.invalidateQueries(...)` → ปัญหายังอยู่  
- ครั้งที่ 2: เพิ่ม `refetchOnWindowFocus: true` ใน React Query config → ข้อมูลอัปเดตเมื่อ switch tab แต่ยังไม่อัปเดตทันทีหลัง Stop  

**ไฟล์ที่เกี่ยวข้อง:**  
- `components/topic-card.tsx` — แสดง `{topic.totalStudyMinutes} min`  
- `components/study-timer.tsx` — ปุ่ม Start/Stop  
- `hooks/use-study-timer.ts` — logic จับเวลาและ POST session  
- `app/api/study-sessions/route.ts` — POST handler  
- `app/api/topics/route.ts` — GET handler  
- `store/mock-store.ts` — `MockStore` class (in-memory singleton)
