export interface Bidang {
    id: number;
    nama_bidang: string;
}

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

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
