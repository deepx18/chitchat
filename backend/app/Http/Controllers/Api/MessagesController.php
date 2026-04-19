<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;

class MessagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $messages = Message::where('room_id', $request->query('room_id'))->get();

        return response()->json($messages);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required',
            'room_id' => 'required',
            'time' => "required",
            'msg' => 'required',
        ]);

        $savedMessage = Message::create($validated);
        return response()->json($savedMessage);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        $message = Message::findOrFail($id);

        return response()->json($message);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $message = Message::destroy($id);

        return response()->json($message);
    }
}
