import { LayoutDashboard, Users, GitPullRequest, Settings } from "lucide-react";

export const NAV = [
  { href: "/",         label: "Dashboard", Icon: LayoutDashboard },
  { href: "/leads",    label: "Leads",     Icon: Users },
  { href: "/pipeline", label: "Pipeline",  Icon: GitPullRequest },
  { href: "/settings", label: "Config",    Icon: Settings },
] as const;
