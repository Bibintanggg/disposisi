<?php 

namespace App\Http\Enum;

enum StatusAkhir: int
{
    case BARU = 1;
    case DISPOSISI = 2;
    case SELESAI = 3;
    case ARSIP = 4;

    public function label(): string
    {
        return match($this) {
            self::BARU => "Baru",
            self::DISPOSISI => "Disposisi",
            self::SELESAI => "Selesai,",
            self::ARSIP => "Arsip"
        };
    }

    public static function options():array
    {
        return [
            self::BARU->value => self::BARU->label(),
            self::DISPOSISI->value => self::DISPOSISI->label(),
            self::BARU->value => self::BARU->label(),
            self::ARSIP->value => self::ARSIP->label(),
        ];
    }
}