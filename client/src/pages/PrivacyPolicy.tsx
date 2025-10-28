export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container max-w-4xl py-8 md:py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <div className="text-sm text-gray-600 mb-8">
            <p><strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
              <p>
                This Privacy Policy describes how Cory Lawson, NMLS #891785, operating as a Producing Branch Manager 
                for Geneva Financial, LLC ("we," "us," or "our") collects, uses, discloses, and protects your personal 
                information when you use our Financial Health Check-Up application (the "Service").
              </p>
              <p>
                We are committed to protecting your privacy and handling your personal information with care and in 
                compliance with applicable federal and state laws, including the Gramm-Leach-Bliley Act (GLBA), the 
                Fair Credit Reporting Act (FCRA), and other relevant privacy regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">2.1 Personal Information You Provide</h3>
              <p>When you complete the Financial Health Check-Up form, we collect:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Contact Information:</strong> Tax accountant's name, email address, and phone number</li>
                <li><strong>Client Information:</strong> Client's email address and phone number</li>
                <li><strong>Property Information:</strong> Property type (primary residence or investment property)</li>
                <li><strong>Mortgage Details:</strong> Current monthly payment, interest rate, remaining balance, years remaining, and information about HELOCs or liens</li>
                <li><strong>Financial Information:</strong> Monthly debt obligations including credit cards, auto loans, personal loans, student loans, and other debts</li>
                <li><strong>Financial Goals:</strong> Your stated financial objectives and preferences</li>
                <li><strong>Documents:</strong> Mortgage statements and related financial documents you upload</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">2.2 Automatically Collected Information</h3>
              <p>When you access our Service, we may automatically collect:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Device information (browser type, operating system)</li>
                <li>IP address and general location data</li>
                <li>Usage data (pages visited, time spent, interactions)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
              <p>We use the information we collect for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Loan Analysis:</strong> To evaluate your financial situation and identify potential refinancing opportunities</li>
                <li><strong>Communication:</strong> To contact you regarding your inquiry and provide personalized savings analysis</li>
                <li><strong>Service Improvement:</strong> To improve our Service and develop new features</li>
                <li><strong>Compliance:</strong> To comply with legal obligations and industry regulations</li>
                <li><strong>Fraud Prevention:</strong> To detect, prevent, and address fraud or security issues</li>
                <li><strong>Marketing:</strong> With your consent, to send you information about products and services that may interest you</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Information Sharing and Disclosure</h2>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">4.1 Service Providers</h3>
              <p>
                We may share your information with trusted third-party service providers who assist us in operating 
                our Service, conducting our business, or servicing you. These parties are contractually obligated to 
                keep your information confidential and use it only for the purposes for which we disclose it to them.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">4.2 Geneva Financial, LLC</h3>
              <p>
                As a Producing Branch Manager for Geneva Financial, LLC, your information will be shared with Geneva 
                Financial, LLC for the purpose of processing your loan inquiry and providing mortgage services.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">4.3 Legal Requirements</h3>
              <p>We may disclose your information when required by law, such as:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>In response to a subpoena, court order, or legal process</li>
                <li>To comply with government or regulatory requirements</li>
                <li>To protect our rights, property, or safety, or that of others</li>
                <li>To enforce our terms of service</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">4.4 Business Transfers</h3>
              <p>
                In the event of a merger, acquisition, or sale of assets, your information may be transferred to the 
                acquiring entity, subject to the same privacy protections outlined in this policy.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">4.5 With Your Consent</h3>
              <p>
                We will not share your information with third parties for their marketing purposes without your explicit consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Encryption of data in transit using industry-standard SSL/TLS protocols</li>
                <li>Secure storage of uploaded documents and sensitive information</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Regular security assessments and updates</li>
                <li>Employee training on data protection and confidentiality</li>
              </ul>
              <p className="mt-3">
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we 
                strive to use commercially acceptable means to protect your personal information, we cannot guarantee 
                its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
                Privacy Policy, unless a longer retention period is required or permitted by law. Factors we consider 
                in determining retention periods include:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The length of time you use our Service</li>
                <li>Whether there is a legal obligation to retain the data</li>
                <li>Whether retention is advisable in light of our legal position</li>
                <li>Industry best practices and regulatory requirements</li>
              </ul>
              <p className="mt-3">
                Mortgage-related records are typically retained for a minimum of 7 years in compliance with federal regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Your Rights and Choices</h2>
              <p>You have the following rights regarding your personal information:</p>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">7.1 Access and Correction</h3>
              <p>
                You have the right to access and update your personal information. You may request a copy of the 
                personal information we hold about you.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">7.2 Opt-Out of Marketing</h3>
              <p>
                You may opt out of receiving marketing communications from us at any time by following the unsubscribe 
                instructions in our emails or by contacting us directly.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">7.3 Do Not Track</h3>
              <p>
                Some web browsers have a "Do Not Track" feature. Our Service does not currently respond to Do Not Track signals.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">7.4 State-Specific Rights</h3>
              <p>
                Depending on your state of residence, you may have additional privacy rights under state law, including 
                the right to request deletion of your personal information or to opt out of certain data sharing practices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Children's Privacy</h2>
              <p>
                Our Service is not intended for individuals under the age of 18. We do not knowingly collect personal 
                information from children. If we become aware that we have collected personal information from a child 
                without parental consent, we will take steps to delete that information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Third-Party Links</h2>
              <p>
                Our Service may contain links to third-party websites or services. We are not responsible for the 
                privacy practices of these third parties. We encourage you to read the privacy policies of any 
                third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or applicable 
                laws. We will notify you of any material changes by posting the updated policy on our Service and 
                updating the "Last Updated" date. Your continued use of the Service after such changes constitutes 
                your acceptance of the updated Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Contact Information</h2>
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, 
                please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-3">
                <p><strong>Cory Lawson, NMLS #891785</strong></p>
                <p>Producing Branch Manager</p>
                <p>Geneva Financial, LLC</p>
                <p>2029 Riverside Dr. Suite 200</p>
                <p>Columbus, OH 43221</p>
                <p className="mt-2">
                  Phone: <a href="tel:614-557-7503" className="text-blue-600 hover:underline">614-557-7503</a>
                </p>
                <p>
                  Email: <a href="mailto:clawson@genevafi.com" className="text-blue-600 hover:underline">clawson@genevafi.com</a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Gramm-Leach-Bliley Act (GLBA) Notice</h2>
              <p>
                As required by the Gramm-Leach-Bliley Act, we are providing you with this notice of our privacy 
                practices. This notice describes how we collect, use, and protect your nonpublic personal information.
              </p>
              <p className="mt-3">
                We collect nonpublic personal information about you from the following sources:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Information we receive from you on applications or other forms</li>
                <li>Information about your transactions with us or others</li>
                <li>Information we receive from consumer reporting agencies</li>
              </ul>
              <p className="mt-3">
                We do not disclose any nonpublic personal information about you to anyone, except as permitted or 
                required by law. We restrict access to your personal and account information to those employees who 
                need to know that information to provide products or services to you.
              </p>
            </section>

            <section className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-600">
                <strong>Acknowledgment:</strong> By using our Service and submitting your information, you acknowledge 
                that you have read, understood, and agree to be bound by this Privacy Policy.
              </p>
            </section>
          </div>

          <div className="mt-8 text-center">
            <a 
              href="/" 
              className="text-blue-600 hover:underline font-medium"
            >
              Return to Financial Health Check-Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
