import React, { useState } from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { ArrowLeft, FileText, Upload, X, Eye, AlertCircle, CheckCircle } from 'lucide-react';
import { usePage, router } from "@inertiajs/react";
import { PageProps } from '@/types';

type FormDataLaporan = {
    judul_laporan: string;
    deskripsi_laporan: string;
    file_laporan: File | null;
    tandai_selesai: boolean;
};

type Tugas = {
    id: number;
    nomor_surat: string;
    perihal: string;
    dari_kepala: string;
    instruksi: string;
    has_file: boolean;
};

interface LaporanPageProps extends PageProps {
    tugas: Tugas;
}

export default function LaporanTindakLanjut() {
    const page = usePage<LaporanPageProps>().props;
    const tugas: Tugas = page.tugas;

    const [formData, setFormData] = useState<FormDataLaporan>({
        judul_laporan: '',
        deskripsi_laporan: '',
        file_laporan: null,
        tandai_selesai: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        setFormData({ ...formData, file_laporan: file });
        setFileName(file.name);
    };


    const handleRemoveFile = () => {
        setFormData({ ...formData, file_laporan: null });
        setFileName('');
    };

    const handleSubmit = () => {
        if (!formData.deskripsi_laporan.trim()) {
            alert('Isi laporan wajib diisi!');
            return;
        }

        setIsSubmitting(true);

        const submitData = new FormData();
        submitData.append('judul_laporan', formData.judul_laporan);
        submitData.append('deskripsi_laporan', formData.deskripsi_laporan);
        submitData.append('tandai_selesai', formData.tandai_selesai ? '1' : '0');
        if (formData.file_laporan) {
            submitData.append('file_laporan', formData.file_laporan);
        }

        router.post(route('staf.laporan-tindak.store'), submitData, {
            onSuccess: () => {
                setIsSubmitting(false);
                router.visit(route('staf.laporan-tindak'));
            },
            onError: (errors) => {
                console.error('Error:', errors);
                setIsSubmitting(false);
                alert('Gagal mengirim laporan. Silakan coba lagi.');
            }
        });
    };

    const handleBatal = () => {
        if (formData.deskripsi_laporan.trim() || formData.judul_laporan.trim() || formData.file_laporan) {
            if (confirm('Anda yakin ingin membatalkan? Data yang sudah diisi akan hilang.')) {
                router.visit(route('staf.laporan-tindak'));
            }
        } else {
            router.visit(route('staf.laporan-tindak'));
        }
    };

    const handleLihatSurat = () => {
        router.visit(
            route('staf.laporan-tindak.lihat-surat', tugas.id),
            {
                onError: () => {
                    alert('File surat tidak ditemukan atau sudah dihapus.');
                }
            }
        );
    };

    return (
        <Authenticated>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <button
                            onClick={handleBatal}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="text-sm font-medium">Kembali ke Tugas Sedang Diproses</span>
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Laporan Tindak Lanjut</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Laporkan kemajuan atau hasil pengerjaan tugas Anda
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex items-start justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Informasi Tugas</h2>
                            <button
                                onClick={handleLihatSurat}
                                disabled={!tugas.has_file}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border transition
        ${tugas.has_file
                                        ? 'text-gray-700 bg-gray-50 border-gray-300 hover:bg-gray-100'
                                        : 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed'
                                    }`}
                            >
                                <Eye className="w-4 h-4" />
                                {tugas.has_file ? 'Lihat Surat Asli' : 'Tidak Ada File'}
                            </button>

                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Nomor Surat</p>
                                    <p className="text-sm font-medium text-gray-900">{tugas.nomor_surat}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Perihal</p>
                                    <p className="text-sm font-medium text-gray-900">{tugas.perihal}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase mb-1">Tugas Dari</p>
                                <p className="text-sm font-medium text-gray-900">{tugas.dari_kepala}</p>
                            </div>

                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase mb-2">Instruksi</p>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <p className="text-sm text-gray-900 leading-relaxed">{tugas.instruksi}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Laporan */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Form Laporan Tindak Lanjut</h2>

                        <div className="space-y-6">
                            {/* Judul Laporan */}
                            <div>
                                <label htmlFor="judul_laporan" className="block text-sm font-medium text-gray-700 mb-2">
                                    Judul Laporan Singkat
                                    <span className="text-gray-400 font-normal ml-1">(Opsional)</span>
                                </label>
                                <input
                                    type="text"
                                    id="judul_laporan"
                                    value={formData.judul_laporan}
                                    onChange={(e) => setFormData({ ...formData, judul_laporan: e.target.value })}
                                    placeholder="Contoh: Hasil Pengecekan Legalitas Dokumen"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                                <p className="mt-1.5 text-xs text-gray-500">
                                    Judul singkat untuk memudahkan identifikasi laporan di riwayat
                                </p>
                            </div>

                            {/* Isi Laporan */}
                            <div>
                                <label htmlFor="deskripsi_laporan" className="block text-sm font-medium text-gray-700 mb-2">
                                    Isi Laporan
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <textarea
                                    id="deskripsi_laporan"
                                    value={formData.deskripsi_laporan}
                                    onChange={(e) => setFormData({ ...formData, deskripsi_laporan: e.target.value })}
                                    rows={8}
                                    placeholder="Jelaskan secara detail apa yang telah Anda kerjakan, kendala yang dihadapi, atau hasil yang ditemukan..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                />
                                <p className="mt-1.5 text-xs text-gray-500">
                                    Minimum 20 karakter. Jelaskan dengan detail dan jelas.
                                </p>
                            </div>

                            {/* Upload Lampiran */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Lampiran File
                                    <span className="text-gray-400 font-normal ml-1">(Opsional)</span>
                                </label>

                                {!formData.file_laporan ? (
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                                        <input
                                            type="file"
                                            id="file_laporan"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                                        />
                                        <label htmlFor="file_laporan" className="cursor-pointer">
                                            <div className="flex flex-col items-center">
                                                <Upload className="w-10 h-10 text-gray-400 mb-3" />
                                                <p className="text-sm font-medium text-gray-700 mb-1">
                                                    Klik untuk upload atau drag & drop
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    PDF, DOC, XLS, JPG, PNG (Maks. 5MB)
                                                </p>
                                            </div>
                                        </label>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <FileText className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{fileName}</p>
                                                <p className="text-xs text-gray-500">File siap diupload</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleRemoveFile}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                                <p className="mt-1.5 text-xs text-gray-500">
                                    Upload dokumen pendukung seperti draft surat, hasil analisis, atau screenshot
                                </p>
                            </div>

                            {/* Status Tugas */}
                            <div className="border-t border-gray-200 pt-6">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="flex items-center h-5">
                                        <input
                                            type="checkbox"
                                            checked={formData.tandai_selesai}
                                            onChange={(e) => setFormData({ ...formData, tandai_selesai: e.target.checked })}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                            Tandai tugas sebagai selesai
                                        </span>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Centang jika ini adalah laporan akhir dan tugas sudah sepenuhnya diselesaikan
                                        </p>
                                    </div>
                                </label>

                                {formData.tandai_selesai && (
                                    <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-green-900">Tugas akan ditandai sebagai selesai</p>
                                            <p className="text-xs text-green-700 mt-1">
                                                Setelah submit, tugas ini akan berpindah ke daftar "Riwayat Tugas Selesai" dan Kepala akan menerima notifikasi
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {!formData.tandai_selesai && (
                                    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-blue-900">Laporan kemajuan</p>
                                            <p className="text-xs text-blue-700 mt-1">
                                                Tugas akan tetap berada di daftar "Tugas Sedang Diproses". Anda dapat melaporkan kemajuan kembali kapan saja
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleBatal}
                                disabled={isSubmitting}
                                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSubmitting || !formData.deskripsi_laporan.trim()}
                                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Mengirim Laporan...
                                    </>
                                ) : (
                                    <>
                                        <FileText className="w-4 h-4" />
                                        Kirim Laporan
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}