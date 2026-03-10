import { Card, CardContent } from '../components/ui/card';
import { Sparkles, Target, Heart, Zap } from 'lucide-react';
import missionImage from 'figma:asset/6f9731cd75e2ce7936106f114a3782a082e0dfe5.png';
import technologyImage from 'figma:asset/08ca6fd141269e71ebeb9b59ac6d13dd6c3e5aac.png';
import { SEO, organizationSchema, createBreadcrumbSchema } from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { t, language } = useLanguage();
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://www.comify.ai' },
    { name: 'About', url: 'https://www.comify.ai/about' }
  ]);

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": organizationSchema
  };
  const values = [
    {
      icon: Sparkles,
      title: t('about.value1Title'),
      description: t('about.value1Desc')
    },
    {
      icon: Target,
      title: t('about.value2Title'),
      description: t('about.value2Desc')
    },
    {
      icon: Heart,
      title: t('about.value3Title'),
      description: t('about.value3Desc')
    },
    {
      icon: Zap,
      title: t('about.value4Title'),
      description: t('about.value4Desc')
    }
  ];

  return (
    <>
      <SEO
        title={language === 'de' 
          ? 'Über Comify AI - Führendes KI-Fashion-Tech-Unternehmen'
          : 'About Comify AI - Leading AI Fashion Technology Company'}
        description={language === 'de'
          ? 'Erfahren Sie mehr über Comify AIs Mission, Mode-E-Commerce mit KI-gestützter virtueller Anprobe-Technologie zu revolutionieren. Ansässig in Bremen, Deutschland, für Europas führende Modemarken.'
          : 'Learn about Comify AI\'s mission to revolutionize fashion e-commerce with AI-powered virtual try-on technology. Based in Bremen, Germany, serving Europe\'s leading fashion brands.'}
        keywords={language === 'de'
          ? 'Über Comify AI, Fashion Tech Unternehmen, KI Mode Technologie, Virtuelle Anprobe Unternehmen, Bremen Fashion Tech, KI Unternehmen Deutschland'
          : 'about Comify AI, fashion tech company, AI fashion technology, virtual try-on company, Bremen fashion tech, AI company Germany'}
        url="https://www.comify.ai/about"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbSchema, aboutSchema]
        }}
      />
      <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#eeeeee] via-white to-[#eeeeee] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6 text-black">{t('about.title')}</h1>
          <p className="text-xl text-[#666666] max-w-3xl mx-auto">
            {t('about.heroSubtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-black">{t('about.missionTitle')}</h2>
            <p className="text-[#666666] leading-relaxed mb-4">
              {t('about.missionText1')}
            </p>
            <p className="text-[#666666] leading-relaxed">
              {t('about.missionText2')}
            </p>
          </div>
          <div>
            <img
              src={missionImage}
              alt="Diverse people using virtual try-on technology"
              className="rounded-lg shadow-xl w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">{t('about.valuesTitle')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-2 border-[#979797] hover:border-black transition-all">
                <CardContent className="p-6">
                  <div className="bg-gradient-to-br from-[#eeeeee] to-[#979797] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-black">{value.title}</h3>
                  <p className="text-[#666666] text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <img
              src={technologyImage}
              alt="Our Technology"
              className="rounded-lg shadow-xl w-full h-96 object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold mb-4 text-black">{t('about.technologyTitle')}</h2>
            <p className="text-[#666666] leading-relaxed mb-4">
              {t('about.technologyText1')}
            </p>
            <p className="text-[#666666] leading-relaxed mb-4">
              {t('about.technologyText2')}
            </p>
            <ul className="space-y-2 text-[#666666]">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black rounded-full" />
                {t('about.tech1')}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black rounded-full" />
                {t('about.tech2')}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black rounded-full" />
                {t('about.tech3')}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black rounded-full" />
                {t('about.tech4')}
              </li>
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-black via-[#666666] to-black rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-12">{t('about.statsTitle')}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <p className="text-5xl font-bold mb-2">10K+</p>
              <p className="opacity-90">{t('about.stat1')}</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">98%</p>
              <p className="opacity-90">{t('about.stat2')}</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">50K+</p>
              <p className="opacity-90">{t('about.stat3')}</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">85%</p>
              <p className="opacity-90">{t('about.stat4')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}