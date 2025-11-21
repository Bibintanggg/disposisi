<?php

namespace App\Http\Requests\Verif;

use App\Http\Enum\StatusArsip;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SuratKeluarRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return $this->suratKeluarRules();
    }

    public function suratKeluarRules()
    {
        $statusArsip = array_keys(StatusArsip::options());
        return [
            'unit_pengirim_id' => [
                'required', 'integer', Rule::exists('bidang', 'id')   
            ],
            'user_penanda_tangan_id' => [
                'required', 'integer', Rule::exists('users', 'id')
            ],
            'nomor_surat' => [
                'required', 'string', Rule::unique('surat_keluar', 'nomor_surat')
            ],
            'tanggal_surat' => ['required', 'date'],
            'penerima' => ['required', 'string'],
            'isi_surat' => ['required', 'string'],
            'gambar' => ['nullable', 'file', 'mimes: pdf', 'max:5120'],
            'tanggal_kirim' => ['required', 'date'],
            'status_arsip' => ['required', 'integer', Rule::in($statusArsip)]
        ];
    }
}
