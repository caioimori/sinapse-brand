import { LpNav } from "@/components/lp/lp-nav";
import { LpHero } from "@/components/lp/lp-hero";
import { LpPricing } from "@/components/lp/lp-pricing";
import { LpFaq } from "@/components/lp/lp-faq";
import { LpFooter } from "@/components/lp/lp-footer";

export default function Page() {
  return (
    <main>
      <LpNav />
      <LpHero />
      <LpPricing />
      <LpFaq />
      <LpFooter />
    </main>
  );
}
