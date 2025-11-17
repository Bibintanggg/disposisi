import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Send, Upload, Calendar, User, FileText, AlertCircle, Clock, CheckCircle, XCircle, Search, MoreHorizontal, Paperclip, Eye, Building2, PenTool, ArrowUpRight } from "lucide-react";
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

export default function SuratKeluar() {
    const [suratKeluar] = useState([
        {
            id: 1,
            nomor_surat: "001/SK/2024",
            tanggal_surat: "2024-01-15",
            tanggal_kirim: "2024-01-16T10:30:00",
            penerima: "Kementerian Pendidikan dan Kebudayaan",
            isi_surat: "Laporan pelaksanaan program literasi sekolah tahun ajaran 2023/2024",
            unit_pengirim: {
                id: 1,
                nama: "IT & Development"
            },
            user_penanda_tangan: {
                id: 1,
                nama: "Dr. Ahmad Rizki, M.Pd",
                jabatan: "Kepala Sekolah"
            },
            status_arsip: 2,
            gambar: "surat1.pdf"
        },
        {
            id: 2,
            nomor_surat: "002/SK/2024",
            tanggal_surat: "2024-01-14",
            tanggal_kirim: "2024-01-15T14:20:00",
            penerima: "Dinas Pendidikan Provinsi",
            isi_surat: "Permohonan bantuan sarana dan prasarana laboratorium komputer",
            unit_pengirim: {
                id: 2,
                nama: "Human Resources"
            },
            user_penanda_tangan: {
                id: 2,
                nama: "Budi Santoso, S.Kom",
                jabatan: "Wakil Kepala Sekolah"
            },
            status_arsip: 2,
            gambar: "surat2.pdf"
        },
        {
            id: 3,
            nomor_surat: "003/SK/2024",
            tanggal_surat: "2024-01-16",
            tanggal_kirim: "2024-01-16T09:15:00",
            penerima: "Badan Akreditasi Nasional",
            isi_surat: "Pengajuan perpanjangan masa berlaku akreditasi sekolah",
            unit_pengirim: {
                id: 1,
                nama: "IT & Development"
            },
            user_penanda_tangan: {
                id: 1,
                nama: "Dr. Ahmad Rizki, M.Pd",
                jabatan: "Kepala Sekolah"
            },
            status_arsip: 1,
            gambar: null
        },
    ]);

    const [selectedSurat, setSelectedSurat] = useState(suratKeluar[0]);

    const statusArsipOptions = [
        { value: 1, label: 'Belum Diarsipkan', icon: Clock, color: 'text-orange-600 bg-orange-100' },
        { value: 2, label: 'Sudah Diarsipkan', icon: CheckCircle, color: 'text-green-600 bg-green-100' }
    ];

    const getStatusArsipInfo = (status) => {
        return statusArsipOptions.find(s => s.value === status) || statusArsipOptions[0];
    };

    return (
        <Authenticated>
            <div className="flex h-screen overflow-hidden bg-gray-50">
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="bg-white border-b border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-300 rounded-2xl flex items-center justify-center">
                                    <Send className="text-white" size={24} />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                        Input Surat Keluar
                                    </h1>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Buat dan kirim surat keluar organisasi Anda
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                                <p className="text-xs font-medium text-purple-600 mb-1">Total Surat</p>
                                <p className="text-2xl font-bold text-purple-900">{suratKeluar.length}</p>
                            </div>
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                                <p className="text-xs font-medium text-orange-600 mb-1">Belum Diarsipkan</p>
                                <p className="text-2xl font-bold text-orange-900">
                                    {suratKeluar.filter(s => s.status_arsip === 1).length}
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                                <p className="text-xs font-medium text-green-600 mb-1">Sudah Diarsipkan</p>
                                <p className="text-2xl font-bold text-green-900">
                                    {suratKeluar.filter(s => s.status_arsip === 2).length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                                        <FileText className="text-purple-600" size={20} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Form Input Surat Keluar</h2>
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label htmlFor="nomor_surat" className="text-sm font-semibold text-gray-700">
                                                Nomor Surat <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="nomor_surat"
                                                placeholder="Contoh: 001/SK/2024"
                                                className="h-12 text-base"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label htmlFor="penerima" className="text-sm font-semibold text-gray-700">
                                                Penerima <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="penerima"
                                                placeholder="Nama instansi/perorangan penerima"
                                                className="h-12 text-base"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label htmlFor="unit_pengirim" className="text-sm font-semibold text-gray-700">
                                                Unit Pengirim <span className="text-red-500">*</span>
                                            </Label>
                                            <Select>
                                                <SelectTrigger className="h-12 text-base">
                                                    <SelectValue placeholder="Pilih unit pengirim" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">IT & Development</SelectItem>
                                                    <SelectItem value="2">Human Resources</SelectItem>
                                                    <SelectItem value="3">Finance</SelectItem>
                                                    <SelectItem value="4">Marketing</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-3">
                                            <Label htmlFor="penanda_tangan" className="text-sm font-semibold text-gray-700">
                                                Penanda Tangan <span className="text-red-500">*</span>
                                            </Label>
                                            <Select>
                                                <SelectTrigger className="h-12 text-base">
                                                    <SelectValue placeholder="Pilih penanda tangan" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">Dr. Ahmad Rizki, M.Pd - Kepala Sekolah</SelectItem>
                                                    <SelectItem value="2">Budi Santoso, S.Kom - Wakil Kepala</SelectItem>
                                                    <SelectItem value="3">Diana Putri, S.E - Kepala TU</SelectItem>
                                                </SelectContent>
                                            </Select>
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
                                            <Label htmlFor="tanggal_kirim" className="text-sm font-semibold text-gray-700">
                                                Tanggal & Waktu Kirim <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="tanggal_kirim"
                                                type="datetime-local"
                                                className="h-12 text-base"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label htmlFor="isi_surat" className="text-sm font-semibold text-gray-700">
                                            Isi/Perihal Surat <span className="text-red-500">*</span>
                                        </Label>
                                        <Textarea
                                            id="isi_surat"
                                            placeholder="Tuliskan isi atau perihal surat secara singkat dan jelas..."
                                            rows={5}
                                            className="resize-none text-base"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label htmlFor="status_arsip" className="text-sm font-semibold text-gray-700">
                                            Status Arsip <span className="text-red-500">*</span>
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="h-12 text-base">
                                                <SelectValue placeholder="Pilih status arsip" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">Belum Diarsipkan</SelectItem>
                                                <SelectItem value="2">Sudah Diarsipkan</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-3">
                                        <Label htmlFor="gambar" className="text-sm font-semibold text-gray-700">
                                            Lampiran File <span className="text-gray-400">(Opsional)</span>
                                        </Label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 hover:border-purple-400 hover:bg-purple-50/30 transition-all cursor-pointer">
                                            <div className="flex flex-col items-center text-center">
                                                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-4">
                                                    <Upload className="text-purple-600" size={28} />
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
                                        <Button size="lg" className="flex-1 h-12 gap-2 text-base font-semibold bg-purple-600 hover:bg-purple-700">
                                            <Send size={18} />
                                            Simpan & Kirim Surat
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
                                placeholder="Cari nomor/penerima..."
                                className="pl-10 bg-white border-gray-200 h-11 rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-2">
                            {suratKeluar.map((surat) => {
                                const statusInfo = getStatusArsipInfo(surat.status_arsip);
                                const StatusIcon = statusInfo.icon;
                                
                                return (
                                    <div
                                        key={surat.id}
                                        onClick={() => setSelectedSurat(surat)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group ${
                                            selectedSurat?.id === surat.id
                                                ? 'border-purple-500 bg-purple-50 shadow-md'
                                                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm bg-white'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-gray-900">
                                                    {surat.nomor_surat}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    Kepada: {surat.penerima}
                                                </p>
                                            </div>
                                            <button className="p-1.5 rounded-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MoreHorizontal size={16} className="text-gray-400" />
                                            </button>
                                        </div>

                                        <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                                            {surat.isi_surat}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1 text-xs text-purple-700 bg-purple-100 px-2 py-1 rounded-lg">
                                                    <Building2 size={12} />
                                                    <span className="font-medium">{surat.unit_pengirim.nama}</span>
                                                </div>
                                                {surat.gambar && (
                                                    <Paperclip size={14} className="text-gray-400" />
                                                )}
                                            </div>
                                            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${statusInfo.color}`}>
                                                <StatusIcon size={12} />
                                                <span className="text-xs font-medium">{statusInfo.label}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                                            <Clock size={12} />
                                            <span>{new Date(surat.tanggal_kirim).toLocaleString('id-ID', {
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
                                    <span className="text-gray-500">Unit:</span>
                                    <span className="font-semibold text-gray-900">{selectedSurat.unit_pengirim.nama}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Penanda Tangan:</span>
                                    <span className="font-semibold text-gray-900">
                                        {selectedSurat.user_penanda_tangan.nama.split(',')[0]}
                                    </span>
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