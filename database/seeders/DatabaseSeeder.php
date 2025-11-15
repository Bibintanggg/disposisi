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
            'nama_lengkap' => "Bintang IF'26",
            'jabatan' => Jabatan::ADMIN,
            'password' => Hash::make('password'),
            'bidang_id' => $bidang->id
        ]);
    }
}
