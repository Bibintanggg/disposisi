import { useState } from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { 
    Inbox,
    Clock,
    AlertTriangle,
    MessageSquare,
    TrendingUp,
    CheckCircle2,
    Zap,
    ArrowRight,
    PlayCircle,
    Eye
} from "lucide-react";
import { usePage, router } from "@inertiajs/react";
import { DashboardProps } from '@/types/dashboard-types';

export default function Dashboard() {
    const { stats, performanceData, tugasMendesak } = usePage<DashboardProps>().props;

    const navigateToInbox = () => {
        router.visit(route('staf.tugas-masuk'));
    };

    const navigateToProses = () => {
        router.visit(route('staf.tugas-proses'));
    };

    const handleMulaiTugas = () => {
        router.visit(route('staf.tugas-masuk'));
    };

    const handleLihatTugas = () => {
        router.visit(route('staf.tugas-proses'));
    };

    return (
        <Authenticated>
            <div className="min-h-screen bg-gray-50">
                {/* Header Welcome */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold mb-1">Selamat Datang Kembali!</h1>
                                <p className="text-blue-100">
                                    Anda memiliki {stats.tugas_baru} tugas baru yang menunggu
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                                    <p className="text-sm text-blue-100">Target Bulan Ini</p>
                                    <p className="text-xl font-bold">
                                        {performanceData.total_selesai_bulan_ini}/15 Tugas
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Widget 1: Tugas Baru */}
                        <button
                            onClick={navigateToInbox}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-lg hover:border-blue-300 transition-all group text-left relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
                            <div className="relative">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Inbox className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900 mb-1">{stats.tugas_baru}</p>
                                <p className="text-sm font-medium text-gray-700">Tugas Baru</p>
                                <p className="text-xs text-gray-500 mt-1">Di Inbox</p>
                            </div>
                        </button>

                        {/* Widget 2: Sedang Diproses */}
                        <button
                            onClick={navigateToProses}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-lg hover:border-purple-300 transition-all group text-left relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
                            <div className="relative">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900 mb-1">{stats.tugas_proses}</p>
                                <p className="text-sm font-medium text-gray-700">Sedang Diproses</p>
                                <p className="text-xs text-gray-500 mt-1">Aktif dikerjakan</p>
                            </div>
                        </button>

                        {/* Widget 3: Mendekati Deadline */}
                        <div className="bg-white rounded-xl shadow-sm border-2 border-amber-200 p-5 text-left relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-amber-50 rounded-full -mr-10 -mt-10"></div>
                            <div className="relative">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                                        Urgent
                                    </span>
                                </div>
                                <p className="text-3xl font-bold text-amber-600 mb-1">{stats.tugas_deadline}</p>
                                <p className="text-sm font-medium text-gray-700">Mendekati Deadline</p>
                                <p className="text-xs text-gray-500 mt-1">&gt; 4 hari berjalan</p>
                            </div>
                        </div>

                        {/* Widget 4: Laporan Menunggu */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-left relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gray-50 rounded-full -mr-10 -mt-10"></div>
                            <div className="relative">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <MessageSquare className="w-5 h-5 text-gray-600" />
                                    </div>
                                </div>
                                <p className="text-3xl font-bold text-gray-900 mb-1">{stats.laporan_menunggu}</p>
                                <p className="text-sm font-medium text-gray-700">Menunggu Respon</p>
                                <p className="text-xs text-gray-500 mt-1">Laporan terkirim</p>
                            </div>
                        </div>
                    </div>

                    {/* 2. Kinerja Mandiri */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            Kinerja Saya
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* KPI 1: Tingkat Penyelesaian */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    </div>
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                        performanceData.tingkat_penyelesaian >= 80 
                                            ? 'text-green-600 bg-green-50'
                                            : performanceData.tingkat_penyelesaian >= 60
                                            ? 'text-yellow-600 bg-yellow-50'
                                            : 'text-red-600 bg-red-50'
                                    }`}>
                                        {performanceData.tingkat_penyelesaian >= 80 
                                            ? 'Excellent' 
                                            : performanceData.tingkat_penyelesaian >= 60 
                                            ? 'Good' 
                                            : 'Needs Improvement'}
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-gray-600 mb-2">Tingkat Penyelesaian</p>
                                <div className="flex items-baseline gap-2 mb-3">
                                    <p className="text-3xl font-bold text-gray-900">
                                        {performanceData.tingkat_penyelesaian}
                                    </p>
                                    <span className="text-sm text-gray-500">%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-green-600 h-2 rounded-full transition-all" 
                                        style={{ width: `${performanceData.tingkat_penyelesaian}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* KPI 2: Rata-rata Waktu */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-blue-600" />
                                    </div>
                                </div>
                                <p className="text-sm font-medium text-gray-600 mb-2">Rata-rata Waktu</p>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-3xl font-bold text-gray-900">
                                        {performanceData.rata_waktu}
                                    </p>
                                    <span className="text-sm text-gray-500">hari</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Per tugas selesai</p>
                            </div>

                            {/* KPI 3: Trend Laporan Kemajuan */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                                <div className="mb-3">
                                    <p className="text-sm font-medium text-gray-600">Aktivitas Laporan</p>
                                    <p className="text-xs text-gray-500 mt-1">4 minggu terakhir</p>
                                </div>
                                <div className="flex items-end justify-between gap-1.5 h-20">
                                    {performanceData.trend_laporan.map((item, index) => {
                                        const maxValue = Math.max(...performanceData.trend_laporan.map(d => d.jumlah));
                                        const height = maxValue > 0 ? (item.jumlah / maxValue) * 100 : 0;
                                        return (
                                            <div key={index} className="flex-1 flex flex-col items-center gap-1">
                                                <div 
                                                    className="w-full bg-blue-600 rounded-t transition-all hover:bg-blue-700" 
                                                    style={{ height: `${Math.max(height, 5)}%` }}
                                                ></div>
                                                <span className="text-xs text-gray-500">{item.minggu}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Visualisasi Beban Kerja */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Status Tugas Aktif */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-base font-semibold text-gray-900 mb-4">Status Tugas Saya</h3>
                            <div className="space-y-4">
                                {performanceData.status_tugas.map((item, index) => {
                                    const colors = {
                                        green: { bg: 'bg-green-600', light: 'bg-green-100', text: 'text-green-700' },
                                        blue: { bg: 'bg-blue-600', light: 'bg-blue-100', text: 'text-blue-700' },
                                        gray: { bg: 'bg-gray-600', light: 'bg-gray-100', text: 'text-gray-700' }
                                    };
                                    const color = colors[item.color];
                                    return (
                                        <div key={index}>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-3 h-3 rounded-full ${color.bg}`}></span>
                                                    <span className="text-sm font-medium text-gray-700">{item.status}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm text-gray-600">{item.jumlah}</span>
                                                    <span className={`text-sm font-semibold ${color.text}`}>{item.persen}%</span>
                                                </div>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className={`${color.bg} h-2 rounded-full transition-all`}
                                                    style={{ width: `${item.persen}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Tren Tugas Selesai */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-base font-semibold text-gray-900 mb-4">Tren Penyelesaian</h3>
                            <div className="space-y-3">
                                {performanceData.trend_selesai.map((item, index) => {
                                    const maxValue = Math.max(...performanceData.trend_selesai.map(d => d.jumlah));
                                    const percentage = maxValue > 0 ? (item.jumlah / maxValue) * 100 : 0;
                                    return (
                                        <div key={index}>
                                            <div className="flex items-center justify-between text-sm mb-1">
                                                <span className="font-medium text-gray-700">{item.periode}</span>
                                                <span className="text-gray-900 font-semibold">{item.jumlah}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className="bg-green-600 h-2 rounded-full transition-all" 
                                                    style={{ width: `${Math.max(percentage, 5)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* 4. Tugas Paling Mendesak */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Tugas Baru Teratas */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                                    <Inbox className="w-5 h-5 text-blue-600" />
                                    Tugas Prioritas Tinggi
                                </h3>
                                <button 
                                    onClick={navigateToInbox}
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Lihat Semua
                                </button>
                            </div>
                            <div className="space-y-3">
                                {tugasMendesak.tugas_baru_teratas.length > 0 ? (
                                    tugasMendesak.tugas_baru_teratas.map((item) => (
                                        <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all">
                                            <div className="flex items-start justify-between mb-2">
                                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                                    item.sifat === 'Segera' 
                                                        ? 'bg-red-100 text-red-700' 
                                                        : item.sifat === 'Penting'
                                                        ? 'bg-amber-100 text-amber-700'
                                                        : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                    {item.sifat}
                                                </span>
                                                <span className="text-xs text-gray-500">{item.waktu}</span>
                                            </div>
                                            <p className="text-sm font-semibold text-gray-900 mb-1">{item.nomor_surat}</p>
                                            <p className="text-sm text-gray-700 mb-2">{item.perihal}</p>
                                            <p className="text-xs text-gray-600 line-clamp-2 mb-3">{item.instruksi}</p>
                                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                                <span className="text-xs text-gray-500">Dari: {item.dari}</span>
                                                <button
                                                    onClick={() => handleMulaiTugas(item.id)}
                                                    className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                                >
                                                    <PlayCircle className="w-3.5 h-3.5" />
                                                    Mulai
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <Inbox className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                        <p className="text-sm">Tidak ada tugas baru</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tugas Proses Terlama */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-amber-600" />
                                    Tugas Perlu Perhatian
                                </h3>
                                <button 
                                    onClick={navigateToProses}
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Lihat Semua
                                </button>
                            </div>
                            <div className="space-y-3">
                                {tugasMendesak.tugas_proses_terlama.length > 0 ? (
                                    tugasMendesak.tugas_proses_terlama.map((item) => (
                                        <div key={item.id} className="border border-amber-200 rounded-lg p-4 bg-amber-50/30 hover:shadow-sm transition-all">
                                            <div className="flex items-start justify-between mb-2">
                                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                                                    {item.waktu_berjalan}
                                                </span>
                                                <AlertTriangle className="w-4 h-4 text-amber-600" />
                                            </div>
                                            <p className="text-sm font-semibold text-gray-900 mb-1">{item.nomor_surat}</p>
                                            <p className="text-sm text-gray-700 mb-2">{item.perihal}</p>
                                            <p className="text-xs text-gray-600 line-clamp-2 mb-3">{item.instruksi}</p>
                                            <div className="flex items-center justify-between pt-3 border-t border-amber-100">
                                                <div>
                                                    <p className="text-xs text-gray-500">Status: {item.progress}</p>
                                                    <p className="text-xs text-gray-500">Dari: {item.dari}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleLihatTugas(item.id)}
                                                    className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    Lihat
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <Clock className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                        <p className="text-sm">Tidak ada tugas dalam proses</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}