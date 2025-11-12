<?php 

namespace App\Http\Enum;

enum StatusAkhir: int
{
    case BARU = 1;
    case DISPOSISI = 2;
    case SELESAI = 3;

    public function label(): string
    {
        return match($this) {
            self::BARU => "Baru",
            self::DISPOSISI => "Disposisi",
            self::SELESAI => "Selesai,"
        };
    }
}