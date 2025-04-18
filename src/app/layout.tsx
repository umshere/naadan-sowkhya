import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/typography.css";
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
// import FloatingButtons from '@/components/layout/FloatingButtons'; // Removed unused import
import BottomNavigation from '@/components/layout/BottomNavigation';
import AnimationProvider from '@/components/layout/AnimationProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naadan Sowkhya Products - Natural Products, Cosmetics, Herbal Products",
  description:
    "NAADAN SOWKHYA products are free from preservatives and artificial colours or chemicals that may be harmful to human health. We offer natural hair care, food products, cosmetics, and herbal products.",
  keywords:
    "Naadan Sowkhya, natural products, organic products, herbal products, cosmetics, food products, hair care",
  openGraph: {
    title: "Naadan Sowkhya - 100% Natural Products",
    description:
      "Discover our range of natural hair care, food products, cosmetics, and herbal products.",
    url: "https://sowkhyaproducts.com",
    siteName: "Naadan Sowkhya",
    locale: "en_US",
    type: "website",
  },
  authors: [{ name: "Ahmed Bin Hamza" }],
  creator: "Naadan Sowkhya",
  publisher: "Naadan Sowkhya",
  icons: [
    { rel: "icon", url: "/images/brandname_white.png" },
    { rel: "apple-touch-icon", url: "/images/brandname_white.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="min-h-screen pt-[80px] sm:pt-[100px] pb-16 md:pb-0">
            <AnimationProvider>
              {children}
            </AnimationProvider>
          </main>
          <Footer />
          {/* <FloatingButtons /> */}
          <BottomNavigation />
        </div>
      </body>
    </html>
  );
}
