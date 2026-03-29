# 5.15 การตรวจสอบความปลอดภัยของ Code จาก Generative AI ด้วยแนวทาง OWASP

## Owasp check propmpt

ช่วยตรวจสอบ security ของ code นี้จากโปรเจกต์ PLA (Next.js + TypeScript + in-memory store)
โดยใช้ OWASP Top 10 เป็น framework:

type Context = { params: Promise<{ id: string }> }

export async function POST(request: NextRequest, { params }: Context) {
const { id } = await params

const body = await request.json()

const now = new Date().toISOString()
const note: Note = {
id: generateId(),
topicId: id,
content: body.content,  
 wordCount: countWords(body.content),
createdAt: now,
updatedAt: now,
}

store.notes.set(note.id, note)  
 return Response.json(note)
}

ต้องการ:

1. ระบุช่องโหว่ทุกจุดพร้อมระดับความเสี่ยง (Critical/High/Medium/Low)
2. อธิบายว่า attacker จะ exploit ได้อย่างไร
3. เขียน code ที่แก้ไขแล้วพร้อม comment อธิบายการแก้ไข
4. Security checklist ที่ควรตรวจสอบก่อน deploy
