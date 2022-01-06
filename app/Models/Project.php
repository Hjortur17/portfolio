<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    public function tools()
    {
        return $this->belongsToMany(Tool::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }
}
