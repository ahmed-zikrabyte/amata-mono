import { Geist, Geist_Mono } from "next/font/google";

import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import Navbar from "../components/global/navbar";
import FooterSec from "../components/global/FooterSec";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased bg-[#A8A6A6]/10`}
      >
        <Providers>
          <Navbar />
          <div className="mt-20">{children}</div>

          <FooterSec />
        </Providers>
      </body>
    </html>
  );
}
