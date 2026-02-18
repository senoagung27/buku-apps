PRODUCT REQUIREMENTS DOCUMENT (PRD)
Product Name: My Shopping List (Personal PWA)

Version: 1.0
Type: Personal Productivity Tool

1. Product Vision

A lightweight, offline-first shopping list app yang:

Super cepat dipakai

Tidak butuh login

Tidak ada backend

Tidak ada tracking

Bisa install di HP seperti native app

Goal:
📱 Ganti Notes app jadi lebih terstruktur dan enak dipakai.

2. Core Principles

Karena ini personal tool, prinsipnya:

Instant input (no friction)

Offline 100%

Minimal UI

No complexity

Maintainable codebase

3. Core Features (MVP Only)
1️⃣ Quick Add via Text

User bisa input:

Beras, Minyak, Gula, Telur


System:

Auto split

Generate item card

Save otomatis

2️⃣ Shopping Card UI
4

Card Structure:

Icon kategori

Nama item

Checkbox

Delete button kecil

Behavior:

Tap → checklist

Swipe left → delete (optional enhancement)

3️⃣ Category System (Simple)

Default only:

🥕 Makanan

🧃 Minuman

🏠 Rumah Tangga

💊 Kesehatan

📦 Lainnya

Tidak perlu CRUD kategori (biar simpel).

4️⃣ Auto Save

Tidak ada tombol save

Semua perubahan langsung persist

5️⃣ Offline First

IndexedDB

Service Worker

Installable PWA

4. Non-Goals (Explicitly Removed)

Karena ini personal tool, TIDAK perlu:

❌ Login

❌ Cloud sync

❌ Sharing

❌ Multi-user

❌ Analytics

❌ Backend

❌ Monetization

5. Technical Stack (Optimized for Simplicity)

Vue 3 (Composition API)

Pinia

TailwindCSS

Vite

vite-plugin-pwa

idb (IndexedDB wrapper)

No router needed (single page only).

6. Simplified Architecture
App.vue
   ↓
ShoppingInput
ShoppingList
   ↓
Pinia Store
   ↓
IndexedDB

7. Data Model
{
  id: string,
  name: string,
  category: string,
  isDone: boolean,
  createdAt: number
}

8. UX Flow
Open App
 ↓
Type Item
 ↓
Press Enter
 ↓
Item muncul
 ↓
Checklist saat belanja
 ↓
Hapus jika sudah tidak perlu


Tidak ada page navigation.

9. Optional Smart Feature (Still Personal)

Kalau mau sedikit cerdas:

Input:

2x telur, 1kg beras


Auto parse quantity.

Tapi ini optional, bukan MVP.

10. Performance Requirements

First load < 2 sec

No blocking UI

No external API

Bundle size < 200kb (ideal)

11. Maintenance Strategy

Karena ini personal project:

No CI/CD complex

Deploy ke Vercel / Netlify

Auto deploy from GitHub

Backup manual export JSON (optional feature)

12. Development Timeline
Task	Estimasi
Setup Project	1 jam
Core UI	1 hari
Store & Persistence	1 hari
PWA Setup	1 hari
Polish	1 hari

Total realistic: 3–4 hari santai.

13. Future Optional Improvements

Kalau nanti kepikiran:

Dark mode

Weekly reset button

Export / Import JSON

Template belanja rutin

Statistics (berapa sering beli)

14. Final Recommendation (Sebagai Engineer)

Karena kamu backend-heavy dan biasa mikir arsitektur besar:

⚠️ Jangan over-engineer ini.

Keep it:

Single page

No router

No abstraction berlebihan

Simple store

Simple composable

Ini tool buat bantu hidup kamu, bukan buat dijadikan enterprise 😄