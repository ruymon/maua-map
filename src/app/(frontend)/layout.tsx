import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ClientProviders } from "./client-providers";
import "./globals.css";

const fontSans = Roboto({
  weight: ["100", "300", "400", "700", "900"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mauá Map",
  description: "Mapa virtual do Instituto Mauá de Tecnologia",
  viewport:
    "width=device-width, minimal-ui, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-svh antialiased w-full marker:whitespace-pre-line bg-background text-foreground",
          fontSans.className,
        )}
      >
        <ClientProviders>{children}</ClientProviders>
        <Toaster />
      </body>
    </html>
  );
}
