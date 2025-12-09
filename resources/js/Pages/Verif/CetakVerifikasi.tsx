import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useState, useEffect } from "react";
import { Printer, Check, X, Clock, FileCheck, Search, Eye, Download, AlertCircle, CheckCircle2, XCircle, Calendar, User, Building2, FileText, Mail, Send } from "lucide-react";
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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { usePage, router } from "@inertiajs/react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";

interface SuratItem {
    id: number;
    nomor_surat: string;
    tanggal_surat: string;
    tanggal_pengajuan: string;
    pengirim_penerima: string;
    penerima?: string;
    isi_surat: string;
    jenis: "masuk" | "keluar";
    status_verifikasi: "pending" | "approved" | "review" | "rejected";
    status_cetak: "belum" | "sudah";
    status_arsip?: "belum" | "sudah";
    diajukan_oleh: string;
    diverifikasi_oleh: string | null;
    tanggal_verifikasi: string | null;
    catatan_verifikasi: string | null;
    dicetak_oleh: string | null;
    tanggal_cetak: string | null;
    unit_pengirim?: {
        id: number;
        nama_bidang: string;
    };
    user_penanda_tangan?: {
        id: number;
        nama_lengkap: string;
        jabatan?: string | null;
    };
    gambar?: string | null;
    tanggal_kirim?: string;
}

interface PageProps {
    suratMasuk: SuratItem[];
    suratKeluar: SuratItem[];
}

export default function CetakVerifikasi() {
    const { suratMasuk, suratKeluar } = usePage<PageProps>().props;

    const allSurat = [...suratMasuk, ...suratKeluar];

    const [selectedSurat, setSelectedSurat] = useState<SuratItem | null>(
        allSurat.length > 0 ? allSurat[0] : null
    );
    const [activeTab, setActiveTab] = useState("pending");
    const [jenisFilter, setJenisFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [catatanVerifikasi, setCatatanVerifikasi] = useState("");
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [approvedModalOpen, setApprovedModalOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    // Update selected surat jika allSurat berubah
    useEffect(() => {
        if (allSurat.length > 0 && !selectedSurat) {
            setSelectedSurat(allSurat[0]);
        }
    }, [allSurat, selectedSurat]);

    const getStatusVerifikasiInfo = (status: string) => {
        const statusMap = {
            pending: {
                label: "Menunggu Verifikasi",
                icon: Clock,
                color: "text-yellow-600 bg-yellow-100",
            },
            approved: {
                label: "Terverifikasi",
                icon: CheckCircle2,
                color: "text-green-600 bg-green-100",
            },
            review: {
                label: "Perlu Revisi",
                icon: AlertCircle,
                color: "text-blue-600 bg-blue-100",
            },
            rejected: {
                label: "Ditolak",
                icon: XCircle,
                color: "text-red-600 bg-red-100",
            },
        };

        return statusMap[status as keyof typeof statusMap] || statusMap.pending;
    };

    const getStatusCetakInfo = (status: string) => {
        const statusMap = {
            belum: { label: "Belum Dicetak", icon: Printer, color: "text-gray-600 bg-gray-100" },
            sudah: { label: "Sudah Dicetak", icon: CheckCircle2, color: "text-blue-600 bg-blue-100" }
        };
        return statusMap[status as keyof typeof statusMap] || statusMap.belum;
    };

    const getStatusArsipInfo = (status?: string) => {
        const statusMap = {
            belum: { label: "Belum Diarsip", icon: Clock, color: "text-orange-600 bg-orange-100" },
            sudah: { label: "Sudah Diarsip", icon: CheckCircle2, color: "text-green-600 bg-green-100" }
        };
        return statusMap[status as keyof typeof statusMap] || statusMap.belum;
    };

    // Filter surat berdasarkan tab aktif, jenis filter, dan pencarian
    const filteredSurat = allSurat.filter((surat) => {
        // Filter berdasarkan tab status
        let statusFilter = true;
        if (activeTab === "pending") {
            statusFilter = surat.status_verifikasi === "pending";
        } else if (activeTab === "approved") {
            statusFilter = surat.status_verifikasi === "approved" && surat.status_cetak === "belum";
        } else if (activeTab === "printed") {
            statusFilter = surat.status_cetak === "sudah";
        } else if (activeTab === "rejected") {
            statusFilter = surat.status_verifikasi === "rejected";
        }

        // Filter berdasarkan jenis surat
        let jenisFilterPass = true;
        if (jenisFilter !== "all") {
            jenisFilterPass = surat.jenis === jenisFilter;
        }

        // Filter berdasarkan pencarian
        let searchFilter = true;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();

            searchFilter =
                (surat.nomor_surat?.toLowerCase?.() || "").includes(query) ||
                (surat.pengirim_penerima?.toLowerCase?.() || "").includes(query) ||
                (surat.penerima?.toLowerCase?.() || "").includes(query) ||
                (surat.isi_surat?.toLowerCase?.() || "").includes(query);
        }


        return statusFilter && jenisFilterPass && searchFilter;
    });

    const formatDateTime = (dateString: string | null) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleApprove = () => {
        if (!selectedSurat) return;

        setProcessing(true);
        router.post(route('verif.approve', selectedSurat.id), {
            catatan_verifikasi: catatanVerifikasi,
            jenis: selectedSurat.jenis
        }, {
            onSuccess: () => {
                // toast.success('Surat berhasil disetujui!');
                setApprovedModalOpen(false);
                setCatatanVerifikasi("");
                router.reload({ only: ['suratMasuk', 'suratKeluar'] });
            },
            onError: (errors) => {
                // toast.error('Gagal menyetujui surat');
            },
            onFinish: () => {
                setProcessing(false);
            }
        });
    };

    const handleReject = () => {
        if (!selectedSurat) return;

        setProcessing(true);
        router.post(route('verif.reject', selectedSurat.id), {
            catatan_verifikasi: catatanVerifikasi,
            jenis: selectedSurat.jenis
        }, {
            onSuccess: () => {
                // toast.success('Surat berhasil ditolak!');
                setDeleteModalOpen(false);
                setCatatanVerifikasi("");
                router.reload({ only: ['suratMasuk', 'suratKeluar'] });
            },
            onError: (errors) => {
                // toast.error('Gagal menolak surat');
            },
            onFinish: () => {
                setProcessing(false);
            }
        });
    };

    const handlePrint = () => {
        if (!selectedSurat) return;

        setProcessing(true);
        router.post(route('verif.print', selectedSurat.id), {
            jenis: selectedSurat.jenis
        }, {
            onSuccess: () => {
                // toast.success('Surat berhasil dicetak!');
                router.reload({ only: ['suratMasuk', 'suratKeluar'] });
            },
            onError: (errors) => {
                // toast.error('Gagal mencetak surat');
            },
            onFinish: () => {
                setProcessing(false);
            }
        });
    };

    // Hitung statistik
    const statMenungguVerifikasi = allSurat.filter(s => s.status_verifikasi === "pending").length;
    const statSiapCetak = allSurat.filter(s => s.status_verifikasi === "approved" && s.status_cetak === "belum").length;
    const statSudahCetak = allSurat.filter(s => s.status_cetak === "sudah").length;
    const statDitolak = allSurat.filter(s => s.status_verifikasi === "rejected").length;

    return (
        <Authenticated>
            <div className="flex h-screen overflow-hidden bg-gray-50">
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-white border-b border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <FileCheck className="text-white" size={24} />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                        Cetak & Verifikasi Surat
                                    </h1>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Kelola verifikasi dan pencetakan dokumen surat
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Statistics Cards */}
                        <div className="grid grid-cols-4 gap-4">
                            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
                                <p className="text-xs font-medium text-yellow-600 mb-1">Menunggu Verifikasi</p>
                                <p className="text-2xl font-bold text-yellow-900">{statMenungguVerifikasi}</p>
                            </div>
                            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
                                <p className="text-xs font-medium text-emerald-600 mb-1">Siap Cetak</p>
                                <p className="text-2xl font-bold text-emerald-900">{statSiapCetak}</p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                                <p className="text-xs font-medium text-blue-600 mb-1">Sudah Dicetak</p>
                                <p className="text-2xl font-bold text-blue-900">{statSudahCetak}</p>
                            </div>
                            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
                                <p className="text-xs font-medium text-red-600 mb-1">Ditolak</p>
                                <p className="text-2xl font-bold text-red-900">{statDitolak}</p>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="bg-white border-b border-gray-200 px-6">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="w-full justify-start border-b-0 bg-transparent h-auto p-0">
                                <TabsTrigger value="pending" className="data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 rounded-none px-4 py-3">
                                    <Clock size={16} className="mr-2" />
                                    Menunggu Verifikasi
                                </TabsTrigger>
                                <TabsTrigger value="approved" className="data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 rounded-none px-4 py-3">
                                    <CheckCircle2 size={16} className="mr-2" />
                                    Siap Cetak
                                </TabsTrigger>
                                <TabsTrigger value="printed" className="data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 rounded-none px-4 py-3">
                                    <Printer size={16} className="mr-2" />
                                    Sudah Dicetak
                                </TabsTrigger>
                                <TabsTrigger value="rejected" className="data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 rounded-none px-4 py-3">
                                    <XCircle size={16} className="mr-2" />
                                    Ditolak
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="bg-white border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    placeholder="Cari nomor surat atau pengirim/penerima..."
                                    className="pl-10 h-11"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                            </div>
                            <Select value={jenisFilter} onValueChange={setJenisFilter}>
                                <SelectTrigger className="w-40 h-11">
                                    <SelectValue placeholder="Jenis Surat" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Jenis</SelectItem>
                                    <SelectItem value="masuk">Surat Masuk</SelectItem>
                                    <SelectItem value="keluar">Surat Keluar</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Surat List */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="space-y-2">
                            {filteredSurat.length === 0 ? (
                                <div className="text-center py-12">
                                    <FileText size={48} className="mx-auto text-gray-300 mb-3" />
                                    <p className="text-gray-500">Tidak ada surat di kategori ini</p>
                                </div>
                            ) : (
                                filteredSurat.map((surat) => {
                                    const statusVerifikasiInfo = getStatusVerifikasiInfo(surat.status_verifikasi);
                                    const statusCetakInfo = getStatusCetakInfo(surat.status_cetak);
                                    const StatusVerifIcon = statusVerifikasiInfo.icon;
                                    const StatusCetakIcon = statusCetakInfo.icon;

                                    return (
                                        <div
                                            key={`${surat.jenis}-${surat.id}`}
                                            onClick={() => {
                                                setSelectedSurat(surat);
                                                setCatatanVerifikasi(""); // Reset catatan ketika ganti surat
                                            }}
                                            className={`bg-white rounded-xl border-2 p-5 cursor-pointer transition-all duration-200 group hover:shadow-lg ${selectedSurat?.id === surat.id && selectedSurat?.jenis === surat.jenis
                                                    ? 'border-emerald-500 shadow-lg ring-4 ring-emerald-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${surat.jenis === 'masuk' ? 'bg-blue-100' : 'bg-purple-100'
                                                    }`}>
                                                    {surat.jenis === 'masuk' ? (
                                                        <Mail className="text-blue-600" size={20} />
                                                    ) : (
                                                        <Send className="text-purple-600" size={20} />
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h3 className="font-bold text-gray-900 text-base">
                                                                    {surat.nomor_surat}
                                                                </h3>
                                                                <span className={`px-2 py-0.5 rounded text-xs font-semibold text-white ${surat.jenis === 'masuk' ? 'bg-blue-500' : 'bg-purple-500'
                                                                    }`}>
                                                                    {surat.jenis === 'masuk' ? 'Masuk' : 'Keluar'}
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-gray-600 font-medium">
                                                                {surat.jenis === 'masuk' ? 'Dari:' : 'Kepada:'} {surat.pengirim_penerima || surat.penerima}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col items-end gap-2">
                                                            <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${statusVerifikasiInfo.color} flex items-center gap-1`}>
                                                                <StatusVerifIcon size={12} />
                                                                {statusVerifikasiInfo.label}
                                                            </span>
                                                            {surat.status_verifikasi === 'approved' && (
                                                                <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${statusCetakInfo.color} flex items-center gap-1`}>
                                                                    <StatusCetakIcon size={12} />
                                                                    {statusCetakInfo.label}
                                                                </span>
                                                            )}
                                                            {surat.jenis === 'keluar' && surat.status_arsip && (
                                                                <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusArsipInfo(surat.status_arsip).color
                                                                    } flex items-center gap-1`}>
                                                                    {getStatusArsipInfo(surat.status_arsip).label}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                                        {surat.isi_surat}
                                                    </p>

                                                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                                                        <div className="flex items-center gap-1.5">
                                                            <User size={14} />
                                                            <span>Diajukan: {surat.diajukan_oleh}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <Calendar size={14} />
                                                            <span>{formatDateTime(surat.tanggal_pengajuan)}</span>
                                                        </div>
                                                        {surat.jenis === 'keluar' && surat.unit_pengirim && (
                                                            <div className="flex items-center gap-1.5">
                                                                <Building2 size={14} />
                                                                <span>{surat.unit_pengirim.nama_bidang}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Detail */}
                {selectedSurat && (
                    <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
                        {/* Sidebar Header */}
                        <div className="p-6 border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Detail & Verifikasi</h3>

                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Nomor Surat</p>
                                    <p className="text-base font-bold text-gray-900">{selectedSurat.nomor_surat}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {(() => {
                                        const statusVerifInfo = getStatusVerifikasiInfo(selectedSurat.status_verifikasi);
                                        const StatusIcon = statusVerifInfo.icon;
                                        return (
                                            <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${statusVerifInfo.color} flex items-center gap-1.5`}>
                                                <StatusIcon size={14} />
                                                {statusVerifInfo.label}
                                            </span>
                                        );
                                    })()}
                                    <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-white ${selectedSurat.jenis === 'masuk' ? 'bg-blue-500' : 'bg-purple-500'
                                        }`}>
                                        {selectedSurat.jenis === 'masuk' ? 'Surat Masuk' : 'Surat Keluar'}
                                    </span>
                                    {selectedSurat.jenis === 'keluar' && selectedSurat.status_arsip && (
                                        <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${getStatusArsipInfo(selectedSurat.status_arsip).color
                                            } flex items-center gap-1.5`}>
                                            {getStatusArsipInfo(selectedSurat.status_arsip).label}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* Pengirim/Penerima */}
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                                    {selectedSurat.jenis === 'masuk' ? 'Pengirim' : 'Penerima'}
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                    {selectedSurat.pengirim_penerima || selectedSurat.penerima}
                                </p>
                            </div>

                            {/* Isi Surat */}
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Isi/Perihal Surat</p>
                                <p className="text-sm text-gray-700 leading-relaxed">{selectedSurat.isi_surat}</p>
                            </div>

                            {/* Informasi Khusus Surat Keluar */}
                            {selectedSurat.jenis === 'keluar' && (
                                <div className="space-y-4">
                                    {selectedSurat.unit_pengirim && (
                                        <div>
                                            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Unit Pengirim</p>
                                            <p className="text-sm text-gray-900">{selectedSurat.unit_pengirim.nama_bidang}</p>
                                        </div>
                                    )}
                                    {selectedSurat.user_penanda_tangan && (
                                        <div>
                                            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Penanda Tangan</p>
                                            <p className="text-sm text-gray-900">
                                                {selectedSurat.user_penanda_tangan.nama_lengkap}
                                                {selectedSurat.user_penanda_tangan.jabatan && ` (${selectedSurat.user_penanda_tangan.jabatan})`}
                                            </p>
                                        </div>
                                    )}
                                    {selectedSurat.tanggal_kirim && (
                                        <div>
                                            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Tanggal Kirim</p>
                                            <p className="text-sm text-gray-900">{formatDateTime(selectedSurat.tanggal_kirim)}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Informasi Umum */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Tanggal Surat</p>
                                    <p className="text-sm text-gray-900">
                                        {new Date(selectedSurat.tanggal_surat).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Diajukan Oleh</p>
                                    <p className="text-sm text-gray-900">{selectedSurat.diajukan_oleh}</p>
                                </div>
                            </div>

                            {(selectedSurat.status_verifikasi === 'approved' || selectedSurat.status_verifikasi === 'rejected') && (
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Timeline Verifikasi</p>
                                    <div className="space-y-3">
                                        <div className="flex gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${selectedSurat.status_verifikasi === 'approved' ? 'bg-green-100' : 'bg-red-100'
                                                }`}>
                                                {selectedSurat.status_verifikasi === 'approved' ? (
                                                    <Check className="text-green-600" size={16} />
                                                ) : (
                                                    <X className="text-red-600" size={16} />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {selectedSurat.status_verifikasi === 'approved' ? 'Diverifikasi' : 'Ditolak'}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    oleh {selectedSurat.diverifikasi_oleh || '-'} • {formatDateTime(selectedSurat.tanggal_verifikasi)}
                                                </p>
                                                {selectedSurat.catatan_verifikasi && (
                                                    <div className="mt-2 bg-gray-50 rounded-lg p-2 border border-gray-200">
                                                        <p className="text-xs text-gray-700">{selectedSurat.catatan_verifikasi}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {selectedSurat.status_cetak === 'sudah' && (
                                            <div className="flex gap-3">
                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <Printer className="text-blue-600" size={16} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-semibold text-gray-900">Dicetak</p>
                                                    <p className="text-xs text-gray-500">
                                                        oleh {selectedSurat.dicetak_oleh || '-'} • {formatDateTime(selectedSurat.tanggal_cetak)}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Form Verifikasi (jika masih pending) */}
                            {selectedSurat.status_verifikasi === 'pending' && (
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Form Verifikasi</p>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="catatan" className="text-sm font-semibold">Catatan (Opsional)</Label>
                                            <Textarea
                                                id="catatan"
                                                value={catatanVerifikasi}
                                                onChange={(e) => setCatatanVerifikasi(e.target.value)}
                                                placeholder="Tambahkan catatan verifikasi..."
                                                rows={3}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar Actions */}
                        <div className="p-6 border-t border-gray-200 bg-gray-50 space-y-3">
                            {selectedSurat.status_verifikasi === 'pending' && (
                                <>
                                    <Button
                                        size="lg"
                                        className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700"
                                        onClick={() => setApprovedModalOpen(true)}
                                        disabled={processing}
                                    >
                                        <Check size={18} />
                                        {processing ? 'Memproses...' : 'Setujui & Verifikasi'}
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="w-full gap-2 text-red-600 hover:bg-red-50 border-red-200"
                                        onClick={() => setDeleteModalOpen(true)}
                                        disabled={processing}
                                    >
                                        <X size={18} />
                                        Tolak Surat
                                    </Button>
                                </>
                            )}

                            {selectedSurat.status_verifikasi === 'approved' && selectedSurat.status_cetak === 'belum' && (
                                <>
                                    <Button
                                        size="lg"
                                        className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
                                        onClick={handlePrint}
                                        disabled={processing}
                                    >
                                        <Printer size={18} />
                                        {processing ? 'Memproses...' : 'Cetak Surat'}
                                    </Button>
                                    
                                </>
                            )}

                            {selectedSurat.status_cetak === 'sudah' && (
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full gap-2"
                                >
                                    <Download size={18} />
                                    Download PDF
                                </Button>
                            )}

                            {selectedSurat.status_verifikasi === 'rejected' && (
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full gap-2"
                                >
                                    <Eye size={18} />
                                    Lihat Detail Lengkap
                                </Button>
                            )}
                        </div>
                    </div>
                )}

                {/* Modal Setujui Verifikasi */}
                <Dialog open={approvedModalOpen} onOpenChange={setApprovedModalOpen}>
                    <DialogContent className="max-w-sm">
                        <DialogHeader>
                            <DialogTitle>Setujui Verifikasi?</DialogTitle>
                            <DialogDescription>
                                Surat akan disetujui dan siap untuk dicetak. Yakin ingin melanjutkan?
                            </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                            <Label htmlFor="catatan-approve" className="text-sm font-semibold">Catatan (Opsional)</Label>
                            <Textarea
                                id="catatan-approve"
                                value={catatanVerifikasi}
                                onChange={(e) => setCatatanVerifikasi(e.target.value)}
                                placeholder="Tambahkan catatan..."
                                rows={3}
                                className="mt-2"
                            />
                        </div>
                        <DialogFooter className="mt-4">
                            <Button
                                variant="outline"
                                onClick={() => setApprovedModalOpen(false)}
                                disabled={processing}
                            >
                                Batal
                            </Button>
                            <Button
                                onClick={handleApprove}
                                className="bg-emerald-600 hover:bg-emerald-700"
                                disabled={processing}
                            >
                                {processing ? 'Menyetujui...' : 'Setujui'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Modal Tolak Verifikasi */}
                <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                    <DialogContent className="max-w-sm">
                        <DialogHeader>
                            <DialogTitle>Tolak Verifikasi?</DialogTitle>
                            <DialogDescription>
                                Surat akan ditolak dan tidak dapat diproses lebih lanjut.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                            <Label htmlFor="catatan-reject" className="text-sm font-semibold text-red-600">
                                Catatan Penolakan <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="catatan-reject"
                                value={catatanVerifikasi}
                                onChange={(e) => setCatatanVerifikasi(e.target.value)}
                                placeholder="Berikan alasan penolakan..."
                                rows={3}
                                className="mt-2"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Catatan penolakan wajib diisi</p>
                        </div>
                        <DialogFooter className="mt-4">
                            <Button
                                variant="outline"
                                onClick={() => setDeleteModalOpen(false)}
                                disabled={processing}
                            >
                                Batal
                            </Button>
                            <Button
                                onClick={handleReject}
                                variant="destructive"
                                disabled={processing || !catatanVerifikasi.trim()}
                            >
                                {processing ? 'Menolak...' : 'Tolak'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </Authenticated>
    );
}