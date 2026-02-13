import { Geist, Geist_Mono, Outfit } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ReviewButton from "@/components/layout/ReviewButton";
import "./globals.css";

import { constructMetadata, getTravelAgencySchema } from "@/lib/seo";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = constructMetadata();

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const isAdmin = headersList.get("x-is-admin") === "true";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getTravelAgencySchema()) }}
        />
        {!isAdmin && <Navbar />}
        {children}
        {!isAdmin && <ReviewButton />}
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}
