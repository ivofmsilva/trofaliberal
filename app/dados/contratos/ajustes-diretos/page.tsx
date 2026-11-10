import type { Metadata } from "next";
import Link from "next/link";
import Barras from "@/components/dados/Barras";
import { compacto, numero } from "@/lib/dados/formatar";
import { contratos, resumoAjustes } from "@/lib/dados/transparencia";

export const metadata: Metadata = {
  title: "Ajustes diretos",
  description: "Quanto, em quê e a quem a Câmara da Trofa adjudica por ajuste direto.",
};

const pct = (a: number, b: number) => (b === 0 ? "—" : `${numero((a / b) * 100, 0)}%`);

export default function AjustesDiretos() {
  const r = resumoAjustes();
  const valores = contratos.filter((c) => c.tipoprocedimento === "Ajuste Direto Regime Geral").map((c) => c.valor_contratual).sort((a, b) => a - b);
  const mediana = valores[Math.floor(valores.length / 2)] ?? 0;

  return (
    <>
      <section className="border-b border-linha bg-suave">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <Link href="/dados/contratos" className="text-sm text-apagado hover:text-tinta hover:underline">
            ← Contratos públicos
          </Link>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-tinta md:text-5xl">Ajustes diretos</h1>
          <p className="mt-4 max-w-2xl text-lg text-texto">
            No ajuste direto a Câmara convida diretamente a entidade à sua escolha, sem concurso aberto. Aqui está quanto
            pesa, em quê e a quem, sem comentários.
          </p>
          <dl className="mt-8 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Ajustes diretos</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{numero(r.nAD)}</dd>
              <dd className="text-sm text-apagado">{pct(r.nAD, r.n)} dos contratos</dd>
            </div>
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Valor</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{compacto(r.adValor, "€")}</dd>
              <dd className="text-sm text-apagado">{pct(r.adValor, r.totalValor)} do valor total</dd>
            </div>
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Valor mediano</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{numero(mediana)}&nbsp;€</dd>
              <dd className="text-sm text-apagado">metade vale menos</dd>
            </div>
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Entidades diferentes</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{numero(r.entidades)}</dd>
              <dd className="text-sm text-apagado">receberam ajustes diretos</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:px-6">
        <section aria-label="Por ano">
          <h2 className="text-2xl font-bold tracking-tight text-tinta">Ano a ano</h2>
          <p className="mt-2 max-w-2xl text-texto">Quanto dos contratos e do dinheiro de cada ano foi por ajuste direto.</p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-linha">
            <table className="w-full text-sm">
              <thead className="bg-suave text-left text-apagado">
                <tr>
                  <th className="px-4 py-3 font-medium">Ano</th>
                  <th className="px-4 py-3 text-right font-medium">Contratos</th>
                  <th className="px-4 py-3 text-right font-medium">Ajustes diretos</th>
                  <th className="px-4 py-3 text-right font-medium">% dos contratos</th>
                  <th className="px-4 py-3 text-right font-medium">Valor em ajustes</th>
                  <th className="px-4 py-3 text-right font-medium">% do valor</th>
                </tr>
              </thead>
              <tbody>
                {r.anos.map((a) => (
                  <tr key={a.ano} className="border-t border-linha tabular-nums">
                    <th scope="row" className="px-4 py-2.5 text-left font-semibold text-tinta">
                      {a.ano}
                    </th>
                    <td className="px-4 py-2.5 text-right">{numero(a.n)}</td>
                    <td className="px-4 py-2.5 text-right">{numero(a.nAD)}</td>
                    <td className="px-4 py-2.5 text-right font-semibold text-tinta">{pct(a.nAD, a.n)}</td>
                    <td className="px-4 py-2.5 text-right">{compacto(a.valorAD, "€")}</td>
                    <td className="px-4 py-2.5 text-right font-semibold text-tinta">{pct(a.valorAD, a.valor)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-apagado">2026 ainda não acabou.</p>
        </section>

        <section aria-label="Por área">
          <h2 className="text-2xl font-bold tracking-tight text-tinta">Em que áreas</h2>
          <p className="mt-2 max-w-2xl text-texto">
            A área vem do código CPV, o vocabulário europeu do que se compra. A última coluna diz quantos dos contratos de
            cada área foram ajustes diretos.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-linha">
            <table className="w-full text-sm">
              <thead className="bg-suave text-left text-apagado">
                <tr>
                  <th className="px-4 py-3 font-medium">Área</th>
                  <th className="px-4 py-3 text-right font-medium">Ajustes diretos</th>
                  <th className="px-4 py-3 text-right font-medium">Valor</th>
                  <th className="px-4 py-3 text-right font-medium">Contratos da área</th>
                  <th className="px-4 py-3 text-right font-medium">% por ajuste direto</th>
                </tr>
              </thead>
              <tbody>
                {r.areas.map((a) => (
                  <tr key={a.nome} className="border-t border-linha tabular-nums">
                    <th scope="row" className="px-4 py-2.5 text-left font-medium text-tinta">
                      {a.nome}
                    </th>
                    <td className="px-4 py-2.5 text-right">{numero(a.nAD)}</td>
                    <td className="px-4 py-2.5 text-right">{compacto(a.valorAD, "€")}</td>
                    <td className="px-4 py-2.5 text-right">{numero(a.n)}</td>
                    <td className="px-4 py-2.5 text-right font-semibold text-tinta">{pct(a.nAD, a.n)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="grid gap-14 lg:grid-cols-2">
          <section aria-label="Por valor">
            <h2 className="text-2xl font-bold tracking-tight text-tinta">Quanto vale cada um</h2>
            <p className="mt-2 mb-5 text-texto">Quantos ajustes diretos há em cada escalão de valor.</p>
            <Barras
              titulo="Ajustes diretos por escalão de valor"
              itens={r.escaloes.map((e) => ({ rotulo: e.nome, valor: e.n, texto: numero(e.n), extra: compacto(e.valor, "€") }))}
            />
          </section>
          <section aria-label="Por tipo de contrato">
            <h2 className="text-2xl font-bold tracking-tight text-tinta">O que se contrata</h2>
            <p className="mt-2 mb-5 text-texto">Tipo de contrato dos ajustes diretos.</p>
            <Barras
              titulo="Ajustes diretos por tipo de contrato"
              itens={r.porTipo.slice(0, 6).map((t) => ({ rotulo: t.nome, valor: t.n, texto: numero(t.n), extra: compacto(t.valor, "€") }))}
            />
          </section>
        </div>

        <div className="grid gap-14 lg:grid-cols-2">
          <section aria-label="Fundamentação legal">
            <h2 className="text-2xl font-bold tracking-tight text-tinta">Fundamentação legal</h2>
            <p className="mt-2 mb-5 text-texto">
              O artigo do Código dos Contratos Públicos que a Câmara indicou para escolher o ajuste direto.
            </p>
            <Barras
              titulo="Ajustes diretos por fundamentação legal"
              itens={r.fund.slice(0, 8).map((t) => ({ rotulo: t.nome, valor: t.n, texto: numero(t.n), extra: compacto(t.valor, "€") }))}
            />
            <p className="mt-4 text-sm text-apagado">
              Em {numero(r.materiais)} ajustes a Câmara assinalou que se aplicam critérios materiais (a natureza do
              contrato) e não o valor.
            </p>
          </section>
          <section aria-label="Motivo indicado">
            <h2 className="text-2xl font-bold tracking-tight text-tinta">Motivo indicado</h2>
            <p className="mt-2 mb-5 text-texto">O campo “fundamento do ajuste direto”, tal como está no Portal BASE.</p>
            <Barras
              titulo="Ajustes diretos por motivo indicado"
              itens={r.motivo.slice(0, 6).map((t) => ({ rotulo: t.nome, valor: t.n, texto: numero(t.n), extra: compacto(t.valor, "€") }))}
            />
          </section>
        </div>

        <section aria-label="Empresas">
          <h2 className="text-2xl font-bold tracking-tight text-tinta">Quem recebe mais ajustes diretos</h2>
          <p className="mt-2 mb-5 max-w-2xl text-texto">As dez entidades com mais contratos por ajuste direto (e o valor total desses contratos).</p>
          <div className="max-w-3xl">
            <Barras
              titulo="Empresas com mais ajustes diretos"
              itens={r.empresas.map((t) => ({ rotulo: t.nome, valor: t.n, texto: `${numero(t.n)} contratos`, extra: compacto(t.valor, "€") }))}
            />
          </div>
        </section>

        <p className="max-w-3xl text-sm text-apagado">
          Fonte: Portal BASE (IMPIC), através de dados.gov.pt: contratos do Município da Trofa de 2021 a 2026. “Ajuste
          direto” é o procedimento “Ajuste Direto Regime Geral”. Os escalões de valor são só para agrupar, não são os
          limites da lei. Dois contratos não têm CPV e ficam em “Outras / sem classificação”.{" "}
          <Link href="/dados/contratos" className="underline underline-offset-2 hover:text-tinta">
            Ver todos os contratos
          </Link>
          .
        </p>
      </div>
    </>
  );
}
