<?php

namespace App\Http\Controllers;

use App\Models\Folder;
use Illuminate\Http\Request;

class FolderController extends Controller
{


    public function store(Request $request)
    {
        $validatedData = $request->validate(['name' => 'required']);
        $request->user()->folders()->create($validatedData);

        return redirect()->back();
    }


    public function update(Request $request, Folder $folder)
    {
        $request->validate(['name' => 'required']);

        $folder->name = $request['name'];
        $folder->save();

        return back();
    }


    public function destroy(Folder $folder)
    {
        $folder->delete();
        return back();
    }


}
