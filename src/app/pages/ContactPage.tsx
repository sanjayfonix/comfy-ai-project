import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Mail, Phone, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { SEO, organizationSchema, createBreadcrumbSchema } from '../components/SEO';

export default function ContactPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://www.comify.ai' },
    { name: 'Contact', url: 'https://www.comify.ai/contact' }
  ]);

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": organizationSchema
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Bitte füllen Sie alle Pflichtfelder aus!');
      return;
    }

    // Create email body with form data
    const emailBody = `
Name: ${formData.name}
E-Mail: ${formData.email}
Betreff: ${formData.subject}

Nachricht:
${formData.message}
    `.trim();

    // Open email client with pre-filled data
    window.location.href = `mailto:ifexstan@yahoo.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
    
    toast.success('Ihre Nachricht wird gesendet! Ihr E-Mail-Programm wird geöffnet.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'ifexstan@yahoo.com',
      link: 'mailto:ifexstan@yahoo.com'
    },
    {
      icon: Phone,
      title: 'Telefon',
      content: '+49 (0) 421-70911311',
      link: 'tel:+494217091131'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      content: 'Robert-Koch-Straße 22, 28277, Bremen, Deutschland'
    },
    {
      icon: Clock,
      title: 'Geschäftszeiten',
      content: 'Mo-Fr: 9:00-20:00 Uhr CET, Sa: 10:00-18:00 Uhr CET'
    }
  ];

  const faqs = [
    {
      question: 'Wie funktioniert die virtuelle Anprobe?',
      answer: 'Unsere KI-gestützte virtuelle Anprobe-Technologie erstellt einen personalisierten 3D-Avatar basierend auf Ihren Körpermaßen. Sie können dann Kleidungsstücke virtuell anprobieren und sehen, wie sie an Ihnen aussehen würden. Die Technologie entfernt intelligent Hintergründe, Kleiderbügel und Mannequins aus Produktbildern und platziert nur die Kleidung präzise auf Ihrem Avatar, indem sie Ihre bestehende Kleidung ersetzt, anstatt einfach darüber zu legen. Dies bietet ein realistisches Anprobeerlebnis.'
    },
    {
      question: 'Was ist Ihre Rückgaberichtlinie?',
      answer: 'Wir bieten eine 30-tägige Geld-zurück-Garantie für alle Artikel. Wenn Sie mit Ihrem Kauf nicht zufrieden sind, können Sie die Artikel innerhalb von 30 Tagen nach Erhalt zurücksenden. Die Artikel müssen ungetragen, ungewaschen und in Originalverpackung sein. Die Rücksendung ist kostenlos innerhalb Deutschlands. Bitte melden Sie Ihre Rücksendung über Ihr Dashboard an, um ein kostenloses Rücksendeetikett zu erhalten.'
    },
    {
      question: 'Wie genau sind die Größenempfehlungen?',
      answer: 'Unsere KI-gestützten Größenempfehlungen haben eine Genauigkeit von über 95%. Das System analysiert Ihre Körpermaße, vergleicht sie mit den Produktspezifikationen und berücksichtigt auch Kundenbewertungen zur Passform. Wir empfehlen, Ihre Maße regelmäßig zu aktualisieren, um die genauesten Empfehlungen zu erhalten. Sollte die Größe nicht passen, können Sie jederzeit kostenlos umtauschen.'
    },
    {
      question: 'Versenden Sie international?',
      answer: 'Ja, wir versenden in alle EU-Länder sowie in die Schweiz, UK, USA und Kanada. Die Versandkosten variieren je nach Zielland. Innerhalb Deutschlands ist der Versand ab 50€ kostenlos, ansonsten 4,99€. EU-Versand kostet 9,99€, international 14,99€. Die Lieferzeit beträgt 2-4 Werktage innerhalb Deutschlands, 5-7 Werktage in der EU und 7-14 Werktage international.'
    },
    {
      question: 'Wie sicher sind meine Daten?',
      answer: 'Wir nehmen Datenschutz sehr ernst und sind vollständig DSGVO-konform. Alle personenbezogenen Daten werden verschlüsselt gespeichert. Ihre Körpermaße und Avatar-Daten werden ausschließlich für die virtuelle Anprobe verwendet und niemals an Dritte weitergegeben. Sie haben jederzeit das Recht auf Auskunft, Berichtigung oder Löschung Ihrer Daten. Weitere Informationen finden Sie in unserer Datenschutzerklärung.'
    },
    {
      question: 'Kann ich meine Bestellung ändern oder stornieren?',
      answer: 'Bestellungen können innerhalb von 2 Stunden nach Aufgabe kostenfrei storniert oder geändert werden. Loggen Sie sich dazu in Ihr Dashboard ein und wählen Sie die entsprechende Bestellung aus. Nach dieser Frist wird die Bestellung bereits für den Versand vorbereitet. In diesem Fall können Sie die Artikel nach Erhalt zurücksenden und erhalten eine volle Rückerstattung.'
    },
    {
      question: 'Welche Zahlungsmethoden akzeptieren Sie?',
      answer: 'Wir akzeptieren alle gängigen Zahlungsmethoden: Kreditkarten (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, SOFORT-Überweisung, Klarna (Rechnung und Ratenkauf) sowie Giropay. Alle Zahlungen werden über sichere, verschlüsselte Verbindungen abgewickelt. Bei Fragen zur Zahlung kontaktieren Sie bitte unseren Support.'
    },
    {
      question: 'Bieten Sie einen White-Label-Service für Unternehmen an?',
      answer: 'Ja! Unsere White-Label-Lösung ermöglicht es Modemarken und Einzelhändlern, unsere virtuelle Anprobe-Technologie nahtlos in ihre eigenen Plattformen zu integrieren. Dies umfasst vollständig anpassbare Branding-Optionen, API-Integration und technischen Support. Kontaktieren Sie uns über unsere "Partner with Us"-Seite für weitere Informationen und ein individuelles Angebot.'
    }
  ];

  return (
    <>
      <SEO
        title="Contact Us - Get in Touch with Comify AI | Fashion Tech Support"
        description="Contact Comify AI for virtual try-on solutions and fashion tech support. Located in Bremen, Germany. Phone: +49 (0) 421-70911311. Email: ifexstan@yahoo.com"
        keywords="contact Comify AI, fashion tech support, virtual try-on support, Bremen contact, AI fashion contact"
        url="https://www.comify.ai/contact"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbSchema, contactSchema]
        }}
      />
      <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-black via-[#666666] to-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg opacity-90">
            We'd love to hear from you. Get in touch with our team.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-black hover:bg-[#666666]">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#eeeeee] p-3 rounded-lg">
                      <info.icon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{info.title}</h3>
                      {info.link ? (
                        <a href={info.link} className="text-[#666666] hover:text-black">
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-gray-600">{info.content}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Frequently Asked</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-sm font-semibold">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}