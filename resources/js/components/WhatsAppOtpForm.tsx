// resources/js/Components/WhatsAppOtpForm.jsx
import { useState } from 'react';
import axios from 'axios';

export default function WhatsAppOtpForm() {
    const [step, setStep] = useState('phone'); // 'phone' | 'otp'
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.post('/auth/otp/send', { phone });
            setStep('otp');
        } catch (err) {
            setError(err.response?.data?.error || 'Gagal mengirim OTP.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('/auth/otp/verify', { phone, otp });
            window.location.href = res.data.redirect;
        } catch (err) {
            setError(err.response?.data?.error || 'OTP tidak valid.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4 border-t pt-4">
            <p className="text-sm text-gray-600 mb-2 font-medium">
                Masuk via WhatsApp OTP
            </p>

            {step === 'phone' ? (
                <form onSubmit={handleSendOtp} className="space-y-3">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                        <span className="bg-gray-100 px-3 py-2 text-sm text-gray-500 border-r">
                            +62
                        </span>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="8123456789"
                            className="flex-1 px-3 py-2 text-sm outline-none"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-500 hover:bg-green-600 text-white text-sm py-2 rounded-lg transition"
                    >
                        {loading ? 'Mengirim...' : '📲 Kirim OTP ke WhatsApp'}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-3">
                    <p className="text-xs text-gray-500">
                        OTP dikirim ke WhatsApp <strong>+62{phone}</strong>
                    </p>
                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Masukkan 6 digit OTP"
                        className="w-full border rounded-lg px-3 py-2 text-sm tracking-widest text-center outline-none"
                        required
                    />
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition"
                    >
                        {loading ? 'Memverifikasi...' : 'Verifikasi OTP'}
                    </button>
                    <button
                        type="button"
                        onClick={() => { setStep('phone'); setOtp(''); setError(''); }}
                        className="w-full text-xs text-gray-400 hover:text-gray-600"
                    >
                        Ganti nomor
                    </button>
                </form>
            )}
        </div>
    );
}