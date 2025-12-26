<?php

namespace App\Http\Controllers\Staf;

use App\Http\Controllers\Controller;
use App\Http\Enum\StatusTindakLanjut;
use App\Models\TujuanDisposisi;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RiwayatTugasController extends Controller
{
    public function index(Request $request)
    {
        $userId = Auth::id();

        $riwayat = TujuanDisposisi::with([
            'disposisi',
            'disposisi.suratMasuk',
            'disposisi.pengirim',
        ])
            ->where('penerima_id', $userId)
            ->where('status_tindak_lanjut', StatusTindakLanjut::SELESAI->value)
            ->orderBy('tanggal_selesai', 'desc')
            ->get();

        $totalMinutesArr = [];

        $riwayatFormatted = $riwayat->map(function ($item) use (&$totalMinutesArr) {

            $mulai = $item->disposisi->tanggal_disposisi;
            $selesai = $item->tanggal_selesai;

            $durasiString = "-";

            if ($mulai && $selesai) {
                $mulai = Carbon::parse($mulai);
                $selesai = Carbon::parse($selesai);

                $totalMinutes = $mulai->diffInMinutes($selesai);
                $totalMinutesArr[] = $totalMinutes;

                $days = floor($totalMinutes / 1440);
                $hours = floor(($totalMinutes % 1440) / 60);
                $minutes = $totalMinutes % 60;

                $durasiString = trim(
                    ($days > 0 ? "$days hari " : "") .
                        ($hours > 0 ? "$hours jam " : "") .
                        ($minutes > 0 ? "$minutes menit" : "")
                );
            }

            return [
                'id' => $item->id,
                'nomor_surat' => $item->disposisi->suratMasuk->nomor_surat ?? '-',
                'perihal' => $item->disposisi->suratMasuk->isi_surat ?? '-',
                'isi_disposisi' => $item->disposisi->isi_surat ?? '-',
                'tanggal_selesai' => $item->tanggal_selesai,
                'durasi' => $durasiString,
                'pengirim' => $item->disposisi->pengirim->nama_lengkap ?? '-',
                'has_file' => !empty($item->disposisi->suratMasuk->gambar),
            ];
        });


        // Hitung rata-rata durasi
        if (count($totalMinutesArr) > 0) {
            $avgMinutes = array_sum($totalMinutesArr) / count($totalMinutesArr);

            $days = floor($avgMinutes / 1440);
            $hours = floor(($avgMinutes % 1440) / 60);
            $minutes = floor($avgMinutes % 60);

            $avgDurasi = trim(
                ($days > 0 ? "$days hari " : "") .
                    ($hours > 0 ? "$hours jam " : "") .
                    ($minutes > 0 ? "$minutes menit" : "")
            );
        } else {
            $avgDurasi = "-";
        }

        return Inertia::render('Staf/RiwayatTugasSelesai', [
            'riwayat' => $riwayatFormatted,
            'avgDurasi' => $avgDurasi,
        ]);
    }

    public function lihatSurat($id)
    {
        $item = TujuanDisposisi::with(['disposisi.suratMasuk'])
            ->where('id', $id)
            ->where('penerima_id', Auth::id())
            ->firstOrFail();

        $surat = $item->disposisi->suratMasuk;

        $filePath = $surat->gambar ?? null;

        if (!$filePath || !Storage::disk('public')->exists($filePath)) {
            abort(404, 'File surat tidak ditemukan.');
        }

        return response()->file(storage_path("app/public/" . $filePath));
    }
}
