import { cn } from "@/lib/utils";
import { MapIcon } from "lucide-react";

interface MapSkeletonProps {
  isMapLoading: boolean;
}

export function MapSkeleton({ isMapLoading }: MapSkeletonProps) {
  return (
    <figure
      className={cn(
        "relative flex flex-1 items-center justify-center bg-background/75 backdrop-blur-md transition-all delay-1000 duration-1000",
        isMapLoading ? "visible z-20 opacity-100" : "invisible -z-10 opacity-0",
      )}
    >
      <div className="flex max-w-sm flex-col items-center gap-0.5">
        <MapIcon className="mb-4 h-10 w-10 animate-pulse text-muted-foreground" />

        <span className="text-balance text-center text-xl font-semibold text-muted-foreground">
          Mapa carregando...
        </span>
        <span className="text-balance text-center text-sm text-muted-foreground opacity-75">
          Isso não deve demorar mais que a derivada de uma função polinomial.
        </span>
      </div>
    </figure>
  );
}
