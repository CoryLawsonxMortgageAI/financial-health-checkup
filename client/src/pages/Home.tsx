import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { DollarSign, Upload, CheckCircle2 } from "lucide-react";
import { APP_TITLE } from "@/const";

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyType: "primary",
    currentPayment: "",
    currentRate: "",
    remainingBalance: "",
    yearsRemaining: "",
    creditCardPayments: "",
    autoLoans: "",
    personalLoans: "",
    studentLoans: "",
    otherDebts: "",
    goals: {
      lowerPayment: false,
      payOffDebt: false,
      accessEquity: false,
      shortenTerm: false,
      other: false,
    },
    otherGoalText: "",
    consent: false,
  });

  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoalChange = (goal: keyof typeof formData.goals) => {
    setFormData((prev) => ({
      ...prev,
      goals: { ...prev.goals, [goal]: !prev.goals[goal] },
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      setFile(selectedFile);
      toast.success("File uploaded successfully");
    }
  };

  const calculateTotalDebt = () => {
    const debts = [
      parseFloat(formData.creditCardPayments) || 0,
      parseFloat(formData.autoLoans) || 0,
      parseFloat(formData.personalLoans) || 0,
      parseFloat(formData.studentLoans) || 0,
      parseFloat(formData.otherDebts) || 0,
    ];
    return debts.reduce((sum, debt) => sum + debt, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required contact information");
      return;
    }

    if (!formData.consent) {
      toast.error("Please provide consent to review your financial information");
      return;
    }

    if (!file) {
      toast.error("Please upload your most recent mortgage statement");
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Your Financial Health Check-Up has been submitted successfully!");
      
      // Log data for demonstration (in production, this would be sent to a server)
      console.log("Form Data:", formData);
      console.log("Total Monthly Debt:", calculateTotalDebt());
      console.log("Uploaded File:", file.name);
    }, 1500);
  };

  const totalDebt = calculateTotalDebt();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container max-w-4xl py-8 md:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Financial Health Check-Up
          </h1>
          <p className="text-lg text-gray-600">
            Discover how much you could save each month - it only takes 3 minutes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Client Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Please provide your basic contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Property Type</Label>
                  <RadioGroup
                    value={formData.propertyType}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, propertyType: value }))
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="primary" id="primary" />
                      <Label htmlFor="primary" className="font-normal cursor-pointer">
                        Primary Residence
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="investment" id="investment" />
                      <Label htmlFor="investment" className="font-normal cursor-pointer">
                        Investment Property
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Current Mortgage Details */}
          <Card>
            <CardHeader>
              <CardTitle>Current Mortgage Details</CardTitle>
              <CardDescription>Information about your existing mortgage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPayment">Current Monthly Payment</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="currentPayment"
                      name="currentPayment"
                      type="number"
                      step="0.01"
                      value={formData.currentPayment}
                      onChange={handleInputChange}
                      placeholder="2,500"
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentRate">Current Interest Rate (%)</Label>
                  <Input
                    id="currentRate"
                    name="currentRate"
                    type="number"
                    step="0.01"
                    value={formData.currentRate}
                    onChange={handleInputChange}
                    placeholder="4.5"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="remainingBalance">Approximate Remaining Balance</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="remainingBalance"
                      name="remainingBalance"
                      type="number"
                      step="0.01"
                      value={formData.remainingBalance}
                      onChange={handleInputChange}
                      placeholder="350,000"
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearsRemaining">Years Remaining on Mortgage</Label>
                  <Input
                    id="yearsRemaining"
                    name="yearsRemaining"
                    type="number"
                    value={formData.yearsRemaining}
                    onChange={handleInputChange}
                    placeholder="25"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Monthly Expenses */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Debt Obligations</CardTitle>
              <CardDescription>List all your monthly debt payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="creditCardPayments">Credit Card Payments</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="creditCardPayments"
                      name="creditCardPayments"
                      type="number"
                      step="0.01"
                      value={formData.creditCardPayments}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="autoLoans">Auto Loans</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="autoLoans"
                      name="autoLoans"
                      type="number"
                      step="0.01"
                      value={formData.autoLoans}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="personalLoans">Personal Loans</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="personalLoans"
                      name="personalLoans"
                      type="number"
                      step="0.01"
                      value={formData.personalLoans}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentLoans">Student Loans</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="studentLoans"
                      name="studentLoans"
                      type="number"
                      step="0.01"
                      value={formData.studentLoans}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="otherDebts">Other Monthly Debt Obligations</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="otherDebts"
                    name="otherDebts"
                    type="number"
                    step="0.01"
                    value={formData.otherDebts}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Monthly Debt:</span>
                  <span className="text-2xl font-bold text-indigo-600">
                    ${totalDebt.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Financial Goals */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Goals</CardTitle>
              <CardDescription>What are you hoping to achieve? (Select all that apply)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowerPayment"
                  checked={formData.goals.lowerPayment}
                  onCheckedChange={() => handleGoalChange("lowerPayment")}
                />
                <Label htmlFor="lowerPayment" className="font-normal cursor-pointer">
                  Lower monthly payment
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="payOffDebt"
                  checked={formData.goals.payOffDebt}
                  onCheckedChange={() => handleGoalChange("payOffDebt")}
                />
                <Label htmlFor="payOffDebt" className="font-normal cursor-pointer">
                  Pay off high-interest debt
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="accessEquity"
                  checked={formData.goals.accessEquity}
                  onCheckedChange={() => handleGoalChange("accessEquity")}
                />
                <Label htmlFor="accessEquity" className="font-normal cursor-pointer">
                  Access equity for investment
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="shortenTerm"
                  checked={formData.goals.shortenTerm}
                  onCheckedChange={() => handleGoalChange("shortenTerm")}
                />
                <Label htmlFor="shortenTerm" className="font-normal cursor-pointer">
                  Shorten loan term
                </Label>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="other"
                    checked={formData.goals.other}
                    onCheckedChange={() => handleGoalChange("other")}
                  />
                  <Label htmlFor="other" className="font-normal cursor-pointer">
                    Other
                  </Label>
                </div>
                {formData.goals.other && (
                  <Input
                    name="otherGoalText"
                    value={formData.otherGoalText}
                    onChange={handleInputChange}
                    placeholder="Please specify..."
                    className="ml-6"
                  />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Document Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Mortgage Statement</CardTitle>
              <CardDescription>Please upload your most recent mortgage statement (PDF, JPG, or PNG - Max 10MB)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-indigo-600 hover:text-indigo-500 font-medium">
                    Upload your statement
                  </span>
                  <span className="text-gray-600"> - Quick & secure</span>
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {file && (
                  <div className="mt-3 flex items-center justify-center text-sm text-green-600">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    {file.name}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Consent and Submit */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, consent: checked as boolean }))
                    }
                  />
                  <Label htmlFor="consent" className="font-normal cursor-pointer leading-relaxed">
                    Yes, I'd like a loan officer to review my information and show me personalized savings opportunities. This is completely free with no obligation.
                  </Label>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Get My Savings Analysis"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>🔒 Your information is 100% secure and confidential. We respect your privacy.</p>
        </div>
      </div>
    </div>
  );
}
