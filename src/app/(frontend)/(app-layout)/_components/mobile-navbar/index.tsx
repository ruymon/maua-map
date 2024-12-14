import { CalendarIcon, LogInIcon, MapIcon } from "lucide-react";
import { MobileNavbarItem } from "./mobile-navbar-item";
import { MobileThemeSwitcher } from "./mobile-theme-switcher";

export function MobileNavbar() {
  return (
    <nav className="z-30 h-16 w-full bg-sidebar flex md:hidden justify-around">
      <MobileNavbarItem
        href="/"
        icon={<MapIcon className="w-6" />}
        title="Mapa"
        label="Instituto Mauá de Tecnologia"
      />
      <MobileNavbarItem
        href="/events"
        icon={<CalendarIcon className="w-6" />}
        title="Eventos"
        label="Confira os próximos eventos"
      />
      <MobileThemeSwitcher />
      <MobileNavbarItem
        href="/admin"
        icon={<LogInIcon className="w-6" />}
        title="Painel de Administração"
        label="Acesse o painel de administração"
      />
    </nav>
  );
}
