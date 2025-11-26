<?php

namespace App\Http\Enum;

enum StatusVerifikasi: int
{
    case PENDING = 1;
    case TERVERIFIKASI = 2;
    case REVISI = 3;
    case DITOLAK = 4;

    public function label(): string
    {
        return match($this) {
            self::PENDING => "Pending",
            self::TERVERIFIKASI => "Terverifikasi",
            self::REVISI => "Revisi",
            self::DITOLAK => "Ditolak"
        };
    }

    public function options(): array
    {
        return [
            self::PENDING->value => self::PENDING->label(),
            self::TERVERIFIKASI->value => self::TERVERIFIKASI->label(),
            self::REVISI->value => self::REVISI->label(),
            self::DITOLAK->value => self::DITOLAK->label()
        ];
    }
}