import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";
import { SmartScroll } from "@/components/brand/smart-scroll";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SINAPSE — Brand Source of Truth",
  description: "Escale sua operação sem aumentar sua folha.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      data-theme="bone"
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="grain-overlay" suppressHydrationWarning>
        <SmartScroll />
        {children}
      </body>
    </html>
  );
}
