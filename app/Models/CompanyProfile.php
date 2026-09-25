<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyProfile extends Model
{
    protected $fillable = [
        'company_name',
        'logo',
        'favicon',
        'email',
        'phone',
        'address',
        'country_id',
        'state_id',
        'city_id',
        'zipcode',
        'gst_number',
        'pan_number',
        'website',
    ];
}
