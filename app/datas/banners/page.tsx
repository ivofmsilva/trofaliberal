import type { Metadata } from "next";
import Link from "next/link";
import Banner25Novembro from "@/components/Banner25Novembro";
import { BannerComemoracao, BannerFesta, lugarDe } from "@/components/BannerComemoracao";
import BannerConcelho from "@/components/BannerConcelho";
import PageHero from "@/components/PageHero";
import { comemoracoes } from "@/lib/comemoracoes";
import { diaDoConcelho, MESES, proximaVez, somarDias, vinteCincoNovembro, type DataAnual } from "@/lib/datasAnuais";
import { festas, fotoDasFestas } from "@/lib/festas";

// Todos os banners das datas de uma vez, para rever (na página inicial cada um só aparece à volta do dia).
// Não está no menu nem no Google.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Banners das datas — Iniciativa Liberal Trofa",
  robots: { index: false, follow: false },
};

const dia = ([m, d]: [number, number]) => `${d} de ${MESES[m - 1]}`;

function quando(d: DataAnual) {
  const p = proximaVez(d);
  const [antes, depois] = d.janela ?? [0, 0];
  if (!antes && !depois) return `só a ${dia([p.mes, p.dia])} de ${p.ano}`;
  return `de ${dia(somarDias(p.ano, [p.mes, p.dia], -antes))} a ${dia(somarDias(p.ano, [p.mes, p.dia], depois))} de ${p.ano}`;
}

// O dia em que cada data vai acontecer, para mostrar o banner com os anos e a data certos.
const noDia = (d: DataAnual) => {
  const p = proximaVez(d);
  return new Date(Date.UTC(p.ano, p.mes - 1, p.dia, 12));
};

export default function Banners() {
  const todos = [
    { data: diaDoConcelho, titulo: "Dia do Concelho", banner: <BannerConcelho /> },
    { data: vinteCincoNovembro, titulo: "25 de Novembro", banner: <Banner25Novembro /> },
    ...comemoracoes.map((c) => ({ data: c.data as DataAnual, titulo: c.data.titulo, banner: <BannerComemoracao c={c} agora={noDia(c.data)} /> })),
    ...festas.map((f) => ({ data: f.data, titulo: `Festa: ${f.nome} (${lugarDe(f.freguesia)})`, banner: <BannerFesta f={f} imagem={fotoDasFestas} agora={noDia(f.data)} /> })),
  ].sort((a, b) => proximaVez(a.data).dias - proximaVez(b.data).dias);

  return (
    <>
      <PageHero eyebrow="Para rever" title="Banners das datas">
        <p>Na página inicial, cada banner só aparece à volta do seu dia. Aqui estão todos, pela ordem em que vão aparecer.</p>
      </PageHero>
      <div className="space-y-16 py-14">
        {todos.map((t) => (
          <div key={t.data.slug}>
            <p className="mx-auto mb-3 max-w-7xl px-4 text-sm text-ink/70 sm:px-6">
              <Link href={t.data.slug} className="font-bold text-navy hover:underline">
                {t.titulo}
              </Link>{" "}
              · aparece {quando(t.data)}
            </p>
            {t.banner}
          </div>
        ))}
      </div>
    </>
  );
}
