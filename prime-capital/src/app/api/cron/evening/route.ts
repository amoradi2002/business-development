import { NextResponse } from "next/server";
import { sendEmail, buildPCGEmail } from "@/lib/email";

const GARIK_EMAIL = "garik@primecapitalgroupinc.com";

export async function GET() {
  try {
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const bodyHtml = `
      <p style="margin:0 0 20px;color:#333;font-size:15px;">
        End of day report for <strong>${today}</strong>. Here's what happened today and what needs attention tomorrow.
      </p>

      <!-- Today's Activity -->
      <h3 style="margin:0 0 12px;color:#2d7a2d;font-size:16px;border-bottom:2px solid #2d7a2d;padding-bottom:6px;">
        Today's Activity
      </h3>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        <tr>
          <td width="33%" style="padding:12px;text-align:center;background:#f0f7f0;border-radius:6px 0 0 6px;border:1px solid #d4e8d4;">
            <p style="margin:0;font-size:28px;font-weight:700;color:#2d7a2d;">3</p>
            <p style="margin:4px 0 0;font-size:11px;color:#555;text-transform:uppercase;letter-spacing:1px;">New Leads</p>
          </td>
          <td width="34%" style="padding:12px;text-align:center;background:#f0f7f0;border:1px solid #d4e8d4;border-left:none;border-right:none;">
            <p style="margin:0;font-size:28px;font-weight:700;color:#2d7a2d;">5</p>
            <p style="margin:4px 0 0;font-size:11px;color:#555;text-transform:uppercase;letter-spacing:1px;">Status Changes</p>
          </td>
          <td width="33%" style="padding:12px;text-align:center;background:#f0f7f0;border-radius:0 6px 6px 0;border:1px solid #d4e8d4;">
            <p style="margin:0;font-size:28px;font-weight:700;color:#2d7a2d;">7</p>
            <p style="margin:4px 0 0;font-size:11px;color:#555;text-transform:uppercase;letter-spacing:1px;">Calls Made</p>
          </td>
        </tr>
      </table>

      <!-- Pipeline Movement -->
      <h3 style="margin:0 0 12px;color:#2d7a2d;font-size:16px;border-bottom:2px solid #2d7a2d;padding-bottom:6px;">
        Pipeline Movement
      </h3>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        <tr>
          <td style="padding:8px 12px;font-size:13px;color:#555;background:#f9f9f9;border-bottom:1px solid #eee;">
            <span style="color:#2d7a2d;">&#9654;</span>&nbsp; Maria Santos moved from <strong>New Lead</strong> to <strong>Contacted</strong>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-size:13px;color:#555;border-bottom:1px solid #eee;">
            <span style="color:#2d7a2d;">&#9654;</span>&nbsp; Kevin Nguyen moved from <strong>Contacted</strong> to <strong>Soft Pull Done</strong>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-size:13px;color:#555;background:#f9f9f9;border-bottom:1px solid #eee;">
            <span style="color:#2d7a2d;">&#9654;</span>&nbsp; Sarah Thompson moved from <strong>Soft Pull Done</strong> to <strong>Approved</strong>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-size:13px;color:#555;border-bottom:1px solid #eee;">
            <span style="color:#2d7a2d;">&#9654;</span>&nbsp; Michael Avetisyan moved from <strong>Approved</strong> to <strong>Docs Sent</strong>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-size:13px;color:#555;background:#f9f9f9;">
            <span style="color:#2d7a2d;">&#10003;</span>&nbsp; Lisa Park — <strong>CLOSED</strong> &mdash; $615,000 Purchase
          </td>
        </tr>
      </table>

      <!-- Stage Counts & Pipeline Value -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border:1px solid #e0e0e0;border-radius:6px;overflow:hidden;">
        <tr style="background:#2d7a2d;">
          <td style="padding:8px 16px;color:#fff;font-size:13px;font-weight:600;">Stage</td>
          <td style="padding:8px 16px;color:#fff;font-size:13px;font-weight:600;text-align:center;">Count</td>
          <td style="padding:8px 16px;color:#fff;font-size:13px;font-weight:600;text-align:right;">Value</td>
        </tr>
        <tr style="background:#ffffff;">
          <td style="padding:8px 16px;font-size:13px;color:#333;border-bottom:1px solid #eee;">New Lead</td>
          <td style="padding:8px 16px;font-size:13px;color:#333;text-align:center;border-bottom:1px solid #eee;">2</td>
          <td style="padding:8px 16px;font-size:13px;color:#333;text-align:right;border-bottom:1px solid #eee;">$1,670,000</td>
        </tr>
        <tr style="background:#f9f9f9;">
          <td style="padding:8px 16px;font-size:13px;color:#333;border-bottom:1px solid #eee;">Contacted</td>
          <td style="padding:8px 16px;font-size:13px;color:#333;text-align:center;border-bottom:1px solid #eee;">3</td>
          <td style="padding:8px 16px;font-size:13px;color:#333;text-align:right;border-bottom:1px solid #eee;">$1,805,000</td>
        </tr>
        <tr style="background:#ffffff;">
          <td style="padding:8px 16px;font-size:13px;color:#333;border-bottom:1px solid #eee;">Soft Pull Done</td>
          <td style="padding:8px 16px;font-size:13px;color:#333;text-align:center;border-bottom:1px solid #eee;">1</td>
          <td style="padding:8px 16px;font-size:13px;color:#333;text-align:right;border-bottom:1px solid #eee;">$420,000</td>
        </tr>
        <tr style="background:#f9f9f9;">
          <td style="padding:8px 16px;font-size:13px;color:#333;border-bottom:1px solid #eee;">Approved</td>
          <td style="padding:8px 16px;font-size:13px;color:#333;text-align:center;border-bottom:1px solid #eee;">1</td>
          <td style="padding:8px 16px;font-size:13px;color:#333;text-align:right;border-bottom:1px solid #eee;">$780,000</td>
        </tr>
        <tr style="background:#ffffff;">
          <td style="padding:8px 16px;font-size:13px;color:#333;border-bottom:1px solid #eee;">Docs Sent</td>
          <td style="padding:8px 16px;font-size:13px;color:#333;text-align:center;border-bottom:1px solid #eee;">1</td>
          <td style="padding:8px 16px;font-size:13px;color:#333;text-align:right;border-bottom:1px solid #eee;">$950,000</td>
        </tr>
        <tr style="background:#f9f9f9;">
          <td style="padding:8px 16px;font-size:13px;color:#333;">Closed (today)</td>
          <td style="padding:8px 16px;font-size:13px;color:#333;text-align:center;">1</td>
          <td style="padding:8px 16px;font-size:13px;color:#333;text-align:right;">$615,000</td>
        </tr>
        <tr style="background:#2d7a2d;">
          <td style="padding:10px 16px;color:#fff;font-size:13px;font-weight:700;">TOTAL PIPELINE</td>
          <td style="padding:10px 16px;color:#fff;font-size:13px;font-weight:700;text-align:center;">9</td>
          <td style="padding:10px 16px;color:#fff;font-size:13px;font-weight:700;text-align:right;">$6,240,000</td>
        </tr>
      </table>

      <!-- Today's Highlights -->
      <h3 style="margin:0 0 12px;color:#2d7a2d;font-size:16px;border-bottom:2px solid #2d7a2d;padding-bottom:6px;">
        Today's Highlights
      </h3>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;background:#f0f7f0;border-radius:6px;border:1px solid #d4e8d4;">
        <tr>
          <td style="padding:12px 16px;">
            <p style="margin:0 0 4px;font-size:13px;color:#2d7a2d;font-weight:600;">&#127942; Highest Value Lead Today</p>
            <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#333;">Robert Petrosyan</p>
            <p style="margin:0;font-size:12px;color:#555;">DSCR &bull; Multi-Family (4-unit) &bull; $1,250,000 &bull; 890 N Central Ave, Glendale</p>
          </td>
        </tr>
      </table>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#f0f7f0;border-radius:6px;border:1px solid #d4e8d4;">
        <tr>
          <td style="padding:12px 16px;">
            <p style="margin:0 0 4px;font-size:13px;color:#2d7a2d;font-weight:600;">&#127881; Deal Closed</p>
            <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#333;">Lisa Park</p>
            <p style="margin:0;font-size:12px;color:#555;">Purchase &bull; Single Family &bull; $615,000 &bull; Pasadena, CA</p>
          </td>
        </tr>
      </table>

      <!-- Follow-Up Reminders -->
      <h3 style="margin:0 0 12px;color:#cc3333;font-size:16px;border-bottom:2px solid #cc3333;padding-bottom:6px;">
        &#9888; Follow-Up Reminders
      </h3>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;background:#fff5f5;border-radius:6px;border:1px solid #f0c0c0;">
        <tr>
          <td style="padding:12px 16px;">
            <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#cc3333;">Anna Karapetyan</p>
            <p style="margin:0 0 2px;font-size:12px;color:#555;">Purchase &bull; $520,000 &bull; <em>5 days in New Lead — no contact yet</em></p>
            <p style="margin:0;font-size:12px;">
              <a href="tel:8185554567" style="color:#cc3333;font-weight:600;">(818) 555-4567 &mdash; Call Now</a>
            </p>
          </td>
        </tr>
      </table>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;background:#fff5f5;border-radius:6px;border:1px solid #f0c0c0;">
        <tr>
          <td style="padding:12px 16px;">
            <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#cc3333;">David Kim</p>
            <p style="margin:0 0 2px;font-size:12px;color:#555;">Refinance &bull; $380,000 &bull; <em>4 days in New Lead — no contact yet</em></p>
            <p style="margin:0;font-size:12px;">
              <a href="tel:6265558901" style="color:#cc3333;font-weight:600;">(626) 555-8901 &mdash; Call Now</a>
            </p>
          </td>
        </tr>
      </table>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#fffbeb;border-radius:6px;border:1px solid #f0e0a0;">
        <tr>
          <td style="padding:12px 16px;">
            <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#b8860b;">Kevin Nguyen</p>
            <p style="margin:0 0 2px;font-size:12px;color:#555;">Soft Pull Done &bull; $530,000 &bull; <em>Waiting on borrower docs for 2 days</em></p>
            <p style="margin:0;font-size:12px;">
              <a href="tel:8185556789" style="color:#b8860b;font-weight:600;">(818) 555-6789 &mdash; Follow Up</a>
            </p>
          </td>
        </tr>
      </table>

      <!-- CTA -->
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
        <tr>
          <td style="border-radius:6px;background-color:#2d7a2d;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL || "https://primecapitalgroupinc.com"}/admin/leads"
               style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;">
              Open Dashboard &rarr;
            </a>
          </td>
        </tr>
      </table>

      <p style="margin:24px 0 0;color:#888;font-size:12px;text-align:center;">
        Have a great evening. Tomorrow's morning summary arrives at 8:00 AM PT.
      </p>
    `;

    const html = buildPCGEmail(`End of Day Report`, bodyHtml);

    await sendEmail({
      to: GARIK_EMAIL,
      subject: `PCG End of Day Report — ${today}`,
      html,
    });

    return NextResponse.json({ success: true, date: today });
  } catch (error) {
    console.error("evening cron error:", error);
    return NextResponse.json(
      { error: "Failed to send evening report" },
      { status: 500 }
    );
  }
}
