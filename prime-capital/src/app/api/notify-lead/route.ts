import { NextRequest, NextResponse } from "next/server";
import { sendEmail, buildPCGEmail } from "@/lib/email";

const GARIK_EMAIL = "garik@primecapitalgroupinc.com";

export async function POST(req: NextRequest) {
  try {
    const lead = await req.json();

    const {
      name = "Unknown",
      phone = "",
      email = "",
      propertyAddress = "",
      loanType = "",
      propertyType = "",
      desiredAmount = "",
      estimatedMonthlyPayment = "",
      ltv = "",
      sourcePage = "",
    } = lead;

    // Build a dynamic "Additional Fields" section from any extra keys we
    // don't already render explicitly above. This lets different tool pages
    // pass their own specific fields without needing route changes.
    const KNOWN_KEYS = new Set([
      "name",
      "firstName",
      "lastName",
      "phone",
      "email",
      "propertyAddress",
      "loanType",
      "propertyType",
      "desiredAmount",
      "estimatedMonthlyPayment",
      "ltv",
      "sourcePage",
    ]);

    const formatLabel = (key: string) =>
      key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (s) => s.toUpperCase())
        .trim();

    const extraRows = Object.entries(lead)
      .filter(([k, v]) => !KNOWN_KEYS.has(k) && v !== "" && v !== null && v !== undefined)
      .map(
        ([k, v], i) => `
        <tr>
          <td style="padding:8px 12px;${i % 2 === 0 ? "background:#f0f7f0;" : ""}border-left:3px solid #2d7a2d;font-size:13px;color:#555;">
            <strong>${formatLabel(k)}:</strong>
          </td>
          <td style="padding:8px 12px;${i % 2 === 0 ? "background:#f0f7f0;" : ""}font-size:13px;color:#333;">
            ${String(v)}
          </td>
        </tr>`
      )
      .join("");

    // ── 1. Notify Garik ──────────────────────────────────────────────

    const garikBody = `
      <p style="margin:0 0 16px;color:#333;font-size:15px;">A new lead just came in through the website${sourcePage ? ` via <strong>${sourcePage}</strong>` : ""}.</p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        <tr>
          <td style="padding:8px 12px;background:#f0f7f0;border-left:3px solid #2d7a2d;font-size:13px;color:#555;">
            <strong>Name:</strong>
          </td>
          <td style="padding:8px 12px;background:#f0f7f0;font-size:13px;color:#333;">
            ${name}
          </td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border-left:3px solid #2d7a2d;font-size:13px;color:#555;">
            <strong>Phone:</strong>
          </td>
          <td style="padding:8px 12px;font-size:13px;color:#333;">
            <a href="tel:${phone}" style="color:#2d7a2d;">${phone}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 12px;background:#f0f7f0;border-left:3px solid #2d7a2d;font-size:13px;color:#555;">
            <strong>Email:</strong>
          </td>
          <td style="padding:8px 12px;background:#f0f7f0;font-size:13px;color:#333;">
            <a href="mailto:${email}" style="color:#2d7a2d;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border-left:3px solid #2d7a2d;font-size:13px;color:#555;">
            <strong>Property Address:</strong>
          </td>
          <td style="padding:8px 12px;font-size:13px;color:#333;">
            ${propertyAddress || "Not provided"}
          </td>
        </tr>
        <tr>
          <td style="padding:8px 12px;background:#f0f7f0;border-left:3px solid #2d7a2d;font-size:13px;color:#555;">
            <strong>Loan Type:</strong>
          </td>
          <td style="padding:8px 12px;background:#f0f7f0;font-size:13px;color:#333;">
            ${loanType || "Not specified"}
          </td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border-left:3px solid #2d7a2d;font-size:13px;color:#555;">
            <strong>Property Type:</strong>
          </td>
          <td style="padding:8px 12px;font-size:13px;color:#333;">
            ${propertyType || "Not specified"}
          </td>
        </tr>
        <tr>
          <td style="padding:8px 12px;background:#f0f7f0;border-left:3px solid #2d7a2d;font-size:13px;color:#555;">
            <strong>Desired Amount:</strong>
          </td>
          <td style="padding:8px 12px;background:#f0f7f0;font-size:13px;color:#333;">
            ${desiredAmount ? `$${Number(desiredAmount).toLocaleString()}` : "Not specified"}
          </td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border-left:3px solid #2d7a2d;font-size:13px;color:#555;">
            <strong>Est. Monthly Payment:</strong>
          </td>
          <td style="padding:8px 12px;font-size:13px;color:#333;">
            ${estimatedMonthlyPayment ? `$${Number(estimatedMonthlyPayment).toLocaleString()}` : "Not specified"}
          </td>
        </tr>
        <tr>
          <td style="padding:8px 12px;background:#f0f7f0;border-left:3px solid #2d7a2d;font-size:13px;color:#555;">
            <strong>LTV:</strong>
          </td>
          <td style="padding:8px 12px;background:#f0f7f0;font-size:13px;color:#333;">
            ${ltv ? `${ltv}%` : "Not specified"}
          </td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border-left:3px solid #2d7a2d;font-size:13px;color:#555;">
            <strong>Source Page:</strong>
          </td>
          <td style="padding:8px 12px;font-size:13px;color:#333;">
            ${sourcePage || "Website"}
          </td>
        </tr>
        ${extraRows}
      </table>

      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
        <tr>
          <td style="border-radius:6px;background-color:#2d7a2d;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL || "https://primecapitalgroupinc.com"}/admin/leads"
               style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;">
              View in Dashboard &rarr;
            </a>
          </td>
        </tr>
      </table>
    `;

    const garikHtml = buildPCGEmail(
      `New Lead — ${name}${sourcePage ? ` — ${sourcePage}` : ""}`,
      garikBody
    );

    await sendEmail({
      to: GARIK_EMAIL,
      subject: `New PCG Lead — ${name} — ${sourcePage || loanType || "General Inquiry"}`,
      html: garikHtml,
    });

    // ── 2. Welcome email to lead ─────────────────────────────────────

    if (email) {
      const leadBody = `
        <p style="margin:0 0 16px;color:#333;font-size:15px;">Dear ${name},</p>

        <p style="margin:0 0 16px;color:#333;font-size:15px;">
          Thank you for reaching out to <strong>Prime Capital Group</strong>. We have received your
          loan request and a member of our team will be in touch with you shortly.
        </p>

        <p style="margin:0 0 8px;color:#333;font-size:14px;font-weight:600;">Your Request Summary:</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#f9f9f9;border-radius:6px;">
          <tr>
            <td style="padding:12px 16px;font-size:13px;color:#555;">
              ${loanType ? `<strong>Loan Type:</strong> ${loanType}<br/>` : ""}
              ${propertyType ? `<strong>Property Type:</strong> ${propertyType}<br/>` : ""}
              ${desiredAmount ? `<strong>Requested Amount:</strong> $${Number(desiredAmount).toLocaleString()}<br/>` : ""}
              ${propertyAddress ? `<strong>Property:</strong> ${propertyAddress}` : ""}
            </td>
          </tr>
        </table>

        <p style="margin:0 0 16px;color:#333;font-size:15px;">
          If you have any questions in the meantime, please don't hesitate to reach out:
        </p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#f0f7f0;border-radius:6px;border:1px solid #d4e8d4;">
          <tr>
            <td style="padding:16px;">
              <p style="margin:0 0 4px;color:#333;font-size:14px;font-weight:700;">Garik Gharibyan</p>
              <p style="margin:0 0 2px;color:#555;font-size:13px;">President &amp; Broker</p>
              <p style="margin:0 0 2px;color:#555;font-size:13px;">
                Phone: <a href="tel:8189847388" style="color:#2d7a2d;">(818) 984-7388</a>
              </p>
              <p style="margin:0;color:#555;font-size:13px;">
                Email: <a href="mailto:garik@primecapitalgroupinc.com" style="color:#2d7a2d;">garik@primecapitalgroupinc.com</a>
              </p>
            </td>
          </tr>
        </table>

        <p style="margin:0;color:#333;font-size:15px;">
          We look forward to helping you achieve your financial goals.
        </p>

        <p style="margin:16px 0 0;color:#333;font-size:15px;">
          Warm regards,<br/>
          <strong>The Prime Capital Group Team</strong>
        </p>
      `;

      const leadHtml = buildPCGEmail("We Received Your Request", leadBody);

      await sendEmail({
        to: email,
        subject: "Prime Capital Group — We Received Your Request",
        html: leadHtml,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("notify-lead error:", error);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}
