<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlbumController;

Route::get('/', [AlbumController::class, 'index']);

Route::resource('albums', AlbumController::class);