import type { Metadata } from "next";
import Link from "next/link";
import Barras from "@/components/dados/Barras";
import SubNav from "@/components/dados/SubNav";
import { compacto, numero } from "@/lib/dados/formatar";
import { fundosConcelho, fundosMunicipio, resumoFundos } from "@/lib/dados/transparencia";

export const metadata: Metadata = {
  title: "Fundos europeus",
  description: "Projetos do Portugal 2020 e do PRR com execução na Trofa.",
};

export default function Fundos() {
  const conc = resumoFundos(fundosConcelho);
  const mun = resumoFundos(fundosMunicipio);

  return (
    <>
      <SubNav atual="fundos" />
      <section className="border-b border-linha bg-suave">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-apagado">Transparência</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-tinta md:text-5xl">Fundos europeus</h1>
          <p className="mt-4 max-w-2xl text-lg text-texto">
            Dinheiro europeu com destino à Trofa, de dois programas: o Portugal 2020 (fundos de coesão, 2014–2020) e o
            PRR (Plano de Recuperação e Resiliência, 2021–2026).
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/dados/fundos-europeus/municipio" className="group flex flex-col rounded-2xl border border-linha p-7 transition hover:border-tinta">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-apagado">Projetos do Município</p>
            <p className="mt-3 text-5xl font-bold tabular-nums tracking-tight text-tinta">{compacto(mun.total, "€")}</p>
            <p className="mt-2 text-texto">em {numero(mun.n)} projetos</p>
            <p className="mt-4 text-sm text-apagado">A Câmara Municipal é a própria beneficiária: dinheiro público gerido diretamente pelo município.</p>
            <span className="mt-6 text-sm font-semibold text-tinta group-hover:underline">Ver os projetos →</span>
          </Link>
          <Link href="/dados/fundos-europeus/concelho" className="group flex flex-col rounded-2xl border border-linha p-7 transition hover:border-tinta">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-apagado">Projetos no Concelho</p>
            <p className="mt-3 text-5xl font-bold tabular-nums tracking-tight text-tinta">{compacto(conc.total, "€")}</p>
            <p className="mt-2 text-texto">em {numero(conc.n)} projetos</p>
            <p className="mt-4 text-sm text-apagado">Qualquer entidade (câmara, empresas, associações) com execução localizada neste território.</p>
            <span className="mt-6 text-sm font-semibold text-tinta group-hover:underline">Ver os projetos →</span>
          </Link>
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-2">
          <section aria-label="Por programa">
            <h2 className="text-lg font-bold text-tinta">Por programa (concelho)</h2>
            <div className="mt-4">
              <Barras
                titulo="Valor por programa"
                itens={conc.programas.map((p) => ({ rotulo: p.nome, valor: p.valor, texto: compacto(p.valor, "€"), extra: `${numero(p.n)} projetos` }))}
              />
            </div>
          </section>
          <section aria-label="Por estado">
            <h2 className="text-lg font-bold text-tinta">Por estado (concelho)</h2>
            <div className="mt-4">
              <Barras
                titulo="Valor por estado"
                itens={conc.estados.map((p) => ({ rotulo: p.nome, valor: p.valor, texto: compacto(p.valor, "€"), extra: `${numero(p.n)} projetos` }))}
              />
            </div>
          </section>
        </div>

        <section aria-label="Maiores projetos do município" className="mt-14">
          <h2 className="text-lg font-bold text-tinta">Maiores projetos do município</h2>
          <ul className="mt-4 divide-y divide-linha border-y border-linha">
            {mun.maiores.map((p) => (
              <li key={p.codigo_projeto} className="grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:gap-8">
                <div>
                  <p className="text-sm text-apagado">
                    {p.programa} · {p.estado}
                  </p>
                  <p className="mt-0.5 text-tinta">{p.titulo.length > 180 ? p.titulo.slice(0, p.titulo.lastIndexOf(" ", 180)) + "…" : p.titulo}</p>
                </div>
                <p className="font-semibold tabular-nums text-tinta sm:text-right">{compacto(p.valor_aprovado_municipio, "€")}</p>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-12 text-sm text-apagado">
          Fonte: Portugal 2020 e PRR, através dos ficheiros oficiais de dados.gov.pt. O valor mostrado é o valor aprovado
          atribuível a este território (nos projetos que abrangem vários concelhos, só a parte que cabe à Trofa).
        </p>
      </div>
    </>
  );
}
