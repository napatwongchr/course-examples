// ============================================================
//
// ไฟล์นี้คือ utils/order.ts ที่ refactor เสร็จแล้วจาก 3.1 และ 3.3
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

const DISCOUNT_MAP: Record<OrderKey, number> = {
  "premium-bulk": 20,
  premium: 15,
  "standard-bulk": 10,
  standard: 5,
  empty: 0,
};

export function calculateDiscount(price: number, qty: number): number {
  return DISCOUNT_MAP[classifyOrder(price, qty)];
}
