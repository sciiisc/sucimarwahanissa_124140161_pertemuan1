# 🛒 Toko Kopi Oma
Aplikasi web kasir sederhana untuk toko kopi kampus yang dibangun menggunakan HTML, CSS, dan JavaScript murni (vanilla JS). Proyek ini merupakan tugas Praktikum Pemrograman Web Pertemuan 1.

## 👤 Identitas
Nama Lengkap : Suci Marwah Anissa 
NIM : 124140161 
Kelas Praktikum : RA 
Mata Kuliah : Pengembangan Aplikasi Web 

## 📖 Deskripsi Aplikasi
Aplikasi ini dirancang untuk menyatukan tiga kompetensi dasar pemrograman web:
1. Validasi input form, memastikan data barang yang dimasukkan valid sebelum masuk ke keranjang.
2. Perhitungan kalkulator otomatis, menghitung subtotal, total belanja, diskon, dan kembalian secara real-time.
3. Manajemen keranjang belanja berbasis localStorage, data keranjang tersimpan secara persisten di browser sehingga tidak hilang saat halaman di-refresh.

## 🚀 Panduan Menjalankan
Prasyarat
- Browser modern (Chrome, Edge, Firefox, atau Safari).
- Visual Studio Code 
- Ekstensi Live Server di VS Code 

### Langkah-langkah
1. Clone / Download repository
   git clone https://github.com/[username]/pemrograman_web_itera_123140002.git
2. Buka folder proyek cd pemrograman_web_itera_123140002/muhammaddaffahakim_123140002_pertemuan1
    Jalankan aplikasi 

✅Daftar Fitur
Berikut checklist fitur yang sudah diimplementasikan:
1. Validasi Form Input Barang
    ☑ Nama barang wajib diisi minimal 3 karakter
    ☑ Harga satuan wajib angka positif minimal Rp 500
    ☑ Qty wajib angka bulat minimal 1
    ☑ Pesan error ditampilkan di bawah input yang bermasalah (warna merah)
    ☑ Form otomatis di-reset setelah berhasil menambah barang
    ☑ Input yang error diberi highlight border merah
2. Modul Kalkulator & Perhitungan Otomatis
    ☑ Subtotal dihitung otomatis per baris: Subtotal = Harga × Qty
    ☑ Total belanja dihitung dari akumulasi seluruh subtotal
    ☑ Diskon otomatis 10% jika total belanja ≥ Rp 50.000
    ☑ Kode promo HEMAT10 memberikan diskon 10% meski total < Rp 50.000
    ☑ Kalkulator kembalian: Kembalian = Uang Bayar − Total Akhir
    ☑ Peringatan jika uang bayar kurang dari total akhir
3. Manajemen Keranjang & LocalStorage
    ☑ Tabel keranjang dengan kolom: No, Nama, Harga Satuan, Qty, Subtotal, Aksi
    ☑ Tombol Hapus di setiap baris barang
    ☑ Total belanja & diskon langsung terhitung ulang setelah hapus
    ☑ Penyimpanan persisten dengan localStorage + JSON.stringify() & JSON.parse()
    ☑ Data keranjang tetap ada setelah refresh halaman
    ☑ Tombol "Transaksi Baru / Reset" untuk mengosongkan keranjang & localStorage
4. Antarmuka (UI/UX)
    ☑ Format angka Rupiah otomatis (Rp 10.000)
    ☑ Tampilan responsif (mobile-friendly)
    ☑ Desain modern dengan card, shadow, dan warna yang konsisten
    ☑ Feedback visual (warna hijau untuk sukses, merah untuk error)

📸 Tangkapan Layar (Screenshot)
1. Tampilan Form Input Utama
![alt text](image.png)
2. Tampilan Pesan error merah muncul saat input tidak valid
![alt text](image.png)
3. Tampilan Hasil Perhitungan & Tabel Keranjang
![alt text](image.png)
Keranjang terisi, total belanja, diskon, dan kembalian terhitung otomatis.

🧠 Penjelasan Teknis Singkat
1. Alur Logika Validasi Input
Alur:
    -Fungsi tambahBarang() dipanggil saat form di-submit.
    -Nilai input diambil dan dikirim ke validasiForm().
    -Jika validasi gagal, pesan error ditampilkan di <small class="error"> dan proses dibatalkan.
    -Jika valid, objek barang baru di-push ke array keranjang, disimpan ke localStorage, dan tabel dirender ulang.
2. Algoritma Kalkulator Keuangan
    function hitungTotal() {
    // 1. Hitung total dari seluruh subtotal
    const total = keranjang.reduce((sum, item) => sum + item.harga * item.qty, 0);
    // 2. Tentukan diskon
    const kodePromo = document.getElementById("kode-promo").value.trim().toUpperCase();
    let diskon = 0;
    if (total >= 50000 || kodePromo === "HEMAT10") {
     diskon = total * 0.1;
    }
    // 3. Hitung total akhir
    const totalAkhir = total - diskon;
    // 4. Update UI
    document.getElementById("total-belanja").textContent = formatRupiah(total);
    document.getElementById("diskon").textContent = "- " + formatRupiah(diskon);
    document.getElementById("total-akhir").textContent = formatRupiah(totalAkhir);
    // 5. Hitung kembalian
    hitungKembalian(totalAkhir);
    }  
3. Mekanisme Serialisasi LocalStorage
    -Setiap kali keranjang berubah (tambah/hapus), fungsi simpanKeStorage() dipanggil.
    -JSON.stringify() mengubah array objek menjadi string agar bisa disimpan di localStorage.
    -Saat halaman dimuat (DOMContentLoaded), muatDariStorage() dipanggil.
    -JSON.parse() mengubah string kembali menjadi array objek.
    -try-catch digunakan untuk menangani jika data korup atau tidak valid.

🗂️ Struktur File Proyek
├── index.html          # Struktur HTML aplikasi utama
├── style.css           # Styling antarmuka
├── script.js           # Logika JavaScript (validasi, kalkulasi, localStorage)
├── README.md           # Dokumentasi ini
├── screenshots/        # Folder tangkapan layar
│   ├── 1-tampilan-utama.png
│   ├── 2-validasi-error.png
│   ├── 3-hasil-perhitungan.png
│   └── 4-localstorage.png
└── modul/              # Latihan praktikum
    ├── index.html
    └── script.js

