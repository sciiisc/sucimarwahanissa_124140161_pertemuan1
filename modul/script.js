// ===== LATIHAN 1: Data Diri =====
const nama = "Muhammad Daffa Hakim";
let umur = 20;
let kota = "Bandar Lampung";
console.log(`${nama}, ${umur} tahun, dari ${kota}`);

// ===== LATIHAN 2: Pengecekan Kelulusan =====
function cekLulus(nilai) {
  return nilai >= 70 ? "Lulus" : "Tidak Lulus";
}
console.log("Nilai 75:", cekLulus(75));

// ===== LATIHAN 3: Kategori Umur =====
function kategoriUmur(u) {
  if (u < 12) return "Anak";
  if (u < 18) return "Remaja";
  if (u < 60) return "Dewasa";
  return "Lansia";
}
console.log("Umur 20:", kategoriUmur(20));

// ===== LATIHAN 4: Konversi Hari =====
function namaHari(angka) {
  switch (angka) {
    case 1: return "Monday";
    case 2: return "Tuesday";
    case 3: return "Wednesday";
    case 4: return "Thursday";
    case 5: return "Friday";
    case 6: return "Saturday";
    case 7: return "Sunday";
    default: return "Invalid day";
  }
}
console.log("Hari 3:", namaHari(3));

// ===== LATIHAN 5: Grade dengan Ternary =====
function grade(nilai) {
  return nilai >= 90 ? "A" :
         nilai >= 80 ? "B" :
         nilai >= 70 ? "C" :
         nilai >= 60 ? "D" : "E";
}
console.log("Grade 85:", grade(85));

// ===== LATIHAN 6: Tabel Perkalian =====
let output = "<h3>Tabel Perkalian 7</h3><ul>";
for (let i = 1; i <= 10; i++) {
  output += `<li>7 × ${i} = ${7 * i}</li>`;
}
output += "</ul>";
document.getElementById("result").innerHTML += output;

// ===== LATIHAN 7: Faktorial =====
function faktorial(n) {
  if (n <= 1) return 1;
  return n * faktorial(n - 1);
}
console.log("5! =", faktorial(5));

// ===== LATIHAN 8: Bilangan Prima =====
function isPrima(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}
console.log("17 prima?", isPrima(17));

// ===== LATIHAN 9: FizzBuzz =====
let fizz = "<h3>FizzBuzz 1-100</h3><p>";
for (let i = 1; i <= 100; i++) {
  if (i % 15 === 0) fizz += "FizzBuzz ";
  else if (i % 3 === 0) fizz += "Fizz ";
  else if (i % 5 === 0) fizz += "Buzz ";
  else fizz += i + " ";
}
fizz += "</p>";
document.getElementById("result").innerHTML += fizz;