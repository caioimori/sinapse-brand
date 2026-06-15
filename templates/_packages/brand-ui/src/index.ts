// ─── Utilitários ─────────────────────────────────────────────────────────────
export { cn } from "./lib/cn";

// ─── Primitivos ───────────────────────────────────────────────────────────────
export { Button, buttonVariants } from "./Button";
export type { ButtonProps } from "./Button";

export { Card } from "./Card";
export type { CardProps } from "./Card";

export { MetricCard } from "./MetricCard";
export type { MetricCardProps } from "./MetricCard";

export { Badge, badgeVariants } from "./Badge";
export type { BadgeProps } from "./Badge";

export { StatusPill, STATUS_MAP } from "./StatusPill";
export type { StatusPillProps, StatusDef, StatusIntensity } from "./StatusPill";

export { Input, Label, FormField } from "./Input";
export type { InputProps, LabelProps, FormFieldProps } from "./Input";

export { Skeleton } from "./Skeleton";
export type { SkeletonProps } from "./Skeleton";

// ─── Layout ───────────────────────────────────────────────────────────────────
export { Container } from "./Container";
export type { ContainerProps } from "./Container";

export { Eyebrow } from "./Eyebrow";
export type { EyebrowProps } from "./Eyebrow";

export { SectionHeader } from "./SectionHeader";
export type { SectionHeaderProps } from "./SectionHeader";

// ─── Blocos compostos ─────────────────────────────────────────────────────────
export { Nav } from "./Nav";
export type { NavProps, NavLink } from "./Nav";

export { Hero } from "./Hero";
export type { HeroProps, HeroCta } from "./Hero";

export { PricingCard } from "./PricingCard";
export type { PricingCardProps, PricingPlan } from "./PricingCard";

export { FaqAccordion } from "./FaqAccordion";
export type { FaqAccordionProps, FaqItem } from "./FaqAccordion";

export { Footer } from "./Footer";
export type { FooterProps, FooterColumn, FooterLink, SocialLink } from "./Footer";

export { DashboardTable } from "./DashboardTable";
export type { DashboardTableProps, Column } from "./DashboardTable";

// ─── Shell ────────────────────────────────────────────────────────────────────
export { AppShell } from "./AppShell";
export type {
  AppShellProps,
  AppShellOrg,
  AppShellMember,
  NavItem,
} from "./AppShell";

export { Modal } from "./Modal";
export type { ModalProps } from "./Modal";
