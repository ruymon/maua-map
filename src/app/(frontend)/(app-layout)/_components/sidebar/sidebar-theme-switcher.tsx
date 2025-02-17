"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Theme } from "@/types/themes";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

const themeIconVariants: { [key in Theme]: ReactNode } = {
  light: <SunIcon className="w-5" />,
  dark: <MoonIcon className="w-5" />,
  system: <SunMoonIcon className="w-5" />,
} as const;

export function SidebarThemeSwitcher() {
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex w-full items-center justify-center">
        <Skeleton className="h-6 w-6 rounded-sm" />
      </div>
    );
  }

  function handleThemeSwitch() {
    if (resolvedTheme === "light") {
      setTheme("dark");
    }

    if (resolvedTheme === "dark") {
      setTheme("light");
    }
  }

  return (
    <Tooltip delayDuration={400}>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={handleThemeSwitch}
          className="flex w-full items-center justify-center text-muted-foreground transition-all hover:text-accent-foreground dark:text-muted-foreground/50 dark:hover:text-muted-foreground"
        >
          {themeIconVariants[resolvedTheme as keyof typeof themeIconVariants]}
          <span className="sr-only">Tema</span>
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="right"
        className="flex flex-col rounded-sm px-2"
        sideOffset={6}
      >
        <span className="text-xs font-semibold">Tema</span>
        <span className="text-2xs text-muted-foreground">Mude a aparência</span>
      </TooltipContent>
    </Tooltip>
  );
}
