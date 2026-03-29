// ============================================================
// 📄 utils/order.ts — หลัง AI Refactor (ใช้ใน Demo วิดีโอ 3.3)
//
// ไฟล์นี้คือผลลัพธ์จากการ Refactor ใน 3.1
// ใช้อ่านและทำความเข้าใจด้วย OITU Method ใน Scene 3 ของวิดีโอ 3.3
//
// OITU Walkthrough:
//   O — Overview:    1 type, 1 interface, 1 constant, 3 functions
//   I — Identify:    OrderKey, ORDER_MAP, classifyOrder() เป็น core
//   T — Trace:       getOrderStatus/getOrderLabel → classifyOrder → ORDER_MAP
//   U — Understand:  แยก classification logic ออกจาก display logic
// ============================================================

type OrderKey =
  | "premium-bulk"
  | "premium"
  | "standard-bulk"
  | "standard"
  | "empty";

interface OrderInfo {
  status: OrderKey;
  label: string;
}

const ORDER_MAP: Record<OrderKey, string> = {
  "premium-bulk": "พรีเมียม (จำนวนมาก)",
  premium: "พรีเมียม",
  "standard-bulk": "มาตรฐาน (จำนวนมาก)",
  standard: "มาตรฐาน",
  empty: "ว่างเปล่า",
};

function classifyOrder(price: number, qty: number): OrderKey {
  if (price <= 0 || qty <= 0) return "empty";
  const tier = price >= 1000 ? "premium" : "standard";
  const bulk = qty >= 10 ? "-bulk" : "";
  return `${tier}${bulk}` as OrderKey;
}

export function getOrderStatus(price: number, qty: number): string {
  return classifyOrder(price, qty);
}

export function getOrderLabel(price: number, qty: number): string {
  return ORDER_MAP[classifyOrder(price, qty)];
}
