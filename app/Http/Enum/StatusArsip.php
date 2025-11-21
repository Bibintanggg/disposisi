<?php 

namespace App\Http\Enum;

enum StatusArsip: int
{
    case SUDAH_DIARSIP = 1;
    case BELUM_DIARSIP = 2;

    public function label() 
    {
        return match($this) {
            self::SUDAH_DIARSIP => "Sudah Diarsipkan",
            self::BELUM_DIARSIP => "Belum Diarsipkan"
        };
    }

    public static function options(): array
    {
        return [
            self::SUDAH_DIARSIP->value => self::SUDAH_DIARSIP->label(),
            self::BELUM_DIARSIP->value => self::BELUM_DIARSIP->label(),
        ];
    }
}