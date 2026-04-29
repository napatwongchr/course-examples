# Coverage Report ตัวอย่าง — PLA Project

> **ที่มา:** ผลลัพธ์จากการรัน `npx vitest run --coverage` บน PLA Project
> ใช้เป็น Input สำหรับ Prompt ใน Scene 2

---

## Coverage Report (Vitest / Istanbul)

```
 COVERAGE SUMMARY

 File                                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Lines
 -------------------------------------------|---------|----------|---------|---------|----------------
 All files                                  |   16.8  |    8.1   |   20.0  |   16.8  |
  lib/                                      |         |          |         |         |
   sm2.ts                                   |  100.0  |  100.0   |  100.0  |  100.0  |
   quiz-generator.ts                        |    0.0  |    0.0   |    0.0  |    0.0  | 1-210
   validators.ts                            |  100.0  |  100.0   |  100.0  |  100.0  |
   utils.ts                                 |    0.0  |    0.0   |    0.0  |    0.0  | 1-6
  store/                                    |         |          |         |         |
   mock-store.ts                            |   31.2  |    0.0   |   35.7  |   31.2  | 18-25,31-48,54-71,77-94
  services/                                 |         |          |         |         |
   quiz.service.ts                          |    0.0  |    0.0   |    0.0  |    0.0  | 1-75
   topic.service.ts                         |    0.0  |    0.0   |    0.0  |    0.0  | 1-28
   note.service.ts                          |    0.0  |    0.0   |    0.0  |    0.0  | 1-12
   review.service.ts                        |    0.0  |    0.0   |    0.0  |    0.0  | 1-24
   study-session.service.ts                 |    0.0  |    0.0   |    0.0  |    0.0  | 1-8
  app/api/topics/                           |         |          |         |         |
   route.ts                                 |    0.0  |    0.0   |    0.0  |    0.0  | 1-28
  app/api/topics/[id]/                      |         |          |         |         |
   route.ts                                 |    0.0  |    0.0   |    0.0  |    0.0  | 1-42
  app/api/quiz/generate/                    |         |          |         |         |
   route.ts                                 |    0.0  |    0.0   |    0.0  |    0.0  | 1-22
  app/api/quiz/[id]/submit/                 |         |          |         |         |
   route.ts                                 |    0.0  |    0.0   |    0.0  |    0.0  | 1-36
  components/                               |         |          |         |         |
   topic-card.tsx                           |    0.0  |    0.0   |    0.0  |    0.0  | 1-66
   topic-dialog.tsx                         |    0.0  |    0.0   |    0.0  |    0.0  | 1-72
   quiz-player.tsx                          |    0.0  |    0.0   |    0.0  |    0.0  | 1-48

 SUMMARY
 Total Statements:    16.8%
 Total Branches:       8.1%
 Total Functions:     20.0%
 Total Lines:         16.8%
```

---

## Context เพิ่มเติม

- **Project:** PLA (Personal Learning Assistant)
- **Framework:** Next.js (App Router), TypeScript
- **Test Runner:** Vitest
- **เป้าหมาย Coverage:** 80% ก่อน Deploy to Production (Phase 2)
- **Deadline:** 1 สัปดาห์
- **Files ที่ครอบคลุมแล้ว:** `lib/sm2.ts` (unit test), `lib/validators.ts` (unit test)
- **Files ที่ยังไม่ครอบคลุม:** ทุก service, ทุก API route, ทุก component
