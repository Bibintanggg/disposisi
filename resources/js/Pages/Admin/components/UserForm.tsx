import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bidang } from "@/types/bidang";
import { useForm } from "@inertiajs/react";
import { Plus } from "lucide-react";
import React from "react";

interface UserFormProps {
    bidang: Bidang[];
}

export default function UserForm({ bidang }: UserFormProps) {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        nip: '',
        username: '',
        nama_lengkap: '',
        bidang_id: 0,
        jabatan: 0,
        password: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("admin.manage-user.store"), {
            onError: (errors) => console.log(errors),
            onSuccess: () => reset()
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary">
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Pengguna
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Tambah Pengguna</DialogTitle>
                        <DialogDescription>
                            Tambahkan pengguna untuk mengelola dan mempermudah berkas berkas anda
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">

                        <div className="grid gap-3">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label>Password</Label>
                            <Input
                                type="text"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label>Nama Lengkap</Label>
                            <Input
                                type="text"
                                value={data.nama_lengkap}
                                onChange={(e) => setData('nama_lengkap', e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label>Username</Label>
                            <Input
                                type="text"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                            />
                        </div>

                        <div className="grid gap-3 flex-1">
                            <Label>NIP</Label>
                            <Input
                                type="text"
                                value={data.nip}
                                onChange={(e) => setData('nip', e.target.value)}
                            />
                        </div>

                        <div className="flex items-start gap-4">

                            <div className="grid gap-3 w-[180px]">
                                <Label>Bidang</Label>
                                <Select onValueChange={(v) => setData("bidang_id", Number(v))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih bidang" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {bidang.map((b) => (
                                            <SelectItem key={b.id} value={String(b.id)}>
                                                {b.nama_bidang}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-3 w-[180px]">
                                <Label>Jabatan</Label>
                                <Select
                                    value={String(data.jabatan)}
                                    onValueChange={(value) => setData("jabatan", Number(value))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih jabatan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="1">Admin</SelectItem>
                                            <SelectItem value="2">Kepala</SelectItem>
                                            <SelectItem value="3">Staf</SelectItem>
                                            <SelectItem value="4">Verifikator</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>

                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing}>
                            Simpan
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
