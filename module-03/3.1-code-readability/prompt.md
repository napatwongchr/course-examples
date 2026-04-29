ช่วย refactor ไฟล์ utils/order.ts ให้ดีขึ้น 3 เรื่องนี้ครับ:

1. Dead Code Removal — ลบตัวแปรที่ประกาศแต่ไม่ได้ใช้งานออก
2. Simplify Conditional — ปรับ if-else ที่ซ้อนหลายชั้นให้อ่านง่ายขึ้น
   (แนะนำ: ใช้ early return หรือ lookup table แทน)
3. Remove Duplication — รวม logic ที่ซ้ำกันระหว่าง getOrderStatus()
   และ getOrderLabel() ให้เป็น helper function เดียว

ข้อจำกัด:

- ห้ามเปลี่ยน function signature ทั้งสองฟังก์ชัน
- ห้ามเปลี่ยน behavior — ผลลัพธ์ต้องเหมือนเดิมทุกกรณี
- ใช้ TypeScript strict mode
