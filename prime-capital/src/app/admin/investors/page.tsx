'use client';

import { useState, useEffect } from 'react';
import { PhoneCall, Mail, Calendar } from 'lucide-react';
import { mockInvestorLeads } from '@/lib/mock-data';

type InvestorLead = typeof mockInvestorLeads[number];

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const statusColors: Record<string, string> = {
  New: 'bg-green-100 text-green-800',
  Contacted: 'bg-blue-100 text-blue-800',
};

export default function InvestorsPage() {
  const [investors, setInvestors] = useState<InvestorLead[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('pcg_investor_leads');
    if (stored) {
      setInvestors(JSON.parse(stored));
    } else {
      setInvestors(mockInvestorLeads);
      localStorage.setItem('pcg_investor_leads', JSON.stringify(mockInvestorLeads));
    }
  }, []);

  const markContacted = (id: string) => {
    const next = investors.map((inv) =>
      inv.id === id ? { ...inv, status: 'Contacted', notes: inv.notes + `\n[Contacted ${new Date().toLocaleString()}]` } : inv
    );
    setInvestors(next);
    localStorage.setItem('pcg_investor_leads', JSON.stringify(next));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Investor Inquiries</h2>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 font-semibold text-gray-600">Name</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Email</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Subscribed to Future Deals</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Date Submitted</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Status</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {investors.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{inv.name}</td>
                  <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" /> {inv.email}
                  </td>
                  <td className="px-6 py-4">
                    {inv.subscribeToDeals ? (
                      <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Yes</span>
                    ) : (
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-semibold">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" /> {relativeTime(inv.submittedAt)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[inv.status] || 'bg-gray-100 text-gray-600'}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {inv.status !== 'Contacted' ? (
                      <button
                        onClick={() => markContacted(inv.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2d7a2d] text-white text-xs font-semibold hover:bg-[#246324] transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5" /> Mark as Contacted
                      </button>
                    ) : (
                      <span className="text-sm text-gray-400">Contacted</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {investors.length === 0 && (
          <div className="py-12 text-center text-gray-500">No investor inquiries yet.</div>
        )}
      </div>
    </div>
  );
}
