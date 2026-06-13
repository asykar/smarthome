# Panduan Setup Development Lokal

Dokumen ini berisi panduan lengkap untuk memasang dan menjalankan aplikasi Smarthome Raspberry Pi di komputer pengembangan (lokal) Anda.

---

## 📋 Persyaratan Perangkat Lunak (Software Requirements)

Sebelum memulai, pastikan Anda telah memasang perangkat lunak berikut di komputer Anda:

*   **Git**: Untuk melakukan clone repositori.
*   **Python 3.10+** (disarankan 3.11+): Interpreter untuk backend FastAPI.
*   **Node.js 18+** (disarankan 20+): Runtime untuk frontend React + Vite.
*   **npm** atau **bun**: Package manager untuk dependensi frontend.
*   **VS Code / Antigravity IDE**: Editor kode yang disarankan.
*   **SQLite Viewer (Opsional)**: Ekstensi editor atau aplikasi mandiri (misal: DB Browser for SQLite) untuk melihat isi database secara visual.

---

## 🚀 Langkah-Langkah Setup Proyek

### 1. Kloning Repositori
Buka terminal Anda dan jalankan perintah berikut untuk mengunduh kode proyek:
```bash
git clone https://github.com/asykar/smarthome.git
cd smarthome
```

### 2. Setup Lingkungan Backend (FastAPI)

1.  Masuk ke direktori `backend/`:
    ```bash
    cd backend
    ```
2.  Buat virtual environment Python terisolasi:
    ```bash
    python -m venv .venv
    ```
3.  Aktifkan virtual environment tersebut:
    *   **Windows (PowerShell):**
        ```powershell
        .venv\Scripts\Activate.ps1
        ```
    *   **Windows (CMD):**
        ```cmd
        .venv\Scripts\activate.bat
        ```
    *   **Linux / macOS:**
        ```bash
        source .venv/bin/activate
        ```
4.  Instal seluruh dependensi backend yang dibutuhkan:
    ```bash
    pip install -r requirements.txt
    ```

### 3. Setup Konfigurasi Backend (`.env`)

1.  Salin file `.env.example` menjadi `.env` di dalam folder `backend/`:
    ```bash
    # Windows
    copy .env.example .env

    # Linux / macOS
    cp .env.example .env
    ```
2.  Buka file `.env` yang baru dibuat dan sesuaikan variabel konfigurasi jika diperlukan. Nilai bawaan default sudah aman digunakan untuk development lokal.

### 4. Inisialisasi Database SQLite

Jalankan script inisialisasi skema database awal agar folder database dan file SQLite otomatis terbuat:
```bash
python app/scripts/init_db.py
```
*Tindakan ini akan membuat folder `backend/data/` dan file database baru `smarthome.db`.*

### 5. Setup Lingkungan Frontend (React + Vite + TS)

1.  Buka terminal baru, lalu masuk ke direktori `frontend/`:
    ```bash
    cd frontend
    ```
2.  Instal seluruh paket dependensi frontend:
    ```bash
    npm install
    ```
3.  Salin file `.env.example` menjadi `.env` di dalam folder `frontend/`:
    ```bash
    # Windows
    copy .env.example .env

    # Linux / macOS
    cp .env.example .env
    ```
    *Isi default `.env` mengarah ke URL API lokal: `VITE_API_BASE_URL=http://localhost:8000/api`.*

---

## 🔌 Cara Menjalankan Aplikasi

### Menjalankan Backend
Di terminal backend (dalam keadaan virtual environment `.venv` aktif), jalankan server Uvicorn:
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
Server backend akan berjalan di alamat: [http://localhost:8000](http://localhost:8000)

### Menjalankan Frontend
Di terminal frontend, jalankan server pengembangan Vite:
```bash
npm run dev
```
Server frontend akan berjalan di alamat: [http://localhost:5173](http://localhost:5173) (atau port lain seperti `5174` bila port 5173 sedang dipakai).

---

## 🔍 Cara Pengujian Integrasi

### 1. Test Endpoint Health Check Backend
Untuk memverifikasi backend, database, dan modul lainnya dalam kondisi sehat, buka browser atau gunakan curl untuk mengakses:
*   [http://localhost:8000/api/health](http://localhost:8000/api/health)

Respon sukses yang diharapkan:
```json
{
  "status": "ok",
  "service": "smarthome-backend",
  "version": "0.1.0",
  "checks": {
    "backend": "ok",
    "database": "ok",
    "mqtt": "not_configured"
  }
}
```

### 2. Uji Integrasi dari Frontend Dashboard
1.  Buka dashboard frontend di browser Anda (misalnya [http://localhost:5173](http://localhost:5173)).
2.  Masuk ke halaman login dengan kredensial demo:
    *   **Username**: `admin`
    *   **Password**: `admin123`
3.  Klik tombol **🔌 Test Koneksi** pada panel pengujian API. Banner status **API Connected** berwarna hijau dengan rincian subsistem (Backend, Database, MQTT) akan muncul jika koneksi berhasil.

---

## 🛠️ Troubleshooting (Pemecahan Masalah)

### 1. Peringatan Error Import `pydantic_settings` atau `dotenv` di Editor/IDE
*   **Penyebab:** Editor Anda menggunakan Python global komputer Anda (bukan dari `.venv` lokal proyek).
*   **Solusi:** Ubah interpreter Python editor Anda untuk menggunakan Python di `.venv`. 
    *   *Di VS Code/Antigravity:* Tekan `Ctrl + Shift + P` -> pilih **`Python: Select Interpreter`** -> arahkan ke `backend/.venv/Scripts/python.exe`.

### 2. Error Bind Port `[Errno 10048] address already in use` saat Menjalankan Uvicorn
*   **Penyebab:** Ada server backend uvicorn lain atau proses lain yang masih berjalan dan mengunci port 8000.
*   **Solusi:**
    *   **Windows (PowerShell):** Matikan proses pengunci port 8000 dengan:
        ```powershell
        Stop-Process -Id (Get-NetTCPConnection -LocalPort 8000).OwningProcess -Force
        ```
    *   **Linux / macOS:** Jalankan perintah `kill $(lsof -t -i:8000)` di terminal Anda.

### 3. Port 5173 Sedang Digunakan oleh Aplikasi Lain (Misalnya: SSO/Bun Dev)
*   **Penyebab:** Port default Vite `5173` sedang dikunci oleh program lain yang aktif.
*   **Solusi:**
    *   Vite akan otomatis berpindah port ke `5174`.
    *   Jika Anda ingin membebaskan port 5173 tersebut, jalankan perintah berikut:
        *   *Windows (PowerShell):*
            ```powershell
            Stop-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess -Force
            ```
        *   *Jika dijalankan via Bun di terminal:* Matikan dengan menekan tombol kombinasi `Ctrl + C` pada terminal tersebut.
