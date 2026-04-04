'use client';

import { useState, useEffect } from 'react';
import { Send, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';

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

const dealStatuses = ['Submitted', 'Under Review', 'More Info Needed', 'Approved', 'Declined'];

const statusColors: Record<string, string> = {
  Submitted: 'bg-blue-100 text-blue-800',
  'Under Review': 'bg-yellow-100 text-yellow-800',
  'More Info Needed': 'bg-orange-100 text-orange-800',
  Approved: 'bg-green-100 text-green-800',
  Declined: 'bg-red-100 text-red-800',
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
}

export default function BrokerMessagesPage() {
  const [deals, setDeals] = useState<BrokerDeal[]>([]);
  const [messages, setMessages] = useState<BrokerMessage[]>([]);
  const [expandedDealId, setExpandedDealId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const storedDeals = localStorage.getItem('pcg_broker_deals');
    const storedMessages = localStorage.getItem('pcg_broker_messages');

    if (storedDeals) setDeals(JSON.parse(storedDeals));
    if (storedMessages) setMessages(JSON.parse(storedMessages));
  }, []);

  const dealMessages = (dealId: string) =>
    messages
      .filter((m) => m.dealId === dealId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const handleSendMessage = (dealId: string) => {
    if (!newMessage.trim()) return;

    const msg: BrokerMessage = {
      id: `bm-${Date.now()}`,
      dealId,
      sender: 'admin',
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, msg];
    setMessages(updatedMessages);
    localStorage.setItem('pcg_broker_messages', JSON.stringify(updatedMessages));
    setNewMessage('');
  };

  const handleStatusChange = (dealId: string, newStatus: string) => {
    const updatedDeals = deals.map((d) =>
      d.id === dealId ? { ...d, status: newStatus, lastUpdated: new Date().toISOString() } : d
    );
    setDeals(updatedDeals);
    localStorage.setItem('pcg_broker_deals', JSON.stringify(updatedDeals));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageSquare className="w-6 h-6 text-[#2d7a2d]" />
        <h1 className="text-2xl font-bold text-gray-900">Broker Messages</h1>
        <span className="bg-[#2d7a2d] text-white text-xs font-bold px-2.5 py-1 rounded-full">
          {deals.length} deals
        </span>
      </div>

      {deals.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No broker deals submitted yet.</p>
          <p className="text-gray-400 text-sm mt-1">Deals from the Broker Portal will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {deals.map((deal) => {
            const msgs = dealMessages(deal.id);
            const unread = msgs.filter((m) => m.sender === 'broker').length;

            return (
              <div key={deal.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Deal header */}
                <button
                  onClick={() => setExpandedDealId(expandedDealId === deal.id ? null : deal.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-5 flex-1 min-w-0">
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{deal.borrowerName}</p>
                      <p className="text-xs text-gray-500">
                        {deal.propertyAddress}, {deal.propertyCity} {deal.zipCode}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                      {formatCurrency(deal.loanAmount)}
                    </p>
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        statusColors[deal.status] || 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {deal.status}
                    </span>
                    <p className="text-xs text-gray-400 whitespace-nowrap hidden md:block">
                      Broker: broker@pcg.com
                    </p>
                    {msgs.length > 0 && (
                      <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap">
                        {msgs.length} msg{msgs.length !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  {expandedDealId === deal.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>

                {/* Expanded */}
                {expandedDealId === deal.id && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    {/* Deal info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs uppercase">Phone</p>
                        <p className="font-medium">{deal.borrowerPhone}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase">Email</p>
                        <p className="font-medium">{deal.borrowerEmail}</p>
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
                      <div>
                        <p className="text-gray-500 text-xs uppercase">Submitted</p>
                        <p className="font-medium">{new Date(deal.submittedAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {deal.borrowerScenario && (
                      <div className="mb-4">
                        <p className="text-gray-500 text-xs uppercase mb-1">Borrower Scenario</p>
                        <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 border border-gray-200">
                          {deal.borrowerScenario}
                        </p>
                      </div>
                    )}

                    {/* Status update */}
                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                        Update Status
                      </label>
                      <select
                        value={deal.status}
                        onChange={(e) => handleStatusChange(deal.id, e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2d7a2d] focus:border-transparent outline-none"
                      >
                        {dealStatuses.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Messages */}
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-3">Message Thread</p>
                      <div className="space-y-2 max-h-64 overflow-y-auto mb-3 bg-gray-50 rounded-lg p-3">
                        {msgs.length === 0 ? (
                          <p className="text-sm text-gray-400 italic">No messages yet.</p>
                        ) : (
                          msgs.map((msg) => (
                            <div
                              key={msg.id}
                              className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                                  msg.sender === 'admin'
                                    ? 'bg-[#2d7a2d] text-white'
                                    : 'bg-white border border-gray-200 text-gray-800'
                                }`}
                              >
                                <p className={`text-xs font-semibold mb-0.5 ${msg.sender === 'admin' ? 'text-green-200' : 'text-gray-400'}`}>
                                  {msg.sender === 'admin' ? 'You (Admin)' : 'Broker'}
                                </p>
                                <p>{msg.text}</p>
                                <p
                                  className={`text-xs mt-1 ${
                                    msg.sender === 'admin' ? 'text-green-200' : 'text-gray-400'
                                  }`}
                                >
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
                          placeholder="Reply to broker..."
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
            );
          })}
        </div>
      )}
    </div>
  );
}
