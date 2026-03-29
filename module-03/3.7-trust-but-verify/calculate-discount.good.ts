// ============================================================
// ✅ calculate-discount.good.ts — AI สร้างจาก prompt ที่มี spec ชัดเจน
//    แล้วผ่านการ Verify ครบทุกข้อ (วิดีโอ 3.7 Scene 4)
//
// Prompt ที่ใช้ (มี spec + constraint ชัดเจน):
//   "เพิ่มฟังก์ชัน calculateDiscount(price, qty): number
//    discount rule:
//      empty         → 0%
//      standard      → 5%
//      standard-bulk → 10%
//      premium       → 15%
//      premium-bulk  → 20%
//    ใช้ classifyOrder() ที่มีอยู่แล้ว — ห้ามเขียน logic จำแนก tier ซ้ำ"
//
// Verify Checklist Result:
//   ✅ Functionality   — discount แต่ละ tier ตรงตาม business rule
//   ✅ No Duplication  — ใช้ classifyOrder() ไม่เขียน tier logic ซ้ำ
//   ✅ Edge Cases      — price/qty ≤ 0 และ negative ได้รับการจัดการทั้งหมด
//   ✅ TypeScript Safe — return type ชัดเจน + fallback กรณี key ไม่ match
// ============================================================

// import จากไฟล์เดิม — ใช้ classifyOrder() ที่มีอยู่แล้ว ไม่ duplicate
import { classifyOrder, OrderKey } from "./utils-order-base"

// ✅ Discount table ตาม business rule — แก้ที่เดียว ใช้ได้ทุกที่
const DISCOUNT_MAP: Record<OrderKey, number> = {
  "empty":         0,
  "standard":      5,
  "standard-bulk": 10,
  "premium":       15,
  "premium-bulk":  20,
}

// ✅ ไม่มี tier logic ซ้ำ — delegate ให้ classifyOrder() จัดการ
//    Edge case ทุกกรณี (price<=0, qty<=0, negative) ถูกจัดการใน classifyOrder()
//    ซึ่ง return "empty" → discount = 0 ✅
export function calculateDiscount(price: number, qty: number): number {
  const tier = classifyOrder(price, qty)
  return DISCOUNT_MAP[tier] ?? 0  // ?? 0 คือ fallback ป้องกัน undefined
}

// ============================================================
// Test Cases — ใช้ verify ด้วยตนเองหลัง AI สร้างให้
// ─────────────────────────────────────────────────────────
// calculateDiscount(500, 5)    → tier: standard      → 5%   ✅
// calculateDiscount(500, 15)   → tier: standard-bulk → 10%  ✅
// calculateDiscount(1500, 5)   → tier: premium       → 15%  ✅
// calculateDiscount(1500, 15)  → tier: premium-bulk  → 20%  ✅
// calculateDiscount(0, 10)     → tier: empty         → 0%   ✅
// calculateDiscount(500, 0)    → tier: empty         → 0%   ✅
// calculateDiscount(-100, 10)  → tier: empty         → 0%   ✅ (edge case)
// ============================================================
