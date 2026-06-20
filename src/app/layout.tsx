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

const siteUrl = "https://lurraprojects.com.au";
const title = "Lurra Projects | Premium Landscape Design & Construction Melbourne";
const description =
  "Melbourne's premium residential landscaping studio. Bespoke garden design, precision construction, and an exceptional client journey — from Bayside courtyards to architect-led outdoor sanctuaries.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  keywords: [
    "premium landscaping Melbourne",
    "landscape design Melbourne",
    "residential garden construction",
    "Bayside landscaping",
    "Mentone landscaper",
    "outdoor sanctuary design",
    "high-end garden Melbourne",
    "landscape construction Victoria",
  ],
  authors: [{ name: "Lurra Projects", url: siteUrl }],
  creator: "Lurra Projects",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Lurra Projects",
    locale: "en_AU",
    type: "website",
    images: [{ url: "/lurra-logo-original.png", width: 512, height: 512, alt: "Lurra Projects" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/lurra-logo-original.png"],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    "@id": `${siteUrl}/#business`,
    name: "Lurra Projects",
    url: siteUrl,
    image: `${siteUrl}/lurra-logo-original.png`,
    email: "Lachie@lurraprojects.com.au",
    telephone: "+61400810107",
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mentone",
      addressLocality: "Mentone",
      addressRegion: "VIC",
      postalCode: "3194",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -37.983,
      longitude: 145.067,
    },
    areaServed: [
      { "@type": "City", name: "Melbourne" },
      { "@type": "AdministrativeArea", name: "Bayside, Victoria" },
    ],
    description:
      "Premium residential landscape design and construction for discerning Melbourne homeowners who value exceptional experience and flawless execution.",
    sameAs: ["https://github.com/constructionestimate/lurra-projects-website"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "Lurra Projects",
    description,
    inLanguage: "en-AU",
    publisher: { "@id": `${siteUrl}/#business` },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Premium residential landscape design and construction",
    provider: { "@id": `${siteUrl}/#business` },
    areaServed: "Melbourne, Victoria, Australia",
    description:
      "Bespoke landscape design, garden construction, planting, and outdoor sanctuary creation for premium Melbourne homes.",
  },
];

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-lurra-charcoal antialiased">{children}</body>
    </html>
  );
}