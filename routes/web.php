<?php

use App\Http\Controllers\CollectionController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;


Route::inertia('/', 'Home')->name('home');
Route::inertia('/app', 'App/Dashboard')->middleware(['auth', 'verified'])->name('dashboard');

// Add auth guard
Route::prefix('/app/folders')->middleware('auth')->group(function () {
    Route::controller(FolderController::class)->name('folders.')->group(function () {
        Route::post('store', 'store')->name('store');
        Route::patch('{folder}', 'update')->name('update');
        Route::delete('{folder}', 'destroy')->name('destroy');
    });

    Route::prefix('{folder}/collections')->controller(CollectionController::class)->name('collections.')->group(function () {
        Route::post('store', 'store')->name('store');
        Route::patch('{collection}', 'update')->name('update');
        Route::delete('{collection}', 'destroy')->name('destroy');
    });

});


//Route::get('/dashboard', function () {
//    return Inertia::render('Dashboard');
//})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
