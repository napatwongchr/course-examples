// ============================================================
// 📄 notes.before.ts — โค้ดก่อน Refactor (วิดีโอ 3.19)
//
// Scenario: ต้องการ refactor getNotesByTopicId() ให้รองรับ
//           pagination — แต่ก่อนเปลี่ยนต้องวิเคราะห์ impact ก่อน
//
// Return type เดิม: Note[]
// ============================================================

export interface Note {
  id: string
  topicId: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
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

// ⚠️ Function ที่กำลังจะ Refactor
// Return type เดิม: Note[] (array ธรรมดา)
// ผู้เรียกทุกที่ใช้ได้เลย: notes.map(...), notes.length, notes[0]
export function getNotesByTopicId(topicId: string): Note[] {
  return mockNotes.filter((note) => note.topicId === topicId)
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
// ไฟล์ที่จะ Direct Impact หลัง Refactor:
//   → lib/mock/notes.ts (ไฟล์นี้) — เปลี่ยน return type
//
// ไฟล์ที่จะ Indirect Impact:
//   → hooks/useNotes.ts — TanStack Query data จะเป็น { notes, total }
//                         ต้องเปลี่ยนจาก data.map() เป็น data.notes.map()
//   → components/NoteList.tsx — รับ notes: Note[] ต้องปรับ prop type
//
// ไฟล์ที่จะ Cascading Impact:
//   → app/topics/[id]/notes/page.tsx — ใช้ useNotes hook
//   → app/topics/[id]/notes/[noteId]/page.tsx — อาจพังถ้าใช้ data โดยตรง
// ============================================================
