// ============================================================
// ❌ calculate-discount.bad.ts — AI สร้างจาก prompt ที่ไม่มี spec
//    (วิดีโอ 3.7 Scene 4 — ตัวอย่างที่ไม่ผ่าน Verify)
//
// Prompt ที่ใช้ (ไม่มี spec):
//   "เพิ่มฟังก์ชัน calculateDiscount(price, qty) ใน utils/order.ts
//    ให้คืนค่า discount เป็น % ตาม order tier"
//
// ปัญหาที่พบหลัง Verify:
//   ❌ Duplicated Logic — เขียน tier classification ซ้ำแทนที่จะใช้ classifyOrder()
//   ❌ Missing Edge Case — ไม่จัดการกรณี price หรือ qty เป็นค่า negative
//   ❌ No Fallback — ถ้า OrderKey ไม่ match จะ return undefined แทน 0
//   ⚠️ Inconsistent Rule — AI เดา discount % เอง ไม่ตรงกับ business rule จริง
// ============================================================

// ❌ Duplicated Logic — AI เขียน if-else จำแนก tier ใหม่ทั้งหมด
//    ทั้งที่มี classifyOrder() อยู่แล้ว — ถ้าแก้ logic tier ทีหลัง
//    ต้องแก้สองที่ → bug แน่นอน

export function calculateDiscount(price: number, qty: number): number {
  if (price <= 0 || qty <= 0) {
    return 0;
  }

  if (price >= 1000) {
    if (qty >= 10) {
      return 25;
    } else {
      return 15;
    }
  } else {
    if (qty >= 10) {
      return 10;
    } else {
      return 5;
    }
  }
}
