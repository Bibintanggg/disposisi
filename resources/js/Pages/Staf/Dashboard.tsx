import CardsHeader from "@/components/CardsHeader";
import RightBar from "@/components/RightBarContent";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { ArrowBigDown, Book, Computer } from "lucide-react";

export default function Dashboard() {
    return (
        <Authenticated>
            <div className="grid grid-cols-3 cols-2">
                <CardsHeader
                    title="Tugas Masuk"
                    subtitle="Berikut adalah tugas masuk anda"
                    total={100}
                    icon={<ArrowBigDown size={32} />}
                />

                <CardsHeader
                    title="Tugas Keluar"
                    subtitle="Berikut adalah tugas keluar anda"
                    total={100}
                    icon={<ArrowBigDown size={32} />}
                />

                <CardsHeader
                    title="Laporan Tindak Lanjut"
                    subtitle="Laporan tindak lanjut anda"
                    total={100}
                    icon={<ArrowBigDown size={32} />}
                />
            </div>

            <div className="mt-5">
                <RightBar 
                    title="Tugas Saya"
                    subtitle="Berikut adalah tugas masuk anda"
                    total={100}
                    icon={<Computer size={20} />}/>
            </div>
        </Authenticated>
    )
}