'use client';

import { useState, useEffect } from 'react';
import { Send, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

interface BrokerDeal {
  id: string;
  borrowerName: string;
  borrowerPhone: string;
  borrowerEmail: string;
  propertyAddress: string;
  propertyCity: string;
  zipCode: string;
  propertyType: string;
  loanAmount: number;
  propertyValue: number;
  loanPurpose: string;
  borrowerScenario: string;
  status: string;
  submittedAt: string;
  lastUpdated: string;
}

interface BrokerMessage {
  id: string;
  dealId: string;
  sender: 'broker' | 'admin';
  text: string;
  timestamp: string;
}

const statusColors: Record<string, string> = {
  Submitted: 'bg-blue-100 text-blue-800',
  'Under Review': 'bg-yellow-100 text-yellow-800',
  'More Info Needed': 'bg-orange-100 text-orange-800',
  Approved: 'bg-green-100 text-green-800',
  Declined: 'bg-red-100 text-red-800',
};

const propertyTypes = [
  'Single Family',
  'Multi-Family (2-4)',
  'Multi-Family (5+)',
  'Commercial',
  'Mixed Use',
  'Industrial',
  'Land',
  'Other',
];

const loanPurposes = [
  'Purchase',
  'Refinance',
  'Cash-Out Refinance',
  'Bridge Loan',
  'Construction',
  'Fix & Flip',
  'DSCR',
  'Other',
];

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
}

function daysSince(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

const sampleDeals: BrokerDeal[] = [
  {
    id: 'bd-001',
    borrowerName: 'Michael Torres',
    borrowerPhone: '(310) 555-0142',
    borrowerEmail: 'mtorres@email.com',
    propertyAddress: '4521 Sunset Blvd',
    propertyCity: 'Los Angeles',
    zipCode: '90027',
    propertyType: 'Multi-Family (2-4)',
    loanAmount: 850000,
    propertyValue: 1200000,
    loanPurpose: 'Purchase',
    borrowerScenario: 'Investor purchasing a fourplex. Strong rental income history. Looking for DSCR program.',
    status: 'Under Review',
    submittedAt: '2026-03-20T10:30:00Z',
    lastUpdated: '2026-03-28T14:00:00Z',
  },
  {
    id: 'bd-002',
    borrowerName: 'Sarah Kim',
    borrowerPhone: '(818) 555-0198',
    borrowerEmail: 'skim@email.com',
    propertyAddress: '789 Oak Ave',
    propertyCity: 'Glendale',
    zipCode: '91201',
    propertyType: 'Single Family',
    loanAmount: 625000,
    propertyValue: 780000,
    loanPurpose: 'Refinance',
    borrowerScenario: 'Rate and term refinance. Current rate 7.5%, looking to get into low 6s. Credit score 740+.',
    status: 'Submitted',
    submittedAt: '2026-04-01T09:15:00Z',
    lastUpdated: '2026-04-01T09:15:00Z',
  },
  {
    id: 'bd-003',
    borrowerName: 'James Whitfield',
    borrowerPhone: '(626) 555-0177',
    borrowerEmail: 'jwhitfield@email.com',
    propertyAddress: '1200 Commerce Dr',
    propertyCity: 'Pasadena',
    zipCode: '91101',
    propertyType: 'Commercial',
    loanAmount: 2200000,
    propertyValue: 3100000,
    loanPurpose: 'Bridge Loan',
    borrowerScenario: 'Needs bridge financing for commercial property acquisition. Plans to stabilize and refinance within 12 months.',
    status: 'More Info Needed',
    submittedAt: '2026-03-15T16:45:00Z',
    lastUpdated: '2026-03-25T11:20:00Z',
  },
];

const sampleMessages: BrokerMessage[] = [
  {
    id: 'bm-001',
    dealId: 'bd-001',
    sender: 'admin',
    text: 'Got the deal, reviewing now. Can you send over the rent roll?',
    timestamp: '2026-03-22T10:00:00Z',
  },
  {
    id: 'bm-002',
    dealId: 'bd-001',
    sender: 'broker',
    text: 'Rent roll attached to the email I sent yesterday. Let me know if you need anything else.',
    timestamp: '2026-03-22T14:30:00Z',
  },
  {
    id: 'bm-003',
    dealId: 'bd-003',
    sender: 'admin',
    text: 'Need more details on the exit strategy. What is the borrower planning for stabilization?',
    timestamp: '2026-03-25T11:20:00Z',
  },
];

export default function BrokerPortalPage() {
  const [deals, setDeals] = useState<BrokerDeal[]>([]);
  const [messages, setMessages] = useState<BrokerMessage[]>([]);
  const [expandedDealId, setExpandedDealId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Form state
  const [borrowerName, setBorrowerName] = useState('');
  const [borrowerPhone, setBorrowerPhone] = useState('');
  const [borrowerEmail, setBorrowerEmail] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [propertyCity, setPropertyCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [propertyType, setPropertyType] = useState('Single Family');
  const [loanAmount, setLoanAmount] = useState('');
  const [propertyValue, setPropertyValue] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('Purchase');
  const [borrowerScenario, setBorrowerScenario] = useState('');

  useEffect(() => {
    const storedDeals = localStorage.getItem('pcg_broker_deals');
    const storedMessages = localStorage.getItem('pcg_broker_messages');

    if (storedDeals) {
      setDeals(JSON.parse(storedDeals));
    } else {
      setDeals(sampleDeals);
      localStorage.setItem('pcg_broker_deals', JSON.stringify(sampleDeals));
    }

    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      setMessages(sampleMessages);
      localStorage.setItem('pcg_broker_messages', JSON.stringify(sampleMessages));
    }
  }, []);

  const handleSubmitDeal = (e: React.FormEvent) => {
    e.preventDefault();

    const deal: BrokerDeal = {
      id: `bd-${Date.now()}`,
      borrowerName,
      borrowerPhone,
      borrowerEmail,
      propertyAddress,
      propertyCity,
      zipCode,
      propertyType,
      loanAmount: Number(loanAmount),
      propertyValue: Number(propertyValue),
      loanPurpose,
      borrowerScenario,
      status: 'Submitted',
      submittedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    const updatedDeals = [deal, ...deals];
    setDeals(updatedDeals);
    localStorage.setItem('pcg_broker_deals', JSON.stringify(updatedDeals));

    // Also save as a lead
    const existingLeads = JSON.parse(localStorage.getItem('pcg_broker_leads') || '[]');
    existingLeads.push({
      id: deal.id,
      name: deal.borrowerName,
      phone: deal.borrowerPhone,
      email: deal.borrowerEmail,
      propertyAddress: `${deal.propertyAddress}, ${deal.propertyCity} ${deal.zipCode}`,
      propertyType: deal.propertyType,
      loanAmount: deal.loanAmount,
      propertyValue: deal.propertyValue,
      loanPurpose: deal.loanPurpose,
      scenario: deal.borrowerScenario,
      source: 'Broker Portal',
      submittedAt: deal.submittedAt,
    });
    localStorage.setItem('pcg_broker_leads', JSON.stringify(existingLeads));

    // Reset form
    setBorrowerName('');
    setBorrowerPhone('');
    setBorrowerEmail('');
    setPropertyAddress('');
    setPropertyCity('');
    setZipCode('');
    setPropertyType('Single Family');
    setLoanAmount('');
    setPropertyValue('');
    setLoanPurpose('Purchase');
    setBorrowerScenario('');

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSendMessage = (dealId: string) => {
    if (!newMessage.trim()) return;

    const msg: BrokerMessage = {
      id: `bm-${Date.now()}`,
      dealId,
      sender: 'broker',
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, msg];
    setMessages(updatedMessages);
    localStorage.setItem('pcg_broker_messages', JSON.stringify(updatedMessages));
    setNewMessage('');
  };

  const dealMessages = (dealId: string) =>
    messages.filter((m) => m.dealId === dealId).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-5 h-5" />
          Deal submitted successfully!
        </div>
      )}

      {/* Submit a Deal */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Submit a Deal</h2>
        <form onSubmit={handleSubmitDeal} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Borrower Name *</label>
              <input
                required
                value={borrowerName}
                onChange={(e) => setBorrowerName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Borrower Phone *</label>
              <input
                required
                value={borrowerPhone}
                onChange={(e) => setBorrowerPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
                placeholder="(555) 555-0000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Borrower Email *</label>
              <input
                required
                type="email"
                value={borrowerEmail}
                onChange={(e) => setBorrowerEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Address *</label>
              <input
                required
                value={propertyAddress}
                onChange={(e) => setPropertyAddress(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
                placeholder="Street address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property City *</label>
              <input
                required
                value={propertyCity}
                onChange={(e) => setPropertyCity(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code *</label>
              <input
                required
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
                placeholder="90001"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
              >
                {propertyTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount *</label>
              <input
                required
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
                placeholder="500000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Value *</label>
              <input
                required
                type="number"
                value={propertyValue}
                onChange={(e) => setPropertyValue(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
                placeholder="750000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Purpose</label>
            <select
              value={loanPurpose}
              onChange={(e) => setLoanPurpose(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
            >
              {loanPurposes.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Borrower Scenario</label>
            <textarea
              value={borrowerScenario}
              onChange={(e) => setBorrowerScenario(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none resize-none"
              placeholder="Describe the borrower's situation, goals, and any special circumstances..."
            />
          </div>

          <button
            type="submit"
            className="bg-[#2d7a2d] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#246324] transition-colors"
          >
            Submit Deal
          </button>
        </form>
      </div>

      {/* My Submitted Deals */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">My Submitted Deals</h2>
        </div>

        {deals.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No deals submitted yet.</div>
        ) : (
          <div className="divide-y divide-gray-200">
            {deals.map((deal) => (
              <div key={deal.id}>
                {/* Deal row */}
                <button
                  onClick={() => setExpandedDealId(expandedDealId === deal.id ? null : deal.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-6 flex-1 min-w-0">
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{deal.borrowerName}</p>
                      <p className="text-xs text-gray-500">{deal.propertyAddress}, {deal.propertyCity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                      {formatCurrency(deal.loanAmount)}
                    </p>
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusColors[deal.status] || 'bg-gray-100 text-gray-600'}`}>
                      {deal.status}
                    </span>
                    <p className="text-xs text-gray-500 whitespace-nowrap hidden sm:block">
                      Updated {new Date(deal.lastUpdated).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500 whitespace-nowrap hidden sm:block">
                      {daysSince(deal.submittedAt)}d ago
                    </p>
                  </div>
                  {expandedDealId === deal.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>

                {/* Expanded details */}
                {expandedDealId === deal.id && (
                  <div className="px-6 pb-6 bg-gray-50 border-t border-gray-100">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs uppercase">Phone</p>
                        <p className="font-medium">{deal.borrowerPhone}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase">Email</p>
                        <p className="font-medium">{deal.borrowerEmail}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase">Zip Code</p>
                        <p className="font-medium">{deal.zipCode}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase">Property Type</p>
                        <p className="font-medium">{deal.propertyType}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase">Property Value</p>
                        <p className="font-medium">{formatCurrency(deal.propertyValue)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase">Loan Purpose</p>
                        <p className="font-medium">{deal.loanPurpose}</p>
                      </div>
                    </div>
                    {deal.borrowerScenario && (
                      <div className="mb-4">
                        <p className="text-gray-500 text-xs uppercase mb-1">Borrower Scenario</p>
                        <p className="text-sm text-gray-700 bg-white rounded-lg p-3 border border-gray-200">
                          {deal.borrowerScenario}
                        </p>
                      </div>
                    )}

                    {/* Messages */}
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Messages</p>
                      <div className="space-y-2 max-h-60 overflow-y-auto mb-3">
                        {dealMessages(deal.id).length === 0 ? (
                          <p className="text-sm text-gray-400 italic">No messages yet.</p>
                        ) : (
                          dealMessages(deal.id).map((msg) => (
                            <div
                              key={msg.id}
                              className={`flex ${msg.sender === 'broker' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                                  msg.sender === 'broker'
                                    ? 'bg-[#2d7a2d] text-white'
                                    : 'bg-white border border-gray-200 text-gray-800'
                                }`}
                              >
                                <p>{msg.text}</p>
                                <p className={`text-xs mt-1 ${msg.sender === 'broker' ? 'text-green-200' : 'text-gray-400'}`}>
                                  {new Date(msg.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="flex gap-2">
                        <input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage(deal.id);
                            }
                          }}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
                          placeholder="Type a message..."
                        />
                        <button
                          onClick={() => handleSendMessage(deal.id)}
                          className="bg-[#2d7a2d] text-white px-4 py-2 rounded-lg hover:bg-[#246324] transition-colors"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
