import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Label } from '../components/ui/label';
import {
  Store,
  TrendingUp,
  Users,
  Package,
  Zap,
  BarChart3,
  HeadphonesIcon,
  Sparkles,
  Check,
  ArrowRight,
  Globe,
  Shield,
  Rocket,
  Target,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import partnershipImage from 'figma:asset/edd03aeb35950cb5ef585088d82b936fae3948fc.png';
import { SEO, createBreadcrumbSchema, createFAQSchema } from '../components/SEO';

export default function PartnerWithUsPage() {
  const { t, language } = useLanguage();

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://www.comify.ai' },
    { name: 'Partner With Us', url: 'https://www.comify.ai/partner' }
  ]);

  const partnerFAQs = [
    {
      question: language === 'de' ? 'Wie schnell kann ich integrieren?' : 'How quickly can I integrate?',
      answer: language === 'de'
        ? 'Die Integration ist nahtlos und kann in weniger als 48 Stunden mit Ihrer bestehenden E-Commerce-Plattform abgeschlossen werden.'
        : 'Integration is seamless and can be completed in less than 48 hours with your existing e-commerce platform.'
    },
    {
      question: language === 'de' ? 'Welche ROI kann ich erwarten?' : 'What ROI can I expect?',
      answer: language === 'de'
        ? 'Unsere Partner berichten von einer Steigerung der Conversions um 3.2x und einer Reduzierung der Retouren um 85%.'
        : 'Our partners report a 3.2x increase in conversions and 85% reduction in returns.'
    },
    {
      question: language === 'de' ? 'Gibt es langfristige Verträge?' : 'Are there long-term contracts?',
      answer: language === 'de'
        ? 'Wir bieten flexible Partnerschaftsmodelle ohne Mindestvertragslaufzeit an.'
        : 'We offer flexible partnership models with no minimum contract duration.'
    }
  ];
  const [formData, setFormData] = useState({
    brandName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    country: '',
    monthlyVisitors: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Partnership inquiry submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const stats = [
    { value: '85%', label: 'Reduction in Returns' },
    { value: '3.2x', label: 'Increase in Conversion' },
    { value: '50K+', label: 'Active Shoppers' },
    { value: '98%', label: 'Fit Accuracy' },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Boost Conversions',
      description: 'Increase sales by up to 320% with virtual try-on technology that builds customer confidence.',
    },
    {
      icon: Package,
      title: 'Reduce Returns',
      description: 'Cut return rates by 85% with accurate size recommendations and virtual fitting.',
    },
    {
      icon: Users,
      title: 'Customer Insights',
      description: 'Access detailed analytics on customer preferences, body types, and shopping behavior.',
    },
    {
      icon: Zap,
      title: 'Quick Integration',
      description: 'Seamless integration with your existing e-commerce platform in less than 48 hours.',
    },
    {
      icon: Globe,
      title: 'Pan-European Reach',
      description: 'Connect with fashion-conscious shoppers across all European markets.',
    },
    {
      icon: Shield,
      title: 'Data Security',
      description: 'GDPR-compliant platform ensuring customer data privacy and security.',
    },
  ];

  const features = [
    {
      title: 'AI-Powered Virtual Try-On',
      points: [
        '3D body scanning technology',
        'Real-time garment visualization',
        'Multi-angle view capabilities',
        'Accurate fabric draping simulation',
      ],
    },
    {
      title: 'Smart Size Recommendations',
      points: [
        'Machine learning algorithms',
        'Brand-specific size mapping',
        'Fit preference customization',
        'Historical purchase data analysis',
      ],
    },
    {
      title: 'Analytics Dashboard',
      points: [
        'Real-time conversion metrics',
        'Customer behavior insights',
        'Return rate tracking',
        'ROI measurement tools',
      ],
    },
    {
      title: 'Seamless Integration',
      points: [
        'API & SDK support',
        'Shopify, WooCommerce, Magento',
        'Custom platform integration',
        'White-label solutions',
      ],
    },
  ];

  const testimonials = [
    {
      brand: 'Nordic Fashion Co.',
      country: 'Sweden',
      quote: 'Comify AI transformed our online sales. We saw a 280% increase in conversions within the first quarter.',
      author: 'Anna Bergström',
      role: 'E-commerce Director',
    },
    {
      brand: 'Parisian Chic',
      country: 'France',
      quote: 'Returns dropped by 82% and customer satisfaction reached all-time highs. This technology is game-changing.',
      author: 'Marie Dubois',
      role: 'CEO',
    },
    {
      brand: 'Berlin Street Style',
      country: 'Germany',
      quote: 'Integration was seamless and our customers love the virtual try-on feature. Best investment we\'ve made.',
      author: 'Klaus Müller',
      role: 'Operations Manager',
    },
  ];

  return (
    <>
      <SEO
        title={language === 'de'
          ? 'Partner werden - B2B Fashion Tech Lösungen | Comify AI'
          : 'Partner With Us - B2B Fashion Tech Solutions | Comify AI'}
        description={language === 'de'
          ? 'Werden Sie Partner von Comify AI und revolutionieren Sie Ihr Fashion E-Commerce. Steigern Sie Conversions um 3.2x und reduzieren Sie Retouren um 85% mit unserer KI-Technologie.'
          : 'Partner with Comify AI and revolutionize your fashion e-commerce. Boost conversions by 3.2x and reduce returns by 85% with our AI-powered virtual try-on technology.'}
        keywords={language === 'de'
          ? 'Fashion Tech Partner, B2B Mode Technologie, E-Commerce Integration, Virtuelle Anprobe für Marken, Fashion Tech B2B, KI Mode Lösungen'
          : 'Fashion tech partner, B2B fashion technology, e-commerce integration, virtual try-on for brands, fashion tech B2B, AI fashion solutions'}
        url="https://www.comify.ai/partner"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbSchema, createFAQSchema(partnerFAQs)]
        }}
      />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#eeeeee] via-white to-[#eeeeee] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-[#eeeeee] text-black hover:bg-[#979797]">
                <Sparkles className="w-4 h-4 mr-2" />
                Powering Europe's Fashion Revolution
              </Badge>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Partner with{' '}
                <span className="bg-gradient-to-r from-black to-[#666666] bg-clip-text text-transparent">
                  Comify AI
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Join Europe's leading fashion brands in revolutionizing online shopping. 
                Empower your customers with AI-driven virtual try-on technology and watch 
                your conversions soar while returns plummet.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact-form">
                  <Button size="lg" className="w-full sm:w-auto bg-black hover:bg-[#666666]">
                    Start Partnership
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
                <a href="#benefits">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    View Benefits
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative">
              <img
                src={partnershipImage}
                alt="Partnership success"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-black to-[#666666] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Fashion Brands Choose Comify AI</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your online store with cutting-edge AI technology trusted by leading European fashion brands
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2 hover:border-[#979797] transition-all hover:shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="bg-gradient-to-br from-[#eeeeee] to-white w-14 h-14 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Platform Features</h2>
            <p className="text-xl text-gray-600">
              Everything you need to deliver exceptional online shopping experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-black">{feature.title}</h3>
                  <ul className="space-y-2">
                    {feature.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by Leading European Brands</h2>
            <p className="text-xl text-gray-600">
              See what our partners are saying about Comify AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-[#eeeeee] to-white">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{testimonial.country}</Badge>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.brand}</p>
                    <p className="text-sm text-gray-600">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple Integration Process</h2>
            <p className="text-xl text-gray-600">
              Get started with Comify AI in just a few steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Submit Inquiry', desc: 'Fill out the partnership form below' },
              { step: '2', title: 'Consultation Call', desc: 'Discuss your needs with our team' },
              { step: '3', title: 'Integration Setup', desc: 'Our experts handle the technical setup' },
              { step: '4', title: 'Go Live', desc: 'Launch and start seeing results' },
            ].map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="bg-gradient-to-br from-black to-[#666666] w-16 h-16 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
                {index < 3 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 w-6 h-6 text-[#979797]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Start Your Partnership Journey</h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and our team will contact you within 24 hours
            </p>
          </div>

          <Card className="border-2">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="brandName">Brand Name *</Label>
                    <Input
                      id="brandName"
                      name="brandName"
                      value={formData.brandName}
                      onChange={handleChange}
                      placeholder="Your fashion brand"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Name *</Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      placeholder="Your full name"
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
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+49 123 456 7890"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://yourbrand.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm"
                      required
                    >
                      <option value="">Select country</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="IT">Italy</option>
                      <option value="ES">Spain</option>
                      <option value="NL">Netherlands</option>
                      <option value="BE">Belgium</option>
                      <option value="AT">Austria</option>
                      <option value="SE">Sweden</option>
                      <option value="DK">Denmark</option>
                      <option value="NO">Norway</option>
                      <option value="FI">Finland</option>
                      <option value="PL">Poland</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="monthlyVisitors">Monthly Website Visitors</Label>
                    <select
                      id="monthlyVisitors"
                      name="monthlyVisitors"
                      value={formData.monthlyVisitors}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm"
                    >
                      <option value="">Select range</option>
                      <option value="0-10k">0 - 10,000</option>
                      <option value="10k-50k">10,000 - 50,000</option>
                      <option value="50k-100k">50,000 - 100,000</option>
                      <option value="100k-500k">100,000 - 500,000</option>
                      <option value="500k+">500,000+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Tell us about your needs</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What are your goals for implementing virtual try-on technology?"
                    rows={5}
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>By submitting, you agree to our partnership terms and privacy policy</span>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-black hover:bg-[#666666]"
                >
                  Submit Partnership Inquiry
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-gray-600 mt-6">
            Have questions? Contact us at{' '}
            <a href="mailto:ifexstan@yahoo.com" className="text-black hover:underline font-semibold">
              ifexstan@yahoo.com
            </a>{' '}
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black via-[#666666] to-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Rocket className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Fashion Brand?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join the future of fashion retail and give your customers the shopping experience they deserve
          </p>
          <a href="#contact-form">
            <Button size="lg" variant="secondary">
              Get Started Today
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
        </div>
      </section>
    </div>
    </>
  );
}