import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gypsumCeilingImage from '../assets/hero-gypsum-ceiling.jpg';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([false, false, false, false]);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  const slides = [
    {
      id: 1,
      image: gypsumCeilingImage,
      alt: 'Elevate Your Interior Luxury'
    },
    {
      id: 2,
      image: '/uploads/gridceiling.jpg  ',
      alt: 'Grid Ceiling Installation'
    },
    {
      id: 3,
      image: '/uploads/soffitpanel.jpg',
      alt: 'Soffit Panel Installation'
    },
    {
      id: 4,
      image: '/uploads/stretchceiling.png',
      alt: 'Stretch Ceiling Installation'
    },
    {
      id: 5,
      image: '/uploads/punningwork.jpeg',
      alt: 'Punning Work'
    }
  ];

  // Preload all images for instant switching
  useEffect(() => {
    const preloadImages = slides.map((slide, index) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          setImagesLoaded(prev => {
            const newLoaded = [...prev];
            newLoaded[index] = true;
            return newLoaded;
          });
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load image: ${slide.image}`);
          setImagesLoaded(prev => {
            const newLoaded = [...prev];
            newLoaded[index] = true; // Mark as loaded even if failed to prevent infinite loading
            return newLoaded;
          });
          resolve();
        };
        img.src = slide.image;
      });
    });

    Promise.all(preloadImages).then(() => {
      setAllImagesLoaded(true);
    });
  }, [slides]);

  // Auto-slide functionality - only start after images are loaded
  useEffect(() => {
    if (!allImagesLoaded) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length, allImagesLoaded]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl bg-muted">
      {/* Loading skeleton - shown while images are loading */}
      {!allImagesLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/80 animate-pulse flex items-center justify-center">
          <div className="text-muted-foreground text-lg font-medium">Loading...</div>
        </div>
      )}

      {/* Slides Container */}
      <div 
        className={`flex transition-transform duration-700 ease-in-out h-full ${!allImagesLoaded ? 'opacity-0' : 'opacity-100'}`}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              style={{
                opacity: imagesLoaded[index] ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
              }}
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      {allImagesLoaded && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-110' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSlider;