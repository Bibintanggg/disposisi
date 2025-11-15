<?php

namespace App\Models;

use App\Http\Enum\StatusTindakLanjut;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TujuanDisposisi extends Model
{
    use HasFactory;

    protected $fillable = [
        'disposisi_id',
        'penerima_id',
        'status_tindak_lanjut',
        'tanggal_selesai'
    ];

    protected $casts = [
        'status_tindak_lanjut' => StatusTindakLanjut::class
    ];

    public function disposisi()
    {
        return $this->hasMany(Disposisi::class, 'disposisi_id');
    }

    public function penerima()
    {
        return $this->hasMany(User::class, 'penerima_id');
    }

    public function riwayatTindakLanjut()
    {
        return $this->hasMany(RiwayatTindakLanjut::class, 'tujuan_id');
    }
}
