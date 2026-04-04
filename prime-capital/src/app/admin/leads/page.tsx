'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  X,
  Phone,
  Mail,
  MapPin,
  Save,
  PhoneCall,
  FileDown,
} from 'lucide-react';
import { exportLeadToPDF } from '@/lib/export-pdf';
import {
  mockLeads,
  mockBrokerLeads,
  mockRealtorLeads,
  mockInvestorLeads,
} from '@/lib/mock-data';

type Lead = typeof mockLeads[number];
type BrokerLead = typeof mockBrokerLeads[number];
type RealtorLead = typeof mockRealtorLeads[number];
type InvestorLead = typeof mockInvestorLeads[number];

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

const allStatuses = ['New', 'Contacted', 'Soft Pull Done', 'Qualified', 'Not Qualified', 'In Progress', 'Approved', 'Closed'];

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

/* ---- Borrower Drawer ---- */
function BorrowerDrawer({
  lead,
  onClose,
  onSave,
}: {
  lead: Lead;
  onClose: () => void;
  onSave: (updated: Lead) => void;
}) {
  const [notes, setNotes] = useState(lead.notes);
  const [status, setStatus] = useState(lead.status);

  const handleMarkCalled = () => {
    const stamp = `[Called ${new Date().toLocaleString()}]`;
    setNotes((prev) => (prev ? prev + '\n' + stamp : stamp));
  };

  const handleSave = () => {
    onSave({ ...lead, notes, status });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white shadow-2xl overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h3 className="text-lg font-bold text-gray-900">{lead.name}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-6">
          {/* Contact */}
          <section>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Contact Info</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-700"><Phone className="w-4 h-4 text-gray-400" />{lead.phone}</div>
              <div className="flex items-center gap-2 text-gray-700"><Mail className="w-4 h-4 text-gray-400" />{lead.email}</div>
              <div className="flex items-center gap-2 text-gray-700"><MapPin className="w-4 h-4 text-gray-400" />{lead.propertyAddress}</div>
            </div>
          </section>

          {/* Calculator Snapshot */}
          <section>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Loan Details</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs">Loan Type</p>
                <p className="font-semibold text-gray-900">{lead.loanType}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs">Property Type</p>
                <p className="font-semibold text-gray-900">{lead.propertyType}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs">Property Value</p>
                <p className="font-semibold text-gray-900">{formatCurrency(lead.propertyValue)}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs">Desired Amount</p>
                <p className="font-semibold text-green-700">{formatCurrency(lead.desiredAmount)}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs">LTV</p>
                <p className="font-semibold text-gray-900">{lead.ltv}%</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs">Interest Rate</p>
                <p className="font-semibold text-gray-900">{lead.interestRate}%</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs">Monthly Payment</p>
                <p className="font-semibold text-gray-900">{formatCurrency(lead.monthlyPayment)}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs">Loan Term</p>
                <p className="font-semibold text-gray-900">{lead.loanTerm}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs">Loan Balance</p>
                <p className="font-semibold text-gray-900">{formatCurrency(lead.loanBalance)}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs">Monthly Income</p>
                <p className="font-semibold text-gray-900">{formatCurrency(lead.income)}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs">Co-Borrower</p>
                <p className="font-semibold text-gray-900">{lead.coBorrower}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs">Loan Purpose</p>
                <p className="font-semibold text-gray-900">{lead.loanPurpose}</p>
              </div>
            </div>
          </section>

          {/* Status */}
          <section>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Status</h4>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
            >
              {allStatuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </section>

          {/* Notes */}
          <section>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Internal Notes</h4>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none resize-none"
              placeholder="Add internal notes..."
            />
          </section>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleMarkCalled}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <PhoneCall className="w-4 h-4" /> Mark as Called
            </button>
            <button
              onClick={() => exportLeadToPDF({ ...lead, notes, status })}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FileDown className="w-4 h-4" /> Export PDF
            </button>
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#2d7a2d] text-white text-sm font-semibold hover:bg-[#246324] transition-colors"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Broker Drawer ---- */
function BrokerDrawer({
  lead,
  onClose,
  onSave,
}: {
  lead: BrokerLead;
  onClose: () => void;
  onSave: (updated: BrokerLead) => void;
}) {
  const [notes, setNotes] = useState(lead.notes);
  const [status, setStatus] = useState(lead.status);

  const handleMarkCalled = () => {
    const stamp = `[Called ${new Date().toLocaleString()}]`;
    setNotes((prev) => (prev ? prev + '\n' + stamp : stamp));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white shadow-2xl overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h3 className="text-lg font-bold text-gray-900">{lead.brokerName}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-6">
          <section>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Contact</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700"><span className="text-gray-500">Company:</span> {lead.companyName}</p>
              <div className="flex items-center gap-2 text-gray-700"><Phone className="w-4 h-4 text-gray-400" />{lead.phone}</div>
              <div className="flex items-center gap-2 text-gray-700"><Mail className="w-4 h-4 text-gray-400" />{lead.email}</div>
              <div className="flex items-center gap-2 text-gray-700"><MapPin className="w-4 h-4 text-gray-400" />{lead.propertyAddress}</div>
            </div>
          </section>
          <section>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Scenario</h4>
            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{lead.borrowerScenario}</p>
            <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg"><p className="text-gray-500 text-xs">Loan Amount</p><p className="font-semibold text-green-700">{formatCurrency(lead.loanAmount)}</p></div>
              <div className="bg-gray-50 p-3 rounded-lg"><p className="text-gray-500 text-xs">Property Value</p><p className="font-semibold text-gray-900">{formatCurrency(lead.propertyValue)}</p></div>
              <div className="bg-gray-50 p-3 rounded-lg"><p className="text-gray-500 text-xs">Purpose</p><p className="font-semibold text-gray-900">{lead.loanPurpose}</p></div>
            </div>
          </section>
          <section>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Status</h4>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none">
              {allStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </section>
          <section>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Internal Notes</h4>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={5} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none resize-none" placeholder="Add internal notes..." />
          </section>
          <div className="flex gap-3">
            <button onClick={handleMarkCalled} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <PhoneCall className="w-4 h-4" /> Mark as Called
            </button>
            <button onClick={() => onSave({ ...lead, notes, status })} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#2d7a2d] text-white text-sm font-semibold hover:bg-[#246324] transition-colors">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Realtor Drawer ---- */
function RealtorDrawer({
  lead,
  onClose,
  onSave,
}: {
  lead: RealtorLead;
  onClose: () => void;
  onSave: (updated: RealtorLead) => void;
}) {
  const [notes, setNotes] = useState(lead.notes);
  const [status, setStatus] = useState(lead.status);

  const handleMarkCalled = () => {
    const stamp = `[Called ${new Date().toLocaleString()}]`;
    setNotes((prev) => (prev ? prev + '\n' + stamp : stamp));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white shadow-2xl overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h3 className="text-lg font-bold text-gray-900">{lead.realtorName}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-6">
          <section>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Contact</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700"><span className="text-gray-500">License:</span> {lead.licenseNumber}</p>
              <div className="flex items-center gap-2 text-gray-700"><Phone className="w-4 h-4 text-gray-400" />{lead.phone}</div>
              <div className="flex items-center gap-2 text-gray-700"><Mail className="w-4 h-4 text-gray-400" />{lead.email}</div>
              <div className="flex items-center gap-2 text-gray-700"><MapPin className="w-4 h-4 text-gray-400" />{lead.propertyAddress}</div>
            </div>
          </section>
          <section>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Client Scenario</h4>
            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{lead.clientScenario}</p>
            <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg"><p className="text-gray-500 text-xs">Loan Needed</p><p className="font-semibold text-green-700">{formatCurrency(lead.loanAmountNeeded)}</p></div>
              <div className="bg-gray-50 p-3 rounded-lg"><p className="text-gray-500 text-xs">Estimated Value</p><p className="font-semibold text-gray-900">{formatCurrency(lead.estimatedValue)}</p></div>
            </div>
          </section>
          <section>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Status</h4>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none">
              {allStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </section>
          <section>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Internal Notes</h4>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={5} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none resize-none" placeholder="Add internal notes..." />
          </section>
          <div className="flex gap-3">
            <button onClick={handleMarkCalled} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <PhoneCall className="w-4 h-4" /> Mark as Called
            </button>
            <button onClick={() => onSave({ ...lead, notes, status })} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#2d7a2d] text-white text-sm font-semibold hover:bg-[#246324] transition-colors">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Investor Drawer ---- */
function InvestorDrawer({
  lead,
  onClose,
  onSave,
}: {
  lead: InvestorLead;
  onClose: () => void;
  onSave: (updated: InvestorLead) => void;
}) {
  const [notes, setNotes] = useState(lead.notes);
  const [status, setStatus] = useState(lead.status);

  const handleMarkCalled = () => {
    const stamp = `[Called ${new Date().toLocaleString()}]`;
    setNotes((prev) => (prev ? prev + '\n' + stamp : stamp));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white shadow-2xl overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h3 className="text-lg font-bold text-gray-900">{lead.name}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-6">
          <section>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Contact</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-700"><Mail className="w-4 h-4 text-gray-400" />{lead.email}</div>
              <p className="text-gray-700">Subscribed: {lead.subscribeToDeals ? 'Yes' : 'No'}</p>
            </div>
          </section>
          <section>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Status</h4>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none">
              {allStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </section>
          <section>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Internal Notes</h4>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={5} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none resize-none" placeholder="Add internal notes..." />
          </section>
          <div className="flex gap-3">
            <button onClick={handleMarkCalled} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <PhoneCall className="w-4 h-4" /> Mark as Called
            </button>
            <button onClick={() => onSave({ ...lead, notes, status })} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#2d7a2d] text-white text-sm font-semibold hover:bg-[#246324] transition-colors">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- MAIN PAGE ---- */
export default function LeadsPage() {
  const [activeTab, setActiveTab] = useState<'borrower' | 'broker' | 'realtor' | 'investor'>('borrower');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [brokerLeads, setBrokerLeads] = useState<BrokerLead[]>([]);
  const [realtorLeads, setRealtorLeads] = useState<RealtorLead[]>([]);
  const [investorLeads, setInvestorLeads] = useState<InvestorLead[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loanTypeFilter, setLoanTypeFilter] = useState('All');
  const [selectedBorrower, setSelectedBorrower] = useState<Lead | null>(null);
  const [selectedBroker, setSelectedBroker] = useState<BrokerLead | null>(null);
  const [selectedRealtor, setSelectedRealtor] = useState<RealtorLead | null>(null);
  const [selectedInvestor, setSelectedInvestor] = useState<InvestorLead | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('pcg_leads');
    setLeads(stored ? JSON.parse(stored) : mockLeads);
    const storedB = localStorage.getItem('pcg_broker_leads');
    setBrokerLeads(storedB ? JSON.parse(storedB) : mockBrokerLeads);
    const storedR = localStorage.getItem('pcg_realtor_leads');
    setRealtorLeads(storedR ? JSON.parse(storedR) : mockRealtorLeads);
    const storedI = localStorage.getItem('pcg_investor_leads');
    setInvestorLeads(storedI ? JSON.parse(storedI) : mockInvestorLeads);
  }, []);

  // Save helpers
  const saveBorrower = (updated: Lead) => {
    const next = leads.map((l) => (l.id === updated.id ? updated : l));
    setLeads(next);
    localStorage.setItem('pcg_leads', JSON.stringify(next));
    setSelectedBorrower(null);
  };
  const saveBroker = (updated: BrokerLead) => {
    const next = brokerLeads.map((l) => (l.id === updated.id ? updated : l));
    setBrokerLeads(next);
    localStorage.setItem('pcg_broker_leads', JSON.stringify(next));
    setSelectedBroker(null);
  };
  const saveRealtor = (updated: RealtorLead) => {
    const next = realtorLeads.map((l) => (l.id === updated.id ? updated : l));
    setRealtorLeads(next);
    localStorage.setItem('pcg_realtor_leads', JSON.stringify(next));
    setSelectedRealtor(null);
  };
  const saveInvestor = (updated: InvestorLead) => {
    const next = investorLeads.map((l) => (l.id === updated.id ? updated : l));
    setInvestorLeads(next);
    localStorage.setItem('pcg_investor_leads', JSON.stringify(next));
    setSelectedInvestor(null);
  };

  // Filters
  const loanTypes = ['All', ...Array.from(new Set(leads.map((l) => l.loanType)))];

  const filteredLeads = leads.filter((l) => {
    if (search && !l.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'All' && l.status !== statusFilter) return false;
    if (loanTypeFilter !== 'All' && l.loanType !== loanTypeFilter) return false;
    return true;
  });

  const filteredBrokers = brokerLeads.filter((l) => {
    if (search && !l.brokerName.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'All' && l.status !== statusFilter) return false;
    return true;
  });

  const filteredRealtors = realtorLeads.filter((l) => {
    if (search && !l.realtorName.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'All' && l.status !== statusFilter) return false;
    return true;
  });

  const filteredInvestors = investorLeads.filter((l) => {
    if (search && !l.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'All' && l.status !== statusFilter) return false;
    return true;
  });

  const tabs = [
    { key: 'borrower' as const, label: 'Borrower Leads', count: leads.length },
    { key: 'broker' as const, label: 'Broker Leads', count: brokerLeads.length },
    { key: 'realtor' as const, label: 'Realtor Leads', count: realtorLeads.length },
    { key: 'investor' as const, label: 'Investor Inquiries', count: investorLeads.length },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Leads Management</h2>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setSearch(''); setStatusFilter('All'); setLoanTypeFilter('All'); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label} <span className="ml-1 text-xs bg-gray-200 px-1.5 py-0.5 rounded-full">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
          />
        </div>
        {activeTab === 'borrower' && (
          <select
            value={loanTypeFilter}
            onChange={(e) => setLoanTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
          >
            {loanTypes.map((t) => <option key={t} value={t}>{t === 'All' ? 'All Loan Types' : t}</option>)}
          </select>
        )}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
        >
          <option value="All">All Statuses</option>
          {allStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          {activeTab === 'borrower' && (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 font-semibold text-gray-600">Name</th>
                  <th className="px-6 py-3 font-semibold text-gray-600">Phone</th>
                  <th className="px-6 py-3 font-semibold text-gray-600">Loan Type</th>
                  <th className="px-6 py-3 font-semibold text-gray-600">Desired Amount</th>
                  <th className="px-6 py-3 font-semibold text-gray-600">LTV%</th>
                  <th className="px-6 py-3 font-semibold text-gray-600">Submitted</th>
                  <th className="px-6 py-3 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedBorrower(lead)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-3 font-medium text-gray-900">{lead.name}</td>
                    <td className="px-6 py-3 text-gray-600">{lead.phone}</td>
                    <td className="px-6 py-3 text-gray-600">{lead.loanType}</td>
                    <td className="px-6 py-3 text-gray-900 font-medium">{formatCurrency(lead.desiredAmount)}</td>
                    <td className="px-6 py-3 text-gray-600">{lead.ltv}%</td>
                    <td className="px-6 py-3 text-gray-500">{relativeTime(lead.submittedAt)}</td>
                    <td className="px-6 py-3"><StatusBadge status={lead.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'broker' && (
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
                {filteredBrokers.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedBroker(lead)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
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
          )}

          {activeTab === 'realtor' && (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 font-semibold text-gray-600">Realtor</th>
                  <th className="px-6 py-3 font-semibold text-gray-600">License #</th>
                  <th className="px-6 py-3 font-semibold text-gray-600">Phone</th>
                  <th className="px-6 py-3 font-semibold text-gray-600">Loan Needed</th>
                  <th className="px-6 py-3 font-semibold text-gray-600">Est. Value</th>
                  <th className="px-6 py-3 font-semibold text-gray-600">Submitted</th>
                  <th className="px-6 py-3 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRealtors.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedRealtor(lead)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
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
          )}

          {activeTab === 'investor' && (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 font-semibold text-gray-600">Name</th>
                  <th className="px-6 py-3 font-semibold text-gray-600">Email</th>
                  <th className="px-6 py-3 font-semibold text-gray-600">Subscribed</th>
                  <th className="px-6 py-3 font-semibold text-gray-600">Submitted</th>
                  <th className="px-6 py-3 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredInvestors.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedInvestor(lead)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-3 font-medium text-gray-900">{lead.name}</td>
                    <td className="px-6 py-3 text-gray-600">{lead.email}</td>
                    <td className="px-6 py-3">
                      {lead.subscribeToDeals ? (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Yes</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs font-semibold">No</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-gray-500">{relativeTime(lead.submittedAt)}</td>
                    <td className="px-6 py-3"><StatusBadge status={lead.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Empty states */}
        {activeTab === 'borrower' && filteredLeads.length === 0 && (
          <div className="py-12 text-center text-gray-500">No leads match your filters.</div>
        )}
        {activeTab === 'broker' && filteredBrokers.length === 0 && (
          <div className="py-12 text-center text-gray-500">No broker leads match your filters.</div>
        )}
        {activeTab === 'realtor' && filteredRealtors.length === 0 && (
          <div className="py-12 text-center text-gray-500">No realtor leads match your filters.</div>
        )}
        {activeTab === 'investor' && filteredInvestors.length === 0 && (
          <div className="py-12 text-center text-gray-500">No investor inquiries match your filters.</div>
        )}
      </div>

      {/* Drawers */}
      {selectedBorrower && <BorrowerDrawer lead={selectedBorrower} onClose={() => setSelectedBorrower(null)} onSave={saveBorrower} />}
      {selectedBroker && <BrokerDrawer lead={selectedBroker} onClose={() => setSelectedBroker(null)} onSave={saveBroker} />}
      {selectedRealtor && <RealtorDrawer lead={selectedRealtor} onClose={() => setSelectedRealtor(null)} onSave={saveRealtor} />}
      {selectedInvestor && <InvestorDrawer lead={selectedInvestor} onClose={() => setSelectedInvestor(null)} onSave={saveInvestor} />}
    </div>
  );
}
