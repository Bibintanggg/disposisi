import { Link, usePage } from '@inertiajs/react';
import { FileText, ChevronRight, Search } from 'lucide-react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { useState, useMemo } from 'react';

export default function DaftarTindakLanjut() {
    const { tugasList } = usePage().props;
    const [query, setQuery] = useState("");

    // FILTER LIST CLIENT-SIDE
    const filteredList = useMemo(() => {
        return tugasList.filter(item =>
            item.nomor_surat.toLowerCase().includes(query.toLowerCase()) ||
            item.perihal.toLowerCase().includes(query.toLowerCase()) ||
            item.dari_kepala.toLowerCase().includes(query.toLowerCase())
        );
    }, [query, tugasList]);

    return (
        <Authenticated>
            <div className="min-h-screen bg-gray-50">

                {/* HEADER */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <h1 className="text-2xl font-bold text-gray-900">Laporan Tindak Lanjut</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Pilih salah satu surat untuk membuat laporan tindak lanjut
                        </p>
                    </div>
                </div>

                {/* SEARCH BAR */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                    <div className="relative">
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Cari nomor surat / perihal / pengirim..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg 
                                       focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                       outline-none transition-all"
                        />
                    </div>
                </div>

                {/* LIST SURAT */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-4 pb-10">
                    {filteredList.length === 0 && (
                        <div className="bg-white border border-gray-200 p-6 rounded-lg text-center text-gray-500">
                            Tidak ada surat yang cocok dengan pencarian.
                        </div>
                    )}

                    {filteredList.map((item) => (
                        <Link
                            key={item.id}
                            href={route('staf.laporan-tindak.form', item.id)}
                            className="block bg-white border border-gray-200 rounded-xl p-5 shadow-sm 
                                       hover:shadow-md transition-all group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-blue-600" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">{item.nomor_surat}</p>
                                        <p className="text-lg font-semibold text-gray-900 mt-0.5">{item.perihal}</p>
                                        <p className="text-sm text-gray-600 mt-1">Dari: {item.dari_kepala}</p>
                                    </div>
                                </div>

                                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Authenticated>
    );
}
