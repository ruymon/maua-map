import { cn } from "@/lib/utils";
import { AnchorHTMLAttributes, ReactNode } from "react";
import { NavLink } from "../nav-link";

interface MobileNavbarItemProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string;
  label: string;
  icon: ReactNode;
  href: string;
  disabled?: boolean;
}

export function MobileNavbarItem({
  icon,
  title,
  href,
  className,
  ...props
}: MobileNavbarItemProps) {
  return (
    <NavLink
      href={href}
      className={cn(
        "after:contents-[''] relative flex w-full items-center justify-center text-muted-foreground transition-all after:absolute after:bottom-0 after:h-1 after:w-1/2 after:rounded-r-full after:bg-sidebar hover:text-accent-foreground data-[current=true]:text-primary data-[current=true]:after:bg-primary dark:text-muted-foreground/50 dark:hover:text-muted-foreground dark:data-[current=true]:text-primary",
        className,
      )}
      {...props}
    >
      {icon}
      <span className="sr-only">{title}</span>
    </NavLink>
  );
}
