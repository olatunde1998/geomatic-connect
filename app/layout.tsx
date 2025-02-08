import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SessionProviderPage from "@/app/providers/session-providers";
import { ThemeProvider } from "@/app/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Geomatic Connect",
  description: "Geomatic Connect Application Dashboard",
  viewport: {
    width: "device-width",
    height: "device-height",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#F2F6F6" />
      </head>
      <body
        className={`${inter.className} ${
          process.env.NODE_ENV == "development" ? "debug-screens" : ""
        }`}
      >
        <SessionProviderPage>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProviderPage>
        <Analytics />
      </body>
    </html>
  );
}
