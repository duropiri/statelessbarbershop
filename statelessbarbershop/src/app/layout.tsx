// RootLayout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/animations/SmoothScrolling";
import CustomCursor from "@/components/animations/CustomCursor";
import Header from "@/components/animations/NavigationMenu";
import { NavLinks } from "@/data/navLinks";
import Footer from "@/components/Footer";
import { SplashScreenProvider } from "@/contexts/SplashScreenContext";
import PageAnimatePresence from "@/components/HOC/PageAnimatePresence";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="hidden md:block z-[999]">
          <CustomCursor />
        </div>
        <SplashScreenProvider>
          {/* <Header navigation={NavLinks} /> */}
          <SmoothScrolling>
            <PageAnimatePresence>{children}</PageAnimatePresence>
          </SmoothScrolling>
          {/* <Footer /> */}
        </SplashScreenProvider>
      </body>
    </html>
  );
}
