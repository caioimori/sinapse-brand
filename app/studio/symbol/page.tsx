import type { Metadata } from 'next';
import { BrandShell } from '@/components/si-v2/shell';
import { CircleIdentity } from '@/components/si-v2/visual-book';
export const metadata:Metadata={title:'S circular — SINAPSE SI',description:'A versão circular fina do símbolo original e seus materiais.'};
export default function Page(){return <BrandShell><CircleIdentity/></BrandShell>;}
