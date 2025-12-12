import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
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
  FileBarChart,
} from "lucide-react";

interface Disposisi {
  id: number;
  nomor_surat: string;
  isi_disposisi: string;
  tanggal_disposisi: string;
  status_global: "semua_selesai" | "sebagian_proses" | "tertunda";
  waktu_berjalan: string;
  penerima_count: number;
  file_surat?: string;
  penerima: string
}

interface PenerimaTugas {
  id: number;
  nama: string;
  jabatan: string;
  avatar?: string;
  status: "belum" | "proses" | "selesai";
  tanggal_update: string;
  laporan?: string;
}

export default function LacakDisposisi() {
  const { suratMasuk = [], suratSelesai = [], suratProses = [], suratBatal = [], disposisi = [] }: any = usePage().props;

  const [disposisiList, setDisposisiList] = useState<Disposisi[]>([]);
  const [penerimaList, setPenerimaList] = useState<PenerimaTugas[]>([]);
  const [selectedDisposisi, setSelectedDisposisi] = useState<Disposisi | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<Disposisi[]>([]);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  const [lastUpdate, setLastUpdate] = useState("");
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const refreshInterval = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    if (Array.isArray(disposisi) && disposisi.length > 0) {
      setDisposisiList(
        disposisi.map((d: any) => ({
          id: d.id,
          nomor_surat: d.surat_masuk?.nomor_surat ?? d.nomor_surat ?? "-",
          isi_disposisi: d.instruksi ?? d.isi_disposisi ?? "-",
          tanggal_disposisi: d.tanggal_disposisi ?? d.tanggal ?? "-",
          status_global:
            d.status_global === 1 || d.status_global === "1" ? "tertunda" :
              d.status_global === 2 || d.status_global === "2" ? "sebagian_proses" :
                "semua_selesai",
          waktu_berjalan: d.waktu_berjalan ?? "-",
          penerima: d.penerima ?? [],
          penerima_count: d.penerima_count ?? (d.penerima ? d.penerima.length : 0),
          file_surat: d.file_surat ?? d.surat_masuk?.gambar ?? undefined,
        }))
      );
    } else if (Array.isArray(suratMasuk) && suratMasuk.length > 0) {
      setDisposisiList(
        suratMasuk.map((s: any, idx: number) => ({
          id: s.id ?? idx + 1,
          nomor_surat: s.nomor_surat ?? "-",
          isi_disposisi: s.isi_surat ?? "-",
          tanggal_disposisi: s.tanggal_terima ?? s.tanggal_surat ?? "-",
          status_global: "sebagian_proses",
          waktu_berjalan: "-",
          penerima_count: s._tujuan_count ?? 0,
          file_surat: s.gambar ?? undefined,
        }))
      );
    } else {
      setDisposisiList([]);
    }
  }, [disposisi, suratMasuk]);

  // filtering
  useEffect(() => {
    let filtered = disposisiList;

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        (item.nomor_surat ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.isi_disposisi ?? "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status_global === statusFilter);
    }

    setFilteredData(filtered);
  }, [searchQuery, statusFilter, disposisiList]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "semua_selesai":
        return "bg-green-100 text-green-800 border-green-200";
      case "sebagian_proses":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "tertunda":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "semua_selesai":
        return <CheckCircle className="w-4 h-4" />;
      case "sebagian_proses":
        return <PlayCircle className="w-4 h-4" />;
      case "tertunda":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "semua_selesai":
        return "Semua Selesai";
      case "sebagian_proses":
        return "Dalam Proses";
      case "tertunda":
        return "Tertunda";
      default:
        return "-";
    }
  };

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case "semua_selesai":
        return 100;
      case "sebagian_proses":
        return 50;
      case "tertunda":
        return 10;
      default:
        return 0;
    }
  };

  const getJabatanRole = (jabatan: number) => {
    switch (jabatan) {
      case 1: 'Admin';
      case 2: 'Staf';
      case 3: 'Kepala';
      case 4: 'Verifikator';
      default: return "Staf";
    }
  }

  // actions
  // Ganti handleViewDetail dengan ini:
  const handleViewDetail = (id: number) => {
    const disposisiData = disposisiList.find(d => d.id === id);

    if (disposisiData) {
      setSelectedDisposisi(disposisiData);
      setPenerimaList(disposisiData.penerima ?? []); // ← ini sudah ada datanya
      setIsDetailOpen(true);
    }
  };

  const handleExport = () => {
    console.log("Exporting data...");
  };

  const formatCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const updateLastUpdateTime = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    const dateString = now.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setLastUpdate(`Update terakhir: ${dateString} ${timeString}`);
  };

  useEffect(() => {
    updateLastUpdateTime();

    if (isAutoRefresh) {
      refreshInterval.current = setInterval(() => {
        updateLastUpdateTime();
        // Refresh data setiap 2 menit (120000 ms)
        router.reload({
          preserveScroll: true,
          only: ['disposisi']
        });
      }, 30000); // Update waktu setiap 30 detik
    }

    return () => {
      if (refreshInterval.current) {
        clearInterval(refreshInterval.current);
      }
    };
  }, [isAutoRefresh]);

  const toggleAutoRefresh = () => {
    setIsAutoRefresh(!isAutoRefresh);
  };


  const handleRefresh = () => {
    updateLastUpdateTime
    router.reload();
  };



  return (
    <Authenticated>
      <Head title="Lacak Disposisi Terkirim" />

      <div className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-6">

        <div className="mb-8">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Lacak Disposisi</h1>
              <p className="text-gray-600">Pantau status semua tugas yang telah didelegasikan kepada staf</p>
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
                  <p className="text-2xl font-bold text-gray-900">{suratSelesai.length}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{suratProses.length}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{suratBatal.length}</p>
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
            </div>
          </div>
        </div>

        {/* Main Content - Light Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="p-5 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Daftar Disposisi</h2>
                <p className="text-gray-600 text-sm mt-1">Menampilkan <span className="font-medium">{filteredData.length}</span> dari <span className="font-medium">{disposisiList.length}</span> disposisi</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleAutoRefresh}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${isAutoRefresh
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}
                  title={isAutoRefresh ? "Auto-refresh aktif" : "Auto-refresh nonaktif"}
                >
                  <RefreshCw className={`w-4 h-4 ${isAutoRefresh ? 'animate-spin' : ''}`} />
                  <span className="hidden md:inline">
                    {isAutoRefresh ? 'Auto' : 'Manual'}
                  </span>
                </button>

                <div className=" items-center gap-2">
                  <div className="text-right ">
                    <span className="text-sm text-gray-600 hidden md:inline">{lastUpdate}</span>
                    <span className="text-xs text-gray-500 block md:hidden">{formatCurrentTime()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm uppercase tracking-wider">No. Surat</th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm uppercase tracking-wider">Instruksi</th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm uppercase tracking-wider">Tanggal</th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm uppercase tracking-wider">Waktu</th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm uppercase tracking-wider">Penerima</th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((disposisi) => (
                  <tr key={disposisi.id} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors">
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
                          <div className={`h-2 rounded-full ${disposisi.status_global === 'semua_selesai' ? 'bg-green-500' :
                            disposisi.status_global === 'sebagian_proses' ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`} style={{ width: `${getProgressPercentage(disposisi.status_global)}%` }} />
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
                      <button onClick={() => handleViewDetail(disposisi.id)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm hover:shadow">
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
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak ada disposisi ditemukan</h3>
              <p className="text-gray-500 max-w-md mx-auto">Coba ubah kata kunci pencarian atau sesuaikan filter untuk menemukan data yang Anda cari</p>
            </div>
          )}

          {/* Pagination (Optional) */}
          {filteredData.length > 0 && (
            <div className="p-5 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">Halaman 1 dari 1</div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Sebelumnya</button>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">1</button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Selanjutnya</button>
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
                <button onClick={() => setIsDetailOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                {/* Disposisi Info */}
                <div className="mb-8 p-5 bg-blue-50 rounded-xl border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-blue-600" />Informasi Disposisi</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <p className="text-gray-500 text-xs">Nomor Surat</p>
                      <p className="font-medium text-gray-900 text-lg">{selectedDisposisi.nomor_surat}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-500 text-xs">Tanggal Disposisi</p>
                      <p className="font-medium text-gray-900 text-lg flex items-center gap-2"><Calendar className="w-4 h-4" />{selectedDisposisi.tanggal_disposisi}</p>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <p className="text-gray-500 text-xs">Instruksi Lengkap</p>
                      <p className="font-medium text-gray-900 bg-white p-4 rounded-lg border border-gray-200">{selectedDisposisi.isi_disposisi}</p>
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
                              <p className="text-gray-600 text-sm capitalize mb-1">{status === 'belum' ? 'Belum Dimulai' : status === 'proses' ? 'Dalam Proses' : 'Selesai'}</p>
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
                    <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm">{penerimaList.length} staf</span>
                  </div>

                  <div className="space-y-3">
                    {penerimaList.map((penerima) => (
                      <div key={penerima.id} className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">{penerima.nama.charAt(0)}</div>
                            <div>
                              <p className="font-medium text-gray-900">{penerima.nama}</p>
                              <p className="text-gray-500 text-sm">{getJabatanRole(penerima.jabatan)}</p>
                            </div>
                          </div>
                          <div className={`px-4 py-2 rounded-full text-sm font-medium border ${penerima.status === 'selesai' ? 'bg-green-100 text-green-800 border-green-200' :
                            penerima.status === 'proses' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                              'bg-gray-100 text-gray-800 border-gray-200'
                            }`}>{penerima.status === 'selesai' ? 'Selesai' : penerima.status === 'proses' ? 'Dalam Proses' : 'Belum Dimulai'}</div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="text-gray-500">Terakhir update: <span className="font-medium">{penerima.tanggal_update}</span></div>
                          {penerima.laporan && (
                            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"><BarChart3 className="w-4 h-4" />Lihat Laporan</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center gap-2 text-gray-600"><Clock className="w-4 h-4" /><span>Disposisi ini telah berjalan selama {selectedDisposisi.waktu_berjalan}</span></div>
                <div className="flex gap-3">
                  {selectedDisposisi.file_surat && (
                    <a href={selectedDisposisi.file_surat}
                      target="_blank"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"><ExternalLink className="w-4 h-4" />Lihat File Surat</a>
                  )}
                  <button onClick={() => setIsDetailOpen(false)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">Tutup</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Authenticated>
  );
}
