import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  Upload, 
  Camera, 
  Sparkles, 
  ShoppingBag, 
  Heart,
  CheckCircle,
  X,
  Loader2,
  Zap
} from 'lucide-react';
import { products } from '../utils/data';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { analyzePersonPhoto, generateTryOn, checkBackendHealth } from '../utils/tryonApi';
import { ProfessionalVirtualTryOn } from '../components/ProfessionalVirtualTryOn';
import { SEO, virtualTryOnProductSchema, createBreadcrumbSchema, createFAQSchema } from '../components/SEO';

interface AIAnalysis {
  bodyDetected: boolean;
  confidence: number;
  bodyMeasurements: {
    shoulders: number;
    chest: number;
    waist: number;
    hips: number;
    height: number;
  };
  poseDetection: {
    detected: boolean;
    pose: string;
    landmarks: Array<{ name: string; x: number; y: number }>;
  };
  recommendedSize: string;
  clothingFitPrediction: {
    tops: string;
    bottoms: string;
    dresses: string;
  };
}

export default function VirtualTryOnPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { addToCart } = useCart();
  
  const [selectedCategory, setSelectedCategory] = useState<'tops' | 'bottoms' | 'dresses'>('tops');

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://www.comify.ai' },
    { name: 'Virtual Try-On', url: 'https://www.comify.ai/virtual-try-on' }
  ]);

  const tryOnFAQs = [
    {
      question: 'How accurate is the virtual try-on?',
      answer: 'Our AI-powered virtual try-on technology offers 98% fit accuracy using advanced 3D body scanning and garment simulation algorithms.'
    },
    {
      question: 'Do I need special equipment?',
      answer: 'No special equipment needed! You can use your smartphone camera or upload a photo to create your 3D avatar and try on clothes virtually.'
    },
    {
      question: 'Is my photo data secure?',
      answer: 'Absolutely! All images are encrypted and processed securely. We never store your photos without permission and comply with GDPR regulations.'
    }
  ];
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [tryOnResult, setTryOnResult] = useState<string | null>(null);
  const [backendTryOnUrl, setBackendTryOnUrl] = useState<string | null>(null);
  const [isGeneratingTryOn, setIsGeneratingTryOn] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState<boolean | null>(null);
  const [customGarment, setCustomGarment] = useState<string | null>(null);
  const [customGarmentName, setCustomGarmentName] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const garmentInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Define stopCamera before useEffect that uses it
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Check if FastAPI backend is available on mount
  useEffect(() => {
    checkBackendHealth().then(setBackendAvailable);
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (uploadedPhoto && !aiAnalysis && !isAnalyzing) {
      analyzePhoto();
    }
  }, [uploadedPhoto]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const currentProduct = products.find(p => p.id === selectedProduct);

  const categoryProducts = products.filter(p => {
    if (selectedCategory === 'tops') return p.category === 'Tops' || p.category === 'Formal Shirts';
    if (selectedCategory === 'bottoms') return p.category === 'Bottoms';
    if (selectedCategory === 'dresses') return p.category === 'Dresses';
    return false;
  }).slice(0, 10); // Limit to 10 products for better UX

  const getAIRecommendation = () => {
    if (aiAnalysis && currentProduct) {
      return aiAnalysis.clothingFitPrediction?.[selectedCategory] ?? null;
    }
    return null;
  };

  const aiRecommendedSize = getAIRecommendation();

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result as string);
        setAiAnalysis(null);
        setTryOnResult(null);
        toast.success('Photo uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 640, height: 480 } 
      });
      setStream(mediaStream);
      setShowCamera(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (err) {
      toast.error('Could not access camera. Please check permissions.');
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const photoData = canvas.toDataURL('image/jpeg');
        setUploadedPhoto(photoData);
        setAiAnalysis(null);
        setTryOnResult(null);
        stopCamera();
        toast.success('Photo captured!');
      }
    }
  };

  const removePhoto = () => {
    setUploadedPhoto(null);
    setAiAnalysis(null);
    setTryOnResult(null);
    setBackendTryOnUrl(null);
    toast.success('Photo removed');
  };

  const handleGarmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Garment image should be less than 10MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomGarment(reader.result as string);
        setCustomGarmentName(file.name.replace(/\.[^/.]+$/, ''));
        setSelectedProduct(null);
        setBackendTryOnUrl(null);
        toast.success('Custom garment uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePhoto = async () => {
    if (!uploadedPhoto) return;

    setIsAnalyzing(true);
    setBackendTryOnUrl(null);
    toast.loading('AI analyzing your body...', { id: 'analyze' });

    try {
      let analysis: AIAnalysis;

      if (backendAvailable) {
        // ── Real AI analysis via FastAPI backend ──
        analysis = await analyzePersonPhoto(uploadedPhoto);
      } else {
        // ── Fallback: local simulation (demo mode) ──
        await new Promise(resolve => setTimeout(resolve, 2000));
        analysis = {
          bodyDetected: true,
          confidence: 0.96 + Math.random() * 0.03,
          bodyMeasurements: {
            shoulders: 38 + Math.floor(Math.random() * 12),
            chest: 85 + Math.floor(Math.random() * 15),
            waist: 70 + Math.floor(Math.random() * 15),
            hips: 90 + Math.floor(Math.random() * 15),
            height: 160 + Math.floor(Math.random() * 30),
          },
          poseDetection: {
            detected: true,
            pose: 'standing',
            landmarks: [
              { name: 'nose', x: 0.50, y: 0.12 },
              { name: 'neck', x: 0.50, y: 0.16 },
              { name: 'left_shoulder', x: 0.35, y: 0.20 },
              { name: 'right_shoulder', x: 0.65, y: 0.20 },
              { name: 'left_elbow', x: 0.30, y: 0.32 },
              { name: 'right_elbow', x: 0.70, y: 0.32 },
              { name: 'left_wrist', x: 0.28, y: 0.44 },
              { name: 'right_wrist', x: 0.72, y: 0.44 },
              { name: 'left_waist', x: 0.42, y: 0.42 },
              { name: 'right_waist', x: 0.58, y: 0.42 },
              { name: 'left_hip', x: 0.40, y: 0.50 },
              { name: 'right_hip', x: 0.60, y: 0.50 },
              { name: 'left_knee', x: 0.38, y: 0.70 },
              { name: 'right_knee', x: 0.62, y: 0.70 },
              { name: 'left_ankle', x: 0.37, y: 0.90 },
              { name: 'right_ankle', x: 0.63, y: 0.90 },
            ]
          },
          recommendedSize: ['S', 'M', 'L'][Math.floor(Math.random() * 3)],
          clothingFitPrediction: {
            tops: ['S', 'M', 'L'][Math.floor(Math.random() * 3)],
            bottoms: ['S', 'M', 'L'][Math.floor(Math.random() * 3)],
            dresses: ['S', 'M', 'L'][Math.floor(Math.random() * 3)]
          }
        };
      }

      setAiAnalysis(analysis);
      toast.success(
        `Body analyzed! ${Math.round(analysis.confidence * 100)}% confidence` +
        (backendAvailable ? '' : ' (demo mode)'),
        { id: 'analyze' }
      );
    } catch (error: any) {
      toast.error(error?.message || 'Failed to analyze photo', { id: 'analyze' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedProduct || !selectedSize) {
      toast.error('Please select a size');
      return;
    }

    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor || product.colors[0].name,
      image: '',
      brand: product.brand
    });

    toast.success('Added to cart!');
  };

  // ── Backend try-on generation ──
  const handleGenerateTryOn = async (productId: string | null) => {
    if (!uploadedPhoto || !aiAnalysis || !backendAvailable) return;

    let garmentUrl = '';
    if (customGarment && !productId) {
      // Custom uploaded garment – pass data URI directly
      garmentUrl = customGarment;
    } else {
      const product = products.find(p => p.id === productId);
      if (!product) return;
      garmentUrl = product.images?.[0] || '';
    }
    if (!garmentUrl) return;

    setIsGeneratingTryOn(true);
    setBackendTryOnUrl(null);
    toast.loading('Generating AI try-on...', { id: 'tryon-gen' });

    try {
      const result = await generateTryOn(uploadedPhoto, garmentUrl, selectedCategory);
      setBackendTryOnUrl(result.try_on_image_url);
      toast.success('Try-on generated!', { id: 'tryon-gen' });
    } catch (err: any) {
      console.warn('Backend try-on failed, using client composite:', err);
      toast.dismiss('tryon-gen');
      // Falls through to client-side ProfessionalVirtualTryOn
    } finally {
      setIsGeneratingTryOn(false);
    }
  };

  // Trigger backend try-on when product is selected and backend + analysis ready
  useEffect(() => {
    if (selectedProduct && uploadedPhoto && aiAnalysis && backendAvailable) {
      handleGenerateTryOn(selectedProduct);
    } else if (customGarment && uploadedPhoto && aiAnalysis && backendAvailable) {
      handleGenerateTryOn(null);
    } else {
      setBackendTryOnUrl(null);
    }
  }, [selectedProduct, customGarment, uploadedPhoto, aiAnalysis, backendAvailable, selectedCategory]);

  // Get product image URL (use placeholder image for demo)
  const getProductImageUrl = () => {
    if (!currentProduct) return '';
    
    // Use the actual product's image
    if (currentProduct.images && currentProduct.images.length > 0) {
      return currentProduct.images[0];
    }
    
    // Fallback to category images if no product image
    const categoryImages: Record<string, string> = {
      'tops': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
      'bottoms': 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80',
      'dresses': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80'
    };
    
    return categoryImages[selectedCategory] || '';
  };

  return (
    <>
      <SEO
        title="Virtual Try-On - AI Fashion Technology | Comify AI"
        description="Try on clothes virtually before you buy! Use our AI-powered 3D avatar technology to see how garments fit. 98% accuracy, instant results, secure and private."
        keywords="virtual try-on, AI try-on, 3D avatar fashion, virtual fitting room, online clothing try-on, AI fashion technology, virtual garment fitting"
        url="https://www.comify.ai/virtual-try-on"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbSchema, virtualTryOnProductSchema, createFAQSchema(tryOnFAQs)]
        }}
      />
      <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-black" />
            AI Virtual Try-On Studio
          </h1>
          <p className="text-gray-600 mt-2">
            Upload your photo and see how clothes look on you with AI-powered realism
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Try-On View */}
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <CardTitle>Your Virtual Try-On</CardTitle>
                    {aiAnalysis && (
                      <Badge className="bg-green-500">
                        <Zap className="w-3 h-3 mr-1" />
                        AI Active
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleUploadPhoto}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={handleFileSelect}
                      className="border-black hover:bg-gray-50"
                      disabled={isAnalyzing}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={showCamera ? stopCamera : startCamera}
                      className="border-black hover:bg-gray-50"
                      disabled={isAnalyzing}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      {showCamera ? 'Cancel' : 'Camera'}
                    </Button>
                    {uploadedPhoto && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={removePhoto}
                        className="border-red-500 text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Camera */}
                {showCamera && (
                  <div>
                    <div className="bg-black rounded-lg overflow-hidden">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full aspect-[3/4] object-cover"
                      />
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button onClick={capturePhoto} className="flex-1 bg-black hover:bg-gray-900">
                        <Camera className="w-4 h-4 mr-2" />
                        Capture
                      </Button>
                    </div>
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                )}

                {/* Try-On Result */}
                {!showCamera && uploadedPhoto && aiAnalysis && (selectedProduct || customGarment) && (
                  <div className="relative rounded-lg overflow-hidden border-2 border-black bg-black">
                    {/* Show backend-generated image if available */}
                    {backendTryOnUrl ? (
                      <img
                        src={backendTryOnUrl}
                        alt="AI Virtual Try-On Result"
                        className="w-full aspect-[3/4] object-contain"
                      />
                    ) : isGeneratingTryOn ? (
                      <div className="w-full aspect-[3/4] flex flex-col items-center justify-center bg-black text-white">
                        <Loader2 className="w-12 h-12 animate-spin mb-3 text-green-400" />
                        <p className="font-semibold">AI generating try-on image...</p>
                        <p className="text-sm text-gray-400 mt-1">Processing with neural network</p>
                      </div>
                    ) : (
                      <ProfessionalVirtualTryOn
                        userPhoto={uploadedPhoto}
                        clothingImage={getProductImageUrl()}
                        productName={currentProduct?.name || ''}
                        selectedSize={selectedSize || 'M'}
                        selectedColor={selectedColor}
                        aiAnalysis={aiAnalysis}
                        category={selectedCategory}
                        onResultReady={(result) => setTryOnResult(result)}
                      />
                    )}
                  </div>
                )}

                {/* Photo without try-on */}
                {!showCamera && uploadedPhoto && (!aiAnalysis || (!selectedProduct && !customGarment)) && (
                  <div className="relative rounded-lg overflow-hidden border-2 border-black bg-black">
                    <img 
                      src={uploadedPhoto} 
                      alt="Your photo" 
                      className="w-full aspect-[3/4] object-contain"
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white">
                        <Loader2 className="w-12 h-12 animate-spin mb-3" />
                        <p className="font-semibold">Analyzing your body...</p>
                        <p className="text-sm text-gray-300">Detecting pose and measurements</p>
                      </div>
                    )}
                  </div>
                )}

                {/* No photo */}
                {!uploadedPhoto && !showCamera && (
                  <div className="aspect-[3/4] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                    <Upload className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-gray-600 text-center px-6 mb-4">
                      Upload or take a full-body photo to start
                    </p>
                    <Button onClick={handleFileSelect} className="bg-black hover:bg-gray-900">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                  </div>
                )}

                {/* AI Analysis Results */}
                {aiAnalysis && (
                  <div className="mt-4 p-4 bg-white border-2 border-black rounded-lg">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      AI Body Analysis Complete
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600">Confidence</p>
                        <p className="font-bold text-lg">{Math.round(aiAnalysis.confidence * 100)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Best Size</p>
                        <p className="font-bold text-lg text-green-600">{aiAnalysis.recommendedSize}</p>
                      </div>
                    </div>
                    {!selectedProduct && !customGarment && (
                      <p className="text-sm text-gray-600 mt-3">
                        👉 Select a product or upload your own garment to see virtual try-on
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right: Product Selection */}
          <div className="space-y-6">
            {/* Custom Garment Upload */}
            <Card className="border-2 border-dashed border-purple-400">
              <CardContent className="p-4">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-purple-600" />
                  Upload Your Own Garment
                </h3>
                <input
                  type="file"
                  ref={garmentInputRef}
                  onChange={handleGarmentUpload}
                  accept="image/*"
                  className="hidden"
                />
                {customGarment ? (
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded border-2 border-purple-500 overflow-hidden flex-shrink-0">
                      <img src={customGarment} alt="Custom garment" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{customGarmentName || 'Custom Garment'}</p>
                      <p className="text-xs text-purple-600">Custom upload</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-400 text-red-500 flex-shrink-0"
                      onClick={() => { setCustomGarment(null); setCustomGarmentName(''); setBackendTryOnUrl(null); }}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full border-purple-400 text-purple-700 hover:bg-purple-50"
                    onClick={() => garmentInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Garment Image
                  </Button>
                )}
              </CardContent>
            </Card>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-300 w-full" />
              <span className="bg-gray-50 px-3 text-xs text-gray-500 absolute">OR pick from catalog</span>
            </div>

            <Card className="border-2">
              <CardContent className="p-4">
                <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="tops">Tops</TabsTrigger>
                    <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
                    <TabsTrigger value="dresses">Dresses</TabsTrigger>
                  </TabsList>

                  <TabsContent value={selectedCategory} className="mt-4 space-y-3 max-h-[400px] overflow-y-auto">
                    {categoryProducts.map((product) => (
                      <div
                        key={product.id}
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedProduct === product.id
                            ? 'border-black bg-gray-100 shadow-md'
                            : 'hover:border-gray-400'
                        }`}
                        onClick={() => {
                          setSelectedProduct(product.id);
                          setCustomGarment(null);
                          setCustomGarmentName('');
                          setSelectedSize(aiAnalysis?.clothingFitPrediction?.[selectedCategory] || '');
                          setSelectedColor('');
                          setBackendTryOnUrl(null);
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-16 h-16 bg-gray-200 rounded border overflow-hidden flex-shrink-0">
                            {product.images && product.images.length > 0 ? (
                              <img 
                                src={product.images[0]} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  // Fallback to gray if image fails
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-300" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{product.name}</h4>
                            <p className="text-xs text-gray-600">{product.brand}</p>
                            <p className="text-sm font-bold mt-1">€{product.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Product Details */}
            {currentProduct && (
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>{currentProduct.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-2xl font-bold">€{currentProduct.price}</p>

                  {aiRecommendedSize && (
                    <div className="p-3 bg-green-50 border-2 border-green-500 rounded-lg">
                      <p className="text-sm font-medium text-green-900">
                        ✨ AI Recommends: Size {aiRecommendedSize}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium block mb-2">Size</label>
                    <Select value={selectedSize} onValueChange={setSelectedSize}>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Choose size" />
                      </SelectTrigger>
                      <SelectContent>
                        {currentProduct.sizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size} {size === aiRecommendedSize && '⭐'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">Color</label>
                    <div className="flex gap-2">
                      {currentProduct.colors.slice(0, 6).map((color) => (
                        <button
                          key={color.name}
                          className={`w-10 h-10 rounded-full border-2 ${
                            selectedColor === color.name
                              ? 'border-black ring-2 ring-black ring-offset-2'
                              : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          onClick={() => setSelectedColor(color.name)}
                        />
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-black hover:bg-gray-900" 
                    onClick={handleAddToCart}
                    disabled={!selectedSize}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}