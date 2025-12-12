import { useState } from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Search, AlertCircle, Clock, Eye, PlayCircle, ChevronDown, Filter, X } from 'lucide-react';
import { usePage, router } from "@inertiajs/react";

export default function TugasMasuk() {
  const { tugas } = usePage().props;
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('terbaru');
  const [selectedSifat, setSelectedSifat] = useState('semua');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTugas, setSelectedTugas] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const hitungWaktuTunggu = (tanggal) => {
    const sekarang = new Date();
    const waktuDisposisi = new Date(tanggal);
    const selisihMs = sekarang - waktuDisposisi;
    const selisihJam = Math.floor(selisihMs / (1000 * 60 * 60));
    const selisihHari = Math.floor(selisihJam / 24);

    if (selisihHari > 0) {
      return `${selisihHari} hari yang lalu`;
    } else if (selisihJam > 0) {
      return `${selisihJam} jam yang lalu`;
    } else {
      return 'Baru saja';
    }
  };

  // Filter dan sort data
  const tugasFiltered = tugas
    .filter((tugas) => {
      const matchSearch = tugas.perihal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tugas.instruksi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tugas.nomor_surat.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSifat = selectedSifat === 'semua' || tugas.sifat_surat === selectedSifat;
      return matchSearch && matchSifat;
    })
    .sort((a, b) => {
      if (sortBy === 'terbaru') {
        return new Date(b.tanggal_disposisi) - new Date(a.tanggal_disposisi);
      } else if (sortBy === 'terlama') {
        return new Date(a.tanggal_disposisi) - new Date(b.tanggal_disposisi);
      } else if (sortBy === 'prioritas') {
        const prioritas = { 'Segera': 3, 'Penting': 2, 'Biasa': 1 };
        return (prioritas[b.sifat_surat] || 0) - (prioritas[a.sifat_surat] || 0);
      }
      return 0;
    });

  // Fungsi untuk menangani aksi
  const handleMulaiKerjakan = (tugasData) => {
    setSelectedTugas(tugasData);
    setShowConfirmModal(true);
  };

  const confirmMulaiKerjakan = () => {
    if (!selectedTugas) return;
    
    setIsProcessing(true);
    
    router.post(route('staff.tugas-masuk.mulai', selectedTugas.id), {}, {
      onSuccess: () => {
        setShowConfirmModal(false);
        setSelectedTugas(null);
        setIsProcessing(false);
      },
      onError: (errors) => {
        console.error('Error:', errors);
        setIsProcessing(false);
        alert('Gagal memulai tugas. Silakan coba lagi.');
      }
    });
  };

  const cancelMulaiKerjakan = () => {
    setShowConfirmModal(false);
    setSelectedTugas(null);
  };

  const handleLihatSurat = (filePath, hasFile) => {
    console.log('=== DEBUG LIHAI SURAT ===');
    console.log('filePath:', filePath);
    console.log('hasFile:', hasFile);
    console.log('========================');

    if (!hasFile || !filePath) {
      alert("File surat tidak tersedia!");
      return;
    }

    window.open(filePath, '_blank');
  };

  // Komponen badge prioritas
  const BadgePrioritas = ({ sifat }) => {
    const styles = {
      'Segera': 'bg-red-100 text-red-700 border-red-200',
      'Penting': 'bg-amber-100 text-amber-700 border-amber-200',
      'Biasa': 'bg-blue-100 text-blue-700 border-blue-200'
    };

    const icons = {
      'Segera': <AlertCircle className="w-3.5 h-3.5" />,
      'Penting': <AlertCircle className="w-3.5 h-3.5" />,
      'Biasa': <Clock className="w-3.5 h-3.5" />
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[sifat] || styles['Biasa']}`}>
        {icons[sifat]}
        {sifat}
      </span>
    );
  };

  return (
    <Authenticated>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tugas Masuk</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Kelola dan proses semua tugas baru dari atasan Anda
                </p>
              </div>
              <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700 font-medium">
                  {tugasFiltered.length} Tugas Menunggu
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan perihal, instruksi, atau nomor surat..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white"
                >
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Urutkan</span>
                </button>
                {showSortMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <button
                      onClick={() => { setSortBy('terbaru'); setShowSortMenu(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 first:rounded-t-lg ${sortBy === 'terbaru' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                    >
                      Terbaru
                    </button>
                    <button
                      onClick={() => { setSortBy('terlama'); setShowSortMenu(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 ${sortBy === 'terlama' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                    >
                      Terlama
                    </button>
                    <button
                      onClick={() => { setSortBy('prioritas'); setShowSortMenu(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 last:rounded-b-lg ${sortBy === 'prioritas' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                    >
                      Prioritas Tertinggi
                    </button>
                  </div>
                )}
              </div>

              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white"
                >
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filter</span>
                </button>
                {showFilterMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <button
                      onClick={() => { setSelectedSifat('semua'); setShowFilterMenu(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 first:rounded-t-lg ${selectedSifat === 'semua' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                    >
                      Semua Sifat
                    </button>
                    <button
                      onClick={() => { setSelectedSifat('Segera'); setShowFilterMenu(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 ${selectedSifat === 'Segera' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                    >
                      Segera
                    </button>
                    <button
                      onClick={() => { setSelectedSifat('Penting'); setShowFilterMenu(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 ${selectedSifat === 'Penting' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                    >
                      Penting
                    </button>
                    <button
                      onClick={() => { setSelectedSifat('Biasa'); setShowFilterMenu(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 last:rounded-b-lg ${selectedSifat === 'Biasa' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                    >
                      Biasa
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {tugasFiltered.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak Ada Tugas</h3>
              <p className="text-gray-500">
                {searchQuery || selectedSifat !== 'semua'
                  ? 'Tidak ada tugas yang sesuai dengan pencarian atau filter Anda.'
                  : 'Saat ini tidak ada tugas baru yang perlu dikerjakan.'}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prioritas
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Instruksi Tugas
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nomor & Perihal
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dari Kepala
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Waktu Tunggu
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {tugasFiltered.map((tugas) => (
                      <tr key={tugas.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <BadgePrioritas sifat={tugas.sifat_surat} />
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900 line-clamp-2">
                            {tugas.instruksi.length > 80
                              ? tugas.instruksi.substring(0, 80) + '...'
                              : tugas.instruksi}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p className="font-medium text-gray-900">{tugas.nomor_surat}</p>
                            <p className="text-gray-500 mt-0.5">{tugas.perihal}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-900">{tugas.dari_kepala}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            {hitungWaktuTunggu(tugas.tanggal_disposisi)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleLihatSurat(tugas.file_path, tugas.has_file)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              Lihat Surat
                            </button>
                            <button
                              onClick={() => handleMulaiKerjakan(tugas)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <PlayCircle className="w-4 h-4" />
                              Mulai Kerjakan
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Konfirmasi Mulai Kerjakan */}
        {showConfirmModal && selectedTugas && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Konfirmasi Mulai Tugas</h3>
                <button
                  onClick={cancelMulaiKerjakan}
                  disabled={isProcessing}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-4">
                <p className="text-gray-700 mb-4">
                  Anda yakin ingin memulai tugas ini sekarang?
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-gray-500 min-w-[100px]">Nomor Surat:</span>
                    <span className="text-sm text-gray-900">{selectedTugas.nomor_surat}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-gray-500 min-w-[100px]">Perihal:</span>
                    <span className="text-sm text-gray-900">{selectedTugas.perihal}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-gray-500 min-w-[100px]">Dari:</span>
                    <span className="text-sm text-gray-900">{selectedTugas.dari_kepala}</span>
                  </div>
                </div>

                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-700">
                    <strong>Catatan:</strong> Setelah memulai, tugas ini akan berpindah ke daftar "Tugas Sedang Diproses".
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 rounded-b-lg">
                <button
                  onClick={cancelMulaiKerjakan}
                  disabled={isProcessing}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Batal
                </button>
                <button
                  onClick={confirmMulaiKerjakan}
                  disabled={isProcessing}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Memproses...
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-4 h-4" />
                      Ya, Mulai Sekarang
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Authenticated>
  );
}