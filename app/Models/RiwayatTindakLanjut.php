<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RiwayatTindakLanjut extends Model
{
    use HasFactory;

    protected $fillable = [
        'tujuan_id',
        'tanggal_laporan',
        'deskripsi',
        'file_laporan'
    ];

    public function tujuan()
    {
        return $this->belongsTo(TujuanDisposisi::class, 'tujuan_id');
    }
}
