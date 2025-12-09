import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Calendar, FileText, Users, ChevronDown } from 'lucide-react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';
import { SuratMasuk } from '@/types/surat-masuk';
import { SuratKeluarProps } from '@/types/surat-keluar';

interface StatusBadge {
    label: string
    className: string
}

export default function ArsipGlobal() {
    const { suratMasuk, suratKeluar } = usePage().props;
    const [activeTab, setActiveTab] = useState<'masuk' | 'keluar'>('masuk');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilter, setShowFilter] = useState(false);

    const getStatusBadgeClass = (statusArsip: number): StatusBadge => {
        switch (statusArsip) {
            case 1:
                return {label: "Baru", className: 'bg-green-100 text-green-800 border-green-200'};
            case 2:
                return {label: "Disposisi", className: 'bg-yellow-100 text-yellow-800 border-yellow-200'};
            case 3:
                return {label: "Selesai", className: 'bg-indigo-100 text-indigo-800 border-indigo-200'};
            case 4:
                return {label: "Arsip", className: 'bg-purple-100 text-purple-800 border-purple-200'};
            default:
                return {label: "Baru", className: 'bg-gray-100 text-gray-800 border-gray-200'};
        }
    };

    const getSifatBadgeClass = (sifatSurat: number): StatusBadge => {
        switch (sifatSurat) {
            case 1 :
                return {label: "Biasa", className: 'bg-blue-100 text-blue-800 border-blue-200'};
            case 2:
                return {label: "Penting", className: 'bg-orange-100 text-orange-800 border-orange-200'};
            case 3:
                return {label: "Rahasia", className: 'bg-purple-100 text-purple-800 border-purple-200'};
            case 4:
                return {label: "Segera", className: 'bg-red-100 text-red-800 border-red-200'};
            default:
                return {label: "Biasa", className: 'bg-blue-100 text-blue-800 border-blue-200'};
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const filteredSuratMasuk = suratMasuk.filter((surat: SuratMasuk) => (
        surat.nomor_surat.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surat.isi_surat.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surat.pengirim.toLowerCase().includes(searchQuery.toLowerCase()) 
    ))
    return (
        <Authenticated>
            <div className="py-6">
                {/* Header Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Arsip Global</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Kelola dan pantau seluruh arsip surat masuk dan keluar organisasi
                        </p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200 mb-6">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('masuk')}
                                className={`${activeTab === 'masuk'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2`}
                            >
                                <FileText className="w-5 h-5" />
                                Surat Masuk (Global)
                            </button>
                            <button
                                onClick={() => setActiveTab('keluar')}
                                className={`${activeTab === 'keluar'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2`}
                            >
                                <FileText className="w-5 h-5" />
                                Surat Keluar (Global)
                            </button>
                        </nav>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <div className="relative flex-1 w-full sm:max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Cari nomor surat, perihal, atau pengirim..."
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 w-full sm:w-auto">
                                <button
                                    onClick={() => setShowFilter(!showFilter)}
                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Filter className="w-5 h-5" />
                                    <span className="hidden sm:inline">Filter</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${showFilter ? 'rotate-180' : ''}`} />
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                    <Download className="w-5 h-5" />
                                    <span className="hidden sm:inline">Export</span>
                                </button>
                            </div>
                        </div>

                        {/* Advanced Filter Panel */}
                        {showFilter && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Calendar className="w-4 h-4 inline mr-1" />
                                            Tanggal Mulai
                                        </label>
                                        <input
                                            type="date"
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
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    {activeTab === 'masuk' && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Sifat Surat
                                                </label>
                                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                                    <option value="">Semua</option>
                                                    <option value="Sangat Segera">Sangat Segera</option>
                                                    <option value="Segera">Segera</option>
                                                    <option value="Biasa">Biasa</option>
                                                    <option value="Rahasia">Rahasia</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Status Akhir
                                                </label>
                                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                                    <option value="">Semua</option>
                                                    <option value="Selesai">Selesai</option>
                                                    <option value="Dalam Proses">Dalam Proses</option>
                                                    <option value="Tertunda">Tertunda</option>
                                                </select>
                                            </div>
                                        </>
                                    )}
                                    {activeTab === 'keluar' && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    <Users className="w-4 h-4 inline mr-1" />
                                                    Unit Pengirim
                                                </label>
                                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                                    <option value="">Semua Unit</option>
                                                    <option value="sekretariat">Sekretariat</option>
                                                    <option value="keuangan">Keuangan</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Status Arsip
                                                </label>
                                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                                    <option value="">Semua</option>
                                                    <option value="Terarsip">Terarsip</option>
                                                    <option value="Belum Diarsipkan">Belum Diarsipkan</option>
                                                </select>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        Terapkan Filter
                                    </button>
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                        Reset
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    {activeTab === 'masuk' && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                No. Surat
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Pengirim
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Perihal
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Sifat
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tanggal Terima
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status Akhir
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredSuratMasuk.map((surat: any) => (
                                            <tr key={surat.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {surat.nomor_surat}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                    {surat.pengirim}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                                                    {surat.isi_surat}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSifatBadgeClass(surat.sifat).className}`}>
                                                        {getSifatBadgeClass(surat.sifat).label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                    {new Date(surat.tanggal_terima).toLocaleDateString('id-ID')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadgeClass(surat.status_akhir).className}`}>
                                                        {getStatusBadgeClass(surat.status_akhir).label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <button className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium">
                                                        <Eye className="w-4 h-4" />
                                                        Detail
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Menampilkan <span className="font-medium">1</span> sampai <span className="font-medium">2</span> dari{' '}
                                    <span className="font-medium">2</span> hasil
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50" disabled>
                                        Previous
                                    </button>
                                    <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
                                        1
                                    </button>
                                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50" disabled>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'keluar' && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                No. Surat
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Penerima
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Perihal
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Unit Pengirim
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tanggal Kirim
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status Arsip
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {suratKeluar.map((surat) => (
                                            <tr key={surat.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {surat.nomor_surat}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                    {surat.penerima}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                                                    {surat.perihal}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                    {surat.unit_pengirim}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                    {new Date(surat.tanggal_kirim).toLocaleDateString('id-ID')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadgeClass(surat.status_arsip)}`}>
                                                        {surat.status_arsip}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <div className="flex gap-2">
                                                        <button className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium">
                                                            <Eye className="w-4 h-4" />
                                                            Detail
                                                        </button>
                                                        <button className="inline-flex items-center gap-1 text-green-600 hover:text-green-800 font-medium">
                                                            <Download className="w-4 h-4" />
                                                            File
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Menampilkan <span className="font-medium">1</span> sampai <span className="font-medium">1</span> dari{' '}
                                    <span className="font-medium">1</span> hasil
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50" disabled>
                                        Previous
                                    </button>
                                    <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
                                        1
                                    </button>
                                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50" disabled>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Authenticated>
    );
}