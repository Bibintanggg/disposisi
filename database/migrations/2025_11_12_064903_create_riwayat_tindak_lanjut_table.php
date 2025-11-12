<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('riwayat_tindak_lanjut', function (Blueprint $table) {
            $table->id();
            $table->foreignId("tujuan_id")->constrained('tujuan_disposisi')->onDelete('cascade');
            $table->dateTime("tanggal_laporan");
            $table->string("deskripsi");
            $table->string("file_laporan");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_tindak_lanjut');
    }
};
