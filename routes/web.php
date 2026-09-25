<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\CompanyProfileController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return redirect()->route('login');
});


Route::middleware(['auth'])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');


    /*
    |--------------------------------------------------------------------------
    | Company Profile
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/company-profile',
        [CompanyProfileController::class, 'edit']
    )->name('company-profile.edit');

    Route::put(
        '/company-profile',
        [CompanyProfileController::class, 'update']
    )->name('company-profile.update');


    /*
    |--------------------------------------------------------------------------
    | Logout
    |--------------------------------------------------------------------------
    */

    Route::post('/logout', [LoginController::class, 'destroy'])
        ->name('logout');


    /*
    |--------------------------------------------------------------------------
    | Profile
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/profile',
        [ProfileController::class, 'edit']
    )->name('profile.edit');

    Route::put(
        '/profile',
        [ProfileController::class, 'update']
    )->name('profile.update');

    Route::delete(
        '/profile',
        [ProfileController::class, 'destroy']
    )->name('profile.destroy');


    /*
    |--------------------------------------------------------------------------
    | Users
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/users',
        [UserController::class, 'index']
    )->name('users.index');


    /*
    | Create User
    */

    Route::get(
        '/users/create',
        [UserController::class, 'create']
    )->name('users.create');


    /*
    | Store User
    */

    Route::post(
        '/users',
        [UserController::class, 'store']
    )->name('users.store');


    /*
    | Edit User
    |
    | Same React page Users/Create.jsx will be used.
    */

    Route::get(
        '/users/{user}/edit',
        [UserController::class, 'edit']
    )->name('users.edit');


    /*
    | Update User
    */

    Route::put(
        '/users/{user}',
        [UserController::class, 'update']
    )->name('users.update');


    /*
    | Delete User
    */

    Route::delete(
        '/users/{user}',
        [UserController::class, 'destroy']
    )->name('users.destroy');

});


require __DIR__.'/auth.php';
