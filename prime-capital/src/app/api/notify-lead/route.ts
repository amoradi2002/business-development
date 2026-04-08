import { NextRequest, NextResponse } from "next/server";
import { sendEmail, buildPCGEmail } from "@/lib/email";

const GARIK_EMAIL = "Garik@PrimeCapitalGroupInc.com";

/* ─────────── helpers ─────────── */

const row = (label: string, value: string | number | undefined, zebra = false) => {
  const v = value === undefined || value === "" || value === null ? "Not provided" : String(value);
  return `
    <tr>
      <td style="padding:8px 12px;${zebra ? "background:#f0f7f0;" : ""}border-left:3px solid #2d7a2d;font-size:13px;color:#555;width:40%;">
        <strong>${label}:</strong>
      </td>
      <td style="padding:8px 12px;${zebra ? "background:#f0f7f0;" : ""}font-size:13px;color:#333;">
        ${v}
      </td>
    </tr>`;
};

const money = (v: unknown) => {
  if (v === undefined || v === null || v === "") return "";
  const n = typeof v === "number" ? v : parseFloat(String(v).replace(/[^0-9.]/g, ""));
  if (isNaN(n)) return String(v);
  return `$${n.toLocaleString()}`;
};

const now = () =>
  new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "full",
    timeStyle: "short",
  });

const firstNameOf = (full: string) => (full || "").trim().split(/\s+/)[0] || "there";

/* ─────────── per-form email builders ─────────── */

function investorEmails(lead: any) {
  const firstName = lead.firstName || "";
  const lastName = lead.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const email = lead.email || "";
  const subscribed = lead.emailUpdates ? "Yes" : "No";
  const timestamp = now();

  const garikBody = `
    <p style="margin:0 0 16px;color:#333;font-size:15px;">New investor inquiry received on your website.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${row("Name", fullName, true)}
      ${row("Email", `<a href="mailto:${email}" style="color:#2d7a2d;">${email}</a>`)}
      ${row("Subscribed to updates", subscribed, true)}
      ${row("Submitted", timestamp)}
    </table>
    <p style="margin:0;color:#333;font-size:15px;">
      This person is interested in investing with PCG. Follow up as soon as possible.
    </p>
  `;

  const leadBody = `
    <p style="margin:0 0 16px;color:#333;font-size:15px;">Hi ${firstNameOf(fullName)},</p>
    <p style="margin:0 0 16px;color:#333;font-size:15px;">
      Thank you for your interest in investing with Prime Capital Group. Garik Hadjinian will personally
      reach out to discuss investment opportunities with you.
    </p>
    <p style="margin:0 0 16px;color:#333;font-size:15px;">
      Call directly at <a href="tel:8183848544" style="color:#2d7a2d;font-weight:600;">(818) 384-8544</a>.
    </p>
    <p style="margin:0;color:#333;font-size:14px;">— Prime Capital Group, Inc.<br/>DRE #01726567</p>
  `;

  return {
    garik: {
      to: GARIK_EMAIL,
      subject: `New Investor Inquiry — ${fullName}`,
      html: buildPCGEmail(`New Investor Inquiry — ${fullName}`, garikBody),
    },
    lead: email
      ? {
          to: email,
          subject: "Prime Capital Group — We Received Your Inquiry",
          html: buildPCGEmail("We Received Your Inquiry", leadBody),
        }
      : null,
  };
}

function brokerEmails(lead: any) {
  const {
    brokerName = "",
    companyName = "",
    phone = "",
    email = "",
    propertyAddress = "",
    propertyCity = "",
    zipCode = "",
    loanAmount = "",
    propertyValue = "",
    loanPurpose = "",
    borrowerScenario = "",
  } = lead;
  const timestamp = now();

  const garikBody = `
    <p style="margin:0 0 16px;color:#333;font-size:15px;">New broker inquiry received.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${row("Broker Name", brokerName, true)}
      ${row("Company", companyName)}
      ${row("Phone", `<a href="tel:${phone}" style="color:#2d7a2d;">${phone}</a>`, true)}
      ${row("Email", `<a href="mailto:${email}" style="color:#2d7a2d;">${email}</a>`)}
      ${row("Property Address", propertyAddress, true)}
      ${row("City", propertyCity)}
      ${row("Zip", zipCode, true)}
      ${row("Loan Amount", money(loanAmount))}
      ${row("Property Value", money(propertyValue), true)}
      ${row("Loan Purpose", loanPurpose)}
      ${row("Borrower Scenario", borrowerScenario, true)}
      ${row("Submitted", timestamp)}
    </table>
  `;

  const leadBody = `
    <p style="margin:0 0 16px;color:#333;font-size:15px;">Hi ${firstNameOf(brokerName)},</p>
    <p style="margin:0 0 16px;color:#333;font-size:15px;">
      Thank you for submitting your deal to Prime Capital Group. Garik will review it and reach out
      within 24 hours.
    </p>
    <p style="margin:0 0 16px;color:#333;font-size:15px;">
      Call directly at <a href="tel:8183848544" style="color:#2d7a2d;font-weight:600;">(818) 384-8544</a>.
    </p>
    <p style="margin:0;color:#333;font-size:14px;">— Prime Capital Group, Inc.<br/>DRE #01726567</p>
  `;

  return {
    garik: {
      to: GARIK_EMAIL,
      subject: `New Broker Lead — ${brokerName} — ${companyName}`,
      html: buildPCGEmail(`New Broker Lead — ${brokerName}`, garikBody),
    },
    lead: email
      ? {
          to: email,
          subject: "Prime Capital Group — We Received Your Submission",
          html: buildPCGEmail("We Received Your Submission", leadBody),
        }
      : null,
  };
}

function realtorEmails(lead: any) {
  const {
    realtorName = "",
    licenseNumber = "",
    phone = "",
    email = "",
    propertyAddress = "",
    estimatedPropertyValue = "",
    loanAmountNeeded = "",
    clientScenario = "",
  } = lead;
  const timestamp = now();

  const garikBody = `
    <p style="margin:0 0 16px;color:#333;font-size:15px;">New realtor referral received.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${row("Realtor Name", realtorName, true)}
      ${row("License Number", licenseNumber)}
      ${row("Phone", `<a href="tel:${phone}" style="color:#2d7a2d;">${phone}</a>`, true)}
      ${row("Email", `<a href="mailto:${email}" style="color:#2d7a2d;">${email}</a>`)}
      ${row("Property Address", propertyAddress, true)}
      ${row("Estimated Property Value", money(estimatedPropertyValue))}
      ${row("Loan Amount Needed", money(loanAmountNeeded), true)}
      ${row("Client Scenario", clientScenario)}
      ${row("Submitted", timestamp, true)}
    </table>
  `;

  const leadBody = `
    <p style="margin:0 0 16px;color:#333;font-size:15px;">Hi ${firstNameOf(realtorName)},</p>
    <p style="margin:0 0 16px;color:#333;font-size:15px;">
      Thank you for your referral to Prime Capital Group. Garik will review it and reach out within
      24 hours.
    </p>
    <p style="margin:0 0 16px;color:#333;font-size:15px;">
      Call directly at <a href="tel:8183848544" style="color:#2d7a2d;font-weight:600;">(818) 384-8544</a>.
    </p>
    <p style="margin:0;color:#333;font-size:14px;">— Prime Capital Group, Inc.</p>
  `;

  return {
    garik: {
      to: GARIK_EMAIL,
      subject: `New Realtor Referral — ${realtorName}`,
      html: buildPCGEmail(`New Realtor Referral — ${realtorName}`, garikBody),
    },
    lead: email
      ? {
          to: email,
          subject: "Prime Capital Group — We Received Your Referral",
          html: buildPCGEmail("We Received Your Referral", leadBody),
        }
      : null,
  };
}

function contactFormEmails(lead: any) {
  const {
    name = "",
    phone = "",
    email = "",
    propertyAddress = "",
    loanType = "",
    message = "",
  } = lead;
  const timestamp = now();

  const garikBody = `
    <p style="margin:0 0 16px;color:#333;font-size:15px;">New contact form submission.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${row("Name", name, true)}
      ${row("Phone", `<a href="tel:${phone}" style="color:#2d7a2d;">${phone}</a>`)}
      ${row("Email", `<a href="mailto:${email}" style="color:#2d7a2d;">${email}</a>`, true)}
      ${row("Property Address", propertyAddress)}
      ${row("Loan Type", loanType, true)}
      ${row("Message", message)}
      ${row("Submitted", timestamp, true)}
    </table>
  `;

  const leadBody = `
    <p style="margin:0 0 16px;color:#333;font-size:15px;">Hi ${firstNameOf(name)},</p>
    <p style="margin:0 0 16px;color:#333;font-size:15px;">
      Thank you for reaching out to Prime Capital Group. Garik Hadjinian will personally review your
      message and contact you within 24 hours.
    </p>
    <p style="margin:0 0 16px;color:#333;font-size:15px;">
      Call directly at <a href="tel:8183848544" style="color:#2d7a2d;font-weight:600;">(818) 384-8544</a>. DRE #01726567.
    </p>
    <p style="margin:0;color:#333;font-size:14px;">— Prime Capital Group, Inc.</p>
  `;

  return {
    garik: {
      to: GARIK_EMAIL,
      subject: `New Contact Form — ${name} — ${loanType || "General"}`,
      html: buildPCGEmail(`New Contact Form — ${name}`, garikBody),
    },
    lead: email
      ? {
          to: email,
          subject: "Prime Capital Group — We Received Your Message",
          html: buildPCGEmail("We Received Your Message", leadBody),
        }
      : null,
  };
}

function calculatorEmails(lead: any) {
  const {
    firstName = "",
    lastName = "",
    phone = "",
    email = "",
    propertyAddress = "",
    propertyCity = "",
    propertyZip = "",
    coBorrower = "no",
    loanPurpose = "",
    loanType = "",
    propertyValue = "",
    desiredAmount = "",
    estimatedMonthlyPayment = "",
    ltv = "",
    interestRate = "",
    loanTerm = "",
    baseMonthlyIncome = "",
    notes = "",
  } = lead;
  const fullName = `${firstName} ${lastName}`.trim();
  const timestamp = now();
  const addressLine = [propertyAddress, propertyCity, propertyZip].filter(Boolean).join(", ");

  const garikBody = `
    <p style="margin:0 0 16px;color:#333;font-size:15px;">New calculator lead received.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${row("Name", fullName, true)}
      ${row("Phone", `<a href="tel:${phone}" style="color:#2d7a2d;">${phone}</a>`)}
      ${row("Email", `<a href="mailto:${email}" style="color:#2d7a2d;">${email}</a>`, true)}
      ${row("Property Address", addressLine || propertyAddress)}
      ${row("State", "California", true)}
      ${row("Co-borrower", coBorrower)}
      ${row("Loan Purpose", loanPurpose, true)}
      ${row("Loan Type", loanType)}
      ${row("Property Value", money(propertyValue), true)}
      ${row("Desired Loan Amount", money(desiredAmount))}
      ${row("Est. Monthly Payment", money(estimatedMonthlyPayment), true)}
      ${row("LTV", ltv ? `${ltv}%` : "")}
      ${row("Interest Rate", interestRate ? `${interestRate}%` : "", true)}
      ${row("Loan Term", loanTerm)}
      ${row("Monthly Income", money(baseMonthlyIncome), true)}
      ${row("Notes", notes)}
      ${row("Submitted", timestamp, true)}
    </table>
  `;

  const leadBody = `
    <p style="margin:0 0 16px;color:#333;font-size:15px;">Hi ${firstNameOf(fullName)},</p>
    <p style="margin:0 0 16px;color:#333;font-size:15px;">
      Garik Hadjinian will personally review your loan request and contact you within 24 hours.
    </p>
    <p style="margin:0 0 8px;color:#333;font-size:14px;font-weight:600;">Your Request Summary:</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#f9f9f9;border-radius:6px;">
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#555;">
          ${loanType ? `<strong>Loan Type:</strong> ${loanType}<br/>` : ""}
          ${addressLine ? `<strong>Property Address:</strong> ${addressLine}<br/>` : ""}
          ${desiredAmount ? `<strong>Desired Amount:</strong> ${money(desiredAmount)}<br/>` : ""}
          ${estimatedMonthlyPayment ? `<strong>Estimated Monthly Payment:</strong> ${money(estimatedMonthlyPayment)}` : ""}
        </td>
      </tr>
    </table>
    <p style="margin:0 0 16px;color:#333;font-size:15px;">
      Call directly at <a href="tel:8183848544" style="color:#2d7a2d;font-weight:600;">(818) 384-8544</a>. DRE #01726567.
    </p>
    <p style="margin:0;color:#333;font-size:14px;">— Prime Capital Group, Inc.</p>
  `;

  return {
    garik: {
      to: GARIK_EMAIL,
      subject: `New Calculator Lead — ${fullName} — ${loanType || "General"}`,
      html: buildPCGEmail(`New Calculator Lead — ${fullName}`, garikBody),
    },
    lead: email
      ? {
          to: email,
          subject: "Prime Capital Group — We Received Your Request",
          html: buildPCGEmail("We Received Your Request", leadBody),
        }
      : null,
  };
}

/* ─────────── generic fallback (qualifier + tool pages) ─────────── */

function genericEmails(lead: any) {
  const {
    name = "Unknown",
    fullName = "",
    phone = "",
    email = "",
    propertyAddress = "",
    loanType = "",
    propertyType = "",
    desiredAmount = "",
    loanAmount = "",
    propertyValue = "",
    estimatedMonthlyPayment = "",
    ltv = "",
    sourcePage = "Website",
  } = lead;

  const displayName = fullName || name || "Unknown";
  const timestamp = now();

  const KNOWN_KEYS = new Set([
    "name",
    "fullName",
    "firstName",
    "lastName",
    "phone",
    "email",
    "propertyAddress",
    "loanType",
    "propertyType",
    "desiredAmount",
    "loanAmount",
    "propertyValue",
    "estimatedMonthlyPayment",
    "ltv",
    "sourcePage",
    "formType",
    "source",
    "createdAt",
    "submittedAt",
  ]);

  const formatLabel = (key: string) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (s) => s.toUpperCase())
      .trim();

  const extraRows = Object.entries(lead)
    .filter(([k, v]) => !KNOWN_KEYS.has(k) && v !== "" && v !== null && v !== undefined)
    .map(([k, v], i) => row(formatLabel(k), String(v), i % 2 === 0))
    .join("");

  const garikBody = `
    <p style="margin:0 0 16px;color:#333;font-size:15px;">A new lead just came in through the website${sourcePage ? ` via <strong>${sourcePage}</strong>` : ""}.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${row("Name", displayName, true)}
      ${row("Phone", phone ? `<a href="tel:${phone}" style="color:#2d7a2d;">${phone}</a>` : "")}
      ${row("Email", email ? `<a href="mailto:${email}" style="color:#2d7a2d;">${email}</a>` : "", true)}
      ${row("Property Address", propertyAddress)}
      ${row("Loan Type", loanType, true)}
      ${row("Property Type", propertyType)}
      ${row("Property Value", money(propertyValue), true)}
      ${row("Desired Amount", money(desiredAmount || loanAmount))}
      ${row("Est. Monthly Payment", money(estimatedMonthlyPayment), true)}
      ${row("LTV", ltv ? `${ltv}%` : "")}
      ${row("Source", sourcePage, true)}
      ${row("Submitted", timestamp)}
      ${extraRows}
    </table>
  `;

  const leadBody = `
    <p style="margin:0 0 16px;color:#333;font-size:15px;">Hi ${firstNameOf(displayName)},</p>
    <p style="margin:0 0 16px;color:#333;font-size:15px;">
      Thank you for reaching out to Prime Capital Group. Garik Hadjinian will personally review your
      request and contact you within 24 hours.
    </p>
    <p style="margin:0 0 16px;color:#333;font-size:15px;">
      Call directly at <a href="tel:8183848544" style="color:#2d7a2d;font-weight:600;">(818) 384-8544</a>. DRE #01726567.
    </p>
    <p style="margin:0;color:#333;font-size:14px;">— Prime Capital Group, Inc.</p>
  `;

  return {
    garik: {
      to: GARIK_EMAIL,
      subject: `New PCG Lead — ${displayName} — ${sourcePage || loanType || "General Inquiry"}`,
      html: buildPCGEmail(`New Lead — ${displayName}`, garikBody),
    },
    lead: email
      ? {
          to: email,
          subject: "Prime Capital Group — We Received Your Request",
          html: buildPCGEmail("We Received Your Request", leadBody),
        }
      : null,
  };
}

/* ─────────── route handler ─────────── */

export async function POST(req: NextRequest) {
  try {
    const lead = await req.json();
    const formType = String(lead.formType || "").toLowerCase();

    let emails;
    switch (formType) {
      case "investor":
        emails = investorEmails(lead);
        break;
      case "broker":
        emails = brokerEmails(lead);
        break;
      case "realtor":
        emails = realtorEmails(lead);
        break;
      case "contact":
        emails = contactFormEmails(lead);
        break;
      case "calculator":
        emails = calculatorEmails(lead);
        break;
      default:
        emails = genericEmails(lead);
    }

    await sendEmail(emails.garik);
    if (emails.lead) {
      await sendEmail(emails.lead);
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
