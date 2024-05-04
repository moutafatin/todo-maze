<?php

namespace Database\Seeders;

use App\Models\Collection;
use App\Models\Folder;
use App\Models\Todo;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);


        Folder::factory(2)->for($user)->create()->each(function (Folder $folder) {
            Collection::factory(3)->for($folder)->create()->each(function (Collection $collection) {
                Todo::factory(5)->for($collection)->create();
            });
        });

    }
}
