// 1. GANTI teks di dalam tanda petik dengan URL API Sheet Best milikmu dari Langkah 2!
const URL_API = "https://api.sheetbest.com/sheets/f42405fc-0639-47b1-bef3-817aed0e6e45"; 

function muatDataLaporan() {
    fetch(URL_API)
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById("konten-tabel");
            tbody.innerHTML = ""; // Bersihkan teks loading

            if (data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Belum ada data laporan.</td></tr>`;
                return;
            }

            // CATATAN: item.nama_ac, item.kerusakan, item.status harus sama persis 
            // dengan teks baris pertama (kepala kolom) di Google Sheet Anda menggunakan huruf kecil semua.
            data.forEach((item, index) => {
                const baris = document.createElement("tr");
                baris.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.nama_ac || "-"}</td>
                    <td>${item.kerusakan || "-"}</td>
                    <td><strong>${item.status || "Pending"}</strong></td>
                `;
                tbody.appendChild(baris);
            });
        })
        .catch(error => {
            console.error("Error:", error);
            const tbody = document.getElementById("konten-tabel");
            tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:red;">Gagal mengambil data dari Google Sheets.</td></tr>`;
        });
}

// Jalankan fungsi otomatis saat halaman web dibuka
window.addEventListener("DOMContentLoaded", muatDataLaporan);
