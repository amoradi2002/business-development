'use client';

import { useState, useEffect } from 'react';
import {
  UserPlus,
  Users,
  Kanban,
  TrendingUp,
  Eye,
} from 'lucide-react';
import {
  mockLeads,
  mockBrokerLeads,
  mockRealtorLeads,
  mockInvestorLeads,
} from '@/lib/mock-data';

type Lead = typeof mockLeads[number];
type BrokerLead = typeof mockBrokerLeads[number];
type RealtorLead = typeof mockRealtorLeads[number];

const statusColors: Record<string, string> = {
  New: 'bg-green-100 text-green-800',
  Contacted: 'bg-blue-100 text-blue-800',
  'Soft Pull Done': 'bg-yellow-100 text-yellow-800',
  Qualified: 'bg-purple-100 text-purple-800',
  'In Progress': 'bg-orange-100 text-orange-800',
  Approved: 'bg-emerald-100 text-emerald-800',
  Closed: 'bg-gray-100 text-gray-600',
  'Not Qualified': 'bg-red-100 text-red-800',
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[status] || 'bg-gray-100 text-gray-600'}`}>
      {status === 'New' && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
      )}
      {status}
    </span>
  );
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [brokerLeads, setBrokerLeads] = useState<BrokerLead[]>([]);
  const [realtorLeads, setRealtorLeads] = useState<RealtorLead[]>([]);
  const [investorLeads, setInvestorLeads] = useState<typeof mockInvestorLeads>([]);

  useEffect(() => {
    const storedLeads = localStorage.getItem('pcg_leads');
    if (storedLeads) {
      setLeads(JSON.parse(storedLeads));
    } else {
      setLeads(mockLeads);
      localStorage.setItem('pcg_leads', JSON.stringify(mockLeads));
    }

    const storedBroker = localStorage.getItem('pcg_broker_leads');
    if (storedBroker) {
      setBrokerLeads(JSON.parse(storedBroker));
    } else {
      setBrokerLeads(mockBrokerLeads);
      localStorage.setItem('pcg_broker_leads', JSON.stringify(mockBrokerLeads));
    }

    const storedRealtor = localStorage.getItem('pcg_realtor_leads');
    if (storedRealtor) {
      setRealtorLeads(JSON.parse(storedRealtor));
    } else {
      setRealtorLeads(mockRealtorLeads);
      localStorage.setItem('pcg_realtor_leads', JSON.stringify(mockRealtorLeads));
    }

    const storedInvestor = localStorage.getItem('pcg_investor_leads');
    if (storedInvestor) {
      setInvestorLeads(JSON.parse(storedInvestor));
    } else {
      setInvestorLeads(mockInvestorLeads);
      localStorage.setItem('pcg_investor_leads', JSON.stringify(mockInvestorLeads));
    }
  }, []);

  const newLeadsToday = leads.filter(
    (l) =>
      l.status === 'New' &&
      new Date(l.submittedAt).toDateString() === new Date().toDateString()
  ).length;

  const totalLeadsMonth = leads.filter((l) => {
    const d = new Date(l.submittedAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const activePipeline = leads.filter((l) => l.status !== 'Closed').length;
  const investorInquiries = investorLeads.length;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={UserPlus} label="New Leads Today" value={newLeadsToday} color="bg-green-500" />
        <StatCard icon={Users} label="Total Leads This Month" value={totalLeadsMonth} color="bg-blue-500" />
        <StatCard icon={Kanban} label="Active Pipeline" value={activePipeline} color="bg-orange-500" />
        <StatCard icon={TrendingUp} label="Investor Inquiries" value={investorInquiries} color="bg-purple-500" />
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Borrower Leads</h3>
          <a href="/admin/leads" className="text-sm text-[#2d7a2d] hover:underline font-medium">View All</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 font-semibold text-gray-600">Name</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Phone</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Loan Type</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Property Type</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Desired Amount</th>
                <th className="px-6 py-3 font-semibold text-gray-600">LTV%</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Monthly Pmt</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Submitted</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Status</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 font-medium text-gray-900">{lead.name}</td>
                  <td className="px-6 py-3 text-gray-600">{lead.phone}</td>
                  <td className="px-6 py-3 text-gray-600">{lead.loanType}</td>
                  <td className="px-6 py-3 text-gray-600">{lead.propertyType}</td>
                  <td className="px-6 py-3 text-gray-900 font-medium">{formatCurrency(lead.desiredAmount)}</td>
                  <td className="px-6 py-3 text-gray-600">{lead.ltv}%</td>
                  <td className="px-6 py-3 text-gray-600">{formatCurrency(lead.monthlyPayment)}</td>
                  <td className="px-6 py-3 text-gray-500">{relativeTime(lead.submittedAt)}</td>
                  <td className="px-6 py-3"><StatusBadge status={lead.status} /></td>
                  <td className="px-6 py-3">
                    <a href="/admin/leads" className="inline-flex items-center gap-1 text-[#2d7a2d] hover:underline font-medium text-xs">
                      <Eye className="w-3.5 h-3.5" /> View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Broker Leads */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Broker Leads</h3>
          <a href="/admin/leads" className="text-sm text-[#2d7a2d] hover:underline font-medium">View All</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 font-semibold text-gray-600">Broker</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Company</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Phone</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Loan Amount</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Purpose</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Submitted</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {brokerLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 font-medium text-gray-900">{lead.brokerName}</td>
                  <td className="px-6 py-3 text-gray-600">{lead.companyName}</td>
                  <td className="px-6 py-3 text-gray-600">{lead.phone}</td>
                  <td className="px-6 py-3 text-gray-900 font-medium">{formatCurrency(lead.loanAmount)}</td>
                  <td className="px-6 py-3 text-gray-600">{lead.loanPurpose}</td>
                  <td className="px-6 py-3 text-gray-500">{relativeTime(lead.submittedAt)}</td>
                  <td className="px-6 py-3"><StatusBadge status={lead.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Realtor Leads */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Realtor Leads</h3>
          <a href="/admin/leads" className="text-sm text-[#2d7a2d] hover:underline font-medium">View All</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 font-semibold text-gray-600">Realtor</th>
                <th className="px-6 py-3 font-semibold text-gray-600">License #</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Phone</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Loan Needed</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Property Value</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Submitted</th>
                <th className="px-6 py-3 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {realtorLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 font-medium text-gray-900">{lead.realtorName}</td>
                  <td className="px-6 py-3 text-gray-600">{lead.licenseNumber}</td>
                  <td className="px-6 py-3 text-gray-600">{lead.phone}</td>
                  <td className="px-6 py-3 text-gray-900 font-medium">{formatCurrency(lead.loanAmountNeeded)}</td>
                  <td className="px-6 py-3 text-gray-600">{formatCurrency(lead.estimatedValue)}</td>
                  <td className="px-6 py-3 text-gray-500">{relativeTime(lead.submittedAt)}</td>
                  <td className="px-6 py-3"><StatusBadge status={lead.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
