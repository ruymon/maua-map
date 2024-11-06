import { ReactNode } from "react";

interface EventsPanelLayoutProps {
  children: ReactNode;
}

export default function EventsPanelLayout({
  children,
}: EventsPanelLayoutProps) {
  return (
    <main className="flex-1 flex-col gap-8 overflow-y-auto flex p-4 max-w-lg relative">
      {children}
    </main>
  );
}
