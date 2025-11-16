<?php 

namespace App\Http\Enum;

enum Jabatan: int
{
    case ADMIN = 1;
    case KEPALA = 2;
    case STAF = 3;
    case VERIFIKATOR = 4;

    public function label(): string
    {
        return match($this) {
            self::ADMIN => "Admin",
            self::KEPALA => "Kepala",
            self::STAF => "Staf",
            self::VERIFIKATOR => "Verifikator"
        };
    }

    public static function options(): array
    {
        return [
            self::ADMIN->value => self::ADMIN->label(),
            self::KEPALA->value => self::KEPALA->label(),
            self::STAF->value => self::STAF->label(),
            self::VERIFIKATOR->value => self::VERIFIKATOR->label(),
        ];
    }
}