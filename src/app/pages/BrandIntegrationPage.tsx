import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { TryOnWidget } from '../components/TryOnWidget';
import { 
  Code, 
  Sparkles, 
  Check, 
  Copy,
  ExternalLink,
  Zap,
  Shield,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';

export default function BrandIntegrationPage() {
  const [showWidget, setShowWidget] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const jsSnippet = `<!-- Add to your product page -->
<script src="https://cdn.comify.ai/widget.js"></script>
<script>
  ComifyAI.init({
    apiKey: 'your_api_key_here',
    brandId: 'your_brand_id'
  });
</script>

<!-- Add Try-On button -->
<button onclick="ComifyAI.openTryOn({
  productId: 'prod_123',
  productName: 'Cotton T-Shirt',
  productImage: '/path/to/product.jpg',
  productPrice: 29.99
})">
  Try On Virtually
</button>`;

  const reactSnippet = `import { TryOnWidget } from '@comify-ai/react';

function ProductPage() {
  const [showTryOn, setShowTryOn] = useState(false);

  return (
    <div>
      <button onClick={() => setShowTryOn(true)}>
        Try On Virtually
      </button>

      {showTryOn && (
        <TryOnWidget
          productId="prod_123"
          productName="Cotton T-Shirt"
          productImage="/path/to/product.jpg"
          productPrice={29.99}
          brandId="your_brand_id"
          apiKey="your_api_key"
          onAddToCart={(size, color) => {
            // Handle add to cart
            console.log('Adding to cart:', size, color);
          }}
          onClose={() => setShowTryOn(false)}
          theme={{
            primaryColor: '#000000',
            buttonColor: '#000000'
          }}
        />
      )}
    </div>
  );
}`;

  const apiSnippet = `// POST https://api.comify.ai/v1/try-on
const response = await fetch('https://your-project.supabase.co/functions/v1/make-server-7c57d885/api/v1/try-on', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Comify-API-Key': 'your_api_key'
  },
  body: JSON.stringify({
    userPhoto: 'base64_encoded_image',
    productImage: 'product_image_url',
    productId: 'prod_123',
    userId: 'user_456'
  })
});

const data = await response.json();
// Returns: { success: true, tryOnId, analysis }`;

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: '< 2 second AI processing time for instant try-on results'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'All photos processed securely and deleted after 24 hours'
    },
    {
      icon: TrendingUp,
      title: 'Boost Conversions',
      description: 'Average 3.2x increase in conversion rates, 85% fewer returns'
    }
  ];

  const stats = [
    { value: '98%', label: 'Accuracy' },
    { value: '2sec', label: 'Processing Time' },
    { value: '50K+', label: 'Try-Ons Daily' },
    { value: '200+', label: 'Fashion Brands' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-white/20 text-white mb-6 text-sm py-2 px-4">
              <Sparkles className="w-4 h-4 inline mr-2" />
              White-Label AI Virtual Try-On Solution
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              Integrate Comify AI Into Your Brand
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Add AI-powered virtual try-on to your e-commerce platform in minutes. 
              Keep your brand identity while boosting conversions by 3.2x.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-100 text-lg py-6 px-8"
                onClick={() => window.location.href = '/partner-with-us'}
              >
                Get API Access
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white/10 text-lg py-6 px-8"
                onClick={() => setShowWidget(true)}
              >
                See Live Demo
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Brands Choose Comify AI</h2>
            <p className="text-gray-600 text-lg">Enterprise-grade virtual try-on technology</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="border-2 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="w-12 h-12 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Integration Code */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Simple Integration</h2>
            <p className="text-gray-600 text-lg">Choose your preferred integration method</p>
          </div>

          <Tabs defaultValue="javascript" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="react">React</TabsTrigger>
              <TabsTrigger value="api">REST API</TabsTrigger>
            </TabsList>

            <TabsContent value="javascript">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>JavaScript Integration</CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(jsSnippet, 'js')}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    {copiedCode === 'js' ? 'Copied!' : 'Copy Code'}
                  </Button>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
                    <code>{jsSnippet}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="react">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>React Component Integration</CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(reactSnippet, 'react')}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    {copiedCode === 'react' ? 'Copied!' : 'Copy Code'}
                  </Button>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
                    <code>{reactSnippet}</code>
                  </pre>
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <strong>📦 Install:</strong> npm install @comify-ai/react
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>REST API Integration</CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(apiSnippet, 'api')}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    {copiedCode === 'api' ? 'Copied!' : 'Copy Code'}
                  </Button>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
                    <code>{apiSnippet}</code>
                  </pre>
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-900">
                        <Check className="w-4 h-4 inline mr-2" />
                        <strong>Full REST API:</strong> Complete control over the try-on experience
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-900">
                        <ExternalLink className="w-4 h-4 inline mr-2" />
                        <strong>API Docs:</strong> Full documentation available at{' '}
                        <a href="/api-docs" className="underline">docs.comify.ai</a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg">Three simple steps to virtual try-on</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Customer Uploads Photo',
                description: 'User takes or uploads a full-body photo on your product page'
              },
              {
                step: '2',
                title: 'AI Analysis',
                description: 'Our AI detects body measurements, pose, and recommends the perfect size'
              },
              {
                step: '3',
                title: 'See & Buy',
                description: 'Customer sees the product on their body and adds to cart with confidence'
              }
            ].map((item, idx) => (
              <Card key={idx} className="relative border-2">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                  {item.step}
                </div>
                <CardContent className="p-6 pt-8">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Fashion Brand?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join 200+ fashion brands using Comify AI to boost conversions and reduce returns
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-100 text-lg py-6 px-8"
              onClick={() => window.location.href = '/partner-with-us'}
            >
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white/10 text-lg py-6 px-8"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>

      {/* Demo Widget */}
      {showWidget && (
        <TryOnWidget
          productId="demo_product"
          productName="Premium Cotton T-Shirt"
          productImage="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80"
          productPrice={29.99}
          brandId="demo_brand"
          brandName="Demo Fashion Brand"
          apiKey="demo_api_key"
          onAddToCart={(size, color) => {
            toast.success(`Added Size ${size} ${color} to cart!`);
            setShowWidget(false);
          }}
          onClose={() => setShowWidget(false)}
          theme={{
            primaryColor: '#000000',
            buttonColor: '#000000'
          }}
        />
      )}
    </div>
  );
}
