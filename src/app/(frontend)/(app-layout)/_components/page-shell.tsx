"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode, useState } from "react";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageShellProps {
  children: ReactNode;
  shellClassName?: string;
  containerClassName?: string;
  width?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  hideTopNav?: boolean;
  shellTitle?: string;
  closeHref?: string;
  mobileDrawerSnapPoints?: [number | string, number | string, number | string];
}

const widthClassNames = {
  sm: "md:max-w-sm",
  md: "md:max-w-md",
  lg: "md:max-w-lg",
  xl: "md:max-w-xl",
  "2xl": "md:max-w-2xl",
  "3xl": "md:max-w-3xl",
  full: "md:max-w-full",
};

export function PageShell({
  children,
  shellClassName,
  containerClassName,
  width = "md",
  hideTopNav = false,
  shellTitle,
  closeHref = "/",
  mobileDrawerSnapPoints = [0.3, 0.6, 1],
}: PageShellProps) {
  const [drawerSnap, setDrawerSnap] = useState<number | string | null>(
    mobileDrawerSnapPoints[1],
  );
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();

  const handleDrawerClose = () => {
    router.push(closeHref);
  };

  if (!isDesktop) {
    return (
      <Drawer
        open={true}
        onClose={handleDrawerClose}
        snapPoints={mobileDrawerSnapPoints}
        activeSnapPoint={drawerSnap}
        modal
        setActiveSnapPoint={setDrawerSnap}
      >
        <DrawerContent>
          <VisuallyHidden>
            <DrawerTitle />
            <DrawerDescription />
          </VisuallyHidden>
          <div
            className={cn("p-4 faded-bottom relative", {
              "overflow-y-auto": drawerSnap === 1,
              "overflow-hidden": drawerSnap !== 1,
            })}
          >
            <div className="mx-auto mb-2 h-2 w-24 rounded-full bg-muted" />
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <div
      className={cn(
        "z-20 flex h-full w-full flex-col overflow-y-auto bg-background",
        widthClassNames[width],
        shellClassName,
      )}
    >
      {!hideTopNav && (
        <header className="sticky top-0 z-20 min-h-10 flex items-center justify-between px-6 py-1.5 text-muted-foreground backdrop-blur-xl bg-background/20">
          <span className="text-xs">{shellTitle}</span>
          <nav className="flex items-center gap-0.5">
            <Link
              href={closeHref}
              className="rounded-sm p-2 transition-all hover:bg-muted hover:text-accent-foreground"
            >
              <XIcon className="h-3.5 w-3.5" />
            </Link>
          </nav>
        </header>
      )}

      <main className={cn("flex flex-1 px-6 py-2", containerClassName)}>
        {children}
      </main>
    </div>
  );
}
