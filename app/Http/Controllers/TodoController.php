<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateTodoRequest;
use App\Models\Collection;
use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{

    public function index(Collection $collection)
    {
//        dd($folder->collections);
        return Inertia::render('App/Todos', ['collection' => $collection, 'todos' => $collection->todos->load(['note', 'subTodos'])]);
    }


    public function store(Request $request, Collection $collection)
    {
        $validatedData = $request->validate(['task' => 'required']);
        $collection->todos()->create($validatedData)->note()->create();


        return back();
    }

    public function destroy(Collection $collection, Todo $todo)
    {
        $todo->delete();

        return back();
    }

    public function update(UpdateTodoRequest $request, Collection $collection, Todo $todo)
    {
        $validatedData = $request->validated();

        if ($request->has('note')) {
            $todo->note->content = $validatedData['note'];
            $todo->note->save();
            return back();
        }

        if ($request->has('subTodo')) {
            $todo->subTodos()->create(['content' => $validatedData['subTodo']]);
        }


        return back();
    }
}
