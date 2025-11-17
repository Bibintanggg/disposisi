import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Mail, Send, TrendingUp, TrendingDown, Users, FileCheck, Clock, AlertCircle, CheckCircle, Building2, Calendar, ArrowUpRight, Eye, Download, MoreVertical, Zap, Target, Activity, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const suratBulananData = [
        { bulan: "Jul", masuk: 45, keluar: 38, total: 83 },
        { bulan: "Agu", masuk: 52, keluar: 41, total: 93 },
        { bulan: "Sep", masuk: 48, keluar: 45, total: 93 },
        { bulan: "Okt", masuk: 61, keluar: 52, total: 113 },
        { bulan: "Nov", masuk: 55, keluar: 48, total: 103 },
        { bulan: "Des", masuk: 67, keluar: 59, total: 126 },
        { bulan: "Jan", masuk: 72, keluar: 64, total: 136 }
    ];

    const sifatSuratData = [
        { name: "Biasa", value: 145, color: "#64748B", percentage: 47 },
        { name: "Penting", value: 89, color: "#F59E0B", percentage: 29 },
        { name: "Segera", value: 52, color: "#F97316", percentage: 17 },
        { name: "Rahasia", value: 23, color: "#EF4444", percentage: 7 }
    ];

    const verifikasiTrendData = [
        { hari: "Sen", approved: 18, pending: 5 },
        { hari: "Sel", approved: 22, pending: 8 },
        { hari: "Rab", approved: 25, pending: 6 },
        { hari: "Kam", approved: 20, pending: 10 },
        { hari: "Jum", approved: 28, pending: 7 },
        { hari: "Sab", approved: 15, pending: 4 },
        { hari: "Min", approved: 12, pending: 3 }
    ];

    const topBidangData = [
        { bidang: "IT & Development", total: 87, change: 12, trend: "up" },
        { bidang: "Finance", total: 72, change: 8, trend: "up" },
        { bidang: "Human Resources", total: 65, change: 5, trend: "up" },
        { bidang: "Marketing", total: 58, change: 15, trend: "up" },
        { bidang: "Operations", total: 42, change: 3, trend: "down" }
    ];

    const recentSurat = [
        { id: 1, nomor: "045/SM/2024", jenis: "masuk", pengirim: "Dinas Pendidikan", waktu: "2m", status: "pending" },
        { id: 2, nomor: "044/SK/2024", jenis: "keluar", pengirim: "Kementerian Keuangan", waktu: "15m", status: "approved" },
        { id: 3, nomor: "043/SM/2024", jenis: "masuk", pengirim: "Kepala Daerah", waktu: "1h", status: "approved" },
        { id: 4, nomor: "042/SK/2024", jenis: "keluar", pengirim: "Inspektorat", waktu: "2h", status: "printed" }
    ];

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
                                <div className="flex items-center gap-2 bg-[#fafafa] px-4 py-3 rounded-xl border ">
                                    <Calendar size={18} className="text-gray-400" />
                                    <span className="text-sm font-medium text-gray-300">Januari 2024</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-6">
                            <div className="bg-[#fafafa] rounded-2xl border  p-8 hover:border-blue-500 transition-all duration-300">
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
                                <p className="text-5xl font-bold text-black mb-2">324</p>
                                <p className="text-sm text-gray-500">Total bulan ini</p>
                            </div>

                            <div className="bg-[#fafafa] rounded-2xl border  p-8 hover:border-purple-500 transition-all duration-300">
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
                                <p className="text-5xl font-bold text-black mb-2">287</p>
                                <p className="text-sm text-gray-500">Total bulan ini</p>
                            </div>

                            <div className="bg-[#fafafa] rounded-2xl border  p-8 hover:border-orange-500 transition-all duration-300">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center ring-2 ring-orange-500/20">
                                        <Clock className="text-orange-500" size={28} />
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-orange-500/10 text-orange-500 text-sm font-bold px-3 py-1.5 rounded-lg">
                                        <AlertCircle size={14} strokeWidth={3} />
                                        <span>23</span>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-xs font-semibold mb-3 uppercase tracking-wider">Pending</p>
                                <p className="text-5xl font-bold text-black mb-2">23</p>
                                <p className="text-sm text-gray-500">Perlu verifikasi</p>
                            </div>

                            <div className="bg-[#fafafa] rounded-2xl border  p-8 hover:border-emerald-500 transition-all duration-300">
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
                                <p className="text-5xl font-bold text-black mb-2">588</p>
                                <p className="text-sm text-gray-500">Total bulan ini</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-2 bg-[#fafafa] rounded-2xl border  p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-2xl font-bold text-black">Volume Surat</h3>
                                        <p className="text-gray-400 mt-2">7 bulan terakhir</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-4 py-2 bg-blue-500 text-black text-sm font-semibold rounded-lg">
                                            7D
                                        </button>
                                        <button className="px-4 py-2  bg-[#fafafa] text-gray-400 text-sm font-semibold rounded-lg">
                                            1M
                                        </button>
                                        <button className="px-4 py-2  bg-[#fafafa] text-gray-400 text-sm font-semibold rounded-lg">
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
                            <div className="bg-[#fafafa] rounded-2xl border  p-8">
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-black">Distribusi Sifat</h3>
                                    <p className="text-gray-400 mt-1">Total 309 surat</p>
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
                                            <div className="w-full  bg-[#fafafa] rounded-full h-2.5 overflow-hidden">
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
                        <div className="bg-[#fafafa] rounded-2xl border  p-8">
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

                {/* Right Sidebar */}
                <div className="w-96 bg-[#fafafa] border-l  flex flex-col overflow-y-auto">
                    {/* Performance */}
                    <div className="p-6 border-b ">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">System Performance</h4>
                        <div className="space-y-4">
                            <div className=" bg-[#fafafa] rounded-xl p-5 border ">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-400">Response Time</span>
                                    <Zap className="text-blue-500" size={18} />
                                </div>
                                <p className="text-3xl font-bold text-black">2.4h</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <ArrowDown size={12} className="text-green-500" strokeWidth={3} />
                                    <span className="text-xs text-green-500 font-semibold">12% faster</span>
                                </div>
                            </div>

                            <div className=" bg-[#fafafa] rounded-xl p-5 border ">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-400">Approval Rate</span>
                                    <Target className="text-emerald-500" size={18} />
                                </div>
                                <p className="text-3xl font-bold text-black">96.2%</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <ArrowUp size={12} className="text-green-500" strokeWidth={3} />
                                    <span className="text-xs text-green-500 font-semibold">+2.4%</span>
                                </div>
                            </div>

                            <div className=" bg-[#fafafa] rounded-xl p-5 border ">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-400">Active Users</span>
                                    <Users className="text-purple-500" size={18} />
                                </div>
                                <p className="text-3xl font-bold text-black">156</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <Minus size={12} className="text-gray-500" strokeWidth={3} />
                                    <span className="text-xs text-gray-500 font-semibold">No change</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top Bidang */}
                    <div className="p-6 border-b ">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Top Departments</h4>
                            <Button variant="ghost" size="sm" className="text-xs text-blue-500 hover:text-blue-400 h-auto p-0">
                                View All
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {topBidangData.map((bidang, index) => (
                                <div key={index} className=" bg-[#fafafa] rounded-xl p-4 border  hover:border-gray-700 transition-colors">
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
                                <div key={surat.id} className=" bg-[#fafafa] rounded-xl p-4 border  hover:border-gray-700 transition-colors">
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