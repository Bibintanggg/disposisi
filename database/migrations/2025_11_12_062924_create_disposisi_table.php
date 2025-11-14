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
        Schema::create('disposisi', function (Blueprint $table) {
            $table->id();
            $table->foreignId("surat_id")->constrained("surat_masuk")->onDelete("cascade");
            $table->foreignId("pengirim_id")->constrained("users")->onDelete("cascade");
            $table->dateTime("tanggal_disposisi");
            $table->string("isi_surat");
            $table->string("catatan_tambahan")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('disposisi');
    }
};
