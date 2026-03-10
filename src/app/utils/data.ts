// Sample product data for Comify AI
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  material: string;
  sizes: string[];
  colors: Array<{ name: string; hex: string }>;
  images: string[];
  category: string;
  occasion: string[];
  rating: number;
  reviews: Review[];
  inStock: boolean;
  gender: string; // 'male', 'female', 'unisex', 'kids-boys', 'kids-girls'
  ageGroup: string; // 'adult', 'teen', 'kids'
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
  virtualTryOnAccuracy?: number;
}

export const products: Product[] = [
  {
    id: 'prod_jcole',
    name: 'J. Cole Graphic Tee',
    brand: 'Comify Custom',
    price: 49.99,
    description: 'Exclusive J. Cole graphic t-shirt. Premium cotton with high-quality print.',
    material: '100% Cotton',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Original', hex: '#1C1C1C' }
    ],
    images: ['/JColeFront.webp'],
    category: 'Tops',
    occasion: ['casual', 'streetwear'],
    rating: 5.0,
    reviews: [],
    inStock: true,
    gender: 'unisex',
    ageGroup: 'adult'
  },
  {
    id: 'prod_1',
    name: 'Elegant Silk Blouse',
    brand: 'LuxeFashion',
    price: 89.99,
    originalPrice: 129.99,
    description: 'A sophisticated silk blouse perfect for both office and evening wear. Features a classic collar and button-down design with subtle pleating details.',
    material: '100% Silk',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Ivory', hex: '#F5F5DC' },
      { name: 'Blush Pink', hex: '#FFB6C1' },
      { name: 'Navy', hex: '#000080' }
    ],
    images: ['https://images.unsplash.com/photo-1594734415578-00fc9540929b?w=500&q=80'],
    category: 'Tops',
    occasion: ['work', 'formal', 'casual'],
    rating: 4.8,
    reviews: [],
    inStock: true,
    gender: 'female',
    ageGroup: 'adult'
  },
  {
    id: 'prod_2',
    name: 'High-Waisted Tailored Trousers',
    brand: 'ModernLine',
    price: 119.99,
    description: 'Classic high-waisted trousers with a tailored fit. Perfect for creating a polished, professional look.',
    material: '68% Polyester, 30% Viscose, 2% Elastane',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Charcoal Gray', hex: '#36454F' },
      { name: 'Camel', hex: '#C19A6B' }
    ],
    images: ['https://images.unsplash.com/photo-1732551146857-6e12616efb27?w=500&q=80'],
    category: 'Bottoms',
    occasion: ['work', 'formal'],
    rating: 4.6,
    reviews: [],
    inStock: true,
    gender: 'female',
    ageGroup: 'adult'
  },
  {
    id: 'prod_3',
    name: 'Floral Midi Dress',
    brand: 'SpringBlossom',
    price: 149.99,
    description: 'Beautiful floral midi dress with a cinched waist and flowing skirt. Perfect for garden parties and summer events.',
    material: '95% Cotton, 5% Spandex',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Garden Floral', hex: '#FFE4E1' },
      { name: 'Sunset Blooms', hex: '#FFDAB9' }
    ],
    images: ['https://images.unsplash.com/photo-1661625118271-e2d5a064422e?w=500&q=80'],
    category: 'Dresses',
    occasion: ['casual', 'vacation', 'formal'],
    rating: 4.9,
    reviews: [],
    inStock: true,
    gender: 'female',
    ageGroup: 'adult'
  },
  {
    id: 'prod_4',
    name: 'Classic Denim Jacket',
    brand: 'UrbanEdge',
    price: 79.99,
    description: 'Timeless denim jacket with a modern fit. A versatile piece that pairs well with any outfit.',
    material: '100% Cotton Denim',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Light Wash', hex: '#96B6C5' },
      { name: 'Medium Wash', hex: '#4682B4' },
      { name: 'Dark Wash', hex: '#1C2833' }
    ],
    images: ['https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=500&q=80'],
    category: 'Outerwear',
    occasion: ['casual', 'vacation'],
    rating: 4.7,
    reviews: [],
    inStock: true,
    gender: 'unisex',
    ageGroup: 'adult'
  },
  {
    id: 'prod_5',
    name: 'Cashmere V-Neck Sweater',
    brand: 'CozyKnits',
    price: 199.99,
    originalPrice: 279.99,
    description: 'Luxuriously soft cashmere sweater with a flattering V-neck. Perfect for layering or wearing on its own.',
    material: '100% Cashmere',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Dusty Rose', hex: '#C4A4A0' },
      { name: 'Forest Green', hex: '#228B22' }
    ],
    images: ['https://images.unsplash.com/photo-1631541909061-71e349d1f203?w=500&q=80'],
    category: 'Tops',
    occasion: ['work', 'casual'],
    rating: 5.0,
    reviews: [],
    inStock: true,
    gender: 'female',
    ageGroup: 'adult'
  },
  {
    id: 'prod_6',
    name: 'Wide Leg Palazzo Pants',
    brand: 'FlowStyle',
    price: 89.99,
    description: 'Comfortable wide-leg palazzo pants with an elastic waistband. Effortlessly chic and easy to wear.',
    material: '95% Polyester, 5% Spandex',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Terracotta', hex: '#E07A5F' },
      { name: 'Sage Green', hex: '#9CAF88' }
    ],
    images: ['https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&q=80'],
    category: 'Bottoms',
    occasion: ['casual', 'vacation'],
    rating: 4.5,
    reviews: [],
    inStock: true,
    gender: 'female',
    ageGroup: 'adult'
  },
  {
    id: 'prod_7',
    name: 'Evening Cocktail Dress',
    brand: 'GlamourNight',
    price: 249.99,
    description: 'Stunning cocktail dress with sequin details and a fitted silhouette. Perfect for special occasions.',
    material: '100% Polyester with Sequin Embellishments',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Midnight Black', hex: '#000000' },
      { name: 'Ruby Red', hex: '#E0115F' },
      { name: 'Champagne Gold', hex: '#F7E7CE' }
    ],
    images: ['https://images.unsplash.com/photo-1547697933-66bcb20f114a?w=500&q=80'],
    category: 'Dresses',
    occasion: ['formal'],
    rating: 4.8,
    reviews: [],
    inStock: true,
    gender: 'female',
    ageGroup: 'adult'
  },
  {
    id: 'prod_8',
    name: 'Linen Button-Up Shirt',
    brand: 'BreezeWear',
    price: 69.99,
    description: 'Lightweight linen shirt perfect for warm weather. Features a relaxed fit and breathable fabric.',
    material: '100% Linen',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Sky Blue', hex: '#87CEEB' },
      { name: 'Coral', hex: '#FF7F50' }
    ],
    images: ['https://images.unsplash.com/photo-1594734415578-00fc9540929b?w=500&q=80'],
    category: 'Tops',
    occasion: ['casual', 'vacation'],
    rating: 4.4,
    reviews: [],
    inStock: true,
    gender: 'unisex',
    ageGroup: 'adult'
  },
  // Men's Clothing
  {
    id: 'prod_9',
    name: 'Classic Fit Dress Shirt',
    brand: 'GentlemanStyle',
    price: 59.99,
    description: 'Crisp cotton dress shirt with a classic fit. Perfect for business meetings and formal occasions.',
    material: '100% Cotton',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Light Blue', hex: '#ADD8E6' },
      { name: 'Navy', hex: '#000080' }
    ],
    images: ['https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=500&q=80'],
    category: 'Formal Shirts',
    occasion: ['work', 'formal'],
    rating: 4.7,
    reviews: [],
    inStock: true,
    gender: 'male',
    ageGroup: 'adult'
  },
  {
    id: 'prod_10',
    name: 'Slim Fit Navy Suit',
    brand: 'ExecutiveWear',
    price: 399.99,
    originalPrice: 549.99,
    description: 'Modern slim-fit suit in navy blue. Includes jacket and trousers. Perfect for professional settings.',
    material: '70% Wool, 30% Polyester',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Navy', hex: '#000080' },
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Black', hex: '#000000' }
    ],
    images: ['https://images.unsplash.com/photo-1770364022753-7bb3ffe973dd?w=500&q=80'],
    category: 'Suits',
    occasion: ['work', 'formal'],
    rating: 4.9,
    reviews: [],
    inStock: true,
    gender: 'male',
    ageGroup: 'adult'
  },
  {
    id: 'prod_11',
    name: 'Casual Chino Pants',
    brand: 'UrbanComfort',
    price: 79.99,
    description: 'Comfortable chino pants with a modern tapered fit. Great for everyday wear.',
    material: '98% Cotton, 2% Elastane',
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: [
      { name: 'Khaki', hex: '#C3B091' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Olive', hex: '#808000' }
    ],
    images: ['https://images.unsplash.com/photo-1729719762110-6ad6e60f4dbd?w=500&q=80'],
    category: 'Bottoms',
    occasion: ['casual', 'work'],
    rating: 4.5,
    reviews: [],
    inStock: true,
    gender: 'male',
    ageGroup: 'adult'
  },
  {
    id: 'prod_12',
    name: 'Classic Polo Shirt',
    brand: 'SportyClassic',
    price: 49.99,
    description: 'Timeless polo shirt made from breathable cotton piqué. Perfect for smart-casual occasions.',
    material: '100% Cotton Piqué',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Red', hex: '#FF0000' }
    ],
    images: ['https://images.unsplash.com/photo-1770058428276-7ca3d2f98568?w=500&q=80'],
    category: 'Tops',
    occasion: ['casual', 'vacation'],
    rating: 4.6,
    reviews: [],
    inStock: true,
    gender: 'male',
    ageGroup: 'adult'
  },
  {
    id: 'prod_13',
    name: 'Premium Hoodie',
    brand: 'ComfortWear',
    price: 89.99,
    description: 'Cozy premium hoodie with soft fleece lining. Perfect for casual outings and lounging.',
    material: '80% Cotton, 20% Polyester',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Gray', hex: '#808080' },
      { name: 'Navy', hex: '#000080' }
    ],
    images: ['https://images.unsplash.com/photo-1622567893612-a5345baa5c9a?w=500&q=80'],
    category: 'Tops',
    occasion: ['casual'],
    rating: 4.8,
    reviews: [],
    inStock: true,
    gender: 'unisex',
    ageGroup: 'adult'
  },
  {
    id: 'prod_14',
    name: 'Wool Blend Overcoat',
    brand: 'WinterElegance',
    price: 299.99,
    description: 'Classic wool blend overcoat for cold weather. Sophisticated and warm.',
    material: '80% Wool, 20% Polyester',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Navy', hex: '#000080' }
    ],
    images: [],
    category: 'Outerwear',
    occasion: ['work', 'formal', 'casual'],
    rating: 4.8,
    reviews: [],
    inStock: true,
    gender: 'male',
    ageGroup: 'adult'
  },
  {
    id: 'prod_15',
    name: 'Polo Shirt',
    brand: 'SportClassic',
    price: 49.99,
    description: 'Classic polo shirt with a comfortable fit. Great for casual and smart-casual occasions.',
    material: '100% Cotton Pique',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Red', hex: '#FF0000' }
    ],
    images: [],
    category: 'Tops',
    occasion: ['casual', 'work'],
    rating: 4.6,
    reviews: [],
    inStock: true,
    gender: 'male',
    ageGroup: 'adult'
  },
  // More Women's Clothing
  {
    id: 'prod_16',
    name: 'Women\'s Lace Bralette',
    brand: 'IntimateEssentials',
    price: 34.99,
    description: 'Delicate lace bralette with wireless support. Comfortable and stylish.',
    material: '90% Nylon, 10% Spandex',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Nude', hex: '#E5C9B5' },
      { name: 'White', hex: '#FFFFFF' }
    ],
    images: [],
    category: 'Underwear',
    occasion: ['casual'],
    rating: 4.5,
    reviews: [],
    inStock: true,
    gender: 'female',
    ageGroup: 'adult'
  },
  {
    id: 'prod_17',
    name: 'High-Waist Leggings',
    brand: 'ActiveFit',
    price: 59.99,
    description: 'Squat-proof high-waist leggings perfect for yoga, gym, or everyday wear.',
    material: '87% Polyester, 13% Spandex',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Purple', hex: '#800080' }
    ],
    images: [],
    category: 'Activewear',
    occasion: ['casual', 'sports'],
    rating: 4.8,
    reviews: [],
    inStock: true,
    gender: 'female',
    ageGroup: 'adult'
  },
  {
    id: 'prod_18',
    name: 'Silk Pajama Set',
    brand: 'DreamNight',
    price: 89.99,
    description: 'Luxurious silk pajama set for ultimate comfort. Includes top and pants.',
    material: '100% Mulberry Silk',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Champagne', hex: '#F7E7CE' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Blush', hex: '#FFB6C1' }
    ],
    images: [],
    category: 'Sleepwear',
    occasion: ['casual'],
    rating: 4.9,
    reviews: [],
    inStock: true,
    gender: 'female',
    ageGroup: 'adult'
  },
  {
    id: 'prod_19',
    name: 'Leather Ankle Boots',
    brand: 'StepStyle',
    price: 149.99,
    description: 'Classic leather ankle boots with a modern heel. Perfect for fall and winter.',
    material: 'Genuine Leather',
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#8B4513' },
      { name: 'Tan', hex: '#D2B48C' }
    ],
    images: [],
    category: 'Footwear',
    occasion: ['casual', 'work'],
    rating: 4.7,
    reviews: [],
    inStock: true,
    gender: 'female',
    ageGroup: 'adult'
  },
  {
    id: 'prod_20',
    name: 'Blazer',
    brand: 'PowerSuit',
    price: 139.99,
    description: 'Tailored blazer perfect for the office or professional events.',
    material: '65% Polyester, 32% Viscose, 3% Elastane',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Burgundy', hex: '#800020' }
    ],
    images: [],
    category: 'Outerwear',
    occasion: ['work', 'formal'],
    rating: 4.6,
    reviews: [],
    inStock: true,
    gender: 'female',
    ageGroup: 'adult'
  },
  // Kids Clothing
  {
    id: 'prod_21',
    name: 'Boys\' Graphic T-Shirt',
    brand: 'KidsTrend',
    price: 19.99,
    description: 'Fun graphic tee perfect for active boys. Comfortable cotton material.',
    material: '100% Cotton',
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
    colors: [
      { name: 'Blue', hex: '#0000FF' },
      { name: 'Green', hex: '#008000' },
      { name: 'Red', hex: '#FF0000' }
    ],
    images: [],
    category: 'Tops',
    occasion: ['casual'],
    rating: 4.5,
    reviews: [],
    inStock: true,
    gender: 'kids-boys',
    ageGroup: 'kids'
  },
  {
    id: 'prod_22',
    name: 'Girls\' Princess Dress',
    brand: 'LittleDreams',
    price: 39.99,
    description: 'Adorable princess-style dress for special occasions.',
    material: '100% Polyester',
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: [
      { name: 'Pink', hex: '#FFC0CB' },
      { name: 'Purple', hex: '#800080' },
      { name: 'Blue', hex: '#0000FF' }
    ],
    images: [],
    category: 'Dresses',
    occasion: ['formal', 'casual'],
    rating: 4.8,
    reviews: [],
    inStock: true,
    gender: 'kids-girls',
    ageGroup: 'kids'
  },
  {
    id: 'prod_23',
    name: 'Kids\' Sneakers',
    brand: 'RunKids',
    price: 49.99,
    description: 'Comfortable and durable sneakers for active kids.',
    material: 'Synthetic Mesh',
    sizes: ['28', '29', '30', '31', '32', '33', '34'],
    colors: [
      { name: 'Black/White', hex: '#000000' },
      { name: 'Navy/Red', hex: '#000080' },
      { name: 'Pink/Purple', hex: '#FFC0CB' }
    ],
    images: [],
    category: 'Footwear',
    occasion: ['casual', 'sports'],
    rating: 4.6,
    reviews: [],
    inStock: true,
    gender: 'unisex',
    ageGroup: 'kids'
  },
  {
    id: 'prod_24',
    name: 'Boys\' Cargo Shorts',
    brand: 'AdventureKids',
    price: 29.99,
    description: 'Durable cargo shorts with multiple pockets. Perfect for outdoor activities.',
    material: '100% Cotton',
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
    colors: [
      { name: 'Khaki', hex: '#C3B091' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Olive', hex: '#808000' }
    ],
    images: [],
    category: 'Bottoms',
    occasion: ['casual'],
    rating: 4.4,
    reviews: [],
    inStock: true,
    gender: 'kids-boys',
    ageGroup: 'kids'
  },
  {
    id: 'prod_25',
    name: 'Girls\' Leggings Set',
    brand: 'ActiveKids',
    price: 24.99,
    description: 'Comfortable leggings perfect for play and everyday wear.',
    material: '95% Cotton, 5% Spandex',
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: [
      { name: 'Pink', hex: '#FFC0CB' },
      { name: 'Purple', hex: '#800080' },
      { name: 'Black', hex: '#000000' }
    ],
    images: [],
    category: 'Bottoms',
    occasion: ['casual'],
    rating: 4.7,
    reviews: [],
    inStock: true,
    gender: 'kids-girls',
    ageGroup: 'kids'
  },
  // Teen Clothing
  {
    id: 'prod_26',
    name: 'Teen Hoodie',
    brand: 'YouthStyle',
    price: 44.99,
    description: 'Trendy oversized hoodie perfect for teens. Soft and comfortable.',
    material: '80% Cotton, 20% Polyester',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Gray', hex: '#808080' },
      { name: 'Navy', hex: '#000080' }
    ],
    images: [],
    category: 'Tops',
    occasion: ['casual'],
    rating: 4.6,
    reviews: [],
    inStock: true,
    gender: 'unisex',
    ageGroup: 'teen'
  },
  {
    id: 'prod_27',
    name: 'Teen Skinny Jeans',
    brand: 'DenimTeen',
    price: 59.99,
    description: 'Trendy skinny jeans with stretch for comfort.',
    material: '98% Cotton, 2% Elastane',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Dark Blue', hex: '#00008B' },
      { name: 'Light Blue', hex: '#ADD8E6' }
    ],
    images: [],
    category: 'Bottoms',
    occasion: ['casual'],
    rating: 4.5,
    reviews: [],
    inStock: true,
    gender: 'unisex',
    ageGroup: 'teen'
  },
  {
    id: 'prod_28',
    name: 'Teen Bomber Jacket',
    brand: 'StreetYouth',
    price: 79.99,
    description: 'Cool bomber jacket with a modern design. Perfect for layering.',
    material: '100% Polyester',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Olive', hex: '#808000' },
      { name: 'Burgundy', hex: '#800020' }
    ],
    images: [],
    category: 'Outerwear',
    occasion: ['casual'],
    rating: 4.7,
    reviews: [],
    inStock: true,
    gender: 'unisex',
    ageGroup: 'teen'
  },
  // Additional Men's Items
  {
    id: 'prod_29',
    name: 'Men\'s Running Shorts',
    brand: 'ActiveFit',
    price: 34.99,
    description: 'Lightweight running shorts with built-in liner.',
    material: '100% Polyester',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Gray', hex: '#808080' }
    ],
    images: [],
    category: 'Activewear',
    occasion: ['sports', 'casual'],
    rating: 4.5,
    reviews: [],
    inStock: true,
    gender: 'male',
    ageGroup: 'adult'
  },
  {
    id: 'prod_30',
    name: 'Flannel Pajama Pants',
    brand: 'ComfySleep',
    price: 29.99,
    description: 'Soft flannel pajama pants for cozy nights.',
    material: '100% Cotton Flannel',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Navy Plaid', hex: '#000080' },
      { name: 'Red Plaid', hex: '#FF0000' },
      { name: 'Green Plaid', hex: '#008000' }
    ],
    images: [],
    category: 'Sleepwear',
    occasion: ['casual'],
    rating: 4.6,
    reviews: [],
    inStock: true,
    gender: 'male',
    ageGroup: 'adult'
  },
  {
    id: 'prod_31',
    name: 'Oxford Dress Shoes',
    brand: 'ClassicFootwear',
    price: 129.99,
    description: 'Premium leather Oxford shoes for formal occasions.',
    material: 'Genuine Leather',
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#8B4513' }
    ],
    images: [],
    category: 'Footwear',
    occasion: ['formal', 'work'],
    rating: 4.8,
    reviews: [],
    inStock: true,
    gender: 'male',
    ageGroup: 'adult'
  },
  {
    id: 'prod_32',
    name: 'Henley Long Sleeve Shirt',
    brand: 'CasualStyle',
    price: 39.99,
    description: 'Classic henley shirt with button placket. Great for layering.',
    material: '60% Cotton, 40% Polyester',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Gray', hex: '#808080' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Burgundy', hex: '#800020' }
    ],
    images: [],
    category: 'Tops',
    occasion: ['casual'],
    rating: 4.4,
    reviews: [],
    inStock: true,
    gender: 'male',
    ageGroup: 'adult'
  },
  // Additional Women's Items
  {
    id: 'prod_33',
    name: 'Yoga Sports Bra',
    brand: 'ActiveFit',
    price: 39.99,
    description: 'Medium support sports bra perfect for yoga and light workouts.',
    material: '88% Polyester, 12% Spandex',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Pink', hex: '#FFC0CB' },
      { name: 'Teal', hex: '#008080' }
    ],
    images: [],
    category: 'Activewear',
    occasion: ['sports'],
    rating: 4.7,
    reviews: [],
    inStock: true,
    gender: 'female',
    ageGroup: 'adult'
  },
  {
    id: 'prod_34',
    name: 'Maxi Skirt',
    brand: 'FlowingStyle',
    price: 69.99,
    description: 'Flowy maxi skirt perfect for summer days and beach outings.',
    material: '100% Rayon',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Floral Navy', hex: '#000080' },
      { name: 'Solid Black', hex: '#000000' },
      { name: 'Coral', hex: '#FF7F50' }
    ],
    images: [],
    category: 'Bottoms',
    occasion: ['casual', 'vacation'],
    rating: 4.5,
    reviews: [],
    inStock: true,
    gender: 'female',
    ageGroup: 'adult'
  },
  {
    id: 'prod_35',
    name: 'Satin Slip Dress',
    brand: 'ElegantNights',
    price: 99.99,
    description: 'Luxurious satin slip dress perfect for date nights and special occasions.',
    material: '100% Polyester Satin',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Emerald', hex: '#50C878' },
      { name: 'Champagne', hex: '#F7E7CE' }
    ],
    images: [],
    category: 'Dresses',
    occasion: ['formal', 'casual'],
    rating: 4.8,
    reviews: [],
    inStock: true,
    gender: 'female',
    ageGroup: 'adult'
  },
  {
    id: 'prod_36',
    name: 'Trench Coat',
    brand: 'ClassicOuterwear',
    price: 189.99,
    description: 'Timeless trench coat perfect for transitional weather.',
    material: '100% Cotton',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Beige', hex: '#F5F5DC' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Black', hex: '#000000' }
    ],
    images: [],
    category: 'Outerwear',
    occasion: ['work', 'casual'],
    rating: 4.9,
    reviews: [],
    inStock: true,
    gender: 'female',
    ageGroup: 'adult'
  },
  {
    id: 'prod_37',
    name: 'Cotton Briefs 5-Pack',
    brand: 'EverydayEssentials',
    price: 24.99,
    description: 'Comfortable cotton briefs in a value 5-pack.',
    material: '95% Cotton, 5% Elastane',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Assorted Pastels', hex: '#FFB6C1' },
      { name: 'Assorted Basics', hex: '#000000' }
    ],
    images: [],
    category: 'Underwear',
    occasion: ['casual'],
    rating: 4.4,
    reviews: [],
    inStock: true,
    gender: 'female',
    ageGroup: 'adult'
  },
  {
    id: 'prod_38',
    name: 'Cardigan Sweater',
    brand: 'CozyKnits',
    price: 79.99,
    description: 'Soft cardigan perfect for layering. Features button front.',
    material: '80% Acrylic, 20% Wool',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Gray', hex: '#808080' },
      { name: 'Burgundy', hex: '#800020' }
    ],
    images: [],
    category: 'Tops',
    occasion: ['casual', 'work'],
    rating: 4.6,
    reviews: [],
    inStock: true,
    gender: 'female',
    ageGroup: 'adult'
  },
  {
    id: 'prod_39',
    name: 'High-Waist Jeans',
    brand: 'DenimLuxe',
    price: 89.99,
    description: 'Classic high-waist jeans with a straight leg fit.',
    material: '99% Cotton, 1% Elastane',
    sizes: ['24', '26', '28', '30', '32', '34'],
    colors: [
      { name: 'Medium Wash', hex: '#4682B4' },
      { name: 'Dark Wash', hex: '#1C2833' },
      { name: 'Light Wash', hex: '#96B6C5' }
    ],
    images: [],
    category: 'Bottoms',
    occasion: ['casual'],
    rating: 4.7,
    reviews: [],
    inStock: true,
    gender: 'female',
    ageGroup: 'adult'
  },
  {
    id: 'prod_40',
    name: 'Wrap Blouse',
    brand: 'OfficeCh ic',
    price: 59.99,
    description: 'Flattering wrap blouse perfect for work and special occasions.',
    material: '100% Polyester',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Navy', hex: '#000080' },
      { name: 'Burgundy', hex: '#800020' },
      { name: 'Forest Green', hex: '#228B22' }
    ],
    images: [],
    category: 'Tops',
    occasion: ['work', 'formal'],
    rating: 4.5,
    reviews: [],
    inStock: true,
    gender: 'female',
    ageGroup: 'adult'
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: '',
    rating: 5,
    comment: 'Comify AI completely transformed my online shopping experience! The virtual try-on is incredibly accurate, and I finally feel confident buying clothes online.',
    date: '2026-02-10'
  },
  {
    id: 2,
    name: 'Maya Patel',
    avatar: '',
    rating: 5,
    comment: 'The AI sizing recommendations are spot on! I used to struggle finding the right fit, but now every order fits perfectly. Game changer!',
    date: '2026-02-08'
  },
  {
    id: 3,
    name: 'Emily Chen',
    avatar: '',
    rating: 5,
    comment: 'I love how the platform shows me personalized styling suggestions. It\'s like having a personal stylist at my fingertips 24/7.',
    date: '2026-02-05'
  },
  {
    id: 4,
    name: 'Jessica Williams',
    avatar: '',
    rating: 5,
    comment: 'The 3D avatar feature is amazing! Being able to see how clothes look from every angle before buying has saved me so much time and money on returns.',
    date: '2026-02-01'
  }
];