import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login: React.FC = () => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/admin/dashboard';

    // Simple PIN for now - In production, use env variable VITE_ADMIN_PIN
    const CORRECT_PIN = import.meta.env.VITE_ADMIN_PIN || '1234';

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === CORRECT_PIN) {
            localStorage.setItem('admin_auth', 'true');
            navigate(from, { replace: true });
        } else {
            setError('Invalid PIN');
            setPin('');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-950">
            <div className="w-full max-w-md p-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl">
                <div className="flex justify-center mb-8">
                    <div className="p-4 bg-slate-800 rounded-full">
                        <Lock className="w-8 h-8 text-blue-400" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center text-white mb-8">Admin Access</h2>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">
                            Security PIN
                        </label>
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-center tracking-[0.5em] text-xl"
                            placeholder="••••"
                            maxLength={4}
                            autoFocus
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-lg transition-all transform hover:scale-[1.02]"
                    >
                        Access Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
