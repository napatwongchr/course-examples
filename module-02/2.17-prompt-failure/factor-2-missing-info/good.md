# ✅ ปัจจัยที่ 2: ใส่ข้อมูลครบ — Error, โค้ด, state, และ steps ที่ reproduce ได้

เปิด chat ใหม่ แล้วส่ง prompt นี้:

```
Profile page crash เมื่อ user กดปุ่ม "บันทึก" หลังแก้ไขข้อมูล

Error (จาก browser console):
TypeError: Cannot read properties of null (reading 'id')
  at handleSave (pages/profile.tsx:47)

โค้ดที่ line 47:
  const userId = currentUser.id  // crash ตรงนี้

currentUser มาจาก: const currentUser = useAuthStore(state => state.user)

Reproduce: logout → เปิด /profile โดยตรง → กด "บันทึก"

ช่วย: 1) อธิบายสาเหตุ 2) วิธีแก้ที่ถูกต้อง
```

---

> 💬 ตอนนี้ AI มีข้อมูลทุกอย่าง: error message, โค้ดที่มีปัญหา,
> state management ที่ใช้ และ steps ที่ reproduce ได้
> ทำให้วิเคราะห์ได้ตรงจุดเลย ไม่ต้องเดาเลยสักอย่าง
