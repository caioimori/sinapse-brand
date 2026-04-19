import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Container } from "@/components/brand/container";
import { Nav } from "@/components/brand/nav";
import { Footer } from "@/components/brand/footer";
import { NextSectionAuto } from "@/components/brand/next-section-auto";
import { PageHeader } from "@/components/brand/page-header";
import { getDoc, listDocs } from "@/lib/content";

export async function generateStaticParams() {
  return listDocs("brandbook").map((d) => ({ slug: d.slug }));
}

export default async function BrandbookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc("brandbook", slug);
  if (!doc) return notFound();

  const number = slug.split("-")[0] ?? "00";
  const sectionLabel = slug
    .split("-")
    .slice(1)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Nav />
      <PageHeader
        section={`Brandbook · ${sectionLabel}`}
        number={number}
        title={doc.meta.title}
        subtitle={doc.meta.description}
      />

      <section className="border-b border-border">
        <Container size="narrow" className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="prose-sinapse space-y-6 leading-relaxed">
            <MDXRemote source={doc.source} />
          </div>
        </Container>
      </section>

      <NextSectionAuto current={number} />
      <Footer />
    </main>
  );
}
