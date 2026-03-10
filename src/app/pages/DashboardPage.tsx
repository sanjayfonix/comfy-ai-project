import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  TrendingUp,
  Clock,
  Tag,
  ArrowRight,
  User,
  Ruler,
  Settings,
  Building2,
  Shield
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import ProfileSettings from '../components/ProfileSettings';

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const recommendations = [
    {
      id: 1,
      title: 'Elegant Evening Dress',
      image: 'https://images.unsplash.com/photo-1768460608433-d3af5148832c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd29tYW4lMjBmYXNoaW9uJTIwZHJlc3MlMjBzdHVkaW98ZW58MXx8fHwxNzcxMTgzOTM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: 249.99,
      match: '95%',
      reason: 'Perfect for your body type'
    },
    {
      id: 2,
      title: 'Casual Denim Outfit',
      image: 'https://images.unsplash.com/photo-1619027131391-87eadec6a398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGNhc3VhbCUyMGRlbmltJTIwamVhbnMlMjBvdXRmaXR8ZW58MXx8fHwxNzcxMTgzOTM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: 89.99,
      match: '92%',
      reason: 'Matches your style preferences'
    },
    {
      id: 3,
      title: 'Professional Blazer Set',
      image: 'https://images.unsplash.com/photo-1770364019737-aca75ef026fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGJsYXplciUyMG91dGZpdHxlbnwxfHx8fDE3NzExODM5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      price: 179.99,
      match: '90%',
      reason: 'Trending in your size'
    },
    {
      id: 4,
      title: 'Summer Floral Dress',
      image: 'https://images.unsplash.com/photo-1602303894456-398ce544d90b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHN1bW1lciUyMGRyZXNzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NzExODAwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      price: 129.99,
      match: '88%',
      reason: 'Based on your favorite colors'
    }
  ];

  const recentActivity = [
    { id: 1, action: 'Tried on Silk Blouse', time: '2 hours ago', icon: Sparkles },
    { id: 2, action: 'Saved Midi Dress to favorites', time: '1 day ago', icon: Heart },
    { id: 3, action: 'Purchased Cashmere Sweater', time: '3 days ago', icon: ShoppingBag }
  ];

  const stats = [
    { label: 'Items Tried', value: '24', icon: Sparkles, color: 'text-black bg-[#eeeeee]' },
    { label: 'Saved Items', value: '12', icon: Heart, color: 'text-black bg-[#eeeeee]' },
    { label: 'Orders', value: '5', icon: ShoppingBag, color: 'text-black bg-[#eeeeee]' },
    { label: 'Perfect Fits', value: '98%', icon: TrendingUp, color: 'text-black bg-[#eeeeee]' }
  ];

  return (
    <div className="min-h-screen bg-[#eeeeee] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold">User Dashboard</h1>
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-black text-white text-sm font-semibold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <p className="text-[#666666] mt-2">Welcome back, {user.name}! 👋 Here's what we've curated for you today</p>
        </div>

        {/* Admin Navigation - Only for stanifex31@yahoo.com */}
        {user.email === 'stanifex31@yahoo.com' && (
          <Card className="mb-8 bg-gradient-to-r from-black via-gray-900 to-black text-white border-2 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Admin Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Button 
                  className="h-20 bg-white text-black hover:bg-gray-200"
                  onClick={() => navigate('/brand/dashboard')}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Building2 className="w-6 h-6" />
                    <div className="text-center">
                      <div className="font-semibold">Brand Dashboard</div>
                      <div className="text-xs opacity-70">Partner Portal</div>
                    </div>
                  </div>
                </Button>
                <Button 
                  className="h-20 bg-white text-black hover:bg-gray-200"
                  onClick={() => navigate('/admin/tenants')}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Shield className="w-6 h-6" />
                    <div className="text-center">
                      <div className="font-semibold">Admin Panel</div>
                      <div className="text-xs opacity-70">System Management</div>
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-[#979797]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#666666]">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Profile Settings Section - Full Width */}
        <div className="mb-8">
          <ProfileSettings />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personalized Recommendations */}
            <Card className="border-[#979797]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-black" />
                    Personalized For You
                  </CardTitle>
                  <Link to="/shop">
                    <Button variant="ghost" size="sm">
                      View All
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {recommendations.map((item) => (
                    <div key={item.id} className="group cursor-pointer" onClick={() => navigate('/shop')}>
                      <div className="relative overflow-hidden rounded-lg mb-3">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-2 right-2 bg-black text-white">
                          {item.match} Match
                        </Badge>
                      </div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-[#666666]">{item.reason}</p>
                      <p className="text-lg font-bold text-black mt-1">${item.price}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-[#979797]">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button 
                    className="h-24 bg-black hover:bg-[#666666] text-white"
                    onClick={() => navigate('/try-on')}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Sparkles className="w-6 h-6" />
                      <span>Virtual Try-On</span>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 border-[#979797] hover:bg-[#eeeeee]"
                    onClick={() => navigate('/shop')}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <ShoppingBag className="w-6 h-6" />
                      <span>Browse Shop</span>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 border-[#979797] hover:bg-[#eeeeee]"
                    onClick={() => navigate('/shop')}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Tag className="w-6 h-6" />
                      <span>New Arrivals</span>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Body Type</p>
                  <p className="font-medium capitalize">{user.bodyMeasurements?.bodyType || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Preferred Styles</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {user.preferences?.style?.slice(0, 3).map((style) => (
                      <Badge key={style} variant="secondary">{style}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Typical Sizes</p>
                  <div className="flex gap-2 mt-1">
                    {user.preferences?.sizes?.map((size) => (
                      <Badge key={size} variant="outline">{size}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-[#979797]">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="bg-[#eeeeee] p-2 rounded-lg border border-[#979797]">
                        <activity.icon className="w-4 h-4 text-black" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-[#666666]">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Special Offers */}
            <Card className="bg-black text-white border-[#979797]">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Special Offer! 🎉</h3>
                <p className="text-sm text-[#eeeeee] mb-4">
                  Get 20% off your next purchase when you complete your first virtual try-on
                </p>
                <Button variant="secondary" size="sm" className="w-full bg-white text-black hover:bg-[#eeeeee]" onClick={() => navigate('/try-on')}>
                  Start Try-On
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}