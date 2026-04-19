<?php

namespace Database\Seeders;

use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Seeder;

class MessageSeeder extends Seeder
{
    public function run(): void
    {
        // Option A: Create 50 messages with random users (will create new users)
        // Message::factory(50)->create();

        // Option B: Attach messages to EXISTING users (Recommended for consistency)
        $users = User::all();

        if ($users->isEmpty()) {
            $users = User::factory(10)->create();
        }

        Message::factory(100)->recycle($users)->create();
    }
}