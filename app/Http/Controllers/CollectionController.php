<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Folder;
use Illuminate\Http\Request;

class CollectionController extends Controller
{

    public function store(Request $request, Folder $folder)
    {
        $request->validate(['name' => 'required']);

        Collection::create(['name' => $request['name'], 'folder_id' => $folder->id]);

        return redirect()->back();
    }
}
