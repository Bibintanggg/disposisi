<?php

namespace App\Models;

use App\Http\Enum\SifatSurat;
use App\Http\Enum\StatusAkhir;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class   SuratMasuk extends Model
{
    use HasFactory;
    
    protected $table = 'surat_masuk';
    
    protected $fillable = [
        'user_input_id',
        'nomor_surat',
        'tanggal_surat',
        'tanggal_terima',
        'pengirim',
        'isi_surat',
        'sifat_surat',
        'gambar',
        'status_akhir'
    ];

    protected $casts = [
        'sifat_surat' => SifatSurat::class,
        'status_akhir' => StatusAkhir::class
    ];

    public function users() 
    {
        return $this->belongsTo(User::class, 'user_input_id');
    }

    public function disposisi()
    {
        return $this->hasMany(Disposisi::class, 'surat_id');
    }
}
