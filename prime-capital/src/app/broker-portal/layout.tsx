'use client';

import { useState, useEffect, ReactNode } from 'react';
import { Lock, Mail } from 'lucide-react';

function BrokerLoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'broker@pcg.com' && password === 'broker2024') {
      localStorage.setItem(
        'pcg_broker_auth',
        JSON.stringify({ email, loggedInAt: new Date().toISOString() })
      );
      onLogin();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2d7a2d] mb-4">
            <span className="text-white font-bold text-2xl">PCG</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Broker Portal</h1>
          <p className="text-gray-500 mt-1">Prime Capital Group, Inc.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
                placeholder="broker@pcg.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
                placeholder="Enter password"
              />
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-[#2d7a2d] text-white py-2.5 rounded-lg font-semibold hover:bg-[#246324] transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default function BrokerPortalLayout({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('pcg_broker_auth');
    if (auth) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('pcg_broker_auth');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#2d7a2d] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <BrokerLoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#2d7a2d] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <span className="text-white font-bold text-sm">PCG</span>
          </div>
          <h1 className="text-white font-bold text-lg">PCG Broker Portal</h1>
        </div>
        <button
          onClick={handleLogout}
          className="text-green-100 hover:text-white text-sm font-medium transition-colors"
        >
          Logout
        </button>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
