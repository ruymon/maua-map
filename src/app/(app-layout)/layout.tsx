import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarIcon } from "lucide-react";
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
      <SidebarInset className="h-svh">
        {children}
        <Map>
          <SidebarTrigger className="absolute left-4 top-4">
            <SidebarIcon />
          </SidebarTrigger>
        </Map>
      </SidebarInset>
    </SidebarProvider>
  );
}
