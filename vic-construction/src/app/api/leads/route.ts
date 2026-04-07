import { NextRequest, NextResponse } from 'next/server';
import { addLead } from '@/lib/store';
import { sendEmail, buildVICEmail } from '@/lib/email';

const SMS_GATEWAY = '8182006274@tmomail.net';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      name = '',
      phone = '',
      email = '',
      service = '',
      address = '',
      city = '',
      zip = '',
      description = '',
      timeline = '',
    } = data;

    // Save to server-side store
    const lead = addLead({ name, phone, email, service, address, city, zip, description, timeline });

    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });

    // 1. INSTANT TEXT NOTIFICATION (short SMS-style)
    await sendEmail({
      to: SMS_GATEWAY,
      subject: 'New VIC Lead',
      text: `New Lead - ${name}\nPhone: ${phone}\nService: ${service}\nTimeline: ${timeline}\nCall them now`,
      html: `<p>New Lead - ${name}<br>Phone: ${phone}<br>Service: ${service}<br>Timeline: ${timeline}<br>Call them now</p>`,
    });

    // 2. FULL EMAIL NOTIFICATION (detailed)
    const fullBody = `
      <p style="margin:0 0 16px;font-size:15px;"><strong>A new lead just came in.</strong></p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr><td style="padding:10px;background:#f7f7f7;border-left:3px solid #e8702e;width:160px;"><strong>Name:</strong></td><td style="padding:10px;background:#f7f7f7;">${name}</td></tr>
        <tr><td style="padding:10px;border-left:3px solid #e8702e;"><strong>Phone:</strong></td><td style="padding:10px;"><a href="tel:${phone}" style="color:#e8702e;">${phone}</a></td></tr>
        <tr><td style="padding:10px;background:#f7f7f7;border-left:3px solid #e8702e;"><strong>Email:</strong></td><td style="padding:10px;background:#f7f7f7;"><a href="mailto:${email}" style="color:#e8702e;">${email}</a></td></tr>
        <tr><td style="padding:10px;border-left:3px solid #e8702e;"><strong>Service:</strong></td><td style="padding:10px;">${service}</td></tr>
        <tr><td style="padding:10px;background:#f7f7f7;border-left:3px solid #e8702e;"><strong>Address:</strong></td><td style="padding:10px;background:#f7f7f7;">${address}</td></tr>
        <tr><td style="padding:10px;border-left:3px solid #e8702e;"><strong>City:</strong></td><td style="padding:10px;">${city}</td></tr>
        <tr><td style="padding:10px;background:#f7f7f7;border-left:3px solid #e8702e;"><strong>Zip:</strong></td><td style="padding:10px;background:#f7f7f7;">${zip}</td></tr>
        <tr><td style="padding:10px;border-left:3px solid #e8702e;"><strong>Timeline:</strong></td><td style="padding:10px;">${timeline}</td></tr>
        <tr><td style="padding:10px;background:#f7f7f7;border-left:3px solid #e8702e;vertical-align:top;"><strong>Description:</strong></td><td style="padding:10px;background:#f7f7f7;">${description || 'N/A'}</td></tr>
        <tr><td style="padding:10px;border-left:3px solid #e8702e;"><strong>Submitted:</strong></td><td style="padding:10px;color:#666;">${timestamp}</td></tr>
      </table>
    `;
    await sendEmail({
      to: SMS_GATEWAY,
      subject: `New VIC Construction Lead — ${name} — ${service}`,
      html: buildVICEmail('New Lead Notification', fullBody),
    });

    // 3. CUSTOMER CONFIRMATION EMAIL
    if (email) {
      const customerBody = `
        <p style="margin:0 0 16px;font-size:15px;">Hi ${name.split(' ')[0]},</p>
        <p style="margin:0 0 16px;font-size:15px;">Thank you for reaching out to <strong>VIC Construction</strong>. We've received your request and will contact you within 24 hours to schedule your free estimate.</p>
        <p style="margin:0 0 16px;font-size:15px;">In the meantime, you can call us directly at <a href="tel:8182006274" style="color:#e8702e;font-weight:700;">(818) 200-6274</a>.</p>
        <p style="margin:24px 0 0;font-size:15px;">— VIC Construction, Inc.<br><span style="color:#e8702e;font-weight:700;">Built Right. Built to Last.</span></p>
      `;
      await sendEmail({
        to: email,
        subject: 'VIC Construction — We Got Your Request',
        html: buildVICEmail("We've Received Your Request", customerBody),
      });
    }

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json({ error: 'Failed to submit lead' }, { status: 500 });
  }
}
