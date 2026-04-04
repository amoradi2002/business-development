'use client';

import { useState, useEffect } from 'react';
import { UserCircle, Mail, Phone, DollarSign, TrendingUp, Bell, Save, CheckCircle } from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  preferences: {
    sfr: boolean;
    multifamily: boolean;
    commercial: boolean;
    rawLand: boolean;
  };
  minInvestment: string;
  yieldMin: string;
  yieldMax: string;
  notifications: {
    newDeals: boolean;
    monthlyStatement: boolean;
  };
}

const defaultProfile: ProfileData = {
  name: '',
  email: '',
  phone: '(818) 555-0100',
  preferences: {
    sfr: true,
    multifamily: true,
    commercial: false,
    rawLand: false,
  },
  minInvestment: '100000',
  yieldMin: '7',
  yieldMax: '12',
  notifications: {
    newDeals: true,
    monthlyStatement: true,
  },
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load from auth
    const auth = localStorage.getItem('pcg_investor_auth');
    if (auth) {
      try {
        const parsed = JSON.parse(auth);
        setProfile((prev) => ({
          ...prev,
          name: parsed.name || '',
          email: parsed.email || '',
        }));
      } catch {
        // ignore
      }
    }
    // Load saved profile
    const savedProfile = localStorage.getItem('pcg_investor_profile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfile((prev) => ({ ...prev, ...parsed }));
      } catch {
        // ignore
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('pcg_investor_profile', JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1
          className="text-2xl font-bold text-gray-900"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Profile Settings
        </h1>
        <p className="text-gray-500 text-sm mt-1">Manage your investor profile and preferences</p>
      </div>

      {/* Toast */}
      {saved && (
        <div className="fixed top-6 right-6 z-50 bg-[#2d7a2d] text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Profile saved successfully</span>
        </div>
      )}

      {/* Personal Information */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <UserCircle className="w-5 h-5 text-[#3d9b3d]" />
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Investment Preferences */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#3d9b3d]" />
          Investment Preferences
        </h2>

        {/* Property Types */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Property Types</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { key: 'sfr' as const, label: 'SFR' },
              { key: 'multifamily' as const, label: 'Multifamily' },
              { key: 'commercial' as const, label: 'Commercial' },
              { key: 'rawLand' as const, label: 'Raw Land' },
            ].map((pref) => (
              <label
                key={pref.key}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                  profile.preferences[pref.key]
                    ? 'border-[#3d9b3d] bg-green-50 text-green-800'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={profile.preferences[pref.key]}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      preferences: { ...profile.preferences, [pref.key]: e.target.checked },
                    })
                  }
                  className="rounded border-gray-300 text-[#3d9b3d] focus:ring-[#3d9b3d]"
                />
                <span className="text-sm font-medium">{pref.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Min Investment */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Investment Amount</label>
          <div className="relative max-w-xs">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              value={profile.minInvestment}
              onChange={(e) => setProfile({ ...profile, minInvestment: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
              placeholder="100000"
            />
          </div>
        </div>

        {/* Yield Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Yield Range</label>
          <div className="flex items-center gap-3 max-w-xs">
            <div className="relative flex-1">
              <input
                type="number"
                value={profile.yieldMin}
                onChange={(e) => setProfile({ ...profile, yieldMin: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
                placeholder="7"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">%</span>
            </div>
            <span className="text-gray-400 text-sm">to</span>
            <div className="relative flex-1">
              <input
                type="number"
                value={profile.yieldMax}
                onChange={(e) => setProfile({ ...profile, yieldMax: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
                placeholder="12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#3d9b3d]" />
          Notification Preferences
        </h2>
        <div className="space-y-4">
          {/* New Deals Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">Email for new deals</p>
              <p className="text-xs text-gray-500">Get notified when new investment opportunities are available</p>
            </div>
            <button
              onClick={() =>
                setProfile({
                  ...profile,
                  notifications: {
                    ...profile.notifications,
                    newDeals: !profile.notifications.newDeals,
                  },
                })
              }
              className={`relative w-11 h-6 rounded-full transition-colors ${
                profile.notifications.newDeals ? 'bg-[#3d9b3d]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  profile.notifications.newDeals ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Monthly Statement Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">Monthly statement</p>
              <p className="text-xs text-gray-500">Receive a monthly summary of your portfolio performance</p>
            </div>
            <button
              onClick={() =>
                setProfile({
                  ...profile,
                  notifications: {
                    ...profile.notifications,
                    monthlyStatement: !profile.notifications.monthlyStatement,
                  },
                })
              }
              className={`relative w-11 h-6 rounded-full transition-colors ${
                profile.notifications.monthlyStatement ? 'bg-[#3d9b3d]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  profile.notifications.monthlyStatement ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#2d7a2d] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#246324] transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Profile
        </button>
      </div>
    </div>
  );
}
