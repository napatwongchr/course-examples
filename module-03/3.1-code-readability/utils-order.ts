// ============================================================
// ❌ order.bad.ts — โค้ดก่อน Refactor
// ปัญหา 3 จุด:
//   1. Dead code — ตัวแปรที่ประกาศแต่ไม่ได้ใช้
//   2. Complex conditional — if-else ซ้อนหลายชั้น
//   3. Duplicated logic — logic เดิมซ้ำในสองฟังก์ชัน
// ============================================================
function getOrderStatus(price: number, qty: number): string {
  const debugMsg = "checking order...";
  const tempFlag = true;

  if (price > 0 && qty > 0) {
    if (price >= 1000) {
      if (qty >= 10) {
        return "premium-bulk";
      } else {
        return "premium";
      }
    } else {
      if (qty >= 10) {
        return "standard-bulk";
      } else {
        return "standard";
      }
    }
  } else if (price === 0 && qty === 0) {
    return "empty";
  } else {
    return "empty";
  }
}

function getOrderLabel(price: number, qty: number): string {
  if (price > 0 && qty > 0) {
    if (price >= 1000) {
      if (qty >= 10) {
        return "พรีเมียม (จำนวนมาก)";
      } else {
        return "พรีเมียม";
      }
    } else {
      if (qty >= 10) {
        return "มาตรฐาน (จำนวนมาก)";
      } else {
        return "มาตรฐาน";
      }
    }
  } else {
    return "ว่างเปล่า";
  }
}

// ── Execute ──────────────────────────────────────────
console.log(getOrderStatus(1500, 15)); // "premium-bulk"
console.log(getOrderStatus(1500, 5)); // "premium"
console.log(getOrderStatus(500, 15)); // "standard-bulk"
console.log(getOrderStatus(500, 5)); // "standard"
console.log(getOrderStatus(0, 0)); // "empty"

console.log(getOrderLabel(1500, 15)); // "พรีเมียม (จำนวนมาก)"
console.log(getOrderLabel(500, 5)); // "มาตรฐาน"
console.log(getOrderLabel(0, 0)); // "ว่างเปล่า"
