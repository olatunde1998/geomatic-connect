import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProviderPage from "./providers/session-providers";

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
        <SessionProviderPage>{children}</SessionProviderPage>
      </body>
    </html>
  );
}
