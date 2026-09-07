import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StepItem {
  id: string;
  title: string;
  shortLabel: string;
  icon?: React.ReactNode;
}

interface QuotationProgressBarProps {
  steps: StepItem[];
  currentStepIndex: number;
  onStepClick?: (index: number) => void;
}

export const QuotationProgressBar: React.FC<QuotationProgressBarProps> = ({
  steps,
  currentStepIndex,
  onStepClick,
}) => {
  return (
    <div className="w-full mb-6 sm:mb-8">
      {/* Mobile Inline Stepper (No floating bar, no sidebar/slider, 100% natural inline flow) */}
      <div className="block md:hidden bg-card/95 p-3.5 rounded-[22px] border border-border/80 shadow-xs mb-4">
        {/* Step indicator header */}
        <div className="flex items-center justify-between text-xs mb-2.5 px-0.5">
          <span className="font-semibold text-muted-foreground">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
          <span className="font-bold text-primary">
            {steps[currentStepIndex]?.title}
          </span>
        </div>

        {/* Stepper with connecting solid line and tap targets */}
        <div className="relative flex justify-between items-center px-2 pt-1 pb-0.5">
          {/* Connector Line centered on step circles (circle is w-7 / 28px, center is top-[14px]) */}
          <div className="absolute left-6 right-6 top-[15px] -translate-y-1/2 h-0.5 bg-muted rounded-full -z-0">
            <div
              className="h-0.5 bg-primary rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>

          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const isUpcoming = idx > currentStepIndex;
            const isClickable = onStepClick && idx < currentStepIndex;

            return (
              <button
                key={step.id}
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(idx)}
                className="relative z-10 flex flex-col items-center focus:outline-none"
              >
                <div
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300',
                    isCompleted && 'bg-primary text-primary-foreground shadow-xs',
                    isCurrent && 'bg-background text-primary border-2 border-primary ring-3 ring-primary/15 shadow-xs scale-105',
                    isUpcoming && 'bg-muted text-muted-foreground/50 border border-border/50'
                  )}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                </div>
                <span
                  className={cn(
                    'text-[10px] font-semibold mt-1 transition-colors leading-none',
                    isCurrent && 'text-primary font-bold',
                    isCompleted && 'text-foreground/80',
                    isUpcoming && 'text-muted-foreground/50'
                  )}
                >
                  {step.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Rich Stepper */}
      <div className="hidden md:block bg-card/75 backdrop-blur-md p-5 rounded-[28px] border border-border/80 shadow-sm">
        <div className="relative flex justify-between">
          {/* Connector Line centered on the step circles (circle size is w-11 / 44px, so center is top-[22px]) */}
          <div className="absolute left-8 right-8 top-[22px] -translate-y-1/2 h-1 bg-muted rounded-full -z-0">
            <div
              className="h-1 bg-primary rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Step Nodes */}
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isUpcoming = index > currentStepIndex;
            const isClickable = onStepClick && index < currentStepIndex;

            return (
              <div
                key={step.id}
                className="relative z-10 flex flex-col items-center group"
              >
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick(index)}
                  className={cn(
                    'w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm',
                    isCompleted &&
                      'bg-primary text-primary-foreground hover:scale-105 cursor-pointer ring-4 ring-primary/20',
                    isCurrent &&
                      'bg-background text-primary border-2 border-primary ring-4 ring-primary/25 scale-105 shadow-md',
                    isUpcoming &&
                      'bg-muted text-muted-foreground border border-border cursor-not-allowed'
                  )}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <span>0{index + 1}</span>
                  )}
                </button>

                <span
                  className={cn(
                    'mt-2 text-xs font-semibold tracking-normal transition-colors text-center max-w-[110px]',
                    isCurrent && 'text-primary font-bold',
                    isCompleted && 'text-foreground',
                    isUpcoming && 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
