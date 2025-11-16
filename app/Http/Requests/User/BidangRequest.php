<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BidangRequest extends FormRequest
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
        return $this->bidangRules();
    }

    public function bidangRules(): array
    {
        $bidangId = $this->route('bidang')?->id;

        return [
            'nama_bidang' => [
                'required',
                'string',
                'max:255',
                Rule::unique('bidang', 'nama_bidang')->ignore($bidangId)
            ],
        ];
    }

    
    public function messages(): array
    {
        return [
            'nama_bidang.required' => 'Nama bidang wajib diisi.',
            'nama_bidang.unique' => 'Nama bidang sudah digunakan.',
        ];
    }
}
