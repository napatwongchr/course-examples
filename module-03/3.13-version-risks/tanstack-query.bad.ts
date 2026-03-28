// ============================================================
// ❌ tanstack-query.bad.ts — AI สร้างโค้ดโดยใช้ TanStack Query v4
//    (วิดีโอ 3.13 — ความเสี่ยงจาก Version Mismatch)
//
// ปัญหา: AI training data ใช้ v4 แต่โปรเจกต์ PLA ของเราใช้ v5
//        โค้ดนี้จะ compile error หรือ runtime error ทันทีใน v5
// ============================================================

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getNotesByTopicId, createNote } from "@/lib/mock/notes"
import type { Note } from "@/types/note"

// ❌ v4 Pattern: onSuccess / onError อยู่ใน useQuery options โดยตรง
//    ใน v5 สองตัวนี้ถูกย้ายออกไปแล้ว — จะเกิด TypeScript error
export function useNotes(topicId: string) {
  return useQuery(
    ["notes", topicId],           // ❌ v4: queryKey อยู่เป็น argument แรกแยกต่างหาก
    () => getNotesByTopicId(topicId),  // ❌ v4: queryFn อยู่เป็น argument ที่สอง
    {
      onSuccess: (data) => {      // ❌ ถูกลบออกใน v5 — ใช้ไม่ได้แล้ว
        console.log("โหลดสำเร็จ:", data.length, "notes")
      },
      onError: (error) => {       // ❌ ถูกลบออกใน v5 — ใช้ไม่ได้แล้ว
        console.error("โหลดล้มเหลว:", error)
      },
      staleTime: 1000 * 60,
    }
  )
}

// ❌ v4 Pattern: useMutation รับ mutationFn เป็น argument แรก
//    และ onSuccess/onError อยู่ใน options ของ useMutation
export function useCreateNote() {
  const queryClient = useQueryClient()

  return useMutation(
    (newNote: Omit<Note, "id" | "createdAt" | "updatedAt">) =>
      createNote(newNote),             // ❌ v4: mutationFn เป็น argument แรก
    {
      onSuccess: (data) => {           // ❌ ยังทำงานใน v5 แต่ pattern ต่างกัน
        queryClient.invalidateQueries(["notes", data.topicId])  // ❌ v4 syntax
      },
    }
  )
}
