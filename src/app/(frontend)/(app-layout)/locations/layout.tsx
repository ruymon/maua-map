import { ReactNode } from "react";
import { PageShell } from "../_components/page-shell";

interface LocationPanelLayoutProps {
  children: ReactNode;
}

export default function LocationPanelLayout({
  children,
}: LocationPanelLayoutProps) {
  return <PageShell shellTitle="Localidades">{children}</PageShell>;
}
