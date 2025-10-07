import React, { useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { cn } from "@/lib/utils";
import useMeasure from "react-use-measure";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { clients, type Client } from "@/data/clients";

interface InfiniteSliderProps {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  reverse?: boolean;
  className?: string;
}

function InfiniteSlider({
  children,
  gap = 24,
  duration = 25,
  durationOnHover,
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let controls;
    const contentSize = width + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration:
          currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration: currentDuration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return controls?.stop;
  }, [key, translation, currentDuration, width, gap, isTransitioning, reverse]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
      }
    : {};

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        className="flex w-max"
        style={{
          x: translation,
          gap: `${gap}px`,
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

interface ClientLogoProps {
  client: Client;
}

function ClientLogo({ client }: ClientLogoProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div
          className="group relative flex h-40 w-56 cursor-pointer items-center justify-center rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:bg-accent/50 hover:shadow-lg"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {client.logo ? (
            <img
              src={client.logo}
              alt={client.name}
              className="h-full w-full object-contain transition-all duration-300"
            />
          ) : (
            <div className="text-3xl font-bold text-muted-foreground transition-colors duration-300 group-hover:text-primary">
              {getInitials(client.name)}
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-72 border-border bg-popover p-4 shadow-xl"
        sideOffset={8}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-foreground">{client.name}</h3>
          <p className="text-sm text-muted-foreground">{client.type}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {client.location}
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface ClientsCarouselProps {
  className?: string;
}

export default function ClientsCarousel({ className }: ClientsCarouselProps) {
  return (
    <div className={cn("w-full py-16", className)}>
      
      <InfiniteSlider
        duration={63}
        durationOnHover={100}
        gap={32}
        className="w-full"
      >
        {clients.map((client) => (
          <ClientLogo key={client.id} client={client} />
        ))}
      </InfiniteSlider>
    </div>
  );
}
