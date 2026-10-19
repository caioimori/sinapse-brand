import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { chapters } from '@/data/si/brand';
import { BrandChapter } from '@/components/si-v2/chapters';

export function generateStaticParams(){return chapters.map(c=>({chapter:c.slug}));}
export async function generateMetadata({params}:{params:Promise<{chapter:string}>}):Promise<Metadata>{const {chapter}=await params;const c=chapters.find(c=>c.slug===chapter);return {title:`${c?.title||'Brand System'} — SINAPSE SI`,description:c?.sub};}
export default async function Page({params}:{params:Promise<{chapter:string}>}){const {chapter}=await params;const c=chapters.find(c=>c.slug===chapter);if(!c)notFound();return <BrandChapter slug={c.slug} n={c.n}/>;}
