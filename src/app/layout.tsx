import { Analytics } from "@vercel/analytics/next";
import { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}
