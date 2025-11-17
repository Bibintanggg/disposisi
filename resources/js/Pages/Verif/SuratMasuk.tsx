import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Mail, Upload, Calendar, User, FileText, AlertCircle, Send, Clock, CheckCircle, XCircle, Search, MoreHorizontal, Paperclip, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function InputSuratMasuk() {
    const [suratMasuk] = useState([
        {
            id: 1,
            nomor_surat: "001/SM/2024",
            tanggal_surat: "2024-01-15",
            tanggal_terima: "2024-01-16 10:30",
            pengirim: "Dinas Pendidikan",
            isi_surat: "Permohonan data siswa untuk keperluan akreditasi sekolah tahun 2024",
            sifat_surat: 1,
            status_akhir: 2,
            gambar: null,
            user_input: "Ahmad Rizki"
        },
        {
            id: 2,
            nomor_surat: "002/SM/2024",
            tanggal_surat: "2024-01-14",
            tanggal_terima: "2024-01-15 14:20",
            pengirim: "Kementerian Keuangan",
            isi_surat: "Pemberitahuan pencairan dana BOS triwulan 1 tahun 2024",
            sifat_surat: 3,
            status_akhir: 3,
            gambar: "surat2.pdf",
            user_input: "Budi Santoso"
        },
        {
            id: 3,
            nomor_surat: "003/SM/2024",
            tanggal_surat: "2024-01-16",
            tanggal_terima: "2024-01-16 09:15",
            pengirim: "Kepala Daerah",
            isi_surat: "Undangan rapat koordinasi kepala sekolah se-kota",
            sifat_surat: 2,
            status_akhir: 2,
            gambar: null,
            user_input: "Citra Dewi"
        },
        {
            id: 4,
            nomor_surat: "004/SM/2024",
            tanggal_surat: "2024-01-12",
            tanggal_terima: "2024-01-13 08:45",
            pengirim: "Badan Kepegawaian",
            isi_surat: "Informasi kenaikan pangkat PNS periode Januari 2024",
            sifat_surat: 4,
            status_akhir: 3,
            gambar: "surat4.pdf",
            user_input: "Diana Putri"
        },
    ]);

    const [selectedSurat, setSelectedSurat] = useState(suratMasuk[0]);

    const sifatSuratOptions = [
        { value: 1, label: 'Biasa', color: 'bg-gray-500' },
        { value: 2, label: 'Penting', color: 'bg-yellow-500' },
        { value: 3, label: 'Segera', color: 'bg-orange-500' },
        { value: 4, label: 'Rahasia', color: 'bg-red-500' }
    ];

    const statusOptions = [
        { value: 1, label: 'Draft', icon: Clock, color: 'text-gray-500 bg-gray-50' },
        { value: 2, label: 'Terkirim', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
        { value: 3, label: 'Diproses', icon: AlertCircle, color: 'text-blue-600 bg-blue-50' }
    ];

    const getSifatInfo = (sifat) => {
        return sifatSuratOptions.find(s => s.value === sifat) || sifatSuratOptions[0];
    };

    const getStatusInfo = (status) => {
        return statusOptions.find(s => s.value === status) || statusOptions[0];
    };

    return (
        <Authenticated>
            <div className="flex h-screen overflow-hidden bg-gray-50">
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="bg-white border-b border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-300 rounded-2xl flex items-center justify-center ">
                                    <Mail className="text-white" size={24} />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                        Input Surat Masuk
                                    </h1>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Catat dan kelola surat masuk organisasi Anda
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                                <p className="text-xs font-medium text-blue-600 mb-1">Total Surat</p>
                                <p className="text-2xl font-bold text-blue-900">{suratMasuk.length}</p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                                <p className="text-xs font-medium text-blue-600 mb-1">Diproses</p>
                                <p className="text-2xl font-bold text-blue-900">
                                    {suratMasuk.filter(s => s.status_akhir === 3).length}
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                                <p className="text-xs font-medium text-green-600 mb-1">Selesai</p>
                                <p className="text-2xl font-bold text-green-900">
                                    {suratMasuk.filter(s => s.status_akhir === 2).length}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                                        <FileText className="text-blue-600" size={20} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Form Input Surat Masuk</h2>
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label htmlFor="nomor_surat" className="text-sm font-semibold text-gray-700">
                                                Nomor Surat <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="nomor_surat"
                                                placeholder="Contoh: 001/SM/2024"
                                                className="h-12 text-base"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label htmlFor="pengirim" className="text-sm font-semibold text-gray-700">
                                                Pengirim <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="pengirim"
                                                placeholder="Nama instansi/perorangan pengirim"
                                                className="h-12 text-base"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label htmlFor="tanggal_surat" className="text-sm font-semibold text-gray-700">
                                                Tanggal Surat <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="tanggal_surat"
                                                type="date"
                                                className="h-12 text-base"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label htmlFor="tanggal_terima" className="text-sm font-semibold text-gray-700">
                                                Tanggal & Waktu Terima <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="tanggal_terima"
                                                type="datetime-local"
                                                className="h-12 text-base"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label htmlFor="sifat_surat" className="text-sm font-semibold text-gray-700">
                                            Sifat Surat <span className="text-red-500">*</span>
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="h-12 text-base">
                                                <SelectValue placeholder="Pilih sifat surat" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">Biasa</SelectItem>
                                                <SelectItem value="2">Penting</SelectItem>
                                                <SelectItem value="3">Segera</SelectItem>
                                                <SelectItem value="4">Rahasia</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-3">
                                        <Label htmlFor="isi_surat" className="text-sm font-semibold text-gray-700">
                                            Isi/Perihal Surat <span className="text-red-500">*</span>
                                        </Label>
                                        <Textarea
                                            id="isi_surat"
                                            placeholder="Tuliskan ringkasan isi atau perihal surat secara singkat dan jelas..."
                                            rows={5}
                                            className="resize-none text-base"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label htmlFor="gambar" className="text-sm font-semibold text-gray-700">
                                            Lampiran File <span className="text-gray-400">(Opsional)</span>
                                        </Label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer">
                                            <div className="flex flex-col items-center text-center">
                                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                                                    <Upload className="text-blue-600" size={28} />
                                                </div>
                                                <p className="text-base font-semibold text-gray-700 mb-1">
                                                    Klik untuk upload atau drag & drop
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    PDF, JPG, PNG (Maksimal 5MB)
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-6">
                                        <Button size="lg" className="flex-1 h-12 gap-2 text-base font-semibold">
                                            <Send size={18} />
                                            Simpan Surat
                                        </Button>
                                        <Button size="lg" variant="outline" className="gap-2 h-12 text-base font-semibold">
                                            <XCircle size={18} />
                                            Reset
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
                    <div className="p-6 border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Surat Terakhir</h3>
                        
                        <div className="relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                                placeholder="Cari nomor/pengirim..."
                                className="pl-10 bg-white border-gray-200 h-11 rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-2">
                            {suratMasuk.map((surat) => {
                                const sifatInfo = getSifatInfo(surat.sifat_surat);
                                const statusInfo = getStatusInfo(surat.status_akhir);
                                const StatusIcon = statusInfo.icon;
                                
                                return (
                                    <div
                                        key={surat.id}
                                        onClick={() => setSelectedSurat(surat)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group ${
                                            selectedSurat?.id === surat.id
                                                ? 'border-blue-500 bg-blue-50 shadow-md'
                                                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm bg-white'
                                        }`}
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-gray-900">
                                                    {surat.nomor_surat}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {surat.pengirim}
                                                </p>
                                            </div>
                                            <button className="p-1.5 rounded-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MoreHorizontal size={16} className="text-gray-400" />
                                            </button>
                                        </div>

                                        {/* Content */}
                                        <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                                            {surat.isi_surat}
                                        </p>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-1 rounded-lg text-xs font-semibold text-white ${sifatInfo.color}`}>
                                                    {sifatInfo.label}
                                                </span>
                                                {surat.gambar && (
                                                    <Paperclip size={14} className="text-gray-400" />
                                                )}
                                            </div>
                                            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${statusInfo.color}`}>
                                                <StatusIcon size={12} />
                                                <span className="text-xs font-medium">{statusInfo.label}</span>
                                            </div>
                                        </div>

                                        {/* Date */}
                                        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                                            <Clock size={12} />
                                            <span>{new Date(surat.tanggal_terima).toLocaleString('id-ID', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Sidebar Footer - Quick Info */}
                    {selectedSurat && (
                        <div className="p-4 border-t border-gray-200 bg-gray-50">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-bold text-gray-700 uppercase">Quick Preview</p>
                                <Button size="sm" variant="ghost" className="h-8 gap-1">
                                    <Eye size={14} />
                                    Detail
                                </Button>
                            </div>
                            <div className="space-y-1.5 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Diinput oleh:</span>
                                    <span className="font-semibold text-gray-900">{selectedSurat.user_input}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Tgl Surat:</span>
                                    <span className="font-semibold text-gray-900">
                                        {new Date(selectedSurat.tanggal_surat).toLocaleDateString('id-ID')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Authenticated>
    );
}