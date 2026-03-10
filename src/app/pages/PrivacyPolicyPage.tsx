import { Link } from 'react-router';
import { Sparkles } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-black to-[#666666] bg-clip-text text-transparent">
            Datenschutzerklärung (Privacy Policy)
          </h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Einleitung</h2>
              <p className="leading-relaxed">
                Comify AI GmbH ("wir", "uns", "unser") nimmt den Schutz Ihrer persönlichen Daten sehr ernst. 
                Diese Datenschutzerklärung informiert Sie darüber, wie wir personenbezogene Daten erheben, 
                verarbeiten und nutzen, wenn Sie unsere Website und Dienste nutzen. Wir verpflichten uns zur 
                Einhaltung der Datenschutz-Grundverordnung (DSGVO) und des Bundesdatenschutzgesetzes (BDSG).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Verantwortliche Stelle</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">Comify AI GmbH</p>
                <p>Robert-Koch-Straße 22</p>
                <p>28277, Bremen, Deutschland</p>
                <p className="mt-2">E-Mail: ifexstan@yahoo.com</p>
                <p>Telefon: +49 (0) 421-70911311</p>
                <p className="mt-2">Geschäftsführer: [Name]</p>
                <p>Handelsregister: Amtsgericht Charlottenburg, HRB [Nummer]</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Erhebung und Verarbeitung personenbezogener Daten</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">3.1 Daten bei Registrierung</h3>
              <p className="leading-relaxed mb-3">Bei der Registrierung erheben wir:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name (Vor- und Nachname)</li>
                <li>E-Mail-Adresse</li>
                <li>Passwort (verschlüsselt gespeichert)</li>
                <li>Körpermaße (für virtuelle Anprobe)</li>
                <li>Stilpräferenzen</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">3.2 Automatisch erhobene Daten</h3>
              <p className="leading-relaxed mb-3">Bei der Nutzung unserer Website werden automatisch erhoben:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP-Adresse</li>
                <li>Browsertyp und -version</li>
                <li>Betriebssystem</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Besuchte Seiten</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">3.3 Nutzung der virtuellen Anprobe</h3>
              <p className="leading-relaxed">
                Für die virtuelle Anprobe-Funktion verarbeiten wir Ihre Körpermaße zur Erstellung eines 
                personalisierten 3D-Avatars. Diese Daten werden ausschließlich für die Bereitstellung 
                dieses Services verwendet und nicht an Dritte weitergegeben.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Rechtsgrundlage der Verarbeitung</h2>
              <p className="leading-relaxed mb-3">Die Verarbeitung Ihrer Daten erfolgt auf Grundlage von:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Art. 6 Abs. 1 lit. b DSGVO - Vertragserfüllung</li>
                <li>Art. 6 Abs. 1 lit. a DSGVO - Ihre Einwilligung</li>
                <li>Art. 6 Abs. 1 lit. f DSGVO - Berechtigte Interessen</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies</h2>
              <p className="leading-relaxed mb-3">
                Unsere Website verwendet Cookies, um die Benutzererfahrung zu verbessern. Sie können 
                Ihren Browser so einstellen, dass er Sie über das Setzen von Cookies informiert und 
                Sie diese blockieren können.
              </p>
              <p className="leading-relaxed">
                Wir verwenden sowohl Session-Cookies (gelöscht nach Ende Ihrer Sitzung) als auch 
                permanente Cookies (bleiben auf Ihrem Gerät gespeichert).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Weitergabe von Daten</h2>
              <p className="leading-relaxed mb-3">
                Wir geben Ihre personenbezogenen Daten nicht an Dritte weiter, außer:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Zur Auftragsabwicklung (Versanddienstleister, Zahlungsanbieter)</li>
                <li>Bei gesetzlicher Verpflichtung</li>
                <li>Mit Ihrer ausdrücklichen Einwilligung</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Ihre Rechte</h2>
              <p className="leading-relaxed mb-3">Sie haben folgende Rechte:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
                <li>Recht auf Widerruf der Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Datensicherheit</h2>
              <p className="leading-relaxed">
                Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten 
                gegen zufällige oder vorsätzliche Manipulationen, Verlust, Zerstörung oder gegen den 
                Zugriff unberechtigter Personen zu schützen. Unsere Sicherheitsmaßnahmen werden 
                entsprechend der technologischen Entwicklung fortlaufend verbessert.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Speicherdauer</h2>
              <p className="leading-relaxed">
                Wir speichern Ihre personenbezogenen Daten nur so lange, wie es für die Erfüllung 
                der Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Beschwerderecht</h2>
              <p className="leading-relaxed">
                Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, 
                wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen Datenschutzrecht verstößt.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-3">
                <p className="font-medium">Zuständige Aufsichtsbehörde:</p>
                <p>Die Landesbeauftragte für Datenschutz und Informationsfreiheit Bremen</p>
                <p>Arndtstraße 1, 27570 Bremerhaven</p>
                <p>E-Mail: office@datenschutz.bremen.de</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Änderungen dieser Datenschutzerklärung</h2>
              <p className="leading-relaxed">
                Wir behalten uns das Recht vor, diese Datenschutzerklärung anzupassen, damit sie 
                stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer 
                Leistungen umzusetzen.
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