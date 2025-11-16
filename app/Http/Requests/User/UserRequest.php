<?php

namespace App\Http\Requests\User;

use App\Http\Enum\Jabatan;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return $this->userRules();
    }

    protected function userRules(): array
    {
        // ID user kalau update
        $userId = $this->route('user')?->id;

        // Jabatan valid dari enum
        $validRoles = array_keys(Jabatan::options());

        return [
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($userId)
            ],

            'nip' => [
                'required',
                'string',
                Rule::unique('users', 'nip')->ignore($userId),
                'max:50'
            ],

            'username' => ['required', 'string', 'max:100'],
            'nama_lengkap' => ['required', 'string', 'max:200'],

            'bidang_id' => [
                'required',
                'integer',
                Rule::exists('bidang', 'id')
            ],

            'jabatan' => [
                'required',
                Rule::in($validRoles)
            ],

            'password' => [
                $this->isMethod('post') ? 'required' : 'nullable',
                'string',
                'min:8',
                'max:255'
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'email.unique' => 'Email sudah digunakan.',
            'nip.unique' => 'NIP sudah digunakan.',
            'username.unique' => 'Username sudah digunakan.',
            'jabatan.in' => 'Jabatan tidak valid.',
            'bidang_id.required' => 'Bidang wajib dipilih.',
            'bidang_id.exists' => 'Bidang tidak valid.',
        ];
    }
}
