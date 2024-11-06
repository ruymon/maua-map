"use client";

import { BuildingIcon, Calendar1Icon, MapIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { SidebarTheme } from "./sidebar-theme";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <MapIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Mapa Virtual</span>
                  <span className="truncate text-xs">
                    Instituto Mauá de Tecnologia
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuButton size="lg" asChild>
            <Link href="/events">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent ">
                <Calendar1Icon className="size-4" />
              </div>
              <span className="truncate">Eventos</span>
            </Link>
          </SidebarMenuButton>

          <SidebarMenuButton size="lg" asChild>
            <Link href="/events">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent ">
                <BuildingIcon className="size-4" />
              </div>
              <span className="truncate">Salas</span>
            </Link>
          </SidebarMenuButton>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarTheme />
      </SidebarFooter>
    </Sidebar>
  );
}
