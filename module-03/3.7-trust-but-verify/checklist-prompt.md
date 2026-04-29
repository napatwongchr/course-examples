ช่วย Review ตาม checklist 5 หมวดนี้ครับ:

**1. Functionality**

- ใช้ `classifyOrder()` จริงไหม หรือเขียน logic ซ้ำ
- discount แต่ละ tier ตรงตาม table ข้างบนไหม
- price=0 หรือ qty=0 คืนค่า 0 ไหม
- price หรือ qty เป็นค่า negative จะเกิดอะไร

**2. Code Quality**

- โค้ดอ่านง่ายและ maintain ได้ไหม
- ตั้งชื่อตัวแปร/ฟังก์ชันสื่อความหมายชัดไหม
- ใช้ TypeScript ได้ถูก best practice ไหม (return type เป็น `number` ชัดเจน, มี fallback กรณี OrderKey ไม่ match)

**3. Security**

- มีการ validate input ก่อนคำนวณไหม
- รับค่า negative หรือ NaN โดยไม่ตรวจสอบไหม

**4. Performance**

- logic มีความซับซ้อนเกินจำเป็นไหม
- มี operation ที่ทำซ้ำโดยไม่จำเป็นไหม

**5. Integration**

- เรียกใช้ `classifyOrder()` ได้ตรง interface ที่กำหนดไว้ไหม
- return type ตรงกับที่ฟังก์ชันอื่นในระบบคาดหวังไหม

ตอบในรูปแบบ: ✅ ผ่าน / ⚠️ ควรปรับ / ❌ ต้องแก้ไข พร้อมเหตุผล
