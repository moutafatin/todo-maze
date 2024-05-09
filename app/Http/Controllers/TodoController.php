<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Folder;
use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{

    public function index(Folder $folder, Collection $collection)
    {
//        dd($folder->collections);
        return Inertia::render('App/Todos', ['collection' => $collection, 'todos' => $collection->todos]);
    }


    public function store(Request $request, Folder $folder, Collection $collection)
    {
        $validatedData = $request->validate(['task' => 'required']);
        $collection->todos()->create($validatedData);


        return back();
    }

    public function destroy(Folder $folder, Collection $collection, Todo $todo)
    {
        $todo->delete();

        return back();
    }
}
