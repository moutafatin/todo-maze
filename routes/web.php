<?php

use App\Http\Controllers\CollectionController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubTodoController;
use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;


Route::inertia('/', 'Home')->name('home');
Route::inertia('/app', 'App/Dashboard')->middleware(['auth', 'verified'])->name('dashboard');

// Add auth guard
Route::prefix('/app')->middleware('auth')->group(function () {


    Route::prefix('folders')->group(function () {
        Route::controller(FolderController::class)->name('folders.')->group(function () {
            Route::post('store', 'store')->name('store');
            Route::patch('{folder}', 'update')->name('update')->can('manage-folders,folder');
            Route::delete('{folder}', 'destroy')->name('destroy')->can('manage-folders,folder');
        });

        Route::prefix('{folder}/collections')->controller(CollectionController::class)->name('collections.')->group(function () {
            Route::post('store', 'store')->name('store');
            Route::patch('{collection}', 'update')->name('update')->can('manage-collections,collection');
            Route::delete('{collection}', 'destroy')->name('destroy')->can('manage-collections,collection');

        })->scopeBindings();
    });

    Route::prefix('/collections/{collection}/todos')->controller(TodoController::class)->name('todos.')->group(function () {
        Route::get('', [TodoController::class, 'index'])->name('index');
        Route::post('', [TodoController::class, 'store'])->name('store');
        Route::delete('{todo}', [TodoController::class, 'destroy'])->name('destroy')->can('manage-todos,todo');
        Route::patch('{todo}', [TodoController::class, 'update'])->name('update')->can('manage-todos,todo');
    })->scopeBindings();

});


Route::prefix('/todos/{todo}/sub-todos')->middleware('auth')->name('subTodos.')->group(function () {
    Route::post('', [SubTodoController::class, 'store'])->name('store');
    Route::delete('{subTodo}', [SubTodoController::class, 'destroy'])->name('destroy');
    Route::patch('{subTodo}', [SubTodoController::class, 'update'])->name('update');
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
