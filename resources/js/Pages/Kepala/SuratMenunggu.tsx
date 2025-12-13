import { useState } from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Search, SlidersHorizontal, Clock, AlertTriangle, FileText, ArrowRight, Bell, LayoutGrid, List } from 'lucide-react';
import { router, usePage } from '@inertiajs/react';
import { SuratMasuk } from '@/types/surat-masuk';
import SuratCard from './components/SuratCard';
import SuratRow from './components/SuratRow';
import { PageProps } from '@/types';

interface Props extends PageProps {
    suratMenunggu: SuratMasuk[];
}

export default function SuratMenunggu() {
    const { suratMenunggu } = usePage<Props>().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [filterSifat, setFilterSifat] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'urgent'>('oldest');
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

    const sifatNumber = {
        1: "Biasa",
        2: "Penting",
        3: "Rahasia",
        4: "Segera"
    };

    const processedSurat = (suratMenunggu || [])
        .filter((surat) => {
            const isi = surat.isi_surat || ""; // fallback kalau isi_surat undefined

            const matchSearch =
                surat.nomor_surat?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                isi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                surat.pengirim?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchSifat =
                filterSifat === "all" ||
                surat.sifat_surat === parseInt(filterSifat);

            return matchSearch && matchSifat;
        })
        .sort((a, b) => {
            if (sortBy === "oldest") {
                return new Date(a.tanggal_terima).getTime() - new Date(b.tanggal_terima).getTime();
            }
            if (sortBy === "newest") {
                return new Date(b.tanggal_terima).getTime() - new Date(a.tanggal_terima).getTime();
            }
            if (sortBy === "urgent") {
                const urgencyRank: Record<number, number> = {
                    4: 1,
                    2: 2,
                    3: 3,
                    1: 4,
                };
                return urgencyRank[a.sifat_surat] - urgencyRank[b.sifat_surat];
            }
            return 0;
        });

    // Stats
    const totalMenunggu = processedSurat.length;
    const urgenCount = processedSurat.filter(s => s.sifat_surat === 4 || s.sifat_surat === 2).length;

    const handleDisposisi = (id: number) => {
        router.visit(`/kepala/disposisi/${id}`);
    };

    return (
        <Authenticated>
            <div className="min-h-screen bg-gray-50">
                {/* Header - Netflix style */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-1">Surat Menunggu Disposisi</h1>
                                <p className="text-sm text-gray-600">Surat yang telah diverifikasi dan siap untuk didisposisikan</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Widget Ringkasan */}
                <div className="bg-gray-50 border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-xs font-medium text-gray-600 mb-1">Total Menunggu</div>
                                        <div className="text-3xl font-bold text-gray-900">{totalMenunggu}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">Surat perlu disposisi</div>
                                    </div>
                                    <div className="p-3 bg-blue-50 rounded-lg">
                                        <FileText className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-xs font-medium text-gray-600 mb-1">Urgen Belum Diproses</div>
                                        <div className="text-3xl font-bold text-red-600">{urgenCount}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">Penting & Segera</div>
                                    </div>
                                    <div className="p-3 bg-red-50 rounded-lg">
                                        <AlertTriangle className="w-6 h-6 text-red-600" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search & Filter Bar - Clean & Minimal */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex items-center gap-3">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari nomor surat atau isi_surat..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Filter Sifat */}
                            <select
                                value={filterSifat}
                                onChange={(e) => {
                                    setFilterSifat(e.target.value); // JANGAN konversi ke number
                                }}
                                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium"
                            >
                                <option value="all">Semua Sifat</option>
                                <option value="1">Biasa</option>  {/* value string */}
                                <option value="2">Penting</option>
                                <option value="3">Rahasia</option>
                                <option value="4">Segera</option>
                            </select>

                            {/* View Mode Toggle */}
                            <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                                <button
                                    onClick={() => setViewMode('table')}
                                    className={`p-1.5 rounded transition-colors ${viewMode === 'table'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    title="Table view"
                                >
                                    <List className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-1.5 rounded transition-colors ${viewMode === 'grid'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    title="Grid view"
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-6 py-6">
                    {processedSurat.length > 0 ? (
                        <>
                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {processedSurat.map((surat) => (
                                        <SuratCard
                                            key={surat.id}
                                            surat={surat}
                                            onDisposisi={handleDisposisi}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50 border-b border-gray-200">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Sifat
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Nomor Surat
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Tanggal Surat
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Isi Surat
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Pengirim
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Menunggu
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Aksi
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {processedSurat.map((surat) => (
                                                    <SuratRow
                                                        key={surat.id}
                                                        surat={surat}
                                                        onDisposisi={handleDisposisi}
                                                    />
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                <FileText className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Tidak ada surat
                            </h3>
                            <p className="text-sm text-gray-600 max-w-sm mx-auto">
                                {searchQuery || filterSifat !== 'all'
                                    ? 'Tidak ada surat yang sesuai dengan filter Anda'
                                    : 'Semua surat sudah didisposisikan'
                                }
                            </p>
                            {(searchQuery || filterSifat !== 'all') && (
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setFilterSifat('all');
                                    }}
                                    className="mt-4 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors"
                                >
                                    Reset Filter
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Authenticated>
    );
}