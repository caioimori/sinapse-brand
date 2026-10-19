import type { Metadata } from 'next';
import { BrandShell } from '@/components/si-v2/shell';
import { CircleIdentity } from '@/components/si-v2/visual-book';
export const metadata:Metadata={title:'Símbolo — SINAPSE SI',description:'O S original com círculo ou em forma livre, seus materiais e arquivos.'};
export default function Page(){return <BrandShell><CircleIdentity/></BrandShell>;}
