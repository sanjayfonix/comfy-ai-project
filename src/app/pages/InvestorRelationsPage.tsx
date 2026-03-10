import { Link } from 'react-router';
import { Sparkles, TrendingUp, Users, Target, Award, FileText } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export default function InvestorRelationsPage() {
  const highlights = [
    {
      icon: Users,
      label: 'Aktive Nutzer',
      value: '50.000+',
      growth: '+285% YoY'
    },
    {
      icon: TrendingUp,
      label: 'Umsatzwachstum',
      value: '€12M',
      growth: '+320% YoY'
    },
    {
      icon: Target,
      label: 'Conversion Rate',
      value: '8.5%',
      growth: '+2.3% YoY'
    },
    {
      icon: Award,
      label: 'Kundenzufriedenheit',
      value: '4.9/5',
      growth: '10.000+ Bewertungen'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black via-[#666666] to-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Investor Relations</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Gestalten Sie die Zukunft des Online-Shopping mit uns. Comify AI revolutioniert 
            die Modebranche durch innovative KI-Technologie.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Company Overview */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Über Comify AI</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Comify AI GmbH ist ein führendes Fashion-Tech-Unternehmen mit Sitz in Bremen, Deutschland. 
                Wir entwickeln KI-gestützte virtuelle Anprobe-Technologie, die das Online-Shopping-Erlebnis 
                revolutioniert und die Retourenquote drastisch reduziert.
              </p>
              <p>
                Unsere Mission ist es, jedem Menschen zu helfen, perfekt passende Kleidung zu finden, 
                unabhängig von Körperform oder Größe. Mit unserer proprietären 3D-Avatar-Technologie 
                und KI-basierten Größenempfehlungen haben wir bereits über 50.000 aktive Nutzerinnen 
                überzeugt.
              </p>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Kennzahlen</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <Card key={index} className="border-2 hover:border-[#979797] transition-all">
                <CardContent className="p-6">
                  <item.icon className="w-10 h-10 text-black mb-3" />
                  <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{item.value}</p>
                  <p className="text-sm text-green-600 font-medium">{item.growth}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Market Opportunity */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Marktpotenzial</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Der globale Online-Modemarkt wird bis 2027 voraussichtlich €1 Billion erreichen, 
                mit einer durchschnittlichen jährlichen Wachstumsrate (CAGR) von 9,7%. Gleichzeitig 
                verursachen Retouren der Branche jährlich Kosten von über €60 Milliarden.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="bg-[#eeeeee] p-4 rounded-lg">
                  <p className="text-2xl font-bold text-black mb-2">€1B</p>
                  <p className="text-sm text-gray-700">Globaler Markt bis 2027</p>
                </div>
                <div className="bg-[#eeeeee] p-4 rounded-lg">
                  <p className="text-2xl font-bold text-black mb-2">30-40%</p>
                  <p className="text-sm text-gray-700">Retourenquote Online-Mode</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600 mb-2">€60B</p>
                  <p className="text-sm text-gray-700">Jährliche Retourenkosten</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Solution */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Unsere Lösung</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-lg font-medium text-gray-900">
                Comify AI reduziert Retouren um bis zu 60% durch:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-black rounded-full p-1 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span><strong>3D-Avatar-Technologie:</strong> Präzise Visualisierung wie Kleidung am eigenen Körper sitzt</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-black rounded-full p-1 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span><strong>KI-Größenempfehlungen:</strong> 98% Genauigkeit bei Passformvorhersagen</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-black rounded-full p-1 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span><strong>Personalisierte Stilberatung:</strong> KI-gestützte Outfit-Empfehlungen basierend auf Präferenzen</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Financial Information */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-black" />
              <h2 className="text-3xl font-bold text-gray-900">Finanzinformationen</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                Für detaillierte Finanzinformationen, Geschäftsberichte und Investor-Präsentationen 
                kontaktieren Sie bitte unser Investor Relations Team.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Kontakt Investor Relations</h3>
                <p>E-Mail: <a href="mailto:ifexstan@yahoo.com" className="text-black hover:text-[#666666] font-semibold">ifexstan@yahoo.com</a></p>
                <p>Telefon: <a href="tel:+494217091131" className="text-black hover:text-[#666666] font-semibold">+49 (0) 421-70911311</a></p>
                <p className="mt-2 text-sm text-gray-600">
                  Verfügbare Dokumente: Jahresabschlüsse, Quartalsberichte, Investor-Präsentationen
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team & Leadership */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Management Team</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Unser Führungsteam besteht aus erfahrenen Experten aus den Bereichen Fashion, 
                Technologie und E-Commerce mit langjähriger Erfahrung bei führenden Unternehmen 
                wie Zalando, Amazon Fashion und Google.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="border border-gray-200 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">CEO & Gründerin</p>
                  <p className="text-sm text-gray-600">15+ Jahre E-Commerce & Fashion Tech</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">CTO</p>
                  <p className="text-sm text-gray-600">KI & Computer Vision Experte</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">CFO</p>
                  <p className="text-sm text-gray-600">Ex-CFO Scale-up Fashion Unternehmen</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">CMO</p>
                  <p className="text-sm text-gray-600">Digital Marketing & Growth Strategist</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Highlights */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-[#eeeeee] to-white rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Warum in Comify AI investieren?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Starkes Wachstum</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 285% Nutzerwachstum im letzten Jahr</li>
                  <li>• 320% Umsatzsteigerung YoY</li>
                  <li>• Expansion in 5 europäische Märkte geplant</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Technologievorsprung</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Patentierte 3D-Avatar-Technologie</li>
                  <li>• Proprietäre KI-Algorithmen</li>
                  <li>• 98% Genauigkeit bei Passformvorhersagen</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Bewährtes Geschäftsmodell</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• B2C und B2B Umsatzströme</li>
                  <li>• Hohe Kundenbindung (85% Wiederkaufrate)</li>
                  <li>• Skalierbare SaaS-Komponente</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Nachhaltigkeit</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 60% weniger Retouren = weniger CO₂</li>
                  <li>• Beitrag zur Kreislaufwirtschaft</li>
                  <li>• ESG-konformes Geschäftsmodell</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section>
          <div className="bg-gradient-to-r from-black via-[#666666] to-black rounded-lg p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Interessiert an einer Partnerschaft?</h2>
            <p className="text-xl mb-6 opacity-90">
              Kontaktieren Sie unser Investor Relations Team für weitere Informationen
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:ifexstan@yahoo.com?subject=Investor Relations Anfrage&body=Hallo Comify AI Team,%0D%0A%0D%0AIch interessiere mich für eine Investition in Comify AI und hätte gerne weitere Informationen.%0D%0A%0D%0AMit freundlichen Grüßen"
                className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#eeeeee] transition-colors"
              >
                E-Mail senden
              </a>
              <Link 
                to="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Kontaktformular
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Link 
          to="/" 
          className="text-black hover:text-[#666666] font-semibold inline-flex items-center"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}