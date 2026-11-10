import type { Metadata } from "next";
import Barras from "@/components/dados/Barras";
import TabelaContratos from "@/components/dados/TabelaContratos";
import { compacto, numero } from "@/lib/dados/formatar";
import { resumoContratos, separarEmpresa } from "@/lib/dados/transparencia";

export const metadata: Metadata = {
  title: "Contratos públicos",
  description: "Contratos públicos celebrados pelo município da Trofa, a partir do Portal BASE.",
};

export default function Contratos() {
  const r = resumoContratos();
  const maxAno = Math.max(...r.anos.map((a) => a.valor));

  return (
    <>
      <section className="border-b border-linha bg-suave">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-apagado">Transparência</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-tinta md:text-5xl">Contratos públicos</h1>
          <p className="mt-4 max-w-2xl text-lg text-texto">
            Os contratos celebrados pelo município da Trofa, tal como estão no Portal BASE (dados.gov.pt / IMPIC).
          </p>
          <dl className="mt-8 grid max-w-xl grid-cols-2 gap-8">
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Contratos</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{numero(r.n)}</dd>
            </div>
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Valor total</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{compacto(r.total, "€")}</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-3">
          <section aria-label="Por ano">
            <h2 className="text-lg font-bold text-tinta">Por ano</h2>
            <ul className="mt-4 space-y-3">
              {r.anos.map((a) => (
                <li key={a.ano}>
                  <div className="flex items-baseline justify-between gap-4 text-sm">
                    <span className="font-medium text-tinta">{a.ano}</span>
                    <span className="tabular-nums text-texto">
                      {compacto(a.valor, "€")}
                      <span className="ml-2 text-apagado">{numero(a.n)} contratos</span>
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-linha">
                    <div className="h-full rounded-full bg-tinta" style={{ width: `${(a.valor / maxAno) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="Por tipo de procedimento">
            <h2 className="text-lg font-bold text-tinta">Por tipo de procedimento</h2>
            <div className="mt-4">
              <Barras
                titulo="Valor por tipo de procedimento"
                itens={r.procedimentos.map((p) => ({
                  rotulo: p.nome,
                  valor: p.valor,
                  texto: compacto(p.valor, "€"),
                  extra: `${numero(p.n)}`,
                }))}
              />
            </div>
          </section>

          <section aria-label="Maiores adjudicatários">
            <h2 className="text-lg font-bold text-tinta">Maiores valores por empresa</h2>
            <div className="mt-4">
              <Barras
                titulo="Valor por empresa"
                itens={r.empresas.map((e) => ({
                  rotulo: separarEmpresa(e.nome).nome,
                  valor: e.valor,
                  texto: compacto(e.valor, "€"),
                  extra: `${numero(e.n)}`,
                }))}
              />
            </div>
          </section>
        </div>

        <section aria-label="Todos os contratos" className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-tinta">Todos os contratos</h2>
          <p className="mt-2 mb-6 text-texto">Pesquisa, filtra e ordena. Clica num contrato para ver os detalhes.</p>
          <TabelaContratos />
        </section>

        <p className="mt-12 text-sm text-apagado">
          Fonte: IMPIC / Portal BASE, através de dados.gov.pt. Os valores são os valores contratuais, sem IVA. O número a
          seguir a cada empresa ou procedimento é o número de contratos.
        </p>
      </div>
    </>
  );
}
