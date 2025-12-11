import { useState } from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { ArrowLeft, FileText, Calendar, User, AlertTriangle, Bell, Download, Send, X, Plus } from 'lucide-react';
import { router, usePage } from '@inertiajs/react';
import { SuratMasuk } from '@/types/surat-masuk';

interface Staff {
    id: number;
    name: string;
    bidang: string;
}

interface Props {
    surat: SuratMasuk;
    staffList: Staff[];
}

export default function LihatDisposisi() {
    const { surat, staffList } = usePage<Props>().props;
    const [instruksi, setInstruksi] = useState('');
    const [selectedStaff, setSelectedStaff] = useState<number[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const sifatLabel = {
        1: { text: 'Biasa', class: 'bg-gray-100 text-gray-600' },
        2: { text: 'Penting', class: 'bg-orange-100 text-orange-700', icon: 'bell' },
        3: { text: 'Rahasia', class: 'bg-purple-100 text-purple-700' },
        4: { text: 'Segera', class: 'bg-red-100 text-red-700', icon: 'alert' }
    };

    const badge = sifatLabel[surat.sifat_surat as keyof typeof sifatLabel] || sifatLabel[1];

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(new Date(dateString));
    };

    const handleBack = () => {
        router.visit('/kepala/surat-menunggu');
    };

    const handleStaffToggle = (staffId: number) => {
        setSelectedStaff(prev =>
            prev.includes(staffId)
                ? prev.filter(id => id !== staffId)
                : [...prev, staffId]
        );
    };

    const handleSubmitDisposisi = async () => {
        if (!instruksi.trim()) {
            alert('Instruksi disposisi harus diisi!');
            return;
        }

        if (selectedStaff.length === 0) {
            alert('Pilih minimal satu staf penerima disposisi!');
            return;
        }

        setIsSubmitting(true);

        router.post('/kepala/disposisi/submit', {
            surat_id: surat.id,
            instruksi: instruksi,
            staff_ids: selectedStaff
        }, {
            onSuccess: () => {
                router.visit('/kepala/surat-menunggu');
            },
            onError: (errors) => {
                console.error(errors);
                alert('Gagal menyimpan disposisi');
                setIsSubmitting(false);
            }
        });
    };

    const filteredStaff = staffList.filter(staff =>
        staff.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    )

    return (
        <Authenticated>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleBack}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Lihat & Disposisi Surat</h1>
                                <p className="text-sm text-gray-600">Baca surat dan buat instruksi disposisi</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Detail Surat - 2/3 width */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Info Card */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded ${badge.class}`}>
                                                {badge.icon === 'alert' && <AlertTriangle className="w-4 h-4" />}
                                                {badge.icon === 'bell' && <Bell className="w-4 h-4" />}
                                                {badge.text}
                                            </span>
                                        </div>
                                        <div className="text-sm font-mono text-gray-500 mb-2">
                                            {surat.nomor_surat}
                                        </div>
                                    </div>
                                </div>

                                {/* Info Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                            <Calendar className="w-4 h-4" />
                                            <span className="font-medium">Tanggal Surat</span>
                                        </div>
                                        <div className="text-gray-900">{formatDate(surat.tanggal_surat)}</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                            <Calendar className="w-4 h-4" />
                                            <span className="font-medium">Tanggal Terima</span>
                                        </div>
                                        <div className="text-gray-900">{formatDate(surat.tanggal_terima)}</div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                            <User className="w-4 h-4" />
                                            <span className="font-medium">Pengirim</span>
                                        </div>
                                        <div className="text-gray-900 font-medium">{surat.pengirim}</div>
                                    </div>
                                </div>

                                {/* Isi Surat */}
                                <div className="border-t border-gray-200 pt-6">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                                        <FileText className="w-4 h-4" />
                                        Isi Surat
                                    </div>
                                    <div className="prose prose-sm max-w-none">
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                            {surat.isi_surat}
                                        </p>
                                    </div>
                                </div>

                                {/* File Attachment */}
                                {surat.gambar && (
                                    <div className="border-t border-gray-200 pt-6 mt-6">
                                        <div className="text-sm font-semibold text-gray-900 mb-3">Lampiran</div>
                                        <a
                                            href={`/kepala/disposisi/file/${surat.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
                                        >
                                            <Download className="w-4 h-4" />
                                            Lihat File Surat
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Form Disposisi - 1/3 width */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
                                <h2 className="text-lg font-bold text-gray-900 mb-1">Buat Disposisi</h2>
                                <p className="text-sm text-gray-600 mb-6">Tulis instruksi dan pilih penerima</p>

                                {/* Instruksi */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Instruksi Disposisi <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={instruksi}
                                        onChange={(e) => setInstruksi(e.target.value)}
                                        placeholder="Tuliskan instruksi atau arahan untuk staf..."
                                        rows={6}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                                    />
                                    <div className="text-xs text-gray-500 mt-1">
                                        {instruksi.length} karakter
                                    </div>
                                </div>

                                {/* Pilih Staf */}
                                <div className="mb-6">
                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            placeholder="Cari staf..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        />
                                    </div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Pilih Penerima Disposisi <span className="text-red-500">*</span>
                                    </label>
                                    <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-2">
                                        {filteredStaff.map((staff) => (
                                            <label
                                                key={staff.id}
                                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${selectedStaff.includes(staff.id)
                                                    ? 'bg-blue-50 border-2 border-blue-500'
                                                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedStaff.includes(staff.id)}
                                                    onChange={() => handleStaffToggle(staff.id)}
                                                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                                />

                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-medium text-gray-900 truncate">
                                                        {staff.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 truncate">
                                                        {staff.bidang}
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2">
                                        {selectedStaff.length} staf dipilih
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-2">
                                    <button
                                        onClick={handleSubmitDisposisi}
                                        disabled={isSubmitting || !instruksi.trim() || selectedStaff.length === 0}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-semibold"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Menyimpan...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                Kirim Disposisi
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={handleBack}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 rounded-lg transition-colors font-medium"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}