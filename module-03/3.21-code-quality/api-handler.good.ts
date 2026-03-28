// ============================================================
// ✅ api-handler.good.ts — โค้ด API ที่ปลอดภัยและมีคุณภาพสูง
//    (วิดีโอ 3.21 — เกณฑ์การประเมินคุณภาพและความปลอดภัยของโค้ดจาก AI)
//
// การแก้ไข 5 จุด:
//   1. ✅ Validate และ sanitize input ก่อนใช้งาน
//   2. ✅ Error response ไม่เปิดเผยข้อมูล internal
//   3. ✅ ไม่ log ข้อมูล sensitive
//   4. ✅ ตรวจสอบ authentication + authorization
//   5. ✅ Type-safe และมี runtime validation
// ============================================================

import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// ✅ 1. กำหนด schema validation ด้วย Zod — type-safe + runtime check
const RequestSchema = z.object({
  noteId: z.string().uuid("noteId ต้องเป็น UUID ที่ถูกต้อง"),
  userId: z.string().uuid("userId ต้องเป็น UUID ที่ถูกต้อง"),
})

// ✅ 4. ฟังก์ชันตรวจสอบ authentication จาก session/token
async function getAuthenticatedUserId(request: NextRequest): Promise<string | null> {
  const sessionToken = request.headers.get("authorization")?.replace("Bearer ", "")
  if (!sessionToken) return null

  // ตรวจสอบ token กับ session store (simplified)
  // ใน production จริงใช้ next-auth หรือ JWT verification
  const userId = await verifySessionToken(sessionToken)
  return userId
}

export async function POST(request: NextRequest) {
  // ✅ 4. ตรวจสอบ authentication ก่อนเลย — ถ้าไม่ได้ login ปฏิเสธทันที
  const authenticatedUserId = await getAuthenticatedUserId(request)
  if (!authenticatedUserId) {
    return NextResponse.json(
      { error: "Unauthorized — กรุณา login ก่อนใช้งาน" },
      { status: 401 }
    )
  }

  // ✅ 1. Parse และ validate input ด้วย Zod
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Request body ไม่ถูกต้อง — ต้องเป็น JSON" },
      { status: 400 }
    )
  }

  const parsed = RequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "ข้อมูลไม่ถูกต้อง",
        // ✅ บอก client ว่า field ไหนผิด แต่ไม่เปิดเผย internal
        issues: parsed.error.issues.map((i) => i.message),
      },
      { status: 400 }
    )
  }

  const { noteId, userId } = parsed.data

  // ✅ 4. ตรวจสอบว่า userId ที่ส่งมาตรงกับ user ที่ login จริงๆ
  //       ป้องกัน user ปลอมแปลง userId เพื่อเข้าถึงข้อมูลคนอื่น
  if (userId !== authenticatedUserId) {
    return NextResponse.json(
      { error: "Forbidden — ไม่มีสิทธิ์เข้าถึงข้อมูลนี้" },
      { status: 403 }
    )
  }

  try {
    const note = await fetchNote(noteId, authenticatedUserId)

    if (!note) {
      return NextResponse.json(
        { error: "ไม่พบ Note ที่ต้องการ" },
        { status: 404 }
      )
    }

    // ✅ 3. ไม่ log ข้อมูล sensitive เช่น API key, token, หรือ user content
    //       Log เฉพาะ metadata ที่จำเป็นสำหรับ debugging
    console.log(`[API] Note fetched: noteId=${noteId}, userId=${authenticatedUserId.slice(0, 8)}...`)

    return NextResponse.json({ note })
  } catch (error) {
    // ✅ 2. log error ไว้ใน server (สำหรับ monitoring) แต่ไม่ส่ง detail ให้ client
    console.error("[API] fetchNote error:", error)

    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดภายใน กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
      // ✅ ไม่มี stack trace หรือ error.message ใน response
    )
  }
}

// ✅ 4. ฟังก์ชันนี้ตรวจสอบ ownership ก่อนคืนข้อมูล — ป้องกัน IDOR
async function fetchNote(noteId: string, requestingUserId: string) {
  // สมมติว่าดึงจาก database
  const note = { id: noteId, content: "...", ownerId: requestingUserId }

  // ✅ ตรวจสอบว่า user ที่ request คือเจ้าของ note จริงๆ
  if (note.ownerId !== requestingUserId) {
    return null  // ไม่คืนข้อมูล — ป้องกัน Insecure Direct Object Reference
  }

  return note
}

// Placeholder — ใน production ใช้ next-auth หรือ JWT verify
async function verifySessionToken(token: string): Promise<string | null> {
  // verify token และคืน userId ถ้า valid
  return token ? "user-uuid-from-token" : null
}
