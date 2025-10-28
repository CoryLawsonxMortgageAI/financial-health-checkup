# Financial Health Check-Up

A client-friendly financial health assessment form designed for tax accountants to help their clients identify refinancing opportunities and monthly expense reduction potential.

## 🎯 Purpose

This web application enables tax accountants to quickly assess their clients' financial situations during meetings and identify potential savings through mortgage refinancing. The form is optimized for maximum engagement using psychology-based design principles.

## ✨ Features

### 7-Section Comprehensive Form

1. **Tax Accountant Contact Information**
   - Full name, email, and phone number

2. **Client Information**
   - Client's email and phone number
   - Property type (Primary Residence or Investment Property)

3. **Current Mortgage Details**
   - Monthly payment amount
   - Current interest rate
   - Remaining balance
   - Years remaining on mortgage
   - HELOC/liens status (Yes/No)

4. **Monthly Debt Obligations**
   - Credit card payments
   - Auto loans
   - Personal loans
   - Student loans
   - Other monthly debt obligations
   - **Real-time total debt calculation**

5. **Financial Goals**
   - Lower monthly payment
   - Pay off high-interest debt
   - Access equity for investment
   - Shorten loan term
   - Other (with text input)

6. **Document Upload**
   - Secure mortgage statement upload (PDF, JPG, PNG)
   - Maximum file size: 10MB
   - Visual upload feedback

7. **Consent & Submission**
   - Clear, benefit-focused consent language
   - Action-oriented CTA: "Get My Savings Analysis"

## 🎨 Design Highlights

### Psychology-Based Engagement Optimization

The form uses proven psychological principles to maximize completion rates:

- **Medical Metaphor**: "Check-Up" feels familiar and non-threatening
- **Time Transparency**: "Only takes 3 minutes" reduces friction
- **Benefit-Focused**: "Discover how much you could save each month"
- **Trust Indicators**: 🔒 "100% secure and confidential"
- **Positive Framing**: "Yes, I'd like..." instead of "I authorize..."

### Multi-Personality Appeal

Designed to engage different personality types:

- **Analytical**: Clear structure, real-time calculations
- **Amiable**: Warm tone, privacy assurances
- **Expressive**: Benefit-focused headlines, visual elements
- **Driver**: Results-oriented, efficient (3 minutes)

## 🛠️ Technology Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Form Management**: React Hooks (useState)
- **Validation**: Built-in HTML5 + custom validation
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)

## 🚀 Getting Started

### Prerequisites

- Node.js 22.x or higher
- pnpm package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/CoryLawsonxMortgageAI/financial-health-checkup.git

# Navigate to the project directory
cd financial-health-checkup

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Create production build
pnpm build

# Preview production build
pnpm preview
```

## 📋 Form Validation

The form includes comprehensive validation:

- ✅ All required fields must be completed
- ✅ Email format validation
- ✅ Phone number format validation
- ✅ HELOC/liens question must be answered
- ✅ File upload required (mortgage statement)
- ✅ Consent checkbox must be checked
- ✅ File size limit: 10MB
- ✅ Accepted file types: PDF, JPG, PNG

## 🎯 Use Cases

### For Tax Accountants
- Quick client financial assessment during meetings
- Identify refinancing opportunities
- Generate qualified leads for loan officers
- Professional, branded client experience

### For Clients
- Simple, 3-minute form completion
- Clear understanding of financial goals
- Secure document upload
- No obligation, free analysis

## 📱 Mobile Responsive

Fully responsive design works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 Security & Privacy

- Secure file upload handling
- Clear privacy messaging
- No data stored without consent
- HTTPS encryption ready

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or support, please contact the repository owner.

## 📞 Support

For questions or issues, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for tax accountants and their clients**
