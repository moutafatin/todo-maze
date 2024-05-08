<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Todo extends Model
{
    use HasFactory;


    protected $fillable = ['task', 'status'];

    public function collection(): BelongsTo
    {
        return $this->belongsTo(Collection::class, 'collection_slug', 'slug');
    }
}
