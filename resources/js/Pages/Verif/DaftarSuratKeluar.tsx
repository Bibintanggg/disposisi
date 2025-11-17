import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Send, Search, Filter, Download, Eye, Edit2, Trash2, MoreVertical, Calendar, User, FileText, AlertCircle, Clock, CheckCircle, XCircle, Paperclip, Mail, ArrowUpRight, Building2, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function DaftarSuratKeluar() {
    const [suratKeluar] = useState([
        {
            id: 1,
            nomor_surat: "001/SK/2024",
            tanggal_surat: "2024-01-15",
            tanggal_kirim: "2024-01-16T10:30:00",
            penerima: "Kementerian Pendidikan dan Kebudayaan",
            isi_surat: "Laporan pelaksanaan program literasi sekolah tahun ajaran 2023/2024 semester ganjil",
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
            isi_surat: "Permohonan bantuan sarana dan prasarana laboratorium komputer untuk tahun anggaran 2024",
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
            isi_surat: "Pengajuan perpanjangan masa berlaku akreditasi sekolah dengan melampirkan dokumen pendukang",
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
            gambar: "surat3.pdf"
        },
        {
            id: 4,
            nomor_surat: "004/SK/2024",
            tanggal_surat: "2024-01-12",
            tanggal_kirim: "2024-01-13T08:45:00",
            penerima: "Dinas Kesehatan Kota",
            isi_surat: "Undangan kegiatan pemeriksaan kesehatan berkala untuk siswa dan guru",
            unit_pengirim: {
                id: 3,
                nama: "Finance"
            },
            user_penanda_tangan: {
                id: 3,
                nama: "Diana Putri, S.E",
                jabatan: "Kepala Tata Usaha"
            },
            status_arsip: 2,
            gambar: null
        },
        {
            id: 5,
            nomor_surat: "005/SK/2024",
            tanggal_surat: "2024-01-17",
            tanggal_kirim: "2024-01-18T11:00:00",
            penerima: "Komite Sekolah",
            isi_surat: "Laporan pertanggungjawaban penggunaan dana komite semester 1 tahun ajaran 2023/2024",
            unit_pengirim: {
                id: 3,
                nama: "Finance"
            },
            user_penanda_tangan: {
                id: 1,
                nama: "Dr. Ahmad Rizki, M.Pd",
                jabatan: "Kepala Sekolah"
            },
            status_arsip: 1,
            gambar: null
        },
        {
            id: 6,
            nomor_surat: "006/SK/2024",
            tanggal_surat: "2024-01-10",
            tanggal_kirim: "2024-01-11T15:30:00",
            penerima: "Seluruh Orang Tua/Wali Murid",
            isi_surat: "Pemberitahuan jadwal penerimaan rapor semester ganjil dan rapat pleno orang tua murid",
            unit_pengirim: {
                id: 4,
                nama: "Marketing"
            },
            user_penanda_tangan: {
                id: 2,
                nama: "Budi Santoso, S.Kom",
                jabatan: "Wakil Kepala Sekolah"
            },
            status_arsip: 1,
            gambar: "surat6.pdf"
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

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
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
                                        Daftar Surat Keluar
                                    </h1>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Kelola dan pantau semua surat keluar
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" size="lg" className="gap-2">
                                    <Download size={18} />
                                    Export
                                </Button>
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

                    <div className="bg-white border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    placeholder="Cari nomor surat, penerima, atau isi surat..."
                                    className="pl-10 h-11"
                                />
                            </div>
                            <Select defaultValue="all">
                                <SelectTrigger className="w-40 h-11">
                                    <SelectValue placeholder="Unit Pengirim" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Unit</SelectItem>
                                    <SelectItem value="1">IT & Development</SelectItem>
                                    <SelectItem value="2">Human Resources</SelectItem>
                                    <SelectItem value="3">Finance</SelectItem>
                                    <SelectItem value="4">Marketing</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="all">
                                <SelectTrigger className="w-40 h-11">
                                    <SelectValue placeholder="Status Arsip" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Status</SelectItem>
                                    <SelectItem value="1">Belum Diarsipkan</SelectItem>
                                    <SelectItem value="2">Sudah Diarsipkan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="space-y-2">
                            {suratKeluar.map((surat) => {
                                const statusInfo = getStatusArsipInfo(surat.status_arsip);
                                const StatusIcon = statusInfo.icon;

                                return (
                                    <div
                                        key={surat.id}
                                        onClick={() => setSelectedSurat(surat)}
                                        className={`bg-white rounded-xl border-2 p-5 cursor-pointer transition-all duration-200 group hover:shadow-lg ${
                                            selectedSurat?.id === surat.id
                                                ? 'border-purple-500 shadow-lg ring-4 ring-purple-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <ArrowUpRight className="text-purple-600" size={20} />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex-1">
                                                        <h3 className="font-bold text-gray-900 text-base mb-1">
                                                            {surat.nomor_surat}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 font-medium flex items-center gap-2">
                                                            <span className="text-gray-400">Kepada:</span>
                                                            {surat.penerima}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${statusInfo.color} flex items-center gap-1`}>
                                                            <StatusIcon size={12} />
                                                            {statusInfo.label}
                                                        </span>
                                                        <button className="p-2 hover:bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <MoreVertical size={16} className="text-gray-400" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                                    {surat.isi_surat}
                                                </p>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                                        <div className="flex items-center gap-1.5">
                                                            <Building2 size={14} />
                                                            <span>{surat.unit_pengirim.nama}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <Calendar size={14} />
                                                            <span>{formatDate(surat.tanggal_surat)}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock size={14} />
                                                            <span>{formatDateTime(surat.tanggal_kirim)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg">
                                                            <PenTool size={12} />
                                                            <span>{surat.user_penanda_tangan.nama.split(',')[0]}</span>
                                                        </div>
                                                        {surat.gambar && (
                                                            <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                                                                <Paperclip size={12} />
                                                                <span>1 file</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {selectedSurat && (
                    <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-900">Detail Surat</h3>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                                        <Edit2 size={16} />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-red-600 hover:text-red-700 hover:bg-red-50">
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Nomor Surat</p>
                                    <p className="text-base font-bold text-gray-900">{selectedSurat.nomor_surat}</p>
                                </div>
                                <div>
                                    {(() => {
                                        const statusInfo = getStatusArsipInfo(selectedSurat.status_arsip);
                                        const StatusIcon = statusInfo.icon;
                                        return (
                                            <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${statusInfo.color} flex items-center gap-1.5 inline-flex`}>
                                                <StatusIcon size={14} />
                                                {statusInfo.label}
                                            </span>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Penerima Surat</p>
                                <p className="text-sm font-medium text-gray-900">{selectedSurat.penerima}</p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Unit Pengirim</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <Building2 size={16} className="text-purple-600" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">{selectedSurat.unit_pengirim.nama}</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Penanda Tangan</p>
                                <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-sm font-bold text-white">
                                            {selectedSurat.user_penanda_tangan.nama.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{selectedSurat.user_penanda_tangan.nama}</p>
                                            <p className="text-xs text-gray-500">{selectedSurat.user_penanda_tangan.jabatan}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Tanggal Surat</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-900">
                                        <Calendar size={16} className="text-gray-400" />
                                        <span>{formatDate(selectedSurat.tanggal_surat)}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Tanggal Kirim</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-900">
                                        <Clock size={16} className="text-gray-400" />
                                        <span>{formatDateTime(selectedSurat.tanggal_kirim)}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Isi/Perihal Surat</p>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {selectedSurat.isi_surat}
                                </p>
                            </div>

                            {selectedSurat.gambar && (
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Lampiran</p>
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center gap-3 hover:bg-gray-100 transition-colors cursor-pointer">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <FileText className="text-purple-600" size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-gray-900">{selectedSurat.gambar}</p>
                                            <p className="text-xs text-gray-500">PDF Document</p>
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                                            <Download size={16} />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t border-gray-200 bg-gray-50">
                            <Button size="lg" className="w-full gap-2 bg-purple-600 hover:bg-purple-700">
                                <Eye size={18} />
                                Lihat Detail Lengkap
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Authenticated>
    );
}