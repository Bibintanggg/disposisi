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
        Schema::create('surat_masuk', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_input_id")->constrained("users")->onDelete("cascade");
            $table->string("nomor_surat", 100)->unique();
            $table->date("tanggal_surat");
            $table->dateTime("tanggal_terima");
            $table->string("pengirim", 250);
            $table->string("isi_surat");
            $table->integer("sifat_surat");
            $table->string("gambar")->nullable();
            $table->integer("status_akhir")->default(1);
            $table->integer("status_verifikasi")->default(1);
            $table->integer("status_cetak")->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_masuk');
    }
};
