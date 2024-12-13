import { Skeleton } from "@/components/ui/skeleton";

export function EventCardSkeleton() {
  return (
    <Skeleton className="flex flex-col group hover:bg-muted transition-all rounded-lg">
      <Skeleton className="h-48 rounded-lg" />

      <div className="flex flex-col gap-4 px-3 py-5">
        <header className="flex flex-col gap-2">
          <Skeleton className="w-3/4 h-7" />

          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </header>

        <div className="flex items-center w-full gap-4">
          <div className="flex gap-1">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-12 h-4" />
          </div>

          <div className="flex gap-1">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-12 h-4" />
          </div>
        </div>
      </div>
    </Skeleton>
  );
}
