"use client";

import { ReactNode } from "react";
import { PageShell } from "../_components/page-shell";

interface EventsPanelLayoutProps {
  children: ReactNode;
}

export default function EventsPanelLayout({
  children,
}: EventsPanelLayoutProps) {
  return (
    <PageShell shellTitle="Eventos" shellClassName="relative">
      {children}
    </PageShell>
  );
}
