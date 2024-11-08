import "mapbox-gl/dist/mapbox-gl.css";
import { Map } from "./_components/map";
import { Sidebar } from "./_components/sidebar";

export default function MapLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-svh w-screen flex-col-reverse justify-end md:flex-row md:justify-normal">
      <Sidebar />
      {children}
      <Map />
    </div>
  );
}
