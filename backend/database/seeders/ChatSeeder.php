<?php
namespace Database\Seeders;

use App\Models\Chat;
use App\Models\User;
use Illuminate\Database\Seeder;

class ChatSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::pluck('id');

        if ($users->count() < 2) {
            $users = User::factory(2)->create()->pluck('id');
        }

        $createdPairs = [];
        $targetCount = 15;
        $attempts = 0;

        while (count($createdPairs) < $targetCount && $attempts < 100) {
            $pair = $users->random(2)->values()->toArray();
            
            // 1. Sort the IDs so that [5, 1] becomes [1, 5]
            // This prevents duplicate rooms for the same two people
            sort($pair);
            
            $roomId = "room_{$pair[0]}_{$pair[1]}";

            // 2. Check if we've already generated this room_id in this loop
            // OR if it already exists in the database
            if (!in_array($roomId, $createdPairs) && !Chat::where('room_id', $roomId)->exists()) {
                Chat::factory()->create([
                    'users' => $pair,
                    'room_id' => $roomId
                ]);
                
                $createdPairs[] = $roomId;
            }
            
            $attempts++;
        }
    }
}