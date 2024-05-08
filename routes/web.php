<?php

use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
});

Route::get('/users', [UsersController::class, 'index'])->middleware('auth')->name('users.index');
Route::post('/users', [UsersController::class, 'store'])->middleware('auth')->name('users.store');
