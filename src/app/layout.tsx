import type {
  Metadata,
  Viewport,
} from "next";
import type { ReactNode } from "react";

import "./globals.css";
import AppShell from "@/components/app-shell";
import RegisterPWA from "@/components/pwa/register-pwa";

export const metadata: Metadata = {
  title: "EWU Fall 2026",
  description:
    "East West University Information Studies academic companion.",
  applicationName: "EWU Fall 2026",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "EWU Fall 2026",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f5f5f7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
        <RegisterPWA />
      </body>
    </html>
  );
}