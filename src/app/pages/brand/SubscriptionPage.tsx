import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Check, Zap, Crown, Building2, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  tryOnsMin: string;
  tryOnsMax: string;
  features: string[];
  icon: typeof Zap;
  popular?: boolean;
  customContact?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 99,
    currency: '€',
    tryOnsMin: '500',
    tryOnsMax: '5,000',
    icon: Zap,
    features: [
      'Up to 5,000 virtual try-ons/month',
      'Basic 3D avatar generation',
      'Standard API access',
      'Email support (48h response)',
      'Basic analytics dashboard',
      'White-label integration',
      '99.5% uptime SLA',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 299,
    currency: '€',
    tryOnsMin: '5,000',
    tryOnsMax: '20,000',
    icon: Crown,
    popular: true,
    features: [
      'Up to 20,000 virtual try-ons/month',
      'Advanced 3D avatar generation',
      'Priority API access',
      'Priority email support (24h response)',
      'Advanced analytics & insights',
      'White-label integration',
      'Custom branding options',
      '99.9% uptime SLA',
      'Dedicated account manager',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 799,
    currency: '€',
    tryOnsMin: '20,000',
    tryOnsMax: '100,000',
    icon: Building2,
    features: [
      'Up to 100,000 virtual try-ons/month',
      'Premium 3D avatar generation',
      'Unlimited API access',
      '24/7 priority support (4h response)',
      'Enterprise analytics suite',
      'Full white-label customization',
      'Multi-brand management',
      '99.95% uptime SLA',
      'Dedicated technical team',
      'Custom integrations',
      'Training & onboarding',
    ],
  },
  {
    id: 'custom',
    name: 'Custom',
    price: 0,
    currency: '€',
    tryOnsMin: '100,000+',
    tryOnsMax: 'Unlimited',
    icon: Mail,
    customContact: true,
    features: [
      'Unlimited virtual try-ons',
      'Enterprise-grade infrastructure',
      'Custom SLA agreements',
      'Dedicated infrastructure',
      '24/7 premium support',
      'Custom feature development',
      'Strategic partnership options',
      'Volume-based pricing',
    ],
  },
];

export default function SubscriptionPage() {
  const navigate = useNavigate();
  const [currentPlan] = useState('pro'); // Mock current plan
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    expectedVolume: '',
    message: '',
  });

  const handleUpgrade = (planId: string) => {
    if (planId === 'custom') {
      setContactDialogOpen(true);
      return;
    }
    
    setSelectedPlan(planId);
    navigate('/brand/payment', { state: { planId } });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Your inquiry has been submitted! Our team will contact you within 24 hours.');
    setContactDialogOpen(false);
    setContactForm({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      expectedVolume: '',
      message: '',
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Subscription Plans</h1>
        <p className="text-[#666666]">Choose the perfect plan for your brand's needs</p>
      </div>

      {/* Current Plan Status */}
      <Card className="border-[#979797] bg-gradient-to-r from-black to-gray-800 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300 mb-1">Current Plan</p>
              <h3 className="text-2xl font-bold">
                {pricingPlans.find(p => p.id === currentPlan)?.name} Plan
              </h3>
              <p className="text-sm text-gray-300 mt-2">
                Next billing date: {new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('de-DE')}
              </p>
            </div>
            <Badge className="bg-white text-black hover:bg-gray-200">Active</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingPlans.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan = plan.id === currentPlan;
          
          return (
            <Card 
              key={plan.id} 
              className={`relative border-2 transition-all ${
                plan.popular 
                  ? 'border-black shadow-xl scale-105' 
                  : isCurrentPlan
                  ? 'border-green-500'
                  : 'border-[#979797] hover:border-black'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-black text-white">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-[#eeeeee] rounded-full">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>
                  {plan.tryOnsMin} - {plan.tryOnsMax} try-ons/month
                </CardDescription>
                
                <div className="pt-4">
                  {plan.customContact ? (
                    <div className="text-center">
                      <p className="text-3xl font-bold">Contact Us</p>
                      <p className="text-sm text-[#666666] mt-1">Custom pricing</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="flex items-start justify-center gap-1">
                        <span className="text-lg font-semibold mt-1">{plan.currency}</span>
                        <span className="text-4xl font-bold">{plan.price}</span>
                      </div>
                      <p className="text-sm text-[#666666] mt-1">per month</p>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {isCurrentPlan ? (
                  <Button 
                    className="w-full" 
                    variant="outline"
                    disabled
                  >
                    Current Plan
                  </Button>
                ) : (
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-black text-white hover:bg-gray-800' 
                        : 'bg-white text-black border-2 border-black hover:bg-black hover:text-white'
                    }`}
                    onClick={() => handleUpgrade(plan.id)}
                  >
                    {plan.customContact ? 'Contact Sales' : 'Upgrade to ' + plan.name}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Info */}
      <Card className="border-[#979797]">
        <CardHeader>
          <CardTitle>What's Included in All Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">AI-Powered Technology</h4>
              <p className="text-sm text-[#666666]">
                State-of-the-art AI algorithms for realistic virtual try-on experiences
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Secure & Compliant</h4>
              <p className="text-sm text-[#666666]">
                GDPR compliant, ISO 27001 certified, and enterprise-grade security
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Easy Integration</h4>
              <p className="text-sm text-[#666666]">
                Simple API integration with comprehensive documentation and SDKs
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Plan Contact Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Enterprise & Custom Plans</DialogTitle>
            <DialogDescription>
              Tell us about your needs and our team will create a custom solution for your brand.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  required
                  value={contactForm.companyName}
                  onChange={(e) => setContactForm({...contactForm, companyName: e.target.value})}
                  placeholder="Your company name"
                />
              </div>
              <div>
                <Label htmlFor="contactName">Contact Name *</Label>
                <Input
                  id="contactName"
                  required
                  value={contactForm.contactName}
                  onChange={(e) => setContactForm({...contactForm, contactName: e.target.value})}
                  placeholder="Your full name"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  placeholder="your.email@company.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                  placeholder="+49 123 456 789"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="expectedVolume">Expected Monthly Volume *</Label>
              <Input
                id="expectedVolume"
                required
                value={contactForm.expectedVolume}
                onChange={(e) => setContactForm({...contactForm, expectedVolume: e.target.value})}
                placeholder="e.g., 150,000 try-ons per month"
              />
            </div>
            
            <div>
              <Label htmlFor="message">Additional Information</Label>
              <Textarea
                id="message"
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                placeholder="Tell us about your specific needs, integration requirements, or any questions you have..."
              />
            </div>
            
            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={() => setContactDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                Submit Inquiry
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
