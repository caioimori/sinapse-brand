import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sora",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SINAPSE App",
  description: "Painel autenticado",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      data-theme="vanta"
      className={`${sora.variable} ${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
