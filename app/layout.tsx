import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SessionProviderPage from "@/app/providers/session-providers";
import { ThemeProvider } from "@/app/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: {
    template: "%s",
    default: "Geomatic Connect",
  },
  description:
    "Geomatic Connect is an platform designed to provide a platform for higher education students to connect with companies offering internships, SIWES, SWEP placements, and other practical training opportunities. It also serves as a valuable resource for companies to discover and recruit qualified candidates",
  viewport: {
    width: "device-width",
    height: "device-height",
    initialScale: 1,
  },
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL}`),
  twitter: {
    card: "summary_large_image",
    site: `${process.env.NEXT_PUBLIC_APP_URL}`,
    creator: "Geomatic Connect Teams",
    title: "Geomatic Connect",
    description:
      "Geomatic Connect is an platform designed to provide a platform for higher education students to connect with companies offering internships, SIWES, SWEP placements, and other practical training opportunities. It also serves as a valuable resource for companies to discover and recruit qualified candidates",
    images: ["/images/opengraph-image.png"],
  },
  openGraph: {
    images: ["/images/opengraph-image.png"],
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
