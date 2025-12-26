import { AlertTriangle, Bell } from "lucide-react";
import { SuratMasuk } from "@/types/surat-masuk";
import { sifatSuratBadge } from "../utils";

interface SuratRowProps {
    surat: SuratMasuk;
    onDisposisi: (id: number) => void;
}

export default function SuratRow({ surat, onDisposisi }: SuratRowProps) {
    // Hapus konversi yang kompleks, langsung gunakan sifat_surat
    const badge = sifatSuratBadge(surat.sifat_surat);

    const calculateWaitingDays = (tanggalTerima: string) => {
        const now = new Date();
        const terimaDate = new Date(tanggalTerima);

        if (isNaN(terimaDate.getTime())) return 0;

        return Math.floor(
            (now.getTime() - terimaDate.getTime()) / (1000 * 60 * 60 * 24)
        );
    };


    const formatDate = (dateString: Date) =>
        new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }).format(new Date(dateString));

    const waitingDays = calculateWaitingDays(surat.tanggal_terima.toString());

    return (
        <tr
            onClick={() => onDisposisi(surat.id)}
            className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
        >
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded ${badge.class}`}>
                        {badge.icon === "alert" && <AlertTriangle className="w-3 h-3" />}
                        {badge.icon === "bell" && <Bell className="w-3 h-3" />}
                        {badge.text}
                    </span>
                </div>
            </td>

            <td className="px-6 py-4 font-mono text-sm">{surat.nomor_surat}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{formatDate(surat.tanggal_surat)}</td>

            <td className="px-6 py-4 max-w-[15rem]">
                <div className="text-sm font-medium text-gray-900 truncate">
                    {surat.isi_surat}
                </div>
            </td>

            <td className="px-6 py-4 text-sm">{surat.pengirim}</td>

            <td className="px-6 py-4 text-sm">
                <div className={waitingDays >= 3 ? "text-red-600" : "text-gray-600"}>
                    {waitingDays === 0 ? "Hari ini" : `${waitingDays} hari`}
                </div>
            </td>

            <td className="px-6 py-4">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDisposisi(surat.id);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                    Lihat & Disposisi
                </button>
            </td>
        </tr>
    );
}