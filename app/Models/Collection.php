<?php

namespace App\Models;

use App\HasSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Collection extends Model
{
    use HasFactory;
    use HasSlug;

    protected $fillable = ['name', 'slug', 'folder_slug'];

    public function folder(): BelongsTo
    {
        return $this->belongsTo(Folder::class, 'folder_slug', 'slug');
    }


    public function todos(): HasMany
    {
        return $this->hasMany(Todo::class, 'collection_slug', 'slug');
    }


    public function getRouteKeyName()
    {
        return 'slug';
    }
}
