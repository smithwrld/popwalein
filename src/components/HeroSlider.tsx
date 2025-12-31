import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import gypsumCeilingImage from '../assets/hero-gypsum-ceiling.jpg';

type HeroImage = Tables<'hero_images'>;

// Fallback slides in case database is empty
const fallbackSlides = [
  { id: '1', image: gypsumCeilingImage, alt: 'Elevate Your Interior Luxury' },
  { id: '2', image: '/uploads/gridceiling.jpg', alt: 'Grid Ceiling Installation' },
  { id: '3', image: '/uploads/soffitpanel.jpg', alt: 'Soffit Panel Installation' },
  { id: '4', image: '/uploads/stretchceiling.png', alt: 'Stretch Ceiling Installation' },
  { id: '5', image: '/uploads/punningwork.jpeg', alt: 'Punning Work' }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch hero images from database
  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const { data, error } = await supabase
          .from('hero_images')
          .select('*')
          .eq('is_active', true)
          .order('display_order');

        if (error) throw error;

        if (data && data.length > 0) {
          setHeroImages(data);
          setImagesLoaded(new Array(data.length).fill(false));
        } else {
          setHeroImages([]);
        }
      } catch (error) {
        console.error('Error fetching hero images:', error);
        setHeroImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImages();
  }, []);

  // Determine which slides to use
  const slides = useMemo(
    () =>
      heroImages.length > 0
        ? heroImages.map((img) => ({
            id: img.id,
            image: img.image_url,
            alt: img.title || 'Hero Image',
          }))
        : fallbackSlides,
    [heroImages]
  );

  // Track load state for each slide (show ASAP; don't block on all images)
  useEffect(() => {
    setImagesLoaded(new Array(slides.length).fill(false));
    setCurrentSlide(0);
  }, [slides.length]);

  const isCurrentSlideReady = !loading && Boolean(imagesLoaded[currentSlide]);
  const areAllSlidesReady =
    slides.length > 0 && imagesLoaded.length === slides.length && imagesLoaded.every(Boolean);

  // Auto-slide (only advance once next image is ready)
  useEffect(() => {
    if (slides.length <= 1) return;
    if (!Boolean(imagesLoaded[0])) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % slides.length;
        return imagesLoaded[next] ? next : prev;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length, imagesLoaded]);

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
      {/* Loading skeleton */}
      {(!allImagesLoaded || loading) && (
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
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      {allImagesLoaded && slides.length > 1 && (
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