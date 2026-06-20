import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lurra Projects | Premium Melbourne Landscaping",
  description:
    "Lurra Projects creates extraordinary outdoor sanctuaries for discerning Melbourne homeowners. Premium landscape design, construction, and garden craftsmanship.",
  metadataBase: new URL("https://lurraprojects.com.au"),
  openGraph: {
    title: "Lurra Projects | Premium Melbourne Landscaping",
    description:
      "Where architecture and nature meet. Premium residential landscaping in Melbourne.",
    url: "https://lurraprojects.com.au",
    siteName: "Lurra Projects",
    locale: "en_AU",
    type: "website",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LandscapingBusiness",
  name: "Lurra Projects",
  url: "https://lurraprojects.com.au",
  email: "Lachie@lurraprojects.com.au",
  telephone: "+61400810107",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mentone",
    addressRegion: "VIC",
    postalCode: "3194",
    addressCountry: "AU",
  },
  areaServed: "Melbourne, Victoria",
  description:
    "Premium residential landscape design and construction for Melbourne homeowners who value exceptional experience and flawless execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/lurra-logo-original.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-lurra-charcoal antialiased">{children}</body>
    </html>
  );
}