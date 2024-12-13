import { Skeleton } from "@/components/ui/skeleton";

export default function EventDetailsLoadingPage() {
  return (
    <div className="flex flex-1 flex-col gap-8 z-30">
      <div className="flex flex-col gap-6">
        <Skeleton className="rounded-lg h-36 md:h-48" />

        <header className="flex flex-col gap-2">
          <Skeleton className="w-3/4 h-9" />

          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </header>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Skeleton className="w-1/4 h-4" />
            <Skeleton className="w-1/2 h-6" />
          </div>

          <div className="flex flex-col gap-1">
            <Skeleton className="w-1/4 h-4" />
            <Skeleton className="w-1/2 h-6" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <header className="flex flex-col gap-1.5">
          <Skeleton className="w-1/2 h-7" />
          <Skeleton className="w-3/4 h-4" />
        </header>

        <div className="flex flex-col gap-2">
          <Skeleton className="rounded-lg h-12" />
          <Skeleton className="rounded-lg h-12" />
          <Skeleton className="rounded-lg h-12" />
          <Skeleton className="rounded-lg h-12" />
        </div>
      </div>
    </div>
  );
}
