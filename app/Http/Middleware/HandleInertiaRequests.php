<?php

namespace App\Http\Middleware;

use App\Models\Folder;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $folders = $user ? Folder::with(['collections' => function ($query) {
            $query->select(['id', 'name', 'slug', 'folder_slug']);
        }])->where('user_id', $user->id)->select(['id', 'name', 'slug'])->get() : null;


        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],

            'folders' => $folders
        ];
    }
}
