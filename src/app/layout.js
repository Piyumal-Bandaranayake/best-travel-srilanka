import { Geist, Geist_Mono, Outfit } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ReviewButton from "@/components/layout/ReviewButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Best Travel Sri Lanka",
  description: "Experience the best of Sri Lanka with our curated trave packages.",
};

import { headers } from "next/headers";

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const isAdmin = headersList.get("x-is-admin") === "true";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased`}
      >
        {!isAdmin && <Navbar />}
        {children}
        {!isAdmin && <ReviewButton />}
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}
