# Tawan Cleaning — Web Starter

โครงสร้างเริ่มต้นสำหรับ deploy เว็บตะวันคลีนนิ่งใหม่บน Vercel (ยังไม่ผูกโดเมนจริง — ทดสอบ pipeline ก่อน)

## ขั้นตอน

### 1. สร้าง GitHub repo
1. ไปที่ https://github.com/new
2. ตั้งชื่อ repo เช่น `tawan-cleaning-web`
3. เลือก Private (แนะนำ ระหว่างพัฒนา) แล้วกด Create repository
4. หน้าใหม่จะมีปุ่ม "uploading an existing file" — กดแล้วลาก `index.html`, `vercel.json`, `README.md` จากโฟลเดอร์นี้เข้าไป แล้วกด Commit changes

*(หรือถ้าถนัด command line บนเครื่อง Windows ของพี่ แจ้งได้ ผมช่วยเขียนคำสั่ง git ให้)*

### 2. เชื่อม Vercel
1. ไปที่ https://vercel.com/new
2. Login/Sign up ด้วยบัญชี GitHub เดียวกัน (ฟรี ไม่ต้องใส่บัตร)
3. กด "Import" ที่ repo `tawan-cleaning-web`
4. Framework Preset เลือก "Other" (เพราะเป็น static HTML ธรรมดา)
5. กด Deploy — รอประมาณ 30 วินาที

### 3. ผลลัพธ์
จะได้ URL ชั่วคราวรูปแบบ `tawan-cleaning-web.vercel.app` — เปิดดูควรเห็นหน้า placeholder "deploy pipeline ทดสอบสำเร็จ ✅"

### 4. ขั้นถัดไป (ยังไม่ทำตอนนี้)
- แทนที่ `index.html` ด้วยเนื้อหาเว็บจริงจาก web-concept-builder agent
- ฝัง GA4 + Google Ads conversion tag
- ต่อฟอร์ม lead เข้า n8n webhook
- ค่อยผูกโดเมน tawancleaning.com ทีหลังสุด (ตอนทุกอย่างทดสอบผ่านแล้ว)

## หมายเหตุ
ทุกครั้งที่ push โค้ดใหม่เข้า GitHub repo นี้ Vercel จะ auto-deploy ให้อัตโนมัติ — เหมาะกับ workflow ที่จะต่อ n8n manifest node เข้ามาทีหลัง (commit เข้า repo → เว็บอัปเดตเอง)
