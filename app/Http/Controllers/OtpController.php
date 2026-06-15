<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class OtpController extends Controller
{
    // Kirim OTP via Fonnte
    public function sendOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|string|min:9|max:13',
        ]);

        $phone = $this->formatPhone($request->phone);
        $otp   = rand(100000, 999999); // 6 digit

        // Simpan OTP di cache, expire 5 menit
        Cache::put("otp_{$phone}", $otp, now()->addMinutes(5));

        // Kirim via Fonnte
        $response = \Http::withHeaders([
            'Authorization' => env('FONNTE_TOKEN'),
        ])->post('https://api.fonnte.com/send', [
            'target'  => $phone,
            'message' => "Kode OTP Anda: *{$otp}*\n\nJangan berikan kode ini kepada siapapun. Berlaku 5 menit.",
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Gagal mengirim OTP. Coba lagi.'], 500);
        }

        return response()->json(['message' => 'OTP berhasil dikirim ke WhatsApp Anda.']);
    }

    // Verifikasi OTP
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'otp'   => 'required|digits:6',
        ]);

        $phone      = $this->formatPhone($request->phone);
        $cachedOtp  = Cache::get("otp_{$phone}");

        if (!$cachedOtp || $cachedOtp != $request->otp) {
            return response()->json(['error' => 'OTP tidak valid atau sudah kadaluarsa.'], 422);
        }

        // Hapus OTP setelah berhasil
        Cache::forget("otp_{$phone}");

        // Login atau register user
        $user = User::firstOrCreate(
            ['phone' => $phone],
            [
                'name'              => 'User ' . substr($phone, -4),
                'email_verified_at' => now(),
            ]
        );

        Auth::login($user, true);

        return response()->json([
            'message'  => 'Login berhasil.',
            'redirect' => route('dashboard'),
        ]);
    }

    // Format nomor ke format internasional
    private function formatPhone(string $phone): string
    {
        $phone = preg_replace('/\D/', '', $phone); // hapus non-angka

        if (str_starts_with($phone, '0')) {
            $phone = '62' . substr($phone, 1);
        } elseif (!str_starts_with($phone, '62')) {
            $phone = '62' . $phone;
        }

        return $phone;
    }
}
