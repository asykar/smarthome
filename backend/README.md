# Backend — Smarthome App (FastAPI)

Layanan backend untuk aplikasi Smarthome berbasis Python FastAPI. Backend bertindak sebagai API server untuk dashboard frontend dan berinteraksi dengan perangkat IoT via MQTT.

## 🛠️ Stack Teknologi

*   **FastAPI**: Framework web berkinerja tinggi.
*   **SQLAlchemy**: ORM untuk database SQLite.
*   **Paho MQTT**: Klien komunikasi MQTT.
*   **APScheduler**: Scheduler otomatisasi jadwal perangkat.
*   **Pydantic & python-dotenv**: Pengelolaan schema dan konfigurasi lingkungan.

## 📂 Struktur Folder

*   `app/main.py`: Entrypoint aplikasi FastAPI, konfigurasi CORS, dan registrasi router.
*   `app/config.py`: Pengaturan environment dan konfigurasi aplikasi dengan dotenv.
*   `app/database.py`: Inisialisasi koneksi database SQLAlchemy.
*   `app/models/`: Model database SQLAlchemy.
*   `app/schemas/`: Schema request/response Pydantic.
*   `app/routes/`: Endpoint API (Auth, Devices, Rooms, dsb).
    *   `health.py`: Endpoint `/health` untuk memeriksa kesehatan server.
*   `app/services/`: Logika bisnis.
*   `app/mqtt/`: Integrasi MQTT handler.
*   `app/automations/`: Scheduler otomatisasi jadwal.

## 🚀 Memulai Pengembangan

### 1. Buat Virtual Environment Python
Pastikan Anda berada di direktori `backend/`:
```bash
cd backend
python -m venv .venv
```

### 2. Aktifkan Virtual Environment
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

### 4. Konfigurasi Environment Variable
Salin berkas `.env.example` menjadi `.env` pada folder root proyek atau folder `backend/`, lalu sesuaikan nilainya:
```bash
# Di Windows PowerShell / CMD
copy .env.example .env

# Di Linux / macOS
cp .env.example .env
```

### 5. Inisialisasi Database
Jalankan script inisialisasi untuk membuat folder database dan file SQLite database:
```bash
python app/scripts/init_db.py
```

### 6. Jalankan Server FastAPI
Jalankan server menggunakan Uvicorn di port 8000:
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 7. Verifikasi Endpoint
Buka browser atau gunakan HTTP client (curl/postman) untuk memverifikasi server berjalan:
*   URL Utama: [http://localhost:8000/](http://localhost:8000/)
*   Health Check: [http://localhost:8000/api/health](http://localhost:8000/api/health)
    - Response sukses:
      ```json
      {
        "status": "ok",
        "service": "smarthome-backend",
        "version": "0.1.0"
      }
      ```
*   Interactive API Docs (Swagger UI): [http://localhost:8000/docs](http://localhost:8000/docs)
