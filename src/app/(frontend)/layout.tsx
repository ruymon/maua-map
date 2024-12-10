import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { ClientProviders } from "./client-providers";
import "./globals.css";

const fontSans = Lato({
  weight: ["100", "300", "400", "700", "900"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mauá Map",
  description: "Mapa virtual do Instituto Mauá de Tecnologia",
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
          "min-h-screen antialiased w-full  whitespace-pre-line bg-background text-foreground",
          fontSans.className,
        )}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
