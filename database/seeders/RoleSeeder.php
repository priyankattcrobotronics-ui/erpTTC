<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'name' => 'Admin',
                'short_name' => 'admin',
                'description' => 'System Administrator with full access to all ERP modules',
            ],

            [
                'name' => 'Sale',
                'short_name' => 'sale',
                'description' => 'Sales management, customer orders and inquiries',
            ],

            [
                'name' => 'Purchase',
                'short_name' => 'purchase',
                'description' => 'Purchase orders, vendor management and raw material procurement',
            ],

            [
                'name' => 'Gate',
                'short_name' => 'gate',
                'description' => 'Gate entry, vehicle inward/outward passes and driver verification',
            ],

            [
                'name' => 'Weight',
                'short_name' => 'weight',
                'description' => 'Weighbridge management, gross and tare weight measurement',
            ],

            [
                'name' => 'Unloader',
                'short_name' => 'unloader',
                'description' => 'Material unloading, scrap yard inspection and deduction entries',
            ],

            [
                'name' => 'Dispatch',
                'short_name' => 'dispatch',
                'description' => 'Finished goods dispatch, delivery challans and vehicle loading',
            ],

            [
                'name' => 'Lab',
                'short_name' => 'lab',
                'description' => 'Quality control, chemical/tensile lab testing and test certificates',
            ],

            [
                'name' => 'Production',
                'short_name' => 'production',
                'description' => 'Plant manufacturing, mill operations and ERW pipe production',
            ],

            [
                'name' => 'Lab Production',
                'short_name' => 'lab_production',
                'description' => 'Laboratory quality analysis and production operations',
            ],

            [
                'name' => 'Account',
                'short_name' => 'account',
                'description' => 'Accounts, invoices, GST e-way billing and payments',
            ],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(
                [
                    'short_name' => $role['short_name'],
                ],
                [
                    'name' => $role['name'],
                    'description' => $role['description'],
                    'status' => true,
                ]
            );
        }
    }
}
