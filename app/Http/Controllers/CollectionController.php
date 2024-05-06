<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Folder;
use Illuminate\Http\Request;

class CollectionController extends Controller
{

    public function store(Request $request, Folder $folder)
    {
        $validatedData = $request->validate(['name' => 'required']);
        $folder->collections()->create($validatedData);

        return redirect()->back();
    }


    public function update(Request $request, Folder $folder, Collection $collection)
    {
        $request->validate(['name' => 'required']);

        $collection->name = $request['name'];
        $collection->save();

        return back();
    }


    public function destroy(Request $request, Folder $folder, Collection $collection)
    {
        $collection->delete();

        return back();
    }
}
