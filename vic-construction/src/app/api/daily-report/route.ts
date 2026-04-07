import { NextResponse } from 'next/server';
import jsPDF from 'jspdf';
import { getLeadsToday, getLeadsThisWeek } from '@/lib/store';
import { sendEmail, buildVICEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

const REPORT_RECIPIENTS = ['8182006274@tmomail.net', 'info@vicconstruction.com'];

export async function GET() {
  try {
    const leadsToday = getLeadsToday();
    const leadsWeek = getLeadsThisWeek();

    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      timeZone: 'America/Los_Angeles',
    });

    // Generate PDF with jsPDF
    const doc = new jsPDF();

    // Header bar — dark navy with orange accent
    doc.setFillColor(26, 39, 68);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setFillColor(232, 112, 46);
    doc.rect(0, 30, 210, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('VIC CONSTRUCTION', 20, 18);
    doc.setFontSize(9);
    doc.setTextColor(232, 112, 46);
    doc.text('BUILT RIGHT. BUILT TO LAST.', 20, 25);

    // Title
    doc.setTextColor(26, 39, 68);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Daily Lead Report', 20, 48);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(today, 20, 56);

    // Stats
    doc.setFillColor(247, 247, 247);
    doc.roundedRect(20, 64, 170, 18, 2, 2, 'F');
    doc.setTextColor(26, 39, 68);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`Leads Today: ${leadsToday.length}`, 26, 75);
    doc.text(`Leads This Week: ${leadsWeek.length}`, 110, 75);

    let y = 92;

    if (leadsToday.length === 0) {
      doc.setFontSize(11);
      doc.setTextColor(120, 120, 120);
      doc.setFont('helvetica', 'italic');
      doc.text('No leads submitted today.', 20, y);
    } else {
      doc.setFontSize(13);
      doc.setTextColor(26, 39, 68);
      doc.setFont('helvetica', 'bold');
      doc.text("Today's Leads", 20, y);
      y += 8;

      leadsToday.forEach((lead, idx) => {
        if (y > 250) {
          doc.addPage();
          y = 20;
        }

        // Card background
        doc.setFillColor(247, 247, 247);
        doc.roundedRect(20, y, 170, 50, 2, 2, 'F');
        doc.setFillColor(232, 112, 46);
        doc.rect(20, y, 2, 50, 'F');

        doc.setTextColor(26, 39, 68);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`${idx + 1}. ${lead.name}`, 26, y + 7);

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 80);
        doc.text(`Phone: ${lead.phone}`, 26, y + 14);
        doc.text(`Email: ${lead.email}`, 26, y + 20);
        doc.text(`Service: ${lead.service}`, 26, y + 26);
        doc.text(`Address: ${lead.address}, ${lead.city} ${lead.zip}`, 26, y + 32);
        doc.text(`Timeline: ${lead.timeline}`, 26, y + 38);
        const time = new Date(lead.submittedAt).toLocaleTimeString('en-US', {
          hour: '2-digit', minute: '2-digit', timeZone: 'America/Los_Angeles',
        });
        doc.text(`Submitted: ${time}`, 26, y + 44);

        y += 56;
      });
    }

    // Footer
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.setFillColor(26, 39, 68);
    doc.rect(0, 287, 210, 10, 'F');
    doc.setTextColor(232, 112, 46);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Powered by ANM Software Solutions', 105, 293, { align: 'center' });

    const pdfBase64 = doc.output('datauristring').split(',')[1];

    // Send email with PDF attachment
    const emailBody = `
      <p style="margin:0 0 16px;font-size:15px;">Here's your daily lead report from VIC Construction.</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
        <tr><td style="padding:10px;background:#f7f7f7;border-left:3px solid #e8702e;width:200px;"><strong>Date:</strong></td><td style="padding:10px;background:#f7f7f7;">${today}</td></tr>
        <tr><td style="padding:10px;border-left:3px solid #e8702e;"><strong>Leads Today:</strong></td><td style="padding:10px;font-size:18px;color:#e8702e;font-weight:700;">${leadsToday.length}</td></tr>
        <tr><td style="padding:10px;background:#f7f7f7;border-left:3px solid #e8702e;"><strong>Leads This Week:</strong></td><td style="padding:10px;background:#f7f7f7;">${leadsWeek.length}</td></tr>
      </table>
      <p style="margin:16px 0 0;font-size:13px;color:#666;">Full PDF report attached.</p>
    `;

    await sendEmail({
      to: REPORT_RECIPIENTS,
      subject: `VIC Daily Report — ${leadsToday.length} new leads — ${today}`,
      html: buildVICEmail('Daily Lead Report', emailBody),
      attachments: [
        {
          filename: `vic-daily-report-${new Date().toISOString().split('T')[0]}.pdf`,
          content: pdfBase64,
        },
      ],
    });

    return NextResponse.json({ success: true, leadsToday: leadsToday.length, leadsWeek: leadsWeek.length });
  } catch (error) {
    console.error('Daily report error:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}
