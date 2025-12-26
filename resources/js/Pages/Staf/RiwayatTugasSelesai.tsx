import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, FileText, Eye, Download, ExternalLink } from "lucide-react";
import { useState, useMemo } from "react";
import { usePage } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { PageProps } from '@/types';

type RiwayatItem = {
    id: number;
    nomor_surat: string;
    perihal: string;
    isi_disposisi: string;
    tanggal_selesai: string;
    durasi: string;
    pengirim: string;
    has_file: boolean;
};

interface RiwayatPageProps extends PageProps {
    riwayat: RiwayatItem[];
    avgDurasi: string;
}

export default function RiwayatTugasSelesai() {
    const [search, setSearch] = useState("");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });
    const [openModal, setOpenModal] = useState(false);
    const [selectedLaporan, setSelectedLaporan] = useState<any>(null);

    const page = usePage<RiwayatPageProps>().props;
    const { riwayat, avgDurasi } = page;

    const handleLihatLaporan = (item: any) => {
        setSelectedLaporan(item);
        setOpenModal(true);
    };

    const handleLihatSurat = (id: number) => {
        // Coba dengan URL langsung
        window.open(`/staf/riwayat-tugas/lihat-surat/${id}`, '_blank');
    };


    const handleDownloadSurat = (id: number) => {
        window.open(route('staf.riwayat.lihat-surat', {
            id,
            download: true
        }), '_blank');
    };

    const filteredData = useMemo(() => {
        return riwayat.filter((item) => {
            const matchSearch =
                search === "" ||
                item.perihal.toLowerCase().includes(search.toLowerCase()) ||
                item.nomor_surat.toLowerCase().includes(search.toLowerCase());

            const matchStart = dateRange.start ? item.tanggal_selesai >= dateRange.start : true;
            const matchEnd = dateRange.end ? item.tanggal_selesai <= dateRange.end : true;

            return matchSearch && matchStart && matchEnd;
        });
    }, [riwayat, search, dateRange]);

    return (
        <Authenticated>
            <div className="p-6 space-y-8">
                {/* HEADER */}
                <div>
                    <h1 className="text-2xl font-bold">Riwayat Tugas Selesai</h1>
                    <p className="text-gray-600 mt-1">Daftar seluruh tugas yang telah Anda selesaikan.</p>
                </div>

                {/* KPI SUMMARY */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="rounded-2xl shadow-sm">
                        <CardContent className="p-5">
                            <p className="text-sm text-gray-500">Total Tugas Selesai</p>
                            <h2 className="text-3xl font-semibold">{riwayat.length}</h2>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl shadow-sm">
                        <CardContent className="p-5">
                            <p className="text-sm text-gray-500">Rata-rata Durasi Penyelesaian</p>
                            <h2 className="text-3xl font-semibold">{avgDurasi}</h2>
                        </CardContent>
                    </Card>
                </div>

                {/* FILTERS */}
                <div className="flex flex-col md:flex-row gap-3 items-end">
                    <div className="flex-1">
                        <Input
                            placeholder="Cari perihal atau nomor surat..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="rounded-xl"
                        />
                    </div>

                    <div className="flex gap-2">
                        {/* START DATE */}
                        <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-white">
                            <CalendarIcon size={18} />
                            <input
                                type="date"
                                className="outline-none"
                                value={dateRange.start}
                                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                            />
                        </div>

                        {/* END DATE */}
                        <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-white">
                            <CalendarIcon size={18} />
                            <input
                                type="date"
                                className="outline-none"
                                value={dateRange.end}
                                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">Nomor Surat & Perihal</th>
                                <th className="p-3 text-left">Instruksi Disposisi</th>
                                <th className="p-3 text-left">Tanggal Selesai</th>
                                <th className="p-3 text-left">Durasi</th>
                                <th className="p-3 text-left">Pengirim Tugas</th>
                                <th className="p-3 text-left">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredData.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-5 text-center text-gray-500">
                                        Tidak ada data.
                                    </td>
                                </tr>
                            )}

                            {filteredData.map((d) => (
                                <tr key={d.id} className="border-t hover:bg-gray-50">
                                    <td className="p-3">
                                        <p className="font-medium">{d.nomor_surat}</p>
                                        <p className="text-gray-600 text-xs">{d.perihal}</p>
                                    </td>

                                    <td className="p-3 text-gray-700 max-w-sm">{d.isi_disposisi}</td>

                                    <td className="p-3">{d.tanggal_selesai}</td>
                                    <td className="p-3">{d.durasi}</td>
                                    <td className="p-3">{d.pengirim}</td>

                                    <td className="p-3 flex gap-2">
                                        <Button
                                            onClick={() => handleLihatLaporan(d)}
                                            variant="outline"
                                            size="sm"
                                            className="rounded-xl flex items-center gap-2"
                                        >
                                            <Eye size={16} /> Lihat Laporan
                                        </Button>

                                        <Button
                                            onClick={() => handleLihatSurat(d.id)}
                                            disabled={!d.has_file}
                                            variant="outline"
                                            size="sm"
                                            className={`rounded-xl flex items-center gap-2
        ${!d.has_file && 'opacity-50 cursor-not-allowed'}
    `}
                                        >
                                            <FileText size={16} />
                                            {d.has_file ? 'Surat Asli' : 'Tidak Ada File'}
                                        </Button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Laporan Tugas</DialogTitle>
                    </DialogHeader>

                    {selectedLaporan && (
                        <div className="space-y-4">
                            <div>
                                <strong className="text-gray-700">Nomor Surat:</strong>
                                <p className="mt-1">{selectedLaporan.nomor_surat}</p>
                            </div>

                            <div>
                                <strong className="text-gray-700">Perihal:</strong>
                                <p className="mt-1">{selectedLaporan.perihal}</p>
                            </div>

                            <div>
                                <strong className="text-gray-700">Instruksi Disposisi:</strong>
                                <p className="mt-1">{selectedLaporan.isi_disposisi}</p>
                            </div>

                            <div>
                                <strong className="text-gray-700">Pengirim:</strong>
                                <p className="mt-1">{selectedLaporan.pengirim}</p>
                            </div>

                            <div>
                                <strong className="text-gray-700">Durasi:</strong>
                                <p className="mt-1">{selectedLaporan.durasi}</p>
                            </div>

                            {/* TAMBAHKAN TOMBOL UNTUK LIHAT SURAT ASLI DI MODAL JUGA */}
                            <div className="pt-4 border-t">
                                <Button
                                    onClick={() => handleLihatSurat(selectedLaporan.id)}
                                    disabled={!selectedLaporan.has_file}
                                    className={`w-full flex items-center justify-center gap-2
            ${!selectedLaporan.has_file && 'opacity-50 cursor-not-allowed'}
        `}
                                >
                                    <ExternalLink size={16} />
                                    {selectedLaporan.has_file
                                        ? 'Lihat Surat Asli'
                                        : 'Tidak Ada File Surat'}
                                </Button>
                            </div>

                        </div>
                    )}

                    <DialogFooter className="mt-4">
                        <Button onClick={() => setOpenModal(false)}>Tutup</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Authenticated>
    );
}