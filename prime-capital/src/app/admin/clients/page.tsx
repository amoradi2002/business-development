'use client';
import { useState, useEffect } from 'react';
import { Users, DollarSign, Calendar, ChevronRight, ArrowLeft } from 'lucide-react';
import { mockLeads } from '@/lib/mock-data';

type Lead = typeof mockLeads[number];

interface ClientData {
  name: string;
  deals: Lead[];
  activeDeals: number;
  totalVolume: number;
  lastContact: string;
}

export default function ClientsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('pcg_leads') || 'null') || mockLeads;
    setLeads(saved);
  }, []);

  const clients = leads.filter(l => !['New', 'Contacted'].includes(l.status));
  const grouped = clients.reduce((acc: Record<string, Lead[]>, lead) => {
    const key = lead.name || lead.email;
    if (!acc[key]) acc[key] = [];
    acc[key].push(lead);
    return acc;
  }, {});

  const clientList: ClientData[] = Object.entries(grouped).map(([name, deals]) => ({
    name,
    deals,
    activeDeals: deals.filter((d) => d.status !== 'Closed').length,
    totalVolume: deals.reduce((sum, d) => sum + (d.desiredAmount || 0), 0),
    lastContact: deals.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())[0]?.submittedAt
  }));

  if (selectedClient) {
    return (
      <div className="space-y-6">
        <button onClick={() => setSelectedClient(null)} className="flex items-center gap-2 text-sm text-[#3d9b3d] font-semibold hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Clients
        </button>
        <h1 className="text-2xl font-bold text-[#1a1a1a]">{selectedClient.name}</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Active Deals</p>
            <p className="text-2xl font-bold text-[#2d7a2d]">{selectedClient.activeDeals}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Total Volume</p>
            <p className="text-2xl font-bold text-[#1a1a1a]">${selectedClient.totalVolume.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Last Contact</p>
            <p className="text-sm font-semibold text-gray-700">{new Date(selectedClient.lastContact).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100"><h3 className="font-bold text-[#1a1a1a]">Deal History</h3></div>
          <table className="w-full text-sm">
            <thead className="bg-[#f7f7f7]">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Loan Type</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Property</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Amount</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">LTV</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {selectedClient.deals.map((deal, i) => (
                <tr key={i} className="border-t border-gray-50">
                  <td className="px-4 py-3 font-semibold">{deal.loanType}</td>
                  <td className="px-4 py-3 text-gray-600">{deal.propertyType}</td>
                  <td className="px-4 py-3 font-semibold">${(deal.desiredAmount || 0).toLocaleString()}</td>
                  <td className="px-4 py-3">{deal.ltv}%</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">{deal.status}</span></td>
                  <td className="px-4 py-3 text-gray-500">{new Date(deal.submittedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1a1a1a]">Clients</h1>
      <p className="text-sm text-gray-500">Leads that have progressed past initial contact.</p>

      {clientList.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No clients yet. Move leads past &quot;Contacted&quot; status to see them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clientList.map((client, i) => (
            <div key={i} onClick={() => setSelectedClient(client)}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-[#1a1a1a]">{client.name}</h3>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600"><Users className="w-3.5 h-3.5 text-[#3d9b3d]" /> {client.activeDeals} active deal{client.activeDeals !== 1 ? 's' : ''}</div>
                <div className="flex items-center gap-2 text-gray-600"><DollarSign className="w-3.5 h-3.5 text-[#3d9b3d]" /> ${client.totalVolume.toLocaleString()} total volume</div>
                <div className="flex items-center gap-2 text-gray-600"><Calendar className="w-3.5 h-3.5 text-[#3d9b3d]" /> Last: {new Date(client.lastContact).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
