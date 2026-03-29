# ci.yml ขั้นแรก — แค่ run unit tests

## Prompt เขียน Github Action workflow เพื่อ Run Unit test

ช่วยเขียน GitHub Actions workflow สำหรับโปรเจกต์ Personal Learning Assistant ครับ

Tech Stack:

- Next.js 16 + TypeScript + React 19
- Testing: Vitest (ไม่ใช่ Jest)
- Package manager: npm

Workflow ต้องการ:

- Trigger: push และ pull_request บน main branch
- Node.js version: 22
- Steps ที่ต้องรัน:
  1. Checkout code
  2. Setup Node.js
  3. npm ci (install dependencies)
  4. npx tsc --noEmit (TypeScript check — ยังไม่มี type-check script ใน package.json)
  5. npm test (รัน Vitest suite แค่ Unit test เท่านั้น)

Output: ไฟล์ .github/workflows/ci.yml
