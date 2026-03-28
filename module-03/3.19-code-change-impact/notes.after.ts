// ============================================================
// 📄 notes.after.ts — โค้ดหลัง Refactor (วิดีโอ 3.19)
//
// การเปลี่ยนแปลง: getNotesByTopicId() คืน { notes, total }
//                 แทนที่จะคืน Note[] เหมือนเดิม
//                 เพื่อรองรับ pagination ในอนาคต
//
// ⚠️ ทุกไฟล์ที่ใช้ getNotesByTopicId() ต้อง update ตาม!
// ============================================================

export interface Note {
  id: string
  topicId: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

// ✅ New return type สำหรับ pagination
export interface NotesResult {
  notes: Note[]
  total: number
}

// Mock data
const mockNotes: Note[] = [
  {
    id: "note-1",
    topicId: "topic-1",
    title: "React Hooks Overview",
    content: "useState, useEffect, useContext...",
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-10"),
  },
  {
    id: "note-2",
    topicId: "topic-1",
    title: "useEffect Deep Dive",
    content: "dependency array, cleanup function...",
    createdAt: new Date("2025-01-12"),
    updatedAt: new Date("2025-01-13"),
  },
  {
    id: "note-3",
    topicId: "topic-2",
    title: "TypeScript Generics",
    content: "T, K extends keyof T, conditional types...",
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
  },
]

// ✅ Refactored: คืน { notes, total } แทน Note[]
//    รองรับ pagination ในอนาคตโดยไม่ต้องเปลี่ยน signature อีกรอบ
export function getNotesByTopicId(
  topicId: string,
  page = 1,
  limit = 20
): NotesResult {
  const filtered = mockNotes.filter((note) => note.topicId === topicId)
  const start = (page - 1) * limit
  const notes = filtered.slice(start, start + limit)

  return {
    notes,
    total: filtered.length,  // total ทั้งหมดก่อน paginate — ใช้แสดง "12 notes"
  }
}

export function getNoteById(id: string): Note | undefined {
  return mockNotes.find((note) => note.id === id)
}

export function createNote(data: Omit<Note, "id" | "createdAt" | "updatedAt">): Note {
  const newNote: Note = {
    ...data,
    id: `note-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  mockNotes.push(newNote)
  return newNote
}

// ============================================================
// สิ่งที่ต้องแก้ใน caller files (Impact Checklist):
//
// ✅ Direct Impact — แก้แล้ว:
//   → lib/mock/notes.ts (ไฟล์นี้)
//
// ⬜ Indirect Impact — ต้องแก้ต่อ:
//   → hooks/useNotes.ts
//      เปลี่ยน: const notes = data  →  const { notes, total } = data
//
//   → components/NoteList.tsx
//      เปลี่ยน: props: { notes: Note[] }  →  props: { notes: Note[], total: number }
//
// ⬜ Cascading Impact — ตรวจสอบ:
//   → app/topics/[id]/notes/page.tsx
//      ตรวจสอบว่าใช้ data.notes.map() แล้ว (ไม่ใช่ data.map())
//
//   → app/topics/[id]/notes/[noteId]/page.tsx
//      ตรวจสอบว่าไม่ได้ใช้ getNotesByTopicId() โดยตรง
// ============================================================
