export function calculateLeadScore(lead: any): number {
  let score = 0;
  const ltv = lead.ltv || 0;
  const amount = lead.desiredAmount || lead.loanAmount || 0;

  // LTV scoring
  if (ltv > 0 && ltv < 60) score += 3;
  else if (ltv >= 60 && ltv <= 70) score += 2;
  else if (ltv > 70) score += 1;

  // Loan amount
  if (amount > 500000) score += 2;
  else if (amount >= 200000) score += 1;

  // Property type
  const pType = (lead.propertyType || '').toLowerCase();
  if (pType.includes('single') || pType.includes('sfr') || pType.includes('multifamily') || pType.includes('multi')) score += 1;

  // Contact info
  if (lead.phone) score += 1;
  if (lead.email) score += 1;

  return Math.min(score, 10);
}

export function getScoreLabel(score: number): { label: string; color: string; bg: string } {
  if (score >= 8) return { label: 'Hot', color: 'text-green-800', bg: 'bg-green-100' };
  if (score >= 5) return { label: 'Warm', color: 'text-yellow-800', bg: 'bg-yellow-100' };
  return { label: 'Cold', color: 'text-gray-600', bg: 'bg-gray-100' };
}
