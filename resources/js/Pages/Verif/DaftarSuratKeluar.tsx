import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState, useEffect } from "react";
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
import { router } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Bidang = {
    id: number;
    nama_bidang: string;
};

type User = {
    id: number;
    nama_lengkap: string;
    jabatan: number;
};

type SuratKeluar = {
    id: number;
    nomor_surat: string;
    penerima: string;
    isi_surat: string;
    unit_pengirim: Bidang;
    user_penanda_tangan: User;
    tanggal_surat: string;
    tanggal_kirim: string;
    status_arsip: number;
    gambar?: string;
};

type Props = {
    suratKeluar: SuratKeluar[];
    bidangs: Bidang[];
    users: User[];
};

export default function DaftarSuratKeluar({ suratKeluar: initialSuratKeluar, bidangs, users }: Props) {
    const [suratKeluar, setSuratKeluar] = useState(initialSuratKeluar || []);
    const [selectedSurat, setSelectedSurat] = useState<SuratKeluar | null>(initialSuratKeluar?.[0] || null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterUnit, setFilterUnit] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showDetailModal, setShowDetailModal] = useState(false)

    useEffect(() => {
        if (initialSuratKeluar && initialSuratKeluar.length > 0) {
            setSuratKeluar(initialSuratKeluar);
            setSelectedSurat(initialSuratKeluar[0]);
        }
    }, [initialSuratKeluar]);

    const statusArsipOptions = [
        { value: 1, label: 'Belum Diarsipkan', icon: Clock, color: 'text-orange-600 bg-orange-100' },
        { value: 2, label: 'Sudah Diarsipkan', icon: CheckCircle, color: 'text-green-600 bg-green-100' }
    ];

    const getStatusArsipInfo = (status: number) => {
        return statusArsipOptions.find(s => s.value === status) || statusArsipOptions[0];
    };

    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };


    const getJabatanRole = (jabatan: number) => {
        switch (jabatan) {
            case 1: return "ADMIN"
            case 2: return "KEPALA"
            case 3: return "STAF"
            case 4: return "VERIFIKATOR"
            default: return "STAF"
        }
    }

    const formatDateTime = (dateString: string | null | undefined) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Filter surat keluar berdasarkan search dan filter
    const filteredSuratKeluar = suratKeluar.filter(surat => {
        const matchSearch = searchQuery === '' ||
            surat.nomor_surat.toLowerCase().includes(searchQuery.toLowerCase()) ||
            surat.penerima.toLowerCase().includes(searchQuery.toLowerCase()) ||
            surat.isi_surat.toLowerCase().includes(searchQuery.toLowerCase());

        const matchUnit = filterUnit === 'all' || surat.unit_pengirim.id.toString() === filterUnit;
        const matchStatus = filterStatus === 'all' || surat.status_arsip.toString() === filterStatus;

        return matchSearch && matchUnit && matchStatus;
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleUnitFilter = (value: string) => {
        setFilterUnit(value);
    };

    const handleStatusFilter = (value: string) => {
        setFilterStatus(value);
    };

    const handlePreviewFile = (filename: string) => {
        if (filename) {
            window.open(route('verif.surat-keluar.preview', filename), '_blank');
        }
    };


    const handleExport = () => {
        console.log('Export data');
    };

    const handleDelete = () => {
        if (!deleteId) return;

        router.delete(`/verif/input-surat-keluar/${deleteId}`, {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteModalOpen(false);
                setSelectedSurat(null);
            }
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
                                <Button variant="outline" size="lg" className="gap-2" onClick={handleExport}>
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
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                            </div>
                            <Select value={filterUnit} onValueChange={handleUnitFilter}>
                                <SelectTrigger className="w-40 h-11">
                                    <SelectValue placeholder="Unit Pengirim" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Unit</SelectItem>
                                    {bidangs && bidangs.map((bidang) => (
                                        <SelectItem key={bidang.id} value={bidang.id.toString()}>
                                            {bidang.nama_bidang}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={filterStatus} onValueChange={handleStatusFilter}>
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
                            {filteredSuratKeluar.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">Tidak ada data surat keluar</p>
                                </div>
                            ) : (
                                filteredSuratKeluar.map((surat) => {
                                    const statusInfo = getStatusArsipInfo(surat.status_arsip);
                                    const StatusIcon = statusInfo.icon;

                                    return (
                                        <div
                                            key={surat.id}
                                            onClick={() => setSelectedSurat(surat)}
                                            className={`bg-white rounded-xl border-2 p-5 cursor-pointer transition-all duration-200 group hover:shadow-lg ${selectedSurat?.id === surat.id
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
                                                                <span>{surat.unit_pengirim.nama_bidang}</span>
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
                                                                <span>{surat.user_penanda_tangan.nama_lengkap.split(',')[0]}</span>
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
                                })
                            )}
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
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-9 w-9 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => {
                                            setDeleteId(selectedSurat.id);
                                            setDeleteModalOpen(true);
                                        }}
                                    >
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
                                    <span className="text-sm font-medium text-gray-900">{selectedSurat.unit_pengirim.nama_bidang}</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Penanda Tangan</p>
                                <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-sm font-bold text-white">
                                            {selectedSurat.user_penanda_tangan.nama_lengkap.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{selectedSurat.user_penanda_tangan.nama_lengkap}</p>
                                            <p className="text-xs text-gray-500">{getJabatanRole(selectedSurat.user_penanda_tangan.jabatan)}</p>
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
                                    <div
                                        className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center gap-3 hover:bg-gray-100 transition-colors cursor-pointer"
                                        onClick={() => handlePreviewFile((selectedSurat.gambar?.split('/').pop()) || '')}
                                    >
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <FileText className="text-purple-600" size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-gray-900">{selectedSurat.gambar.split('/').pop()}</p>
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
                            <Button
                                onClick={() => setShowDetailModal(true)}
                                size="lg"
                                className="w-full gap-2 bg-purple-600 hover:bg-purple-700">
                                <Eye size={18} />
                                Lihat Detail Lengkap
                            </Button>
                        </div>
                    </div>
                )}

                <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                    <DialogContent className="max-w-sm">
                        <DialogHeader>
                            <DialogTitle>Hapus Surat?</DialogTitle>
                            <DialogDescription>
                                Surat yang dihapus tidak dapat dikembalikan. Yakin ingin melanjutkan?
                            </DialogDescription>
                        </DialogHeader>

                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setDeleteModalOpen(false)}
                            >
                                Batal
                            </Button>

                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                            >
                                Hapus
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

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
                                            <p className="text-base text-gray-900">{selectedSurat.unit_pengirim.nama_bidang}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-500 mb-1">Penanda Tangan</p>
                                        <div className="flex items-center gap-2">
                                            <PenTool size={16} className="text-purple-600" />
                                            <p className="text-base text-gray-900">{selectedSurat.user_penanda_tangan.nama_lengkap}</p>
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