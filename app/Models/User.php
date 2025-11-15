<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Http\Enum\Jabatan;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'email',
        'username',
        'nip',
        'nama_lengkap',
        'jabatan',
        'password',
        'bidang_id'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'jabatan' => Jabatan::class
        ];
    }

    public function bidang()
    {
        return $this->belongsTo(Bidang::class);
    }

    public function suratMasuk()
    {
        return $this->hasMany(SuratMasuk::class, 'user_input_id');
    }
    
    public function disposisi()
    {
        return $this->hasMany(Disposisi::class, 'pengirim_id');
    }

    public function suratKeluar() 
    {
        return $this->hasMany(SuratKeluar::class, "user_penanda_tangan_id");
    }

    public function tujuanDisposisi()
    {
        return $this->hasMany(TujuanDisposisi::class, 'penerima_id');
    }
}
