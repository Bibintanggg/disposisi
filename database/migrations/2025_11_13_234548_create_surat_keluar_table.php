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
        Schema::create('surat_keluar', function (Blueprint $table) {
            $table->id();
            $table->foreignId("unit_pengirim_id")->constrained("bidang")->onDelete("cascade");
            $table->foreignId("user_penanda_tangan_id")->constrained("users")->onDelete("cascade");
            $table->string("nomor_surat")->unique();
            $table->date('tanggal_surat');
            $table->string("penerima");
            $table->string("isi_surat");            
            $table->string("gambar")->nullable();
            $table->dateTime("tanggal_kirim");
            $table->integer("status_arsip");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_keluar');
    }
};
