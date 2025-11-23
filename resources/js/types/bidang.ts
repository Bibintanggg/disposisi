import { User } from "./user";

export interface Bidang {
    id: number;
    nama_bidang: string;
    users: User[]
}