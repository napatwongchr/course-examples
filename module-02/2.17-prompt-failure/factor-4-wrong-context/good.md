# ✅ ปัจจัยที่ 4: ระบุ role, จุดโฟกัส และ output format ที่ชัดเจน

เปิด chat ใหม่ แล้วส่ง prompt นี้:

```
ช่วย code review PR นี้ในฐานะ tech lead ของ fintech startup
เน้นหา: security bug (SQL injection, auth bypass, data exposure)
ไม่ต้อง comment เรื่อง naming convention หรือ code style
ถ้าพบปัญหา: ให้บอก severity (Critical/High/Medium) + วิธีแก้

[วาง Pull Request โค้ดเดิม 50 บรรทัด]
```

---

> 💬 โค้ดเหมือนกันทุกอย่าง สิ่งที่ต่างคือ AI รู้บริบท:
> fintech → เน้น security ไม่ใช่ style
>
> ปัจจัยนี้ต่างจากปัจจัยที่ 2 ตรงที่ข้อมูลมีครบแล้ว
> แต่ AI ไม่รู้ว่าต้องโฟกัสมุมไหน และทำสำหรับใคร
> พอระบุ role + จุดโฟกัส + format ครบ คำตอบจะเจาะจงและมีประโยชน์ทันที
