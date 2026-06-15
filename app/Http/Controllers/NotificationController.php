<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        return response()->json([
            'notifications' => $request->user()->notifications()
                ->latest()
                ->take(20)
                ->get()
                ->map(fn($n) => [
                    'id'         => $n->id,
                    'message'    => $n->data['message'],
                    'icon'       => $n->data['icon'] ?? 'bell',
                    'read'       => !is_null($n->read_at),
                    'created_at' => $n->created_at->diffForHumans(),
                    'url'        => route('pengiriman.show', $n->data['pengiriman_id']),
                ]),
            'unread_count' => $request->user()->unreadNotifications()->count(),
        ]);
    }

    public function markRead(Request $request, string $id)
    {
        $request->user()->notifications()->findOrFail($id)->markAsRead();
        return response()->json(['ok' => true]);
    }

    public function markAllRead(Request $request)
    {
        $request->user()->unreadNotifications->markAsRead();
        return response()->json(['ok' => true]);
    }
}
