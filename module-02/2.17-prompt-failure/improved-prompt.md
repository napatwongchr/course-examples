# Improved Authentication PRD Prompt

## Role & Context

คุณคือ Senior Product Manager ที่มีประสบการณ์ด้าน B2B SaaS
PRD นี้จะให้ทีม Engineering (5 คน) ใช้เป็น spec สำหรับ Sprint planning
ผู้อ่านเป็น Developer ระดับ mid-senior จึงเขียนได้ technical

## Background

เราเป็น Startup พัฒนา Platform จัดการธุรกิจ SME แบบ Multi-tenant SaaS
(mention เพื่อบริบทเท่านั้น — ไม่ต้องอธิบาย features อื่นใน PRD นี้)

ระบบ Authentication เดิมมีปัญหา:
- ไม่รองรับ MFA ทำให้ลูกค้าองค์กรไม่กล้าใช้
- ไม่มี SSO ต้องล็อกอินแยกทุก tenant
- Session management ไม่ปลอดภัย (ไม่มี refresh token rotation)

## User Roles ที่ต้องรองรับ

- **Super Admin** — จัดการ tenants ทั้งหมด
- **Tenant Admin** — จัดการ users ภายใน tenant ตัวเอง
- **End User** — ใช้งาน Platform ทั่วไป

## Authentication Methods ที่ต้องการ

- Email + Password (พร้อม password policy: min 8 chars, 1 uppercase, 1 number)
- MFA via TOTP (Google Authenticator)
- SSO ผ่าน Google Workspace และ Microsoft 365
- Session timeout: 8 ชั่วโมง (idle), refresh token rotation

## Constraints

- Tech stack: Next.js 14 (frontend), Node.js + PostgreSQL (backend)
- ต้องสอดคล้องกับ PDPA
- ต้อง support ทั้ง Web และ Mobile App (React Native)
- ไม่รวม Authorization / RBAC ใน scope นี้

## Output ที่ต้องการ

สร้าง PRD เป็นไฟล์ Markdown ความยาว 2-3 หน้า A4 ประกอบด้วย:

1. **Overview & Goals** — ปัญหาที่แก้ และ success metrics
2. **User Stories** — รูปแบบ "As a [role], I want [action] so that [benefit]" ครอบคลุมทุก role
3. **Functional Requirements** — แยกตาม auth method
4. **Non-functional Requirements** — Security, Performance, Availability
5. **Out of Scope** — ระบุให้ชัดเจน
