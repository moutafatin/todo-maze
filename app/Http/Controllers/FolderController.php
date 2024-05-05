<?php

namespace App\Http\Controllers;

use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class FolderController extends Controller
{


    public function store(Request $request)
    {
        $request->validate(['name' => 'required']);

        Folder::create(['name' => $request['name'], 'user_id' => Auth::user()->id, 'slug' => Str::slug($request['name'] . '-' . uniqid('', true))]);

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
