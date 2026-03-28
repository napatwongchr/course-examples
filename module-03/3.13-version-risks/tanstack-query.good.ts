// ============================================================
// ✅ tanstack-query.good.ts — โค้ดที่ถูกต้องสำหรับ TanStack Query v5
//    (วิดีโอ 3.13 — วิธีแก้ปัญหา Version Mismatch)
//
// แก้ไข: ใช้ Context7 MCP หรืออ้างอิง docs v5 โดยตรง
//        เพื่อให้ได้ syntax ที่ถูกต้องตาม version ที่โปรเจกต์ใช้จริง
// ============================================================

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getNotesByTopicId, createNote } from "@/lib/mock/notes"
import type { Note } from "@/types/note"

// ✅ v5 Pattern: queryKey และ queryFn รวมอยู่ใน object เดียว
//    ไม่มี onSuccess/onError ใน useQuery — ใช้ useEffect หรือ callbacks แทน
export function useNotes(topicId: string) {
  return useQuery({
    queryKey: ["notes", topicId],          // ✅ v5: object-based API
    queryFn: () => getNotesByTopicId(topicId),
    staleTime: 1000 * 60,
  })
}

// ✅ การจัดการ side-effect หลังโหลดสำเร็จ — ใช้ useEffect แทน onSuccess
// useEffect(() => {
//   if (data) console.log("โหลดสำเร็จ:", data.length, "notes")
// }, [data])

// ✅ v5 Pattern: useMutation ใช้ object-based API เช่นเดียวกัน
export function useCreateNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newNote: Omit<Note, "id" | "createdAt" | "updatedAt">) =>
      createNote(newNote),                 // ✅ mutationFn อยู่ใน object
    onSuccess: (data) => {
      queryClient.invalidateQueries({      // ✅ v5: invalidateQueries รับ object
        queryKey: ["notes", data.topicId],
      })
    },
  })
}

// ============================================================
// สรุปความแตกต่าง v4 → v5
// ─────────────────────────────────────────────────────────
// v4: useQuery(queryKey, queryFn, options)   ← 3 arguments
// v5: useQuery({ queryKey, queryFn, ...options }) ← 1 object
//
// v4: useMutation(mutationFn, options)
// v5: useMutation({ mutationFn, ...options })
//
// v4: queryClient.invalidateQueries(queryKey)
// v5: queryClient.invalidateQueries({ queryKey })
//
// v4: onSuccess/onError ใน useQuery options
// v5: ถูกลบออก — ใช้ useEffect หรือ callbacks ใน component แทน
// ============================================================
