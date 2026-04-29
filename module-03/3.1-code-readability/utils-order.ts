// ============================================================
// ✅ order.ts — โค้ดหลัง Refactor
// แก้ไข 3 จุด:
//   1. Dead code — ลบตัวแปร debugMsg, tempFlag ที่ไม่ได้ใช้
//   2. Simplify conditional — ใช้ early return แทน if-else ซ้อน
//   3. Remove duplication — แยก logic หมวดออกเป็น helper function
// ============================================================

type OrderTier = "premium-bulk" | "premium" | "standard-bulk" | "standard" | "empty";

const STATUS_LABELS: Record<OrderTier, string> = {
  "premium-bulk": "พรีเมียม (จำนวนมาก)",
  "premium": "พรีเมียม",
  "standard-bulk": "มาตรฐาน (จำนวนมาก)",
  "standard": "มาตรฐาน",
  "empty": "ว่างเปล่า",
};

function getOrderTier(price: number, qty: number): OrderTier {
  if (price <= 0 || qty <= 0) return "empty";
  const isPremium = price >= 1000;
  const isBulk = qty >= 10;
  if (isPremium) return isBulk ? "premium-bulk" : "premium";
  return isBulk ? "standard-bulk" : "standard";
}

function getOrderStatus(price: number, qty: number): string {
  return getOrderTier(price, qty);
}

function getOrderLabel(price: number, qty: number): string {
  return STATUS_LABELS[getOrderTier(price, qty)];
}

// ── Execute ──────────────────────────────────────────
console.log(getOrderStatus(1500, 15)); // "premium-bulk"
console.log(getOrderStatus(1500, 5));  // "premium"
console.log(getOrderStatus(500, 15));  // "standard-bulk"
console.log(getOrderStatus(500, 5));   // "standard"
console.log(getOrderStatus(0, 0));     // "empty"

console.log(getOrderLabel(1500, 15)); // "พรีเมียม (จำนวนมาก)"
console.log(getOrderLabel(500, 5));   // "มาตรฐาน"
console.log(getOrderLabel(0, 0));     // "ว่างเปล่า"
