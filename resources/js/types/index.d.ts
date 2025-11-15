export interface User {
    id: number;
    username: string;
    email: string;
    nip: string
    nama_lengkap: string
    jabatan: number
    bidang: number
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
