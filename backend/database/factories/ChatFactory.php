<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChatFactory extends Factory
{
    public function definition(): array
    {
        return [
            'room_id' => 'chat_' . $this->faker->unique()->numberBetween(1000, 9999),
            // Defaulting to two IDs; the Seeder will inject real ones
            // 'users' => [1, 2], 
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}