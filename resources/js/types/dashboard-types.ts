import { PageProps } from '@/types';
export interface DashboardStats {
    tugas_baru: number;
    tugas_proses: number;
    tugas_deadline: number;
    laporan_menunggu: number;
}

export interface TrendLaporan {
    minggu: string;
    jumlah: number;
}

export interface StatusTugas {
    status: string;
    jumlah: number;
    persen: number;
    color: 'green' | 'blue' | 'gray';
}

export interface TrendSelesai {
    periode: string;
    jumlah: number;
}

export interface PerformanceData {
    tingkat_penyelesaian: number;
    rata_waktu: number;
    total_selesai_bulan_ini: number;
    trend_laporan: TrendLaporan[];
    status_tugas: StatusTugas[];
    trend_selesai: TrendSelesai[];
}

export interface TugasBaru {
    id: number;
    nomor_surat: string;
    perihal: string;
    instruksi: string;
    sifat: string;
    dari: string;
    waktu: string;
}

export interface TugasProses {
    id: number;
    nomor_surat: string;
    perihal: string;
    instruksi: string;
    waktu_berjalan: string;
    dari: string;
    progress: string;
}

export interface TugasMendesak {
    tugas_baru_teratas: TugasBaru[];
    tugas_proses_terlama: TugasProses[];
}

export interface DashboardProps extends PageProps {
    stats: DashboardStats;
    performanceData: PerformanceData;
    tugasMendesak: TugasMendesak;
}