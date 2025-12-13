import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Calendar, Building2, User, FileText, X, Clock, ChevronRight } from 'lucide-react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { usePage } from '@inertiajs/react';

export default function ArsipSuratMasuk() {
  const { arsipSurat, stats, flash } = usePage().props
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSurat, setSelectedSurat] = useState(null);
  const [filters, setFilters] = useState({
    status_akhir: "",
    bidang: "",
    disposisi_oleh: "",
    tanggal_dari: "",
    tanggal_sampai: ""
  });

  const filteredData = arsipSurat.filter(item => {
    const matchSearch = searchQuery === "" ||
      item.nomor_surat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pengirim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.perihal.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus = !filters.status_akhir || item.status_akhir === filters.status_akhir;
    const matchBidang = !filters.bidang || item.bidang === filters.bidang;
    const matchDisposisi = !filters.disposisi_oleh || item.disposisi_oleh === filters.disposisi_oleh;

    return matchSearch && matchStatus && matchBidang && matchDisposisi;
  });

  const resetFilters = () => {
    setFilters({
      status_akhir: "",
      bidang: "",
      disposisi_oleh: "",
      tanggal_dari: "",
      tanggal_sampai: ""
    });
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== "").length;

  return (
    <Authenticated>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Arsip Surat Masuk</h1>
            <p className="mt-1 text-sm text-gray-600">Kelola dan akses arsip surat yang telah selesai diproses</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Arsip</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.total}</p>
                </div>
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Selesai</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {stats.selesai}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Diarsipkan</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {stats.arsip}
                  </p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari nomor surat, pengirim, atau perihal..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

            </div>

          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Menampilkan <span className="font-semibold text-gray-900">{filteredData.length}</span> dari {arsipSurat.length} arsip
            </p>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nomor Surat
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pengirim
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Perihal
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bidang
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((surat) => (
                    <tr key={surat.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {surat.nomor_surat}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {surat.pengirim}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {surat.perihal}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {surat.bidang}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(surat.tanggal_terima).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${surat.status_akhir.value === 3
                          ? 'bg-green-100 text-green-800'
                          : surat.status_akhir.value === 4
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                          }`}>
                          {surat.status_akhir.label}
                        </span>

                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setSelectedSurat(surat)}
                          className="text-blue-600 hover:text-blue-800 mr-3"
                        >
                          <Eye className="w-4 h-4 inline" />
                        </button>
                        <a
                          href={route('kepala.arsip-surat-masuk.download', surat.id)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <Download className="w-4 h-4 inline" />
                        </a>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-sm font-medium text-gray-900">Tidak ada arsip ditemukan</h3>
                <p className="text-sm text-gray-500 mt-1">Coba ubah kata kunci pencarian atau filter Anda</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {flash?.error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {flash.error}
        </div>
      )}

      {
        selectedSurat && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Detail Arsip Surat</h2>
                <button
                  onClick={() => setSelectedSurat(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nomor Surat</p>
                    <p className="mt-1 text-sm text-gray-900">{selectedSurat.nomor_surat}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedSurat.status_akhir.value === 3 // SELESAI
                      ? 'bg-green-100 text-green-800'
                      : selectedSurat.status_akhir.value === 4
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                      }`}>
                      {selectedSurat.status_akhir.label}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pengirim</p>
                    <p className="mt-1 text-sm text-gray-900">{selectedSurat.pengirim}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tanggal Terima</p>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedSurat.tanggal_terima).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-500">Perihal</p>
                    <p className="mt-1 text-sm text-gray-900">{selectedSurat.perihal}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Bidang</p>
                    <p className="mt-1 text-sm text-gray-900">{selectedSurat.bidang}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Disposisi Oleh</p>
                    <p className="mt-1 text-sm text-gray-900">{selectedSurat.disposisi_oleh}</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    Riwayat Disposisi
                  </h3>
                  <div className="space-y-3">
                    {selectedSurat.riwayat_disposisi.map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-2 h-2 rounded-full ${item.warna === 'green' ? 'bg-green-600'
                            : item.warna === 'yellow' ? 'bg-yellow-500'
                              : item.warna === 'red' ? 'bg-red-600'
                                : 'bg-blue-600'
                            }`} />
                          {index !== selectedSurat.riwayat_disposisi.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-200" />
                          )}
                        </div>

                        <div className="pb-3">
                          <p className="text-sm font-medium text-gray-900">
                            {item.judul}
                          </p>
                          <p className="text-xs text-gray-600">
                            {item.deskripsi}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(item.tanggal).toLocaleString('id-ID')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

                <div className="flex gap-3">
                  <a
                    href={route('kepala.arsip-surat-masuk.download', selectedSurat.id)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Unduh File Surat
                  </a>

                  <button
                    onClick={() => setSelectedSurat(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      }
    </Authenticated >
  );
}