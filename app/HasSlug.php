<?php

namespace App;

use Illuminate\Support\Str;

trait HasSlug
{
    protected static function bootHasSlug(): void
    {
        static::creating(function ($model) {
            $model->generateUniqueSlug();
        });
    }


    protected function generateUniqueSlug()
    {
        $slugField = $this->getSlugField();
        $slug = Str::slug($this->$slugField);
        $originalSlug = $slug;

        $count = 1;

        while (static::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        $this->slug = $slug;
    }


    protected function getSlugField()
    {
        return 'name';
    }
}
