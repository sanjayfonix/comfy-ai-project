import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import heroImage1 from 'figma:asset/079cc47ab6acc0e5c8fc63d2ab1dfd2593c0d3ab.png';
import heroImage2 from 'figma:asset/bc8d137d9f4d4d5a8085b2a0d816c568204facce.png';
import heroImage3 from 'figma:asset/9936991ad04095ff50a2c0e5be9494a302422fcd.png';

const slides = [
  {
    id: 1,
    image: heroImage1,
    alt: 'Virtual Try-On Technology - AI-powered fashion platform with mobile interface'
  },
  {
    id: 2,
    image: heroImage2,
    alt: 'Before and After - Virtual styling transformation with AI'
  },
  {
    id: 3,
    image: heroImage3,
    alt: 'Virtual Dressing Room - Interactive 3D clothing visualization'
  }
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Auto-advance slides every 6 seconds (industry standard)
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 1,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].alt}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Gradient overlay for polish */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      
      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 bg-white' 
                : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
