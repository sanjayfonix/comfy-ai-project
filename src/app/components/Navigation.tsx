import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ShoppingCart, User, Menu, X, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import comifyLogo from 'figma:asset/6089597c987a8792ad21b7e936f8b0e1cc14deb1.png';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  const navLinks = [
    { name: t('nav.home'), path: '/', isRegular: true },
    { name: t('nav.about'), path: '/about', isRegular: true },
    ...(isAuthenticated ? [{ name: t('nav.shop'), path: '/shop', isRegular: true }] : []),
    { name: t('nav.virtualTryOn'), path: '/try-on', isRegular: true },
    { name: language === 'de' ? 'Blog' : 'Blog', path: '/blog', isRegular: true },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#979797] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={comifyLogo} alt="Comify AI" className="h-10" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[#666666] hover:text-[#000000] transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
            {/* Highlighted Partner Link */}
            <Link to="/partner-with-us">
              <Button 
                size="sm" 
                className="bg-[#000000] hover:bg-[#666666] text-white shadow-md hover:shadow-lg transition-all"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Partner with Us
              </Button>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle - Desktop */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="hidden md:flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{language.toUpperCase()}</span>
            </Button>

            {/* Cart - Only show when logged in */}
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => navigate('/checkout')}
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    {t('nav.dashboard')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/try-on')}>{
                    t('nav.virtualTryOn')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    {t('nav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  {t('nav.login')}
                </Button>
                <Button onClick={() => navigate('/signup')}>
                  {t('nav.signup')}
                </Button>
              </div>
            )}

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleLanguage}
            >
              <Globe className="w-5 h-5" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#979797] bg-white">
          <div className="px-4 py-3 space-y-3">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="block text-[#666666] hover:text-[#000000] transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {/* Highlighted Partner Link - Mobile */}
            <Link to="/partner-with-us" onClick={() => setMobileMenuOpen(false)}>
              <Button 
                className="w-full bg-[#000000] hover:bg-[#666666] text-white"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Partner with Us
              </Button>
            </Link>
            {!isAuthenticated && (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                  }}
                >
                  {t('nav.login')}
                </Button>
                <Button
                  className="w-full"
                  onClick={() => {
                    navigate('/signup');
                    setMobileMenuOpen(false);
                  }}
                >
                  {t('nav.signup')}
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}