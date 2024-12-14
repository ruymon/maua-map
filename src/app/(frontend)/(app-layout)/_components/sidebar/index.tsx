import { MauaIcon } from "@/components/maua-icon";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, LogInIcon, MapIcon } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { SidebarThemeSwitcher } from "./sidebar-theme-switcher";

export function Sidebar() {
  return (
    <aside className=" z-30 hidden h-screen max-h-screen w-14 bg-sidebar md:flex flex-col items-center">
      <div className="flex flex-1 flex-col gap-4 py-2 px-4">
        <header className="flex flex-col mx-auto  gap-2">
          <MauaIcon className="w-10 text-primary rounded" />

          <span className="rounded w-10 flex p-1 items-center justify-center text-xs font-bold uppercase leading-none bg-[#DC9705] text-white">
            beta
          </span>
        </header>

        <Separator className="flex mx-auto w-3/4" />

        <nav className="flex flex-1 flex-col justify-between">
          <div className="flex flex-col gap-4">
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
          </div>

          <SidebarThemeSwitcher />
        </nav>

        <Separator className="flex mx-auto w-3/4" />

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
