# OWASP Security Review Prompt — Scene 2

> **วิธีใช้:** Copy prompt ด้านล่าง → วางต่อท้ายโค้ดจาก `01-sample-code-to-review.md`
> → Paste ทั้งหมดใน Claude.ai แล้ว Send

---

## Prompt (copy ข้างล่างนี้ ต่อท้ายโค้ดจาก 01)

```
ช่วยทำ Security Review โค้ด API ทั้งหมดข้างต้นตาม OWASP Top 10 ให้หน่อยครับ

Context:
- ระบบ PLA (Personal Learning Assistant) — เว็บแอปสำหรับนักศึกษาไทย
- Framework: Next.js 15 App Router, TypeScript
- Phase 1: ใช้ In-memory MockStore (ยังไม่มี database จริง)
- Phase 2 จะ deploy บน Vercel พร้อม PostgreSQL และระบบ authentication
- ผู้ใช้: anonymous session ใน Phase 1 (ยังไม่มีระบบ login)

ขอให้แยก Report เป็น 2 ระดับ:

🔴 Critical — ต้องแก้ก่อน Deploy ขึ้น Production (Phase 2)
⚠️ Warning — ควรแก้แต่ไม่ blocking Phase 1

สำหรับแต่ละช่องโหว่ให้ระบุ:
- OWASP ID (เช่น A01, A07)
- ชื่อช่องโหว่
- ชื่อไฟล์และบรรทัดในโค้ดที่มีปัญหา
- ตัวอย่าง curl command หรือ payload ที่ attacker ใช้ exploit ได้จริง
- วิธีแก้ไขพร้อม code example
```

---

## ผลลัพธ์ที่คาดว่า AI จะตอบ (สำหรับ Instructor — เตรียมตัวก่อนบันทึก)

### 🔴 Critical

**1. A01 Broken Access Control — IDOR บน PUT/DELETE Note**
- ไฟล์: `app/api/notes/[id]/route.ts`
- บรรทัด: `noteService.delete(id)` และ `noteService.update(id, parsed.data)` — ไม่มีตรวจ ownership
- ความเสี่ยง: ใครก็ได้ที่รู้ note ID ลบหรือแก้ไข note ของคนอื่นได้ทันที
- Exploit example:
```bash
curl -X DELETE https://pla.app/api/notes/abc-123
curl -X PUT https://pla.app/api/notes/abc-123 \
  -H "Content-Type: application/json" \
  -d '{"content": "HACKED!"}'
```
- แก้ไข:
```typescript
export async function DELETE(request: Request, { params }: Params) {
  const session = await getServerSession(request)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const note = noteService.getById(id)
  if (note?.userId !== session.userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  noteService.delete(id)
  return new NextResponse(null, { status: 204 })
}
```

**2. A07 Identification & Authentication Failures — ไม่มี Authentication เลย**
- ไฟล์: ทุกไฟล์ (notes, topics, study-sessions)
- ความเสี่ยง: ใครก็เรียก API ได้โดยไม่ต้อง login — อ่าน สร้าง แก้ ลบ ได้ทั้งหมด
- แก้ไข Phase 2: เพิ่ม middleware ตรวจ session ก่อนทุก route

---

### ⚠️ Warning

**3. A03 Injection / XSS — Note content ไม่มี sanitize หรือ max length**
- ไฟล์: `lib/validators.ts`
- บรรทัด: `content: z.string()` — รับทุกอย่างโดยไม่จำกัด
- ความเสี่ยง: ส่ง `<script>...</script>` เข้าได้ถ้า frontend render แบบ unsafe / ส่งข้อมูล 100MB ทำ server OOM
- แก้ไข:
```typescript
export const CreateNoteSchema = z.object({
  content: z.string().min(1).max(50000).transform(val => DOMPurify.sanitize(val)),
})
```

**4. A04 Insecure Design — durationMinutes ไม่มี max**
- ไฟล์: `app/api/study-sessions/route.ts`
- บรรทัด: `durationMinutes: z.number().min(0)` — ไม่มี upper bound
- ความเสี่ยง: ส่ง `durationMinutes: 999999` → `totalStudyMinutes` บน topic พุ่งผิดปกติได้ไม่จำกัด
- แก้ไข: `durationMinutes: z.number().min(0).max(1440)`

**5. A05 Security Misconfiguration — ไม่มี Security Headers**
- ไฟล์: `next.config.ts` — ว่างเปล่า
- ความเสี่ยง: ไม่มี CSP (XSS), ไม่มี X-Frame-Options (Clickjacking), ไม่มี HSTS (downgrade attack)
- แก้ไข:
```typescript
const nextConfig: NextConfig = {
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Content-Security-Policy', value: "default-src 'self'" },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
      ],
    }]
  },
}
```

**6. A09 Security Logging & Monitoring Failures — ไม่มี Audit Log**
- ไฟล์: ทุกไฟล์
- ความเสี่ยง: ถ้ามีการลบข้อมูลหรือโจมตี จะไม่มีหลักฐานเลยว่าใครทำ เมื่อไหร่ จาก IP ไหน
- แก้ไข: เพิ่ม structured logging ทุก mutation endpoint
```typescript
console.info('[DELETE /api/notes/:id]', {
  noteId: id,
  ip: request.headers.get('x-forwarded-for'),
  timestamp: new Date().toISOString(),
})
```
