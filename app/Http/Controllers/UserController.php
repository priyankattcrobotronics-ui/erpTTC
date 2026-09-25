<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Users List
     *
     * role_id = 1 -> Admin -> All users
     * other roles -> Only own data
     */
    public function index(Request $request)
    {
        $loggedInUser = $request->user();

        if ($loggedInUser->role_id == 1) {

            $users = User::with('role')
                ->latest()
                ->paginate(15);

        } else {

            $users = User::with('role')
                ->where('id', $loggedInUser->id)
                ->latest()
                ->paginate(15);
        }

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }


    /**
     * Create User Page
     */
    public function create(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | Only Admin Can Create Users
        |--------------------------------------------------------------------------
        */

        if ($request->user()->role_id != 1) {
            abort(403, 'You are not authorized to create users.');
        }


        $roles = Role::where('status', true)
            ->orderBy('name')
            ->get([
                'id',
                'name',
                'short_name',
            ]);


        return Inertia::render('Users/Create', [
            'roles' => $roles,
            'user' => null,
            'isEdit' => false,
        ]);
    }


    /**
     * Store User
     */
    public function store(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | Only Admin Can Create
        |--------------------------------------------------------------------------
        */

        if ($request->user()->role_id != 1) {
            abort(403, 'You are not authorized to create users.');
        }


        $validated = $request->validate([

            'role_id' => [
                'required',
                'integer',
                Rule::exists('roles', 'id')
                    ->where('status', true),
            ],

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
                'unique:users,username',
            ],

            'email' => [
                'required',
                'email',
                'max:255',
                'unique:users,email',
            ],

            'email_verified_at' => [
                'nullable',
                'boolean',
            ],

            'status' => [
                'required',
                'boolean',
            ],

            'password' => [
                'required',
                'string',
                'min:8',
            ],
        ]);


        /*
        |--------------------------------------------------------------------------
        | Email Verification
        |--------------------------------------------------------------------------
        */

        if (!empty($validated['email_verified_at'])) {

            $validated['email_verified_at'] = now();

        } else {

            $validated['email_verified_at'] = null;
        }


        /*
        |--------------------------------------------------------------------------
        | Password Hash
        |--------------------------------------------------------------------------
        */

        $validated['password'] = Hash::make(
            $validated['password']
        );


        /*
        |--------------------------------------------------------------------------
        | Create
        |--------------------------------------------------------------------------
        */

        User::create($validated);


        return redirect()
            ->route('users.index')
            ->with('success', 'User created successfully.');
    }


    /**
     * Edit User Page
     *
     * Same Users/Create.jsx page is used for editing.
     */
    public function edit(Request $request, User $user)
    {
        /*
        |--------------------------------------------------------------------------
        | Only Admin Can Edit
        |--------------------------------------------------------------------------
        */

        if ($request->user()->role_id != 1) {
            abort(403, 'You are not authorized to edit users.');
        }


        $roles = Role::where('status', true)
            ->orderBy('name')
            ->get([
                'id',
                'name',
                'short_name',
            ]);


        /*
        |--------------------------------------------------------------------------
        | User Data
        |--------------------------------------------------------------------------
        */

        $userData = [

            'id' => $user->id,

            'role_id' => $user->role_id,

            'first_name' => $user->first_name,

            'last_name' => $user->last_name,

            'username' => $user->username,

            'email' => $user->email,

            'email_verified_at' => !is_null(
                $user->email_verified_at
            ),

            'status' => (bool) $user->status,

        ];


        return Inertia::render('Users/Create', [
            'roles' => $roles,
            'user' => $userData,
            'isEdit' => true,
        ]);
    }


    /**
     * Update User
     */
    public function update(
        Request $request,
        User $user
    ) {
        /*
        |--------------------------------------------------------------------------
        | Only Admin Can Update
        |--------------------------------------------------------------------------
        */

        if ($request->user()->role_id != 1) {
            abort(403, 'You are not authorized to update users.');
        }


        $validated = $request->validate([

            'role_id' => [
                'required',
                'integer',
                Rule::exists('roles', 'id')
                    ->where('status', true),
            ],

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

                Rule::unique('users', 'username')
                    ->ignore($user->id),
            ],

            'email' => [
                'required',
                'email',
                'max:255',

                Rule::unique('users', 'email')
                    ->ignore($user->id),
            ],

            'email_verified_at' => [
                'nullable',
                'boolean',
            ],

            'status' => [
                'required',
                'boolean',
            ],

            /*
            |--------------------------------------------------------------------------
            | Password Optional During Edit
            |--------------------------------------------------------------------------
            |
            | Empty password = keep old password
            |
            */

            'password' => [
                'nullable',
                'string',
                'min:8',
            ],
        ]);


        /*
        |--------------------------------------------------------------------------
        | Email Verification
        |--------------------------------------------------------------------------
        */

        if (!empty($validated['email_verified_at'])) {

            $validated['email_verified_at'] = $user->email_verified_at
                ?? now();

        } else {

            $validated['email_verified_at'] = null;
        }


        /*
        |--------------------------------------------------------------------------
        | Password
        |--------------------------------------------------------------------------
        */

        if (!empty($validated['password'])) {

            $validated['password'] = Hash::make(
                $validated['password']
            );

        } else {

            unset($validated['password']);
        }


        /*
        |--------------------------------------------------------------------------
        | Update
        |--------------------------------------------------------------------------
        */

        $user->update($validated);


        return redirect()
            ->route('users.index')
            ->with('success', 'User updated successfully.');
    }


    /**
     * Delete User
     *
     * role_id = 1 users cannot be deleted.
     */
    public function destroy(
        Request $request,
        User $user
    ) {
        $loggedInUser = $request->user();


        /*
        |--------------------------------------------------------------------------
        | Admin User Protection
        |--------------------------------------------------------------------------
        */

        if ($user->role_id == 1) {

            return redirect()
                ->route('users.index')
                ->with('error', 'Admin users cannot be deleted.');
        }


        /*
        |--------------------------------------------------------------------------
        | Non Admin User Protection
        |--------------------------------------------------------------------------
        */

        if ($loggedInUser->role_id != 1) {

            if ($loggedInUser->id != $user->id) {

                abort(
                    403,
                    'You are not authorized to delete this user.'
                );
            }


            abort(
                403,
                'You are not authorized to delete your own account.'
            );
        }


        /*
        |--------------------------------------------------------------------------
        | Delete
        |--------------------------------------------------------------------------
        */

        $user->delete();


        return redirect()
            ->route('users.index')
            ->with('success', 'User deleted successfully.');
    }
}
