<?php

namespace App\Models;

use App\Http\Enum\StatusArsip;
use App\Http\Enum\StatusCetak;
use App\Http\Enum\StatusVerifikasi;
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
        'status_arsip',
        'status_verifikasi',
        'status_cetak',
    ];

    protected $casts = [
        'status_arsip' => StatusArsip::class,
        'status_verifikasi' => StatusVerifikasi::class,
        'status_cetak' => StatusCetak::class,
        'tanggal_kirim' => 'datetime:Y-m-d\TH:i:s',
    ];

    public function unit_pengirim()
    {
        return $this->belongsTo(Bidang::class, 'unit_pengirim_id');
    }

    public function user_penanda_tangan()
    {
        return $this->belongsTo(User::class, 'user_penanda_tangan_id');
    }

    public function verifikator()
    {
        return $this->belongsTo(User::class, 'user_verifikator_id');
    }
}
