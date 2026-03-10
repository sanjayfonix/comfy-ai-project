import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Mail, Lock, User, Phone, MapPin, Calendar, Ruler } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { useLanguage } from '../context/LanguageContext';
import comifyLogo from 'figma:asset/6089597c987a8792ad21b7e936f8b0e1cc14deb1.png';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Body measurements
    height: '',
    weight: '',
    bust: '',
    waist: '',
    hips: '',
    bodyType: '',
    // Preferences
    styles: [] as string[],
    colors: [] as string[],
    sizes: [] as string[]
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        bodyMeasurements: {
          height: parseFloat(formData.height) || 0,
          weight: parseFloat(formData.weight) || 0,
          bust: parseFloat(formData.bust) || 0,
          waist: parseFloat(formData.waist) || 0,
          hips: parseFloat(formData.hips) || 0,
          bodyType: formData.bodyType as any
        },
        preferences: {
          style: formData.styles,
          favoriteColors: formData.colors,
          sizes: formData.sizes
        }
      });

      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const styleOptions = ['Casual', 'Professional', 'Formal', 'Bohemian', 'Minimalist', 'Trendy', 'Classic', 'Sporty'];
  const colorOptions = ['Black', 'White', 'Navy', 'Pink', 'Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Neutral'];
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eeeeee] via-white to-[#eeeeee] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <img src={comifyLogo} alt="Comify AI" className="h-12" />
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create Your Account</CardTitle>
            <CardDescription>
              Step {step} of 3: {step === 1 ? 'Basic Information' : step === 2 ? 'Body Measurements' : 'Style Preferences'}
            </CardDescription>
            
            {/* Progress Bar */}
            <div className="flex gap-2 mt-4">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 flex-1 rounded-full ${
                    s <= step ? 'bg-gradient-to-r from-black to-[#666666]' : 'bg-[#eeeeee]'
                  }`}
                />
              ))}
            </div>
          </CardHeader>

          <CardContent>
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <form onSubmit={handleStep1Submit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      className="pl-10"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      className="pl-10"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-black hover:bg-[#666666]">
                  Continue
                </Button>

                <p className="text-center text-sm text-[#666666]">
                  Already have an account?{' '}
                  <Link to="/login" className="text-black hover:underline font-semibold">
                    Login
                  </Link>
                </p>
              </form>
            )}

            {/* Step 2: Body Measurements */}
            {step === 2 && (
              <form onSubmit={handleStep2Submit} className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <Ruler className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Why we need this</p>
                      <p className="text-sm text-blue-700">
                        Your measurements help us provide accurate virtual try-on and size recommendations
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="e.g., 165"
                      value={formData.height}
                      onChange={(e) => handleInputChange('height', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="e.g., 60"
                      value={formData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bust">Bust (cm)</Label>
                    <Input
                      id="bust"
                      type="number"
                      placeholder="e.g., 90"
                      value={formData.bust}
                      onChange={(e) => handleInputChange('bust', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waist">Waist (cm)</Label>
                    <Input
                      id="waist"
                      type="number"
                      placeholder="e.g., 70"
                      value={formData.waist}
                      onChange={(e) => handleInputChange('waist', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hips">Hips (cm)</Label>
                    <Input
                      id="hips"
                      type="number"
                      placeholder="e.g., 95"
                      value={formData.hips}
                      onChange={(e) => handleInputChange('hips', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bodyType">Body Type</Label>
                    <Select value={formData.bodyType} onValueChange={(value) => handleInputChange('bodyType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select body type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pear">Pear</SelectItem>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="hourglass">Hourglass</SelectItem>
                        <SelectItem value="rectangle">Rectangle</SelectItem>
                        <SelectItem value="inverted-triangle">Inverted Triangle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button type="submit" className="flex-1 bg-black hover:bg-[#666666]">
                    Continue
                  </Button>
                </div>
              </form>
            )}

            {/* Step 3: Preferences */}
            {step === 3 && (
              <form onSubmit={handleFinalSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label>Preferred Styles</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {styleOptions.map((style) => (
                      <div key={style} className="flex items-center space-x-2">
                        <Checkbox
                          id={`style-${style}`}
                          checked={formData.styles.includes(style)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleInputChange('styles', [...formData.styles, style]);
                            } else {
                              handleInputChange('styles', formData.styles.filter(s => s !== style));
                            }
                          }}
                        />
                        <label
                          htmlFor={`style-${style}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {style}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Favorite Colors</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {colorOptions.map((color) => (
                      <div key={color} className="flex items-center space-x-2">
                        <Checkbox
                          id={`color-${color}`}
                          checked={formData.colors.includes(color)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleInputChange('colors', [...formData.colors, color]);
                            } else {
                              handleInputChange('colors', formData.colors.filter(c => c !== color));
                            }
                          }}
                        />
                        <label
                          htmlFor={`color-${color}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {color}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Typical Sizes</Label>
                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <Checkbox
                          id={`size-${size}`}
                          checked={formData.sizes.includes(size)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleInputChange('sizes', [...formData.sizes, size]);
                            } else {
                              handleInputChange('sizes', formData.sizes.filter(s => s !== size));
                            }
                          }}
                        />
                        <label
                          htmlFor={`size-${size}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {size}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1 bg-black hover:bg-[#666666]"
                  >
                    {loading ? 'Creating Account...' : 'Complete Sign Up'}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}