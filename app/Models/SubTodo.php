<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubTodo extends Model
{
    use HasFactory;

    protected $fillable = ['content', 'completed'];

    public function todo(): BelongsTo
    {
        return $this->belongsTo(Todo::class);
    }
}
