import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUp,
  Check,
  X,
  Search,
  Settings,
  Plus,
  Minus,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Heart,
  Star,
  Bell,
  Mail,
  Phone,
  MessageSquare,
  User,
  Users,
  Home,
  Briefcase,
  Calendar,
  Clock,
  Globe,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { MetaLabel } from "@/components/brand/meta";

export const metadata: Metadata = {
  title: "Iconography — SINAPSE Visual",
  description: "Iconografia em contexto · sizes · alignment · custom glyphs.",
};

const ICONS: { I: LucideIcon; n: string }[] = [
  { I: ArrowRight, n: "ArrowRight" }, { I: ArrowUp, n: "ArrowUp" },
  { I: Check, n: "Check" }, { I: X, n: "X" },
  { I: Search, n: "Search" }, { I: Settings, n: "Settings" },
  { I: Plus, n: "Plus" }, { I: Minus, n: "Minus" },
  { I: ChevronDown, n: "ChevronDown" }, { I: ChevronRight, n: "ChevronRight" },
  { I: Eye, n: "Eye" }, { I: EyeOff, n: "EyeOff" },
  { I: Lock, n: "Lock" }, { I: Unlock, n: "Unlock" },
  { I: Heart, n: "Heart" }, { I: Star, n: "Star" },
  { I: Bell, n: "Bell" }, { I: Mail, n: "Mail" },
  { I: Phone, n: "Phone" }, { I: MessageSquare, n: "MessageSquare" },
  { I: User, n: "User" }, { I: Users, n: "Users" },
  { I: Home, n: "Home" }, { I: Briefcase, n: "Briefcase" },
  { I: Calendar, n: "Calendar" }, { I: Clock, n: "Clock" },
  { I: Globe, n: "Globe" }, { I: Zap, n: "Zap" },
];

const CUSTOM_GLYPHS = [
  { g: "//", n: "Eyebrow prefix" },
  { g: "→", n: "Arrow simple" },
  { g: "✦", n: "Star highlight" },
  { g: "_", n: "Cursor underscore" },
  { g: "●", n: "Bullet dot" },
  { g: "△", n: "Triangle marker" },
  { g: "⁂", n: "Asterism" },
  { g: "✕", n: "Close X" },
  { g: "+", n: "Plus combine" },
  { g: "⌕", n: "Switch swap" },
];

export default function Iconography() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section="Visual · Iconography"
        number="V.5"
        title="Ícones em contexto."
        emphasis="Lucide + custom glyphs."
        subtitle="Stroke 2px · 4 sizes canônicos (16/24/32/48) · alinhamento óptico · custom glyphs SINAPSE."
        tokens="28 + 10"
      />

      {/* Sizes canônicos */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="01" l="Sizes canônicos · stroke 2px" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
            {[16, 24, 32, 48].map((s) => (
              <div key={s} className="bg-background p-6 md:p-8 flex flex-col items-center gap-4">
                <div className="flex-1 flex items-center justify-center">
                  <ArrowRight size={s} strokeWidth={2} />
                </div>
                <div className="text-center">
                  <div className="font-mono text-[11px] tracking-[0.22em]">{s}px</div>
                  <div className="font-mono text-[10px] opacity-50">{s === 16 ? "inline" : s === 24 ? "default" : s === 32 ? "card" : "hero"}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Lucide grid */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="02" l="Lucide grid · 28 essenciais" />
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-px bg-border border border-border">
            {ICONS.map(({ I, n }) => (
              <div key={n} className="bg-background aspect-square flex items-center justify-center group/i hover:bg-foreground hover:text-background transition-colors duration-base ease-smooth" title={n}>
                <I size={20} strokeWidth={2} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Custom glyphs */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="03" l="Custom glyphs · texto puro" />
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-border border border-border">
            {CUSTOM_GLYPHS.map((g) => (
              <div key={g.n} className="bg-background p-6 flex flex-col items-center justify-center gap-3 aspect-square">
                <div className="font-display text-3xl md:text-4xl">{g.g}</div>
                <div className="font-mono text-[10px] tracking-[0.22em] opacity-60 uppercase text-center">{g.n}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Color contexts */}
      <section className="border-b border-border bg-muted">
        <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
          <SectionHeading n="04" l="Color contexts" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-background border border-border p-6 flex items-center justify-center gap-4">
              <ArrowRight size={32} className="opacity-100" />
              <ArrowRight size={32} className="opacity-65" />
              <ArrowRight size={32} className="opacity-30" />
            </div>
            <div className="bg-foreground text-background border border-border p-6 flex items-center justify-center gap-4">
              <ArrowRight size={32} />
              <ArrowRight size={32} className="opacity-65" />
              <ArrowRight size={32} className="opacity-30" />
            </div>
            <div className="bg-card border border-border p-6 flex items-center justify-center gap-4">
              <ArrowRight size={32} className="text-destructive" />
              <ArrowRight size={32} className="text-success" />
              <ArrowRight size={32} className="text-foreground" />
            </div>
          </div>
        </Container>
      </section>

      <NextSectionAuto current="V.5" />
      <Footer />
    </main>
  );
}

function SectionHeading({ n, l }: { n: string; l: string }) {
  return (
    <div className="mb-8 md:mb-10">
      <MetaLabel>[{n}] / {l}</MetaLabel>
    </div>
  );
}
