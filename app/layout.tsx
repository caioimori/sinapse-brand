import type { Metadata } from "next";
import { Audiowide, Inter, JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";
import { SmartScroll } from "@/components/brand/smart-scroll";

// Sora (display) — canon rule 04: máx 2 pesos/tela; carrega só 300/400/500/600.
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600"],
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

// Audiowide — só wordmark/marca (canon §3). Peso único disponível: 400.
const audiowide = Audiowide({
  subsets: ["latin"],
  variable: "--font-wordmark",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "SINAPSE — Brand Source of Truth",
  description: "Escale sua operação sem aumentar sua folha.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      data-theme="vanta"
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} ${audiowide.variable}`}
      suppressHydrationWarning
    >
      <body className="grain-overlay" suppressHydrationWarning>
        <SmartScroll />
        {children}
      </body>
    </html>
  );
}
