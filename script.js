const canvas = document.getElementById('posterCanvas');
const ctx = canvas.getContext('2d');

const inputEvent = document.getElementById('inputEvent');
const inputDate = document.getElementById('inputDate');
const inputLocation = document.getElementById('inputLocation');
const downloadBtn = document.getElementById('downloadBtn');

// 1. Load Background Poster
const img = new Image();
img.src = "assets/a.png"; 

img.onload = () => {
    // Sesuai revisi Anda
    canvas.width = 2160;
    canvas.height = 3840;
    drawPoster();
};

function drawPoster() {
    // Bersihkan canvas dan gambar ulang background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    // --- LOGIKA POSISI DINAMIS ---
    const teksDalamRangka = inputEvent.value;
    const barisTeks = teksDalamRangka.split('\n'); // Membagi berdasarkan Enter
    const jumlahBaris = barisTeks.length;
    const tinggiBaris = 100; // Jarak antar baris sesuai revisi Anda

    // Posisi dasar Y sesuai revisi Anda
    let posisiY = 3000; 

    // Jika ada teks "Dalam Rangka", SELOSO KLIWON naik secara otomatis
    // Semakin banyak baris, semakin naik ke atas
    if (teksDalamRangka.trim() !== "") {
        // Kita kurangi posisiY berdasarkan jumlah baris tambahan
        posisiY = 3000 - ((jumlahBaris - 1) * (tinggiBaris / 1));
        
        // Batas maksimal naik agar tidak terlalu ke atas (Opsional)
        if (posisiY < 2500) posisiY = 2500; 
    }

    // --- 1. TEKS: SELOSO KLIWON ---
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff'; 
    ctx.font = ' 750px FontPosterCustom'; 
    ctx.fillText("Seloso Kliwon", canvas.width / 2, posisiY);

    // --- 2. TEKS: MUJAHADAH ---
    ctx.font = 'bold 75px Arial'; 
    ctx.fillText("MUJAHADAH MANAQIB ROSUL NALAL BAROKAH", canvas.width / 2, posisiY + 100);

    // --- 3. TEKS DINAMIS (Dalam Rangka) ---
    if (teksDalamRangka.trim() !== "") {
        ctx.font = '75px "Times New Roman"';
        barisTeks.forEach((line, index) => {
            // Posisi teks ini mengikuti posisiY yang sudah naik/turun
            ctx.fillText(line, canvas.width / 2, posisiY + 200 + (index * tinggiBaris));
        });
    }

    // --- 4. TEKS: TANGGAL (Sesuai Posisi Revisi Anda) ---
    ctx.font = '58px montserrat'; 
    ctx.textAlign = 'left'; 
    ctx.fillText(inputDate.value, (canvas.width / 2) + 11, 3444);
    
    // --- 5. TEKS: LOKASI (Menyesuaikan Format Anda) ---
    // Jika Anda punya input lokasi, letakkan di sini dengan koordinat yang diinginkan
    if (inputLocation && inputLocation.value) {
        ctx.fillText(inputLocation.value, (canvas.width / 2) + 11, 3540); 
    }
}

// Update otomatis saat mengetik
[inputEvent, inputDate, inputLocation].forEach(el => {
    el.addEventListener('input', drawPoster);
});

// Fungsi Download
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'poster-pengajian-edit.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});