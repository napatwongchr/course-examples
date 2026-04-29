# Code Sample สำหรับ Test — Scene 5

> **วิธีใช้:** แนบไฟล์นี้ใน New Conversation ของ Project "Code review assistant"
> พร้อมแนบ `02-code-review-convention.md` ไปด้วย

---

## วิธีส่ง Input ใน Claude

```
ช่วย Review โค้ดนี้ตาม Convention ที่แนบมาด้วยครับ
```

แนบ 2 ไฟล์:
1. `02-code-review-convention.md` (Convention)
2. `04-test-code-sample.md` (ไฟล์นี้)

---

## Code Diff — PR #47: Add AI Task Planner feature

**PR Description:** เพิ่ม Feature ที่ให้ AI แตก Task จาก PRD ผ่าน Claude API

---

### `app/api/projects/[id]/plan/route.ts` (New File)

```typescript
import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json()
  const prd = body.prd
  
  const message = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: `แตก Task จาก PRD นี้: ${prd}`
      }
    ]
  })

  const result = message.content[0]
  
  return NextResponse.json({ tasks: result.text })
}
```

---

### `components/TaskPlanner.tsx` (New File)

```typescript
import { useState } from 'react'

export default function TaskPlanner({ projectId }) {
  const [prd, setPrd] = useState('')
  const [tasks, setTasks] = useState(null)
  const [loading, setLoading] = useState(false)

  const handlePlan = async () => {
    setLoading(true)
    
    const res = await fetch(`/api/projects/${projectId}/plan`, {
      method: 'POST',
      body: JSON.stringify({ prd: prd }),
      headers: { 'Content-Type': 'application/json' }
    })
    
    const data = await res.json()
    setTasks(data.tasks)
    setLoading(false)
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>AI Task Planner</h2>
      <textarea 
        value={prd}
        onChange={(e) => setPrd(e.target.value)}
        placeholder="วาง PRD ที่นี่..."
        style={{ width: '100%', height: '200px' }}
      />
      <button onClick={handlePlan} disabled={loading}>
        {loading ? 'กำลังวิเคราะห์...' : 'สร้าง Task List'}
      </button>
      {tasks && (
        <div>
          <h3>Task List</h3>
          <pre>{tasks}</pre>
        </div>
      )}
    </div>
  )
}
```

---

### `utils/parse-tasks.ts` (New File)

```typescript
export function parseTasks(aiResponse: string) {
  const lines = aiResponse.split('\n')
  const tasks: any[] = []
  
  lines.forEach(line => {
    if (line.startsWith('- ') || line.startsWith('* ')) {
      tasks.push({
        title: line.substring(2),
        effort: 3,
        status: 'todo'
      })
    }
  })
  
  return tasks
}
```

---

## เกณฑ์ตรวจสอบผลลัพธ์ (Criteria Check)

หลังรัน Workflow ให้ตรวจว่า:

- [ ] มี Critical items (ควรพบอย่างน้อย 3 จุด)
  - ไม่มี input validation บน `prd`
  - ไม่มี try/catch ใน API route
  - ใช้ `any` type ใน `parseTasks`
- [ ] มี Warning items
  - `projectId` prop ไม่มี TypeScript type
  - ใช้ inline style แทน Tailwind
- [ ] มี Suggestion items
  - ชื่อ `result.text` อาจ cast ผิด type
- [ ] ทุก item ระบุ บรรทัดได้ชัด
- [ ] มี Suggestion แก้ไขที่ทำได้เลย
- [ ] สรุปท้ายเป็น Needs Changes
