$(document).ready(function () {
    // Mengambil daftar surah dari API
    $.ajax({
      url: "https://equran.id/api/v2/surat",
      method: "GET",
      success: function (response) {
        const surahList = response.data;
        let html = "";
  
        // Menampilkan daftar surah
        surahList.forEach((surah) => {
          html += `
            <div class="col-md-4 mb-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${surah.namaLatin}</h5>
                  <p class="card-text">${surah.arti}</p>
                  <button class="btn btn-primary btn-detail" data-id="${surah.nomor}">Lihat Detail</button>
                </div>
              </div>
            </div>
          `;
        });
  
        $("#surah-list").html(html);
      },
      error: function (err) {
        console.error("Gagal mengambil data surah:", err);
      },
    });
  
    // Menangani klik tombol "Lihat Detail"
    $(document).on("click", ".btn-detail", function () {
      const surahId = $(this).data("id");
  
      // Mengambil detail surah dari API
      $.ajax({
        url: `https://equran.id/api/v2/surat/${surahId}`,
        method: "GET",
        success: function (response) {
          const surah = response.data;
          let html = `
            <h4>${surah.namaLatin}</h4>
            <p><strong>Arti:</strong> ${surah.arti}</p>
            <p><strong>Jumlah Ayat:</strong> ${surah.jumlahAyat}</p>
            <p><strong>Tempat Turun:</strong> ${surah.tempatTurun}</p>
            <p><strong>Deskripsi:</strong> ${surah.deskripsi}</p>
          `;
  
          $("#surah-detail").html(html);
          $("#surahDetailModal").modal("show");
        },
        error: function (err) {
          console.error("Gagal mengambil detail surah:", err);
        },
      });
    });
  });