import { useState } from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    AlertCircle,
    Clock,
    FileText,
    TrendingUp,
    Users,
    CheckCircle,
    ArrowRight,
    Calendar,
    Zap,
    BarChart3
} from 'lucide-react';
import { usePage, router } from "@inertiajs/react";
import { PageProps } from '@/types';

interface DashboardStats {
    surat_menunggu: number;
    surat_urgen: number;
    tugas_tertunda: number;
    rata_waktu_disposisi: number;
    tingkat_penyelesaian: number;
}

interface VolumeSurat {
    bulan: string;
    jumlah: number;
}

interface StatusTugas {
    status: 'Selesai' | 'Proses' | 'Belum';
    jumlah: number;
    persen: number;
}

interface DashboardTrends {
    volume_surat: VolumeSurat[];
    status_tugas: StatusTugas[];
}

interface RecentActivity {
    laporan_terbaru: {
        id: number;
        staff: string;
        tugas: string;
        waktu: string;
        status: 'selesai' | 'proses';
    }[];
    surat_selesai: {
        id: number;
        nomor: string;
        perihal: string;
        waktu: string;
    }[];
}

interface DashboardProps extends PageProps {
    stats: DashboardStats;
    trendData: DashboardTrends;
    recentActivities: RecentActivity;
}


export default function Dashboard() {
    const {
        stats = {
            surat_menunggu: 0,
            surat_urgen: 0,
            tugas_tertunda: 0,
            rata_waktu_disposisi: 0,
            tingkat_penyelesaian: 0
        },
        trendData = {
            volume_surat: [],
            status_tugas: []
        },
        recentActivities = {
            laporan_terbaru: [],
            surat_selesai: []
        }
    } = usePage<DashboardProps>().props;

    const data = stats;
    const trends = trendData;
    const activities = recentActivities;

    const today = new Date();
    const formattedDate = today.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // Fungsi navigasi
    const navigateToSuratMenunggu = () => {
        router.visit(route('kepala.surat.menunggu'));
    };

    const navigateToTugasTertunda = () => {
        router.visit(route('kepala.tugas.tertunda'));
    };

    return (
        <Authenticated>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                                <p className="mt-1 text-sm text-gray-500">
                                    Monitoring dan analisis kinerja sistem disposisi
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>{formattedDate}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                    {/* 1. Ringkasan Tugas Mendesak */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Tugas Mendesak</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Widget 1: Surat Menunggu Disposisi */}
                            <button
                                onClick={navigateToSuratMenunggu}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group text-left"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                        <FileText className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                </div>
                                <div className="mb-1">
                                    <p className="text-3xl font-bold text-gray-900">{data.surat_menunggu}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-700">Surat Menunggu Disposisi</p>
                                <p className="text-xs text-gray-500 mt-1">Perlu segera diproses</p>
                            </button>

                            {/* Widget 2: Urgen Belum Diproses */}
                            <button
                                onClick={navigateToSuratMenunggu}
                                className="bg-white rounded-lg shadow-sm border-2 border-red-200 p-6 hover:shadow-md transition-all group text-left"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                                        <AlertCircle className="w-6 h-6 text-red-600" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                                </div>
                                <div className="mb-1">
                                    <p className="text-3xl font-bold text-red-600">{data.surat_urgen}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-700">Surat Urgen</p>
                                <p className="text-xs text-gray-500 mt-1">Penting & Segera</p>
                            </button>

                            {/* Widget 3: Tugas Tertunda Staf */}
                            <button
                                onClick={navigateToTugasTertunda}
                                className="bg-white rounded-lg shadow-sm border border-amber-200 p-6 hover:shadow-md transition-all group text-left"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                                        <Clock className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-600 transition-colors" />
                                </div>
                                <div className="mb-1">
                                    <p className="text-3xl font-bold text-amber-600">{data.tugas_tertunda}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-700">Tugas Tertunda Staf</p>
                                <p className="text-xs text-gray-500 mt-1">&gt; 5 hari belum selesai</p>
                            </button>
                        </div>
                    </div>

                    {/* 2. Monitoring Kinerja Tim */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Monitoring Kinerja Tim</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* KPI 1: Rata-rata Waktu Disposisi */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                        Baik
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-gray-600 mb-2">Rata-rata Waktu Disposisi</p>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-3xl font-bold text-gray-900">{data.rata_waktu_disposisi}</p>
                                    <span className="text-sm text-gray-500">hari</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Waktu proses surat hingga disposisi</p>
                            </div>

                            {/* KPI 2: Tingkat Penyelesaian */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-green-600" />
                                    </div>
                                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                        +5% minggu ini
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-gray-600 mb-2">Tingkat Penyelesaian Tugas</p>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-3xl font-bold text-gray-900">{data.tingkat_penyelesaian}</p>
                                    <span className="text-sm text-gray-500">%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                                    <div
                                        className="bg-green-600 h-2 rounded-full transition-all"
                                        style={{ width: `${data.tingkat_penyelesaian}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Visualisasi Tren */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Grafik Volume Surat */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900">Tren Volume Surat Masuk</h3>
                                    <p className="text-xs text-gray-500 mt-1">6 bulan terakhir</p>
                                </div>
                                <BarChart3 className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="space-y-3">
                                {trends.volume_surat.map((item, index) => {
                                    const maxValue = Math.max(...trends.volume_surat.map(d => d.jumlah));
                                    const percentage = (item.jumlah / maxValue) * 100;
                                    return (
                                        <div key={index}>
                                            <div className="flex items-center justify-between text-sm mb-1">
                                                <span className="font-medium text-gray-700">{item.bulan}</span>
                                                <span className="text-gray-900 font-semibold">{item.jumlah}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full transition-all"
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Pie Chart Status Tugas */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900">Status Tugas Tim</h3>
                                    <p className="text-xs text-gray-500 mt-1">Distribusi status tugas</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {trends.status_tugas.map((item, index) => {
                                    const colors = {
                                        'Selesai': { bg: 'bg-green-100', text: 'text-green-700', bar: 'bg-green-600' },
                                        'Proses': { bg: 'bg-blue-100', text: 'text-blue-700', bar: 'bg-blue-600' },
                                        'Belum': { bg: 'bg-gray-100', text: 'text-gray-700', bar: 'bg-gray-600' }
                                    };
                                    const color = colors[item.status];
                                    return (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`w-3 h-3 rounded-full ${color.bar}`}></span>
                                                        <span className="text-sm font-medium text-gray-700">{item.status}</span>
                                                    </div>
                                                    <span className="text-sm font-semibold text-gray-900">{item.jumlah}</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`${color.bar} h-2 rounded-full transition-all`}
                                                        style={{ width: `${item.persen}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <span className={`text-sm font-semibold ${color.text} min-w-[3rem] text-right`}>
                                                {item.persen}%
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Total Tugas</span>
                                    <span className="font-bold text-gray-900">
                                        {trends.status_tugas.reduce((sum, item) => sum + item.jumlah, 0)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Aktivitas Terbaru */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Laporan Tindak Lanjut Terbaru */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-semibold text-gray-900">Laporan Terbaru</h3>
                                <a href="/kepala/laporan-kinerja" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                    Lihat Semua
                                </a>
                            </div>
                            <div className="space-y-4">
                                {activities.laporan_terbaru.map((item) => (
                                    <div key={item.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Users className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{item.staff}</p>
                                            <p className="text-sm text-gray-600 truncate">{item.tugas}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-gray-500">{item.waktu}</span>
                                                {item.status === 'selesai' ? (
                                                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                                        Selesai
                                                    </span>
                                                ) : (
                                                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                                        Progress
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Surat Baru Selesai */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-semibold text-gray-900">Surat Baru Selesai</h3>
                                <a href="/kepala/lacak-disposisi" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                    Lihat Semua
                                </a>
                            </div>
                            <div className="space-y-4">
                                {activities.surat_selesai.map((item) => (
                                    <div key={item.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900">{item.nomor}</p>
                                            <p className="text-sm text-gray-600 truncate">{item.perihal}</p>
                                            <span className="text-xs text-gray-500 mt-1 inline-block">{item.waktu}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}