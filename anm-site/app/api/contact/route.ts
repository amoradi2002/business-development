import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  business?: string;
  phone?: string;
  email?: string;
  businessType?: string;
  message?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  let payload: ContactPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, business, phone, email, businessType, message } = payload;

  if (!name || !business || !phone || !email || !businessType || !message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // In production this should be configured. For local dev without a key
    // we log and return success so the UX still works during testing.
    console.warn(
      "[contact] RESEND_API_KEY not set — lead captured but email not sent:",
      payload
    );
    return NextResponse.json({ ok: true, emailed: false });
  }

  const resend = new Resend(apiKey);

  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "full",
    timeStyle: "short",
  });

  const escaped = {
    name: escapeHtml(name),
    business: escapeHtml(business),
    phone: escapeHtml(phone),
    email: escapeHtml(email),
    businessType: escapeHtml(businessType),
    message: escapeHtml(message).replace(/\n/g, "<br/>"),
    timestamp: escapeHtml(timestamp),
  };

  const html = `
    <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #f7f8fa;">
      <div style="background: linear-gradient(135deg, #0f1a2e 0%, #162236 100%); padding: 32px 28px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #ffffff; font-size: 22px; margin: 0 0 4px 0; font-weight: 700;">New ANM Lead</h1>
        <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 14px;">${escaped.timestamp}</p>
      </div>
      <div style="background: #ffffff; padding: 32px 28px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
        <table cellpadding="0" cellspacing="0" style="width: 100%; font-size: 15px; color: #0f1a2e;">
          <tr><td style="padding: 8px 0; color: #64748b; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${escaped.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Business</td><td style="padding: 8px 0; font-weight: 600;">${escaped.business}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Industry</td><td style="padding: 8px 0; font-weight: 600;">${escaped.businessType}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Phone</td><td style="padding: 8px 0; font-weight: 600;"><a href="tel:${escaped.phone}" style="color: #3b6fe8; text-decoration: none;">${escaped.phone}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Email</td><td style="padding: 8px 0; font-weight: 600;"><a href="mailto:${escaped.email}" style="color: #3b6fe8; text-decoration: none;">${escaped.email}</a></td></tr>
        </table>
        <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
          <div style="color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; margin-bottom: 8px;">Message</div>
          <div style="color: #0f1a2e; font-size: 15px; line-height: 1.6;">${escaped.message}</div>
        </div>
        <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #64748b; font-size: 12px;">
          ANM Software Solutions — We Build AI Platforms for Local Businesses
        </div>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "ANM Leads <onboarding@resend.dev>",
      to: "anmdevlopmentservices@yahoo.com",
      replyTo: email,
      subject: `New ANM Lead — ${name} — ${businessType}`,
      html,
    });
  } catch (err) {
    console.error("[contact] Resend send failed:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again or contact us directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, emailed: true });
}
