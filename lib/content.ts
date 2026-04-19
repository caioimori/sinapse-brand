import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type ContentMeta = {
  title: string;
  description?: string;
  status?: string;
  [key: string]: unknown;
};

export type ContentDoc = {
  slug: string;
  meta: ContentMeta;
  source: string;
};

export function getDoc(section: string, slug: string): ContentDoc | null {
  const file = path.join(CONTENT_ROOT, section, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { slug, meta: data as ContentMeta, source: content };
}

export function listDocs(section: string): ContentDoc[] {
  const dir = path.join(CONTENT_ROOT, section);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "");
      return getDoc(section, slug)!;
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
}
