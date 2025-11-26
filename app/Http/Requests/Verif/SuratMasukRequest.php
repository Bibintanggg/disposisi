<?php

namespace App\Http\Requests\Verif;

use App\Http\Enum\SifatSurat;
use App\Http\Enum\StatusAkhir;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SuratMasukRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
       return $this->suratMasukRules();
    }

    public function suratMasukRules()
    {
        $sifatSurat = array_keys(SifatSurat::options());
        $statusAkhir = array_keys(StatusAkhir::options());

        return [
            'user_input_id' => [
                'required', 'integer', Rule::exists('users', 'id')
            ],
            'nomor_surat' => [
                'required', 'string', "max: 100"
            ],
            'tanggal_surat' => ['required', 'date'], 
            'tanggal_terima' => ["required", 'date'],
        'pengirim' => ['required', 'string', 'max: 250'],
            'isi_surat' => ['required', 'string'],
            'sifat_surat' => [
                'required', 'integer', Rule::in($sifatSurat)
            ],
            'gambar' => ['nullable', 'file', 'mimes:pdf', 'max:5120'],
            'status_akhir' => [
                'required',
                'integer',
                Rule::in($statusAkhir)
            ]
        ];
    }
}
