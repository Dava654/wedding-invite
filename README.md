# Undangan Pernikahan Digital — Dava & Sella

Website undangan pernikahan satu-untuk-semua-tamu. Nama tamu berubah otomatis lewat parameter URL `?to=`.

## Cara pakai

```bash
npm install
npm run dev       # development, buka http://localhost:5173
npm run build     # build production ke folder dist/
npm run preview   # preview hasil build
```

Contoh URL nama tamu:

```
http://localhost:5173/?to=Dava
http://localhost:5173/?to=Dava%20Dinata
http://localhost:5173/            → tampil "Tamu Undangan"
```

## Kustomisasi

- **Data undangan** (nama, tanggal, lokasi, rekening, dll): `src/data/weddingData.js`
- **Foto galeri**: ganti file di `public/gallery/` lalu update `src` di `weddingData.js` (bisa .jpg/.png/.webp)
- **Musik latar**: taruh file mp3 di `public/audio/wedding-song.mp3` (path bisa diubah di `weddingData.js`). Jika file belum ada, tombol musik otomatis nonaktif dan website tetap berjalan normal.
- **Google Maps**: ganti `mapsUrl` dan `mapsEmbedUrl` di `weddingData.js` dengan link venue Anda.
- **Warna & tipografi**: token desain ada di `src/index.css` bagian `@theme` (mudah diubah tanpa menyentuh komponen).

## Status fitur (sesuai prioritas PRD)

**Sudah dibangun:**
- Cover pembuka interaktif dengan segel monogram
- Nama tamu dinamis lewat URL parameter (`?to=Nama+Tamu`)
- Hero sambutan dengan nama mempelai
- Rangkaian acara (Akad & Resepsi)
- Countdown real-time menuju hari H
- Lokasi venue & integrasi Google Maps
- Galeri foto dengan Lightbox & navigasi
- Musik latar (background audio player)
- **Amplop Digital (Transfer BCA, DANA, GoPay)** dengan fitur salin 1-klik & notifikasi toast
- **Konfirmasi Kehadiran (RSVP WhatsApp)** dengan auto-chat sesuai pilihan kehadiran (Hadir / Tidak Hadir)
- Responsive mobile-first & animasi halus Framer Motion

## Keamanan

Nama tamu dari URL diperlakukan sebagai plain text saja (disanitasi di `src/utils/guestName.js`), tidak pernah dirender sebagai HTML — aman dari XSS/HTML injection.
