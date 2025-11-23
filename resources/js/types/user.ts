import { Bidang } from "./bidang";

export interface User {
    id: number;
    username: string;
    email: string;
    nip: string;
    nama_lengkap: string;
    jabatan: number;
    bidang_id: number;
    bidang?: Bidang;
}