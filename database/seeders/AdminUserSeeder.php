<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            [
                'email' => 'admin@example.com',
            ],
            [
                'role_id' => 1,

                'first_name' => 'admin',
                'last_name' => 'Administrator',

                'username' => 'admin',

                'phone_number' => null,
                'address' => null,
                'dob' => null,
                'image' => null,

                'country_id' => null,
                'state_id' => null,
                'city_id' => null,
                'zipcode' => null,

                'status' => 1,

                'password' => Hash::make('Admin@12345'),

                'email_verified_at' => now(),
            ]
        );
    }
}
