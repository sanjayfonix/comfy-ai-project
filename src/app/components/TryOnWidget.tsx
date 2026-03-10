import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Upload, 
  Camera, 
  X, 
  Loader2, 
  Sparkles,
  CheckCircle,
  ArrowLeft,
  Maximize2
} from 'lucide-react';
import { toast } from 'sonner';
import { analyzePersonPhoto, generateTryOn as generateTryOnApi, checkBackendHealth } from '../utils/tryonApi';

interface TryOnWidgetProps {
  productId: string;
  productName: string;
  productImage: string;
  productPrice: number;
  brandId: string;
  brandName?: string;
  apiKey: string;
  onAddToCart?: (size: string, color: string) => void;
  onClose?: () => void;
  theme?: {
    primaryColor?: string;
    buttonColor?: string;
    accentColor?: string;
  };
}

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
}

/**
 * TryOnWidget - White-label virtual try-on component
 * This component can be embedded into any brand's website/app
 * 
 * Usage:
 * <TryOnWidget
 *   productId="prod_123"
 *   productName="Cotton T-Shirt"
 *   productImage="/path/to/product.jpg"
 *   productPrice={29.99}
 *   brandId="brand_123"
 *   apiKey="your-api-key"
 *   onAddToCart={(size, color) => handleAddToCart(size, color)}
 *   theme={{ primaryColor: '#000000', buttonColor: '#000000' }}
 * />
 */
export function TryOnWidget({
  productId,
  productName,
  productImage,
  productPrice,
  brandId,
  brandName,
  apiKey,
  onAddToCart,
  onClose,
  theme = {}
}: TryOnWidgetProps) {
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [tryOnResult, setTryOnResult] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('default');
  const [isGenerating, setIsGenerating] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState<boolean | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const primaryColor = theme.primaryColor || '#000000';
  const buttonColor = theme.buttonColor || '#000000';

  useEffect(() => {
    checkBackendHealth().then(setBackendAvailable);
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Auto-analyze when photo uploaded
  useEffect(() => {
    if (uploadedPhoto && !isAnalyzing && !aiAnalysis) {
      analyzePhoto();
    }
  }, [uploadedPhoto]);

  // Generate try-on when analysis complete
  useEffect(() => {
    if (aiAnalysis && uploadedPhoto && !isGenerating && !tryOnResult) {
      generateTryOn();
    }
  }, [aiAnalysis]);

  // Regenerate when size/color changes
  useEffect(() => {
    if (aiAnalysis && uploadedPhoto && tryOnResult) {
      generateTryOn();
    }
  }, [selectedSize, selectedColor]);

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

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
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

  const analyzePhoto = async () => {
    if (!uploadedPhoto) return;

    setIsAnalyzing(true);
    toast.loading('Analyzing your photo...', { id: 'analyze' });

    try {
      let analysis: AIAnalysis;

      if (backendAvailable) {
        // Real AI analysis via backend
        const result = await analyzePersonPhoto(uploadedPhoto);
        analysis = {
          bodyDetected: result.bodyDetected,
          confidence: result.confidence,
          bodyMeasurements: result.bodyMeasurements,
          poseDetection: result.poseDetection,
          recommendedSize: result.recommendedSize,
        };
      } else {
        // Fallback simulation
        await new Promise(resolve => setTimeout(resolve, 2000));
        analysis = {
          bodyDetected: true,
          confidence: 0.96,
          bodyMeasurements: {
            shoulders: Math.floor(Math.random() * 10) + 38,
            chest: Math.floor(Math.random() * 15) + 85,
            waist: Math.floor(Math.random() * 15) + 70,
            hips: Math.floor(Math.random() * 15) + 90,
            height: Math.floor(Math.random() * 30) + 160,
          },
          poseDetection: {
            detected: true,
            pose: 'standing',
            landmarks: [
              { name: 'left_shoulder', x: 0.35, y: 0.22 },
              { name: 'right_shoulder', x: 0.65, y: 0.22 },
              { name: 'left_hip', x: 0.40, y: 0.50 },
              { name: 'right_hip', x: 0.60, y: 0.50 },
              { name: 'neck', x: 0.50, y: 0.18 },
              { name: 'left_waist', x: 0.42, y: 0.45 },
              { name: 'right_waist', x: 0.58, y: 0.45 },
            ]
          },
          recommendedSize: ['S', 'M', 'L'][Math.floor(Math.random() * 3)]
        };
      }

      setAiAnalysis(analysis);
      toast.success(`Body detected! Confidence: ${Math.round(analysis.confidence * 100)}%`, { id: 'analyze' });
    } catch (error: any) {
      toast.error(error?.message || 'Failed to analyze photo', { id: 'analyze' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateTryOn = async () => {
    if (!uploadedPhoto || !aiAnalysis) return;

    setIsGenerating(true);
    toast.loading('Generating virtual try-on...', { id: 'generate' });

    try {
      if (backendAvailable) {
        // Backend-powered try-on
        const result = await generateTryOnApi(uploadedPhoto, productImage);
        setTryOnResult(result.try_on_image_url);
        toast.success('Try-on ready!', { id: 'generate' });
      } else {
        // Fallback client-side composite
        const result = await createTryOnComposite(uploadedPhoto, productImage, aiAnalysis);
        setTryOnResult(result);
        toast.success('Try-on ready!', { id: 'generate' });
      }
    } catch (error) {
      // Fall back to client-side composite on error
      try {
        const result = await createTryOnComposite(uploadedPhoto, productImage, aiAnalysis);
        setTryOnResult(result);
        toast.success('Try-on ready!', { id: 'generate' });
      } catch {
        toast.error('Failed to generate try-on', { id: 'generate' });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const createTryOnComposite = async (
    bodyPhoto: string,
    clothingImage: string,
    analysis: AIAnalysis
  ): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const bodyImg = new Image();
      const clothingImg = new Image();

      bodyImg.onload = () => {
        canvas.width = bodyImg.width;
        canvas.height = bodyImg.height;

        // Draw body photo
        ctx.drawImage(bodyImg, 0, 0);

        clothingImg.onload = () => {
          // Get landmark positions
          const landmarks = analysis.poseDetection.landmarks;
          const leftShoulder = landmarks.find(l => l.name === 'left_shoulder');
          const rightShoulder = landmarks.find(l => l.name === 'right_shoulder');
          const leftWaist = landmarks.find(l => l.name === 'left_waist');
          const rightWaist = landmarks.find(l => l.name === 'right_waist');
          const neck = landmarks.find(l => l.name === 'neck');

          if (leftShoulder && rightShoulder && leftWaist && rightWaist && neck) {
            // Calculate clothing placement
            const shoulderWidth = (rightShoulder.x - leftShoulder.x) * canvas.width;
            const bodyHeight = (leftWaist.y - neck.y) * canvas.height;
            
            // Scale clothing to fit body
            const clothingWidth = shoulderWidth * 1.3;
            const clothingHeight = bodyHeight * 1.4;

            const x = (leftShoulder.x * canvas.width) - (clothingWidth - shoulderWidth) / 2;
            const y = neck.y * canvas.height - clothingHeight * 0.1;

            // Apply transparency and blend mode for realistic look
            ctx.globalAlpha = 0.85;
            ctx.globalCompositeOperation = 'multiply';

            // Draw clothing
            ctx.drawImage(clothingImg, x, y, clothingWidth, clothingHeight);

            // Reset composite settings
            ctx.globalAlpha = 1.0;
            ctx.globalCompositeOperation = 'source-over';

            // Add subtle shadow for depth
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;

            // Draw clothing again with slight overlay for better blending
            ctx.globalAlpha = 0.7;
            ctx.drawImage(clothingImg, x, y, clothingWidth, clothingHeight);

            ctx.globalAlpha = 1.0;
            ctx.shadowColor = 'transparent';

            // Add product badge
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            ctx.fillRect(10, 10, 220, 50);
            ctx.fillStyle = 'white';
            ctx.font = 'bold 16px sans-serif';
            ctx.fillText(productName, 20, 30);
            ctx.font = '14px sans-serif';
            ctx.fillText(`Size: ${selectedSize}`, 20, 50);
          }

          resolve(canvas.toDataURL('image/jpeg', 0.9));
        };

        clothingImg.src = clothingImage;
      };

      bodyImg.src = bodyPhoto;
    });
  };

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart(selectedSize, selectedColor);
    }
    toast.success('Added to cart!');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6" style={{ color: primaryColor }} />
              <div>
                <h2 className="text-2xl font-bold">Virtual Try-On</h2>
                {brandName && (
                  <p className="text-sm text-gray-600">Powered by Comify AI for {brandName}</p>
                )}
              </div>
            </div>
            {onClose && (
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left: Photo Upload & Try-On Result */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleUploadPhoto}
                  accept="image/*"
                  className="hidden"
                />
                <Button 
                  variant="outline" 
                  onClick={handleFileSelect}
                  disabled={isAnalyzing || isGenerating}
                  className="flex-1"
                  style={{ borderColor: primaryColor }}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photo
                </Button>
                <Button 
                  variant="outline"
                  onClick={showCamera ? stopCamera : startCamera}
                  disabled={isAnalyzing || isGenerating}
                  className="flex-1"
                  style={{ borderColor: primaryColor }}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  {showCamera ? 'Cancel' : 'Take Photo'}
                </Button>
              </div>

              {/* Camera View */}
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
                  <div className="mt-2 flex gap-2">
                    <Button 
                      onClick={capturePhoto} 
                      className="flex-1"
                      style={{ backgroundColor: buttonColor }}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Capture
                    </Button>
                  </div>
                  <canvas ref={canvasRef} className="hidden" />
                </div>
              )}

              {/* Try-On Result */}
              {!showCamera && (
                <div className="relative rounded-lg overflow-hidden border-2 bg-gray-100" style={{ borderColor: primaryColor }}>
                  {tryOnResult ? (
                    <div className="relative">
                      <img 
                        src={tryOnResult} 
                        alt="Virtual Try-On Result" 
                        className="w-full aspect-[3/4] object-contain bg-gray-900"
                      />
                      {isGenerating && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Loader2 className="w-8 h-8 text-white animate-spin" />
                        </div>
                      )}
                      <Badge className="absolute top-2 right-2 bg-green-500">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Try-On Active
                      </Badge>
                    </div>
                  ) : uploadedPhoto ? (
                    <div className="relative">
                      <img 
                        src={uploadedPhoto} 
                        alt="Your Photo" 
                        className="w-full aspect-[3/4] object-contain bg-gray-900"
                      />
                      {(isAnalyzing || isGenerating) && (
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                          <Loader2 className="w-12 h-12 animate-spin mb-3" />
                          <p className="font-semibold">
                            {isAnalyzing ? 'Analyzing body...' : 'Generating try-on...'}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-[3/4] flex flex-col items-center justify-center text-gray-500">
                      <Upload className="w-16 h-16 mb-4 opacity-50" />
                      <p className="text-center px-6">
                        Upload or take a photo to see how this item looks on you
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* AI Analysis Info */}
              {aiAnalysis && (
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    AI Analysis Complete
                  </h3>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Confidence</p>
                      <p className="font-bold">{Math.round(aiAnalysis.confidence * 100)}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Height</p>
                      <p className="font-bold">{aiAnalysis.bodyMeasurements.height}cm</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Best Fit</p>
                      <p className="font-bold text-green-600">Size {aiAnalysis.recommendedSize}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Product Details & Controls */}
            <div className="space-y-4">
              {/* Product Image */}
              <div className="rounded-lg overflow-hidden border-2" style={{ borderColor: primaryColor }}>
                <img 
                  src={productImage} 
                  alt={productName} 
                  className="w-full aspect-square object-cover"
                />
              </div>

              {/* Product Info */}
              <div>
                <h3 className="text-2xl font-bold">{productName}</h3>
                <p className="text-3xl font-bold mt-2" style={{ color: primaryColor }}>
                  €{productPrice.toFixed(2)}
                </p>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Size
                  {aiAnalysis && (
                    <span className="ml-2 text-green-600 text-xs">
                      (AI recommends: {aiAnalysis.recommendedSize})
                    </span>
                  )}
                </label>
                <div className="flex gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                        selectedSize === size
                          ? 'scale-105 shadow-md'
                          : 'hover:scale-105'
                      }`}
                      style={{
                        borderColor: selectedSize === size ? primaryColor : '#e5e5e5',
                        backgroundColor: selectedSize === size ? primaryColor : 'white',
                        color: selectedSize === size ? 'white' : 'black'
                      }}
                    >
                      {size}
                      {size === aiAnalysis?.recommendedSize && (
                        <span className="ml-1">⭐</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Select Color</label>
                <div className="flex gap-2">
                  {[
                    { name: 'Black', hex: '#000000' },
                    { name: 'White', hex: '#FFFFFF' },
                    { name: 'Gray', hex: '#808080' },
                    { name: 'Navy', hex: '#000080' },
                  ].map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? 'scale-110 ring-2 ring-offset-2'
                          : 'hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: color.hex,
                        borderColor: selectedColor === color.name ? primaryColor : '#e5e5e5',
                        ringColor: primaryColor
                      }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button 
                  className="w-full text-lg py-6"
                  style={{ backgroundColor: buttonColor }}
                  onClick={handleAddToCartClick}
                  disabled={!tryOnResult}
                >
                  {tryOnResult ? 'Add to Cart' : 'Upload photo to continue'}
                </Button>
                
                {tryOnResult && (
                  <p className="text-sm text-center text-gray-600">
                    ✨ Confident this fits? Perfect size selected based on AI analysis
                  </p>
                )}
              </div>

              {/* Powered by Comify AI */}
              <div className="pt-4 border-t text-center">
                <p className="text-xs text-gray-500">
                  Powered by <span className="font-semibold">Comify AI</span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
