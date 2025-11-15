<?php

namespace App\Models;

use App\Http\Enum\StatusArsip;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuratKeluar extends Model
{
    use HasFactory;

    protected $table = 'surat_keluar';

    protected $fillable = [
        'unit_pengirim_id',
        'user_penanda_tangan_id',
        'nomor_surat',
        'tanggal_surat',
        'penerima',
        'isi_surat',
        'gambar',
        'tanggal_kirim',
        'status_arsip'
    ];

    protected $casts = [
        'status_arsip' => StatusArsip::class
    ];

    public function unitPengirim() 
    {
        return $this->belongsTo(Bidang::class, 'unit_pengirim_id');
    }

    public function penandaTangan()
    {
        return $this->belongsTo(User::class, 'user_penanda_tangan_id');
    }
}
