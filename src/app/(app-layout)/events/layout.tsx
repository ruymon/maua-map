import { ReactNode } from "react";

interface EventsPanelLayoutProps {
  children: ReactNode;
}

export default function EventsPanelLayout({
  children,
}: EventsPanelLayoutProps) {
  return <main className="flex-1 max-w-lg flex p-4">{children}</main>;
}
