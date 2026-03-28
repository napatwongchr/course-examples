// ============================================================
// ❌ order.bad.ts — โค้ดก่อน Refactor (ใช้ในวิดีโอ 3.1)
// ปัญหา 3 จุด:
//   1. Dead code — ตัวแปรที่ประกาศแต่ไม่ได้ใช้
//   2. Complex conditional — if-else ซ้อนหลายชั้น
//   3. Duplicated logic — logic เดิมซ้ำในสองฟังก์ชัน
// ============================================================

function getOrderStatus(price: number, qty: number): string {
  const debugMsg = "checking order..."  // ❌ dead code — ไม่ได้ใช้เลย
  const tempFlag = true                 // ❌ dead code — ไม่ได้ใช้เลย

  if (price > 0 && qty > 0) {
    if (price >= 1000) {
      if (qty >= 10) {
        return "premium-bulk"
      } else {
        return "premium"
      }
    } else {
      if (qty >= 10) {
        return "standard-bulk"
      } else {
        return "standard"
      }
    }
  } else if (price === 0 && qty === 0) {
    return "empty"
  } else {
    return "empty"   // ❌ duplicated — return ค่าเดิมซ้ำกับ else if ข้างบน
  }
}

function getOrderLabel(price: number, qty: number): string {
  // ❌ duplicated logic — เงื่อนไขเดียวกันกับ getOrderStatus ทุกอย่าง
  if (price > 0 && qty > 0) {
    if (price >= 1000) {
      if (qty >= 10) {
        return "พรีเมียม (จำนวนมาก)"
      } else {
        return "พรีเมียม"
      }
    } else {
      if (qty >= 10) {
        return "มาตรฐาน (จำนวนมาก)"
      } else {
        return "มาตรฐาน"
      }
    }
  } else {
    return "ว่างเปล่า"
  }
}
