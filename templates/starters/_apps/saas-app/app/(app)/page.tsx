import { MetricCard } from "@/components/brand/metric-card";
import { StatusPill } from "@/components/brand/status-pill";

export default function DashboardPage() {
  return (
    <div
      className="mx-auto px-[var(--container-pad)] py-10"
      style={{ width: "var(--container-default)" }}
    >
      <header className="mb-8">
        <p className="eyebrow">Visão geral</p>
        {/* H1 display 52-88px — fora da dead-zone */}
        <h1
          className="mt-2 font-display font-light tracking-[-0.035em]"
          style={{ fontSize: "var(--text-h1)", lineHeight: 0.92 }}
        >
          Painel
        </h1>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          eyebrow="Receita"
          value="R$ 84,2k"
          delta={{ value: "12%", positive: true }}
        />
        <MetricCard
          eyebrow="Leads"
          value="1.284"
          delta={{ value: "3%", positive: true }}
        />
        <MetricCard
          eyebrow="Churn"
          value="2,1%"
          delta={{ value: "0,4%", positive: false }}
        />
        <MetricCard
          eyebrow="MRR"
          value="R$ 31,9k"
          delta={{ value: "8%", positive: true }}
        />
      </section>

      <div className="mt-6 flex items-center gap-3">
        <StatusPill status="ok" />
        <StatusPill status="warn" />
        <StatusPill status="critical" />
      </div>
    </div>
  );
}
