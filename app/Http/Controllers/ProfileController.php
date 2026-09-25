<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use App\Models\Country;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();

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

        return Inertia::render('Profile/Edit', [
            'user' => $user,
            'countries' => $countries,

            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }


    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();

        $validated = $request->validate([

            /*
            |--------------------------------------------------------------------------
            | Personal Information
            |--------------------------------------------------------------------------
            */

            'first_name' => [
                'required',
                'string',
                'max:100',
            ],

            'last_name' => [
                'nullable',
                'string',
                'max:100',
            ],

            'username' => [
                'required',
                'string',
                'max:100',
                'unique:users,username,' . $user->id,
            ],

            'email' => [
                'required',
                'email',
                'max:255',
                'unique:users,email,' . $user->id,
            ],

            'phone_number' => [
                'nullable',
                'string',
                'max:10',
            ],

            'address' => [
                'nullable',
                'string',
                'max:500',
            ],

            'dob' => [
                'nullable',
                'date',
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

            'zipcode' => [
                'nullable',
                'string',
                'max:20',
            ],


            /*
            |--------------------------------------------------------------------------
            | Profile Image
            |--------------------------------------------------------------------------
            */

            'image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],
        ]);


        /*
        |--------------------------------------------------------------------------
        | Email Changed
        |--------------------------------------------------------------------------
        */

        if ($user->email !== $validated['email']) {
            $user->email_verified_at = null;
        }


        /*
        |--------------------------------------------------------------------------
        | Profile Image
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('image')) {

            // Delete old profile image
            if (
                $user->image &&
                Storage::disk('public')->exists($user->image)
            ) {
                Storage::disk('public')->delete($user->image);
            }

            // Store new profile image
            $validated['image'] = $request
                ->file('image')
                ->store('profile-images', 'public');

        } else {

            // Don't overwrite existing image
            unset($validated['image']);
        }


        /*
        |--------------------------------------------------------------------------
        | Save User Profile
        |--------------------------------------------------------------------------
        */

        $user->fill($validated);

        $user->save();


        /*
        |--------------------------------------------------------------------------
        | Redirect
        |--------------------------------------------------------------------------
        */

        return Redirect::route('profile.edit')
            ->with(
                'success',
                'Profile updated successfully.'
            );
    }


    /**
     * Delete user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => [
                'required',
                'current_password',
            ],
        ]);

        $user = $request->user();

        Auth::logout();


        /*
        |--------------------------------------------------------------------------
        | Delete Profile Image
        |--------------------------------------------------------------------------
        */

        if (
            $user->image &&
            Storage::disk('public')->exists($user->image)
        ) {
            Storage::disk('public')->delete($user->image);
        }


        /*
        |--------------------------------------------------------------------------
        | Delete User
        |--------------------------------------------------------------------------
        */

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();


        return Redirect::to('/');
    }
}
