import React from 'react';
import { clients, Client } from '@/data/clients';

interface ClientsCarouselProps {
  clients?: Client[];
  className?: string;
}

const ClientsCarousel: React.FC<ClientsCarouselProps> = ({
  clients: propClients = clients,
  className = ""
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Duplicate clients array for seamless loop
  const duplicatedClients = [...propClients, ...propClients];

  // Debug: Log the number of clients and duplicated clients
  console.log('Number of clients:', propClients.length);
  console.log('Number of duplicated clients:', duplicatedClients.length);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <style>
        {`
          @keyframes slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .carousel-container {
            --slide-duration-sm: 5s;
            --slide-duration-md: 7s;
            --slide-duration-lg: 9s;
            --slide-duration-xl: 11s;
          }
        `}
      </style>
      <div className="relative py-16 px-6 md:px-12 carousel-container">
        {/* Gradient masks for smooth edge effect */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background via-background/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background via-background/90 to-transparent z-10 pointer-events-none" />
        
        {/* Sliding container with adjusted spacing for more logos */}
        <div 
          className="flex animate-[slide_var(--slide-duration-sm)_linear_infinite] 
            md:animate-[slide_var(--slide-duration-md)_linear_infinite] 
            lg:animate-[slide_var(--slide-duration-lg)_linear_infinite] 
            xl:animate-[slide_var(--slide-duration-xl)_linear_infinite] 
            hover:[animation-play-state:paused] 
            items-center justify-center gap-8 md:gap-10 lg:gap-12 xl:gap-14" 
          style={{ minWidth: '200%' }}
        >
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="flex-shrink-0 group cursor-pointer relative"
              style={{ minWidth: '160px', maxWidth: '160px', height: '100px' }}
            >
              {client.logo ? (
                <div className="relative w-full h-full bg-card rounded-xl border border-border shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105 overflow-hidden">
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="w-full h-full object-contain p-3 md:p-4 transition-all duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl md:text-2xl shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  {getInitials(client.name)}
                </div>
              )}
              
              {/* Enhanced tooltip on hover */}
              <div className="absolute -top-20 md:-top-24 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-sm md:text-base px-4 md:px-5 py-3 md:py-4 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 shadow-xl min-w-max">
                <div className="font-semibold text-center">{client.name}</div>
                <div className="text-sm opacity-80 text-center">{client.type}</div>
                <div className="text-xs opacity-60 text-center hidden md:block">{client.location}</div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-foreground"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientsCarousel;