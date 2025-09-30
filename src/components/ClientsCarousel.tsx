import React from 'react';
import { clients, Client } from '@/data/clients';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
    <TooltipProvider>
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
              <Tooltip key={`${client.id}-${index}`} delayDuration={200}>
                <TooltipTrigger asChild>
                  <div
                    className="flex-shrink-0 cursor-pointer"
                    style={{ minWidth: '160px', maxWidth: '160px', height: '100px' }}
                  >
                    {client.logo ? (
                      <div className="relative w-full h-full bg-card rounded-xl border border-border shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                        <img
                          src={client.logo}
                          alt={`${client.name} logo`}
                          className="w-full h-full object-contain p-3 md:p-4 transition-all duration-300 hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl md:text-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                        {getInitials(client.name)}
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-foreground text-background border-none shadow-xl">
                  <div className="text-center">
                    <div className="font-semibold">{client.name}</div>
                    <div className="text-sm opacity-80">{client.type}</div>
                    <div className="text-xs opacity-60">{client.location}</div>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ClientsCarousel;