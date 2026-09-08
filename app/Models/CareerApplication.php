<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class CareerApplication extends Model
{
    use HasFactory;

    // protected $fillable = [
    //     'full_name',
    //     'email',
    //     'phone',
    //     'skill_level',
    //     'address',
    //     'resume',
    //     'agree_terms',
    //     'status'
    // ];
    protected $guarded = [];

    protected $casts = [
        'agree_terms' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public static function getSkillLevels(): array
    {
        return [
            'beginner' => 'Beginner',
            'intermediate' => 'Intermediate',
            'experienced' => 'Experienced',
            'expert' => 'Expert'
        ];
    }

    public static function getStatuses(): array
    {
        return [
            'pending' => 'Pending',
            'reviewed' => 'Reviewed',
            'shortlisted' => 'Shortlisted',
            'rejected' => 'Rejected'
        ];
    }

    public function getResumeUrlAttribute(): string
    {
        return Storage::url($this->resume);
    }

    public function getResumeFilenameAttribute(): string
    {
        return basename($this->resume);
    }

    public function getStatusBadgeColorAttribute(): string
    {
        return match($this->status) {
            'pending' => 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
            'reviewed' => 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
            'shortlisted' => 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
            'rejected' => 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
            default => 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        };
    }
}