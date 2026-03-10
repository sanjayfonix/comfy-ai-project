import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { Search, Filter, Heart, Star, SlidersHorizontal } from 'lucide-react';
import { products } from '../utils/data';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { SEO, createBreadcrumbSchema } from '../components/SEO';
import { useAuth } from '../context/AuthContext';

export default function ShopPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://www.comify.ai' },
    { name: 'Shop', url: 'https://www.comify.ai/shop' }
  ]);

  const shopSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Fashion Shop - Virtual Try-On Collection",
    "description": "Shop our complete collection of fashion items with AI-powered virtual try-on. Try before you buy with our 3D avatar technology.",
    "url": "https://www.comify.ai/shop"
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });

  const productImages = [
    'https://images.unsplash.com/photo-1761117228880-df2425bd70da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwYmxvdXNlJTIwd29tZW4lMjBmYXNoaW9ufGVufDF8fHx8MTc3MTE4Mzk4OHww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1688535823258-9927ab196d34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWlsb3JlZCUyMHRyb3VzZXJzJTIwd29tZW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcxMTgzOTg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1700462246416-68a54553a611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yYWwlMjBtaWRpJTIwZHJlc3MlMjB3b21lbnxlbnwxfHx8fDE3NzExODM5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1762343937103-5c8a55116288?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW5pbSUyMGphY2tldCUyMHdvbWVuJTIwY2FzdWFsfGVufDF8fHx8MTc3MTE4Mzk4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1622024276133-461ccc49d2c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNobWVyZSUyMHN3ZWF0ZXIlMjB3b21lbiUyMGx1eHVyeXxlbnwxfHx8fDE3NzExODM5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1768460608433-d3af5148832c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd29tYW4lMjBmYXNoaW9uJTIwZHJlc3MlMjBzdHVkaW98ZW58MXx8fHwxNzcxMTgzOTM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1619027131391-87eadec6a398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGNhc3VhbCUyMGRlbmltJTIwamVhbnMlMjBvdXRmaXR8ZW58MXx8fHwxNzcxMTgzOTM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1770364019737-aca75ef026fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGJsYXplciUyMG91dGZpdHxlbnwxfHx8fDE3NzExODM5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080'
  ];

  const categories = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Suits', 'Formal Shirts', 'Underwear', 'Activewear', 'Sleepwear', 'Footwear'];
  const occasions = ['work', 'casual', 'formal', 'vacation', 'sports'];
  const genders = [
    { value: 'male', label: 'Men' },
    { value: 'female', label: 'Women' },
    { value: 'unisex', label: 'Unisex' },
    { value: 'kids-boys', label: 'Boys' },
    { value: 'kids-girls', label: 'Girls' }
  ];
  const ageGroups = [
    { value: 'adult', label: 'Adults' },
    { value: 'teen', label: 'Teens' },
    { value: 'kids', label: 'Kids' }
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleOccasionChange = (occasion: string, checked: boolean) => {
    if (checked) {
      setSelectedOccasions([...selectedOccasions, occasion]);
    } else {
      setSelectedOccasions(selectedOccasions.filter(o => o !== occasion));
    }
  };

  const handleGenderChange = (gender: string, checked: boolean) => {
    if (checked) {
      setSelectedGenders([...selectedGenders, gender]);
    } else {
      setSelectedGenders(selectedGenders.filter(g => g !== gender));
    }
  };

  const handleAgeGroupChange = (ageGroup: string, checked: boolean) => {
    if (checked) {
      setSelectedAgeGroups([...selectedAgeGroups, ageGroup]);
    } else {
      setSelectedAgeGroups(selectedAgeGroups.filter(a => a !== ageGroup));
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesOccasion = selectedOccasions.length === 0 || 
                           product.occasion.some(occ => selectedOccasions.includes(occ));
    const matchesGender = selectedGenders.length === 0 || selectedGenders.includes(product.gender);
    const matchesAgeGroup = selectedAgeGroups.length === 0 || selectedAgeGroups.includes(product.ageGroup);
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;

    return matchesSearch && matchesCategory && matchesOccasion && matchesGender && matchesAgeGroup && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const FilterSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
              />
              <Label htmlFor={`cat-${category}`} className="text-sm cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Occasion</h3>
        <div className="space-y-2">
          {occasions.map(occasion => (
            <div key={occasion} className="flex items-center space-x-2">
              <Checkbox
                id={`occ-${occasion}`}
                checked={selectedOccasions.includes(occasion)}
                onCheckedChange={(checked) => handleOccasionChange(occasion, checked as boolean)}
              />
              <Label htmlFor={`occ-${occasion}`} className="text-sm cursor-pointer capitalize">
                {occasion}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Gender</h3>
        <div className="space-y-2">
          {genders.map(gender => (
            <div key={gender.value} className="flex items-center space-x-2">
              <Checkbox
                id={`gen-${gender.value}`}
                checked={selectedGenders.includes(gender.value)}
                onCheckedChange={(checked) => handleGenderChange(gender.value, checked as boolean)}
              />
              <Label htmlFor={`gen-${gender.value}`} className="text-sm cursor-pointer capitalize">
                {gender.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Age Group</h3>
        <div className="space-y-2">
          {ageGroups.map(ageGroup => (
            <div key={ageGroup.value} className="flex items-center space-x-2">
              <Checkbox
                id={`age-${ageGroup.value}`}
                checked={selectedAgeGroups.includes(ageGroup.value)}
                onCheckedChange={(checked) => handleAgeGroupChange(ageGroup.value, checked as boolean)}
              />
              <Label htmlFor={`age-${ageGroup.value}`} className="text-sm cursor-pointer capitalize">
                {ageGroup.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
            />
            <Input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 500 })}
            />
          </div>
        </div>
      </div>

      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => {
          setSelectedCategories([]);
          setSelectedOccasions([]);
          setSelectedGenders([]);
          setSelectedAgeGroups([]);
          setPriceRange({ min: 0, max: 500 });
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <>
      <SEO
        title="Shop Fashion Online with Virtual Try-On | Comify AI"
        description="Browse our inclusive fashion collection for men, women, and kids. Try clothes virtually before you buy with our AI-powered 3D avatar technology. Free returns on all orders."
        keywords="online fashion shop, virtual try-on shopping, buy clothes online, fashion e-commerce, AI fashion shopping, virtual fitting room, online clothing store"
        url="https://www.comify.ai/shop"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbSchema, shopSchema]
        }}
      />
      <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h1 className="text-4xl font-bold mb-4">Shop the Latest Fashion</h1>
          <p className="text-lg text-gray-300">Discover pieces that fit your style and body perfectly</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search for products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSection />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h2>
                <FilterSection />
              </CardContent>
            </Card>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                Showing {sortedProducts.length} of {products.length} products
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product, index) => (
                <Card 
                  key={product.id} 
                  className="group cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <ImageWithFallback
                        src={productImages[index % productImages.length]}
                        alt={product.name}
                        className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.originalPrice && (
                        <Badge className="absolute top-2 left-2 bg-red-500">
                          Sale
                        </Badge>
                      )}
                      <button className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-[#eeeeee] transition-colors">
                        <Heart className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>

                    <div className="p-4 space-y-2">
                      <p className="text-sm text-gray-600">{product.brand}</p>
                      <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm ml-1">{product.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          ({product.reviews.length || 0} reviews)
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-black">
                          €{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            €{product.originalPrice}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {product.sizes.slice(0, 4).map(size => (
                          <Badge key={size} variant="outline" className="text-xs">
                            {size}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No products found matching your criteria</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategories([]);
                    setSelectedOccasions([]);
                    setSelectedGenders([]);
                    setSelectedAgeGroups([]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}