import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { fileName, contentPreview } = await req.json();
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || apiKey === 'your_anthropic_key_here') {
    // Demo classification based on filename
    const name = fileName.toLowerCase();
    let documentType = 'Other';
    let suggestedFolder = 'Miscellaneous';

    if (name.includes('appraisal') || name.includes('valuation')) { documentType = 'Property Appraisal'; suggestedFolder = 'Appraisals'; }
    else if (name.includes('title')) { documentType = 'Title Report'; suggestedFolder = 'Title'; }
    else if (name.includes('id') || name.includes('license') || name.includes('passport')) { documentType = 'Borrower ID'; suggestedFolder = 'Borrower Documents'; }
    else if (name.includes('income') || name.includes('pay') || name.includes('w2') || name.includes('1099')) { documentType = 'Proof of Income'; suggestedFolder = 'Income Verification'; }
    else if (name.includes('bank') || name.includes('statement')) { documentType = 'Bank Statement'; suggestedFolder = 'Financial Statements'; }
    else if (name.includes('agreement') || name.includes('contract') || name.includes('loan')) { documentType = 'Loan Agreement'; suggestedFolder = 'Loan Documents'; }
    else if (name.includes('insurance') || name.includes('policy')) { documentType = 'Insurance Document'; suggestedFolder = 'Insurance'; }
    else if (name.includes('tax') || name.includes('return')) { documentType = 'Tax Return'; suggestedFolder = 'Tax Documents'; }
    else if (name.includes('purchase') || name.includes('offer')) { documentType = 'Purchase Agreement'; suggestedFolder = 'Purchase Documents'; }
    else if (name.includes('inspect')) { documentType = 'Inspection Report'; suggestedFolder = 'Inspections'; }
    else if (name.includes('deed') || name.includes('trust')) { documentType = 'Trust Deed'; suggestedFolder = 'Loan Documents'; }
    else if (name.includes('photo') || name.includes('img') || name.includes('pic')) { documentType = 'Property Photo'; suggestedFolder = 'Property Photos'; }
    else if (name.includes('broker') || name.includes('submission')) { documentType = 'Broker Submission'; suggestedFolder = 'Broker Documents'; }

    return NextResponse.json({
      documentType,
      extractedInfo: {
        propertyAddress: null,
        amounts: [],
        dates: [new Date().toISOString().split('T')[0]],
        borrowerName: null
      },
      confidence: 0.75,
      suggestedFolder
    });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `You are a document classifier for a hard money lending company. Analyze this document and return ONLY a JSON object with no markdown or extra text. Filename: ${fileName}. Content preview: ${contentPreview}. Return: { "documentType": "Property Appraisal | Title Report | Borrower ID | Proof of Income | Bank Statement | Loan Agreement | Insurance Document | Tax Return | Purchase Agreement | Environmental Report | Inspection Report | Trust Deed | Broker Submission | Property Photo | Other", "extractedInfo": { "propertyAddress": "if found or null", "amounts": ["any dollar amounts"], "dates": ["any dates"], "borrowerName": "if found or null" }, "confidence": 0.0-1.0, "suggestedFolder": "folder name" }`
        }]
      })
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || '{}';
    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({
      documentType: 'Other',
      extractedInfo: { propertyAddress: null, amounts: [], dates: [], borrowerName: null },
      confidence: 0.5,
      suggestedFolder: 'Unclassified'
    });
  }
}
