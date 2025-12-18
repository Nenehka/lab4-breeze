<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlbumController;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Домашняя страница
Route::get('/', function () {
    return view('home');
})->name('home');

// После логина Breeze ведёт на этот маршрут
Route::get('/dashboard', function () {
    return redirect()->route('albums.index');
})->middleware(['auth'])->name('dashboard');

Route::middleware(['auth'])->group(function () {
    Route::resource('albums', AlbumController::class);

    Route::get('/users', [AlbumController::class, 'usersList'])
        ->name('users.index');

    Route::get('/users/{user}/albums', [AlbumController::class, 'userAlbums'])
        ->name('users.albums');

    Route::post('/albums/{album}/restore', [AlbumController::class, 'restore'])
        ->name('albums.restore');

    Route::delete('/albums/{album}/force-delete', [AlbumController::class, 'forceDelete'])
        ->name('albums.forceDelete');
});

require __DIR__.'/auth.php';