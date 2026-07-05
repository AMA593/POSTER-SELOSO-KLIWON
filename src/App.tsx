import React, { useState, useEffect, useRef } from 'react';
import { Download, Type, Calendar } from 'lucide-react';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgImgRef = useRef<HTMLImageElement | null>(null);
  
  // State untuk form input
  const [eventText, setEventText] = useState('Di Iringi Oleh Grub Rebana Al Mubarok Darussalam');
  const [dateText, setDateText] = useState('Senin, 27 April 2026');
  
  // Nilai tetap untuk background
  const bgImageUrl = 'https://seloso-kliwon.vercel.app/assets/a.png';
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  // Memastikan font custom termuat sebelum render
  useEffect(() => {
    document.fonts.ready.then(() => {
      setIsFontLoaded(true);
    });
  }, []);

  // Load image background
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = bgImageUrl;
    img.onload = () => {
      bgImgRef.current = img;
      drawPoster();
    };
  }, [bgImageUrl, isFontLoaded]);

  // Fungsi menggambar canvas
  const drawPoster = () => {
    const canvas = canvasRef.current;
    if (!canvas || !bgImgRef.current || !isFontLoaded) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set resolusi canvas (sesuai template Anda)
    canvas.width = 2160;
    canvas.height = 3840;

    // Bersihkan canvas dan gambar background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImgRef.current, 0, 0, canvas.width, canvas.height);

    // --- LOGIKA POSISI DINAMIS ---
    const teksDalamRangka = eventText;
    const barisTeks = teksDalamRangka.split('\n');
    const jumlahBaris = barisTeks.length;
    const tinggiBaris = 100; 

    // Posisi dasar Y 
    let posisiY = 3000; 
    if (teksDalamRangka.trim() !== "") {
      posisiY = 3000 - ((jumlahBaris - 1) * (tinggiBaris / 1));
      if (posisiY < 2500) posisiY = 2500; 
    }

    // 1. TEKS: SELOSO KLIWON
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff'; 
    ctx.font = '750px FontPosterCustom, sans-serif'; 
    ctx.fillText("Seloso Kliwon", canvas.width / 2, posisiY);

    // 2. TEKS: MUJAHADAH
    ctx.font = 'bold 75px Arial'; 
    ctx.fillText("MUJAHADAH MANAQIB ROSUL NALAL BAROKAH", canvas.width / 2, posisiY + 100);

    // 3. TEKS DINAMIS (Dalam Rangka)
    if (teksDalamRangka.trim() !== "") {
      ctx.font = '75px "Times New Roman"';
      barisTeks.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, posisiY + 200 + (index * tinggiBaris));
      });
    }

    // 4. TEKS: TANGGAL
    ctx.font = '58px montserrat, sans-serif'; 
    ctx.textAlign = 'left'; 
    ctx.fillText(dateText, (canvas.width / 2) + 11, 3444);
  };

  // Redraw jika teks berubah
  useEffect(() => {
    drawPoster();
  }, [eventText, dateText]);

  // Fungsi Download Poster
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const link = document.createElement('a');
      link.download = 'poster-pengajian.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      alert("Terjadi kesalahan saat mengunduh. Pastikan gambar background yang diupload valid.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      {/* Trik untuk memuat font tersembunyi */}
      <div className="font-custom hidden">Load Custom Font</div>

      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Editor Poster Pengajian</h1>
          <p className="text-gray-500 mt-2">Buat dan sesuaikan poster acara Anda dengan mudah</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* KOLOM KIRI - FORM EDITOR */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Type className="w-5 h-5 text-indigo-500" />
                Informasi Acara
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dalam Rangka / Keterangan</label>
                  <textarea
                    value={eventText}
                    onChange={(e) => setEventText(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none"
                    placeholder="Ketik dalam rangka di sini..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    Tanggal & Waktu
                  </label>
                  <input
                    type="text"
                    value={dateText}
                    onChange={(e) => setDateText(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                    placeholder="Contoh: Senin, 27 April 2026"
                  />
                </div>

              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Download className="w-5 h-5" />
              Download Poster HD
            </button>
          </div>

          {/* KOLOM KANAN - PREVIEW */}
          <div className="lg:col-span-8">
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center h-full">
              <div className="w-full flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Live Preview</h2>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Real-time
                </span>
              </div>
              
              <div className="relative w-full max-w-[400px] bg-gray-100 rounded-xl overflow-hidden shadow-inner flex items-center justify-center" style={{ aspectRatio: '9/16' }}>
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm text-gray-400 mt-4 text-center">
                Resolusi Asli: 2160 x 3840 (Full HD Vertical)
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
