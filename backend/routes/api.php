<?php

use App\Http\Controllers\Api\ChatsController;
use App\Http\Controllers\Api\MessagesController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json(['message' => 'API working']);
});

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'getAuthenticatedUser']);

Route::apiResource('messages', MessagesController::class)->except(['update']);
Route::apiResource('chats', ChatsController::class)->except(['show', 'update', 'destroy']);
Route::apiResource('users', UsersController::class)->except(['update']);
