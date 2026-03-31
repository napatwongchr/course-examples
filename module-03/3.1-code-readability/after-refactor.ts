// ============================================================
// ✅ order.good.ts — โค้ดหลัง Refactor ด้วย AI (วิดีโอ 3.1)
// การปรับปรุง 3 จุด:
//   1. Dead code ถูกลบออกแล้ว
//   2. if-else ซ้อนกันถูกแทนที่ด้วย lookup table + early return
//   3. Logic ที่ซ้ำถูกรวมเป็น helper function เดียว
// ============================================================

type OrderTier =
  | "premium-bulk"
  | "premium"
  | "standard-bulk"
  | "standard"
  | "empty";

// ✅ Helper function รวม logic การจำแนก order tier ไว้ที่เดียว
function resolveOrderTier(price: number, qty: number): OrderTier {
  if (price <= 0 || qty <= 0) return "empty";

  const isPremium = price >= 1000;
  const isBulk = qty >= 10;

  const tierMap: Record<string, OrderTier> = {
    "premium-bulk": "premium-bulk",
    premium: "premium",
    "standard-bulk": "standard-bulk",
    standard: "standard",
  };

  const key = `${isPremium ? "premium" : "standard"}${isBulk ? "-bulk" : ""}`;
  return tierMap[key];
}

// ✅ Function signature เดิม — behavior เหมือนเดิมทุกกรณี
function getOrderStatus(price: number, qty: number): string {
  return resolveOrderTier(price, qty);
}

// ✅ ไม่มี duplicated logic — เรียก helper เดียวกัน
function getOrderLabel(price: number, qty: number): string {
  const labelMap: Record<OrderTier, string> = {
    "premium-bulk": "พรีเมียม (จำนวนมาก)",
    premium: "พรีเมียม",
    "standard-bulk": "มาตรฐาน (จำนวนมาก)",
    standard: "มาตรฐาน",
    empty: "ว่างเปล่า",
  };
  return labelMap[resolveOrderTier(price, qty)];
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
