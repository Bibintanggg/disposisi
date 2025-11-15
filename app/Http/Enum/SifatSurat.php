<?php

namespace App\Http\Enum;

enum SifatSurat: int
{
    case BIASA = 1;
    case PENTING = 2;
    case RAHASIA = 3;
    case SEGERA = 4;

    public function label(): string
    {
        return match($this) {
            self::BIASA => "Biasa",
            self::PENTING => "Penting",
            self::RAHASIA => "Rahasia",
            self::SEGERA => "Segera"
        };
    }
}