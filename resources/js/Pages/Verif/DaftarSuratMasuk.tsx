import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Mail, Search, Filter, Download, Eye, Edit2, Trash2, MoreVertical, Calendar, User, FileText, AlertCircle, Clock, CheckCircle, XCircle, Paperclip, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { usePage } from "@inertiajs/react";

export default function DaftarSuratMasuk() {
    const { surat } = usePage().props
    const [suratMasuk, setSuratMasuk] = useState(surat)

    const [selectedSurat, setSelectedSurat] = useState(surat?.[0] ?? null);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

    const sifatSuratOptions = [
        { value: 1, label: 'Biasa', color: 'bg-gray-500', textColor: 'text-gray-700', bgLight: 'bg-gray-100' },
        { value: 2, label: 'Penting', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgLight: 'bg-yellow-100' },
        { value: 3, label: 'Segera', color: 'bg-orange-500', textColor: 'text-orange-700', bgLight: 'bg-orange-100' },
        { value: 4, label: 'Rahasia', color: 'bg-red-500', textColor: 'text-red-700', bgLight: 'bg-red-100' }
    ];

    const statusOptions = [
        { value: 1, label: 'Draft', icon: Clock, color: 'text-gray-600 bg-gray-100' },
        { value: 2, label: 'Terkirim', icon: CheckCircle, color: 'text-green-600 bg-green-100' },
        { value: 3, label: 'Diproses', icon: AlertCircle, color: 'text-blue-600 bg-blue-100' }
    ];

    const getSifatInfo = (sifat) => {
        return sifatSuratOptions.find(s => s.value === sifat) || sifatSuratOptions[0];
    };

    const getStatusInfo = (status) => {
        return statusOptions.find(s => s.value === status) || statusOptions[0];
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatDateTime = (dateString) => {
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
                                    <Mail className="text-white" size={24} />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                        Daftar Surat Masuk
                                    </h1>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Kelola dan pantau semua surat masuk
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

                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-4">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                                <p className="text-xs font-medium text-blue-600 mb-1">Total Surat</p>
                                <p className="text-2xl font-bold text-blue-900">{suratMasuk.length}</p>
                            </div>
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                                <p className="text-xs font-medium text-gray-600 mb-1">Draft</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {suratMasuk.filter(s => s.status_akhir === 1).length}
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                                <p className="text-xs font-medium text-green-600 mb-1">Terkirim</p>
                                <p className="text-2xl font-bold text-green-900">
                                    {suratMasuk.filter(s => s.status_akhir === 2).length}
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                                <p className="text-xs font-medium text-blue-600 mb-1">Diproses</p>
                                <p className="text-2xl font-bold text-blue-900">
                                    {suratMasuk.filter(s => s.status_akhir === 3).length}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Toolbar */}
                    <div className="bg-white border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    placeholder="Cari nomor surat, pengirim, atau isi surat..."
                                    className="pl-10 h-11"
                                />
                            </div>
                            <Select defaultValue="all">
                                <SelectTrigger className="w-40 h-11">
                                    <SelectValue placeholder="Sifat Surat" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Sifat</SelectItem>
                                    <SelectItem value="1">Biasa</SelectItem>
                                    <SelectItem value="2">Penting</SelectItem>
                                    <SelectItem value="3">Segera</SelectItem>
                                    <SelectItem value="4">Rahasia</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="all">
                                <SelectTrigger className="w-40 h-11">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Status</SelectItem>
                                    <SelectItem value="1">Draft</SelectItem>
                                    <SelectItem value="2">Terkirim</SelectItem>
                                    <SelectItem value="3">Diproses</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="flex gap-1 border border-gray-200 rounded-lg p-1">
                                <Button
                                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('list')}
                                    className="h-9 w-9 p-0"
                                >
                                    <List size={16} />
                                </Button>
                                <Button
                                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('grid')}
                                    className="h-9 w-9 p-0"
                                >
                                    <Grid3X3 size={16} />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Content Area - List View */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="space-y-2">
                            {suratMasuk.map((surat) => {
                                const sifatInfo = getSifatInfo(surat.sifat_surat);
                                const statusInfo = getStatusInfo(surat.status_akhir);
                                const StatusIcon = statusInfo.icon;

                                return (
                                    <div
                                        key={surat.id}
                                        onClick={() => setSelectedSurat(surat)}
                                        className={`bg-white rounded-xl border-2 p-5 cursor-pointer transition-all duration-200 group hover:shadow-lg ${
                                            selectedSurat?.id === surat.id
                                                ? 'border-blue-500 shadow-lg ring-4 ring-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Icon */}
                                            <div className={`w-12 h-12 ${sifatInfo.bgLight} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                                <Mail className={sifatInfo.textColor} size={20} />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex-1">
                                                        <h3 className="font-bold text-gray-900 text-base mb-1">
                                                            {surat.nomor_surat}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 font-medium">
                                                            {surat.pengirim}
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
                                                            <Calendar size={14} />
                                                            <span>{formatDate(surat.tanggal_surat)}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock size={14} />
                                                            <span>{formatDateTime(surat.tanggal_terima)}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <User size={14} />
                                                            <span>{surat.user_input}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold text-white ${sifatInfo.color}`}>
                                                            {sifatInfo.label}
                                                        </span>
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
                                <div className="flex gap-2">
                                    {(() => {
                                        const sifatInfo = getSifatInfo(selectedSurat.sifat_surat);
                                        const statusInfo = getStatusInfo(selectedSurat.status_akhir);
                                        const StatusIcon = statusInfo.icon;
                                        return (
                                            <>
                                                <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-white ${sifatInfo.color}`}>
                                                    {sifatInfo.label}
                                                </span>
                                                <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${statusInfo.color} flex items-center gap-1.5`}>
                                                    <StatusIcon size={14} />
                                                    {statusInfo.label}
                                                </span>
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Pengirim</p>
                                <p className="text-sm font-medium text-gray-900">{selectedSurat.pengirim}</p>
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
                                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Diterima</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-900">
                                        <Clock size={16} className="text-gray-400" />
                                        <span>{formatDateTime(selectedSurat.tanggal_terima)}</span>
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
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <FileText className="text-blue-600" size={20} />
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

                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Diinput Oleh</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold text-white">
                                        {selectedSurat.user_input.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{selectedSurat.user_input}</p>
                                        <p className="text-xs text-gray-500">Administrator</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 border-t border-gray-200 bg-gray-50">
                            <Button size="lg" className="w-full gap-2">
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