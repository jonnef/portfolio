import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ThemeProviderComponent from "./components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Basis für absolute URLs, z. B. das Vorschaubild (src/app/opengraph-image.png)
  metadataBase: new URL("https://www.jonnef.dev"),
  title: {
    default: "Kenneth Bolland – Portfolio",
    template: "%s | Kenneth Bolland",
  },
  description: "Portfolio of Kenneth Bolland – projects, background and contact.",
  // Vorschau beim Teilen des Links (LinkedIn, WhatsApp, Slack, …)
  openGraph: {
    type: "website",
    siteName: "Kenneth Bolland",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProviderComponent>
        <Navbar></Navbar>
          <main className="w-full max-w-5xl mx-auto px-4">
            {children}
          </main>
        <Footer></Footer>
        </ThemeProviderComponent>
      </body>
    </html>
  );
}
