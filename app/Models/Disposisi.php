<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disposisi extends Model
{
    use HasFactory;

    protected $table = 'disposisi';

    protected $fillable = [
        'surat_id',
        'pengirim_id',
        'tanggal_disposisi',
        'isi_surat',
        'catatan_tambahan'
    ];

    protected $casts = [
        'tanggal_disposisi' => 'datetime',
    ];

    public function users() 
    {
        return $this->belongsTo(User::class, 'pengirim_id');
    }

    public function suratMasuk()
    {
        return $this->belongsTo(SuratMasuk::class, 'surat_id');
    }

    public function tujuanDisposisi()
    {
        return $this->hasMany(TujuanDisposisi::class, 'disposisi_id');
    }
}
