'use client';

import { DollarSign, Briefcase, TrendingUp, PiggyBank, Clock } from 'lucide-react';

const stats = [
  { label: 'Total Invested', value: '$750,000', icon: DollarSign, color: 'bg-green-100 text-green-700' },
  { label: 'Active Investments', value: '3', icon: Briefcase, color: 'bg-blue-100 text-blue-700' },
  { label: 'Average Yield', value: '9.8%', icon: TrendingUp, color: 'bg-purple-100 text-purple-700' },
  { label: 'Total Returns Earned', value: '$61,250', icon: PiggyBank, color: 'bg-amber-100 text-amber-700' },
];

const investments = [
  {
    id: 'TD-2024-001',
    property: '1847 Glenoaks Blvd, Glendale',
    loanAmount: '$750,000',
    yourInvestment: '$250,000',
    rate: '10.5%',
    term: '12 mo',
    monthlyReturn: '$2,188',
    status: 'Active',
  },
  {
    id: 'TD-2024-003',
    property: '2234 W Magnolia Blvd, Burbank',
    loanAmount: '$1,400,000',
    yourInvestment: '$300,000',
    rate: '7.25%',
    term: '30 yr',
    monthlyReturn: '$1,813',
    status: 'Active',
  },
  {
    id: 'TD-2024-007',
    property: '1502 E Colorado St, Pasadena',
    loanAmount: '$870,000',
    yourInvestment: '$200,000',
    rate: '9.5%',
    term: '15 yr',
    monthlyReturn: '$1,583',
    status: 'Active',
  },
];

const monthlyReturns = [
  { month: 'Jan', amount: 4200 },
  { month: 'Feb', amount: 4800 },
  { month: 'Mar', amount: 5100 },
  { month: 'Apr', amount: 5584 },
  { month: 'May', amount: 5584 },
  { month: 'Jun', amount: 5584 },
];

const recentActivity = [
  {
    text: 'Investment TD-2024-007 funded — $200,000 at 9.5%',
    time: '3 days ago',
  },
  {
    text: 'Monthly return deposited — $5,584',
    time: '1 week ago',
  },
  {
    text: 'New deal opportunity available — Burbank Multifamily',
    time: '2 weeks ago',
  },
];

const statusColors: Record<string, string> = {
  Active: 'bg-green-100 text-green-700',
  Matured: 'bg-blue-100 text-blue-700',
  Pending: 'bg-yellow-100 text-yellow-700',
};

export default function InvestorDashboard() {
  const maxReturn = Math.max(...monthlyReturns.map((r) => r.amount));

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl font-bold text-gray-900"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Investor Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">Your portfolio overview at a glance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Investments Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2
            className="text-lg font-bold text-gray-900"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Active Investments
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Investment</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Loan Amount</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Your Investment</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rate</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Term</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Monthly Return</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((inv) => (
                <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{inv.id}</td>
                  <td className="px-6 py-4 text-gray-700">{inv.property}</td>
                  <td className="px-6 py-4 text-gray-700">{inv.loanAmount}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{inv.yourInvestment}</td>
                  <td className="px-6 py-4 text-[#3d9b3d] font-semibold">{inv.rate}</td>
                  <td className="px-6 py-4 text-gray-700">{inv.term}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{inv.monthlyReturn}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[inv.status]}`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Row: Chart + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Returns History Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2
            className="text-lg font-bold text-gray-900 mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Returns History
          </h2>
          <div className="flex items-end gap-3 h-48">
            {monthlyReturns.map((r) => {
              const heightPercent = (r.amount / maxReturn) * 100;
              return (
                <div key={r.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-medium text-gray-600">
                    ${(r.amount / 1000).toFixed(1)}k
                  </span>
                  <div className="w-full relative" style={{ height: '160px' }}>
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 rounded-t-md bg-gradient-to-t from-[#2d7a2d] to-[#3d9b3d] transition-all duration-500"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{r.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2
            className="text-lg font-bold text-gray-900 mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-green-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-800">{activity.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
