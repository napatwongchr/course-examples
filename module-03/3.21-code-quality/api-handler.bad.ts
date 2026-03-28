// ============================================================
// ❌ api-handler.bad.ts — โค้ด API ที่มีปัญหาด้านความปลอดภัย
//    (วิดีโอ 3.21 — เกณฑ์การประเมินคุณภาพและความปลอดภัยของโค้ดจาก AI)
//
// ปัญหาด้านความปลอดภัย 5 จุด:
//   1. ❌ ไม่ validate input จากผู้ใช้
//   2. ❌ error message เปิดเผยข้อมูล internal
//   3. ❌ API key / secret ถูก log ออกมา
//   4. ❌ ไม่ตรวจสอบ authorization
//   5. ❌ SQL-like injection risk (ใน real DB case)
// ============================================================

import { NextRequest, NextResponse } from "next/server"

// ❌ 1. ไม่มี input validation — รับข้อมูลจาก user โดยตรงเลย
// ❌ 4. ไม่มีการตรวจสอบว่า request มาจาก user ที่ login แล้วหรือเปล่า
export async function POST(request: NextRequest) {
  const body = await request.json()

  // ❌ 3. log ข้อมูล sensitive ออกมา — ถ้ามี log aggregation จะเห็น key ทั้งหมด
  console.log("Request body:", JSON.stringify(body))
  console.log("API Key used:", process.env.OPENAI_API_KEY)

  // ❌ 2. ไม่ sanitize noteId ก่อนใช้ — ถ้าต่อ DB จริงอาจโดน injection
  const noteId = body.noteId
  const userId = body.userId

  try {
    // สมมติว่าดึงข้อมูลจาก service
    const note = await fetchNote(noteId, userId)

    return NextResponse.json({ note })
  } catch (error) {
    // ❌ 2. error message เปิดเผย internal details ให้ client เห็น
    //       stack trace, database schema, หรือ internal path อาจรั่วไหล
    return NextResponse.json(
      {
        error: "เกิดข้อผิดพลาด",
        details: (error as Error).message,   // ❌ อย่า expose internal error message
        stack: (error as Error).stack,       // ❌ อย่า expose stack trace เด็ดขาด
      },
      { status: 500 }
    )
  }
}

// ❌ ฟังก์ชันนี้ไม่มีการตรวจสอบว่า userId เป็นเจ้าของ noteId จริงหรือเปล่า
//    ผู้ใช้คนอื่นอาจเข้าถึง note ของคนอื่นได้ (Broken Access Control)
async function fetchNote(noteId: string, userId: string) {
  // ไม่มีการตรวจสอบ authorization ว่า user คนนี้มีสิทธิ์เข้าถึง note นี้
  // สมมติว่าเรียก database หรือ service
  return { id: noteId, content: "...", ownerId: "some-other-user" }
}
