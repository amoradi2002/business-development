'use client';

import { useState } from 'react';
import { MapPin, DollarSign, TrendingUp, Shield, Clock, Building, Home, CheckCircle } from 'lucide-react';

interface Deal {
  id: string;
  address: string;
  propertyType: string;
  loanAmount: string;
  minInvestment: string;
  projectedYield: string;
  ltv: string;
  term: string;
  riskLevel: 'Low' | 'Medium';
  description: string;
  icon: typeof Building;
}

const deals: Deal[] = [
  {
    id: 'deal-001',
    address: '3301 W Burbank Blvd',
    propertyType: 'Multifamily Construction',
    loanAmount: '$1,800,000',
    minInvestment: '$100,000',
    projectedYield: '11.99%',
    ltv: '60%',
    term: '24 mo',
    riskLevel: 'Low',
    description: 'Ground-up construction of 8-unit multifamily building in prime Burbank location. Experienced developer with 15+ completed projects. Strong pre-leasing interest.',
    icon: Building,
  },
  {
    id: 'deal-002',
    address: '724 N Lima St',
    propertyType: 'SFR Purchase',
    loanAmount: '$612,000',
    minInvestment: '$75,000',
    projectedYield: '7.0%',
    ltv: '70%',
    term: '30 yr',
    riskLevel: 'Low',
    description: 'Single-family residence purchase loan for owner-occupied buyer. Strong W-2 income, excellent credit history. Property in established neighborhood with steady appreciation.',
    icon: Home,
  },
  {
    id: 'deal-003',
    address: '2109 N Frederic St',
    propertyType: 'SFR HELOC',
    loanAmount: '$770,000',
    minInvestment: '$100,000',
    projectedYield: '8.75%',
    ltv: '70%',
    term: '10 yr',
    riskLevel: 'Medium',
    description: 'Home equity line of credit on well-maintained SFR in Burbank. Borrower using funds for business expansion. Property value supported by recent comps in the area.',
    icon: Home,
  },
];

const riskColors: Record<string, string> = {
  Low: 'bg-green-100 text-green-700 border-green-200',
  Medium: 'bg-amber-100 text-amber-700 border-amber-200',
};

export default function DealsPage() {
  const [expressedInterest, setExpressedInterest] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);

  const handleExpressInterest = (deal: Deal) => {
    const existing = JSON.parse(localStorage.getItem('pcg_investor_interests') || '[]');
    if (!existing.find((e: { id: string }) => e.id === deal.id)) {
      existing.push({ id: deal.id, address: deal.address, date: new Date().toISOString() });
      localStorage.setItem('pcg_investor_interests', JSON.stringify(existing));
    }
    setExpressedInterest((prev) => new Set(prev).add(deal.id));
    setToast(`Interest expressed for ${deal.address}. Our team will contact you shortly.`);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl font-bold text-gray-900"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Available Deals
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Current investment opportunities curated by Prime Capital Group
        </p>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-[#2d7a2d] text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      {/* Deal Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {deals.map((deal) => {
          const Icon = deal.icon;
          const interested = expressedInterest.has(deal.id);
          return (
            <div
              key={deal.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-br from-[#2d7a2d] to-[#3d9b3d] p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-green-200" />
                      <span className="text-green-100 text-sm">{deal.address}</span>
                    </div>
                    <h3 className="text-white font-bold text-lg">{deal.propertyType}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed">{deal.description}</p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500">Loan Amount</span>
                    </div>
                    <p className="font-bold text-gray-900">{deal.loanAmount}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500">Min Investment</span>
                    </div>
                    <p className="font-bold text-gray-900">{deal.minInvestment}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <TrendingUp className="w-3.5 h-3.5 text-[#3d9b3d]" />
                      <span className="text-xs text-gray-500">Projected Yield</span>
                    </div>
                    <p className="font-bold text-[#3d9b3d]">{deal.projectedYield}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Shield className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500">LTV</span>
                    </div>
                    <p className="font-bold text-gray-900">{deal.ltv}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      {deal.term}
                    </div>
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${riskColors[deal.riskLevel]}`}
                    >
                      {deal.riskLevel} Risk
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleExpressInterest(deal)}
                  disabled={interested}
                  className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                    interested
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-[#2d7a2d] text-white hover:bg-[#246324]'
                  }`}
                >
                  {interested ? 'Interest Expressed' : 'Express Interest'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
        <p className="text-xs text-gray-500 leading-relaxed">
          <span className="font-semibold text-gray-600">Disclaimer:</span> All investments involve risk. Past performance does not guarantee future results.
          The projected yields shown are estimates and may vary. Trust deed investments are secured by real property but are not FDIC insured.
          Please consult with your financial advisor before making investment decisions. Prime Capital Group, Inc. DRE #02133091.
        </p>
      </div>
    </div>
  );
}
