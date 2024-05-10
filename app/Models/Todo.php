<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Todo extends Model
{
    use HasFactory;


    protected $fillable = ['task', 'status'];
    protected $casts = [
        'completed' => 'boolean'
    ];

    public function collection(): BelongsTo
    {
        return $this->belongsTo(Collection::class, 'collection_slug', 'slug');
    }


    public function note(): HasOne
    {
        return $this->hasOne(Note::class);
    }


    public function subTodos(): HasMany
    {
        return $this->hasMany(SubTodo::class);
    }
}
