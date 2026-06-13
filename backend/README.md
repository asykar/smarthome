# Backend — Smarthome App (FastAPI)

Layanan backend untuk aplikasi Smarthome berbasis Python FastAPI. Backend bertindak sebagai API server untuk dashboard frontend dan berinteraksi dengan perangkat IoT via MQTT.

## 🛠️ Stack Teknologi

*   **FastAPI**: Framework web berkinerja tinggi.
*   **SQLAlchemy**: ORM untuk database SQLite.
*   **Paho MQTT**: Klien komunikasi MQTT.
*   **APScheduler**: Scheduler otomatisasi jadwal perangkat.

## 📂 Struktur Folder

*   `app/main.py`: Entrypoint aplikasi FastAPI.
*   `app/config.py`: Pengaturan environment dan konfigurasi aplikasi.
*   `app/database.py`: Inisialisasi koneksi database SQLAlchemy.
*   `app/models/`: Model database SQLAlchemy.
*   `app/schemas/`: Schema request/response Pydantic.
*   `app/routes/`: Endpoint API (Auth, Devices, Rooms, dsb).
*   `app/services/`: Logika bisnis.
*   `app/mqtt/`: Integrasi MQTT handler.
*   `app/automations/`: Scheduler otomatisasi jadwal.

## 🚀 Memulai Pengembangan

1. Buat virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # venv\Scripts\activate di Windows
   ```
2. Install dependensi:
   ```bash
   pip install -r requirements.txt
   ```
3. Jalankan server lokal:
   ```bash
   uvicorn app.main:app --reload
   ```
