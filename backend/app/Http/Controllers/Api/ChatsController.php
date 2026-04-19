<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use App\Models\Chat;
use Illuminate\Http\Request;

class ChatsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {



        $searchTerm = $request->query('user_id');

        $results = DB::table('chats')
            ->select('id', 'room_id')
            ->addSelect(DB::raw("
                CASE 
                    WHEN firstUser = '$searchTerm' THEN secondUser
                    WHEN secondUser = '$searchTerm' THEN firstUser
                    ELSE 'none'
                END as user_id
            "))
            ->where('firstUser', $searchTerm)
            ->orWhere('secondUser', $searchTerm);


        $chats = DB::table('users')
            ->joinSub($results, 'matched_chats', function ($join) {
                $join->on('matched_chats.user_id', '=', 'users.id');
            })
            ->get();

        // $chats = Chat::where('users', (int)$request->query('user_id'))->get();
        return response()->json($chats);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_1' => 'required|integer',
            'user_2' => 'required|integer',
        ]);

        $chat = new Chat();
        $chat->room_id = 'user_' . $validated['user_1'] . '_' . $validated['user_2'];
        $chat->firstUser = $validated['user_1'];
        $chat->secondUser = $validated['user_2'];

        $chat->save();

        return response()->json($chat);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {}
}
