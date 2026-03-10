import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { 
  Building2, 
  Zap, 
  Activity, 
  CreditCard, 
  Menu, 
  X,
  LogOut,
  Shield,
  ArrowLeft,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { LanguageProvider } from '../context/LanguageContext';
import { AuthProvider } from '../context/AuthContext';
import comifyLogo from 'figma:asset/3a417c5da17316907914535aa2d9da54d5f1bf99.png';

export default function AdminPanelLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage to prevent flashing
    const saved = localStorage.getItem('admin_panel_dark_mode');
    return saved === 'true';
  });
  const [isNavigating, setIsNavigating] = useState(false);

  // Persist dark mode preference
  useEffect(() => {
    localStorage.setItem('admin_panel_dark_mode', darkMode.toString());
  }, [darkMode]);

  const navigation = [
    { name: 'Tenants', href: '/admin/tenants', icon: Building2 },
    { name: 'All Jobs', href: '/admin/jobs', icon: Zap },
    { name: 'System Health', href: '/admin/health', icon: Activity },
    { name: 'Billing', href: '/admin/billing', icon: CreditCard },
  ];

  const handleLogout = () => {
    localStorage.removeItem('comify_token');
    navigate('/login', { replace: true });
  };

  const handleBackToDashboard = () => {
    if (isNavigating) return; // Prevent multiple rapid clicks
    setIsNavigating(true);
    
    // Use replace to avoid creating history entries that lead back to login
    navigate('/dashboard', { replace: true });
    
    // Reset navigation flag after a short delay
    setTimeout(() => setIsNavigating(false), 500);
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
          {/* Mobile sidebar */}
          <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <div className={`fixed inset-y-0 left-0 w-72 ${darkMode ? 'bg-[#1a1a1a]' : 'bg-white'} border-r ${darkMode ? 'border-[#333]' : 'border-[#eeeeee]'}`}>
              <div className={`flex items-center justify-between p-6 border-b ${darkMode ? 'border-[#333]' : 'border-[#eeeeee]'}`}>
                <div className="flex items-center gap-2">
                  <Shield className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-black'}`} />
                  <span className="font-bold text-lg">Admin Panel</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="p-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? darkMode ? 'bg-white text-black' : 'bg-black text-white'
                          : darkMode ? 'text-[#979797] hover:bg-[#333]' : 'text-[#666666] hover:bg-[#eeeeee]'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Desktop sidebar */}
          <div className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col ${darkMode ? 'bg-[#1a1a1a]' : 'bg-white'} border-r ${darkMode ? 'border-[#333]' : 'border-[#eeeeee]'}`}>
            <div className={`flex items-center gap-2 p-6 border-b ${darkMode ? 'border-[#333]' : 'border-[#eeeeee]'}`}>
              <Shield className={`w-8 h-8 ${darkMode ? 'text-white' : 'text-black'}`} />
              <span className="font-bold text-xl">Admin Panel</span>
            </div>
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? darkMode ? 'bg-white text-black' : 'bg-black text-white'
                        : darkMode ? 'text-[#979797] hover:bg-[#333]' : 'text-[#666666] hover:bg-[#eeeeee]'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <div className={`p-4 border-t ${darkMode ? 'border-[#333]' : 'border-[#eeeeee]'}`}>
              <Button
                variant="outline"
                onClick={handleBackToDashboard}
                disabled={isNavigating}
                className="w-full justify-start gap-2 mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full justify-start gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:pl-72">
            {/* Top bar */}
            <div className={`sticky top-0 z-40 ${darkMode ? 'bg-[#1a1a1a]' : 'bg-white'} border-b ${darkMode ? 'border-[#333]' : 'border-[#eeeeee]'} backdrop-blur`}>
              <div className="flex items-center justify-between px-4 py-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden"
                  aria-label="Open sidebar"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div className="flex-1" />
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-lg ${darkMode ? 'bg-[#333]' : 'bg-[#eeeeee]'}`}
                  aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Page content */}
            <main className="p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}