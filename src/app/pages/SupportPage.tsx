import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  Search, 
  Clock,
  ChevronRight
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    orderNumber: '',
    subject: '',
    message: ''
  });

  const handleOpenChat = () => {
    // Trigger chat to open by dispatching a custom event
    window.dispatchEvent(new CustomEvent('openLiveChat'));
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:ifexstan@yahoo.com?subject=Support Anfrage&body=Hallo Comify AI Team,%0D%0A%0D%0AIch habe folgende Frage:%0D%0A%0D%0A';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+494217091131';
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      toast.error('Bitte füllen Sie alle Pflichtfelder aus!');
      return;
    }

    // Create email body with form data
    const emailBody = `
Vorname: ${formData.firstName}
Nachname: ${formData.lastName}
E-Mail: ${formData.email}
Bestellnummer: ${formData.orderNumber || 'Nicht angegeben'}
Betreff: ${formData.subject}

Nachricht:
${formData.message}
    `.trim();

    // Open email client with pre-filled data
    window.location.href = `mailto:ifexstan@yahoo.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Show success message
    toast.success('Ihre Nachricht wird gesendet! Ihr E-Mail-Programm wird geöffnet.');
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      orderNumber: '',
      subject: '',
      message: ''
    });
  };

  // Link mapping for help topics
  const helpTopicLinks: { [key: string]: string } = {
    'Bestellung verfolgen': '/dashboard',
    'Versandkosten': '#versandkosten-faq',
    'Lieferzeiten': '#lieferzeiten-faq',
    'Versandländer': '#versandlaender-faq',
    'Rücksendung anmelden': '/dashboard',
    'Rückgaberichtlinien': '#rueckgabe-faq',
    'Umtausch beantragen': '/contact',
    'Rückerstattung': '#rueckerstattung-faq',
    'Konto erstellen': '/signup',
    'Passwort zurücksetzen': '/login',
    'Profil bearbeiten': '/dashboard',
    'Maße aktualisieren': '/dashboard'
  };

  const handleHelpTopicClick = (item: string) => {
    const link = helpTopicLinks[item];
    if (link.startsWith('#')) {
      // Scroll to FAQ or filter FAQs
      setSearchQuery(item);
      // Smooth scroll to FAQ section
      const faqSection = document.querySelector('.faq-section');
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to page
      window.location.href = link;
    }
  };

  const faqs = [
    {
      question: 'Wie funktioniert die virtuelle Anprobe?',
      answer: 'Unsere virtuelle Anprobe verwendet einen personalisierten 3D-Avatar basierend auf Ihren Körpermaßen. Nach der Eingabe Ihrer Maße beim ersten Login können Sie Kleidungsstücke virtuell anprobieren und sehen, wie sie an Ihrem Körper aussehen würden.'
    },
    {
      question: 'Wie genau sind die Größenempfehlungen?',
      answer: 'Unsere KI-gestützten Größenempfehlungen haben eine Genauigkeit von 98%. Sie basieren auf Ihren individuellen Körpermaßen, historischen Kaufdaten und Feedback von Tausenden von Kundinnen.'
    },
    {
      question: 'Kann ich meine Körpermaße später ändern?',
      answer: 'Ja, Sie können Ihre Körpermaße jederzeit in Ihrem Dashboard unter "Profil bearbeiten" aktualisieren. Der 3D-Avatar wird dann automatisch angepasst.'
    },
    {
      question: 'Wie lange dauert der Versand?',
      answer: 'Standardversand dauert 5-7 Werktage und ist bei Bestellungen über 50€ kostenlos. Expressversand (2-3 Werktage) ist für 14,99€ verfügbar.'
    },
    {
      question: 'Welche Zahlungsmethoden akzeptieren Sie?',
      answer: 'Wir akzeptieren Kreditkarten (Visa, Mastercard, American Express), PayPal, SEPA-Lastschrift, Sofortüberweisung und Klarna (Rechnung und Ratenkauf).'
    },
    {
      question: 'Wie funktioniert die Rückgabe?',
      answer: 'Sie haben 14 Tage Zeit, Artikel zurückzugeben. Melden Sie die Rücksendung in Ihrem Dashboard an, drucken Sie das Rücksendeetikett aus und senden Sie das Paket kostenfrei zurück. Die Erstattung erfolgt innerhalb von 5-7 Werktagen nach Erhalt der Ware.'
    },
    {
      question: 'Sind meine Daten sicher?',
      answer: 'Ja, wir nehmen Datenschutz sehr ernst. Alle Daten werden DSGVO-konform verschlüsselt gespeichert. Ihre Körpermaße und persönlichen Informationen werden niemals an Dritte weitergegeben.'
    },
    {
      question: 'Kann ich ohne Registrierung einkaufen?',
      answer: 'Für die Nutzung der virtuellen Anprobe und personalisierten Empfehlungen ist eine Registrierung erforderlich. Sie können jedoch auch als Gast einkaufen, ohne diese Features zu nutzen.'
    }
  ];

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(faq => 
    searchQuery === '' ||
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Sofortige Hilfe von unserem Support-Team',
      availability: 'Mo-Fr: 9:00-20:00 Uhr, Sa: 10:00-18:00 Uhr',
      action: 'Chat starten',
      color: 'black'
    },
    {
      icon: Mail,
      title: 'E-Mail Support',
      description: 'ifexstan@yahoo.com',
      availability: 'Antwort innerhalb von 24 Stunden',
      action: 'E-Mail senden',
      color: 'black'
    },
    {
      icon: Phone,
      title: 'Telefon',
      description: '+49 (0) 421-70911311',
      availability: 'Mo-Fr: 9:00-18:00 Uhr',
      action: 'Anrufen',
      color: 'blue'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black via-[#666666] to-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageCircle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Wie können wir helfen?</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Durchsuchen Sie unsere FAQ oder kontaktieren Sie unser Support-Team
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Suchen Sie nach Antworten..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Methods */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Kontaktieren Sie uns
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => {
              let handleClick;
              if (method.action === 'Chat starten') {
                handleClick = handleOpenChat;
              } else if (method.action === 'E-Mail senden') {
                handleClick = handleEmailClick;
              } else if (method.action === 'Anrufen') {
                handleClick = handlePhoneClick;
              }

              return (
                <Card key={index} className="hover:shadow-lg transition-all border-2 hover:border-[#979797]">
                  <CardContent className="p-6 text-center">
                    <div className={`bg-${method.color}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <method.icon className={`w-8 h-8 text-${method.color}-600`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                    {method.action === 'E-Mail senden' ? (
                      <a href="mailto:ifexstan@yahoo.com" className="text-black hover:text-[#666666] font-semibold mb-2 block">
                        {method.description}
                      </a>
                    ) : method.action === 'Anrufen' ? (
                      <a href="tel:+494217091131" className="text-black hover:text-[#666666] font-semibold mb-2 block">
                        {method.description}
                      </a>
                    ) : (
                      <p className="text-gray-700 mb-2">{method.description}</p>
                    )}
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
                      <Clock className="w-4 h-4" />
                      <span>{method.availability}</span>
                    </div>
                    <Button 
                      className="w-full bg-black hover:bg-[#666666]" 
                      onClick={handleClick}
                    >
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16 faq-section">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
              Häufig gestellte Fragen (FAQ)
            </h2>
            
            {searchQuery && filteredFaqs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg mb-2">Keine Ergebnisse gefunden für "{searchQuery}"</p>
                <p className="text-gray-400 text-sm">Versuchen Sie andere Suchbegriffe oder kontaktieren Sie unser Support-Team</p>
              </div>
            )}
            
            {filteredFaqs.length > 0 && (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Nachricht senden
            </h2>
            <p className="text-gray-600 mb-6">
              Haben Sie eine spezifische Frage? Füllen Sie das Formular aus und unser Team wird sich 
              innerhalb von 24 Stunden bei Ihnen melden.
            </p>
            
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vorname
                  </label>
                  <Input 
                    type="text" 
                    placeholder="Ihr Vorname" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nachname
                  </label>
                  <Input 
                    type="text" 
                    placeholder="Ihr Nachname" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-Mail-Adresse
                </label>
                <Input 
                  type="email" 
                  placeholder="ihre.email@beispiel.de" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bestellnummer (optional)
                </label>
                <Input 
                  type="text" 
                  placeholder="z.B. ORD-12345" 
                  value={formData.orderNumber}
                  onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Betreff
                </label>
                <Input 
                  type="text" 
                  placeholder="Worum geht es?" 
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nachricht
                </label>
                <Textarea 
                  placeholder="Beschreiben Sie Ihr Anliegen..." 
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              
              <Button 
                type="submit" 
                size="lg"
                className="w-full bg-black hover:bg-[#666666]"
              >
                Nachricht senden
              </Button>
            </form>
          </div>
        </section>

        {/* Help Topics */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
            Hilfe-Themen
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Bestellungen & Versand', items: ['Bestellung verfolgen', 'Versandkosten', 'Lieferzeiten', 'Versandländer'] },
              { title: 'Rückgaben & Umtausch', items: ['Rücksendung anmelden', 'Rückgaberichtlinien', 'Umtausch beantragen', 'Rückerstattung'] },
              { title: 'Konto & Profil', items: ['Konto erstellen', 'Passwort zurücksetzen', 'Profil bearbeiten', 'Maße aktualisieren'] }
            ].map((topic, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4 text-gray-900">{topic.title}</h3>
                  <ul className="space-y-3">
                    {topic.items.map((item, i) => (
                      <li key={i}>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleHelpTopicClick(item);
                          }}
                          className="text-black hover:text-[#666666] text-sm flex items-center gap-2 transition-colors w-full text-left group font-semibold"
                        >
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Business Hours */}
        <section>
          <div className="bg-gradient-to-br from-[#eeeeee] to-white rounded-lg p-8 text-center">
            <Clock className="w-12 h-12 text-black mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Unsere Öffnungszeiten</h3>
            <div className="max-w-md mx-auto space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Montag - Freitag:</span>
                <span className="font-medium">9:00 - 20:00 Uhr</span>
              </div>
              <div className="flex justify-between">
                <span>Samstag:</span>
                <span className="font-medium">10:00 - 18:00 Uhr</span>
              </div>
              <div className="flex justify-between">
                <span>Sonntag & Feiertage:</span>
                <span className="font-medium">Geschlossen</span>
              </div>
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
          <ChevronRight className="w-4 h-4 mr-2" />
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}