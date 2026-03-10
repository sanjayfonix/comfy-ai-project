import { Link } from 'react-router';
import { Sparkles } from 'lucide-react';

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-black to-[#666666] bg-clip-text text-transparent">
            Allgemeine Geschäftsbedingungen (Terms and Conditions)
          </h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Geltungsbereich</h2>
              <p className="leading-relaxed">
                Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge, die zwischen 
                der Comify AI GmbH, Robert-Koch-Straße 22, 28277, Bremen, Deutschland ("Verkäufer") und 
                dem Kunden über die Website www.comify.ai geschlossen werden. Die Einbeziehung 
                eigener Bedingungen des Kunden wird widersprochen, es sei denn, es ist etwas anderes 
                vereinbart.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Vertragspartner, Vertragsschluss</h2>
              <p className="leading-relaxed mb-3">
                Der Kaufvertrag kommt zustande mit der Comify AI GmbH.
              </p>
              <p className="leading-relaxed mb-3">
                Die Präsentation der Waren auf unserer Website stellt kein rechtlich bindendes Angebot, 
                sondern einen unverbindlichen Online-Katalog dar. Sie können unsere Produkte zunächst 
                unverbindlich in den Warenkorb legen und Ihre Eingaben vor Absenden Ihrer verbindlichen 
                Bestellung jederzeit korrigieren.
              </p>
              <p className="leading-relaxed">
                Durch Anklicken des Buttons "Zahlungspflichtig bestellen" geben Sie eine verbindliche 
                Bestellung ab. Die Bestätigung des Zugangs Ihrer Bestellung erfolgt unmittelbar nach 
                dem Absenden der Bestellung und stellt noch keine Vertragsannahme dar. Ein Vertrag 
                kommt erst durch Versand der Ware oder durch ausdrückliche Auftragsbestätigung zustande.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Preise und Versandkosten</h2>
              <p className="leading-relaxed mb-3">
                Alle Preise sind Endpreise und enthalten die gesetzliche Umsatzsteuer. Es gelten die 
                Preise zum Zeitpunkt der Bestellung.
              </p>
              <p className="leading-relaxed mb-3">
                Zusätzlich zu den angegebenen Preisen berechnen wir für die Lieferung innerhalb 
                Deutschlands:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Standardversand (5-7 Werktage): 4,99€ (kostenlos ab 50€ Bestellwert)</li>
                <li>Expressversand (2-3 Werktage): 14,99€</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Zahlungsbedingungen</h2>
              <p className="leading-relaxed mb-3">
                Wir akzeptieren folgende Zahlungsmethoden:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Kreditkarte (Visa, Mastercard, American Express)</li>
                <li>PayPal</li>
                <li>SEPA-Lastschrift</li>
                <li>Sofortüberweisung</li>
                <li>Klarna (Rechnung, Ratenkauf)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Lieferung</h2>
              <p className="leading-relaxed mb-3">
                Die Lieferung erfolgt an die vom Kunden angegebene Lieferadresse. Die Lieferzeit 
                beträgt in der Regel 5-7 Werktage ab Vertragsschluss (bei vereinbarter Vorauszahlung 
                ab dem Tag Ihrer Zahlungsanweisung).
              </p>
              <p className="leading-relaxed">
                Bei Expressversand beträgt die Lieferzeit 2-3 Werktage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Widerrufsrecht</h2>
              <div className="bg-[#eeeeee] border border-[#979797] p-4 rounded-lg mb-3">
                <h3 className="font-semibold mb-2">Widerrufsbelehrung</h3>
                <p className="leading-relaxed mb-3">
                  Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag 
                  zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder 
                  ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz 
                  genommen haben bzw. hat.
                </p>
                <p className="leading-relaxed mb-3">
                  Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen Erklärung 
                  (z.B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen 
                  Vertrag zu widerrufen, informieren.
                </p>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Folgen des Widerrufs</h3>
              <p className="leading-relaxed">
                Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen 
                erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, 
                die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns 
                angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens 
                binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren 
                Widerruf dieses Vertrags bei uns eingegangen ist.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Gewährleistung</h2>
              <p className="leading-relaxed">
                Es gilt das gesetzliche Mängelhaftungsrecht. Die Gewährleistungsfrist für Neuware 
                beträgt zwei Jahre ab Erhalt der Ware. Bei Verbrauchern beginnt die Gewährleistungsfrist 
                mit Erhalt der Ware nicht neu, wenn im Rahmen der Gewährleistung ein Austausch der Ware 
                erfolgt.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Haftung</h2>
              <p className="leading-relaxed mb-3">
                Für Ansprüche aufgrund von Schäden, die durch uns, unsere gesetzlichen Vertreter oder 
                Erfüllungsgehilfen verursacht wurden, haften wir stets unbeschränkt:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>bei Verletzung von Leben, Körper und Gesundheit</li>
                <li>bei vorsätzlicher oder grob fahrlässiger Pflichtverletzung</li>
                <li>bei Garantieversprechen, soweit vereinbart</li>
                <li>soweit der Anwendungsbereich des Produkthaftungsgesetzes eröffnet ist</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Virtuelle Anprobe und Größenempfehlungen</h2>
              <p className="leading-relaxed mb-3">
                Unsere KI-gestützte virtuelle Anprobe und Größenempfehlungen dienen lediglich zur 
                Orientierung und stellen keine Garantie für die perfekte Passform dar. Die Genauigkeit 
                hängt von der Qualität der von Ihnen bereitgestellten Maße ab.
              </p>
              <p className="leading-relaxed">
                Wir empfehlen, die bereitgestellten Größentabellen zu konsultieren und im Zweifelsfall 
                unseren Kundenservice zu kontaktieren.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Streitbeilegung</h2>
              <p className="leading-relaxed mb-3">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a href="https://ec.europa.eu/consumers/odr/" className="text-black hover:underline font-semibold ml-1" target="_blank" rel="noopener noreferrer">
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="leading-relaxed">
                Unsere E-Mail-Adresse finden Sie oben in unserem Impressum. Wir sind nicht bereit oder 
                verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle 
                teilzunehmen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Anwendbares Recht</h2>
              <p className="leading-relaxed">
                Für sämtliche Rechtsbeziehungen der Parteien gilt das Recht der Bundesrepublik Deutschland 
                unter Ausschluss der Gesetze über den internationalen Kauf beweglicher Waren. Bei 
                Verbrauchern gilt diese Rechtswahl nur insoweit, als nicht der gewährte Schutz durch 
                zwingende Bestimmungen des Rechts des Staates, in dem der Verbraucher seinen 
                gewöhnlichen Aufenthalt hat, entzogen wird.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Salvatorische Klausel</h2>
              <p className="leading-relaxed">
                Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die 
                Wirksamkeit der übrigen Bestimmungen hiervon unberührt.
              </p>
            </section>

            <p className="text-sm text-gray-600 mt-8 pt-6 border-t">
              Stand: 15. Februar 2026
            </p>
          </div>

          <div className="mt-8">
            <Link 
              to="/" 
              className="text-black hover:text-[#666666] font-semibold inline-flex items-center"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
