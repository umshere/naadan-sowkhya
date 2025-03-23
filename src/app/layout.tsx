import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/typography.css";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import AnimationProvider from "@/components/layout/AnimationProvider";

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
  description: "NAADAN SOWKHYA products are free from preservatives and artificial colours or chemicals that may be harmful to human health. We offer natural hair care, food products, cosmetics, and herbal products.",
  keywords: "Naadan Sowkhya, natural products, organic products, herbal products, cosmetics, food products, hair care",
  authors: [{ name: "Ahmed Bin Hamza" }],
  creator: "Naadan Sowkhya",
  publisher: "Naadan Sowkhya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pt-[110px]"> {/* Add padding-top to account for fixed header */}
          <AnimationProvider>
            {children}
          </AnimationProvider>
          </main>
          <Footer />
          <FloatingButtons />
        </div>
      </body>
    </html>
  );
}
