import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Testimonial {
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  currentTestimonial: number;
  setCurrentTestimonial: (index: number) => void;
  isMobile: boolean;
  autoplayPluginRef: React.MutableRefObject<any>;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ 
  testimonials, 
  currentTestimonial, 
  setCurrentTestimonial, 
  isMobile,
  autoplayPluginRef 
}) => {
  return (
    <section className="pt-8 pb-8 sm:pb-10 lg:pb-12 bg-muted relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/5 rounded-full blur-lg"></div>
      </div>

      <div className="container-curved relative z-10">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Quote className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real experiences from our satisfied customers across India
          </p>
        </div>

        {isMobile ? (
          <Carousel
            plugins={[autoplayPluginRef.current]}
            opts={{
              align: "start",
              loop: testimonials.length > 1,
            }}
            onMouseEnter={autoplayPluginRef.current.stop}
            onMouseLeave={autoplayPluginRef.current.reset}
            className="w-full max-w-sm mx-auto animate-scale-in"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-1 h-full">
                    <div className="card-service relative group overflow-hidden">
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 primary-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                      
                      <div className="relative z-10 p-6 h-full flex flex-col">
                        <div className="flex items-center mb-6">
                          <div className="relative">
                            <img 
                              src={testimonial.avatar} 
                              alt={testimonial.name} 
                              className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 shadow-lg" 
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                              <Quote className="w-3 h-3 text-primary-foreground" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="font-semibold text-foreground text-base">{testimonial.name}</div>
                            <div className="flex text-accent mt-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <blockquote className="text-muted-foreground italic leading-relaxed flex-grow text-center">
                          "{testimonial.comment}"
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {testimonials.length > 1 && (
              <>
                <CarouselPrevious className="bg-card border-border hover:bg-accent hover:text-accent-foreground shadow-elegant" />
                <CarouselNext className="bg-card border-border hover:bg-accent hover:text-accent-foreground shadow-elegant" />
              </>
            )}
          </Carousel>
        ) : (
          <div className="relative max-w-6xl mx-auto animate-fade-up">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentTestimonial * (100 / Math.min(testimonials.length, 3))}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                    <div className="card-service relative group overflow-hidden h-full animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 primary-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                      
                      <div className="relative z-10 p-6 h-full flex flex-col">
                        <div className="flex items-center mb-6">
                          <div className="relative">
                            <img 
                              src={testimonial.avatar} 
                              alt={testimonial.name} 
                              className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 shadow-lg transition-transform duration-300 group-hover:scale-110" 
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-elegant">
                              <Quote className="w-3 h-3 text-primary-foreground" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="font-semibold text-foreground text-base group-hover:text-primary transition-colors duration-300">
                              {testimonial.name}
                            </div>
                            <div className="flex text-accent mt-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-current transition-transform duration-300 hover:scale-110" style={{ animationDelay: `${i * 0.1}s` }} />
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <blockquote className="text-muted-foreground italic leading-relaxed flex-grow text-center group-hover:text-foreground/80 transition-colors duration-300">
                          "{testimonial.comment}"
                        </blockquote>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {testimonials.length > 3 && (
              <div className="flex justify-center mt-8 space-x-3">
                {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, pageIndex) => (
                  <button
                    key={pageIndex}
                    onClick={() => setCurrentTestimonial(pageIndex * 3)}
                    className={`h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                      Math.floor(currentTestimonial / 3) === pageIndex 
                        ? 'bg-primary w-8 shadow-lg' 
                        : 'bg-muted-foreground/30 w-3 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to testimonial page ${pageIndex + 1}`}
                  />
                ))}
              </div>
            )}
             
            {testimonials.length > 1 && testimonials.length <=3 && (
              <div className="flex justify-center mt-8 space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                      index === currentTestimonial 
                        ? 'bg-primary w-8 shadow-lg' 
                        : 'bg-muted-foreground/30 w-3 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-accent fill-current animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;