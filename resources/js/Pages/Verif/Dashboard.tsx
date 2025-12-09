import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useState, useEffect, useRef } from "react";
import { router } from "@inertiajs/react";
import { Mail, Send, Clock, CheckCircle, Calendar, ArrowUp, ArrowDown, Minus, Zap, Target, Users, Activity, Eye, RefreshCw } from "lucide-react";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

export default function Dashboard({ 
    stats, 
    suratBulananData, 
    sifatSuratData, 
    verifikasiTrendData, 
    topBidangData, 
    recentSurat,
    performance,
    debug 
}) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const [realtimeMetrics, setRealtimeMetrics] = useState({
        responseTime: performance.responseTime,
        approvalRate: performance.approvalRate,
        activeUsers: performance.activeUsers,
        responseTimeChange: 0,
        approvalRateChange: 0,
        activeUsersChange: 0
    });

    const prevMetrics = useRef({
        responseTime: performance.responseTime,
        approvalRate: performance.approvalRate,
        activeUsers: performance.activeUsers
    });

    // Hitung perubahan
    useEffect(() => {
        const responseTimeChange = calculateChange(
            performance.responseTime,
            performance.previousResponseTime || performance.responseTime * 0.88
        );
        
        const approvalRateChange = calculateChange(
            performance.approvalRate,
            performance.previousApprovalRate || performance.approvalRate * 0.976
        );
        
        const activeUsersChange = calculateChange(
            performance.activeUsers,
            performance.previousActiveUsers || performance.activeUsers * 0.99
        );

        setRealtimeMetrics({
            responseTime: performance.responseTime,
            approvalRate: performance.approvalRate,
            activeUsers: performance.activeUsers,
            responseTimeChange,
            approvalRateChange,
            activeUsersChange
        });

        prevMetrics.current = {
            responseTime: performance.responseTime,
            approvalRate: performance.approvalRate,
            activeUsers: performance.activeUsers
        };
    }, [performance]);

    const calculateChange = (current, previous) => {
        if (previous === 0) return 0;
        const change = ((current - previous) / previous) * 100;
        return Math.round(change * 10) / 10;
    };

    // Real-time interval untuk metrics
    useEffect(() => {
        const metricsInterval = setInterval(() => {
            updateMetrics();
        }, 15000); // Update metrics setiap 15 detik

        return () => clearInterval(metricsInterval);
    }, []);

    // Auto-refresh untuk semua data
    useEffect(() => {
        const fullRefreshInterval = setInterval(() => {
            refreshData();
        }, 30000); // Full refresh setiap 30 detik

        return () => clearInterval(fullRefreshInterval);
    }, []);

    const updateMetrics = () => {
        // Simulasi perubahan kecil pada metrics secara real-time
        setRealtimeMetrics(prev => {
            const randomFactor = (Math.random() - 0.5) * 0.02; // ±1%
            
            const newResponseTime = Math.max(0.5, prev.responseTime * (1 + (Math.random() - 0.5) * 0.01));
            const newApprovalRate = Math.min(100, Math.max(0, prev.approvalRate * (1 + randomFactor)));
            const newActiveUsers = Math.max(1, Math.round(prev.activeUsers * (1 + (Math.random() - 0.5) * 0.005)));

            return {
                ...prev,
                responseTime: Math.round(newResponseTime * 10) / 10,
                approvalRate: Math.round(newApprovalRate * 10) / 10,
                activeUsers: newActiveUsers,
                responseTimeChange: calculateChange(newResponseTime, prevMetrics.current.responseTime),
                approvalRateChange: calculateChange(newApprovalRate, prevMetrics.current.approvalRate),
                activeUsersChange: calculateChange(newActiveUsers, prevMetrics.current.activeUsers)
            };
        });
    };

    const refreshData = () => {
        setIsRefreshing(true);
        router.reload({
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => {
                setLastUpdate(new Date());
                setIsRefreshing(false);
            },
            onError: () => {
                setIsRefreshing(false);
            }
        });
    };

    const formatChangeText = (change) => {
        if (change > 0) return `+${change}%`;
        if (change < 0) return `${change}%`;
        return "No change";
    };

    const getChangeIcon = (change, type = 'default') => {
        if (change > 0) {
            if (type === 'responseTime') {
                // Untuk response time, lebih rendah lebih baik
                return <ArrowDown size={12} className="text-red-500" strokeWidth={3} />;
            }
            return <ArrowUp size={12} className="text-green-500" strokeWidth={3} />;
        } else if (change < 0) {
            if (type === 'responseTime') {
                // Untuk response time, lebih rendah lebih baik
                return <ArrowUp size={12} className="text-green-500" strokeWidth={3} />;
            }
            return <ArrowDown size={12} className="text-red-500" strokeWidth={3} />;
        }
        return <Minus size={12} className="text-gray-500" strokeWidth={3} />;
    };

    const getChangeTextClass = (change, type = 'default') => {
        if (change > 0) {
            if (type === 'responseTime') return 'text-red-500';
            return 'text-green-500';
        } else if (change < 0) {
            if (type === 'responseTime') return 'text-green-500';
            return 'text-red-500';
        }
        return 'text-gray-500';
    };

    // Warna untuk status approval rate
    const getApprovalRateColor = (rate) => {
        if (rate >= 90) return 'text-emerald-500';
        if (rate >= 80) return 'text-green-500';
        if (rate >= 70) return 'text-yellow-500';
        return 'text-red-500';
    };

    // Warna untuk response time
    const getResponseTimeColor = (time) => {
        if (time <= 2) return 'text-emerald-500';
        if (time <= 4) return 'text-green-500';
        if (time <= 6) return 'text-yellow-500';
        return 'text-red-500';
    };

    // Warna untuk active users
    const getActiveUsersColor = (users) => {
        if (users >= 200) return 'text-emerald-500';
        if (users >= 150) return 'text-green-500';
        if (users >= 100) return 'text-blue-500';
        return 'text-purple-500';
    };

    return (
        <Authenticated>
            <div className="flex h-screen overflow-hidden bg-white">
                <div className="flex-1 overflow-y-auto">
                    <div className="p-8 space-y-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-bold text-black mb-2">Dashboard</h1>
                                <p className="text-gray-400 text-base">Real-time overview of your mail system</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={refreshData}
                                    disabled={isRefreshing}
                                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl transition-colors disabled:opacity-50"
                                >
                                    <RefreshCw size={18} className={isRefreshing ? "animate-spin" : ""} />
                                    <span className="text-sm font-medium">Refresh</span>
                                </button>
                                <div className="flex items-center gap-2 bg-[#fafafa] px-4 py-3 rounded-xl border">
                                    <Calendar size={18} className="text-gray-400" />
                                    <span className="text-sm font-medium text-gray-300">
                                        {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>Last updated: {lastUpdate.toLocaleTimeString('id-ID')}</span>
                            <span className="text-gray-500">• Auto-refresh every 30s</span>
                            <span className="text-gray-500">• Metrics update every 15s</span>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-4 gap-6">
                            <div className="bg-[#fafafa] rounded-2xl border p-8 hover:border-blue-500 transition-all duration-300">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center ring-2 ring-blue-500/20">
                                        <Mail className="text-blue-500" size={28} />
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-green-500/10 text-green-500 text-sm font-bold px-3 py-1.5 rounded-lg">
                                        <ArrowUp size={14} strokeWidth={3} />
                                        <span>12%</span>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-xs font-semibold mb-3 uppercase tracking-wider">Surat Masuk</p>
                                <p className="text-5xl font-bold text-black mb-2">{stats.suratMasuk}</p>
                                <p className="text-sm text-gray-500">Total bulan ini</p>
                            </div>

                            <div className="bg-[#fafafa] rounded-2xl border p-8 hover:border-purple-500 transition-all duration-300">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center ring-2 ring-purple-500/20">
                                        <Send className="text-purple-500" size={28} />
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-green-500/10 text-green-500 text-sm font-bold px-3 py-1.5 rounded-lg">
                                        <ArrowUp size={14} strokeWidth={3} />
                                        <span>8%</span>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-xs font-semibold mb-3 uppercase tracking-wider">Surat Keluar</p>
                                <p className="text-5xl font-bold text-black mb-2">{stats.suratKeluar}</p>
                                <p className="text-sm text-gray-500">Total bulan ini</p>
                            </div>

                            <div className="bg-[#fafafa] rounded-2xl border p-8 hover:border-orange-500 transition-all duration-300">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center ring-2 ring-orange-500/20">
                                        <Clock className="text-orange-500" size={28} />
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-orange-500/10 text-orange-500 text-sm font-bold px-3 py-1.5 rounded-lg">
                                        <Clock size={14} strokeWidth={3} />
                                        <span>{stats.pending}</span>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-xs font-semibold mb-3 uppercase tracking-wider">Pending</p>
                                <p className="text-5xl font-bold text-black mb-2">{stats.pending}</p>
                                <p className="text-sm text-gray-500">Perlu verifikasi</p>
                            </div>

                            <div className="bg-[#fafafa] rounded-2xl border p-8 hover:border-emerald-500 transition-all duration-300">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center ring-2 ring-emerald-500/20">
                                        <CheckCircle className="text-emerald-500" size={28} />
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-green-500/10 text-green-500 text-sm font-bold px-3 py-1.5 rounded-lg">
                                        <ArrowUp size={14} strokeWidth={3} />
                                        <span>15%</span>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-xs font-semibold mb-3 uppercase tracking-wider">Terverifikasi</p>
                                <p className="text-5xl font-bold text-black mb-2">{stats.terverifikasi}</p>
                                <p className="text-sm text-gray-500">Total bulan ini</p>
                            </div>
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-2 bg-[#fafafa] rounded-2xl border p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-2xl font-bold text-black">Volume Surat</h3>
                                        <p className="text-gray-400 mt-2">7 bulan terakhir</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg">
                                            7M
                                        </button>
                                        <button className="px-4 py-2 bg-[#fafafa] text-gray-400 text-sm font-semibold rounded-lg">
                                            1M
                                        </button>
                                        <button className="px-4 py-2 bg-[#fafafa] text-gray-400 text-sm font-semibold rounded-lg">
                                            3M
                                        </button>
                                    </div>
                                </div>
                                <ResponsiveContainer width="100%" height={400}>
                                    <AreaChart data={suratBulananData}>
                                        <defs>
                                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" strokeOpacity={0.3} />
                                        <XAxis 
                                            dataKey="bulan" 
                                            stroke="#6B7280" 
                                            style={{ fontSize: '14px', fontWeight: 500 }}
                                            tick={{ fill: '#9CA3AF' }}
                                        />
                                        <YAxis 
                                            stroke="#6B7280" 
                                            style={{ fontSize: '14px', fontWeight: 500 }}
                                            tick={{ fill: '#9CA3AF' }}
                                        />
                                        <Tooltip 
                                            contentStyle={{ 
                                                backgroundColor: '#1A1F2E', 
                                                border: '1px solid #374151',
                                                borderRadius: '12px',
                                                fontSize: '14px',
                                                padding: '12px',
                                                color: '#fff'
                                            }}
                                            itemStyle={{ color: '#fff' }}
                                            labelStyle={{ color: '#9CA3AF' }}
                                        />
                                        <Area 
                                            type="monotone" 
                                            dataKey="total" 
                                            stroke="#3B82F6" 
                                            strokeWidth={3}
                                            fillOpacity={1} 
                                            fill="url(#colorTotal)" 
                                            name="Total Surat"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Distribution */}
                            <div className="bg-[#fafafa] rounded-2xl border p-8">
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-black">Distribusi Sifat</h3>
                                    <p className="text-gray-400 mt-1">
                                        Total {sifatSuratData.reduce((acc, item) => acc + item.value, 0)} surat
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    {sifatSuratData.map((item, index) => (
                                        <div key={index}>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                                    <span className="text-sm font-medium text-gray-300">{item.name}</span>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-bold text-black">{item.value}</p>
                                                    <p className="text-xs text-gray-500">{item.percentage}%</p>
                                                </div>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                                <div 
                                                    className="h-2.5 rounded-full transition-all duration-500" 
                                                    style={{ 
                                                        width: `${item.percentage}%`,
                                                        backgroundColor: item.color 
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Verifikasi Chart */}
                        <div className="bg-[#fafafa] rounded-2xl border p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-black">Aktivitas Verifikasi</h3>
                                    <p className="text-gray-400 mt-2">7 hari terakhir</p>
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart data={verifikasiTrendData} barGap={8}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" strokeOpacity={0.3} />
                                    <XAxis 
                                        dataKey="hari" 
                                        stroke="#6B7280" 
                                        style={{ fontSize: '14px', fontWeight: 500 }}
                                        tick={{ fill: '#9CA3AF' }}
                                    />
                                    <YAxis 
                                        stroke="#6B7280" 
                                        style={{ fontSize: '14px', fontWeight: 500 }}
                                        tick={{ fill: '#9CA3AF' }}
                                    />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: '#1A1F2E', 
                                            border: '1px solid #374151',
                                            borderRadius: '12px',
                                            fontSize: '14px',
                                            padding: '12px',
                                            color: '#fff'
                                        }}
                                        itemStyle={{ color: '#fff' }}
                                        labelStyle={{ color: '#9CA3AF' }}
                                        cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                                    />
                                    <Bar dataKey="approved" fill="#10B981" radius={[8, 8, 0, 0]} name="Approved" barSize={50} />
                                    <Bar dataKey="pending" fill="#F59E0B" radius={[8, 8, 0, 0]} name="Pending" barSize={50} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Real-time Performance */}
                <div className="w-96 bg-[#fafafa] border-l flex flex-col overflow-y-auto">
                    {/* Performance - REAL-TIME */}
                    <div className="p-6 border-b">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
                            System Performance 
                            <span className="ml-2 text-green-500 animate-pulse">• LIVE</span>
                        </h4>
                        <div className="space-y-4">
                            <div className="bg-white rounded-xl p-5 border hover:border-blue-500 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-400">Response Time</span>
                                    <Zap className={getResponseTimeColor(realtimeMetrics.responseTime)} size={18} />
                                </div>
                                <p className={`text-3xl font-bold ${getResponseTimeColor(realtimeMetrics.responseTime)}`}>
                                    {realtimeMetrics.responseTime}h
                                </p>
                                <div className="flex items-center gap-1 mt-2">
                                    {getChangeIcon(realtimeMetrics.responseTimeChange, 'responseTime')}
                                    <span className={`text-xs font-semibold ${getChangeTextClass(realtimeMetrics.responseTimeChange, 'responseTime')}`}>
                                        {formatChangeText(realtimeMetrics.responseTimeChange)}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Average verification time</p>
                            </div>

                            <div className="bg-white rounded-xl p-5 border hover:border-emerald-500 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-400">Approval Rate</span>
                                    <Target className={getApprovalRateColor(realtimeMetrics.approvalRate)} size={18} />
                                </div>
                                <p className={`text-3xl font-bold ${getApprovalRateColor(realtimeMetrics.approvalRate)}`}>
                                    {realtimeMetrics.approvalRate}%
                                </p>
                                <div className="flex items-center gap-1 mt-2">
                                    {getChangeIcon(realtimeMetrics.approvalRateChange)}
                                    <span className={`text-xs font-semibold ${getChangeTextClass(realtimeMetrics.approvalRateChange)}`}>
                                        {formatChangeText(realtimeMetrics.approvalRateChange)}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Successful verification rate</p>
                            </div>

                            <div className="bg-white rounded-xl p-5 border hover:border-purple-500 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-400">Active Users</span>
                                    <Users className={getActiveUsersColor(realtimeMetrics.activeUsers)} size={18} />
                                </div>
                                <p className={`text-3xl font-bold ${getActiveUsersColor(realtimeMetrics.activeUsers)}`}>
                                    {realtimeMetrics.activeUsers}
                                </p>
                                <div className="flex items-center gap-1 mt-2">
                                    {getChangeIcon(realtimeMetrics.activeUsersChange)}
                                    <span className={`text-xs font-semibold ${getChangeTextClass(realtimeMetrics.activeUsersChange)}`}>
                                        {formatChangeText(realtimeMetrics.activeUsersChange)}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Last 24 hours activity</p>
                            </div>
                        </div>
                    </div>

                    {/* Top Bidang */}
                    <div className="p-6 border-b">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Top Departments</h4>
                            <Button variant="ghost" size="sm" className="text-xs text-blue-500 hover:text-blue-400 h-auto p-0">
                                View All
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {topBidangData.map((bidang, index) => (
                                <div key={index} className="bg-white rounded-xl p-4 border hover:border-gray-300 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                                <span className="text-sm font-bold text-blue-500">#{index + 1}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-black">{bidang.bidang}</p>
                                                <p className="text-xs text-gray-500">{bidang.total} surat</p>
                                            </div>
                                        </div>
                                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                                            bidang.trend === 'up' 
                                                ? 'bg-green-500/10 text-green-500' 
                                                : 'bg-red-500/10 text-red-500'
                                        }`}>
                                            {bidang.trend === 'up' ? (
                                                <ArrowUp size={12} strokeWidth={3} />
                                            ) : (
                                                <ArrowDown size={12} strokeWidth={3} />
                                            )}
                                            <span className="text-xs font-bold">{bidang.change}%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recent Activity</h4>
                            <Activity className="text-gray-500" size={16} />
                        </div>
                        <div className="space-y-3">
                            {recentSurat.map((surat) => (
                                <div key={surat.id} className="bg-white rounded-xl p-4 border hover:border-gray-300 transition-colors">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                                                surat.jenis === 'masuk' 
                                                    ? 'bg-blue-500/20 text-blue-400' 
                                                    : 'bg-purple-500/20 text-purple-400'
                                            }`}>
                                                {surat.jenis === 'masuk' ? 'IN' : 'OUT'}
                                            </span>
                                            <p className="text-sm font-bold text-black">{surat.nomor}</p>
                                        </div>
                                        <span className="text-xs text-gray-500 font-medium">{surat.waktu}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mb-3">{surat.pengirim}</p>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-xs px-2.5 py-1 rounded-lg font-semibold ${
                                            surat.status === 'pending' ? 'bg-orange-500/20 text-orange-400' :
                                            surat.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' :
                                            'bg-blue-500/20 text-blue-400'
                                        }`}>
                                            {surat.status}
                                        </span>
                                        <Eye className="text-gray-600 hover:text-gray-400 cursor-pointer" size={16} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}