import { Link } from 'react-router';
import comifyFooterLogo from 'figma:asset/3a417c5da17316907914535aa2d9da54d5f1bf99.png';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={comifyFooterLogo} alt="Comify AI" className="h-12" />
            </Link>
            <p className="text-sm mb-3">
              AI-powered virtual try-on platform empowering European fashion brands and inclusive shopping for everyone.
            </p>
            <div className="text-sm space-y-1">
              <p className="font-semibold text-white">Comify AI GmbH</p>
              <p>Robert-Koch-Straße 22</p>
              <p>28277, Bremen, Deutschland</p>
              <p className="mt-2">HRB [Nummer]</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Produkt</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/try-on" className="hover:text-white transition-colors">Virtuelle Anprobe</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Über uns</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-white transition-colors">Kontakt</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Hilfe & Live Chat</Link></li>
              <li><Link to="/partner-with-us" className="hover:text-white transition-colors">Partner werden</Link></li>
              <li><Link to="/community-guidelines" className="hover:text-white transition-colors">Community</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Rechtliches & Unternehmen</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Datenschutz</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-white transition-colors">AGB</Link></li>
              <li><Link to="/investor-relations" className="hover:text-white transition-colors">Investor Relations</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2026 Comify AI GmbH. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
