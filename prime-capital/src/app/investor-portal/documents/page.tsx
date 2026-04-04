'use client';

import { FileText, Download, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface Document {
  name: string;
  type: string;
  date: string;
}

interface InvestmentDocs {
  investmentId: string;
  property: string;
  documents: Document[];
}

const investmentDocuments: InvestmentDocs[] = [
  {
    investmentId: 'TD-2024-001',
    property: '1847 Glenoaks Blvd, Glendale',
    documents: [
      { name: 'Trust Deed - TD-2024-001', type: 'Trust Deed', date: '2024-01-15' },
      { name: 'Promissory Note - TD-2024-001', type: 'Promissory Note', date: '2024-01-15' },
      { name: 'Property Appraisal Report', type: 'Appraisal', date: '2024-01-10' },
    ],
  },
  {
    investmentId: 'TD-2024-003',
    property: '2234 W Magnolia Blvd, Burbank',
    documents: [
      { name: 'Trust Deed - TD-2024-003', type: 'Trust Deed', date: '2024-02-01' },
      { name: 'Title Report - Magnolia Blvd', type: 'Title Report', date: '2024-01-28' },
      { name: 'Insurance Certificate', type: 'Insurance', date: '2024-02-01' },
    ],
  },
  {
    investmentId: 'TD-2024-007',
    property: '1502 E Colorado St, Pasadena',
    documents: [
      { name: 'Trust Deed - TD-2024-007', type: 'Trust Deed', date: '2024-06-01' },
      { name: 'Promissory Note - TD-2024-007', type: 'Promissory Note', date: '2024-06-01' },
    ],
  },
];

const typeColors: Record<string, string> = {
  'Trust Deed': 'bg-green-100 text-green-700',
  'Promissory Note': 'bg-blue-100 text-blue-700',
  Appraisal: 'bg-purple-100 text-purple-700',
  'Title Report': 'bg-amber-100 text-amber-700',
  Insurance: 'bg-rose-100 text-rose-700',
};

export default function DocumentsPage() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(investmentDocuments.map((d) => d.investmentId))
  );

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleDownload = (docName: string) => {
    alert(`Document download simulated: ${docName}`);
  };

  const totalDocs = investmentDocuments.reduce((sum, inv) => sum + inv.documents.length, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Documents
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {totalDocs} documents across {investmentDocuments.length} investments
          </p>
        </div>
      </div>

      {/* Document Sections by Investment */}
      <div className="space-y-4">
        {investmentDocuments.map((inv) => {
          const isExpanded = expandedSections.has(inv.investmentId);
          return (
            <div key={inv.investmentId} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(inv.investmentId)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">{inv.investmentId}</h3>
                    <p className="text-sm text-gray-500">{inv.property}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                  {inv.documents.length} docs
                </span>
              </button>

              {/* Documents List */}
              {isExpanded && (
                <div className="border-t border-gray-100">
                  {inv.documents.map((doc, i) => (
                    <div
                      key={i}
                      className="px-6 py-3 flex items-center justify-between border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{doc.name}</p>
                          <p className="text-xs text-gray-400">{doc.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            typeColors[doc.type] || 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {doc.type}
                        </span>
                        <button
                          onClick={() => handleDownload(doc.name)}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-[#3d9b3d]"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info Note */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <p className="text-sm text-green-800">
          <span className="font-semibold">Need additional documents?</span> Contact your investment advisor or
          email <span className="font-medium">docs@primecapitalgroupinc.com</span> to request copies of any investment documents.
        </p>
      </div>
    </div>
  );
}
