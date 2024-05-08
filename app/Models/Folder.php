<?php

namespace App\Models;

use App\HasSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Folder extends Model
{
    use HasFactory;
    use HasSlug;

    protected $fillable = ['name', 'user_id', 'slug'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function collections(): HasMany
    {
        return $this->hasMany(Collection::class, 'folder_slug', 'slug');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }


//    protected static function booted(): void
//    {
//        static::creating(function (self $model) {
//            $slug = Str::slug($model->name);
//            $originalSlug = $slug;
//            $count = 1;
//
//
//            while (static::where('slug', $slug)->exists()) {
//                $slug = $originalSlug . '-' . $count;
//                $count++;
//            }
//
//
//            $model->slug = $slug;
//        });
//    }
}
