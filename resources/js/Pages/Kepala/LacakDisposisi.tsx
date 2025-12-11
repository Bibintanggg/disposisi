import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  PlayCircle,
  Users,
  FileText,
  Calendar,
  ChevronRight,
  Eye,
  Download,
  BarChart3,
  MoreVertical,
  X,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  Home,
  FileBarChart
} from "lucide-react";

interface Disposisi {
  id: number;
  nomor_surat: string;
  isi_disposisi: string;
  tanggal_disposisi: string;
  status_global: 'semua_selesai' | 'sebagian_proses' | 'tertunda';
  waktu_berjalan: string;
  penerima_count: number;
  file_surat?: string;
}

interface PenerimaTugas {
  id: number;
  nama: string;
  jabatan: string;
  avatar?: string;
  status: 'belum' | 'proses' | 'selesai';
  tanggal_update: string;
  laporan?: string;
}

export default function LacakDisposisi() {
  const [disposisiList, setDisposisiList] = useState<Disposisi[]>([
    {
      id: 1,
      nomor_surat: "001/SK/VI/2024",
      isi_disposisi: "Mohon ditindaklanjuti pengajuan anggaran Q3",
      tanggal_disposisi: "2024-06-15",
      status_global: 'sebagian_proses',
      waktu_berjalan: "15 hari",
      penerima_count: 4,
      file_surat: "/files/surat.pdf"
    },
    {
      id: 2,
      nomor_surat: "045/SP/VI/2024",
      isi_disposisi: "Koordinasi pelaksanaan rapat kerja tahunan",
      tanggal_disposisi: "2024-06-10",
      status_global: 'semua_selesai',
      waktu_berjalan: "20 hari",
      penerima_count: 3
    },
    {
      id: 3,
      nomor_surat: "089/ND/VI/2024",
      isi_disposisi: "Evaluasi hasil audit internal departemen",
      tanggal_disposisi: "2024-06-18",
      status_global: 'tertunda',
      waktu_berjalan: "12 hari",
      penerima_count: 5
    },
    {
      id: 4,
      nomor_surat: "102/PL/VI/2024",
      isi_disposisi: "Persiapan laporan triwulan untuk direksi",
      tanggal_disposisi: "2024-06-05",
      status_global: 'sebagian_proses',
      waktu_berjalan: "25 hari",
      penerima_count: 2
    },
    {
      id: 5,
      nomor_surat: "156/MM/VI/2024",
      isi_disposisi: "Pengembangan sistem monitoring kinerja",
      tanggal_disposisi: "2024-06-22",
      status_global: 'semua_selesai',
      waktu_berjalan: "8 hari",
      penerima_count: 6
    }
  ]);

  const [penerimaList, setPenerimaList] = useState<PenerimaTugas[]>([
    {
      id: 1,
      nama: "Ahmad Fauzi",
      jabatan: "Staf Administrasi",
      status: 'selesai',
      tanggal_update: "2024-06-20",
      laporan: "Pengajuan anggaran sudah diselesaikan dan diunggah ke sistem"
    },
    {
      id: 2,
      nama: "Siti Rahayu",
      jabatan: "Staf Keuangan",
      status: 'proses',
      tanggal_update: "2024-06-18"
    },
    {
      id: 3,
      nama: "Budi Santoso",
      jabatan: "Koordinator Proyek",
      status: 'selesai',
      tanggal_update: "2024-06-22",
      laporan: "Dokumen lengkap sudah dipersiapkan"
    },
    {
      id: 4,
      nama: "Dewi Anggraeni",
      jabatan: "Analis Data",
      status: 'belum',
      tanggal_update: "2024-06-15"
    }
  ]);

  const [selectedDisposisi, setSelectedDisposisi] = useState<Disposisi | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<Disposisi[]>(disposisiList);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  useEffect(() => {
    let filtered = disposisiList;
    
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.nomor_surat.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.isi_disposisi.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(item => item.status_global === statusFilter);
    }
    
    setFilteredData(filtered);
  }, [searchQuery, statusFilter, disposisiList]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'semua_selesai': return 'bg-green-100 text-green-800 border-green-200';
      case 'sebagian_proses': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'tertunda': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'semua_selesai': return <CheckCircle className="w-4 h-4" />;
      case 'sebagian_proses': return <PlayCircle className="w-4 h-4" />;
      case 'tertunda': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'semua_selesai': return 'Semua Selesai';
      case 'sebagian_proses': return 'Dalam Proses';
      case 'tertunda': return 'Tertunda';
      default: return '';
    }
  };

  const getProgressPercentage = (status: string) => {
    switch(status) {
      case 'semua_selesai': return 100;
      case 'sebagian_proses': return 50;
      case 'tertunda': return 10;
      default: return 0;
    }
  };

  const handleViewDetail = (disposisi: Disposisi) => {
    setSelectedDisposisi(disposisi);
    setIsDetailOpen(true);
  };

  const handleRefresh = () => {
    // In real app, this would fetch fresh data from API
    console.log("Refreshing data...");
  };

  const handleExport = () => {
    // Export functionality
    console.log("Exporting data...");
  };

  return (
    <Authenticated>
      <Head title="Lacak Disposisi Terkirim" />
      
      {/* Main Container - Light Mode */}
      <div className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-6">
        
        {/* Breadcrumb and Header */}
        <div className="mb-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Lacak Disposisi
              </h1>
              <p className="text-gray-600">
                Pantau status semua tugas yang telah didelegasikan kepada staf
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors shadow-sm"
              >
                <RefreshCw className="w-4 h-4 text-gray-600" />
                <span className="hidden md:inline text-gray-700">Refresh</span>
              </button>
              
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span className="hidden md:inline">Export Data</span>
              </button>
            </div>
          </div>

          {/* Stats Overview - Light Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Total Disposisi</p>
                  <p className="text-2xl font-bold text-gray-900">{disposisiList.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Selesai</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {disposisiList.filter(d => d.status_global === 'semua_selesai').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Dalam Proses</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {disposisiList.filter(d => d.status_global === 'sebagian_proses').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <PlayCircle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Tertunda</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {disposisiList.filter(d => d.status_global === 'tertunda').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar - Light Mode */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari nomor surat atau instruksi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            
            <div className="flex gap-3">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-10"
                >
                  <option value="all">Semua Status</option>
                  <option value="semua_selesai">Semua Selesai</option>
                  <option value="sebagian_proses">Dalam Proses</option>
                  <option value="tertunda">Tertunda</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
              
              <button 
                onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
                className="flex items-center gap-2 px-4 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors"
              >
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="hidden md:inline text-gray-700">Filter</span>
              </button>
            </div>
          </div>
          
          {/* Advanced Filters */}
          {showAdvancedFilter && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-700">Filter Lanjutan</h4>
                <button 
                  onClick={() => setShowAdvancedFilter(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rentang Tanggal
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jumlah Penerima
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Semua</option>
                    <option>1-3 staf</option>
                    <option>4-6 staf</option>
                    <option>7+ staf</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durasi
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Semua Durasi</option>
                    <option>≤ 7 hari</option>
                    <option>8-14 hari</option>
                    <option>15-30 hari</option>
                    <option> &gt; 30 hari</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button className="px-4 py-2 text-gray-700 hover:text-gray-900">
                  Reset
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Terapkan Filter
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Main Content - Light Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="p-5 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Daftar Disposisi</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Menampilkan <span className="font-medium">{filteredData.length}</span> dari <span className="font-medium">{disposisiList.length}</span> disposisi
                </p>
              </div>
              <div className="flex items-center gap-2">
                <FileBarChart className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600 hidden md:inline">Update terakhir: Hari ini 10:30</span>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm uppercase tracking-wider">
                    No. Surat
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm uppercase tracking-wider">
                    Instruksi
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm uppercase tracking-wider">
                    Waktu
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm uppercase tracking-wider">
                    Penerima
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((disposisi) => (
                  <tr 
                    key={disposisi.id} 
                    className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-900 block">{disposisi.nomor_surat}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="line-clamp-2 max-w-md text-gray-700">{disposisi.isi_disposisi}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{disposisi.tanggal_disposisi}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 border ${getStatusColor(disposisi.status_global)}`}>
                            {getStatusIcon(disposisi.status_global)}
                            {getStatusText(disposisi.status_global)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              disposisi.status_global === 'semua_selesai' ? 'bg-green-500' :
                              disposisi.status_global === 'sebagian_proses' ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${getProgressPercentage(disposisi.status_global)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{disposisi.waktu_berjalan}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Users className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-900 block">{disposisi.penerima_count}</span>
                          <span className="text-gray-500 text-sm">staf</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleViewDetail(disposisi)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm hover:shadow"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Detail</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Tidak ada disposisi ditemukan
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Coba ubah kata kunci pencarian atau sesuaikan filter untuk menemukan data yang Anda cari
              </p>
            </div>
          )}

          {/* Pagination (Optional) */}
          {filteredData.length > 0 && (
            <div className="p-5 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Halaman 1 dari 1
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Sebelumnya
                </button>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  1
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Selanjutnya
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Detail Modal - Light Mode */}
        {isDetailOpen && selectedDisposisi && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl border border-gray-200 max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Detail Pelacakan Disposisi</h2>
                  <p className="text-gray-600">{selectedDisposisi.nomor_surat}</p>
                </div>
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                {/* Disposisi Info */}
                <div className="mb-8 p-5 bg-blue-50 rounded-xl border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Informasi Disposisi
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <p className="text-gray-500 text-xs">Nomor Surat</p>
                      <p className="font-medium text-gray-900 text-lg">{selectedDisposisi.nomor_surat}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-500 text-xs">Tanggal Disposisi</p>
                      <p className="font-medium text-gray-900 text-lg flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {selectedDisposisi.tanggal_disposisi}
                      </p>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <p className="text-gray-500 text-xs">Instruksi Lengkap</p>
                      <p className="font-medium text-gray-900 bg-white p-4 rounded-lg border border-gray-200">
                        {selectedDisposisi.isi_disposisi}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Overview */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Penerima Tugas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['selesai', 'proses', 'belum'].map((status) => {
                      const count = penerimaList.filter(p => p.status === status).length;
                      const total = penerimaList.length;
                      const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
                      
                      const cardStyle = status === 'selesai' ? 'bg-green-50 border-green-100' :
                                       status === 'proses' ? 'bg-yellow-50 border-yellow-100' :
                                       'bg-gray-50 border-gray-100';
                      
                      return (
                        <div key={status} className={`rounded-xl p-4 border ${cardStyle}`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-600 text-sm capitalize mb-1">
                                {status === 'belum' ? 'Belum Dimulai' : status === 'proses' ? 'Dalam Proses' : 'Selesai'}
                              </p>
                              <p className="text-2xl font-bold text-gray-900">{count} Staf</p>
                              <p className="text-gray-500 text-sm">{percentage}% dari total</p>
                            </div>
                            {status === 'selesai' && <CheckCircle className="w-8 h-8 text-green-600" />}
                            {status === 'proses' && <PlayCircle className="w-8 h-8 text-yellow-600" />}
                            {status === 'belum' && <Clock className="w-8 h-8 text-gray-400" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Penerima List */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Daftar Penerima</h3>
                    <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {penerimaList.length} staf
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {penerimaList.map((penerima) => (
                      <div key={penerima.id} className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {penerima.nama.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{penerima.nama}</p>
                              <p className="text-gray-500 text-sm">{penerima.jabatan}</p>
                            </div>
                          </div>
                          <div className={`px-4 py-2 rounded-full text-sm font-medium border ${
                            penerima.status === 'selesai' ? 'bg-green-100 text-green-800 border-green-200' :
                            penerima.status === 'proses' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                            'bg-gray-100 text-gray-800 border-gray-200'
                          }`}>
                            {penerima.status === 'selesai' ? 'Selesai' :
                             penerima.status === 'proses' ? 'Dalam Proses' : 'Belum Dimulai'}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="text-gray-500">
                            Terakhir update: <span className="font-medium">{penerima.tanggal_update}</span>
                          </div>
                          {penerima.laporan && (
                            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium">
                              <BarChart3 className="w-4 h-4" />
                              Lihat Laporan
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Disposisi ini telah berjalan selama {selectedDisposisi.waktu_berjalan}</span>
                </div>
                <div className="flex gap-3">
                  {selectedDisposisi.file_surat && (
                    <a 
                      href={selectedDisposisi.file_surat}
                      target="_blank"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Lihat File Surat
                    </a>
                  )}
                  <button
                    onClick={() => setIsDetailOpen(false)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Authenticated>
  );
}