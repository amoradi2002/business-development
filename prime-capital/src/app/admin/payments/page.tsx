'use client';
import { useState, useEffect } from 'react';
import { DollarSign, Plus, Search, CheckCircle, Clock, AlertTriangle, X, CreditCard, TrendingUp, Users } from 'lucide-react';

interface Payment {
  id: string; clientName: string; loanType: string; amount: number;
  dueDate: string; paidDate: string | null; status: 'Paid' | 'Pending' | 'Overdue' | 'Partial';
  method: string; note: string; invoiceNumber: string;
}

const mockPayments: Payment[] = [
  { id: 'p1', clientName: 'Marcus Johnson', loanType: 'Hard Money Bridge', amount: 5206, dueDate: '2026-04-01', paidDate: '2026-03-30', status: 'Paid', method: 'Wire Transfer', note: '', invoiceNumber: 'INV-2026-001' },
  { id: 'p2', clientName: 'Sandra Chen', loanType: 'Cash-Out Refinance', amount: 1050, dueDate: '2026-04-01', paidDate: null, status: 'Pending', method: '', note: '', invoiceNumber: 'INV-2026-002' },
  { id: 'p3', clientName: 'Lisa Park', loanType: 'HELOC', amount: 5195, dueDate: '2026-04-01', paidDate: '2026-04-01', status: 'Paid', method: 'ACH', note: '', invoiceNumber: 'INV-2026-003' },
  { id: 'p4', clientName: 'David Orozco', loanType: 'Construction Loan', amount: 19567, dueDate: '2026-04-01', paidDate: null, status: 'Overdue', method: '', note: 'Called twice, no response', invoiceNumber: 'INV-2026-004' },
  { id: 'p5', clientName: 'James Whitfield', loanType: 'Second Mortgage', amount: 3760, dueDate: '2026-04-01', paidDate: '2026-04-02', status: 'Paid', method: 'Check', note: 'Paid 1 day late', invoiceNumber: 'INV-2026-005' },
  { id: 'p6', clientName: 'Maria Gonzalez', loanType: 'Hard Money Bridge', amount: 17063, dueDate: '2026-04-01', paidDate: null, status: 'Pending', method: '', note: 'Expecting wire by 4/5', invoiceNumber: 'INV-2026-006' },
  { id: 'p7', clientName: 'Thomas Richards', loanType: 'Cash-Out Refinance', amount: 10501, dueDate: '2026-04-01', paidDate: '2026-03-28', status: 'Paid', method: 'Wire Transfer', note: 'Always pays early', invoiceNumber: 'INV-2026-007' },
  { id: 'p8', clientName: 'Robert Petrosyan', loanType: 'Rehab Loan', amount: 7475, dueDate: '2026-04-01', paidDate: null, status: 'Partial', method: 'ACH', note: 'Paid $4,000, balance $3,475 remaining', invoiceNumber: 'INV-2026-008' },
  { id: 'p9', clientName: 'Anahit Grigoryan', loanType: 'Purchase', amount: 13067, dueDate: '2026-04-15', paidDate: null, status: 'Pending', method: '', note: '', invoiceNumber: 'INV-2026-009' },
  { id: 'p10', clientName: 'Kevin Nguyen', loanType: 'Rehab Loan', amount: 4672, dueDate: '2026-04-15', paidDate: null, status: 'Pending', method: '', note: '', invoiceNumber: 'INV-2026-010' },
];

const statusConfig: Record<string, { bg: string; text: string; icon: any }> = {
  'Paid': { bg: 'bg-emerald-100', text: 'text-emerald-800', icon: CheckCircle },
  'Pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
  'Overdue': { bg: 'bg-red-100', text: 'text-red-800', icon: AlertTriangle },
  'Partial': { bg: 'bg-orange-100', text: 'text-orange-800', icon: Clock },
};

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newPayment, setNewPayment] = useState({ clientName: '', loanType: '', amount: '', dueDate: '', method: '', note: '' });

  useEffect(() => {
    const saved = localStorage.getItem('pcg_payments');
    setPayments(saved ? JSON.parse(saved) : mockPayments);
  }, []);

  const save = (data: Payment[]) => { setPayments(data); localStorage.setItem('pcg_payments', JSON.stringify(data)); };

  const markPaid = (id: string) => {
    save(payments.map(p => p.id === id ? { ...p, status: 'Paid' as const, paidDate: new Date().toISOString().split('T')[0], method: p.method || 'Wire Transfer' } : p));
  };

  const addPayment = () => {
    if (!newPayment.clientName || !newPayment.amount) return;
    const p: Payment = {
      id: Date.now().toString(), clientName: newPayment.clientName, loanType: newPayment.loanType || 'Other',
      amount: parseFloat(newPayment.amount), dueDate: newPayment.dueDate || new Date().toISOString().split('T')[0],
      paidDate: null, status: 'Pending', method: newPayment.method, note: newPayment.note,
      invoiceNumber: `INV-2026-${(payments.length + 1).toString().padStart(3, '0')}`
    };
    save([p, ...payments]);
    setNewPayment({ clientName: '', loanType: '', amount: '', dueDate: '', method: '', note: '' });
    setShowAdd(false);
  };

  const filtered = payments.filter(p => {
    if (search && !p.clientName.toLowerCase().includes(search.toLowerCase()) && !p.invoiceNumber.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter && p.status !== statusFilter) return false;
    return true;
  });

  const totalDue = payments.filter(p => p.status !== 'Paid').reduce((s, p) => s + p.amount, 0);
  const totalCollected = payments.filter(p => p.status === 'Paid').reduce((s, p) => s + p.amount, 0);
  const overdueCount = payments.filter(p => p.status === 'Overdue').length;
  const pendingCount = payments.filter(p => p.status === 'Pending').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1a1a1a] font-['Playfair_Display']">Payments</h1>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 bg-[#3d9b3d] text-white rounded-lg text-sm font-semibold hover:bg-[#2d7a2d]">
          <Plus className="w-4 h-4" /> New Payment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><DollarSign className="w-5 h-5 text-emerald-600" /></div><span className="text-xs text-gray-500 font-semibold">Collected</span></div>
          <p className="text-2xl font-bold text-[#1a1a1a]">${totalCollected.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-yellow-600" /></div><span className="text-xs text-gray-500 font-semibold">Outstanding</span></div>
          <p className="text-2xl font-bold text-[#1a1a1a]">${totalDue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><Clock className="w-5 h-5 text-orange-600" /></div><span className="text-xs text-gray-500 font-semibold">Pending</span></div>
          <p className="text-2xl font-bold text-[#1a1a1a]">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-red-600" /></div><span className="text-xs text-gray-500 font-semibold">Overdue</span></div>
          <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by client or invoice..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9b3d]" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9b3d]">
          <option value="">All Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
          <option value="Partial">Partial</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#f7f7f7]">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Invoice</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Client</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Loan Type</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Amount</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Due Date</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Paid Date</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Method</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const cfg = statusConfig[p.status];
                const Icon = cfg.icon;
                return (
                  <tr key={p.id} className="border-t border-gray-50 hover:bg-[#f7f7f7]">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{p.invoiceNumber}</td>
                    <td className="px-4 py-3 font-semibold">{p.clientName}</td>
                    <td className="px-4 py-3 text-gray-600">{p.loanType}</td>
                    <td className="px-4 py-3 font-bold">${p.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-600">{p.dueDate}</td>
                    <td className="px-4 py-3 text-gray-600">{p.paidDate || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{p.method || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
                        <Icon className="w-3 h-3" /> {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {p.status !== 'Paid' && (
                        <button onClick={() => markPaid(p.id)} className="text-xs font-semibold text-[#3d9b3d] hover:underline">Mark Paid</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Payment Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowAdd(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <button onClick={() => setShowAdd(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-6 font-['Playfair_Display']">New Payment Record</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Client Name</label>
                <input value={newPayment.clientName} onChange={e => setNewPayment({...newPayment, clientName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9b3d]" placeholder="Full name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Amount ($)</label>
                  <input type="number" value={newPayment.amount} onChange={e => setNewPayment({...newPayment, amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9b3d]" placeholder="0.00" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Due Date</label>
                  <input type="date" value={newPayment.dueDate} onChange={e => setNewPayment({...newPayment, dueDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9b3d]" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Loan Type</label>
                <select value={newPayment.loanType} onChange={e => setNewPayment({...newPayment, loanType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9b3d]">
                  <option value="">Select...</option>
                  <option>Hard Money Bridge</option><option>HELOC</option><option>Cash-Out Refinance</option>
                  <option>Purchase</option><option>Rehab Loan</option><option>Construction Loan</option>
                  <option>Second Mortgage</option><option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Payment Method</label>
                <select value={newPayment.method} onChange={e => setNewPayment({...newPayment, method: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9b3d]">
                  <option value="">Select...</option>
                  <option>Wire Transfer</option><option>ACH</option><option>Check</option><option>Cash</option><option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Note (optional)</label>
                <input value={newPayment.note} onChange={e => setNewPayment({...newPayment, note: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9b3d]" placeholder="Any notes..." />
              </div>
              <button onClick={addPayment} className="w-full px-4 py-2.5 bg-[#3d9b3d] text-white rounded-lg font-semibold text-sm hover:bg-[#2d7a2d]">
                Add Payment Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
