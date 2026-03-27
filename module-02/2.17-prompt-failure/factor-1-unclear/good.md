# ✅ ปัจจัยที่ 1: ระบุเป้าหมาย ข้อจำกัด และ output format ให้ชัดเจน

เปิด chat ใหม่ แล้วส่ง prompt นี้:

```
ช่วย refactor calculateDiscount() ใน utils/pricing.ts
เป้าหมาย: ทำให้ test-friendly มากขึ้น โดย extract business rule ออกมาเป็น pure function
ข้อจำกัด: ห้ามเปลี่ยน function signature เพราะ 3 module depend อยู่
ผลลัพธ์: โค้ดที่ refactor แล้ว + คำอธิบายสิ่งที่เปลี่ยนและทำไม
```

---

> 💬 ต่างกันตรงที่บอกชัดว่า refactor เพื่ออะไร ไม่ใช่แค่ "ให้ดีขึ้น"
> พอระบุเป้าหมาย, constraint, และ output format ครบ
> AI จะตอบได้ตรงจุดทันที — ไม่ต้องเดาเจตนาของเรา
