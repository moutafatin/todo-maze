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

    protected $fillable = ['name', 'slug', 'folder_id'];

    public function folder(): BelongsTo
    {
        return $this->belongsTo(Folder::class);
    }


    public function todos(): HasMany
    {
        return $this->hasMany(Todo::class);
    }
}
