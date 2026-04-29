# Error Input สำหรับ Test — Scene 5

> **วิธีใช้:** Copy เนื้อหาด้านล่างไปวางใน New Conversation ของ Project "Help me debug"
> หรือแนบไฟล์นี้ให้ Claude โดยตรง

---

## Input (copy ข้างล่างนี้ แล้ว Paste ใน Claude)

```
ช่วยวิเคราะห์ Error นี้ให้หน่อยครับ

**Environment:** Next.js 14, TypeScript (Development mode)

**Error Message:**
TypeError: Cannot read properties of undefined (reading 'map')
    at TaskList (./components/TaskList.tsx:24:28)
    at renderWithHooks (.next/server/chunks/main.js:8823:18)
    at updateFunctionComponent (.next/server/chunks/main.js:9193:20)
    at updateElement (.next/server/chunks/main.js:11305:24)

**โค้ดที่เกิด Error (TaskList.tsx บรรทัด 20-30):**

const TaskList = ({ projectId }: { projectId: string }) => {
  const [tasks, setTasks] = useState()

  useEffect(() => {
    fetch(`/api/projects/${projectId}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
  }, [])

  return (
    <div>
      {tasks.map(task => (   // ← บรรทัด 24: Error เกิดตรงนี้
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}

**สิ่งที่เกิดก่อน Error:**
เปิดหน้า /projects/[id] → หน้าโหลดมาแล้วก็ Error ทันที
ยังไม่ได้คลิกอะไร
```

---

## เกณฑ์ตรวจสอบผลลัพธ์ (Criteria Check)

หลังรัน Workflow ให้ตรวจว่า:

- [ ] ระบุสาเหตุได้อย่างน้อย 2 ข้อ
  - `useState()` ไม่มี initial value → undefined ตั้งแต่แรก
  - `useEffect` ทำงาน async → render ครั้งแรกก่อนที่จะได้ข้อมูล
- [ ] วิธีแก้มีขั้นตอน step-by-step
  - Solution 1: `useState<ITask[]>([])` ใส่ initial value เป็น empty array
  - Solution 2: เพิ่ม loading state + conditional render
- [ ] สรุปสาเหตุหลักชัดเจน
- [ ] บอก trade-off ถ้ามีหลาย solution
- [ ] ย้ำ Checkpoint ว่า Developer เลือกวิธีแก้เอง
