import type { Metadata } from 'next';
import { SymbolStudy } from '@/components/si-v2/symbol-study';
export const metadata:Metadata={title:'Origem do traço — SINAPSE SI',description:'O vetor original, sua proporção, seus terminais e retornos. Estudo de uso isolado do S, com a decisão do símbolo aberta.'};
export default function Page(){return <SymbolStudy/>;}
