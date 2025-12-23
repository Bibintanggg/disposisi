import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Send, Upload, Calendar, FileText, AlertCircle, Clock, CheckCircle, XCircle, Search, MoreHorizontal, Paperclip, Eye, Building2, PenTool, ArrowUpRight } from "lucide-react";
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
import { router, useForm, usePage } from "@inertiajs/react";
import { SuratKeluarProps } from "@/types/surat-keluar";
import { User } from "@/types/user";
import { Bidang } from "@/types/bidang";

interface SuratKeluarPageProps {
    suratKeluar: SuratKeluarProps[]
    bidangs: Bidang[]
    users: User[]
    auth: {
        user: User
    }
}

export default function SuratKeluar({ suratKeluar, bidangs, users, auth }: SuratKeluarPageProps) {
    const { user } = auth
    const { filters } = usePage().props

    const [search, setSearch] = useState('')

    const { data, setData, post, processing, errors, reset } = useForm({
        unit_pengirim_id: user.bidang?.id || 0,
        user_penanda_tangan_id: user.id || 0,
        nomor_surat: '',
        tanggal_surat: '',
        penerima: '',
        isi_surat: '',
        gambar: null as File | null,
        tanggal_kirim: '',
        status_arsip: 1
    })

    const [selectedSurat, setSelectedSurat] = useState<SuratKeluarProps | null>(
        suratKeluar.length > 0 ? suratKeluar[0] : null
    );

    const [showDetailModal, setShowDetailModal] = useState(false);

    const statusArsipOptions = [
        { value: 1, label: 'Belum Diarsipkan', icon: Clock, color: 'text-orange-600 bg-orange-100' },
        { value: 2, label: 'Sudah Diarsipkan', icon: CheckCircle, color: 'text-green-600 bg-green-100' }
    ];

    const getStatusArsipInfo = (status: number) => {
        return statusArsipOptions.find(s => s.value === status) || statusArsipOptions[0];
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('verif.surat-keluar.store'), {
            onSuccess: () => {
                reset();
            },
            forceFormData: true,
        });
    };

    const handleReset = () => {
        reset();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('gambar', e.target.files[0]);
        }
    };



    return (
        <Authenticated>
            <div className="flex min-h-screen overflow-hidden bg-gray-50">
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
                            <form onSubmit={handleSubmit}>
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
                                                    value={data.nomor_surat}
                                                    onChange={(e) => setData("nomor_surat", e.target.value)}
                                                />
                                                {errors.nomor_surat && (
                                                    <p className="text-sm text-red-600">{errors.nomor_surat}</p>
                                                )}
                                            </div>

                                            <div className="space-y-3">
                                                <Label htmlFor="penerima" className="text-sm font-semibold text-gray-700">
                                                    Penerima <span className="text-red-500">*</span>
                                                </Label>
                                                <Input
                                                    id="penerima"
                                                    placeholder="Nama instansi/perorangan penerima"
                                                    className="h-12 text-base"
                                                    value={data.penerima}
                                                    onChange={(e) => setData("penerima", e.target.value)}
                                                />
                                                {errors.penerima && (
                                                    <p className="text-sm text-red-600">{errors.penerima}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <Label htmlFor="unit_pengirim" className="text-sm font-semibold text-gray-700">
                                                    Unit Pengirim <span className="text-red-500">*</span>
                                                </Label>
                                                <Select
                                                    value={String(data.unit_pengirim_id)}
                                                    onValueChange={(value) => setData("unit_pengirim_id", Number(value))}
                                                >
                                                    <SelectTrigger className="h-12 text-base">
                                                        <SelectValue placeholder="Pilih unit pengirim" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {bidangs.map((bidang) => (
                                                            <SelectItem key={bidang.id} value={String(bidang.id)}>
                                                                {bidang.nama_bidang}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.unit_pengirim_id && (
                                                    <p className="text-sm text-red-600">{errors.unit_pengirim_id}</p>
                                                )}
                                            </div>

                                            <div className="space-y-3">
                                                <Label htmlFor="penanda_tangan" className="text-sm font-semibold text-gray-700">
                                                    Penanda Tangan <span className="text-red-500">*</span>
                                                </Label>
                                                <Select
                                                    value={String(data.user_penanda_tangan_id)}
                                                    onValueChange={(value) => setData("user_penanda_tangan_id", Number(value))}
                                                >
                                                    <SelectTrigger className="h-12 text-base">
                                                        <SelectValue placeholder="Pilih penanda tangan" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {users.map((user) => (
                                                            <SelectItem key={user.id} value={String(user.id)}>
                                                                {user.nama_lengkap} {user.jabatan ? `- ${user.jabatan}` : ''}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.user_penanda_tangan_id && (
                                                    <p className="text-sm text-red-600">{errors.user_penanda_tangan_id}</p>
                                                )}
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
                                                    value={data.tanggal_surat}
                                                    onChange={(e) => setData("tanggal_surat", e.target.value)}
                                                />
                                                {errors.tanggal_surat && (
                                                    <p className="text-sm text-red-600">{errors.tanggal_surat}</p>
                                                )}
                                            </div>

                                            <div className="space-y-3">
                                                <Label htmlFor="tanggal_kirim" className="text-sm font-semibold text-gray-700">
                                                    Tanggal & Waktu Kirim <span className="text-red-500">*</span>
                                                </Label>
                                                <Input
                                                    id="tanggal_kirim"
                                                    type="datetime-local"
                                                    className="h-12 text-base"
                                                    value={data.tanggal_kirim}
                                                    onChange={(e) => setData("tanggal_kirim", e.target.value)}
                                                />
                                                {errors.tanggal_kirim && (
                                                    <p className="text-sm text-red-600">{errors.tanggal_kirim}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <Label htmlFor="isi_surat" className="text-sm font-semibold text-gray-700">
                                                Isi/Perihal Surat <span className="text-red-500">*</span>
                                            </Label>
                                            <Textarea
                                                id="isi_surat"
                                                placeholder="Tuliskan isi atau perihal surat..."
                                                rows={5}
                                                className="resize-none text-base"
                                                value={data.isi_surat}
                                                onChange={(e) => setData("isi_surat", e.target.value)}
                                            />
                                            {errors.isi_surat && (
                                                <p className="text-sm text-red-600">{errors.isi_surat}</p>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <Label htmlFor="status_arsip" className="text-sm font-semibold text-gray-700">
                                                Status Arsip <span className="text-red-500">*</span>
                                            </Label>
                                            <Select
                                                value={String(data.status_arsip)}
                                                onValueChange={(value) => setData("status_arsip", Number(value))}
                                            >
                                                <SelectTrigger className="h-12 text-base">
                                                    <SelectValue placeholder="Pilih status arsip" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {statusArsipOptions.map((s) => (
                                                        <SelectItem key={s.value} value={String(s.value)}>
                                                            {s.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.status_arsip && (
                                                <p className="text-sm text-red-600">{errors.status_arsip}</p>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <Label htmlFor="gambar" className="text-sm font-semibold text-gray-700">
                                                Lampiran File <span className="text-gray-400">(Opsional)</span>
                                            </Label>
                                            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 hover:border-purple-400 hover:bg-purple-50/30 transition-all cursor-pointer">
                                                <input
                                                    type="file"
                                                    id="gambar"
                                                    accept=".pdf"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                                <label htmlFor="gambar" className="cursor-pointer">
                                                    <div className="flex flex-col items-center text-center">
                                                        <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-4">
                                                            <Upload className="text-purple-600" size={28} />
                                                        </div>
                                                        <p className="text-base font-semibold text-gray-700 mb-1">
                                                            {data.gambar ? data.gambar.name : 'Klik untuk upload atau drag & drop'}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            PDF (Maksimal 5MB)
                                                        </p>
                                                    </div>
                                                </label>
                                            </div>
                                            {errors.gambar && (
                                                <p className="text-sm text-red-600">{errors.gambar}</p>
                                            )}
                                        </div>

                                        <div className="flex gap-4 pt-6">
                                            <Button
                                                type="submit"
                                                size="lg"
                                                className="flex-1 h-12 gap-2 text-base font-semibold bg-purple-600 hover:bg-purple-700"
                                                disabled={processing}
                                            >
                                                <Send size={18} />
                                                {processing ? 'Menyimpan...' : 'Simpan & Kirim Surat'}
                                            </Button>
                                            <Button
                                                type="button"
                                                size="lg"
                                                variant="outline"
                                                className="gap-2 h-12 text-base font-semibold"
                                                onClick={handleReset}
                                            >
                                                <XCircle size={18} />
                                                Reset
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
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
                                value={search}
                                className="pl-10 bg-white border-gray-200 h-11 rounded-xl"
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                    router.get(route('verif.surat-keluar.search'), {
                                        search: e.target.value
                                    }, {
                                        preserveState: true,
                                        replace: true
                                    })
                                }}
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
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group ${selectedSurat?.id === surat.id
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
                                        </div>

                                        <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                                            {surat.isi_surat}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {surat.unit_pengirim && (
                                                    <div className="flex items-center gap-1 text-xs text-purple-700 bg-purple-100 px-2 py-1 rounded-lg">
                                                        <Building2 size={12} />
                                                        <span className="font-medium">{surat.unit_pengirim.nama_bidang}</span>
                                                    </div>
                                                )}
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
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 gap-1"
                                    onClick={() => setShowDetailModal(true)}
                                >
                                    <Eye size={14} />
                                    Detail
                                </Button>
                            </div>
                            <div className="space-y-1.5 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Unit:</span>
                                    <span className="font-semibold text-gray-900">{selectedSurat.unit_pengirim?.nama_bidang}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Penanda Tangan:</span>
                                    <span className="font-semibold text-gray-900">
                                        {selectedSurat.user_penanda_tangan?.nama_lengkap ?? '-'}
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

            {/* Modal Detail Surat */}
            {showDetailModal && selectedSurat && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-white">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                    <FileText className="text-purple-600" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Detail Surat Keluar</h2>
                                    <p className="text-sm text-gray-500">{selectedSurat.nomor_surat}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                            >
                                <XCircle className="text-gray-400 hover:text-gray-600" size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-500 mb-1">Nomor Surat</p>
                                        <p className="text-base font-bold text-gray-900">{selectedSurat.nomor_surat}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-500 mb-1">Penerima</p>
                                        <p className="text-base text-gray-900">{selectedSurat.penerima}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-500 mb-1">Unit Pengirim</p>
                                        <div className="flex items-center gap-2">
                                            <Building2 size={16} className="text-purple-600" />
                                            <p className="text-base text-gray-900">{selectedSurat.unit_pengirim?.nama_bidang || '-'}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-500 mb-1">Penanda Tangan</p>
                                        <div className="flex items-center gap-2">
                                            <PenTool size={16} className="text-purple-600" />
                                            <p className="text-base text-gray-900">{selectedSurat.user_penanda_tangan?.nama_lengkap || "-"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-500 mb-1">Tanggal Surat</p>
                                        <p className="text-base text-gray-900">
                                            {new Date(selectedSurat.tanggal_surat).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-500 mb-1">Tanggal & Waktu Kirim</p>
                                        <p className="text-base text-gray-900">
                                            {new Date(selectedSurat.tanggal_kirim).toLocaleString('id-ID', {
                                                weekday: 'long',
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-500 mb-1">Status Arsip</p>
                                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${getStatusArsipInfo(selectedSurat.status_arsip).color}`}>
                                            {(() => {
                                                const StatusIcon = getStatusArsipInfo(selectedSurat.status_arsip).icon;
                                                return <StatusIcon size={16} />;
                                            })()}
                                            <span className="font-semibold">{getStatusArsipInfo(selectedSurat.status_arsip).label}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-sm font-semibold text-gray-500 mb-2">Isi/Perihal Surat</p>
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <p className="text-base text-gray-900 whitespace-pre-wrap">{selectedSurat.isi_surat}</p>
                                </div>
                            </div>

                            {selectedSurat.gambar && (
                                <div>
                                    <p className="text-sm font-semibold text-gray-500 mb-2">Lampiran Dokumen</p>
                                    <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                                        <iframe
                                            src={route('verif.surat-keluar.file', selectedSurat.gambar.split('/').pop())}
                                            className="w-full h-[500px]"
                                            title="PDF Preview"
                                        />
                                        <div className="p-4 bg-white border-t border-gray-200 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Paperclip size={16} />
                                                <span>{selectedSurat.gambar.split('/').pop()}</span>
                                            </div>
                                            <a
                                                href={route('verif.surat-keluar.file', selectedSurat.gambar.split('/').pop())}
                                                download
                                                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                            >
                                                <ArrowUpRight size={16} />
                                                Download PDF
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-gray-200 bg-gray-50">
                            <Button
                                onClick={() => setShowDetailModal(false)}
                                className="w-full h-12 bg-purple-600 hover:bg-purple-700"
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