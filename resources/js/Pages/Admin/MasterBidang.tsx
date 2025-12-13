import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { Users, Plus, Hash, Building2, TrendingUp, User } from "lucide-react";
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
import { useForm } from "@inertiajs/react";
import { Bidang } from "@/types/bidang";

interface UserFormProps {
    bidang: Bidang[];
}

export default function MasterBidang({ bidang }: UserFormProps) {

    const { data, setData, post, processing, errors, reset } = useForm({
        nama_bidang: ""
    })

    const [selectedBidang, setSelectedBidang] = useState<Bidang | null>(null);
    const [open, setOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('admin.master-bidang.store'), {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    }

    const totalUsers = bidang.reduce((sum, b) => sum + (b.users?.length || 0), 0);

    const getRoleName = (jabatan: number) => {
        switch (jabatan) {
            case 1: return "ADMIN"
            case 2: return "KEPALA"
            case 3: return "STAF"
            case 4: return "VERIFIKATOR"
            default: return "STAF"
        }
    }

    return (
        <Authenticated>
            <div className="flex h-screen overflow-hidden">
                <div className="flex-1 flex flex-col overflow-y-auto">
                    <div className="p-4 sm:p-6 space-y-6">

                        {/* Header & Dialog */}
                        <div className="flex justify-between items-center">
                            <div className="space-y-2">
                                <h1 className="text-4xl font-extrabold">Master Bidang</h1>
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

                                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="nama">Nama Bidang *</Label>
                                            <Input
                                                id="nama"
                                                value={data.nama_bidang}
                                                onChange={(e) => setData("nama_bidang", e.target.value)}
                                                placeholder="Contoh: IT & Development"
                                            />
                                            {errors.nama_bidang && (
                                                <p className="text-red-500 text-xs">{errors.nama_bidang}</p>
                                            )}
                                        </div>

                                        <DialogFooter>
                                            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                                                Batal
                                            </Button>
                                            <Button type="submit" disabled={processing}>
                                                Tambah Bidang
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-gray-700 mb-3">Statistik Umum</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                                <div className="bg-white rounded-xl border p-6 shadow-sm flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Bidang</p>
                                        <p className="text-2xl font-bold">{bidang.length}</p>
                                    </div>
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <Building2 className="text-blue-600" size={24} />
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl border p-6 shadow-sm flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Anggota</p>
                                        <p className="text-2xl font-bold">{totalUsers}</p>
                                    </div>
                                    <div className="p-3 bg-green-100 rounded-lg">
                                        <Users className="text-green-600" size={24} />
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl border p-6 shadow-sm flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Rata-rata per Bidang</p>
                                        <p className="text-2xl font-bold">{bidang.length > 0 ? Math.round(totalUsers / bidang.length) : 0}</p>
                                    </div>
                                    <div className="p-3 bg-purple-100 rounded-lg">
                                        <User className="text-purple-600" size={24} />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-gray-700 mb-3">Daftar Bidang</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                                {bidang.map((b) => (
                                    <div
                                        key={b.id}
                                        className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md cursor-pointer group"
                                        onClick={() => setSelectedBidang(b)}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                                    <Hash className="text-white" size={20} />
                                                </div>

                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{b.nama_bidang}</h3>
                                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Users size={12} />
                                                        {b.users?.length || 0} anggota
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>

                    </div>
                </div>

                <div className="w-96 bg-white border-l">
                    <div className="p-4 border-b flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <h3 className="font-semibold">{selectedBidang?.nama_bidang || "Pilih Bidang"}</h3>
                    </div>

                    <div className="p-3 overflow-y-auto">
                        {!selectedBidang ? (
                            <p className="text-gray-400 text-center mt-12">
                                Pilih bidang untuk melihat anggotanya
                            </p>
                        ) : selectedBidang.users?.length ? (
                            selectedBidang.users.map((u) => (
                                <div key={u.id} className="p-2 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                                        {u.nama_lengkap.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm">{u.nama_lengkap}</p>
                                        <p className="text-xs text-gray-500">{getRoleName(u.jabatan)}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 mt-12 text-center">Belum ada anggota</p>
                        )}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
