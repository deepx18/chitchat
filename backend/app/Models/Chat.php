<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'firstUser',
        'secondUser',
    ];

    protected $casts = [
        'users' => 'array',
    ];

    // Optional: Ensure we always store exactly 2 users
    public function setUsersAttribute($value)
    {
        // if (is_array($value) && count($value) === 2) {
        //     $this->attributes['users'] = json_encode(array_values($value));
        // } else {
        //     throw new \InvalidArgumentException("A chat must have exactly 2 users.");
        // }
    }

}
