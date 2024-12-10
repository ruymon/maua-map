import { MauaIcon } from "@/components/maua-icon";
import { Separator } from "@/components/ui/separator";
import { Building2Icon, CalendarIcon, LogInIcon, MapIcon } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { SidebarThemeSwitcher } from "./sidebar-theme-switcher";

export function Sidebar() {
  return (
    <aside className="w-full z-30 h-14 md:h-screen md:max-h-screen md:w-14 bg-sidebar flex">
      <div className="flex flex-1 md:flex-col gap-4 md:py-2 md:px-0 px-4">
        <header className="md:flex flex-col mx-auto hidden gap-2">
          <MauaIcon className="w-10 text-primary rounded" />

          <span className="rounded w-10 flex p-1 items-center justify-center text-xs font-bold uppercase leading-none bg-orange-500/10 text-orange-500">
            beta
          </span>
        </header>

        <Separator className="hidden md:flex mx-auto w-3/4" />

        <nav className="flex flex-1 md:flex-col md:justify-between">
          <div className="flex md:flex-col gap-4">
            <SidebarItem
              href="/"
              icon={<MapIcon className="w-5" />}
              title="Mapa"
              label="Instituto Mauá de Tecnologia"
            />

            <SidebarItem
              href="/events"
              icon={<CalendarIcon className="w-5" />}
              title="Eventos"
              label="Confira os próximos eventos"
            />

            <SidebarItem
              href="/rooms"
              icon={<Building2Icon className="w-5" />}
              title="Salas"
              label="Veja todos os espaços disponíveis"
            />
          </div>

          <SidebarThemeSwitcher />
        </nav>

        <Separator className="hidden md:flex mx-auto w-3/4" />

        <SidebarItem
          href="/admin"
          icon={<LogInIcon className="w-5" />}
          title="Painel de Administração"
          label="Acesse o painel de administração"
        />
      </div>
    </aside>
  );
}
