import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, Play, Pause } from "lucide-react";

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  project: string;
  image?: string;
  date: string;
}

interface ReviewsCarouselProps {
  reviews?: Review[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  className?: string;
}

// ✅ EASY TO EDIT: Update reviews, ratings, and images below
// Simply change the text, rating (1-5), name, location, project type, and image path
const defaultReviews: Review[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Mumbai, Maharashtra",
    rating: 5, // Change rating from 1-5
    text: "Exceptional craftsmanship! The ceiling design transformed our living room completely. The team was professional, punctual, and delivered exactly what they promised. The attention to detail in the P.O.P work is remarkable. We couldn't be happier with the results.",
    project: "False Ceiling Installation",
    date: "March 2024",
    image: "/uploads/03c6ad43-41a5-4063-9634-02dbd2e45428.png"
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "New Delhi, Delhi",
    rating: 5, // Change rating from 1-5
    text: "Amazing attention to detail and creativity in design. The decorative wall elements exceeded our expectations completely. The team understood our vision perfectly and executed it flawlessly. The quality of materials used is top-notch. Highly recommended for anyone looking for premium P.O.P work.",
    project: "Decorative Wall Moldings",
    date: "February 2024",
    image: "/uploads/4f71c73b-82f2-46bc-8b94-96b30ab3a463.png"
  },
  {
    id: 3,
    name: "Amit Patel",
    location: "Bangalore, Karnataka",
    rating: 5, // Change rating from 1-5
    text: "Popwale delivered exactly what they promised within the agreed timeline. Professional service from consultation to completion. The team was courteous, skilled, and maintained cleanliness throughout the project. The final result speaks volumes about their expertise.",
    project: "Complete Home P.O.P Work",
    date: "January 2024",
    image: "/uploads/84883ab5-4fde-4154-8b6c-ebaa2d640447.png"
  },
  {
    id: 4,
    name: "Sneha Mehta",
    location: "Pune, Maharashtra",
    rating: 5, // Change rating from 1-5
    text: "Outstanding work quality and excellent customer service. The custom ceiling design for our bedroom is absolutely stunning. They provided great suggestions and the execution was flawless. Worth every penny spent. Will definitely hire them again for future projects.",
    project: "Bedroom Ceiling Design",
    date: "March 2024",
    image: "/uploads/da480b06-173d-44ef-862d-88d417d2b6a1.png"
  },
  {
    id: 5,
    name: "Vikram Singh",
    location: "Gurgaon, Haryana",
    rating: 5, // Change rating from 1-5
    text: "The team transformed our office space with beautiful ceiling work that improved both aesthetics and acoustics. Very professional approach, quality materials, and timely completion. Our clients are always impressed with the interior design now.",
    project: "Office Ceiling Installation",
    date: "February 2024",
    image: "/uploads/e445b06f-2611-49d7-b847-4d4d56c7213f.png"
  },
  {
    id: 6,
    name: "Anita Desai",
    location: "Chennai, Tamil Nadu",
    rating: 5, // Change rating from 1-5
    text: "Incredible artistic skills and professionalism. The decorative elements they created for our home are unique and beautiful. The team listened to our requirements carefully and delivered beyond expectations. Excellent value for money.",
    project: "Artistic P.O.P Installations",
    date: "January 2024",
    image: "/uploads/e9984e4f-2a91-482b-b9d9-c8f80f5c0df2.png"
  },
  {
    id: 7,
    name: "Rohit Gupta",
    location: "Hyderabad, Telangana",
    rating: 5, // Change rating from 1-5
    text: "Best P.O.P service in the city! The quality of work is exceptional and the team is highly skilled. They completed our entire home renovation on time with zero compromise on quality. The designs are modern and elegant. Highly satisfied with their service.",
    project: "Complete Home Renovation",
    date: "December 2023",
    image: "/uploads/ea8f7121-ba42-47f9-825d-7dd7398e889d.png"
  },
  {
    id: 8,
    name: "Kavita Jain",
    location: "Jaipur, Rajasthan",
    rating: 5, // Change rating from 1-5
    text: "Excellent workmanship and attention to detail. The traditional ceiling patterns they created perfectly matched our home's aesthetic. Professional team with great communication skills. They maintained the heritage feel while adding modern functionality.",
    project: "Traditional Ceiling Patterns",
    date: "March 2024",
    image: "/uploads/f12224f5-37a2-4e3d-927e-7650d8da57b9.png"
  }
];

const ReviewsCarousel = ({ 
  reviews = defaultReviews, 
  autoPlay = true, 
  autoPlayInterval = 4000,
  showControls = true,
  className = ""
}: ReviewsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  }, [reviews.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleCardClick = () => {
    setIsPaused(!isPaused);
    setIsPlaying(!isPaused);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    setIsPaused(false);
  };

  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isPlaying, isPaused, nextSlide, autoPlayInterval]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-primary fill-current" : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-[var(--radius-xl)]">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="w-full flex-shrink-0 p-8"
              onClick={handleCardClick}
              style={{ cursor: isPlaying ? 'pointer' : 'default' }}
            >
              <div className="card-elegant max-w-4xl mx-auto text-center relative">
                {/* Pause/Play Indicator */}
                {isPaused && (
                  <div className="absolute top-4 right-4 bg-primary/10 p-2 rounded-full">
                    <Pause className="w-4 h-4 text-primary" />
                  </div>
                )}
                
                {/* Quote Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Quote className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {renderStars(review.rating)}
                </div>

                {/* Review Text */}
                <blockquote className="text-lg sm:text-xl text-muted-foreground italic mb-8 leading-relaxed">
                  "{review.text}"
                </blockquote>

                {/* Project Type */}
                <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  {review.project}
                </div>

                {/* Reviewer Info with Image */}
                <div className="flex flex-col items-center space-y-4">
                  {/* Reviewer Image */}
                  {review.image && (
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20 shadow-elegant">
                      <img 
                        src={review.image} 
                        alt={`${review.name} - Customer`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image fails to load
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Reviewer Details */}
                  <div className="space-y-2">
                    <div className="text-xl font-semibold text-foreground">
                      {review.name}
                    </div>
                    <div className="text-muted-foreground">
                      {review.location}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {review.date}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      {showControls && (
        <>
          {/* Previous/Next Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-card border border-border rounded-full shadow-soft hover:shadow-card flex items-center justify-center transition-all duration-200 hover:scale-105"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-card border border-border rounded-full shadow-soft hover:shadow-card flex items-center justify-center transition-all duration-200 hover:scale-105"
            aria-label="Next review"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-card border border-border rounded-full shadow-soft hover:shadow-card flex items-center justify-center transition-all duration-200 hover:scale-105"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-foreground" />
            ) : (
              <Play className="w-5 h-5 text-foreground ml-0.5" />
            )}
          </button>
        </>
      )}

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? "bg-primary scale-125"
                : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
            }`}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>

      {/* Review Counter */}
      <div className="text-center mt-4">
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} of {reviews.length} reviews
        </span>
      </div>

      {/* Instructions */}
      <div className="text-center mt-4">
        <p className="text-xs text-muted-foreground">
          Click on a review to pause • Use arrows to navigate manually
        </p>
      </div>
    </div>
  );
};

export default ReviewsCarousel;