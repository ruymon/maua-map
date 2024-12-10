import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { AnchorHTMLAttributes, ReactNode } from "react";
import { NavLink } from "../nav-link";

interface SidebarItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string;
  label: string;
  icon: ReactNode;
  href: string;
  disabled?: boolean;
}

export function SidebarItem({
  icon,
  label,
  title,
  href,
  className,
  disabled,
  ...props
}: SidebarItemProps) {
  return (
    <Tooltip delayDuration={400}>
      <TooltipTrigger
        disabled={disabled}
        className="disabled:pointer-events-none disabled:opacity-50"
      >
        <NavLink
          href={href}
          className={cn(
            "after:contents-[''] relative flex w-full items-center justify-center text-muted-foreground transition-all after:absolute after:left-0 after:h-1/2 after:w-1 after:rounded-r-full after:bg-background hover:text-accent-foreground data-[current=true]:text-primary data-[current=true]:after:bg-primary dark:text-muted-foreground/50 dark:hover:text-muted-foreground dark:data-[current=true]:text-primary",
            className,
          )}
          {...props}
        >
          {icon}
          <span className="sr-only">{title}</span>
        </NavLink>
      </TooltipTrigger>
      <TooltipContent
        side="right"
        className="flex flex-col rounded-sm px-2"
        sideOffset={6}
      >
        <span className="text-xs font-semibold">{title}</span>
        <span className="text-2xs text-muted-foreground">{label}</span>
      </TooltipContent>
    </Tooltip>
  );
}
