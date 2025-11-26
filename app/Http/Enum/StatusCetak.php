<?php

namespace App\Http\Enum;

enum StatusCetak: int
{
    case BELUM_CETAK = 1;
    case SUDAH_CETAK = 2;

    public function label(): string
    {
        return match($this) {
            self::BELUM_CETAK => "Belum Di Cetak",
            self::SUDAH_CETAK => "Sudah Di Cetak"
        };
    }

    public function options(): array
    {
        return [
            self::BELUM_CETAK->value => self::BELUM_CETAK->label(),
            self::SUDAH_CETAK->value => self::SUDAH_CETAK->label()
        ];
    }
}