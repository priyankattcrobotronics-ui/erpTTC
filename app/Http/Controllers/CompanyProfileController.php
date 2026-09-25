<?php

namespace App\Http\Controllers;

use App\Models\CompanyProfile;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CompanyProfileController extends Controller
{
    /**
     * Show Company Profile form
     */
    public function edit()
    {
        $company = CompanyProfile::first();

        /*
        |--------------------------------------------------------------------------
        | Load Countries -> States -> Cities
        |--------------------------------------------------------------------------
        */

        $countries = Country::with([
            'states' => function ($query) {
                $query
                    ->where('status', true)
                    ->orderBy('name');
            },

            'states.cities' => function ($query) {
                $query
                    ->where('status', true)
                    ->orderBy('name');
            },
        ])
        ->where('status', true)
        ->orderBy('name')
        ->get();

        return Inertia::render('CompanyProfile', [
            'company' => $company,
            'countries' => $countries,
        ]);
    }


    /**
     * Save / Update Company Profile
     */
    public function update(Request $request)
    {
        $validated = $request->validate([

            /*
            |--------------------------------------------------------------------------
            | Company Information
            |--------------------------------------------------------------------------
            */

            'company_name' => [
                'required',
                'string',
                'max:255',
            ],

            'email' => [
                'nullable',
                'email',
                'max:255',
            ],

            'phone' => [
                'nullable',
                'string',
                'max:30',
            ],

            'address' => [
                'nullable',
                'string',
            ],

            'zipcode' => [
                'nullable',
                'string',
                'max:20',
            ],

            'gst_number' => [
                'nullable',
                'string',
                'max:50',
            ],

            'pan_number' => [
                'nullable',
                'string',
                'max:20',
            ],

            'website' => [
                'nullable',
                'url',
                'max:255',
            ],


            /*
            |--------------------------------------------------------------------------
            | Company Logo
            |--------------------------------------------------------------------------
            */

            'logo' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],


            /*
            |--------------------------------------------------------------------------
            | Favicon
            |--------------------------------------------------------------------------
            */

            'favicon' => [
                'nullable',
                'file',
                'mimes:ico,png,jpg,jpeg,webp',
                'max:1024',
            ],


            /*
            |--------------------------------------------------------------------------
            | Location
            |--------------------------------------------------------------------------
            */

            'country_id' => [
                'nullable',
                'integer',
                'exists:countries,id',
            ],

            'state_id' => [
                'nullable',
                'integer',
                'exists:states,id',
            ],

            'city_id' => [
                'nullable',
                'integer',
                'exists:cities,id',
            ],
        ]);


        /*
        |--------------------------------------------------------------------------
        | Get Existing Company
        |--------------------------------------------------------------------------
        */

        $company = CompanyProfile::first();

        if (!$company) {
            $company = new CompanyProfile();
        }


        /*
        |--------------------------------------------------------------------------
        | Company Logo
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('logo')) {

            // Delete old logo
            if ($company->logo) {
                Storage::disk('public')->delete($company->logo);
            }

            // Store new logo
            $validated['logo'] = $request
                ->file('logo')
                ->store('company', 'public');

        } else {

            // Don't overwrite existing logo
            unset($validated['logo']);
        }


        /*
        |--------------------------------------------------------------------------
        | Favicon
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('favicon')) {

            // Delete old favicon
            if ($company->favicon) {
                Storage::disk('public')->delete($company->favicon);
            }

            // Store new favicon
            $validated['favicon'] = $request
                ->file('favicon')
                ->store('company', 'public');

        } else {

            // Don't overwrite existing favicon
            unset($validated['favicon']);
        }


        /*
        |--------------------------------------------------------------------------
        | Save Company Profile
        |--------------------------------------------------------------------------
        */

        $company->fill($validated);

        $company->save();


        /*
        |--------------------------------------------------------------------------
        | Redirect
        |--------------------------------------------------------------------------
        */

        return back()->with(
            'success',
            'Company profile updated successfully.'
        );
    }
}
