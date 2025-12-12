import React, { useState } from 'react';
import { Filter, TrendingUp, Clock, CheckCircle2, AlertCircle, Users, Calendar, Download, BarChart3 } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Authenticated from "@/Layouts/AuthenticatedLayout";

// Mock data untuk demo
const mockStafData = [
  {
    id: 1,
    nama: "Ahmad Fauzi",
    total_tugas: 45,
    tugas_selesai: 38,
    tugas_proses: 5,
    tugas_belum: 2,
    rata_hari: 3.2,
    tingkat_penyelesaian: 84
  },
  {
    id: 2,
    nama: "Siti Nurhaliza",
    total_tugas: 52,
    tugas_selesai: 48,
    tugas_proses: 3,
    tugas_belum: 1,
    rata_hari: 2.8,
    tingkat_penyelesaian: 92
  },
  {
    id: 3,
    nama: "Budi Santoso",
    total_tugas: 38,
    tugas_selesai: 30,
    tugas_proses: 6,
    tugas_belum: 2,
    rata_hari: 4.1,
    tingkat_penyelesaian: 79
  },
  {
    id: 4,
    nama: "Dewi Lestari",
    total_tugas: 41,
    tugas_selesai: 35,
    tugas_proses: 4,
    tugas_belum: 2,
    rata_hari: 3.5,
    tingkat_penyelesaian: 85
  }
];

const mockTugasTertunda = [
  {
    id: 1,
    staf: "Ahmad Fauzi",
    nomor_surat: "045/SM/XII/2024",
    perihal: "Laporan Keuangan Q4",
    hari_tertunda: 8,
    status: "Proses"
  },
  {
    id: 2,
    staf: "Budi Santoso",
    nomor_surat: "052/SM/XII/2024",
    perihal: "Evaluasi Program Kerja",
    hari_tertunda: 12,
    status: "Belum"
  },
  {
    id: 3,
    staf: "Budi Santoso",
    nomor_surat: "061/SM/XII/2024",
    perihal: "Koordinasi Antar Bidang",
    hari_tertunda: 9,
    status: "Proses"
  }
];

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

export default function LaporanKinerja() {
  const [filters, setFilters] = useState({
    periode: 'bulan_ini',
    staf: '',
    status: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Data untuk grafik batang (beban kerja)
  const bebanKerjaData = mockStafData.map(staf => ({
    nama: staf.nama.split(' ')[0],
    'Total Tugas': staf.total_tugas
  }));

  // Data untuk pie chart (status tugas keseluruhan)
  const totalSelesai = mockStafData.reduce((sum, staf) => sum + staf.tugas_selesai, 0);
  const totalProses = mockStafData.reduce((sum, staf) => sum + staf.tugas_proses, 0);
  const totalBelum = mockStafData.reduce((sum, staf) => sum + staf.tugas_belum, 0);

  const statusData = [
    { name: 'Selesai', value: totalSelesai },
    { name: 'Proses', value: totalProses },
    { name: 'Belum', value: totalBelum }
  ];

  const totalTugas = mockStafData.reduce((sum, staf) => sum + staf.total_tugas, 0);
  const rataRataPenyelesaian = (mockStafData.reduce((sum, staf) => sum + staf.tingkat_penyelesaian, 0) / mockStafData.length).toFixed(1);

  return (
    <Authenticated>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Laporan Kinerja Staf</h1>
            <p className="mt-1 text-sm text-gray-600">Monitoring dan evaluasi kinerja tim dalam penyelesaian tugas disposisi</p>
          </div>

          {/* Filter Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filter Laporan
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Export Data
              </button>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Periode</label>
                    <select
                      value={filters.periode}
                      onChange={(e) => setFilters({...filters, periode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="bulan_ini">Bulan Ini</option>
                      <option value="3_bulan">3 Bulan Terakhir</option>
                      <option value="6_bulan">6 Bulan Terakhir</option>
                      <option value="tahun_ini">Tahun Ini</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Staf</label>
                    <select
                      value={filters.staf}
                      onChange={(e) => setFilters({...filters, staf: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Semua Staf</option>
                      {mockStafData.map(staf => (
                        <option key={staf.id} value={staf.id}>{staf.nama}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status Tugas</label>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters({...filters, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Semua Status</option>
                      <option value="selesai">Selesai</option>
                      <option value="proses">Proses</option>
                      <option value="belum">Belum</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Staf</p>
                  <p className="text-3xl font-semibold text-gray-900 mt-2">{mockStafData.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Tugas</p>
                  <p className="text-3xl font-semibold text-gray-900 mt-2">{totalTugas}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tingkat Penyelesaian</p>
                  <p className="text-3xl font-semibold text-gray-900 mt-2">{rataRataPenyelesaian}%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tugas Tertunda</p>
                  <p className="text-3xl font-semibold text-gray-900 mt-2">{mockTugasTertunda.length}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Bar Chart - Beban Kerja */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribusi Beban Kerja</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bebanKerjaData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="nama" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="Total Tugas" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart - Status Tugas */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Tugas Keseluruhan</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table - Ringkasan Per Staf */}
          <div className="bg-white border border-gray-200 rounded-lg mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Ringkasan Kinerja Per Staf</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Staf
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Tugas
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Selesai
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Proses
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Belum
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rata-rata Hari
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tingkat Penyelesaian
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockStafData.map((staf) => (
                    <tr key={staf.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {staf.nama.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="ml-3 text-sm font-medium text-gray-900">{staf.nama}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900 font-semibold">
                        {staf.total_tugas}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {staf.tugas_selesai}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {staf.tugas_proses}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {staf.tugas_belum}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                        <div className="flex items-center justify-center gap-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {staf.rata_hari} hari
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                staf.tingkat_penyelesaian >= 90 ? 'bg-green-600' :
                                staf.tingkat_penyelesaian >= 80 ? 'bg-blue-600' :
                                'bg-yellow-600'
                              }`}
                              style={{ width: `${staf.tingkat_penyelesaian}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{staf.tingkat_penyelesaian}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tugas Tertunda Section */}
          <div className="bg-white border border-red-200 rounded-lg">
            <div className="px-6 py-4 bg-red-50 border-b border-red-200 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-red-900">Tugas Tertunda (&gt; 7 Hari)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Staf
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nomor Surat
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Perihal
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hari Tertunda
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockTugasTertunda.map((tugas) => (
                    <tr key={tugas.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {tugas.staf}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {tugas.nomor_surat}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {tugas.perihal}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {tugas.hari_tertunda} hari
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          tugas.status === 'Proses' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {tugas.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}