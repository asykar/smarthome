# Panduan Kontribusi (Contributing Guidelines)

Selamat datang di proyek Smarthome Raspberry Pi! Dokumen ini dibuat agar penulisan kode, struktur commit, penamaan branch, dan proses penggabungan kode (pull request) berjalan konsisten, rapi, dan mudah dikelola oleh tim.

---

## 🌿 Standar Penamaan Branch

Pemberian nama branch baru wajib mengikuti format kategori tugas diikuti deskripsi singkat menggunakan huruf kecil dan tanda hubung (`-`).

### Format Branch
```text
kategori/deskripsi-tugas
```

### Kategori yang Diperbolehkan:
*   `feature/`: Untuk penambahan fitur baru.
*   `fix/`: Untuk perbaikan bug.
*   `docs/`: Untuk penulisan atau pembaruan dokumentasi.
*   `refactor/`: Untuk restrukturisasi kode tanpa mengubah fungsionalitas.
*   `chore/`: Untuk perubahan konfigurasi build, package manager, dll.

### Contoh Penamaan:
*   `feature/setup-backend`
*   `feature/setup-frontend`
*   `feature/database-foundation`
*   `fix/health-check-error`
*   `docs/local-development`

---

## 💬 Standar Commit Message

Pesan commit harus singkat, jelas, serta menggunakan konvensi penamaan standar (**Conventional Commits**).

### Format Commit:
```text
tipe: deskripsi singkat perubahan
```

### Tipe Commit yang Umum:
*   `feat`: Penambahan fitur baru (misal: `feat: setup initial FastAPI backend`).
*   `fix`: Perbaikan bug (misal: `fix: correct database connection path`).
*   `docs`: Pembaruan dokumentasi saja (misal: `docs: add local development guide`).
*   `style`: Perubahan terkait tampilan visual/format kode tanpa memengaruhi fungsionalitas logika.
*   `refactor`: Perubahan struktur kode untuk perbaikan kualitas internal.
*   `chore`: Pemeliharaan proyek (misal: `chore: add environment example files`).

*Tip: Tulis deskripsi commit dalam bahasa Inggris atau bahasa Indonesia secara konsisten, menggunakan huruf kecil.*

---

## 🔀 Aturan Pull Request (PR) dan Penggabungan Kode

Setiap developer dilarang langsung melakukan push ke branch `main`. Semua perubahan harus melalui Pull Request.

### Prosedur Kerja:
1.  Buat branch baru dari `main`.
2.  Lakukan perubahan dan commit dengan standar pesan commit yang benar.
3.  Lakukan push branch ke repositori online (GitHub).
4.  Buka Pull Request (PR) di GitHub ke branch `main`.
5.  Isi template deskripsi PR dengan detail perubahan yang dilakukan.

### Pull Request Checklist:
Sebelum PR di-merge ke branch `main`, pastikan Anda telah memeriksa poin-poin berikut:
*   [ ] Kode dapat dijalankan di lokal dengan normal.
*   [ ] Tidak ada file rahasia (`.env` dsb) yang tidak sengaja masuk Git.
*   [ ] Tidak ada file database (`*.db`, `*.sqlite`) yang masuk Git.
*   [ ] Dokumentasi diperbarui jika diperlukan.
*   [ ] Endpoint utama sudah diuji dan berhasil mendapatkan respon sukses.
*   [ ] Tidak ada error di console browser saat menguji frontend.

---

## 💻 Aturan Gaya Penulisan Kode (Coding Style)

### 🐍 Backend (Python / FastAPI)
*   **PEP 8**: Ikuti aturan format gaya penulisan Python standar (PEP 8). Gunakan auto-formatter seperti `black` atau `ruff` jika memungkinkan.
*   **Type Hinting**: Gunakan type hints pada deklarasi argumen fungsi dan nilai kembalian (return type) demi keamanan tipe data:
    ```python
    def get_user_status(user_id: int) -> dict:
        ...
    ```
*   **Modularitas**: Pisahkan router, model, schema Pydantic, dan logic business (service) ke dalam modulnya masing-masing.

### ⚛️ Frontend (React / TypeScript)
*   **Penamaan Komponen**: Gunakan **PascalCase** untuk nama file komponen React dan fungsinya (misal: `LoginPage.tsx`, `MainLayout.tsx`).
*   **Type Safety**: Hindari penggunaan tipe data `any`. Tentukan tipe data interface atau type yang eksplisit untuk setiap property komponen dan data state.
*   **Styling**: Definisikan variable token desain di file CSS global (`src/index.css`) dan gunakan class untuk konsistensi visual.
