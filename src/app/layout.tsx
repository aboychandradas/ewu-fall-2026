import type {
  Metadata,
  Viewport,
} from "next";
import type { ReactNode } from "react";
import Script from "next/script";

import "./globals.css";
import AppShell from "@/components/app-shell";
import RegisterPWA from "@/components/pwa/register-pwa";
import { ThemeProvider } from "@/components/theme/theme-provider";

export const metadata: Metadata = {
  title: "EWU Fall 2026",
  description:
    "East West University Information Studies academic companion.",
  applicationName: "EWU Fall 2026",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "9th-Sem.",
  },

  icons: {
    icon: [
      {
        url: "/icon-192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/icon-512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],

    apple: [
      {
        url: "/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
};

const themeBootstrapScript = `
(function () {
  try {
    var saved = window.localStorage.getItem("ewu-academic-theme");
    var preference = saved === "light" || saved === "dark" || saved === "system" ? saved : "system";
    var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = preference === "system" ? (systemDark ? "dark" : "light") : preference;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    var themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", theme === "dark" ? "#0b0c0f" : "#f5f5f7");
  } catch (error) {
    document.documentElement.dataset.theme = "light";
    document.documentElement.style.colorScheme = "light";
  }
})();
`;

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script
          id="theme-preference-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeBootstrapScript }}
        />
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
        <RegisterPWA />
      </body>
    </html>
  );
}