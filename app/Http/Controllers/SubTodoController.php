<?php

namespace App\Http\Controllers;

use App\Models\SubTodo;
use App\Models\Todo;
use Illuminate\Http\Request;

class SubTodoController extends Controller
{
    public function store(Request $request, Todo $todo)
    {
        $request->validate(['content' => 'required']);

        $todo->subTodos()->create(['content' => $request->get('content')]);

        return back();
    }

    public function destroy(Request $request, Todo $todo, SubTodo $subTodo)
    {
        $subTodo->delete();
        return back();
    }


    public function update(Request $request, Todo $todo, SubTodo $subTodo)
    {

        $request->validate(['content' => 'required']);

        $subTodo->content = $request->get('content');
        $subTodo->save();

        return back();
    }
}
