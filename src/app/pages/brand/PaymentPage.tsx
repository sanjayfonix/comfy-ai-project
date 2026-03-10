import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { CreditCard, Download, FileText, CheckCircle2, ArrowLeft, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  planName: string;
  invoiceNumber: string;
}

interface PaymentMethod {
  id: string;
  type: 'card';
  last4: string;
  brand: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    date: '2026-02-01',
    amount: 299,
    status: 'paid',
    planName: 'Pro',
    invoiceNumber: 'INV-2026-02-001',
  },
  {
    id: '2',
    date: '2026-01-01',
    amount: 299,
    status: 'paid',
    planName: 'Pro',
    invoiceNumber: 'INV-2026-01-001',
  },
  {
    id: '3',
    date: '2025-12-01',
    amount: 299,
    status: 'paid',
    planName: 'Pro',
    invoiceNumber: 'INV-2025-12-001',
  },
  {
    id: '4',
    date: '2025-11-01',
    amount: 99,
    status: 'paid',
    planName: 'Basic',
    invoiceNumber: 'INV-2025-11-001',
  },
];

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expMonth: 12,
    expYear: 2027,
    isDefault: true,
  },
];

const pricingPlans: { [key: string]: { name: string; price: number } } = {
  basic: { name: 'Basic', price: 99 },
  pro: { name: 'Pro', price: 299 },
  enterprise: { name: 'Enterprise', price: 799 },
};

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const planId = location.state?.planId || null;
  
  const [activeTab, setActiveTab] = useState<'overview' | 'payment-methods' | 'invoices' | 'checkout'>(
    planId ? 'checkout' : 'overview'
  );
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [processing, setProcessing] = useState(false);
  
  // Card form state
  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: '',
  });

  const handleDownloadInvoice = (invoice: Invoice) => {
    toast.success(`Downloading invoice ${invoice.invoiceNumber}`);
    // In a real implementation, this would trigger a PDF download
  };

  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate card number (simple check)
    if (cardForm.cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error('Please enter a valid 16-digit card number');
      return;
    }
    
    const newPaymentMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: 'card',
      last4: cardForm.cardNumber.slice(-4),
      brand: cardForm.cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
      expMonth: parseInt(cardForm.expiry.split('/')[0]),
      expYear: 2000 + parseInt(cardForm.expiry.split('/')[1]),
      isDefault: paymentMethods.length === 0,
    };
    
    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    setCardForm({ cardNumber: '', cardName: '', expiry: '', cvc: '' });
    toast.success('Payment method added successfully');
  };

  const handleProcessPayment = () => {
    if (!planId) return;
    
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      toast.success('Payment successful! Your plan has been upgraded.');
      navigate('/brand/subscription');
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      paid: 'bg-green-600',
      pending: 'bg-yellow-600',
      failed: 'bg-red-600',
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {planId && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/brand/subscription')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">
            {planId ? 'Complete Your Upgrade' : 'Billing & Payments'}
          </h1>
          <p className="text-[#666666]">
            {planId 
              ? 'Review and confirm your subscription upgrade' 
              : 'Manage your subscription, payment methods, and invoices'}
          </p>
        </div>
      </div>

      {/* Checkout Flow */}
      {planId && activeTab === 'checkout' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-[#979797]">
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Enter your payment information to complete the upgrade</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleAddPaymentMethod} className="space-y-4">
                  <div>
                    <Label htmlFor="cardName">Cardholder Name *</Label>
                    <Input
                      id="cardName"
                      required
                      value={cardForm.cardName}
                      onChange={(e) => setCardForm({ ...cardForm, cardName: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        required
                        value={cardForm.cardNumber}
                        onChange={(e) => setCardForm({ ...cardForm, cardNumber: formatCardNumber(e.target.value) })}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      <CreditCard className="absolute right-3 top-3 w-5 h-5 text-[#666666]" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date *</Label>
                      <Input
                        id="expiry"
                        required
                        value={cardForm.expiry}
                        onChange={(e) => setCardForm({ ...cardForm, expiry: formatExpiry(e.target.value) })}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC *</Label>
                      <Input
                        id="cvc"
                        required
                        type="password"
                        value={cardForm.cvc}
                        onChange={(e) => setCardForm({ ...cardForm, cvc: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                        placeholder="123"
                        maxLength={3}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-[#666666] bg-[#eeeeee] p-4 rounded-lg">
                    <Lock className="w-4 h-4" />
                    <span>Your payment information is encrypted and secure</span>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Summary */}
          <div>
            <Card className="border-[#979797] sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-[#666666] mb-1">Upgrading to</p>
                  <p className="text-2xl font-bold">{pricingPlans[planId]?.name} Plan</p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#666666]">Monthly subscription</span>
                    <span className="font-medium">€{pricingPlans[planId]?.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#666666]">Tax (19% VAT)</span>
                    <span className="font-medium">€{(pricingPlans[planId]?.price * 0.19).toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total due today</span>
                  <span className="text-2xl font-bold">
                    €{(pricingPlans[planId]?.price * 1.19).toFixed(2)}
                  </span>
                </div>
                
                <Button
                  className="w-full bg-black text-white hover:bg-gray-800"
                  size="lg"
                  onClick={handleProcessPayment}
                  disabled={processing}
                >
                  {processing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Confirm & Pay
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-center text-[#666666]">
                  By confirming, you agree to our Terms of Service and authorize the recurring monthly charge.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Regular Payment Management Tabs */}
      {!planId && (
        <>
          <div className="flex gap-2 border-b border-[#eeeeee]">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'border-b-2 border-black text-black'
                  : 'text-[#666666] hover:text-black'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('payment-methods')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'payment-methods'
                  ? 'border-b-2 border-black text-black'
                  : 'text-[#666666] hover:text-black'
              }`}
            >
              Payment Methods
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'invoices'
                  ? 'border-b-2 border-black text-black'
                  : 'text-[#666666] hover:text-black'
              }`}
            >
              Invoices
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-[#979797]">
                <CardHeader>
                  <CardTitle>Current Subscription</CardTitle>
                  <CardDescription>Your active plan and billing information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-[#666666] mb-1">Current Plan</p>
                    <p className="text-2xl font-bold">Pro Plan</p>
                    <p className="text-sm text-[#666666] mt-1">€299/month + VAT</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666666]">Billing cycle</span>
                      <span className="font-medium">Monthly</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666666]">Next billing date</span>
                      <span className="font-medium">
                        {new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666666]">Payment method</span>
                      <span className="font-medium">•••• 4242</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/brand/subscription')}
                  >
                    Change Plan
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-[#979797]">
                <CardHeader>
                  <CardTitle>Usage This Month</CardTitle>
                  <CardDescription>Track your current usage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-[#666666]">Virtual Try-Ons</span>
                      <span className="text-sm font-medium">12,450 / 20,000</span>
                    </div>
                    <div className="w-full bg-[#eeeeee] rounded-full h-2">
                      <div
                        className="bg-black h-2 rounded-full transition-all"
                        style={{ width: '62.25%' }}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666666]">API calls</span>
                      <span className="font-medium">34,892</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666666]">Storage used</span>
                      <span className="font-medium">24.5 GB</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === 'payment-methods' && (
            <div className="space-y-6">
              <Card className="border-[#979797]">
                <CardHeader>
                  <CardTitle>Saved Payment Methods</CardTitle>
                  <CardDescription>Manage your payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center justify-between p-4 border border-[#eeeeee] rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-[#eeeeee] rounded">
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {method.brand} •••• {method.last4}
                          </p>
                          <p className="text-sm text-[#666666]">
                            Expires {method.expMonth.toString().padStart(2, '0')}/{method.expYear}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.isDefault && (
                          <Badge variant="outline">Default</Badge>
                        )}
                        <Button variant="ghost" size="sm">Remove</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-[#979797]">
                <CardHeader>
                  <CardTitle>Add Payment Method</CardTitle>
                  <CardDescription>Add a new card for payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddPaymentMethod} className="space-y-4">
                    <div>
                      <Label htmlFor="cardName2">Cardholder Name *</Label>
                      <Input
                        id="cardName2"
                        required
                        value={cardForm.cardName}
                        onChange={(e) => setCardForm({ ...cardForm, cardName: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cardNumber2">Card Number *</Label>
                      <Input
                        id="cardNumber2"
                        required
                        value={cardForm.cardNumber}
                        onChange={(e) => setCardForm({ ...cardForm, cardNumber: formatCardNumber(e.target.value) })}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry2">Expiry *</Label>
                        <Input
                          id="expiry2"
                          required
                          value={cardForm.expiry}
                          onChange={(e) => setCardForm({ ...cardForm, expiry: formatExpiry(e.target.value) })}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvc2">CVC *</Label>
                        <Input
                          id="cvc2"
                          required
                          type="password"
                          value={cardForm.cvc}
                          onChange={(e) => setCardForm({ ...cardForm, cvc: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                          placeholder="123"
                          maxLength={3}
                        />
                      </div>
                    </div>
                    
                    <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                      Add Payment Method
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <Card className="border-[#979797]">
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View and download your past invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                        <TableCell>{new Date(invoice.date).toLocaleDateString('de-DE')}</TableCell>
                        <TableCell>{invoice.planName}</TableCell>
                        <TableCell>€{invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadInvoice(invoice)}
                            className="gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
