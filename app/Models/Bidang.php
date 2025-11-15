<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bidang extends Model
{
    use HasFactory;

    protected $table = 'bidang';

    protected $fillable = [
        "nama_bidang"
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function suratKeluar() 
    {
        return $this->hasMany(SuratKeluar::class, 'unit_pengirim_id');
    }
}
