export function exportLeadToPDF(lead: any) {
  const win = window.open('', '_blank');
  if (!win) return;

  const score = lead.score || 0;
  const scoreLabel = score >= 8 ? 'Hot' : score >= 5 ? 'Warm' : 'Cold';
  const scoreColor = score >= 8 ? '#22c55e' : score >= 5 ? '#eab308' : '#9ca3af';

  win.document.write(`
    <html><head><title>PCG Lead - ${lead.name}</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 0; padding: 0; color: #1a1a1a; }
      .header { background: #2d7a2d; color: white; padding: 24px 32px; }
      .header h1 { margin: 0; font-size: 24px; }
      .header p { margin: 4px 0 0; opacity: 0.8; font-size: 14px; }
      .content { padding: 32px; }
      .section { margin-bottom: 24px; }
      .section h2 { font-size: 16px; color: #2d7a2d; border-bottom: 2px solid #2d7a2d; padding-bottom: 4px; margin-bottom: 12px; }
      .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
      .field { margin-bottom: 8px; }
      .field .label { font-size: 11px; color: #666; text-transform: uppercase; }
      .field .value { font-size: 14px; font-weight: 600; }
      .score { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 700; color: white; background: ${scoreColor}; }
      .footer { border-top: 1px solid #ddd; padding: 16px 32px; font-size: 11px; color: #999; text-align: center; }
      @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
    </style></head><body>
    <div class="header">
      <h1>PCG</h1>
      <p>Prime Capital Group, Inc. — Lead Summary</p>
    </div>
    <div class="content">
      <div class="section">
        <h2>Contact Information <span class="score">${scoreLabel} (${score}/10)</span></h2>
        <div class="grid">
          <div class="field"><div class="label">Name</div><div class="value">${lead.name || 'N/A'}</div></div>
          <div class="field"><div class="label">Phone</div><div class="value">${lead.phone || 'N/A'}</div></div>
          <div class="field"><div class="label">Email</div><div class="value">${lead.email || 'N/A'}</div></div>
          <div class="field"><div class="label">Property Address</div><div class="value">${lead.propertyAddress || 'N/A'}</div></div>
        </div>
      </div>
      <div class="section">
        <h2>Loan Details</h2>
        <div class="grid">
          <div class="field"><div class="label">Loan Type</div><div class="value">${lead.loanType || 'N/A'}</div></div>
          <div class="field"><div class="label">Property Type</div><div class="value">${lead.propertyType || 'N/A'}</div></div>
          <div class="field"><div class="label">Property Value</div><div class="value">$${(lead.propertyValue || 0).toLocaleString()}</div></div>
          <div class="field"><div class="label">Desired Amount</div><div class="value">$${(lead.desiredAmount || 0).toLocaleString()}</div></div>
          <div class="field"><div class="label">LTV</div><div class="value">${lead.ltv || 0}%</div></div>
          <div class="field"><div class="label">Interest Rate</div><div class="value">${lead.interestRate || 0}%</div></div>
          <div class="field"><div class="label">Loan Term</div><div class="value">${lead.loanTerm || 'N/A'}</div></div>
          <div class="field"><div class="label">Monthly Payment</div><div class="value">$${(lead.monthlyPayment || 0).toLocaleString()}</div></div>
        </div>
      </div>
      <div class="section">
        <h2>Internal Notes</h2>
        <p style="font-size:13px;white-space:pre-wrap">${lead.notes || 'No notes'}</p>
      </div>
      <div class="section">
        <h2>Status</h2>
        <p style="font-size:14px;font-weight:600">${lead.status || 'New'}</p>
      </div>
    </div>
    <div class="footer">
      Confidential — Prime Capital Group, Inc. | DRE #01726567 | Generated ${new Date().toLocaleDateString()}
    </div>
    </body></html>
  `);
  win.document.close();
  win.print();
}
