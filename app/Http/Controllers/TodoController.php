<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Folder;
use Inertia\Inertia;

class TodoController extends Controller
{

    public function index(Folder $folder, Collection $collection)
    {
        return Inertia::render('App/Todos', ['collection' => $collection->load('todos')]);
    }
}
