import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { 
  Star, 
  Heart, 
  Share2, 
  Truck, 
  RotateCcw, 
  ShieldCheck,
  Sparkles,
  CheckCircle,
  ChevronLeft
} from 'lucide-react';
import { products } from '../utils/data';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { SEO, createBreadcrumbSchema } from '../components/SEO';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  const product = products.find(p => p.id === id);

  const breadcrumbSchema = product ? createBreadcrumbSchema([
    { name: 'Home', url: 'https://www.comify.ai' },
    { name: 'Shop', url: 'https://www.comify.ai/shop' },
    { name: product.name, url: `https://www.comify.ai/product/${product.id}` }
  ]) : null;

  const productSchema = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.description,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Comify AI"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.comify.ai/product/${product.id}`,
      "priceCurrency": "EUR",
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviews
    }
  } : null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

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

  const getAIRecommendation = () => {
    if (!isAuthenticated || !user?.bodyMeasurements) return null;

    const { bust, waist, hips } = user.bodyMeasurements;
    const avgMeasurement = (bust + waist + hips) / 3;

    let recommendedSize = 'M';
    if (avgMeasurement < 75) recommendedSize = 'XS';
    else if (avgMeasurement < 82) recommendedSize = 'S';
    else if (avgMeasurement < 90) recommendedSize = 'M';
    else if (avgMeasurement < 98) recommendedSize = 'L';
    else if (avgMeasurement < 106) recommendedSize = 'XL';
    else recommendedSize = 'XXL';

    return recommendedSize;
  };

  const aiRecommendedSize = getAIRecommendation();

  return (
    <>
      <SEO
        title={`${product.name} - Virtual Try-On Fashion | Comify AI`}
        description={`${product.description} Try on virtually with our AI-powered 3D avatar technology. €${product.price}. Free shipping and returns. ${product.rating}★ (${product.reviews} reviews)`}
        keywords={`${product.name}, ${product.category}, ${product.occasion}, virtual try-on fashion, buy ${product.name} online, AI fashion shopping`}
        url={`https://www.comify.ai/product/${product.id}`}
        image={product.image}
        type="product"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbSchema, productSchema]
        }}
      />
      <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-[#666666] hover:text-black">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/shop" className="text-[#666666] hover:text-black">Shop</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="sticky top-8">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1761117228880-df2425bd70da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwYmxvdXNlJTIwd29tZW4lMjBmYXNoaW9ufGVufDF8fHx8MTc3MTE4Mzk4OHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-lg cursor-pointer hover:opacity-75" />
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm">
                    {product.rating} ({product.reviews.length || 0} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-black">€{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">
                      €{product.originalPrice}
                    </span>
                    <Badge className="bg-red-500">
                      Save €{(product.originalPrice - product.price).toFixed(2)}
                    </Badge>
                  </>
                )}
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* AI Size Recommendation */}
            {aiRecommendedSize && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-900">AI Size Recommendation</p>
                      <p className="text-sm text-green-700 mt-1">
                        Based on your body measurements, we recommend size <strong>{aiRecommendedSize}</strong> for the perfect fit
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-medium">Select Size</label>
                <button className="text-sm text-black hover:underline font-semibold">Size Guide</button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`py-3 border rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    } ${size === aiRecommendedSize ? 'ring-2 ring-green-400' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {aiRecommendedSize && (
                <p className="text-xs text-gray-600">
                  <Sparkles className="w-3 h-3 inline mr-1 text-green-600" />
                  Green ring indicates AI recommended size
                </p>
              )}
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <label className="font-medium">Select Color</label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === color.name || (!selectedColor && product.colors[0].name === color.name)
                        ? 'border-black scale-110'
                        : 'border-gray-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                  >
                    {(selectedColor === color.name || (!selectedColor && product.colors[0].name === color.name)) && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white drop-shadow-lg" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                {selectedColor || product.colors[0].name}
              </p>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <label className="font-medium">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    className="px-4 py-2 hover:bg-gray-100"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x">{quantity}</span>
                  <button
                    className="px-4 py-2 hover:bg-gray-100"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                {product.inStock ? (
                  <Badge className="bg-green-500">In Stock</Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-black hover:bg-[#666666]"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                Add to Cart
              </Button>
              <Link to="/try-on">
                <Button size="lg" variant="outline" className="w-full">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Try On Virtually
                </Button>
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg">
                  <Heart className="w-5 h-5 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto text-black mb-2" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-gray-600">On orders €50+</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto text-black mb-2" />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-gray-600">30-day policy</p>
              </div>
              <div className="text-center">
                <ShieldCheck className="w-6 h-6 mx-auto text-black mb-2" />
                <p className="text-sm font-medium">Secure Checkout</p>
                <p className="text-xs text-gray-600">100% protected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews.length || 0})</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Material</h3>
                    <p className="text-gray-700">{product.material}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Available Sizes</h3>
                    <p className="text-gray-700">{product.sizes.join(', ')}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Occasions</h3>
                    <div className="flex gap-2">
                      {product.occasion.map(occ => (
                        <Badge key={occ} variant="secondary" className="capitalize">
                          {occ}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Care Instructions</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Machine wash cold</li>
                      <li>Tumble dry low</li>
                      <li>Do not bleach</li>
                      <li>Iron on low heat if needed</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  {isAuthenticated ? (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-3">Write a Review</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm mb-2 block">Rating</label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-6 h-6 cursor-pointer ${
                                  star <= reviewRating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                                onClick={() => setReviewRating(star)}
                              />
                            ))}
                          </div>
                        </div>
                        <Textarea
                          placeholder="Share your experience with this product..."
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                        />
                        <Button 
                          onClick={() => {
                            toast.success('Review submitted!');
                            setReviewText('');
                          }}
                        >
                          Submit Review
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600 mb-6">
                      <Link to="/login" className="text-black hover:underline font-semibold">Login</Link> to write a review
                    </p>
                  )}

                  {product.reviews.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">No reviews yet. Be the first to review!</p>
                  ) : (
                    <div className="space-y-4">
                      {product.reviews.map((review) => (
                        <div key={review.id} className="border-b pb-4 last:border-0">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-medium">{review.userName}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? 'fill-yellow-400 text-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Delivery Time</h3>
                    <p className="text-gray-700">Standard shipping: 5-7 business days</p>
                    <p className="text-gray-700">Express shipping: 2-3 business days</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Shipping Costs</h3>
                    <p className="text-gray-700">Free standard shipping on orders over €50</p>
                    <p className="text-gray-700">Express shipping: €15</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Returns</h3>
                    <p className="text-gray-700">
                      Free returns within 30 days. Items must be unworn with tags attached.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
    </>
  );
}