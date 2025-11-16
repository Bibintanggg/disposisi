import Authenticated from "@/Layouts/AuthenticatedLayout";
import Table from "./components/table";
import { Users, UserCheck, Shield, TrendingUp, UserCog, UserX, User2Icon, Plus } from "lucide-react";
import { usePage } from "@inertiajs/react";
import { useSidebar } from "@/components/ui/sidebar";
import { Payment } from "./components/columns";
import type { PageProps } from "@/types";
import { Button } from "@/components/ui/button";

interface UserManageProps extends PageProps {
    users: Payment[];
}

export default function ManageUser() {
    const { props } = usePage<UserManageProps>();
    const users = props.users;

    const totalAdmin = users.filter(u => u.jabatan === 1).length
    const totalKepala = users.filter(u => u.jabatan === 2).length
    const totalStaf = users.filter(u => u.jabatan === 3).length
    const totalVerifikator = users.filter(u => u.jabatan === 4).length

    return (
        <Authenticated>
            <div className="p-4 sm:p-6 space-y-6">

                <div className="flex justify-between items-center">

                <div className="space-y-2">
                    <h1 className="scroll-m-20 text-start text-4xl font-extrabold tracking-tight text-balance">
                        Kelola Pengguna
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Kelola dan pantau semua pengguna sistem Anda
                    </p>
                </div>

                <Button variant="secondary">
                    <Plus />
                    Tambah Pengguna
                </Button>
                </div>

                <div>
                    <h2 className="text-sm font-semibold text-gray-700 mb-3">Statistik Umum</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-600">Total Pengguna</p>
                                    <p className="text-2xl font-bold text-gray-900">1,234</p>
                                    <p className="text-xs text-green-600 flex items-center gap-1">
                                        <TrendingUp size={12} />
                                        +12% dari bulan lalu
                                    </p>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <Users className="text-blue-600" size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-600">Pengguna Aktif</p>
                                    <p className="text-2xl font-bold text-gray-900">1,180</p>
                                    <p className="text-xs text-green-600 flex items-center gap-1">
                                        <TrendingUp size={12} />
                                        +8% dari bulan lalu
                                    </p>
                                </div>
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <UserCheck className="text-green-600" size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-600">Pengguna Baru</p>
                                    <p className="text-2xl font-bold text-gray-900">89</p>
                                    <p className="text-xs text-gray-500">
                                        Bulan ini
                                    </p>
                                </div>
                                <div className="p-3 bg-orange-100 rounded-lg">
                                    <Users className="text-orange-600" size={24} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-sm font-semibold text-gray-700 mb-3">Berdasarkan Jabatan</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-600">Admin</p>
                                    <p className="text-2xl font-bold text-gray-900">{totalAdmin}</p>
                                    <p className="text-xs text-gray-500">
                                        0.6% dari total
                                    </p>
                                </div>
                                <div className="p-3 bg-purple-100 rounded-lg">
                                    <User2Icon className="text-purple-600" size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-600">Kepala</p>
                                    <p className="text-2xl font-bold text-gray-900">{totalKepala}</p>
                                    <p className="text-xs text-gray-500">
                                        0.6% dari total
                                    </p>
                                </div>
                                <div className="p-3 bg-purple-100 rounded-lg">
                                    <Shield className="text-purple-600" size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-600">Staf</p>
                                    <p className="text-2xl font-bold text-gray-900">{totalStaf}</p>
                                    <p className="text-xs text-gray-500">
                                        95.6% dari total
                                    </p>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <UserCog className="text-blue-600" size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-600">Verifikator</p>
                                    <p className="text-2xl font-bold text-gray-900">{totalVerifikator}</p>
                                    <p className="text-xs text-gray-500">
                                        3.7% dari total
                                    </p>
                                </div>
                                <div className="p-3 bg-cyan-100 rounded-lg">
                                    <UserCheck className="text-cyan-600" size={24} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 sm:px-6 pb-6">
                <Table />
            </div>
        </Authenticated>
    )
}