# Frontend — Smarthome App (React + Vite + TypeScript)

Aplikasi frontend dashboard untuk Smarthome App, dibangun dengan React, Vite, dan TypeScript. Desain antarmuka dirancang dengan estetika premium gelap (glassmorphic / dark mode) menggunakan Vanilla CSS.

## 🛠️ Stack Teknologi

*   **React**: Library UI modern.
*   **Vite**: Build tool cepat untuk frontend modern.
*   **TypeScript**: Keamanan tipe statis untuk kode JavaScript.
*   **React Router**: Navigasi dan routing aplikasi.
*   **Axios**: Klien HTTP untuk interaksi dengan API Backend.
*   **Vanilla CSS**: Kustomisasi visual premium (glassmorphic, glow-pill, dll).

## 📂 Struktur Folder

*   `src/components/`: Komponen UI yang dapat digunakan kembali.
*   `src/pages/`: Halaman utama aplikasi.
    *   `LoginPage.tsx`: Halaman login dengan kartu glassmorphic.
    *   `DashboardPage.tsx`: Halaman dashboard dengan informasi sistem, data sensor mockup, dan tombol pengujian integrasi backend.
*   `src/layouts/`: Tata letak halaman.
    *   `MainLayout.tsx`: Tata letak dashboard utama dengan sidebar navigasi glassmorphic.
*   `src/services/`: Berisi API service client (`api.ts`).
*   `src/index.css`: Pendefinisian token desain (font Google Fonts, radial gradients, glass-panel, custom inputs & buttons).

## 🚀 Memulai Pengembangan

### 1. Masuk ke Folder Frontend
```bash
cd frontend
```

### 2. Instalasi Dependensi Node.js
Pastikan Anda sudah menginstal Node.js versi 18 ke atas:
```bash
npm install
```

### 3. Konfigurasi Environment (Opsional)
Salin `.env.example` menjadi `.env` di folder `frontend/` jika Anda ingin mengubah base URL API backend:
```bash
cp .env.example .env
```
Isi default `.env`:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### 4. Jalankan Server Pengembangan
Jalankan server Vite lokal:
```bash
npm run dev
```
Setelah berjalan, buka browser pada alamat:
*   [http://localhost:5173/](http://localhost:5173/)

### 5. Detail Akun Login Demo
Gunakan kredensial berikut pada halaman `/login`:
*   **Username**: `admin`
*   **Password**: `admin123`
