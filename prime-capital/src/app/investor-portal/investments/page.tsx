'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, DollarSign } from 'lucide-react';

interface Investment {
  id: string;
  property: string;
  borrower: string;
  loanAmount: string;
  yourInvestment: string;
  rate: string;
  term: string;
  ltv: string;
  monthlyReturn: string;
  startDate: string;
  maturityDate: string;
  status: 'Active' | 'Matured';
  totalReturns?: string;
  nextPaymentDate?: string;
  propertyType: string;
  propertyDetails: string;
  payments: { date: string; amount: string }[];
  ltvBreakdown: { appraised: string; loanAmount: string; ltv: string };
}

const allInvestments: Investment[] = [
  {
    id: 'TD-2024-001',
    property: '1847 Glenoaks Blvd, Glendale',
    borrower: 'Michael',
    loanAmount: '$750,000',
    yourInvestment: '$250,000',
    rate: '10.5%',
    term: '12 mo',
    ltv: '65%',
    monthlyReturn: '$2,188',
    startDate: '2024-01-15',
    maturityDate: '2025-01-15',
    status: 'Active',
    nextPaymentDate: '2024-07-15',
    propertyType: 'SFR - Fix & Flip',
    propertyDetails: '3 bed / 2 bath, 1,850 sq ft. Major renovation including kitchen, bathrooms, and landscaping. Located in prime Glendale corridor.',
    payments: [
      { date: '2024-06-15', amount: '$2,188' },
      { date: '2024-05-15', amount: '$2,188' },
      { date: '2024-04-15', amount: '$2,188' },
      { date: '2024-03-15', amount: '$2,188' },
      { date: '2024-02-15', amount: '$2,188' },
      { date: '2024-01-15', amount: '$2,188' },
    ],
    ltvBreakdown: { appraised: '$1,150,000', loanAmount: '$750,000', ltv: '65%' },
  },
  {
    id: 'TD-2024-003',
    property: '2234 W Magnolia Blvd, Burbank',
    borrower: 'Jennifer',
    loanAmount: '$1,400,000',
    yourInvestment: '$300,000',
    rate: '7.25%',
    term: '30 yr',
    ltv: '70%',
    monthlyReturn: '$1,813',
    startDate: '2024-02-01',
    maturityDate: '2054-02-01',
    status: 'Active',
    nextPaymentDate: '2024-08-01',
    propertyType: 'Multifamily - 4 Units',
    propertyDetails: '4-unit apartment building, fully occupied. Rental income covers 1.4x DSCR. Recently updated electrical and plumbing.',
    payments: [
      { date: '2024-07-01', amount: '$1,813' },
      { date: '2024-06-01', amount: '$1,813' },
      { date: '2024-05-01', amount: '$1,813' },
      { date: '2024-04-01', amount: '$1,813' },
      { date: '2024-03-01', amount: '$1,813' },
      { date: '2024-02-01', amount: '$1,813' },
    ],
    ltvBreakdown: { appraised: '$2,000,000', loanAmount: '$1,400,000', ltv: '70%' },
  },
  {
    id: 'TD-2024-007',
    property: '1502 E Colorado St, Pasadena',
    borrower: 'David',
    loanAmount: '$870,000',
    yourInvestment: '$200,000',
    rate: '9.5%',
    term: '15 yr',
    ltv: '62%',
    monthlyReturn: '$1,583',
    startDate: '2024-06-01',
    maturityDate: '2039-06-01',
    status: 'Active',
    nextPaymentDate: '2024-08-01',
    propertyType: 'SFR - Purchase',
    propertyDetails: '4 bed / 3 bath, 2,400 sq ft. Established Pasadena neighborhood. Borrower has strong credit and income verification.',
    payments: [
      { date: '2024-07-01', amount: '$1,583' },
      { date: '2024-06-01', amount: '$1,583' },
    ],
    ltvBreakdown: { appraised: '$1,400,000', loanAmount: '$870,000', ltv: '62%' },
  },
  {
    id: 'TD-2023-015',
    property: '5847 Lankershim Blvd, North Hollywood',
    borrower: 'Robert',
    loanAmount: '$1,100,000',
    yourInvestment: '$400,000',
    rate: '10.5%',
    term: '6 mo',
    ltv: '68%',
    monthlyReturn: '$3,500',
    startDate: '2023-06-01',
    maturityDate: '2023-12-01',
    status: 'Matured',
    totalReturns: '$21,000',
    propertyType: 'Commercial - Retail',
    propertyDetails: 'Mixed-use commercial property on Lankershim corridor. Ground floor retail with office above. Loan fully repaid at maturity.',
    payments: [
      { date: '2023-11-01', amount: '$3,500' },
      { date: '2023-10-01', amount: '$3,500' },
      { date: '2023-09-01', amount: '$3,500' },
      { date: '2023-08-01', amount: '$3,500' },
      { date: '2023-07-01', amount: '$3,500' },
      { date: '2023-06-01', amount: '$3,500' },
    ],
    ltvBreakdown: { appraised: '$1,615,000', loanAmount: '$1,100,000', ltv: '68%' },
  },
  {
    id: 'TD-2023-022',
    property: '918 E Chevy Chase Dr, Glendale',
    borrower: 'Sarah',
    loanAmount: '$580,000',
    yourInvestment: '$150,000',
    rate: '11.5%',
    term: '12 mo',
    ltv: '58%',
    monthlyReturn: '$1,438',
    startDate: '2023-03-01',
    maturityDate: '2024-03-01',
    status: 'Matured',
    totalReturns: '$17,250',
    propertyType: 'SFR - Fix & Flip',
    propertyDetails: '3 bed / 2 bath, 1,600 sq ft. Complete renovation completed on schedule. Property sold at $1,050,000. Full principal returned.',
    payments: [
      { date: '2024-02-01', amount: '$1,438' },
      { date: '2024-01-01', amount: '$1,438' },
      { date: '2023-12-01', amount: '$1,438' },
      { date: '2023-11-01', amount: '$1,438' },
      { date: '2023-10-01', amount: '$1,438' },
      { date: '2023-09-01', amount: '$1,438' },
    ],
    ltvBreakdown: { appraised: '$1,000,000', loanAmount: '$580,000', ltv: '58%' },
  },
];

const statusColors: Record<string, string> = {
  Active: 'bg-green-100 text-green-700',
  Matured: 'bg-blue-100 text-blue-700',
};

type TabKey = 'active' | 'matured' | 'all';

export default function InvestmentsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('active');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'active', label: 'Active' },
    { key: 'matured', label: 'Matured' },
    { key: 'all', label: 'All' },
  ];

  const filtered = allInvestments.filter((inv) => {
    if (activeTab === 'active') return inv.status === 'Active';
    if (activeTab === 'matured') return inv.status === 'Matured';
    return true;
  });

  const totalInvested = allInvestments.reduce((sum, inv) => {
    return sum + parseInt(inv.yourInvestment.replace(/[$,]/g, ''));
  }, 0);

  const activeCount = allInvestments.filter((i) => i.status === 'Active').length;
  const maturedCount = allInvestments.filter((i) => i.status === 'Matured').length;

  const totalReturns = allInvestments.reduce((sum, inv) => {
    if (inv.totalReturns) return sum + parseInt(inv.totalReturns.replace(/[$,]/g, ''));
    const monthly = parseInt(inv.monthlyReturn.replace(/[$,]/g, ''));
    return sum + monthly * inv.payments.length;
  }, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl font-bold text-gray-900"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          My Investments
        </h1>
        <p className="text-gray-500 text-sm mt-1">Detailed view of your trust deed portfolio</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Investments Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Trust Deed #</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Property Address</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Borrower</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Loan Amount</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Your Investment</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rate</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Term</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">LTV</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Monthly Return</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Maturity</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <>
                  <tr
                    key={inv.id}
                    onClick={() => setExpandedRow(expandedRow === inv.id ? null : inv.id)}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">{inv.id}</td>
                    <td className="px-4 py-3 text-gray-700 max-w-[200px] truncate">{inv.property}</td>
                    <td className="px-4 py-3 text-gray-700">{inv.borrower}</td>
                    <td className="px-4 py-3 text-gray-700">{inv.loanAmount}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{inv.yourInvestment}</td>
                    <td className="px-4 py-3 text-[#3d9b3d] font-semibold">{inv.rate}</td>
                    <td className="px-4 py-3 text-gray-700">{inv.term}</td>
                    <td className="px-4 py-3 text-gray-700">{inv.ltv}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{inv.monthlyReturn}</td>
                    <td className="px-4 py-3 text-gray-700">{inv.startDate}</td>
                    <td className="px-4 py-3 text-gray-700">{inv.maturityDate}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[inv.status]}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {expandedRow === inv.id ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </td>
                  </tr>
                  {expandedRow === inv.id && (
                    <tr key={`${inv.id}-detail`} className="border-b border-gray-100">
                      <td colSpan={13} className="px-4 py-6 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Property Details */}
                          <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Property Details</h4>
                            <p className="text-xs text-gray-500 mb-1">Type: {inv.propertyType}</p>
                            <p className="text-xs text-gray-600 leading-relaxed">{inv.propertyDetails}</p>
                          </div>

                          {/* Payment History */}
                          <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Payment History (Last 6)</h4>
                            <div className="space-y-1.5">
                              {inv.payments.map((p, i) => (
                                <div key={i} className="flex items-center justify-between text-xs">
                                  <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="w-3 h-3" />
                                    {p.date}
                                  </div>
                                  <span className="font-medium text-gray-900">{p.amount}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* LTV Breakdown */}
                          <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Loan-to-Value Breakdown</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Appraised Value</span>
                                <span className="font-medium text-gray-900">{inv.ltvBreakdown.appraised}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Loan Amount</span>
                                <span className="font-medium text-gray-900">{inv.ltvBreakdown.loanAmount}</span>
                              </div>
                              <div className="flex justify-between text-xs border-t border-gray-100 pt-2">
                                <span className="text-gray-500 font-medium">LTV Ratio</span>
                                <span className="font-bold text-[#3d9b3d]">{inv.ltvBreakdown.ltv}</span>
                              </div>
                              {/* LTV Bar */}
                              <div className="mt-2">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-[#3d9b3d] h-2 rounded-full"
                                    style={{ width: inv.ltvBreakdown.ltv }}
                                  />
                                </div>
                              </div>
                            </div>
                            {inv.nextPaymentDate && (
                              <div className="mt-4 pt-3 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-xs">
                                  <DollarSign className="w-3 h-3 text-[#3d9b3d]" />
                                  <span className="text-gray-500">Next Payment:</span>
                                  <span className="font-medium text-gray-900">{inv.nextPaymentDate}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2
          className="text-lg font-bold text-gray-900 mb-4"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Portfolio Summary
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Total Invested</p>
            <p className="text-xl font-bold text-gray-900 mt-1">${totalInvested.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Active Investments</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{activeCount}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Matured Investments</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{maturedCount}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Total Returns Earned</p>
            <p className="text-xl font-bold text-[#3d9b3d] mt-1">${totalReturns.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
