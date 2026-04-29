# Code Review Convention — Task Tracker Pro

> เอกสารนี้คือ Code Review Convention ของทีม
> ใช้แนบใน Claude Desktop ในขั้นตอน Scene 3 (Design)
> เพื่อให้ AI มี Context เกี่ยวกับมาตรฐานของทีม

---

## 1. General Principles

- โค้ดต้องอ่านเข้าใจได้โดยไม่ต้องอธิบาย (self-documenting)
- ไม่ commit dead code หรือ commented-out code
- Function ต้องทำสิ่งเดียว (Single Responsibility)
- Magic numbers ต้องเป็น named constants เสมอ

---

## 2. TypeScript

- ห้ามใช้ `any` ยกเว้นมี comment อธิบายชัดเจน
- Interface ต้อง prefix ด้วย `I` (เช่น `IProject`, `ITask`)
- ใช้ `readonly` สำหรับ props ที่ไม่ควรเปลี่ยน
- ทุก async function ต้องมี try/catch หรือ error boundary
- Return type ต้องระบุ explicit สำหรับ public functions

---

## 3. React / Next.js

- Component names ต้องเป็น PascalCase
- Props interface ต้องชื่อ `[ComponentName]Props`
- ห้ามใช้ `useEffect` แบบ empty dependency array โดยไม่มี comment อธิบาย
- State ที่ derive ได้จาก state อื่นต้องเป็น computed ไม่ใช่ state แยก
- ห้าม inline style — ต้องใช้ Tailwind class เสมอ

---

## 4. API Routes (Next.js)

- ต้อง validate input ทุก request ก่อน process
- Error response ต้องใช้ HTTP status code ที่ถูกต้อง (400, 401, 404, 500)
- ต้องมี error message ที่ชัดเจน ไม่ส่ง stack trace ออก production
- Rate limiting ต้อง implement สำหรับ endpoints ที่เรียก AI

---

## 5. Naming Conventions

| ประเภท | Convention | ตัวอย่าง |
|--------|-----------|---------|
| Variables / Functions | camelCase | `fetchProjects`, `taskCount` |
| Constants | UPPER_SNAKE_CASE | `MAX_TASKS_PER_PROJECT` |
| Types / Interfaces | PascalCase | `ITask`, `TaskStatus` |
| Files (Components) | PascalCase | `TaskCard.tsx` |
| Files (Utilities) | kebab-case | `format-date.ts` |
| API Routes | kebab-case | `/api/project-summary` |

---

## 6. Error Handling

```typescript
// ✅ CORRECT
try {
  const result = await fetchTask(id);
  return result;
} catch (error) {
  console.error('[fetchTask] Failed:', error);
  throw new AppError('TASK_FETCH_FAILED', 'ไม่สามารถดึงข้อมูล Task ได้');
}

// ❌ WRONG — swallowing errors silently
try {
  const result = await fetchTask(id);
  return result;
} catch {
  return null;
}
```

---

## 7. Testing (Vitest)

- ทุก utility function ต้องมี unit test
- API routes ต้องมี integration test ครอบคลุม happy path + error cases
- Test description ต้องอ่านเข้าใจได้: `describe('fetchTask') → it('should return null when task not found')`
- ห้าม `test.only` หรือ `test.skip` ใน production branch

---

## 8. Security

- `ANTHROPIC_API_KEY` และ secret ทั้งหมดต้องอยู่ใน `.env.local` เท่านั้น
- ห้าม log ข้อมูล user ที่ sensitive (email, name, task content) ใน production
- Input ทุกอันที่รับจาก user ต้อง sanitize ก่อนส่งให้ AI
