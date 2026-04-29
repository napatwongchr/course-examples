## Prompt for creating calculate discount

ให้ลองเพิ่มฟังก์ชัน calculateDiscount(price: number, qty: number): number
ใน utils/order.ts ให้คืนค่า discount เป็น % ตาม rule นี้:

| Order tier    | Discount |
| ------------- | -------- |
| empty         | 0%       |
| standard      | 5%       |
| standard-bulk | 10%      |
| premium       | 15%      |
| premium-bulk  | 20%      |

ใช้ classifyOrder() ที่มีอยู่แล้วช่วย — ห้ามเขียน logic จำแนก tier ซ้ำ
