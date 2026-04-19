<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
    public function definition(): array
    {
        $pair = User::pluck('id')->random(2)->values()->toArray();
        sort($pair);
        $roomId = "room_{$pair[0]}_{$pair[1]}";
        
        return [
            // Eloquent is smart enough to handle the ID from the factory automatically
            'user_id' => $pair[rand(0, 1)], 
            
            // Random room between 1 and 10
            'room_id' => $roomId,
            
            // Random sentence
            'msg' => $this->faker->sentence(),
            
            // Fixed the minutes format (i) and simplified
            'time' => now()->format('H:i:s'),
            
            // Note: Laravel handles created_at and updated_at automatically 
            // if they are standard timestamps, but keeping them here is fine!
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}