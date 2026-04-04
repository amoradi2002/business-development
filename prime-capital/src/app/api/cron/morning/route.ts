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
        Good morning, Garik. Here's your daily pipeline summary for <strong>${today}</strong>.
      </p>

      <!-- New Leads -->
      <h3 style="margin:0 0 12px;color:#2d7a2d;font-size:16px;border-bottom:2px solid #2d7a2d;padding-bottom:6px;">
        New Leads (Last 24 Hours)
      </h3>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;background:#f0f7f0;border-radius:6px;border:1px solid #d4e8d4;">
        <tr>
          <td style="padding:12px 16px;">
            <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#333;">Maria Santos</p>
            <p style="margin:0 0 2px;font-size:12px;color:#555;">Purchase &bull; Single Family &bull; $685,000</p>
            <p style="margin:0;font-size:12px;color:#555;">
              1234 Oak Valley Dr, Glendale, CA 91208 &nbsp;|&nbsp;
              <a href="tel:8185551234" style="color:#2d7a2d;">(818) 555-1234</a>
            </p>
          </td>
        </tr>
      </table>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;background:#f0f7f0;border-radius:6px;border:1px solid #d4e8d4;">
        <tr>
          <td style="padding:12px 16px;">
            <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#333;">James Chen</p>
            <p style="margin:0 0 2px;font-size:12px;color:#555;">Refinance &bull; Condo &bull; $420,000</p>
            <p style="margin:0;font-size:12px;color:#555;">
              567 Brand Blvd #304, Glendale, CA 91203 &nbsp;|&nbsp;
              <a href="tel:6265559876" style="color:#2d7a2d;">(626) 555-9876</a>
            </p>
          </td>
        </tr>
      </table>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#f0f7f0;border-radius:6px;border:1px solid #d4e8d4;">
        <tr>
          <td style="padding:12px 16px;">
            <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#333;">Robert Petrosyan</p>
            <p style="margin:0 0 2px;font-size:12px;color:#555;">DSCR &bull; Multi-Family (4-unit) &bull; $1,250,000</p>
            <p style="margin:0;font-size:12px;color:#555;">
              890 N Central Ave, Glendale, CA 91203 &nbsp;|&nbsp;
              <a href="tel:8185557890" style="color:#2d7a2d;">(818) 555-7890</a>
            </p>
          </td>
        </tr>
      </table>

      <!-- Pipeline Summary -->
      <h3 style="margin:0 0 12px;color:#2d7a2d;font-size:16px;border-bottom:2px solid #2d7a2d;padding-bottom:6px;">
        Pipeline Summary
      </h3>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border:1px solid #e0e0e0;border-radius:6px;overflow:hidden;">
        <tr style="background:#2d7a2d;">
          <td style="padding:8px 16px;color:#fff;font-size:13px;font-weight:600;">Stage</td>
          <td style="padding:8px 16px;color:#fff;font-size:13px;font-weight:600;text-align:center;">Count</td>
          <td style="padding:8px 16px;color:#fff;font-size:13px;font-weight:600;text-align:right;">Value</td>
        </tr>
        <tr style="background:#ffffff;">
          <td style="padding:8px 16px;font-size:13px;color:#333;border-bottom:1px solid #eee;">New Lead</td>
          <td style="padding:8px 16px;font-size:13px;color:#333;text-align:center;border-bottom:1px solid #eee;">3</td>
          <td style="padding:8px 16px;font-size:13px;color:#333;text-align:right;border-bottom:1px solid #eee;">$2,355,000</td>
        </tr>
        <tr style="background:#f9f9f9;">
          <td style="padding:8px 16px;font-size:13px;color:#333;border-bottom:1px solid #eee;">Contacted</td>
          <td style="padding:8px 16px;font-size:13px;color:#333;text-align:center;border-bottom:1px solid #eee;">2</td>
          <td style="padding:8px 16px;font-size:13px;color:#333;text-align:right;border-bottom:1px solid #eee;">$1,120,000</td>
        </tr>
        <tr style="background:#ffffff;">
          <td style="padding:8px 16px;font-size:13px;color:#333;border-bottom:1px solid #eee;">Soft Pull Done</td>
          <td style="padding:8px 16px;font-size:13px;color:#333;text-align:center;border-bottom:1px solid #eee;">1</td>
          <td style="padding:8px 16px;font-size:13px;color:#333;text-align:right;border-bottom:1px solid #eee;">$530,000</td>
        </tr>
        <tr style="background:#f9f9f9;">
          <td style="padding:8px 16px;font-size:13px;color:#333;border-bottom:1px solid #eee;">Approved</td>
          <td style="padding:8px 16px;font-size:13px;color:#333;text-align:center;border-bottom:1px solid #eee;">1</td>
          <td style="padding:8px 16px;font-size:13px;color:#333;text-align:right;border-bottom:1px solid #eee;">$780,000</td>
        </tr>
        <tr style="background:#ffffff;">
          <td style="padding:8px 16px;font-size:13px;color:#333;">Closed</td>
          <td style="padding:8px 16px;font-size:13px;color:#333;text-align:center;">1</td>
          <td style="padding:8px 16px;font-size:13px;color:#333;text-align:right;">$615,000</td>
        </tr>
        <tr style="background:#2d7a2d;">
          <td style="padding:10px 16px;color:#fff;font-size:13px;font-weight:700;">TOTAL PIPELINE</td>
          <td style="padding:10px 16px;color:#fff;font-size:13px;font-weight:700;text-align:center;">8</td>
          <td style="padding:10px 16px;color:#fff;font-size:13px;font-weight:700;text-align:right;">$5,400,000</td>
        </tr>
      </table>

      <!-- Follow-Up Needed -->
      <h3 style="margin:0 0 12px;color:#cc3333;font-size:16px;border-bottom:2px solid #cc3333;padding-bottom:6px;">
        &#9888; Follow-Up Needed (New Lead 3+ Days)
      </h3>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;background:#fff5f5;border-radius:6px;border:1px solid #f0c0c0;">
        <tr>
          <td style="padding:12px 16px;">
            <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#cc3333;">Anna Karapetyan</p>
            <p style="margin:0 0 2px;font-size:12px;color:#555;">Purchase &bull; Single Family &bull; $520,000 &bull; <em>5 days in New Lead</em></p>
            <p style="margin:0;font-size:12px;">
              <a href="tel:8185554567" style="color:#cc3333;font-weight:600;">(818) 555-4567 &mdash; Call Now</a>
            </p>
          </td>
        </tr>
      </table>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#fff5f5;border-radius:6px;border:1px solid #f0c0c0;">
        <tr>
          <td style="padding:12px 16px;">
            <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#cc3333;">David Kim</p>
            <p style="margin:0 0 2px;font-size:12px;color:#555;">Refinance &bull; Condo &bull; $380,000 &bull; <em>4 days in New Lead</em></p>
            <p style="margin:0;font-size:12px;">
              <a href="tel:6265558901" style="color:#cc3333;font-weight:600;">(626) 555-8901 &mdash; Call Now</a>
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
    `;

    const html = buildPCGEmail(`Good Morning — Daily Summary`, bodyHtml);

    await sendEmail({
      to: GARIK_EMAIL,
      subject: `PCG Good Morning — Daily Summary ${today}`,
      html,
    });

    return NextResponse.json({ success: true, date: today });
  } catch (error) {
    console.error("morning cron error:", error);
    return NextResponse.json(
      { error: "Failed to send morning summary" },
      { status: 500 }
    );
  }
}
