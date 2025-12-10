import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Calendar, FileText, Users, ChevronDown, CheckCircle, Clock, Archive, ArrowUpRight, Paperclip, XCircle } from 'lucide-react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { router, usePage } from '@inertiajs/react';
import { SuratMasuk } from '@/types/surat-masuk';
import { SuratKeluarProps } from '@/types/surat-keluar';
import { DropdownPick } from './components/DropdownPick';
import { DatePicker } from './components/DatePicker';
import { Bidang } from '@/types/bidang';
import { Button } from '@/components/ui/button';

interface StatusBadge {
    label: string
    className: string
}

export default function ArsipGlobal() {
    const pageProps = usePage().props as any;
    const suratMasuk = pageProps.suratMasuk ?? { data: [], current_page: 1, prev_page_url: null, next_page_url: null };
    const suratKeluar = pageProps.suratKeluar ?? { data: [], current_page: 1, prev_page_url: null, next_page_url: null };
    const [activeTab, setActiveTab] = useState<'masuk' | 'keluar'>('masuk');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilter, setShowFilter] = useState(false)
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedSurat, setSelectedSurat] = useState(null);

    const [filters, setFilters] = useState({
        tanggalMulai: '',
        tanggalAkhir: '',
        sifat: '' as number | '',
        statusAkhir: '' as number | '',
        unitPengirim: '' as number | '',
        statusArsip: '' as number | ''
    });


    const getStatusBadgeClass = (StatusAkhir: number): StatusBadge => {
        switch (StatusAkhir) {
            case 1:
                return { label: "Baru", className: 'bg-green-100 text-green-800 border-green-200' };
            case 2:
                return { label: "Disposisi", className: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
            case 3:
                return { label: "Selesai", className: 'bg-indigo-100 text-indigo-800 border-indigo-200' };
            case 4:
                return { label: "Arsip", className: 'bg-purple-100 text-purple-800 border-purple-200' };
            default:
                return { label: "Baru", className: 'bg-gray-100 text-gray-800 border-gray-200' };
        }
    };

    const getStatusArsipClass = (StatusArsip: number): StatusBadge => {
        switch (StatusArsip) {
            case 1:
                return { label: "Sudah Diarsipkan", className: 'bg-green-100 text-green-800 border-green-200' };
            case 2:
                return { label: "Belum Diarsipkan", className: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
            default:
                return { label: "Belum Diarsipkan", className: 'bg-gray-100 text-gray-800 border-gray-200' };
        }
    };

    const sifatOptions = [
        { id: 1, label: "Biasa" },
        { id: 2, label: "Penting" },
        { id: 3, label: "Rahasia" },
        { id: 4, label: "Segera" },
    ];

    const statusAkhirOptions = [
        { id: 1, label: "Baru" },
        { id: 2, label: "Disposisi" },
        { id: 3, label: "Selesai" },
        { id: 4, label: "Arsip" },
    ];

    const getSifatInfo = (sifatSurat: number) => {
        switch (sifatSurat) {
            case 1: return { label: "Biasa", color: "bg-blue-600" };
            case 2: return { label: "Penting", color: "bg-orange-600" };
            case 3: return { label: "Rahasia", color: "bg-purple-600" };
            case 4: return { label: "Segera", color: "bg-red-600" };
            default: return { label: "Biasa", color: "bg-blue-600" };
        }
    };

    const getStatusInfo = (statusArsip: number) => {
        switch (statusArsip) {
            case 1: return { label: "Baru", color: "bg-green-200 border-green-600", icon: CheckCircle };
            case 2: return { label: "Disposisi", color: "bg-yellow-600", icon: Clock };
            case 3: return { label: "Selesai", color: "bg-indigo-600", icon: CheckCircle };
            case 4: return { label: "Arsip", color: "bg-purple-600", icon: Archive };
            default: return { label: "Baru", color: "bg-gray-600", icon: Clock };
        }
    };


    const getSifatBadgeClass = (sifatSurat: number): StatusBadge => {
        switch (sifatSurat) {
            case 1:
                return { label: "Biasa", className: 'bg-blue-100 text-blue-800 border-blue-200' };
            case 2:
                return { label: "Penting", className: 'bg-orange-100 text-orange-800 border-orange-200' };
            case 3:
                return { label: "Rahasia", className: 'bg-purple-100 text-purple-800 border-purple-200' };
            case 4:
                return { label: "Segera", className: 'bg-red-100 text-red-800 border-red-200' };
            default:
                return { label: "Biasa", className: 'bg-blue-100 text-blue-800 border-blue-200' };
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        router.get('/admin/arsip-global', {
            tab: activeTab,
            search: value,

            sifat: activeTab === 'masuk' ? filters.sifat : '',
            statusAkhir: activeTab === 'masuk' ? filters.statusAkhir : '',

            unitPengirim: activeTab === 'keluar' ? filters.unitPengirim : '',
            statusArsip: activeTab === 'keluar' ? filters.statusArsip : '',

            tanggalMulai: filters.tanggalMulai,
            tanggalAkhir: filters.tanggalAkhir,
        }, {
            preserveState: true,
            replace: true
        });
    };



    const applyFilters = () => {
        router.get('/admin/arsip-global', {
            tab: activeTab,
            search: searchQuery,

            sifat: activeTab === 'masuk' ? filters.sifat : '',
            statusAkhir: activeTab === 'masuk' ? filters.statusAkhir : '',

            unitPengirim: activeTab === 'keluar' ? filters.unitPengirim : '',
            statusArsip: activeTab === 'keluar' ? filters.statusArsip : '',

            tanggalMulai: filters.tanggalMulai,
            tanggalAkhir: filters.tanggalAkhir,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };


    const resetFilters = () => {
        setFilters({
            tanggalMulai: '',
            tanggalAkhir: '',
            sifat: '',
            statusAkhir: '',
            unitPengirim: '',
            statusArsip: ''
        })

        setSearchQuery('')
        router.get('/admin/arsip-global', {}, {
            preserveState: false
        });
    }

    const unitOptions = (pageProps.bidang || []).map((b: any) => ({
        id: b.id,
        label: b.nama_bidang
    }));



    const arsipOptions = [
        { id: 1, label: "Sudah Diarsipkan" },
        { id: 2, label: "Belum Diarsipkan" }
    ];

    return (
        <Authenticated>
            <div className="py-6">
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
                                        <DatePicker />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Calendar className="w-4 h-4 inline mr-1" />
                                            Tanggal Akhir
                                        </label>
                                        <DatePicker />
                                    </div>
                                    {activeTab === 'masuk' && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Sifat Surat
                                                </label>
                                                <DropdownPick
                                                    data={sifatOptions}
                                                    valueKey="id"
                                                    labelKey="label"
                                                    value={filters.sifat === '' ? '' : filters.sifat}
                                                    onChange={(v) => setFilters(prev => ({ ...prev, sifat: Number(v) }))}
                                                    placeholder="Pilih Sifat Surat"
                                                />

                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Status Akhir
                                                </label>
                                                <DropdownPick
                                                    data={statusAkhirOptions}
                                                    valueKey="id"
                                                    labelKey="label"
                                                    value={filters.statusAkhir === '' ? '' : filters.statusAkhir}
                                                    onChange={(v) => setFilters(prev => ({ ...prev, statusAkhir: Number(v) }))}
                                                    placeholder="Pilih Status Akhir"
                                                />

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
                                                <DropdownPick
                                                    data={unitOptions}
                                                    valueKey="id"
                                                    labelKey="label"
                                                    value={filters.unitPengirim === '' ? '' : filters.unitPengirim}
                                                    onChange={(v) => setFilters(prev => ({ ...prev, unitPengirim: Number(v) }))}
                                                    placeholder="Pilih Unit Pengirim"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Status Arsip
                                                </label>
                                                <DropdownPick
                                                    data={arsipOptions}
                                                    valueKey="id"
                                                    labelKey="label"
                                                    value={filters.statusArsip === '' ? '' : filters.statusArsip}
                                                    onChange={(v) => setFilters(prev => ({ ...prev, statusArsip: Number(v) }))}
                                                    placeholder="Pilih Status Arsip"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={applyFilters}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        Terapkan Filter
                                    </button>
                                    <button
                                        onClick={resetFilters}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
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
                                        {suratMasuk.data.map((surat: any) => (
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
                                                        {getSifatBadgeClass(surat.surat_sifat).label}
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
                                                <button
                                                    onClick={() => { setSelectedSurat(surat); setShowDetailModal(true); }}
                                                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    Detail
                                                </button>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Menampilkan <span className="font-medium">1</span> sampai <span className="font-medium">{suratMasuk.data.length}</span> dari{' '}
                                    <span className="font-medium">{suratMasuk.data.length}</span> hasil
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50"
                                        disabled={!suratMasuk.prev_page_url}
                                        onClick={() => window.location.href = suratMasuk.prev_page_url!}
                                    >
                                        Previous
                                    </button>
                                    <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
                                        {suratMasuk.current_page}
                                    </button>
                                    <button
                                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50"
                                        disabled={!suratMasuk.next_page_url}
                                        onClick={() => window.location.href = suratMasuk.next_page_url!}
                                    >
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
                                        {suratKeluar.data.map((surat) => (
                                            <tr key={surat.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {surat.nomor_surat}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                    {surat.penerima}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700 max-w-[13rem] truncate whitespace-nowrap overflow-hidden">
                                                    {surat.isi_surat}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                    {surat.unit_pengirim?.nama_bidang ?? "-"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                    {new Date(surat.tanggal_kirim).toLocaleDateString('id-ID')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusArsipClass(surat.status_arsip).className}`}>
                                                        {getStatusArsipClass(surat.status_arsip).label}
                                                    </span>
                                                </td>
                                                <button
                                                    onClick={() => { setSelectedSurat(surat); setShowDetailModal(true); }}
                                                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    Detail
                                                </button>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Menampilkan <span className="font-medium">1</span> sampai <span className="font-medium">{suratKeluar.data.length}</span> dari{' '}
                                    <span className="font-medium">{suratKeluar.data.length}</span> hasil
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50"
                                        disabled={!suratKeluar.prev_page_url}
                                        onClick={() => window.location.href = suratKeluar.prev_page_url!}
                                    >
                                        Previous
                                    </button>
                                    <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
                                        {suratKeluar.current_page}
                                    </button>
                                    <button
                                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50"
                                        disabled={!suratKeluar.next_page_url}
                                        onClick={() => window.location.href = suratKeluar.next_page_url!}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>


            {showDetailModal && selectedSurat && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <FileText className="text-blue-600" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {activeTab === 'masuk' ? 'Detail Surat Masuk' : 'Detail Surat Keluar'}
                                    </h2>
                                    <p className="text-sm text-gray-500">{selectedSurat.nomor_surat || '-'}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                            >
                                <XCircle className="text-gray-400 hover:text-gray-600" size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-500 mb-1">Nomor Surat</p>
                                        <p className="text-base font-bold text-gray-900">{selectedSurat.nomor_surat || '-'}</p>
                                    </div>

                                    {activeTab === 'masuk' ? (
                                        <>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-500 mb-1">Pengirim</p>
                                                <p className="text-base text-gray-900">{selectedSurat.pengirim || '-'}</p>
                                            </div>

                                                <div>
                                                    <p className="text-sm font-semibold text-gray-500 mb-1">Tanggal Terima</p>
                                                    <p className="text-base text-gray-900">
                                                        {selectedSurat.tanggal_terima
                                                            ? new Date(selectedSurat.tanggal_terima).toLocaleDateString('id-ID')
                                                            : '-'}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-sm font-semibold text-gray-500 mb-1">Sifat Surat</p>
                                                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-white ${getSifatInfo(selectedSurat.sifat_surat || selectedSurat.sifat || 1).color}`}>
                                                        <span className="font-semibold">
                                                            {getSifatInfo(selectedSurat.sifat_surat || selectedSurat.sifat || 1).label}
                                                        </span>
                                                    </div>
                                                </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-500 mb-1">Penerima</p>
                                                <p className="text-base text-gray-900">{selectedSurat.penerima || '-'}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-500 mb-1">Unit Pengirim</p>
                                                <p className="text-base text-gray-900">
                                                    {selectedSurat.unit_pengirim?.nama_bidang || '-'}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-500 mb-1">Tanggal Kirim</p>
                                                <p className="text-base text-gray-900">
                                                    {selectedSurat.tanggal_kirim
                                                        ? new Date(selectedSurat.tanggal_kirim).toLocaleDateString('id-ID')
                                                        : '-'}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-500 mb-1">Tanggal Surat</p>
                                        <p className="text-base text-gray-900">
                                            {selectedSurat.tanggal_surat
                                                ? new Date(selectedSurat.tanggal_surat).toLocaleDateString('id-ID', {
                                                    weekday: 'long',
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })
                                                : '-'}
                                        </p>
                                    </div>



                                    <div>
                                        <p className="text-sm font-semibold text-gray-500 mb-1">
                                            {activeTab === 'masuk' ? 'Status Akhir' : 'Status Arsip'}
                                        </p>
                                        {activeTab === 'masuk' ? (
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${getStatusInfo(selectedSurat.status_akhir || 1).color}`}>
                                                {(() => {
                                                    const StatusIcon = getStatusInfo(selectedSurat.status_akhir || 1).icon;
                                                    return <StatusIcon size={16} />;
                                                })()}
                                                <span className="font-semibold">
                                                    {getStatusInfo(selectedSurat.status_akhir || 1).label}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusArsipClass(selectedSurat.status_arsip || 2).className}`}>
                                                {getStatusArsipClass(selectedSurat.status_arsip || 2).label}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-sm font-semibold text-gray-500 mb-2">Isi/Perihal Surat</p>
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <p className="text-base text-gray-900 whitespace-pre-wrap">
                                        {selectedSurat.isi_surat || '-'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 bg-gray-50">
                            <Button
                                onClick={() => setShowDetailModal(false)}
                                className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                            >
                                Tutup
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Authenticated>
    );
}