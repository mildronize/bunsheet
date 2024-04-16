# Cloud-Native Personal Budget App (PWA on Mobile)
(Server Cost อยู่ที่ < 1$ ต่อเดือน)

## Cloud
- Azure Container App สำหรับ Deploy Next.js
- Azure Functions สำหรับจัดการ Message ใน Queue
- Google Sheet สำหรับเป็น Database
- Azure Storage Queue ใช้ Queue ในการป้องกัน Quota Limit ของ Google Sheet API
- Azure Storage Table ใช้เป็น Cache Table สำหรับ Google Sheet

## App
- Next.js App Router
- Authentication & Authorization:
  - ใช้ Azure Container App Authentication แทน แล้ว Lock Authorize ผ่าน Next.js Middleware
  - เหตุผลที่ไม่ใช่ NextAuth เพราะขี้เกียจอัพเดท Security Patch เอง 555+ และไม่ต้องเขียนเองเพราะ Azure ทำให้หมด
- Component UI
  - Material UI มี Component ที่ซับซ้อนอย่าง Autocomplete และ DateTime Picker ด้วย
- Data Provider
  - React Query (Cache on LocalStorage)
- Form
  - React Hook Form
- API
  - Connect กับ Azure Storage Queue สำหรับ Add/Edit Transaction
  - Connect กับ Azure Storage Table สำหรับ Materialize View (Cache Data) จาก Google Sheet

## Azure Functions
- (StorageQueue Trigger) มี Function จัดการ Queue ที่เข้ามา สำหรับ Add/Edit Transaction แล้ว Update ที่ Google Sheet และ Cache Table ให้ (Azure Storage Table)
- (Timer Trigger) มี Function จัดการ Cache Table (Azure Storage Table) เพิ่ม Invalidate Cache Data เมื่อ Data จาก Google Sheet เปลี่ยน

## Deploy
- Github Actions
- Github Packages (for Docker Image Registry)

สถานะโปรเจ็คตอนนี้ Stable แล้ว ผมใช้งานอยู่ แต่ยังไม่พร้อมสำหรับใช้สอนเท่าไหร่ อาจจะต้องรอ Refactor อีกสักหน่อย

ยังขาด Feature สำคัญอย่างตัวคุม Cost ให้ไม่ให้บานปลาย

Source Code ใครอยากเอาไปส่องก่อนก็ได้คับ สามารถเอาไป Deploy เองได้เลย

## Setup Google Sheet Cred
https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
