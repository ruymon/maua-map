import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import "mapbox-gl/dist/mapbox-gl.css";
import { AppSidebar } from "./_components/app-sidebar";
import { Map } from "./_components/map";

const sidebarStyle = {
  "--sidebar-width": "19rem",
} as React.CSSProperties;

export default function MapLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider style={sidebarStyle}>
      <AppSidebar />
      <SidebarInset className="overflow-clip">
        {children}
        <Map />
      </SidebarInset>
    </SidebarProvider>
  );
}
