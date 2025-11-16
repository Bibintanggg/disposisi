import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

export default function UserForm() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="secondary">
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Pengguna
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Tambah Pengguna</DialogTitle>
                        <DialogDescription>
                            Tambahkan pengguna untuk mengelola dan mempermudah berkas berkas anda
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="nama_lengkap">Nama Lengkap</Label>
                            <Input id="nama_lengkap" name="nama_lengkap" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" name="username" defaultValue="@peduarte" />
                        </div>

                        <div className="grid gap-3 flex-1">
                            <Label htmlFor="nip">NIP</Label>
                            <Input id="nip" name="nip" />
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="grid gap-3 w-[180px]">
                                <Label htmlFor="jabatan">Bidang</Label>
                                <Select>
                                    <SelectTrigger id="bidang">
                                        <SelectValue placeholder="Pilih bidang" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="1">Admin</SelectItem>
                                            <SelectItem value="2">Kepala</SelectItem>
                                            <SelectItem value="3">Staf</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-3 w-[180px]">
                                <Label htmlFor="jabatan">Jabatan</Label>
                                <Select>
                                    <SelectTrigger id="jabatan">
                                        <SelectValue placeholder="Pilih jabatan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="1">Admin</SelectItem>
                                            <SelectItem value="2">Kepala</SelectItem>
                                            <SelectItem value="3">Staf</SelectItem>
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
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog >
    )
}