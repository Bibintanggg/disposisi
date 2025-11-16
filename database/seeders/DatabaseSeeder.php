<?php

namespace Database\Seeders;

use App\Http\Enum\Jabatan;
use App\Models\Bidang;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $bidang = Bidang::factory()->create([
            'nama_bidang' => "Sekretariat A"
        ]);

        User::factory()->create([
            'email' => 'admin@example.com',
            'username' => 'admin ganteng',
            'nip' => '123456789',
            'nama_lengkap' => "Bintang Mau ITB",
            'jabatan' => Jabatan::ADMIN,
            'password' => Hash::make('password'),
            'bidang_id' => $bidang->id
        ]);

        User::factory()->create([
            'email' => 'staf@example.com',
            'username' => 'staf ganteng',
            'nip' => '931983123',
            'nama_lengkap' => "Staf IF'27",
            'jabatan' => Jabatan::STAF,
            'password' => Hash::make('password'),
            'bidang_id' => $bidang->id
        ]);

        User::factory()->create([
            'email' => 'verif@example.com',
            'username' => 'verif ganteng',
            'nip' => '02930131231',
            'nama_lengkap' => "Verifikator",
            'jabatan' => Jabatan::VERIFIKATOR,
            'password' => Hash::make('password'),
            'bidang_id' => $bidang->id
        ]);

        User::factory()->create([
            'email' => 'kepala@example.com',
            'username' => 'kepala ganteng',
            'nip' => '1832013123',
            'nama_lengkap' => "Kepala",
            'jabatan' => Jabatan::KEPALA,
            'password' => Hash::make('password'),
            'bidang_id' => $bidang->id
        ]);
    }
}
