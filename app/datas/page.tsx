import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { comemoracoes } from "@/lib/comemoracoes";
import { diaDoConcelho, MESES, proximaVez, vinteCincoNovembro, type DataAnual } from "@/lib/datasAnuais";
import { festas } from "@/lib/festas";

// Calendário das datas que celebramos, a começar em hoje (os próximos 12 meses).
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Datas que celebramos — Iniciativa Liberal Trofa",
  description: "O calendário das datas que a IL Trofa assinala ao longo do ano: datas nacionais, da Trofa, do partido e as festas das freguesias.",
};

type Linha = { data: DataAnual; titulo: string; festa?: string };

export default function Datas() {
  const linhas: Linha[] = [
    { data: diaDoConcelho, titulo: diaDoConcelho.titulo },
    { data: vinteCincoNovembro, titulo: vinteCincoNovembro.titulo },
    ...comemoracoes.map((c) => ({ data: c.data, titulo: c.data.titulo })),
    ...festas.map((f) => ({ data: f.data, titulo: f.nome, festa: f.freguesia })),
  ];
  const ordenadas = linhas.map((l) => ({ ...l, p: proximaVez(l.data) })).sort((a, b) => a.p.dias - b.p.dias);

  // Agrupar por mês (com o ano, porque o calendário passa de um ano para o outro).
  const meses: { chave: string; nome: string; itens: typeof ordenadas }[] = [];
  for (const l of ordenadas) {
    const chave = `${l.p.ano}-${l.p.mes}`;
    let m = meses.find((x) => x.chave === chave);
    if (!m) meses.push((m = { chave, nome: `${MESES[l.p.mes - 1].replace(/^./, (x) => x.toUpperCase())} de ${l.p.ano}`, itens: [] }));
    m.itens.push(l);
  }

  return (
    <>
      <PageHero eyebrow="Ao longo do ano" title="Datas que celebramos">
        <p>As datas nacionais, as da Trofa, as do partido e as festas das freguesias, a começar em hoje.</p>
      </PageHero>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <div className="space-y-10">
          {meses.map((m) => (
            <div key={m.chave}>
              <h2 className="font-display text-2xl font-bold text-navy">{m.nome}</h2>
              <ul className="mt-4 divide-y divide-mist rounded-2xl bg-white shadow-sm ring-1 ring-navy/10">
                {m.itens.map((l) => (
                  <li key={l.data.slug}>
                    <Link href={l.data.slug} className="flex items-baseline gap-4 px-5 py-4 transition hover:bg-mist">
                      <span className="font-display w-10 shrink-0 text-2xl font-bold text-pink">{l.p.dia}</span>
                      <span>
                        <span className="font-bold text-navy">{l.titulo}</span>
                        {l.festa && <span className="block text-sm text-ink/70">Festa · {l.festa}</span>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-ink/70">
          As festas e as datas que mudam de ano para ano (como a Feira de Março) são calculadas sozinhas. Confirma as
          festas no programa da comissão de festas.
        </p>
      </section>
    </>
  );
}
