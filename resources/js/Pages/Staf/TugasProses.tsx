import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { Clock, ChevronDown, Eye, Activity, Send, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

type SuratItem = {
    id: number;
    instruksi: string;
    tanggal_disposisi: string;
    tanggal_disposisi_raw: string;
    sifat_surat: "Sangat Penting" | "Penting" | "Biasa";
    dari_kepala: string;
    perihal: string;
    has_file: boolean;
};

export default function TugasProses() {
    const [sort, setSort] = useState("waktu");
    const [openSelesai, setOpenSelesai] = useState(false);
    const [selectedId, setSelectedId] = useState(null);


    const { surat } = usePage<{ surat: SuratItem[]; auth: { user: any } }>().props;

    const submitSelesai = () => {
        if (selectedId !== null) {
            router.post(route("staf.tugas.selesaikan", selectedId), {}, {
                onSuccess: () => setOpenSelesai(false)
            });
        }
    };

    const sortedSurat = [...surat].sort((a, b) => {
        if (sort === "waktu") {
            return new Date(a.tanggal_disposisi_raw).getTime() - new Date(b.tanggal_disposisi_raw).getTime();
        }

        if (sort === "prioritas") {
            const order = {
                "Sangat Penting": 1,
                "Penting": 2,
                "Biasa": 3,
            };

            return order[a.sifat_surat] - order[b.sifat_surat];
        }

        return 0;
    });

    const lihatSurat = (id: number) => {
        router.visit(route('staf.tugas.lihat-surat', id), {
            onError: (errors) => {
                alert('File surat tidak ditemukan atau sudah dihapus.');
            }
        });
    };


    return (
        <Authenticated>
            <div className="w-full p-6 space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Tugas Sedang Diproses</h1>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Activity size={18} /> Urutkan
                                <ChevronDown size={16} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSort("waktu")}>Waktu Berjalan Terlama</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSort("prioritas")}>Prioritas Surat</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* LIST TUGAS */}
                <div
                    className={`grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 transition ${openSelesai ? "opacity-30 blur-sm pointer-events-none" : ""
                        }`}
                >

                    {sortedSurat.map((item: any) => (
                        <Card key={item.id} className="rounded-2xl shadow-sm border p-3 hover:shadow-md transition">
                            <CardContent className="space-y-4">

                                {/* Header Card */}
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="font-semibold text-lg">Instruksi Lengkap</p>
                                        <p className="text-sm text-gray-600 line-clamp-2">{item.instruksi}</p>
                                    </div>
                                    <Badge className="text-xs" variant="secondary">Proses</Badge>
                                </div>

                                {/* Waktu Berjalan */}
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <Clock size={16} />
                                    <span>Sejak: {item.tanggal_disposisi}</span>
                                </div>

                                {/* Pengirim */}
                                <div className="text-sm">
                                    <p className="font-medium">Pengirim:</p>
                                    <p className="text-gray-600">{item.dari_kepala}</p>
                                </div>

                                {/* Perihal */}
                                <div className="text-sm space-y-1 max-w-xs truncate">
                                    <p className="font-medium">Perihal:</p>
                                    <p className="text-gray-600 text-sm">{item.perihal}</p>
                                </div>

                                {/* Tombol Aksi */}
                                <div className="flex items-center justify-between pt-2">
                                    <Button
                                        className="gap-2"
                                        variant="outline"
                                        disabled={!item.has_file}
                                        onClick={() => lihatSurat(item.id)}
                                    >
                                        <Eye size={16} />
                                        {item.has_file ? 'Lihat Surat Asli' : 'Tidak Ada File'}
                                    </Button>

                                    <div className="flex gap-2">
                                        <Button
                                            className="gap-1 bg-green-600 text-white hover:bg-green-700"
                                            onClick={() => {
                                                setSelectedId(item.id);
                                                setOpenSelesai(true);
                                            }}
                                        >
                                            <CheckCircle2 size={16} /> Selesaikan
                                        </Button>

                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {openSelesai && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">
                        <h2 className="text-lg font-semibold mb-3">Selesaikan Tugas?</h2>
                        <p className="text-sm text-gray-600">
                            Apakah kamu yakin ingin menandai tugas ini sebagai selesai?
                        </p>

                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={() => setOpenSelesai(false)}>
                                Batal
                            </Button>
                            <Button className="bg-green-600 text-white" onClick={submitSelesai}>
                                Ya, Selesaikan
                            </Button>
                        </div>
                    </div>
                </div>
            )}

        </Authenticated>
    );
}
