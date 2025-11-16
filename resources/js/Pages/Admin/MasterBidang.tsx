import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Users, Plus, Hash, Trash2, Building2, TrendingUp, User, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function MasterBidang() {
    const [bidangs, setBidangs] = useState([
        { 
            id: 1, 
            name: 'IT & Development', 
            users: [
                { id: 1, name: 'Ahmad Rizki', jabatan: 'Admin', avatar: 'AR' },
                { id: 2, name: 'Budi Santoso', jabatan: 'Staf', avatar: 'BS' },
                { id: 3, name: 'Citra Dewi', jabatan: 'Staf', avatar: 'CD' },
            ],
            color: 'bg-blue-500' 
        },
        { 
            id: 2, 
            name: 'Human Resources', 
            users: [
                { id: 4, name: 'Diana Putri', jabatan: 'Kepala', avatar: 'DP' },
                { id: 5, name: 'Eko Prasetyo', jabatan: 'Staf', avatar: 'EP' },
            ],
            color: 'bg-green-500' 
        },
        { 
            id: 3, 
            name: 'Finance', 
            users: [
                { id: 6, name: 'wawawkwk', jabatan: 'Kepala', avatar: 'FH' },
                { id: 7, name: 'Gani Wijaya', jabatan: 'Verifikator', avatar: 'GW' },
                { id: 8, name: 'Hani Susanti', jabatan: 'Staf', avatar: 'HS' },
            ],
            color: 'bg-yellow-500' 
        },
        { 
            id: 4, 
            name: 'Marketing', 
            users: [
                { id: 9, name: 'Indra Permana', jabatan: 'Staf', avatar: 'IP' },
                { id: 10, name: 'Joko Susilo', jabatan: 'Staf', avatar: 'JS' },
            ],
            color: 'bg-purple-500' 
        },
    ]);

    const [namaBidang, setNamaBidang] = useState('');
    const [selectedBidang, setSelectedBidang] = useState(bidangs[0]);
    const [open, setOpen] = useState(false);

    const handleTambahBidang = () => {
        if (namaBidang.trim()) {
            const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500', 'bg-pink-500', 'bg-indigo-500'];
            const newBidang = {
                id: Date.now(),
                name: namaBidang,
                users: [],
                color: colors[Math.floor(Math.random() * colors.length)]
            };
            setBidangs([...bidangs, newBidang]);
            setNamaBidang('');
            setOpen(false);
        }
    };

    const handleDelete = (id) => {
        setBidangs(bidangs.filter(b => b.id !== id));
        if (selectedBidang?.id === id) {
            setSelectedBidang(bidangs[0]);
        }
    };

    const totalUsers = bidangs.reduce((sum, b) => sum + b.users.length, 0);

    return (
        <Authenticated>
            <div className="flex h-screen overflow-hidden">
                <div className="flex-1 flex flex-col overflow-y-auto ">
                    <div className="p-4 sm:p-6 space-y-6">
                        <div className="flex justify-between items-center">
                            <div className="space-y-2">
                                <h1 className="scroll-m-20 text-start text-4xl font-extrabold tracking-tight text-balance">
                                    Master Bidang
                                </h1>
                                <p className="text-muted-foreground text-sm">
                                    Kelola dan pantau semua bidang organisasi Anda
                                </p>
                            </div>

                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger asChild>
                                    <Button className="gap-2">
                                        <Plus size={16} />
                                        Tambah Bidang
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Tambah Bidang Baru</DialogTitle>
                                        <DialogDescription>
                                            Buat bidang baru untuk organisasi Anda
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="nama">Nama Bidang *</Label>
                                            <Input
                                                id="nama"
                                                value={namaBidang}
                                                onChange={(e) => setNamaBidang(e.target.value)}
                                                placeholder="Contoh: IT & Development"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setOpen(false)}>
                                            Batal
                                        </Button>
                                        <Button onClick={handleTambahBidang}>
                                            Tambah Bidang
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-gray-700 mb-3">Statistik Umum</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-gray-600">Total Bidang</p>
                                            <p className="text-2xl font-bold text-gray-900">{bidangs.length}</p>
                                            <p className="text-xs text-green-600 flex items-center gap-1">
                                                <TrendingUp size={12} />
                                                +5% dari bulan lalu
                                            </p>
                                        </div>
                                        <div className="p-3 bg-blue-100 rounded-lg">
                                            <Building2 className="text-blue-600" size={24} />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-gray-600">Total Anggota</p>
                                            <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
                                            <p className="text-xs text-green-600 flex items-center gap-1">
                                                <TrendingUp size={12} />
                                                +12% dari bulan lalu
                                            </p>
                                        </div>
                                        <div className="p-3 bg-green-100 rounded-lg">
                                            <Users className="text-green-600" size={24} />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-gray-600">Rata-rata per Bidang</p>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {bidangs.length > 0 ? Math.round(totalUsers / bidangs.length) : 0}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Anggota per bidang
                                            </p>
                                        </div>
                                        <div className="p-3 bg-purple-100 rounded-lg">
                                            <User className="text-purple-600" size={24} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-gray-700 mb-3">Daftar Bidang</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {bidangs.map((bidang) => (
                                    <div
                                        key={bidang.id}
                                        className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                                        onClick={() => setSelectedBidang(bidang)}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 ${bidang.color} rounded-lg flex items-center justify-center`}>
                                                    <Hash className="text-white" size={20} />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{bidang.name}</h3>
                                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Users size={12} />
                                                        {bidang.users.length} anggota
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(bidang.id);
                                                }}
                                                className="p-1.5 hover:bg-red-100 rounded text-gray-400 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        
                                        {bidang.users.length > 0 ? (
                                            <div className="flex -space-x-2">
                                                {bidang.users.slice(0, 5).map((user) => (
                                                    <div
                                                        key={user.id}
                                                        className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-semibold text-gray-700"
                                                        title={user.name}
                                                    >
                                                        {user.avatar}
                                                    </div>
                                                ))}
                                                {bidang.users.length > 5 && (
                                                    <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-semibold text-gray-600">
                                                        +{bidang.users.length - 5}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-xs text-gray-400 italic">Belum ada anggota</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center gap-2 mb-1">
                            <div className={`w-3 h-3 ${selectedBidang?.color} rounded-full`}></div>
                            <h3 className="text-gray-900 font-semibold text-sm">
                                {selectedBidang?.name || 'Pilih Bidang'}
                            </h3>
                        </div>
                        <p className="text-xs text-gray-500">
                            {selectedBidang?.users.length || 0} anggota
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3">
                        {!selectedBidang || selectedBidang.users.length === 0 ? (
                            <div className="text-center text-gray-400 mt-12">
                                <Users size={48} className="mx-auto mb-3 opacity-30" />
                                <p className="text-sm">Belum ada anggota</p>
                                <p className="text-xs mt-1">Tambahkan user ke bidang ini</p>
                            </div>
                        ) : (
                            <div className="space-y-0.5">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-2">
                                    Anggota — {selectedBidang.users.length}
                                </div>
                                {selectedBidang.users.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer group"
                                    >
                                        <div className="relative">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs font-semibold text-white">
                                                {user.avatar}
                                            </div>
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium text-gray-900 truncate">
                                                {user.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {user.jabatan}
                                            </div>
                                        </div>
                                        <button className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded transition-all">
                                            <Edit2 size={14} className="text-gray-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}