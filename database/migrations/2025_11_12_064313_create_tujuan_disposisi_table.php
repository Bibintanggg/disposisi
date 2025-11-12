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
        Schema::create('tujuan_disposisi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('disposisi_id')->constrained('disposisi')->onDelete('cascade');
            $table->foreignId("penerima_id")->constrained('users')->onDelete('cascade');
            $table->integer('status_tindak_lanjut');
            $table->dateTime("tanggal_selesai")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tujuan_disposisi');
    }
};
