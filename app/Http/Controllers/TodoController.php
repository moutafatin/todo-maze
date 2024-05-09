<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateTodoRequest;
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
        return Inertia::render('App/Todos', ['collection' => $collection, 'todos' => $collection->todos->load(['note', 'subTodos'])]);
    }


    public function store(Request $request, Folder $folder, Collection $collection)
    {
        $validatedData = $request->validate(['task' => 'required']);
        $collection->todos()->create($validatedData)->note()->create();


        return back();
    }

    public function destroy(Folder $folder, Collection $collection, Todo $todo)
    {
        $todo->delete();

        return back();
    }

    public function update(UpdateTodoRequest $request, Folder $folder, Collection $collection, Todo $todo)
    {
        $validatedData = $request->validated();

        if ($request->has('note')) {
            $todo->note->content = $validatedData['note'];
        }

        if ($request->has('subTodo')) {
            $todo->subTodos()->create(['content' => $validatedData['subTodo']]);
        }

        $todo->save();

        return back();
    }
}
