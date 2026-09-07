import React from 'react';
import { QuotationService } from '@/lib/quotationApi';
import { cn } from '@/lib/utils';
import { Layers, CheckCircle2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface StepServiceSelectProps {
  services: QuotationService[];
  selectedServiceId: string | null;
  onSelectService: (service: QuotationService) => void;
  isLoading?: boolean;
}

export const StepServiceSelect: React.FC<StepServiceSelectProps> = ({
  services,
  selectedServiceId,
  onSelectService,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="w-full space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          {[1, 2, 3, 4].map((idx) => (
            <div key={idx} className="p-4 border rounded-[20px] bg-card space-y-3 w-full">
              <Skeleton className="h-36 w-full rounded-[16px]" />
              <Skeleton className="h-5 w-3/4 rounded" />
              <Skeleton className="h-4 w-full rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-muted/40 rounded-[20px] border border-dashed border-border w-full">
        <Layers className="w-10 h-10 mx-auto text-muted-foreground mb-2 opacity-60" />
        <h3 className="text-base font-bold text-foreground">No Services Available</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Please configure services in the admin panel.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-up">
      {/* Grid of 2 (2 cards per row, spanning full width cleanly with consistent spacing) */}
      <div
        role="radiogroup"
        aria-label="Select Service"
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full"
      >
        {services.map((service) => {
          const isSelected = selectedServiceId === service.id;

          return (
            <div
              key={service.id}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onClick={() => onSelectService(service)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  onSelectService(service);
                }
              }}
              className={cn(
                'group relative flex flex-col justify-between cursor-pointer rounded-[20px] p-4 bg-card border-2 transition-all duration-300 select-none overflow-hidden hover:shadow-md active:scale-[0.99] w-full',
                isSelected
                  ? 'border-primary ring-4 ring-primary/15 bg-primary/[0.02] shadow-sm'
                  : 'border-border/60 hover:border-primary/40 hover:bg-muted/10'
              )}
            >
              {/* Seamless Image Container */}
              <div className="relative w-full h-36 sm:h-40 rounded-[16px] overflow-hidden mb-3 bg-muted/40 flex items-center justify-center">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="p-4 text-center text-primary/70">
                    <Layers className="w-8 h-8 mx-auto stroke-[1.5]" />
                  </div>
                )}

                {/* Floating Active Radio Badge */}
                <div
                  className={cn(
                    'absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-sm',
                    isSelected
                      ? 'bg-primary text-primary-foreground scale-100'
                      : 'bg-black/35 text-white/80 hover:bg-black/50'
                  )}
                >
                  {isSelected ? (
                    <CheckCircle2 className="w-4 h-4 fill-primary text-primary-foreground" />
                  ) : (
                    <div className="w-3 h-3 rounded-full border-2 border-white/80" />
                  )}
                </div>
              </div>

              {/* Service Details */}
              <div className="flex-1 flex flex-col justify-between px-1">
                <div>
                  <h3
                    className={cn(
                      'text-base sm:text-lg font-bold transition-colors leading-tight',
                      isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'
                    )}
                  >
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  )}
                </div>

                <div className="mt-3 pt-2.5 border-t border-border/40 flex items-center justify-between">
                  <span
                    className={cn(
                      'text-xs font-semibold',
                      isSelected ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {isSelected ? 'Selected' : 'Select Service'}
                  </span>
                  <div
                    className={cn(
                      'w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors',
                      isSelected ? 'border-primary bg-primary' : 'border-border'
                    )}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
