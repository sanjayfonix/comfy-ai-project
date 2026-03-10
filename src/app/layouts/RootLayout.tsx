import { Outlet } from 'react-router';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { LanguageProvider } from '../context/LanguageContext';
import { Toaster } from '../components/ui/sonner';
import { LiveChat } from '../components/LiveChat';

export default function RootLayout() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-white flex flex-col">
            <Navigation />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
            <Toaster />
            <LiveChat />
          </div>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}