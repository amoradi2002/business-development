'use client';

import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  TrendingUp,
  FileText,
  UserCircle,
  LogOut,
  Bell,
  Lock,
  Mail,
  Menu,
  X,
} from 'lucide-react';

const DEMO_ACCOUNTS: Record<string, { password: string; name: string }> = {
  'investor1@pcg.com': { password: 'invest2024', name: 'Richard Amato' },
  'investor2@pcg.com': { password: 'invest2024', name: 'Patricia Delgado' },
};

const navItems = [
  { label: 'Dashboard', href: '/investor-portal', icon: LayoutDashboard },
  { label: 'My Investments', href: '/investor-portal/investments', icon: Briefcase },
  { label: 'Available Deals', href: '/investor-portal/deals', icon: TrendingUp },
  { label: 'Documents', href: '/investor-portal/documents', icon: FileText },
  { label: 'Profile', href: '/investor-portal/profile', icon: UserCircle },
];

function LoginPage({ onLogin }: { onLogin: (name: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const account = DEMO_ACCOUNTS[email.toLowerCase()];
    if (account && account.password === password) {
      const investorName = account.name;
      localStorage.setItem(
        'pcg_investor_auth',
        JSON.stringify({ email, name: investorName, loggedInAt: new Date().toISOString() })
      );
      localStorage.setItem('pcg_investor_name', investorName);
      onLogin(investorName);
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
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            Investor Portal
          </h1>
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
                placeholder="investor@pcg.com"
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
        <p className="text-xs text-gray-400 text-center mt-6">
          Secure investor access only. Contact your advisor for credentials.
        </p>
      </div>
    </div>
  );
}

export default function InvestorPortalLayout({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [investorName, setInvestorName] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const auth = localStorage.getItem('pcg_investor_auth');
    if (auth) {
      try {
        const parsed = JSON.parse(auth);
        setIsAuthenticated(true);
        setInvestorName(parsed.name || 'Investor');
      } catch {
        setIsAuthenticated(false);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('pcg_investor_auth');
    localStorage.removeItem('pcg_investor_name');
    setIsAuthenticated(false);
    setInvestorName('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#2d7a2d] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginPage
        onLogin={(name) => {
          setInvestorName(name);
          setIsAuthenticated(true);
        }}
      />
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[#2d7a2d] flex flex-col flex-shrink-0 transform transition-transform duration-200 ease-in-out
          md:relative md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="px-6 py-6 border-b border-white/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-lg">PCG</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">Investor Portal</h2>
              <p className="text-green-200 text-xs">Prime Capital Group</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 rounded-lg hover:bg-white/10 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              item.href === '/investor-portal'
                ? pathname === '/investor-portal'
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-green-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-green-100 hover:bg-white/10 hover:text-white transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">
              Welcome, {investorName.split(' ')[0]}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
