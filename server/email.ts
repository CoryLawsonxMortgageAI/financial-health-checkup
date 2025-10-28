import { ENV } from "./_core/env";

interface SubmissionEmailData {
  // Tax Accountant
  accountantName: string;
  accountantEmail: string;
  accountantPhone: string;
  
  // Client
  clientEmail: string;
  clientPhone: string;
  propertyType: string;
  
  // Mortgage Details
  currentPayment?: string;
  currentRate?: string;
  remainingBalance?: string;
  yearsRemaining?: string;
  hasHelocOrLiens: string;
  
  // Debts
  creditCardPayments?: string;
  autoLoans?: string;
  personalLoans?: string;
  studentLoans?: string;
  otherDebts?: string;
  totalMonthlyDebt: string;
  
  // Goals
  goals: string[];
  otherGoalText?: string;
  
  // Document
  mortgageStatementUrl?: string;
  mortgageStatementFilename?: string;
}

/**
 * Send email notification to loan officer with submission details
 */
export async function sendSubmissionEmail(data: SubmissionEmailData): Promise<boolean> {
  try {
    const emailBody = formatSubmissionEmail(data);
    
    // Use Manus notification API to send email
    const response = await fetch(`${ENV.forgeApiUrl}/notification/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ENV.forgeApiKey}`,
      },
      body: JSON.stringify({
        to: "clawson@genevafi.com",
        subject: `New Financial Health Check-Up Submission - ${data.clientEmail}`,
        html: emailBody,
      }),
    });

    if (!response.ok) {
      console.error("[Email] Failed to send submission email:", await response.text());
      return false;
    }

    console.log("[Email] Submission email sent successfully");
    return true;
  } catch (error) {
    console.error("[Email] Error sending submission email:", error);
    return false;
  }
}

/**
 * Format submission data into a professional HTML email
 */
function formatSubmissionEmail(data: SubmissionEmailData): string {
  const formatCurrency = (value?: string) => {
    if (!value) return "Not provided";
    const num = parseFloat(value);
    return isNaN(num) ? value : `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatValue = (value?: string) => value || "Not provided";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Financial Health Check-Up Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                New Financial Health Check-Up Submission
              </h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px;">
                A new lead has been submitted through your financial health form
              </p>
            </td>
          </tr>

          <!-- Tax Accountant Information -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 15px 0; color: #333333; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                Tax Accountant Information
              </h2>
              <table width="100%" cellpadding="8" cellspacing="0">
                <tr>
                  <td style="color: #666666; font-size: 14px; width: 40%;"><strong>Name:</strong></td>
                  <td style="color: #333333; font-size: 14px;">${formatValue(data.accountantName)}</td>
                </tr>
                <tr>
                  <td style="color: #666666; font-size: 14px;"><strong>Email:</strong></td>
                  <td style="color: #333333; font-size: 14px;"><a href="mailto:${data.accountantEmail}" style="color: #667eea; text-decoration: none;">${data.accountantEmail}</a></td>
                </tr>
                <tr>
                  <td style="color: #666666; font-size: 14px;"><strong>Phone:</strong></td>
                  <td style="color: #333333; font-size: 14px;"><a href="tel:${data.accountantPhone}" style="color: #667eea; text-decoration: none;">${data.accountantPhone}</a></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Client Information -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h2 style="margin: 0 0 15px 0; color: #333333; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                Client Information
              </h2>
              <table width="100%" cellpadding="8" cellspacing="0">
                <tr>
                  <td style="color: #666666; font-size: 14px; width: 40%;"><strong>Email:</strong></td>
                  <td style="color: #333333; font-size: 14px;"><a href="mailto:${data.clientEmail}" style="color: #667eea; text-decoration: none;">${data.clientEmail}</a></td>
                </tr>
                <tr>
                  <td style="color: #666666; font-size: 14px;"><strong>Phone:</strong></td>
                  <td style="color: #333333; font-size: 14px;"><a href="tel:${data.clientPhone}" style="color: #667eea; text-decoration: none;">${data.clientPhone}</a></td>
                </tr>
                <tr>
                  <td style="color: #666666; font-size: 14px;"><strong>Property Type:</strong></td>
                  <td style="color: #333333; font-size: 14px;">${data.propertyType === "primary" ? "Primary Residence" : "Investment Property"}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Current Mortgage Details -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h2 style="margin: 0 0 15px 0; color: #333333; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                Current Mortgage Details
              </h2>
              <table width="100%" cellpadding="8" cellspacing="0">
                <tr>
                  <td style="color: #666666; font-size: 14px; width: 40%;"><strong>Monthly Payment:</strong></td>
                  <td style="color: #333333; font-size: 14px;">${formatCurrency(data.currentPayment)}</td>
                </tr>
                <tr>
                  <td style="color: #666666; font-size: 14px;"><strong>Interest Rate:</strong></td>
                  <td style="color: #333333; font-size: 14px;">${formatValue(data.currentRate)}${data.currentRate ? "%" : ""}</td>
                </tr>
                <tr>
                  <td style="color: #666666; font-size: 14px;"><strong>Remaining Balance:</strong></td>
                  <td style="color: #333333; font-size: 14px;">${formatCurrency(data.remainingBalance)}</td>
                </tr>
                <tr>
                  <td style="color: #666666; font-size: 14px;"><strong>Years Remaining:</strong></td>
                  <td style="color: #333333; font-size: 14px;">${formatValue(data.yearsRemaining)}</td>
                </tr>
                <tr>
                  <td style="color: #666666; font-size: 14px;"><strong>HELOCs/Liens:</strong></td>
                  <td style="color: #333333; font-size: 14px; font-weight: bold; color: ${data.hasHelocOrLiens === "yes" ? "#d97706" : "#059669"};">
                    ${data.hasHelocOrLiens === "yes" ? "Yes" : "No"}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Monthly Debt Obligations -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h2 style="margin: 0 0 15px 0; color: #333333; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                Monthly Debt Obligations
              </h2>
              <table width="100%" cellpadding="8" cellspacing="0">
                <tr>
                  <td style="color: #666666; font-size: 14px; width: 40%;"><strong>Credit Card Payments:</strong></td>
                  <td style="color: #333333; font-size: 14px;">${formatCurrency(data.creditCardPayments)}</td>
                </tr>
                <tr>
                  <td style="color: #666666; font-size: 14px;"><strong>Auto Loans:</strong></td>
                  <td style="color: #333333; font-size: 14px;">${formatCurrency(data.autoLoans)}</td>
                </tr>
                <tr>
                  <td style="color: #666666; font-size: 14px;"><strong>Personal Loans:</strong></td>
                  <td style="color: #333333; font-size: 14px;">${formatCurrency(data.personalLoans)}</td>
                </tr>
                <tr>
                  <td style="color: #666666; font-size: 14px;"><strong>Student Loans:</strong></td>
                  <td style="color: #333333; font-size: 14px;">${formatCurrency(data.studentLoans)}</td>
                </tr>
                <tr>
                  <td style="color: #666666; font-size: 14px;"><strong>Other Debts:</strong></td>
                  <td style="color: #333333; font-size: 14px;">${formatCurrency(data.otherDebts)}</td>
                </tr>
                <tr style="background-color: #f3f4f6;">
                  <td style="color: #111827; font-size: 16px; font-weight: bold; padding: 12px 8px;"><strong>Total Monthly Debt:</strong></td>
                  <td style="color: #667eea; font-size: 18px; font-weight: bold; padding: 12px 8px;">${formatCurrency(data.totalMonthlyDebt)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Financial Goals -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h2 style="margin: 0 0 15px 0; color: #333333; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                Financial Goals
              </h2>
              ${data.goals.length > 0 ? `
                <ul style="margin: 0; padding-left: 20px; color: #333333; font-size: 14px; line-height: 1.8;">
                  ${data.goals.map(goal => `<li>${goal}</li>`).join("")}
                </ul>
              ` : `
                <p style="margin: 0; color: #666666; font-size: 14px;">No goals selected</p>
              `}
              ${data.otherGoalText ? `
                <p style="margin: 10px 0 0 0; color: #666666; font-size: 14px;">
                  <strong>Other:</strong> ${data.otherGoalText}
                </p>
              ` : ""}
            </td>
          </tr>

          <!-- Mortgage Statement -->
          ${data.mortgageStatementUrl ? `
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h2 style="margin: 0 0 15px 0; color: #333333; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                Mortgage Statement
              </h2>
              <p style="margin: 0; color: #333333; font-size: 14px;">
                <strong>Filename:</strong> ${data.mortgageStatementFilename || "mortgage_statement"}
              </p>
              <p style="margin: 10px 0 0 0;">
                <a href="${data.mortgageStatementUrl}" 
                   style="display: inline-block; padding: 12px 24px; background-color: #667eea; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: bold;">
                  Download Mortgage Statement
                </a>
              </p>
            </td>
          </tr>
          ` : ""}

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #666666; font-size: 12px;">
                This email was generated from the Financial Health Check-Up form
              </p>
              <p style="margin: 10px 0 0 0; color: #666666; font-size: 12px;">
                Submitted on ${new Date().toLocaleString("en-US", { 
                  dateStyle: "long", 
                  timeStyle: "short",
                  timeZone: "America/New_York" 
                })} EST
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
