import { User } from "./user"

export interface SuratMasuk {
    id: number
    user_input_id: number
    nomor_surat: string
    users: User[]
    tanggal_surat: Date
    tanggal_terima: Date
    pengirim: string
    isi_surat: string
    sifat_surat: number
    gambar: string
    status_akhir: number
}