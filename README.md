# Aplikasi Smarthome Raspberry Pi

Aplikasi web Smarthome lokal berbasis Raspberry Pi untuk mengontrol dan memantau perangkat rumah pintar (lampu, relay, sensor suhu, kelembapan, gerakan, dll.) dengan prinsip **local-first** (tetap berjalan tanpa koneksi internet).

## 🛠️ Tech Stack Utama

*   **Backend:** Python FastAPI, Uvicorn, SQLAlchemy, Pydantic, SQLite, Paho MQTT, APScheduler.
*   **Frontend:** React, Vite, TypeScript, React Router, TailwindCSS/Vanilla CSS.
*   **Database:** SQLite (lokal).
*   **Protokol Komunikasi:** MQTT (Mosquitto Broker) untuk perangkat IoT (ESP32, dsb).
*   **Deployment:** Native (Systemd service) dengan Nginx sebagai reverse proxy.

## 📂 Struktur Repositori

```text
smarthome-app/
├── backend/            # Aplikasi Backend (FastAPI)
│   ├── app/            # Kode utama backend
│   └── ...
├── frontend/           # Aplikasi Frontend (React + Vite + TS)
│   └── ...
├── deployment/         # Konfigurasi deployment Nginx & Systemd
│   └── ...
└── docs/               # Dokumentasi tambahan proyek
```

## 🚀 Memulai Pengembangan

### Persyaratan Sistem
*   Python 3.10+
*   Node.js 18+
*   Mosquitto MQTT Broker (untuk simulasi/koneksi IoT)

### Setup Awal
1. Salin `.env.example` menjadi `.env` dan sesuaikan konfigurasinya.
2. Ikuti instruksi detail di `backend/README.md` dan `frontend/README.md`.
