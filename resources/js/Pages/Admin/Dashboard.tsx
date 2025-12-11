import { useState } from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Users, Building2, FileText, Send, AlertCircle, Clock, TrendingUp, ChevronRight, Activity, BarChart3, CheckCircle } from 'lucide-react';
import StatCard from './components/StatsCard';
import AlertCard from './components/AlertCard';
import ActivityItem from './components/ActivityItem';
import { router, usePage } from '@inertiajs/react';
import { SuratMasuk } from '@/types/surat-masuk';

const mockData = {
    stats: {
        totalUsers: 156,
        totalBidang: 24,
        suratMasuk: 1243,
        suratKeluar: 987
    },
    alerts: {
        pendingVerifikasi: 12,
        disposisiTerlambat: 5
    },
    recentActivity: [
        { id: 1, type: 'masuk', nomor: 'SM/2024/001', pengirim: 'Dinas Pendidikan', verifikator: 'Ahmad Subandi', timestamp: '2 menit lalu' },
        { id: 2, type: 'keluar', nomor: 'SK/2024/045', tujuan: 'Kementerian Keuangan', verifikator: 'Siti Nurhaliza', timestamp: '15 menit lalu' },
        { id: 3, type: 'masuk', nomor: 'SM/2024/002', pengirim: 'Bappeda', verifikator: 'Budi Santoso', timestamp: '1 jam lalu' },
        { id: 4, type: 'keluar', nomor: 'SK/2024/046', tujuan: 'DPRD', verifikator: 'Ahmad Subandi', timestamp: '2 jam lalu' },
        { id: 5, type: 'masuk', nomor: 'SM/2024/003', pengirim: 'Sekretariat Daerah', verifikator: 'Dewi Lestari', timestamp: '3 jam lalu' }
    ]
};

export default function Dashboard() {
    const [timeFilter, setTimeFilter] = useState('today');
    const { suratMasuk, suratKeluar, users, unitKerja, suratMenunggu, recentActivity } = usePage().props

    const handleNavigation = (path: string) => {
        router.visit(path)
    };

    return (
        <Authenticated>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100">
                {/* Header dengan glass effect seperti Netflix/Bilibili */}
                <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200/50 shadow-sm">
                    <div className="px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard Admin</h1>
                                <p className="text-sm text-gray-600 mt-1.5 font-medium">Monitor sistem secara real-time dengan data terkini</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-8 py-8">
                    {/* Widget Statistik Utama dengan gradient modern */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            icon={<Users className="w-6 h-6 text-gray-700" />}
                            title="Pengguna Aktif"
                            value={users?.length ?? 0}
                            buttonText="Kelola Pengguna"
                            onClick={() => handleNavigation('/admin/users')}
                            accentColor="bg-blue-500"
                            bgPattern="bg-blue-50"
                        />
                        <StatCard
                            icon={<Building2 className="w-6 h-6 text-gray-700" />}
                            title="Unit Kerja"
                            value={unitKerja?.length ?? 0}
                            buttonText="Kelola Bidang"
                            onClick={() => handleNavigation('/admin/bidang')}
                            accentColor="bg-purple-500"
                            bgPattern="bg-purple-50"
                        />
                        <StatCard
                            icon={<FileText className="w-6 h-6 text-gray-700" />}
                            title="Surat Masuk Total"
                            value={suratMasuk.length}
                            buttonText="Lihat Arsip Global"
                            onClick={() => handleNavigation('/admin/arsip?type=masuk')}
                            accentColor="bg-emerald-500"
                            bgPattern="bg-emerald-50"
                        />
                        <StatCard
                            icon={<Send className="w-6 h-6 text-gray-700" />}
                            title="Surat Keluar Total"
                            value={suratKeluar?.length ?? 0}
                            buttonText="Lihat Arsip Global"
                            onClick={() => handleNavigation('/admin/arsip?type=keluar')}
                            accentColor="bg-orange-500"
                            bgPattern="bg-orange-50"
                        />
                    </div>

                    {/* Widget Pemantauan Integritas */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 bg-amber-100 rounded-xl">
                                <AlertCircle className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Pemantauan Integritas</h2>
                                <p className="text-sm text-gray-600">Pantau potensi masalah yang memerlukan perhatian</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <AlertCard
                                icon={<Clock className="w-6 h-6 text-amber-600" />}
                                title="Surat Menunggu Verifikasi"
                                count={suratMenunggu?.length ?? 0}
                                description="Surat dengan status PENDING yang perlu diverifikasi segera"
                                color="bg-amber-500"
                            />
                            <AlertCard
                                icon={<TrendingUp className="w-6 h-6 text-red-600" />}
                                title="Disposisi Terlambat"
                                count={mockData.alerts.disposisiTerlambat}
                                description="Disposisi yang belum ditindaklanjuti melebihi 14 hari"
                                color="bg-red-500"
                            />
                        </div>
                    </div>

                    {/* Quick Links & Aktivitas */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Quick Links dengan design card modern */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="p-2 bg-indigo-100 rounded-xl">
                                        <BarChart3 className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">Akses Cepat</h2>
                                        <p className="text-xs text-gray-600">Pintu masuk fitur utama</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <button
                                        onClick={() => handleNavigation('/admin/manage-user')}
                                        className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-2xl transition-all duration-300 group border border-blue-100 hover:border-blue-200"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                                                <Users className="w-5 h-5 text-white" />
                                            </div>
                                            <span className="font-semibold text-gray-800">Manajemen Pengguna</span>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-2 transition-transform" />
                                    </button>
                                    <button
                                        onClick={() => handleNavigation('/admin/master-data')}
                                        className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-2xl transition-all duration-300 group border border-purple-100 hover:border-purple-200"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
                                                <Building2 className="w-5 h-5 text-white" />
                                            </div>
                                            <span className="font-semibold text-gray-800">Master Data Bidang</span>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-2 transition-transform" />
                                    </button>
                                    <button
                                        onClick={() => handleNavigation('/admin/arsip-global')}
                                        className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 rounded-2xl transition-all duration-300 group border border-emerald-100 hover:border-emerald-200"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
                                                <FileText className="w-5 h-5 text-white" />
                                            </div>
                                            <span className="font-semibold text-gray-800">Arsip Global</span>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-2 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Log Aktivitas Terbaru */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-100 rounded-xl">
                                            <Activity className="w-6 h-6 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900">Aktivitas Input Terbaru</h2>
                                            <p className="text-xs text-gray-600">5 surat terbaru yang baru diinput</p>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
                                        Lihat Semua
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {recentActivity.map((activity) => (
                                        <ActivityItem
                                            key={activity.id}
                                            type={activity.type}
                                            nomor={activity.nomor}
                                            detail={activity.detail}
                                            verifikator={activity.verifikator}
                                            timestamp={activity.timestamp}
                                        />
                                    ))}
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-sm text-gray-600">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>Sistem sedang aktif digunakan</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}