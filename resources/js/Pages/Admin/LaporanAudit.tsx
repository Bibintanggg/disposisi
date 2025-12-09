import { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Calendar, Download, Filter, TrendingUp, Clock, 
  AlertTriangle, Users, FileText, Activity, 
  CheckCircle, XCircle, ChevronDown, BarChart3 
} from 'lucide-react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

// Type definitions
interface FilterState {
  startDate: string;
  endDate: string;
  bidang: string;
  pejabat: string;
  reportType: 'kinerja' | 'audit';
}

interface KinerjaData {
  periode: string;
  waktu_rata_rata: number;
}

interface StafKinerja {
  nama: string;
  rata_waktu: number;
  total_selesai: number;
}

interface BottleneckData {
  nomor_surat: string;
  perihal: string;
  penugasan: string;
  lama_hari: number;
  status: string;
}

export default function LaporanAudit() {
  const [activeSection, setActiveSection] = useState<'kinerja' | 'audit'>('kinerja');
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    startDate: '',
    endDate: '',
    bidang: '',
    pejabat: '',
    reportType: 'kinerja'
  });

  // Dummy data - nanti diganti dengan props dari Inertia
  const ketepatanWaktuData: KinerjaData[] = [
    { periode: 'Jan', waktu_rata_rata: 2.5 },
    { periode: 'Feb', waktu_rata_rata: 3.2 },
    { periode: 'Mar', waktu_rata_rata: 1.8 },
    { periode: 'Apr', waktu_rata_rata: 2.1 },
    { periode: 'Mei', waktu_rata_rata: 2.8 },
    { periode: 'Jun', waktu_rata_rata: 2.3 }
  ];

  const stafKinerjaData: StafKinerja[] = [
    { nama: 'Ahmad Fauzi', rata_waktu: 2.5, total_selesai: 45 },
    { nama: 'Siti Nurhaliza', rata_waktu: 1.8, total_selesai: 52 },
    { nama: 'Budi Santoso', rata_waktu: 3.2, total_selesai: 38 },
    { nama: 'Dewi Kusuma', rata_waktu: 2.1, total_selesai: 48 }
  ];

  const bottleneckData: BottleneckData[] = [
    {
      nomor_surat: '001/SM/2024',
      perihal: 'Permohonan Data Kependudukan',
      penugasan: 'Ahmad Fauzi',
      lama_hari: 12,
      status: 'Dalam Proses'
    },
    {
      nomor_surat: '015/SM/2024',
      perihal: 'Laporan Kegiatan Bulanan',
      penugasan: 'Budi Santoso',
      lama_hari: 9,
      status: 'Dalam Proses'
    }
  ];

  const frekuensiDisposisiData = [
    { nama: 'Kepala Bidang A', total: 87 },
    { nama: 'Kepala Bidang B', total: 72 },
    { nama: 'Kepala Bidang C', total: 65 },
    { nama: 'Kepala Bidang D', total: 58 }
  ];

  const verifikasiStatusData = [
    { name: 'Terverifikasi', value: 245, color: '#10b981' },
    { name: 'Pending', value: 28, color: '#f59e0b' },
    { name: 'Revisi', value: 12, color: '#ef4444' }
  ];

  const suratTanpaFileData = [
    { nomor_surat: '023/SM/2024', pengirim: 'Dinas Pendidikan', tanggal: '2024-12-01', verifikator: 'Admin 1' },
    { nomor_surat: '034/SM/2024', pengirim: 'Kantor Gubernur', tanggal: '2024-12-03', verifikator: 'Admin 2' }
  ];

  const handleExportCSV = (dataType: string) => {
    console.log(`Exporting ${dataType} as CSV...`);
    // Implementasi export nanti
  };

  const handleExportChart = (chartType: string) => {
    console.log(`Exporting ${chartType} chart as image...`);
    // Implementasi export chart nanti
  };

  return (
    <Authenticated>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Laporan & Audit</h1>
            <p className="mt-2 text-sm text-gray-600">
              Monitor kinerja proses dan integritas data sistem
            </p>
          </div>

          {/* Section Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveSection('kinerja')}
                className={`${
                  activeSection === 'kinerja'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2`}
              >
                <TrendingUp className="w-5 h-5" />
                Laporan Kinerja Proses
              </button>
              <button
                onClick={() => setActiveSection('audit')}
                className={`${
                  activeSection === 'audit'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2`}
              >
                <Activity className="w-5 h-5" />
                Audit & Integritas Data
              </button>
            </nav>
          </div>

          {/* Global Filter Panel */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filter Laporan
              </h3>
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                {showFilter ? 'Sembunyikan' : 'Tampilkan'} Filter
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilter ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {showFilter && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Tanggal Mulai
                    </label>
                    <input
                      type="date"
                      value={filters.startDate}
                      onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Tanggal Akhir
                    </label>
                    <input
                      type="date"
                      value={filters.endDate}
                      onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bidang
                    </label>
                    <select
                      value={filters.bidang}
                      onChange={(e) => setFilters({ ...filters, bidang: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Semua Bidang</option>
                      <option value="bidang_a">Bidang A</option>
                      <option value="bidang_b">Bidang B</option>
                      <option value="bidang_c">Bidang C</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pejabat Pendisposisi
                    </label>
                    <select
                      value={filters.pejabat}
                      onChange={(e) => setFilters({ ...filters, pejabat: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Semua Pejabat</option>
                      <option value="kepala_a">Kepala Bidang A</option>
                      <option value="kepala_b">Kepala Bidang B</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Terapkan Filter
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Reset Filter
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Content Section - Laporan Kinerja */}
          {activeSection === 'kinerja' && (
            <div className="space-y-6">
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Rata-rata Waktu</p>
                      <p className="text-2xl font-bold text-gray-900">2.4 hari</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Disposisi</p>
                      <p className="text-2xl font-bold text-gray-900">282</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Bottleneck</p>
                      <p className="text-2xl font-bold text-gray-900">2</p>
                    </div>
                    <div className="p-3 bg-red-100 rounded-lg">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Staf Aktif</p>
                      <p className="text-2xl font-bold text-gray-900">18</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Ketepatan Waktu Disposisi Chart */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Laporan Ketepatan Waktu Disposisi</h3>
                    <p className="text-sm text-gray-600">Tren waktu rata-rata dari surat masuk hingga disposisi pertama</p>
                  </div>
                  <button
                    onClick={() => handleExportChart('ketepatan-waktu')}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={ketepatanWaktuData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="periode" />
                    <YAxis label={{ value: 'Hari', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="waktu_rata_rata" stroke="#3b82f6" strokeWidth={2} name="Waktu Rata-rata (hari)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Kinerja Staf Chart */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Laporan Kinerja Staf</h3>
                    <p className="text-sm text-gray-600">Perbandingan waktu rata-rata penyelesaian tugas per staf</p>
                  </div>
                  <button
                    onClick={() => handleExportChart('kinerja-staf')}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stafKinerjaData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nama" />
                    <YAxis label={{ value: 'Hari', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="rata_waktu" fill="#10b981" name="Rata-rata Waktu (hari)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Bottleneck Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Laporan Status Bottleneck</h3>
                      <p className="text-sm text-gray-600">Surat yang macet lebih dari 7 hari</p>
                    </div>
                    <button
                      onClick={() => handleExportCSV('bottleneck')}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Export CSV
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No. Surat</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Perihal</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Penugasan</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lama (Hari)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bottleneckData.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.nomor_surat}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.perihal}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.penugasan}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 border border-red-200">
                              {item.lama_hari} hari
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Frekuensi Disposisi */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Laporan Frekuensi Disposisi</h3>
                    <p className="text-sm text-gray-600">Peringkat kepala bidang berdasarkan volume pendelegasian</p>
                  </div>
                  <button
                    onClick={() => handleExportChart('frekuensi-disposisi')}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={frekuensiDisposisiData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="nama" type="category" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#8b5cf6" name="Total Disposisi" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Content Section - Audit & Integritas */}
          {activeSection === 'audit' && (
            <div className="space-y-6">
              {/* Audit Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Terverifikasi</p>
                      <p className="text-2xl font-bold text-green-600">245</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending</p>
                      <p className="text-2xl font-bold text-yellow-600">28</p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Perlu Revisi</p>
                      <p className="text-2xl font-bold text-red-600">12</p>
                    </div>
                    <div className="p-3 bg-red-100 rounded-lg">
                      <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Verifikasi Chart */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Audit Status Verifikasi</h3>
                    <p className="text-sm text-gray-600">Distribusi status verifikasi surat masuk</p>
                  </div>
                  <button
                    onClick={() => handleExportChart('status-verifikasi')}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
                <div className="flex justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={verifikasiStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {verifikasiStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Surat Tanpa File Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Surat Tanpa File</h3>
                      <p className="text-sm text-gray-600">Daftar surat yang belum memiliki file lampiran</p>
                    </div>
                    <button
                      onClick={() => handleExportCSV('surat-tanpa-file')}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Export CSV
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No. Surat</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pengirim</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verifikator</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {suratTanpaFileData.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.nomor_surat}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.pengirim}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.tanggal}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.verifikator}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-blue-600 hover:text-blue-800 font-medium">
                              Lihat Detail
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Log Aktivitas Pengguna */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Log Aktivitas Pengguna</h3>
                    <p className="text-sm text-gray-600">Riwayat aktivitas login dan perubahan data kritis</p>
                  </div>
                  <button
                    onClick={() => handleExportCSV('log-aktivitas')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { user: 'Admin 1', action: 'Login', timestamp: '2024-12-09 10:30:25', ip: '192.168.1.1' },
                    { user: 'Verifikator 2', action: 'Update Data Bidang', timestamp: '2024-12-09 09:15:10', ip: '192.168.1.5' },
                    { user: 'Kepala Bidang A', action: 'Logout', timestamp: '2024-12-09 08:45:30', ip: '192.168.1.10' },
                    { user: 'Admin 2', action: 'Hapus User', timestamp: '2024-12-08 16:20:15', ip: '192.168.1.2' }
                  ].map((log, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Activity className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{log.user}</p>
                          <p className="text-xs text-gray-500">{log.action}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-700">{log.timestamp}</p>
                        <p className="text-xs text-gray-500">IP: {log.ip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Authenticated>
  );
}