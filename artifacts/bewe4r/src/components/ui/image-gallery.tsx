import React from "react";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ImageGalleryProps {
  images: string[];
  columns?: number;
}

/* Deterministic ratio pattern gives the grid a masonry rhythm without
   randomness (avoids reflow/non-deterministic layout on every render). */
const RATIOS = [3 / 4, 4 / 3, 1, 4 / 3, 3 / 4];

export function ImageGallery({ images, columns = 3 }: ImageGalleryProps) {
  const cols: string[][] = Array.from({ length: columns }, () => []);
  images.forEach((src, i) => {
    cols[i % columns].push(src);
  });

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cols.map((colImgs, col) => (
        <div key={col} className="grid gap-4 md:gap-6">
          {colImgs.map((src, index) => (
            <AnimatedImage
              key={`${col}-${index}`}
              alt={`Production ${col}-${index}`}
              src={src}
              ratio={RATIOS[(col + index) % RATIOS.length]}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

interface AnimatedImageProps {
  alt: string;
  src: string;
  ratio: number;
}

function AnimatedImage({ alt, src, ratio }: AnimatedImageProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <AspectRatio
      ref={ref}
      ratio={ratio}
      className="relative size-full overflow-hidden rounded-[2px] border border-white/10 bg-white/5"
    >
      <img
        alt={alt}
        src={src}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        className={cn(
          "size-full rounded-[2px] object-cover grayscale opacity-0 transition-all duration-1000 ease-in-out",
          isInView && !isLoading && "opacity-100",
        )}
      />
    </AspectRatio>
  );
}
