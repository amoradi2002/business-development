// VIC Construction email helpers using Resend
const RESEND_KEY = process.env.RESEND_API_KEY;
const FROM = 'VIC Construction <noreply@vicconstruction.com>';

interface SendOpts {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  attachments?: Array<{ filename: string; content: string }>;
}

export async function sendEmail({ to, subject, html, text, attachments }: SendOpts) {
  if (!RESEND_KEY || RESEND_KEY === 'your_key_here') {
    console.log(`📧 EMAIL (demo mode):\nTo: ${to}\nSubject: ${subject}`);
    return { success: true, demo: true };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_KEY}`,
      },
      body: JSON.stringify({
        from: FROM,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        text,
        attachments,
      }),
    });
    return await res.json();
  } catch (e) {
    console.error('Resend error:', e);
    return { success: false, error: String(e) };
  }
}

export function buildVICEmail(title: string, body: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f7f7f7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7;padding:24px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;">
        <tr><td style="background:#1a2744;padding:24px 32px;border-bottom:4px solid #e8702e;">
          <h1 style="margin:0;color:#fff;font-size:28px;letter-spacing:2px;font-weight:700;">VIC CONSTRUCTION</h1>
          <p style="margin:4px 0 0;color:#e8702e;font-size:12px;letter-spacing:1px;">BUILT RIGHT. BUILT TO LAST.</p>
        </td></tr>
        <tr><td style="background:#0f1a2e;padding:14px 32px;">
          <h2 style="margin:0;color:#fff;font-size:16px;font-weight:600;">${title}</h2>
        </td></tr>
        <tr><td style="background:#fff;padding:32px;color:#1a2744;font-size:14px;line-height:1.6;">
          ${body}
        </td></tr>
        <tr><td style="background:#1a2744;padding:20px 32px;color:#fff;font-size:12px;text-align:center;">
          <p style="margin:0 0 4px;font-weight:700;">VIC Construction, Inc.</p>
          <p style="margin:0;color:#a0aec0;">Los Angeles, CA &nbsp;|&nbsp; (818) 200-6274</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
