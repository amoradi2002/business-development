export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey && resendKey !== "your_resend_key_here") {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "PCG <noreply@primecapitalgroupinc.com>",
          to,
          subject,
          html,
        }),
      });
      return await res.json();
    } catch (e) {
      console.log("Resend failed, logging email instead");
    }
  }

  // Demo fallback - log the email
  console.log(
    `📧 EMAIL SENT (demo mode):\nTo: ${to}\nSubject: ${subject}\nBody: [HTML email]`
  );
  return { success: true, demo: true };
}

export function buildPCGEmail(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;">
    <tr>
      <td align="center" style="padding:24px 0;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background-color:#2d7a2d;padding:24px 32px;border-radius:8px 8px 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:2px;">PCG</h1>
                    <p style="margin:4px 0 0;color:#c8e6c8;font-size:13px;letter-spacing:1px;">PRIME CAPITAL GROUP</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title Bar -->
          <tr>
            <td style="background-color:#245e24;padding:12px 32px;">
              <h2 style="margin:0;color:#ffffff;font-size:16px;font-weight:600;">${title}</h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#ffffff;padding:32px;">
              ${bodyHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#2d7a2d;padding:24px 32px;border-radius:0 0 8px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;color:#ffffff;font-size:14px;font-weight:700;">Prime Capital Group, Inc.</p>
                    <p style="margin:0 0 2px;color:#c8e6c8;font-size:12px;">1010 W. Magnolia Blvd. Suite #202, Burbank, CA 91506</p>
                    <p style="margin:0 0 2px;color:#c8e6c8;font-size:12px;">Office: (855) 665-9774 &nbsp;|&nbsp; Direct: (818) 384-8544 &nbsp;|&nbsp; Email: Garik@PrimeCapitalGroupInc.com</p>
                    <p style="margin:0 0 8px;color:#c8e6c8;font-size:12px;">DRE #01726567</p>
                    <hr style="border:none;border-top:1px solid #459945;margin:8px 0;" />
                    <p style="margin:0;color:#a3d4a3;font-size:10px;line-height:1.4;">
                      This is not a loan commitment. All loans subject to approval. Terms and conditions may apply.
                      Equal Housing Lender. This email and any attachments are confidential and intended solely for the
                      addressee. If you are not the intended recipient, please delete this email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
