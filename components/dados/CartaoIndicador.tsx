import Link from "next/link";
import Minigrafico from "./Minigrafico";
import { ROTULO_GRUPO } from "@/lib/dados/rotulos";

export type Sinal = "sobe" | "desce" | "igual";
export type Cartao = {
  slug: string;
  titulo: string;
  tema: string;
  valor: string;
  legenda: string;
  periodo: string;
  variacao: string | null;
  sinal: Sinal | null;
  // período com que se compara a variação ("2024"); null se não há valor anterior
  desde: string | null;
  pontos: (number | null)[];
  grupo?: (number | null)[];
  mesmaEscala?: boolean;
  // Comparação do último ano: o valor de cada coluna (taxas, por habitante, medianas: com barra) ou a variação de cada
  // uma (totais: só a seta e o número, sem barra, porque subir e descer não se medem na mesma barra).
  comparacao?: { nome: string; texto: string; sinal: Sinal | null; trofa: boolean; fracao: number | null }[];
  // texto onde se pesquisa (título, tema, unidade, explicação e palavras do dia a dia), já sem acentos
  procura: string;
};

const SETA = { sobe: "▲", desce: "▼", igual: "＝" } as const;
const DITO = { sobe: "subiu", desce: "desceu", igual: "ficou igual" } as const;

// Seta da variação: o desenho é escondido aos leitores de ecrã, que ouvem "subiu", "desceu" ou "ficou igual".
export function Seta({ sinal }: { sinal: Sinal }) {
  return (
    <>
      <span aria-hidden>{SETA[sinal]}</span>
      <span className="sr-only">{DITO[sinal]}</span>
    </>
  );
}

export default function CartaoIndicador({ i, mostrarTema = false }: { i: Cartao; mostrarTema?: boolean }) {
  return (
    <Link
      href={`/dados/indicadores/${i.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-linha bg-fundo p-5 transition hover:border-trofa hover:shadow-md"
    >
      {mostrarTema && <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-apagado">{i.tema}</p>}
      <h3 className="text-sm font-semibold leading-snug text-tinta">{i.titulo}</h3>
      <p className="mt-0.5 text-xs text-apagado">
        {i.legenda ? `${i.legenda} · ` : ""}
        {i.periodo}
      </p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <p className="text-3xl font-bold tabular-nums tracking-tight text-trofa">{i.valor}</p>
        <Minigrafico pontos={i.pontos} grupo={i.grupo} mesmaEscala={i.mesmaEscala} />
      </div>
      {i.variacao && i.sinal && (
        <p className="mt-1 text-sm font-medium tabular-nums text-texto">
          <Seta sinal={i.sinal} /> {i.variacao}
          {i.desde ? ` face a ${i.desde}` : ""}
        </p>
      )}
      {i.comparacao && i.comparacao.length > 1 && (
        <ul className="mt-3 grid gap-1.5 border-t border-dashed border-linha pt-3 text-xs text-texto">
          {i.comparacao.map((c) => (
            <li key={c.nome} className="grid grid-cols-[7rem_1fr_auto] items-center gap-2">
              <span className={c.trofa ? "font-semibold text-tinta" : ""}>{c.nome}</span>
              {c.fracao !== null ? (
                <span className="h-2 rounded-full bg-[#eeedf3]">
                  <span
                    className="block h-2 rounded-full"
                    style={{ width: `${Math.max(4, c.fracao * 100)}%`, background: c.trofa ? "var(--trofa)" : c.nome === ROTULO_GRUPO ? "var(--cmp)" : "var(--cmp-2)" }}
                  />
                </span>
              ) : (
                <span />
              )}
              <span className="min-w-[4.5rem] whitespace-nowrap text-right font-semibold tabular-nums text-tinta">
                {c.sinal && <Seta sinal={c.sinal} />} {c.texto}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}
