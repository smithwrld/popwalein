import React from 'react';
import { ServiceParameter, ParameterProduct } from '@/lib/quotationApi';
import { cn } from '@/lib/utils';
import { CheckCircle2, SlidersHorizontal, AlertCircle, Package } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface StepParametersSelectProps {
  parameters: ServiceParameter[];
  selectedProducts: Record<string, string>; // parameterId -> productId
  onSelectProduct: (parameter: ServiceParameter, product: ParameterProduct) => void;
  isLoading?: boolean;
}

export const StepParametersSelect: React.FC<StepParametersSelectProps> = ({
  parameters,
  selectedProducts,
  onSelectProduct,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-left mb-4">
          <Skeleton className="h-7 w-56 mb-2 rounded-lg" />
          <Skeleton className="h-4 w-80 rounded-lg" />
        </div>
        {[1, 2, 3].map((paramIdx) => (
          <div key={paramIdx} className="p-5 border rounded-[28px] bg-card space-y-4">
            <Skeleton className="h-6 w-48 rounded-full" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[1, 2, 3, 4].map((pIdx) => (
                <Skeleton key={pIdx} className="h-20 rounded-[20px]" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (parameters.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-muted/40 rounded-[28px] border border-dashed border-border">
        <SlidersHorizontal className="w-10 h-10 mx-auto text-muted-foreground mb-2 opacity-60" />
        <h3 className="text-base font-bold text-foreground">Standard Specifications Included</h3>
        <p className="text-xs text-muted-foreground mt-1">
          No customizable sub-parameters are required for this option. You can proceed to the review step.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="text-left mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Select Your Specifications
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Customize each component by picking exactly one product per parameter below.
        </p>
      </div>

      <div className="space-y-6">
        {parameters.map((parameter, paramIndex) => {
          const selectedProductId = selectedProducts[parameter.id];
          const hasSelection = Boolean(selectedProductId);
          const products = parameter.products || [];

          return (
            <div
              key={parameter.id}
              className={cn(
                'rounded-[28px] p-4 sm:p-6 border-2 transition-all duration-300 bg-card shadow-sm',
                hasSelection
                  ? 'border-border/80 bg-card'
                  : parameter.is_required
                  ? 'border-primary/30 bg-primary/[0.01]'
                  : 'border-border/60'
              )}
            >
              {/* Parameter Header (Parent) */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 mb-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors',
                      hasSelection
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground border border-border'
                    )}
                  >
                    {hasSelection ? <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" /> : paramIndex + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold text-foreground">
                        {parameter.name}
                      </h3>
                      {parameter.price_per_sqft !== undefined && parameter.price_per_sqft > 0 && (
                        <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[11px] font-bold py-0.5 rounded-full">
                          ₹{parameter.price_per_sqft} / sq.ft
                        </Badge>
                      )}
                      {parameter.is_required ? (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[11px] font-semibold py-0.5 rounded-full">
                          Required
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-[11px] font-medium py-0.5 rounded-full">
                          Optional
                        </Badge>
                      )}
                    </div>
                    {parameter.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {parameter.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Status Pill */}
                <div className="self-start sm:self-auto shrink-0">
                  {hasSelection ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      Option Selected
                    </span>
                  ) : parameter.is_required ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">
                      <AlertCircle className="w-3 h-3" />
                      Choice Needed
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Products List inside Parameter (Grid of 2 Child Cards) */}
              {products.length === 0 ? (
                <div className="text-center py-5 px-4 bg-muted/20 rounded-[20px] border border-dashed text-xs text-muted-foreground">
                  <Package className="w-5 h-5 mx-auto mb-1 opacity-50" />
                  No specific products configured for {parameter.name}.
                </div>
              ) : (
                <div
                  role="radiogroup"
                  aria-label={`Select ${parameter.name}`}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {products.map((product) => {
                    const isSelected = selectedProductId === product.id;
                    const effectivePrice =
                      typeof product.price_per_sqft === 'number' && product.price_per_sqft > 0
                        ? product.price_per_sqft
                        : (Number(parameter.price_per_sqft) || 0);

                    return (
                      <div
                        key={product.id}
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={0}
                        onClick={() => onSelectProduct(parameter, product)}
                        onKeyDown={(e) => {
                          if (e.key === ' ' || e.key === 'Enter') {
                            e.preventDefault();
                            onSelectProduct(parameter, product);
                          }
                        }}
                        className={cn(
                          'group relative flex flex-row items-center cursor-pointer rounded-[24px] p-3 sm:p-4 transition-all duration-200 border-2 select-none active:scale-[0.99] gap-3 sm:gap-4',
                          isSelected
                            ? 'bg-primary/[0.04] border-primary ring-2 ring-primary/20 shadow-sm'
                            : 'bg-card hover:bg-muted/30 border-border/70 hover:border-primary/40'
                        )}
                      >
                        {/* Curved Square Image Thumbnail Box */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 aspect-square shrink-0 rounded-[18px] sm:rounded-[20px] bg-muted/40 dark:bg-muted/20 border border-border/70 overflow-hidden flex items-center justify-center p-1.5 sm:p-2 relative group-hover:border-primary/40 transition-colors">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <Package className="w-7 h-7 sm:w-8 sm:h-8 text-muted-foreground/40" />
                          )}
                        </div>

                        {/* Row Content Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                          <div className="space-y-0.5 sm:space-y-1">
                            {/* Product Title & Radio Circle */}
                            <div className="flex items-start justify-between gap-1.5">
                              <h4
                                className={cn(
                                  'text-xs sm:text-base font-bold leading-tight transition-colors line-clamp-1',
                                  isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'
                                )}
                              >
                                {product.name}
                              </h4>

                              {/* Radio Circle Indicator */}
                              <div
                                className={cn(
                                  'w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all mt-0.5',
                                  isSelected
                                    ? 'border-primary bg-primary text-primary-foreground shadow-xs'
                                    : 'border-border/80 group-hover:border-primary/60 bg-card'
                                )}
                              >
                                {isSelected ? (
                                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                ) : null}
                              </div>
                            </div>

                            {/* Tagline / Subtitle */}
                            {product.title && product.title !== product.name && (
                              <p className="text-[11px] sm:text-xs font-semibold text-primary/85 leading-snug line-clamp-1">
                                {product.title}
                              </p>
                            )}

                            {/* Description - clearly visible */}
                            <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed line-clamp-2">
                              {product.description || 'Verified manufacturer specification.'}
                            </p>
                          </div>

                          {/* Price & Selection Pill Bar */}
                          <div className="mt-2 pt-1.5 sm:pt-2 border-t border-border/40 flex items-center justify-between flex-wrap gap-1.5 text-xs">
                            <div className="flex items-center gap-1.5">
                              {effectivePrice > 0 ? (
                                <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 sm:px-2.5 py-0.5 rounded-full border border-emerald-500/20 text-[11px] sm:text-xs">
                                  ₹{effectivePrice} <span className="text-[10px] font-normal text-muted-foreground">/ sq.ft</span>
                                </span>
                              ) : (
                                <span className="text-[10px] sm:text-[11px] font-medium text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">
                                  Standard Inclusion
                                </span>
                              )}
                            </div>

                            <span
                              className={cn(
                                'font-semibold text-[11px] sm:text-xs flex items-center gap-1',
                                isSelected ? 'text-primary font-bold' : 'text-muted-foreground'
                              )}
                            >
                              {isSelected ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                                  Selected
                                </>
                              ) : (
                                'Choose'
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
