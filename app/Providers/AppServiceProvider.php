<?php

namespace App\Providers;

use App\Models\Collection;
use App\Models\Folder;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('manage-folders', function (User $user, Folder $folder) {
            return $folder->user()->is($user);
        });

        Gate::define('manage-collections', function (User $user, Collection $collection) {
            return $collection->folder->user()->is($user);
        });

        Gate::define('manage-todos', function (User $user, Todo $todo) {
            return $todo->collection->folder->user()->is($user);
        });

    }
}
