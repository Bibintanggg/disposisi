import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState, useEffect } from "react";
import {
    Mail,
    FileText,
    AlertCircle,
    Send,
    Clock,
    CheckCircle,
    XCircle,
    Search,
    MoreHorizontal,
    Eye,
    Paperclip,
    ArrowUpRight,
    Building2,
    PenTool
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SuratMasuk } from "@/types/surat-masuk";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm, usePage } from "@inertiajs/react";
import { User } from "@/types/user";

interface SuratMasukProps {
    surat: SuratMasuk[];
    auth: {
        user: User;
    };
}

export default function InputSuratMasuk({ surat, auth }: SuratMasukProps) {
    const { user } = auth;

    const { data, setData, post, processing, errors, reset } = useForm({
        user_input_id: user?.id || 0,
        nomor_surat: '',
        tanggal_surat: '',
        tanggal_terima: "",
        pengirim: "",
        isi_surat: "",
        sifat_surat: 0,
        gambar: null as File | null,
        status_akhir: 1
    });

    const [selectedSurat, setSelectedSurat] = useState<SuratMasuk | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDetailModal, setShowDetailModal] = useState(false);

    useEffect(() => {
        if (user?.id) {
            setData("user_input_id", user.id);
            console.log('User ID set to:', user.id);
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("verif.input-surat-masuk.store"), {
            forceFormData: true,
            onError: (errors) => {
                console.log('Validation errors:', errors);
            },
            onSuccess: () => {
                console.log('Success! Data saved.');
                reset();
            }
        });
    };

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

    const getSifatInfo = (sifat: number) => {
        return sifatSuratOptions.find(s => s.value === sifat) || sifatSuratOptions[0];
    };

    const getStatusInfo = (status: number) => {
        return statusOptions.find(s => s.value === status) || statusOptions[0];
    };

    const filteredSurat = surat.filter((s) => {
        const text = searchTerm.toLowerCase();
        return (
            (s.nomor_surat ?? "").toLowerCase().includes(text) ||
            (s.pengirim ?? "").toLowerCase().includes(text) ||
            (s.isi_surat ?? "").toLowerCase().includes(text)
        );
    });

    return (
        <Authenticated>
            <div className="flex h-screen overflow-hidden bg-gray-50">
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="bg-white border-b border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-300 rounded-2xl flex items-center justify-center">
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

                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                                <p className="text-xs font-medium text-blue-600 mb-1">Total Surat</p>
                                <p className="text-2xl font-bold text-blue-900">{surat.length}</p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                                <p className="text-xs font-medium text-blue-600 mb-1">Diproses</p>
                                <p className="text-2xl font-bold text-blue-900">
                                    {surat.filter(s => s.status_akhir === 3).length}
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                                <p className="text-xs font-medium text-green-600 mb-1">Selesai</p>
                                <p className="text-2xl font-bold text-green-900">
                                    {surat.filter(s => s.status_akhir === 2).length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="max-w-4xl mx-auto">
                            <form onSubmit={handleSubmit}>
                                <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-sm">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                                            <FileText className="text-blue-600" size={20} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900">Form Input Surat Masuk</h2>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="nomor_surat">Nomor Surat *</Label>
                                                <Input
                                                    id="nomor_surat"
                                                    value={data.nomor_surat}
                                                    onChange={(e) => setData("nomor_surat", e.target.value)}
                                                    className="h-12"
                                                    placeholder="Masukkan nomor surat"
                                                />
                                                {errors.nomor_surat && (
                                                    <p className="text-red-500 text-xs mt-1">{errors.nomor_surat}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="pengirim">Pengirim *</Label>
                                                <Input
                                                    id="pengirim"
                                                    value={data.pengirim}
                                                    onChange={(e) => setData("pengirim", e.target.value)}
                                                    className="h-12"
                                                    placeholder="Masukkan pengirim"
                                                />
                                                {errors.pengirim && (
                                                    <p className="text-red-500 text-xs mt-1">{errors.pengirim}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="tanggal_surat">Tanggal Surat *</Label>
                                                <Input
                                                    id="tanggal_surat"
                                                    type="date"
                                                    value={data.tanggal_surat}
                                                    onChange={(e) => setData("tanggal_surat", e.target.value)}
                                                    className="h-12"
                                                />
                                                {errors.tanggal_surat && (
                                                    <p className="text-red-500 text-xs mt-1">{errors.tanggal_surat}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="tanggal_terima">Tanggal Terima *</Label>
                                                <Input
                                                    id="tanggal_terima"
                                                    type="datetime-local"
                                                    value={data.tanggal_terima}
                                                    onChange={(e) => setData("tanggal_terima", e.target.value)}
                                                    className="h-12"
                                                />
                                                {errors.tanggal_terima && (
                                                    <p className="text-red-500 text-xs mt-1">{errors.tanggal_terima}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="sifat_surat">Sifat Surat *</Label>
                                            <Select
                                                value={String(data.sifat_surat)}
                                                onValueChange={(value) => setData("sifat_surat", Number(value))}
                                            >
                                                <SelectTrigger className="h-12" id="sifat_surat">
                                                    <SelectValue placeholder="Pilih sifat surat" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {sifatSuratOptions.map((s) => (
                                                        <SelectItem key={s.value} value={String(s.value)}>
                                                            {s.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.sifat_surat && (
                                                <p className="text-red-500 text-xs mt-1">{errors.sifat_surat}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="isi_surat">Isi Surat *</Label>
                                            <Textarea
                                                id="isi_surat"
                                                value={data.isi_surat}
                                                onChange={(e) => setData("isi_surat", e.target.value)}
                                                rows={4}
                                                placeholder="Masukkan isi ringkas surat"
                                                className="resize-none"
                                            />
                                            {errors.isi_surat && (
                                                <p className="text-red-500 text-xs mt-1">{errors.isi_surat}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="gambar">Lampiran File</Label>
                                            <Input
                                                id="gambar"
                                                type="file"
                                                onChange={(e) => setData("gambar", e.target.files?.[0] || null)}
                                                className="h-12"
                                                accept=".pdf,.doc,.docx"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                Format: PDF, DOC, DOCX (Maks. 5MB)
                                            </p>
                                            {errors.gambar && (
                                                <p className="text-red-500 text-xs mt-1">{errors.gambar}</p>
                                            )}
                                        </div>

                                        <div className="flex gap-4 pt-6">
                                            <Button
                                                type="submit"
                                                size="lg"
                                                className="flex-1 h-12 gap-2"
                                                disabled={processing}
                                            >
                                                <Send size={18} />
                                                {processing ? 'Menyimpan...' : 'Simpan Surat'}
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="lg"
                                                onClick={() => reset()}
                                                className="h-12 gap-2"
                                                disabled={processing}
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
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Surat Terakhir</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                                placeholder="Cari surat..."
                                className="pl-10 h-11"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-2">
                            {filteredSurat.map((s) => {
                                const sifatInfo = getSifatInfo(s.sifat_surat);
                                const statusInfo = getStatusInfo(s.status_akhir);
                                const StatusIcon = statusInfo.icon;

                                return (
                                    <div
                                        key={s.id}
                                        onClick={() => setSelectedSurat(s)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedSurat?.id === s.id
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <p className="font-bold text-sm truncate">{s.nomor_surat}</p>
                                                <p className="text-xs text-gray-500 mt-1">{s.pengirim}</p>
                                            </div>
                                            {/* <MoreHorizontal size={16} className="text-gray-400 flex-shrink-0" /> */}
                                        </div>

                                        <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                                            {s.isi_surat}
                                        </p>

                                        <div className="flex justify-between items-center mt-3">
                                            <span className={`px-2 py-1 text-white rounded-lg text-xs ${sifatInfo.color}`}>
                                                {sifatInfo.label}
                                            </span>

                                            <div className={`px-2 py-1 rounded-lg flex items-center gap-1 ${statusInfo.color}`}>
                                                <StatusIcon size={12} />
                                                <span className="text-xs">{statusInfo.label}</span>
                                            </div>
                                        </div>

                                        <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                                            <Clock size={12} />
                                            {new Date(s.tanggal_terima).toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {selectedSurat && (
                        <div className="p-4 border-t border-gray-200">
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
                            <div className="text-xs space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Penginput:</span>
                                    <span className="font-bold text-gray-900">
                                        {selectedSurat.users?.nama_lengkap ?? "-"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tanggal Surat:</span>
                                    <span className="font-bold text-gray-900">
                                        {new Date(selectedSurat.tanggal_surat).toLocaleDateString("id-ID")}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Status:</span>
                                    <span className="font-bold text-gray-900">
                                        {getStatusInfo(selectedSurat.status_akhir).label}
                                    </span>
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
                                    <h2 className="text-2xl font-bold text-gray-900">Detail Surat Masuk</h2>
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

                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-500 mb-1">Nomor Surat</p>
                                        <p className="text-base font-bold text-gray-900">{selectedSurat.nomor_surat}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-500 mb-1">Pengirim</p>
                                        <p className="text-base text-gray-900">{selectedSurat.pengirim}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-500 mb-1">Sifat Surat</p>
                                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-white ${getSifatInfo(selectedSurat.sifat_surat).color}`}>
                                            <span className="font-semibold">{getSifatInfo(selectedSurat.sifat_surat).label}</span>
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
                                        <p className="text-sm font-semibold text-gray-500 mb-1">Tanggal Terima</p>
                                        <p className="text-base text-gray-900">
                                            {new Date(selectedSurat.tanggal_terima).toLocaleString('id-ID', {
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
                                        <p className="text-sm font-semibold text-gray-500 mb-1">Status</p>
                                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${getStatusInfo(selectedSurat.status_akhir).color}`}>
                                            {(() => {
                                                const StatusIcon = getStatusInfo(selectedSurat.status_akhir).icon;
                                                return <StatusIcon size={16} />;
                                            })()}
                                            <span className="font-semibold">{getStatusInfo(selectedSurat.status_akhir).label}</span>
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
                                            src={route('verif.surat-masuk.file', selectedSurat.gambar.split('/').pop())}
                                            className="w-full h-[500px]"
                                            title="PDF Preview"
                                        />
                                        <div className="p-4 bg-white border-t border-gray-200 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Paperclip size={16} />
                                                <span>{selectedSurat.gambar.split('/').pop()}</span>
                                            </div>
                                            <a
                                                href={route('verif.surat-masuk.file', selectedSurat.gambar.split('/').pop())}
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