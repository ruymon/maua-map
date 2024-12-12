import { Suspense } from "react";
import { MapShell } from "./_components/map/map-shell";
import { MapSkeleton } from "./_components/map/map-skeleton";
import { Sidebar } from "./_components/sidebar";
import { UserGeoLocationTracker } from "./user-geolocation-tracker";

export default function MapLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-svh w-full flex-col-reverse justify-end md:flex-row md:justify-normal">
      <Sidebar />
      <div className="flex-1 flex relative flex-col justify-end md:flex-row md:justify-normal">
        {children}
        <Suspense fallback={<MapSkeleton isMapLoading />}>
          <MapShell />
        </Suspense>
        <UserGeoLocationTracker />
      </div>
    </div>
  );
}
