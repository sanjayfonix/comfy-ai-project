import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Sparkles, 
  Scan, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  Star,
  Check
} from 'lucide-react';
import { testimonials } from '../utils/data';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';
import HeroSlider from '../components/HeroSlider';
import comifyLogo from 'figma:asset/6089597c987a8792ad21b7e936f8b0e1cc14deb1.png';
import benefitsImage from 'figma:asset/02d7636635b0f83464340d9ccbf63b428978641f.png';
import { SEO, organizationSchema, localBusinessSchema, createFAQSchema } from '../components/SEO';

export default function HomePage() {
  const { t, language } = useLanguage();

  // FAQ data for schema
  const faqs = [
    {
      question: language === 'de' ? 'Wie funktioniert die virtuelle Anprobe?' : 'How does virtual try-on work?',
      answer: language === 'de' 
        ? 'Unsere KI-gestützte Technologie erstellt einen 3D-Avatar basierend auf Ihren Körpermaßen und zeigt Ihnen in Echtzeit, wie Kleidungsstücke an Ihnen aussehen würden.'
        : 'Our AI-powered technology creates a 3D avatar based on your body measurements and shows you in real-time how garments would look on you.'
    },
    {
      question: language === 'de' ? 'Reduziert virtuelle Anprobe wirklich Retouren?' : 'Does virtual try-on really reduce returns?',
      answer: language === 'de'
        ? 'Ja! Unsere Kunden berichten von einer Reduzierung der Retouren um bis zu 85%, da Kunden besser informierte Kaufentscheidungen treffen können.'
        : 'Yes! Our clients report up to 85% reduction in returns as customers can make more informed purchasing decisions.'
    },
    {
      question: language === 'de' ? 'Ist die Integration schwierig?' : 'Is integration difficult?',
      answer: language === 'de'
        ? 'Nein, die Integration ist nahtlos und kann in weniger als 48 Stunden in Ihre bestehende E-Commerce-Plattform integriert werden.'
        : 'No, integration is seamless and can be completed in less than 48 hours with your existing e-commerce platform.'
    }
  ];

  const homePageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      localBusinessSchema,
      createFAQSchema(faqs),
      {
        "@type": "WebSite",
        "url": "https://www.comify.ai",
        "name": "Comify AI",
        "description": language === 'de'
          ? "Führende KI-gestützte virtuelle Anprobe-Technologie für Mode E-Commerce"
          : "Leading AI-powered virtual try-on technology for fashion e-commerce",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.comify.ai/shop?search={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };
  
  const features = [
    {
      icon: Scan,
      title: t('home.feature1Title'),
      description: t('home.feature1Desc')
    },
    {
      icon: TrendingUp,
      title: t('home.feature2Title'),
      description: t('home.feature2Desc')
    },
    {
      icon: Sparkles,
      title: t('home.feature3Title'),
      description: t('home.feature3Desc')
    },
    {
      icon: ShieldCheck,
      title: t('home.feature4Title'),
      description: t('home.feature4Desc')
    }
  ];

  const benefits = [
    t('home.benefit1'),
    t('home.benefit2'),
    t('home.benefit3'),
    t('home.benefit4'),
    t('home.benefit5'),
    t('home.benefit6'),
  ];

  return (
    <>
      <SEO
        title={language === 'de' 
          ? 'Comify AI - Virtuelle Anprobe Mode Technologie | KI-gestützte Mode Lösungen'
          : 'Comify AI - Virtual Try-On Fashion Technology | AI-Powered Fashion Solutions'}
        description={language === 'de'
          ? 'Erleben Sie die Zukunft der Mode mit Comify AIs virtueller Anprobe-Technologie. Verbessern Sie das Einkaufserlebnis Ihrer Kunden mit KI-Technologie. Reduzieren Sie Retouren um 85% und steigern Sie Conversions um 3.2x.'
          : 'Experience the future of fashion with Comify AI\'s virtual try-on solutions. Enhance your customers\' shopping experience with AI-driven technology. Reduce returns by 85% and increase conversions by 3.2x.'}
        keywords={language === 'de'
          ? 'Virtuelle Anprobe, Mode Technologie, KI Mode, Virtuelle Umkleidekabine, AI Mode Plattform, Virtual Try-On Deutschland, Comify AI, Fashion Tech, E-Commerce Lösungen'
          : 'Virtual Try-On Fashion, Fashion Technology, AI-driven Fashion Try-On, Virtual Reality Fashion Technology, Comify AI, Fashion Try-On AI, Virtual Try-On Germany, E-Commerce Solutions'}
        url="https://www.comify.ai"
        structuredData={homePageSchema}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#eeeeee] via-white to-[#eeeeee] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-black/5 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-black text-white hover:bg-[#666666] shadow-lg">
                ✨ Empowering European Fashion Brands with AI
              </Badge>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                {t('home.heroTitle')}
              </h1>
              
              <p className="text-xl text-[#666666] leading-relaxed">
                {t('home.heroSubtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto bg-black hover:bg-[#666666] text-white shadow-xl">
                    {t('common.getStarted')}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/try-on">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-black hover:bg-[#eeeeee]">
                    {t('common.tryNow')}
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-black text-black" />
                    ))}
                  </div>
                  <p className="text-sm text-[#666666] mt-1">Rated 5.0 by 50,000+ shoppers across Europe</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <HeroSlider />
              
              {/* Floating cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 animate-bounce-slow border border-[#979797]">
                <div className="flex items-center gap-3">
                  <div className="bg-[#eeeeee] rounded-full p-2">
                    <Check className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="font-semibold">Perfect Fit</p>
                    <p className="text-sm text-[#666666]">98% Accuracy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('home.featuresTitle')}</h2>
            <p className="text-xl text-[#666666] max-w-2xl mx-auto">
              Empowering fashion brands across Europe with AI-driven technology for inclusive shopping experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 border-[#979797] hover:border-black transition-all hover:shadow-2xl bg-white">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="bg-gradient-to-br from-[#eeeeee] to-[#979797] w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <feature.icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-[#666666]">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-[#eeeeee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                {t('home.benefitsTitle')}
              </h2>
              <p className="text-lg text-[#666666] mb-8">
                Join thousands of shoppers across Europe who have transformed their online shopping experience with our inclusive, AI-powered platform for everyone.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-black rounded-full p-1 mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-[#000000] text-lg">{benefit}</p>
                  </div>
                ))}
              </div>

              <Link to="/signup">
                <Button size="lg" className="mt-8 bg-black hover:bg-[#666666] shadow-xl">
                  {t('common.getStarted')}
                </Button>
              </Link>
            </div>

            <div className="relative">
              <img
                src={benefitsImage}
                alt="Happy woman shopping online"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('home.testimonialsTitle')}</h2>
            <p className="text-xl text-gray-600">
              Trusted by shoppers of all ages, styles, and backgrounds across Europe
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => {
              const avatars = [
                'https://images.unsplash.com/photo-1758613654538-5f353b10f93e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW1lcmljYW4lMjB3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MTE4MzgwNHww&ixlib=rb-4.1.0&q=80&w=1080',
                'https://images.unsplash.com/photo-1643816831186-b2427a8f9f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcG9ydHJhaXQlMjBzbWlsaW5nfGVufDF8fHx8MTc3MTE4MzgwNXww&ixlib=rb-4.1.0&q=80&w=1080',
                'https://images.unsplash.com/photo-1600696444233-20accba67df3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXRpbmElMjB3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MTE4MzgwNXww&ixlib=rb-4.1.0&q=80&w=1080',
                'https://images.unsplash.com/photo-1753161022911-53d8bf22f186?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHRyeWluZyUyMG9uJTIwY2xvdGhlcyUyMG1pcnJvcnxlbnwxfHx8fDE3NzExNzM1NTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
              ];
              
              return (
                <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">"{testimonial.comment}"</p>
                    
                    <div className="flex items-center gap-3 pt-4 border-t">
                      <ImageWithFallback
                        src={avatars[index]}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* For Brands Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-white/20 text-white border-white/30 mb-6">
                {t('home.forBrandsTitle')}
              </Badge>
              <h2 className="text-4xl font-bold mb-6">
                {t('home.empowerBrands')}
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {t('home.brandsSubtitle')}
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                  <div className="text-4xl font-bold text-white">85%</div>
                  <div className="text-gray-300">{t('home.fewerReturns')}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                  <div className="text-4xl font-bold text-white">3.2x</div>
                  <div className="text-gray-300">{t('home.moreConversions')}</div>
                </div>
              </div>
              <Link to="/partner-with-us">
                <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-gray-100 shadow-xl">
                  {t('home.becomePartner')}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Fashion brand partnership"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}