# Product Requirement Document

# Web Aplikasi Smarthome Lokal Berbasis Raspberry Pi

## 1. Ringkasan Produk

Aplikasi ini adalah web aplikasi smarthome berbasis lokal yang berjalan di Raspberry Pi 4. Aplikasi digunakan untuk mengontrol dan memantau perangkat rumah seperti lampu, relay, sensor suhu, sensor kelembapan, sensor gerak, dan perangkat IoT berbasis ESP32 atau perangkat MQTT lain.

Sistem menggunakan prinsip **local-first**, artinya fitur utama tetap berjalan walaupun internet rumah mati. Pengguna tetap dapat membuka dashboard dari jaringan WiFi rumah untuk mengontrol perangkat. Akses dari luar rumah disediakan sebagai fitur tambahan menggunakan Cloudflare Tunnel atau Tailscale agar tidak perlu membuka port router secara langsung.

## 2. Tujuan Produk

Tujuan produk ini adalah membangun sistem smarthome pribadi yang:

1. Berjalan di Raspberry Pi 4 sebagai server lokal.
2. Dapat diakses melalui browser dari HP, laptop, atau tablet.
3. Dapat mengontrol perangkat ON/OFF seperti lampu, kipas, relay, dan saklar.
4. Dapat menerima data sensor seperti suhu, kelembapan, dan gerakan.
5. Dapat menyimpan data perangkat, ruangan, aktivitas, dan jadwal secara lokal.
6. Dapat menjalankan otomatisasi sederhana berdasarkan waktu.
7. Tetap dapat digunakan di jaringan lokal meskipun internet mati.
8. Dapat diakses dari luar rumah secara aman melalui tunnel/VPN.
9. Mudah dikembangkan menjadi sistem yang lebih besar di fase berikutnya.

## 3. Prinsip Desain Produk

Produk ini dikembangkan dengan beberapa prinsip utama.

### 3.1 Local-First

Kontrol perangkat, dashboard, MQTT, dan database utama harus berada di Raspberry Pi. Internet hanya dibutuhkan untuk akses dari luar rumah, bukan untuk fungsi utama.

### 3.2 Aman Secara Default

Sistem tidak boleh langsung membuka port ke internet tanpa perlindungan. Akses remote harus menggunakan Cloudflare Tunnel atau Tailscale. Semua halaman dashboard wajib membutuhkan login.

### 3.3 Sederhana untuk MVP

MVP tidak mengejar semua fitur smarthome besar seperti Home Assistant. MVP fokus pada fitur dasar: ruangan, perangkat, kontrol ON/OFF, MQTT, sensor, log, dan jadwal.

### 3.4 Modular

Backend, frontend, MQTT, database, dan deployment harus dipisahkan secara rapi agar mudah dikembangkan oleh beberapa programmer.

### 3.5 Mudah Dipelihara

Aplikasi harus mudah dijalankan ulang, mudah dibackup, mudah diperbaiki, dan memiliki dokumentasi instalasi yang jelas.

## 4. Target Pengguna

### 4.1 Pemilik Rumah

Pemilik rumah adalah pengguna utama yang memiliki akses penuh untuk mengatur ruangan, perangkat, jadwal, dan pengguna lain.

Kebutuhan utama:

1. Mengontrol perangkat rumah dari HP.
2. Melihat status lampu dan sensor.
3. Membuat jadwal otomatisasi.
4. Mengakses aplikasi dari dalam dan luar rumah.
5. Menjaga data rumah tetap privat.

### 4.2 Anggota Keluarga

Anggota keluarga adalah pengguna biasa yang dapat mengontrol perangkat tertentu sesuai izin.

Kebutuhan utama:

1. Menyalakan atau mematikan lampu.
2. Melihat status perangkat.
3. Menggunakan aplikasi dengan mudah dari HP.
4. Tidak perlu memahami konfigurasi teknis.

### 4.3 Admin Teknis

Admin teknis adalah orang yang memasang sistem, menambahkan perangkat, mengatur MQTT topic, dan melakukan maintenance Raspberry Pi.

Kebutuhan utama:

1. Menambahkan perangkat baru.
2. Mengatur ruangan.
3. Mengatur topic MQTT.
4. Mengecek log.
5. Melakukan backup dan restore.
6. Mengelola service di Raspberry Pi.

## 5. Masalah yang Ingin Diselesaikan

Saat ini banyak perangkat rumah masih dikontrol secara manual. Jika ingin membuat sistem otomatis, pengguna sering bergantung pada aplikasi cloud dari vendor tertentu. Hal ini menimbulkan beberapa masalah:

1. Jika internet mati, perangkat sulit dikontrol.
2. Data aktivitas rumah tersimpan di cloud pihak ketiga.
3. Integrasi antar perangkat berbeda merek sering tidak fleksibel.
4. Pengguna tidak bebas mengatur sistem sesuai kebutuhan sendiri.
5. Aplikasi komersial sering sulit dikustomisasi.

Dengan Raspberry Pi sebagai server lokal, sistem smarthome dapat dibuat lebih privat, fleksibel, dan tetap berjalan di jaringan lokal.

## 6. Ruang Lingkup MVP

MVP adalah versi awal yang harus cukup untuk membuktikan bahwa sistem dapat digunakan sebagai smarthome lokal.

### 6.1 Fitur yang Termasuk MVP

1. Login dan logout pengguna.
2. Role pengguna: admin dan user.
3. Dashboard utama.
4. Manajemen ruangan.
5. Manajemen perangkat.
6. Kontrol perangkat ON/OFF.
7. Integrasi MQTT dengan Mosquitto.
8. Update status perangkat dari MQTT.
9. Penyimpanan data lokal menggunakan SQLite.
10. Riwayat aktivitas perangkat dan user.
11. Monitoring sensor dasar.
12. Jadwal otomatisasi berdasarkan waktu.
13. Deployment native di Raspberry Pi tanpa Docker.
14. Nginx sebagai reverse proxy dan static file server.
15. Akses lokal melalui jaringan WiFi rumah.
16. Akses remote opsional menggunakan Cloudflare Tunnel atau Tailscale.
17. Dokumentasi instalasi dan penggunaan.

### 6.2 Fitur yang Tidak Termasuk MVP

Fitur berikut tidak masuk MVP agar pengembangan tidak terlalu melebar:

1. Aplikasi mobile native Android/iOS.
2. Voice command.
3. AI automation.
4. Integrasi Google Assistant.
5. Integrasi Alexa.
6. Kamera CCTV real-time.
7. Face recognition.
8. Integrasi Zigbee.
9. Integrasi Matter.
10. Integrasi Tuya.
11. Multi-rumah atau multi-lokasi.
12. Pembayaran atau fitur komersial.
13. Docker deployment penuh di Raspberry Pi.
14. Monitoring energi listrik.
15. Notifikasi WhatsApp/Telegram.

Fitur-fitur tersebut dapat dikembangkan setelah MVP stabil.

## 7. Asumsi dan Batasan Teknis

### 7.1 Perangkat Server

Server menggunakan:

```text
Raspberry Pi 4
Raspberry Pi OS Lite 64-bit
microSD 64 GB atau SSD eksternal
RAM sesuai varian Raspberry Pi 4
Koneksi LAN lebih disarankan daripada WiFi
```

### 7.2 Deployment

Untuk MVP, deployment dilakukan secara native tanpa Docker.

Alasan:

1. Lebih ringan untuk Raspberry Pi.
2. Lebih hemat storage.
3. Lebih mudah dipahami saat debugging awal.
4. Cocok untuk microSD 64 GB.
5. Service dapat dikelola langsung dengan systemd.

Docker dapat digunakan di fase berikutnya, terutama jika sudah menggunakan SSD atau ingin deployment yang lebih standar.

### 7.3 Perangkat IoT

Perangkat IoT diasumsikan menggunakan MQTT. Contoh perangkat:

1. ESP32 + relay.
2. ESP32 + sensor suhu.
3. ESP32 + sensor kelembapan.
4. ESP32 + sensor gerak.
5. ESP32 + saklar.

Firmware ESP32 tidak menjadi bagian utama MVP web app, tetapi struktur MQTT harus disiapkan agar mudah diintegrasikan.

### 7.4 Akses Internet

Aplikasi tetap harus berjalan di jaringan lokal walaupun internet mati. Akses dari luar rumah akan berhenti jika internet rumah mati, tetapi akses lokal tetap tersedia.

## 8. Rekomendasi Stack Final

### 8.1 Backend

```text
Python FastAPI
Uvicorn
SQLAlchemy
Pydantic
SQLite
Paho MQTT
APScheduler
JWT/session authentication
```

Alasan:

1. Python cocok untuk Raspberry Pi dan IoT.
2. FastAPI ringan dan modern.
3. Mudah membuat REST API.
4. Mudah diintegrasikan dengan MQTT.
5. Mudah dikembangkan untuk sensor dan automation.

### 8.2 Frontend

```text
React
Vite
TypeScript
React Router
Axios atau Fetch API
```

Alasan:

1. Cocok untuk dashboard modern.
2. Hasil build ringan dan bisa disajikan oleh Nginx.
3. Responsive untuk HP dan desktop.
4. Mudah dipisah dari backend.

### 8.3 Database

```text
SQLite untuk MVP
PostgreSQL untuk fase lanjutan
```

SQLite cukup untuk MVP karena data masih terbatas dan aplikasi berjalan lokal. Namun perlu perhatian khusus pada backup dan pembatasan log agar microSD tidak cepat penuh.

### 8.4 MQTT Broker

```text
Mosquitto MQTT Broker
```

Mosquitto berjalan di Raspberry Pi dan menjadi pusat komunikasi antara backend dan perangkat IoT.

### 8.5 Web Server

```text
Nginx
```

Nginx digunakan untuk:

1. Menyajikan frontend React hasil build.
2. Reverse proxy ke backend FastAPI.
3. Menjadi endpoint lokal aplikasi.

### 8.6 Remote Access

```text
Tailscale untuk akses privat
Cloudflare Tunnel untuk akses domain
```

Rekomendasi:

1. Untuk pribadi/keluarga: Tailscale.
2. Untuk domain publik pribadi: Cloudflare Tunnel.
3. Hindari port forwarding langsung ke Raspberry Pi.

## 9. Arsitektur Sistem

### 9.1 Arsitektur Lokal

```text
HP / Laptop / Tablet
        |
        | Browser
        v
Nginx di Raspberry Pi
        |
        | Static frontend
        v
React Dashboard
        |
        | REST API
        v
FastAPI Backend
        |
        | SQLite
        v
Database Lokal
        |
        | MQTT publish / subscribe
        v
Mosquitto Broker
        |
        v
ESP32 / Relay / Sensor / Perangkat IoT
```

### 9.2 Arsitektur Akses Remote

```text
User dari luar rumah
        |
        v
Tailscale / Cloudflare Tunnel
        |
        v
Raspberry Pi di rumah
        |
        v
Nginx
        |
        v
Frontend + Backend
        |
        v
MQTT + Perangkat Rumah
```

### 9.3 Prinsip Komunikasi Perangkat

Backend tidak langsung mengontrol GPIO perangkat rumah. Backend mengirim pesan MQTT ke topic tertentu. Perangkat IoT seperti ESP32 membaca topic tersebut dan melakukan aksi.

Contoh:

```text
User klik ON lampu
Frontend kirim request ke backend
Backend publish MQTT ke topic lampu
ESP32 menerima pesan MQTT
Relay menyalakan lampu
ESP32 publish status terbaru
Backend menerima status
Dashboard menampilkan status terbaru
```

## 10. Modul Produk

## 10.1 Modul Autentikasi

Modul ini mengatur akses user ke aplikasi.

### Fitur

1. Login.
2. Logout.
3. Cek session user.
4. Proteksi endpoint backend.
5. Proteksi route frontend.
6. Role admin dan user.

### Role

```text
admin:
- Mengelola user
- Mengelola ruangan
- Mengelola perangkat
- Mengelola jadwal
- Melihat log
- Mengontrol semua perangkat

user:
- Melihat dashboard
- Mengontrol perangkat yang diizinkan
- Melihat status perangkat
```

Untuk MVP, pembatasan perangkat per user boleh dibuat sederhana. Minimal role admin dan user harus tersedia.

### Acceptance Criteria

1. User dapat login dengan username dan password.
2. Password disimpan dalam bentuk hash.
3. User yang belum login tidak dapat membuka dashboard.
4. User yang belum login tidak dapat mengakses protected API.
5. Role user terbaca di frontend dan backend.

## 10.2 Modul Dashboard

Dashboard adalah halaman utama setelah login.

### Informasi yang Ditampilkan

1. Jumlah total perangkat.
2. Jumlah perangkat online.
3. Jumlah perangkat offline.
4. Jumlah perangkat ON.
5. Jumlah perangkat OFF.
6. Sensor terbaru.
7. Ruangan yang tersedia.
8. Aktivitas terakhir.
9. Status koneksi MQTT/backend.

### Acceptance Criteria

1. Dashboard tampil setelah login.
2. Dashboard mengambil data dari API backend.
3. Dashboard dapat dibuka dari HP.
4. Status perangkat dapat dipahami dengan mudah.
5. Aktivitas terakhir tampil maksimal 10 item.

## 10.3 Modul Ruangan

Modul ruangan digunakan untuk mengelompokkan perangkat berdasarkan lokasi di rumah.

### Data Ruangan

```text
id
name
description
created_at
updated_at
```

### Fitur

1. Tambah ruangan.
2. Edit ruangan.
3. Hapus ruangan.
4. Lihat daftar ruangan.
5. Lihat perangkat berdasarkan ruangan.

### Contoh Ruangan

```text
Ruang Tamu
Kamar Tidur
Dapur
Teras
Garasi
Kamar Mandi
```

### Acceptance Criteria

1. Admin dapat menambah ruangan.
2. Admin dapat mengedit ruangan.
3. Admin dapat menghapus ruangan jika tidak ada perangkat aktif.
4. User dapat melihat daftar ruangan.
5. Nama ruangan wajib diisi.

## 10.4 Modul Perangkat

Modul perangkat digunakan untuk mengelola perangkat smarthome.

### Jenis Perangkat MVP

```text
lamp
relay
switch
temperature_sensor
humidity_sensor
motion_sensor
door_sensor
```

### Data Perangkat

```text
id
room_id
name
device_type
mqtt_topic_set
mqtt_topic_status
current_status
is_online
last_seen_at
created_at
updated_at
```

### Status Perangkat

Status perangkat perlu dibedakan menjadi dua:

```text
desired_state:
status yang diminta user, misalnya ON

reported_state:
status aktual yang dilaporkan perangkat, misalnya ON/OFF
```

Untuk MVP, field `current_status` masih boleh digunakan. Namun secara desain jangka panjang, sebaiknya dipisahkan antara status yang diminta dan status yang benar-benar dilaporkan perangkat.

### Fitur

1. Tambah perangkat.
2. Edit perangkat.
3. Hapus perangkat.
4. Lihat daftar perangkat.
5. Filter perangkat berdasarkan ruangan.
6. Tampilkan status ON/OFF.
7. Tampilkan status online/offline.
8. Tampilkan waktu update terakhir.

### Acceptance Criteria

1. Admin dapat menambahkan perangkat.
2. Admin dapat mengisi MQTT topic.
3. Admin dapat memilih jenis perangkat.
4. Admin dapat memilih ruangan.
5. User dapat melihat perangkat.
6. Perangkat offline diberi indikator jelas.
7. Perangkat yang belum pernah mengirim status harus tampil sebagai unknown/offline.

## 10.5 Modul Kontrol Perangkat

Modul ini digunakan untuk mengontrol perangkat dari dashboard.

### Perangkat yang Bisa Dikontrol

```text
lamp
relay
switch
```

Sensor tidak perlu memiliki tombol ON/OFF.

### Alur Kontrol

```text
User klik tombol ON/OFF
Frontend kirim request ke backend
Backend validasi perangkat
Backend publish MQTT
Backend simpan log perintah
Perangkat menerima perintah
Perangkat publish status aktual
Backend update status
Frontend menampilkan status terbaru
```

### Endpoint

```text
POST /api/devices/{id}/control
```

### Request

```json
{
  "state": "ON"
}
```

atau:

```json
{
  "state": "OFF"
}
```

### Risiko yang Harus Ditangani

1. Perangkat offline.
2. MQTT broker tidak aktif.
3. Topic perangkat salah.
4. Perangkat tidak mengirim status balik.
5. Status dashboard tidak sinkron dengan kondisi fisik.

### Acceptance Criteria

1. User dapat menekan tombol ON.
2. User dapat menekan tombol OFF.
3. Backend mengirim pesan MQTT.
4. Aktivitas tersimpan di log.
5. Jika perangkat offline, sistem memberi peringatan.
6. Jika perintah gagal dikirim, sistem memberi pesan error.

## 10.6 Modul MQTT

MQTT adalah jalur komunikasi utama antara backend dan perangkat IoT.

### Struktur Topic

Format topic disarankan:

```text
home/{room_slug}/{device_slug}/set
home/{room_slug}/{device_slug}/status
home/{room_slug}/{device_slug}/sensor
```

Contoh:

```text
home/living-room/lamp-1/set
home/living-room/lamp-1/status
home/bedroom/temperature-1/status
home/terrace/motion-1/status
```

### Payload Perintah

```json
{
  "state": "ON"
}
```

### Payload Status Lampu/Relay

```json
{
  "state": "ON",
  "online": true
}
```

### Payload Sensor Suhu

```json
{
  "value": 27.5,
  "unit": "C"
}
```

### Payload Sensor Gerak

```json
{
  "motion": true
}
```

### Fitur Backend MQTT

1. Publish command.
2. Subscribe status.
3. Subscribe sensor.
4. Update status perangkat.
5. Simpan sensor reading.
6. Simpan activity log.
7. Deteksi last seen perangkat.

### Acceptance Criteria

1. Backend dapat connect ke Mosquitto.
2. Backend dapat publish ke topic perangkat.
3. Backend dapat subscribe topic status.
4. Backend dapat update database saat status diterima.
5. Payload tidak valid tidak membuat aplikasi crash.

## 10.7 Modul Sensor

Modul sensor digunakan untuk menyimpan dan menampilkan data sensor.

### Sensor MVP

```text
temperature
humidity
motion
door
```

### Data Sensor

```text
id
device_id
sensor_type
value
unit
recorded_at
```

### Fitur

1. Menerima data sensor dari MQTT.
2. Menyimpan data sensor.
3. Menampilkan sensor terbaru.
4. Menampilkan histori sensor sederhana.
5. Menandai sensor offline jika lama tidak update.

### Acceptance Criteria

1. Data suhu dapat diterima dan disimpan.
2. Data kelembapan dapat diterima dan disimpan.
3. Data sensor gerak dapat diterima dan disimpan.
4. Sensor terbaru tampil di dashboard.
5. Histori sensor dapat dilihat per perangkat.

## 10.8 Modul Riwayat Aktivitas

Modul ini menyimpan aktivitas penting di sistem.

### Aktivitas yang Dicatat

1. User login.
2. User logout.
3. Perangkat dinyalakan.
4. Perangkat dimatikan.
5. Status perangkat berubah.
6. Perangkat offline.
7. Jadwal otomatisasi berjalan.
8. Gagal mengirim perintah MQTT.

### Data Log

```text
id
user_id
device_id
activity_type
message
status
created_at
```

### Acceptance Criteria

1. Aktivitas kontrol perangkat tersimpan.
2. Aktivitas jadwal tersimpan.
3. Error MQTT tersimpan.
4. User dapat melihat daftar log.
5. Log terbaru tampil paling atas.
6. Log dapat difilter berdasarkan tanggal dan perangkat.

## 10.9 Modul Jadwal Otomatisasi

Modul ini menjalankan perintah otomatis berdasarkan waktu.

### Contoh Jadwal

```text
Nyalakan lampu teras setiap hari pukul 18:00
Matikan lampu teras setiap hari pukul 06:00
Nyalakan lampu ruang tamu setiap Senin-Jumat pukul 17:30
```

### Data Jadwal

```text
id
device_id
action
time
days
is_active
created_at
updated_at
```

### Fitur

1. Tambah jadwal.
2. Edit jadwal.
3. Hapus jadwal.
4. Aktifkan/nonaktifkan jadwal.
5. Scheduler menjalankan jadwal aktif.
6. Scheduler mengirim perintah MQTT.
7. Log dibuat saat jadwal berjalan.

### Catatan Teknis

Timezone harus diset ke waktu lokal rumah, yaitu Asia/Jakarta jika digunakan di Indonesia.

### Acceptance Criteria

1. User dapat membuat jadwal ON.
2. User dapat membuat jadwal OFF.
3. Jadwal berjalan sesuai jam lokal.
4. Jadwal dapat dinonaktifkan.
5. Jadwal yang berjalan tersimpan di log.

## 10.10 Modul Remote Access

Akses remote digunakan agar aplikasi bisa dibuka dari luar rumah.

### Opsi 1: Tailscale

Cocok untuk akses pribadi dan keluarga. Tidak membutuhkan domain.

### Opsi 2: Cloudflare Tunnel

Cocok jika ingin menggunakan domain seperti:

```text
https://smarthome.domainanda.com
```

### Prinsip Keamanan

1. Jangan membuka port langsung ke internet.
2. Tetap gunakan login aplikasi.
3. Gunakan password kuat.
4. Gunakan HTTPS untuk akses domain.
5. Batasi akses admin.

### Acceptance Criteria

1. Aplikasi bisa diakses dari luar rumah.
2. Tidak menggunakan port forwarding langsung.
3. Login tetap wajib.
4. Jika internet rumah mati, akses lokal tetap berjalan.

## 11. Desain Database

## 11.1 Tabel users

```text
id
name
username
password_hash
role
is_active
created_at
updated_at
```

## 11.2 Tabel rooms

```text
id
name
slug
description
created_at
updated_at
```

## 11.3 Tabel devices

```text
id
room_id
name
slug
device_type
mqtt_topic_set
mqtt_topic_status
current_status
is_online
last_seen_at
created_at
updated_at
```

## 11.4 Tabel sensor_readings

```text
id
device_id
sensor_type
value
unit
recorded_at
```

## 11.5 Tabel activity_logs

```text
id
user_id
device_id
activity_type
message
status
created_at
```

## 11.6 Tabel automation_schedules

```text
id
device_id
action
time
days
is_active
created_at
updated_at
```

## 11.7 Tabel user_device_permissions

Tabel ini opsional untuk MVP. Jika belum dibutuhkan, dapat ditunda.

```text
id
user_id
device_id
can_view
can_control
created_at
updated_at
```

## 12. API Endpoint

## 12.1 Auth

```text
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

## 12.2 Dashboard

```text
GET /api/dashboard/summary
GET /api/dashboard/recent-activities
```

## 12.3 Rooms

```text
GET    /api/rooms
POST   /api/rooms
GET    /api/rooms/{id}
PUT    /api/rooms/{id}
DELETE /api/rooms/{id}
```

## 12.4 Devices

```text
GET    /api/devices
POST   /api/devices
GET    /api/devices/{id}
PUT    /api/devices/{id}
DELETE /api/devices/{id}
POST   /api/devices/{id}/control
```

## 12.5 Sensors

```text
GET /api/sensors/latest
GET /api/sensors/history
```

## 12.6 Activity Logs

```text
GET /api/activity-logs
```

## 12.7 Automations

```text
GET    /api/automations
POST   /api/automations
GET    /api/automations/{id}
PUT    /api/automations/{id}
DELETE /api/automations/{id}
```

## 13. Desain Antarmuka

## 13.1 Halaman Login

Komponen:

1. Nama aplikasi.
2. Input username.
3. Input password.
4. Tombol login.
5. Pesan error.
6. Loading state saat login.

## 13.2 Layout Utama

Komponen:

1. Sidebar atau bottom navigation.
2. Header status koneksi.
3. Menu dashboard.
4. Menu ruangan.
5. Menu perangkat.
6. Menu otomatisasi.
7. Menu riwayat.
8. Logout.

Untuk HP, gunakan bottom navigation atau menu sederhana agar mudah digunakan.

## 13.3 Dashboard

Komponen:

1. Kartu jumlah perangkat.
2. Kartu perangkat online/offline.
3. Kartu perangkat ON/OFF.
4. Daftar ruangan.
5. Kartu perangkat favorit.
6. Sensor terbaru.
7. Aktivitas terakhir.

## 13.4 Halaman Ruangan

Komponen:

1. Tabel/list ruangan.
2. Tombol tambah.
3. Form tambah/edit.
4. Konfirmasi hapus.
5. Jumlah perangkat per ruangan.

## 13.5 Halaman Perangkat

Komponen:

1. Daftar perangkat.
2. Filter ruangan.
3. Filter jenis perangkat.
4. Status online/offline.
5. Tombol ON/OFF untuk perangkat kontrol.
6. Form tambah/edit perangkat.
7. Konfigurasi MQTT topic.

## 13.6 Halaman Sensor

Untuk MVP, sensor dapat digabung di dashboard atau detail perangkat. Halaman khusus sensor boleh dibuat jika datanya mulai banyak.

Komponen:

1. Sensor terbaru.
2. Waktu update terakhir.
3. Histori sederhana.
4. Status offline.

## 13.7 Halaman Otomatisasi

Komponen:

1. Daftar jadwal.
2. Tombol tambah jadwal.
3. Pilih perangkat.
4. Pilih aksi ON/OFF.
5. Pilih jam.
6. Pilih hari.
7. Toggle aktif/nonaktif.

## 13.8 Halaman Riwayat

Komponen:

1. Daftar aktivitas.
2. Filter tanggal.
3. Filter perangkat.
4. Filter status.
5. Pesan error/log gagal.

## 14. Kebutuhan Non-Fungsional

## 14.1 Performa

1. Dashboard lokal harus terbuka kurang dari 3 detik.
2. Perintah ON/OFF dikirim ke MQTT kurang dari 1 detik.
3. Status perangkat diperbarui segera setelah MQTT status diterima.
4. Aplikasi tetap ringan untuk Raspberry Pi 4.

## 14.2 Keamanan

1. Semua endpoint penting membutuhkan autentikasi.
2. Password disimpan dalam bentuk hash.
3. JWT/session memiliki masa berlaku.
4. MQTT menggunakan username dan password.
5. Remote access tidak menggunakan port forwarding langsung.
6. Akses admin dibatasi.
7. Environment variable tidak boleh masuk Git.
8. Default admin password wajib diganti setelah install.

## 14.3 Reliability

1. Backend harus auto-start saat Raspberry Pi reboot.
2. Mosquitto harus auto-start saat Raspberry Pi reboot.
3. Nginx harus auto-start saat Raspberry Pi reboot.
4. Jika MQTT mati, backend harus memberi error yang jelas.
5. Jika perangkat offline, dashboard harus menampilkan status offline.
6. Sistem tetap bisa diakses secara lokal tanpa internet.

## 14.4 Maintainability

1. Struktur folder backend dan frontend harus rapi.
2. Route, service, schema, dan model dipisah.
3. Dokumentasi deployment wajib tersedia.
4. Log aplikasi dapat dibaca melalui systemd journal.
5. Konfigurasi disimpan di `.env`.

## 14.5 Backup

1. Database SQLite harus dapat dibackup.
2. Backup minimal mencakup database dan file konfigurasi.
3. Log aktivitas tidak boleh tumbuh tanpa batas.
4. Retensi log dapat dibatasi, misalnya 30 atau 90 hari.

## 15. Deployment MVP

## 15.1 Lingkungan Server

```text
Raspberry Pi 4
Raspberry Pi OS Lite 64-bit
microSD 64 GB atau SSD eksternal
Python 3
Node.js untuk build jika diperlukan
Nginx
Mosquitto
SQLite
systemd
```

## 15.2 Mode Deployment

Untuk MVP:

```text
Backend: FastAPI dijalankan sebagai systemd service
Frontend: React build disajikan oleh Nginx
Database: SQLite file lokal
MQTT: Mosquitto service
Remote Access: Tailscale atau Cloudflare Tunnel
```

## 15.3 Service yang Berjalan

```text
nginx.service
mosquitto.service
smarthome-backend.service
cloudflared.service atau tailscaled.service
```

## 15.4 Struktur Folder di Raspberry Pi

```text
/opt/smarthome/
├── backend/
├── frontend/
├── data/
│   └── smarthome.db
├── logs/
├── backups/
└── .env
```

## 16. Strategi Testing

## 16.1 Testing Backend

Skenario:

1. Health check berjalan.
2. Login berhasil.
3. Login gagal.
4. CRUD ruangan berhasil.
5. CRUD perangkat berhasil.
6. Kontrol perangkat mengirim MQTT.
7. Payload MQTT status memperbarui database.
8. Jadwal otomatisasi berjalan.
9. Log aktivitas tersimpan.

## 16.2 Testing Frontend

Skenario:

1. Login berhasil.
2. Login gagal menampilkan error.
3. Dashboard tampil.
4. Ruangan dapat ditambah.
5. Perangkat dapat ditambah.
6. Tombol ON/OFF bekerja.
7. Status perangkat tampil.
8. Tampilan responsif di HP.

## 16.3 Testing MQTT

Skenario:

1. Mosquitto dapat menerima publish.
2. Mosquitto dapat subscribe topic.
3. Backend dapat publish.
4. Backend dapat subscribe.
5. Perangkat dummy dapat mengirim status.
6. Payload tidak valid ditangani dengan aman.

## 16.4 Testing Deployment

Skenario:

1. Raspberry Pi reboot.
2. Backend otomatis menyala.
3. Nginx otomatis menyala.
4. Mosquitto otomatis menyala.
5. Aplikasi bisa dibuka dari HP di jaringan lokal.
6. Remote access berjalan jika dikonfigurasi.

## 17. Risiko Teknis dan Mitigasi

## 17.1 microSD Cepat Rusak

Risiko: terlalu banyak penulisan log dan sensor dapat memperpendek umur microSD.

Mitigasi:

1. Gunakan microSD 64 GB berkualitas.
2. Lebih baik gunakan high endurance microSD.
3. Batasi retensi log.
4. Buat backup berkala.
5. Gunakan SSD jika sistem dipakai jangka panjang.

## 17.2 Perangkat Offline

Risiko: dashboard menunjukkan status tidak akurat.

Mitigasi:

1. Simpan `last_seen_at`.
2. Tandai offline jika tidak ada update dalam periode tertentu.
3. Tampilkan indikator offline.
4. Jangan ubah status menjadi berhasil sebelum ada konfirmasi status jika mode strict digunakan.

## 17.3 MQTT Topic Salah

Risiko: perintah tidak sampai ke perangkat.

Mitigasi:

1. Validasi format topic.
2. Beri fitur test publish di admin.
3. Tampilkan error jika tidak ada status balik.
4. Dokumentasikan standar topic.

## 17.4 Internet Mati

Risiko: akses remote tidak bisa digunakan.

Mitigasi:

1. Fungsi lokal tetap berjalan.
2. Dashboard lokal tetap dapat diakses.
3. Jadwal lokal tetap berjalan.

## 17.5 Akses Tidak Sah

Risiko: orang luar mengakses dashboard.

Mitigasi:

1. Wajib login.
2. Gunakan password kuat.
3. Jangan port forwarding langsung.
4. Gunakan Cloudflare Tunnel/Tailscale.
5. Ganti default password saat pertama instalasi.

## 17.6 Scope Terlalu Melebar

Risiko: MVP tidak selesai karena terlalu banyak fitur.

Mitigasi:

1. Batasi MVP pada kontrol ON/OFF, sensor dasar, log, dan jadwal.
2. Tunda voice, AI, kamera, Zigbee, dan mobile app.
3. Gunakan issue kecil dan jelas.

## 18. Roadmap

## 18.1 Fase 1 — MVP Lokal

Fokus:

1. Setup project.
2. Backend FastAPI.
3. Frontend React.
4. SQLite.
5. Login.
6. Ruangan.
7. Perangkat.
8. MQTT.
9. Kontrol ON/OFF.
10. Dashboard.
11. Log aktivitas.
12. Deploy ke Raspberry Pi.

## 18.2 Fase 2 — Sensor dan Jadwal

Fokus:

1. Sensor suhu.
2. Sensor kelembapan.
3. Sensor gerak.
4. Histori sensor.
5. Jadwal otomatisasi.
6. Monitoring offline device.

## 18.3 Fase 3 — Remote Access dan Security

Fokus:

1. Tailscale.
2. Cloudflare Tunnel.
3. HTTPS.
4. Audit log.
5. User permission.
6. Backup otomatis.

## 18.4 Fase 4 — Automation Lanjutan

Fokus:

1. Automation berbasis kondisi sensor.
2. Mode rumah, tidur, pergi, malam.
3. Notifikasi Telegram/WhatsApp.
4. Rule builder sederhana.

## 18.5 Fase 5 — Integrasi Lanjutan

Fokus:

1. Kamera.
2. Voice command.
3. AI automation.
4. Zigbee.
5. Matter.
6. Mobile app native.

## 19. Kriteria Keberhasilan MVP

MVP dianggap berhasil jika:

1. Aplikasi berjalan di Raspberry Pi 4.
2. Aplikasi dapat dibuka dari HP/laptop di jaringan lokal.
3. User dapat login.
4. Admin dapat menambahkan ruangan.
5. Admin dapat menambahkan perangkat.
6. User dapat menyalakan perangkat dari dashboard.
7. User dapat mematikan perangkat dari dashboard.
8. Backend dapat publish MQTT.
9. Backend dapat menerima status MQTT.
10. Status perangkat tampil di dashboard.
11. Log aktivitas tersimpan.
12. Jadwal sederhana dapat berjalan.
13. Service tetap berjalan setelah Raspberry Pi reboot.
14. Dokumentasi instalasi tersedia.
15. Aplikasi tetap bisa digunakan lokal walaupun internet mati.

## 20. Rekomendasi Pemecahan Issue

PRD ini dapat dipecah menjadi beberapa kelompok issue berikut.

### Epic 1 — Project Foundation

1. Setup repository dan struktur folder.
2. Setup backend FastAPI.
3. Setup frontend React/Vite.
4. Setup environment configuration.
5. Setup database SQLite.

### Epic 2 — Authentication

1. Model user.
2. Seed admin default.
3. Login API.
4. Logout API.
5. Auth middleware.
6. Login page frontend.
7. Protected route frontend.

### Epic 3 — Rooms and Devices

1. CRUD ruangan backend.
2. CRUD perangkat backend.
3. Halaman ruangan frontend.
4. Halaman perangkat frontend.
5. Filter perangkat berdasarkan ruangan.
6. Validasi MQTT topic.

### Epic 4 — MQTT and Device Control

1. Setup Mosquitto.
2. Backend MQTT client.
3. Publish command.
4. Subscribe status.
5. Endpoint kontrol perangkat.
6. Tombol ON/OFF frontend.
7. Update status perangkat.

### Epic 5 — Dashboard and Logs

1. Dashboard summary API.
2. Dashboard frontend.
3. Activity log backend.
4. Halaman riwayat aktivitas.
5. Error handling perangkat offline.

### Epic 6 — Sensors

1. MQTT sensor subscriber.
2. Sensor reading model.
3. Sensor latest API.
4. Sensor history API.
5. Tampilan sensor frontend.

### Epic 7 — Automation

1. Model jadwal otomatisasi.
2. CRUD jadwal backend.
3. Scheduler backend.
4. Halaman otomatisasi frontend.
5. Log jadwal otomatisasi.

### Epic 8 — Deployment Raspberry Pi

1. Setup Raspberry Pi OS.
2. Install dependency server.
3. Deploy backend systemd.
4. Deploy frontend Nginx.
5. Setup Mosquitto.
6. Setup backup.
7. Setup remote access.

### Epic 9 — Testing and Documentation

1. End-to-end testing.
2. MQTT testing.
3. Deployment testing.
4. User guide.
5. Installation guide.
6. Troubleshooting guide.

## 21. Catatan Senior Developer

Untuk menjaga project tetap realistis, pengembangan harus dimulai dari alur paling penting:

```text
Login
Tambah ruangan
Tambah perangkat
Kirim ON/OFF via MQTT
Terima status MQTT
Tampilkan status di dashboard
Deploy ke Raspberry Pi
```

Jangan mulai dari fitur kamera, AI, voice, atau integrasi cloud. Fitur tersebut menarik, tetapi akan memperlambat MVP.

Keputusan teknis yang disarankan untuk MVP:

```text
Backend tetap di Raspberry Pi
Database tetap di Raspberry Pi
MQTT tetap di Raspberry Pi
Frontend utama tetap di Raspberry Pi
Remote access menggunakan Tailscale atau Cloudflare Tunnel
Docker belum wajib untuk Raspberry Pi
```

Jika di kemudian hari ingin menaruh frontend di VPS menggunakan Docker, itu boleh dilakukan sebagai akses tambahan. Namun sistem utama tetap harus berjalan lokal agar fungsi smarthome tidak bergantung pada internet.
