<?php 

namespace App\Http\Enum;

enum StatusArsip: int
{
    case ARSIP_AKTIF = 1;
    case ARSIP_INAKTIF = 2;

    public function label() 
    {
        return match($this) {
            self::ARSIP_AKTIF => "Arsip Aktif",
            self::ARSIP_INAKTIF => "Arsip Inaktif"
        };
    }
}