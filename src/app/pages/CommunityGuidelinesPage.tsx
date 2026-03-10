import { Link } from 'react-router';
import { Sparkles, Heart, Users, Shield, MessageCircle } from 'lucide-react';

export default function CommunityGuidelinesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-black to-[#666666] bg-clip-text text-transparent">
            Community-Richtlinien
          </h1>
          
          <div className="space-y-8 text-gray-700">
            <div className="bg-gradient-to-br from-[#eeeeee] to-white p-6 rounded-lg">
              <p className="text-lg leading-relaxed">
                Willkommen in der Comify AI Community! Wir sind eine vielfältige Gemeinschaft von 
                Modebegeisterten, die das Einkaufserlebnis revolutionieren möchten. Unsere Community 
                basiert auf Respekt, Inklusivität und gegenseitiger Unterstützung.
              </p>
            </div>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-8 h-8 text-black" />
                <h2 className="text-2xl font-semibold text-gray-900">1. Respekt und Freundlichkeit</h2>
              </div>
              <ul className="space-y-3 ml-11">
                <li className="leading-relaxed">
                  <strong>Sei respektvoll:</strong> Behandle alle Community-Mitglieder mit Respekt und 
                  Höflichkeit, unabhängig von Herkunft, Identität, Körperform oder Stil.
                </li>
                <li className="leading-relaxed">
                  <strong>Konstruktive Kommunikation:</strong> Feedback und Diskussionen sind willkommen, 
                  sollten aber stets konstruktiv und respektvoll formuliert werden.
                </li>
                <li className="leading-relaxed">
                  <strong>Keine Belästigung:</strong> Belästigung, Mobbing, Hassrede oder diskriminierende 
                  Äußerungen werden nicht toleriert.
                </li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-black" />
                <h2 className="text-2xl font-semibold text-gray-900">2. Inklusivität und Vielfalt</h2>
              </div>
              <ul className="space-y-3 ml-11">
                <li className="leading-relaxed">
                  <strong>Körperpositivität:</strong> Wir feiern alle Körperformen und -größen. 
                  Body-Shaming oder negative Kommentare über das Aussehen anderer sind nicht gestattet.
                </li>
                <li className="leading-relaxed">
                  <strong>Vielfalt wertschätzen:</strong> Respektiere verschiedene Modegeschmäcker, 
                  Stilrichtungen und kulturelle Ausdrucksformen.
                </li>
                <li className="leading-relaxed">
                  <strong>Barrierefreiheit:</strong> Unterstütze eine inklusive Umgebung für alle, 
                  einschließlich Menschen mit Behinderungen.
                </li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-blue-500" />
                <h2 className="text-2xl font-semibold text-gray-900">3. Sicherheit und Datenschutz</h2>
              </div>
              <ul className="space-y-3 ml-11">
                <li className="leading-relaxed">
                  <strong>Privatsphäre schützen:</strong> Teile keine persönlichen Informationen von 
                  anderen ohne deren Zustimmung.
                </li>
                <li className="leading-relaxed">
                  <strong>Sichere Inhalte:</strong> Poste keine unangemessenen, expliziten oder 
                  beleidigenden Inhalte.
                </li>
                <li className="leading-relaxed">
                  <strong>Authentizität:</strong> Gib dich nicht als andere Personen oder Marken aus. 
                  Sei authentisch in deinen Beiträgen und Bewertungen.
                </li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-8 h-8 text-green-500" />
                <h2 className="text-2xl font-semibold text-gray-900">4. Bewertungen und Feedback</h2>
              </div>
              <ul className="space-y-3 ml-11">
                <li className="leading-relaxed">
                  <strong>Ehrliche Bewertungen:</strong> Teile authentische Erfahrungen mit Produkten. 
                  Gefälschte oder bezahlte Bewertungen sind nicht erlaubt.
                </li>
                <li className="leading-relaxed">
                  <strong>Hilfreiche Kommentare:</strong> Konzentriere dich auf die Qualität, Passform 
                  und Eigenschaften der Produkte, nicht auf persönliche Angriffe.
                </li>
                <li className="leading-relaxed">
                  <strong>Fotos teilen:</strong> Beim Teilen von Fotos stelle sicher, dass du die 
                  Rechte daran hast und andere Personen ihre Zustimmung gegeben haben.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Unzulässige Inhalte</h2>
              <p className="leading-relaxed mb-3">Folgende Inhalte sind nicht gestattet:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Hassrede, Diskriminierung oder Aufstachelung zu Gewalt</li>
                <li>Belästigung, Stalking oder Bedrohungen</li>
                <li>Sexuell explizite oder unangemessene Inhalte</li>
                <li>Spam, Werbung oder unerwünschte Promotion</li>
                <li>Urheberrechtsverletzungen oder Diebstahl geistigen Eigentums</li>
                <li>Fehlinformationen oder betrügerische Aktivitäten</li>
                <li>Inhalte, die gegen geltendes Recht verstoßen</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Verwendung der virtuellen Anprobe</h2>
              <ul className="space-y-3">
                <li className="leading-relaxed">
                  <strong>Verantwortungsvolle Nutzung:</strong> Nutze die virtuelle Anprobe-Funktion 
                  verantwortungsvoll und ausschließlich für deren vorgesehenen Zweck.
                </li>
                <li className="leading-relaxed">
                  <strong>Keine Manipulation:</strong> Versuche nicht, das System zu manipulieren oder 
                  zu missbrauchen.
                </li>
                <li className="leading-relaxed">
                  <strong>Feedback willkommen:</strong> Melde technische Probleme oder Verbesserungsvorschläge 
                  an unser Support-Team.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Moderation und Konsequenzen</h2>
              <p className="leading-relaxed mb-3">
                Unser Moderationsteam überwacht die Community, um einen sicheren und positiven Raum 
                zu gewährleisten. Bei Verstößen gegen diese Richtlinien können folgende Maßnahmen 
                ergriffen werden:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Warnung und Aufforderung zur Entfernung unangemessener Inhalte</li>
                <li>Vorübergehende Sperrung von Community-Funktionen</li>
                <li>Dauerhafte Sperrung des Accounts</li>
                <li>Rechtliche Schritte bei schwerwiegenden Verstößen</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Meldung von Verstößen</h2>
              <p className="leading-relaxed mb-3">
                Wenn du unangemessene Inhalte oder Verhaltensweisen bemerkst:
              </p>
              <ul className="space-y-3">
                <li className="leading-relaxed">
                  Nutze die Meldefunktion bei Beiträgen, Bewertungen oder Kommentaren
                </li>
                <li className="leading-relaxed">
                  Kontaktiere unser Moderationsteam unter: moderation@comify.ai
                </li>
                <li className="leading-relaxed">
                  Verwende den Live-Chat für dringende Angelegenheiten
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Geistiges Eigentum</h2>
              <p className="leading-relaxed mb-3">
                Respektiere geistige Eigentumsrechte:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Lade nur Inhalte hoch, für die du die Rechte besitzt</li>
                <li>Gib Quellen an, wenn du Inhalte anderer teilst</li>
                <li>Respektiere Markenzeichen und Urheberrechte von Comify AI und Drittanbietern</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Änderungen der Richtlinien</h2>
              <p className="leading-relaxed">
                Wir behalten uns das Recht vor, diese Community-Richtlinien jederzeit zu aktualisieren. 
                Änderungen werden auf dieser Seite veröffentlicht und treten sofort in Kraft. Deine 
                fortgesetzte Nutzung der Community-Funktionen gilt als Zustimmung zu den aktualisierten 
                Richtlinien.
              </p>
            </section>

            <div className="bg-gradient-to-br from-[#eeeeee] to-white p-6 rounded-lg mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Gemeinsam eine positive Community schaffen</h3>
              <p className="leading-relaxed">
                Unsere Community ist das Herzstück von Comify AI. Indem du dich an diese Richtlinien 
                hältst, hilfst du uns, eine inspirierende, unterstützende und sichere Umgebung für 
                alle zu schaffen. Danke, dass du Teil unserer Community bist! 💖
              </p>
            </div>

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
