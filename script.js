/* ============================================
   MINI POS - KASIR & KERANJANG BELANJA
   ============================================ */

// ===== STATE =====
let keranjang = [];
const STORAGE_KEY = "mini_pos_keranjang";

// ===== UTILITAS =====
function formatRupiah(angka) {
  return "Rp " + Number(angka).toLocaleString("id-ID");
}

// ===== LOCALSTORAGE =====
function simpanKeStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(keranjang));
}

function muatDariStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      keranjang = JSON.parse(data);
    } catch (e) {
      console.error("Gagal parse data localStorage:", e);
      keranjang = [];
    }
  }
}

// ===== VALIDASI FORM =====
function tampilkanError(id, pesan) {
  document.getElementById(id).textContent = pesan;
}

function bersihkanError() {
  ["err-nama", "err-harga", "err-qty"].forEach(id => {
    document.getElementById(id).textContent = "";
  });
  ["nama-barang", "harga-barang", "qty-barang"].forEach(id => {
    document.getElementById(id).classList.remove("error");
  });
}

function validasiForm(nama, harga, qty) {
  let valid = true;
  bersihkanError();

  if (!nama || nama.trim().length < 3) {
    tampilkanError("err-nama", "Nama barang wajib diisi minimal 3 karakter.");
    document.getElementById("nama-barang").classList.add("error");
    valid = false;
  }

  if (isNaN(harga) || harga < 500) {
    tampilkanError("err-harga", "Harga wajib angka positif minimal Rp 500.");
    document.getElementById("harga-barang").classList.add("error");
    valid = false;
  }

  if (isNaN(qty) || qty < 1 || !Number.isInteger(qty)) {
    tampilkanError("err-qty", "Qty wajib angka bulat minimal 1.");
    document.getElementById("qty-barang").classList.add("error");
    valid = false;
  }

  return valid;
}

// ===== TAMBAH BARANG =====
function tambahBarang(e) {
  e.preventDefault();

  const nama = document.getElementById("nama-barang").value.trim();
  const harga = parseFloat(document.getElementById("harga-barang").value);
  const qty = parseInt(document.getElementById("qty-barang").value);

  if (!validasiForm(nama, harga, qty)) return;

  keranjang.push({
    id: Date.now(),
    nama: nama,
    harga: harga,
    qty: qty
  });

  simpanKeStorage();
  renderKeranjang();
  document.getElementById("form-barang").reset();
  bersihkanError();
}

// ===== HAPUS BARANG =====
function hapusBarang(id) {
  keranjang = keranjang.filter(item => item.id !== id);
  simpanKeStorage();
  renderKeranjang();
}

// ===== RENDER TABEL =====
function renderKeranjang() {
  const tbody = document.getElementById("tbody-keranjang");
  const emptyMsg = document.getElementById("empty-msg");

  tbody.innerHTML = "";

  if (keranjang.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
    keranjang.forEach((item, index) => {
      const subtotal = item.harga * item.qty;
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.nama}</td>
        <td class="text-right">${formatRupiah(item.harga)}</td>
        <td>${item.qty}</td>
        <td class="text-right">${formatRupiah(subtotal)}</td>
        <td><button class="btn-hapus" data-id="${item.id}">Hapus</button></td>
      `;
      tbody.appendChild(tr);
    });

    // Event listener tombol hapus
    tbody.querySelectorAll(".btn-hapus").forEach(btn => {
      btn.addEventListener("click", function () {
        hapusBarang(parseInt(this.dataset.id));
      });
    });
  }

  hitungTotal();
}

// ===== HITUNG TOTAL & DISKON =====
function hitungTotal() {
  const total = keranjang.reduce((sum, item) => sum + item.harga * item.qty, 0);

  // Diskon: 10% jika total >= 50000 ATAU kode promo HEMAT10
  const kodePromo = document.getElementById("kode-promo").value.trim().toUpperCase();
  let diskon = 0;
  if (total >= 50000 || kodePromo === "HEMAT10") {
    diskon = total * 0.1;
  }

  const totalAkhir = total - diskon;

  document.getElementById("total-belanja").textContent = formatRupiah(total);
  document.getElementById("diskon").textContent = "- " + formatRupiah(diskon);
  document.getElementById("total-akhir").textContent = formatRupiah(totalAkhir);

  hitungKembalian(totalAkhir);
}

// ===== HITUNG KEMBALIAN =====
function hitungKembalian(totalAkhir) {
  const uangBayar = parseFloat(document.getElementById("uang-bayar").value) || 0;
  const pesan = document.getElementById("pesan-bayar");
  const elKembalian = document.getElementById("kembalian");

  if (uangBayar === 0) {
    elKembalian.textContent = "Rp 0";
    pesan.textContent = "";
    pesan.className = "info";
    return;
  }

  if (uangBayar < totalAkhir) {
    elKembalian.textContent = "Rp 0";
    pesan.textContent = "⚠️ Uang belum mencukupi!";
    pesan.className = "info danger";
  } else {
    const kembalian = uangBayar - totalAkhir;
    elKembalian.textContent = formatRupiah(kembalian);
    pesan.textContent = "✅ Pembayaran berhasil!";
    pesan.className = "info success";
  }
}

// ===== RESET TRANSAKSI =====
function resetTransaksi() {
  if (keranjang.length === 0) {
    alert("Keranjang sudah kosong.");
    return;
  }
  if (confirm("Yakin ingin mengosongkan seluruh keranjang?")) {
    keranjang = [];
    localStorage.removeItem(STORAGE_KEY);
    document.getElementById("form-barang").reset();
    document.getElementById("kode-promo").value = "";
    document.getElementById("uang-bayar").value = "";
    document.getElementById("pesan-bayar").textContent = "";
    bersihkanError();
    renderKeranjang();
  }
}

// ===== INISIALISASI =====
document.addEventListener("DOMContentLoaded", () => {
  muatDariStorage();
  renderKeranjang();

  document.getElementById("form-barang").addEventListener("submit", tambahBarang);
  document.getElementById("kode-promo").addEventListener("input", hitungTotal);
  document.getElementById("uang-bayar").addEventListener("input", hitungTotal);
  document.getElementById("btn-reset").addEventListener("click", resetTransaksi);
});