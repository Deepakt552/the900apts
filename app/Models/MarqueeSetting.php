<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MarqueeSetting extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'is_active' => 'boolean',
        'pause_on_hover' => 'boolean',
        'smooth_mode' => 'boolean',
        'speed' => 'integer',
    ];
}

