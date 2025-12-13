import { Bidang } from "./bidang"
import { User } from "./user"

export interface SuratKeluarProps {
    id: number
    unit_pengirim_id: number
    bidang: Bidang[]
    user_penanda_tangan_id: number
    users: User[]
    nomor_surat: string
    tanggal_surat: Date
    penerima: string
    isi_surat: string
    gambar: string
    tanggal_kirim: Date
    status_arsip: number

    unit_pengirim?: Bidang;
}