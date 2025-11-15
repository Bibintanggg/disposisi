<?php 

namespace App\Http\Enum;

enum StatusTindakLanjut: int
{
    case BELUM = 1;
    case PROSES = 2;
    case SELESAI = 3;
    case DIBATALKAN = 4;
    public function label(): string
    {
        return match($this) {
            self::BELUM => "Belum",
            self::PROSES => "Proses",
            self::SELESAI => "Selesai",
            self::DIBATALKAN => "Dibatalkan",
        };
    }
}