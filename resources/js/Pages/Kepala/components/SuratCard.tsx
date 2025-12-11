import { AlertTriangle, Bell, ArrowRight } from "lucide-react";
import { SuratMasuk } from "@/types/surat-masuk";
import { sifatSuratBadge } from "../utils";

interface SuratCardProps {
    surat: SuratMasuk;
    onDisposisi: (id: number) => void;
}

export default function SuratCard({ surat, onDisposisi }: SuratCardProps) {
    const badge = sifatSuratBadge(surat.sifat_surat);

    const calculateWaitingDays = (t: string) => {
        const received = new Date(t);
        return Math.floor((Date.now() - received.getTime()) / (1000 * 60 * 60 * 24));
    };

    const waitingDays = calculateWaitingDays(surat.tanggal_terima);

    const formatDate = (d: string) =>
        new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }).format(new Date(d));

    return (
        <div
            onClick={() => onDisposisi(surat.id)}
            className="group relative bg-white rounded-lg border border-gray-200 p-5 hover:shadow-lg transition cursor-pointer"
        >
            <div className="flex items-center gap-2 mb-3">
                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded ${badge.class}`}>
                    {badge.icon === "alert" && <AlertTriangle className="w-3 h-3" />}
                    {badge.icon === "bell" && <Bell className="w-3 h-3" />}
                    {badge.text}
                </span>

                {waitingDays >= 3 && (
                    <span className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded">
                        {waitingDays} hari menunggu
                    </span>
                )}
            </div>

            <div className="text-xs text-gray-500 font-mono mb-1">{surat.nomor_surat}</div>

            <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600">
                {surat.isi_surat}
            </h3>

            <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                    <span>{surat.pengirim}</span>
                    <span>•</span>
                    <span>{formatDate(surat.tanggal_surat)}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
            </div>
        </div>
    );
}
