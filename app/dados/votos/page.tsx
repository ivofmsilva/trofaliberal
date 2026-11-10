import type { Metadata } from "next";
import Link from "next/link";
import { numero } from "@/lib/dados/formatar";
import { anosAssembleia, anosCamara, mandatosAssembleia, mandatosCamara, type LinhaAno } from "@/lib/dados/votos";

export const metadata: Metadata = {
  title: "Como votam",
  description: "Quantas decisões da Câmara e da Assembleia Municipal da Trofa são unânimes, e como votou cada lista nas que não foram.",
};

const pct = (a: number, b: number) => (b === 0 ? "—" : `${numero((a / b) * 100, 0)}%`);

function total(l: LinhaAno[]) {
  return l.reduce((a, x) => ({ votados: a.votados + x.votados, unanimes: a.unanimes + x.unanimes, maioria: a.maioria + x.maioria }), { votados: 0, unanimes: 0, maioria: 0 });
}

function Anos({ titulo, linhas }: { titulo: string; linhas: LinhaAno[] }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-tinta">{titulo}</h3>
      <div className="mt-3 overflow-x-auto rounded-xl border border-linha">
        <table className="w-full text-sm">
          <thead className="bg-suave text-left text-apagado">
            <tr>
              <th className="px-4 py-3 font-medium">Ano</th>
              <th className="px-4 py-3 text-right font-medium">Pontos votados</th>
              <th className="px-4 py-3 text-right font-medium">Por unanimidade</th>
              <th className="px-4 py-3 text-right font-medium">Por maioria</th>
            </tr>
          </thead>
          <tbody>
            {[...linhas].reverse().map((l) => (
              <tr key={l.ano} className="border-t border-linha tabular-nums">
                <th scope="row" className="px-4 py-2.5 text-left font-semibold text-tinta">
                  {l.ano}
                </th>
                <td className="px-4 py-2.5 text-right">{numero(l.votados)}</td>
                <td className="px-4 py-2.5 text-right">
                  {numero(l.unanimes)} <span className="text-apagado">({pct(l.unanimes, l.votados)})</span>
                </td>
                <td className="px-4 py-2.5 text-right">{numero(l.maioria)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type M = { id: string; nome: string; maioria: number; unanimes: number; tabela: { lista: string; favor: number; contra: number; abstencoes: number }[] };

function Mandatos({ titulo, mandatos }: { titulo: string; mandatos: M[] }) {
  return (
    <section aria-label={titulo}>
      <h3 className="text-xl font-bold text-tinta">{titulo}</h3>
      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        {mandatos.map((m) => (
          <div key={m.id}>
            <p className="font-semibold text-tinta">{m.nome}</p>
            <p className="mt-1 text-sm text-apagado">
              {numero(m.maioria)} votações por maioria · {numero(m.unanimes)} por unanimidade
            </p>
            {m.tabela.length === 0 ? (
              <p className="mt-3 text-sm text-apagado">Ainda não há votações por maioria registadas.</p>
            ) : (
              <div className="mt-3 overflow-x-auto rounded-xl border border-linha">
                <table className="w-full text-sm">
                  <thead className="bg-suave text-left text-apagado">
                    <tr>
                      <th className="px-4 py-2.5 font-medium">Lista</th>
                      <th className="px-4 py-2.5 text-right font-medium">A favor</th>
                      <th className="px-4 py-2.5 text-right font-medium">Contra</th>
                      <th className="px-4 py-2.5 text-right font-medium">Abstenção</th>
                    </tr>
                  </thead>
                  <tbody>
                    {m.tabela.map((l) => (
                      <tr key={l.lista} className="border-t border-linha tabular-nums">
                        <th scope="row" className="px-4 py-2 text-left font-medium text-tinta">
                          {l.lista === "CH" ? "Chega" : l.lista}
                        </th>
                        <td className="px-4 py-2 text-right">{numero(l.favor)}</td>
                        <td className="px-4 py-2 text-right">{numero(l.contra)}</td>
                        <td className="px-4 py-2 text-right">{numero(l.abstencoes)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Votos() {
  const a = total(anosAssembleia);
  const c = total(anosCamara);

  return (
    <>
      <section className="border-b border-linha bg-suave">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-apagado">Autarquia</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-tinta md:text-5xl">Como votam</h1>
          <p className="mt-4 max-w-2xl text-lg text-texto">
            Quantas decisões da Câmara e da Assembleia Municipal são tomadas por unanimidade e, nas que não são, como
            votou cada lista. Contado a partir das deliberações publicadas, sem comentários.
          </p>
          <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-8">
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Câmara, por unanimidade</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{pct(c.unanimes, c.votados)}</dd>
              <dd className="text-sm text-apagado">de {numero(c.votados)} pontos votados desde {anosCamara[0]?.ano}</dd>
            </div>
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Assembleia, por unanimidade</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{pct(a.unanimes, a.votados)}</dd>
              <dd className="text-sm text-apagado">de {numero(a.votados)} pontos votados desde {anosAssembleia[0]?.ano}</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:px-6">
        <section aria-label="Ano a ano">
          <h2 className="text-2xl font-bold tracking-tight text-tinta">Ano a ano</h2>
          <p className="mt-2 mb-6 max-w-2xl text-texto">
            Só entram os pontos que foram a votos (os que a Câmara ou a Assembleia apenas tomaram conhecimento não contam).
          </p>
          <div className="grid gap-10 lg:grid-cols-2">
            <Anos titulo="Câmara Municipal" linhas={anosCamara} />
            <Anos titulo="Assembleia Municipal" linhas={anosAssembleia} />
          </div>
          <p className="mt-3 text-sm text-apagado">Os PDF digitalizados da Câmara (sem texto) ficam de fora, sobretudo 2017 e 2018.</p>
        </section>

        <section aria-label="Quem vota o quê">
          <h2 className="text-2xl font-bold tracking-tight text-tinta">Nas votações por maioria</h2>
          <p className="mt-2 mb-8 max-w-3xl text-texto">
            Quantas vezes cada lista votou a favor, contra ou se absteve nas votações que não foram unânimes. Uma lista
            conta em dois sentidos numa votação quando os seus membros se dividiram. Na Câmara a lista conta uma vez por
            sentido, qualquer que seja o número de vereadores.
          </p>
          <div className="space-y-12">
            <Mandatos titulo="Câmara Municipal" mandatos={mandatosCamara} />
            <Mandatos titulo="Assembleia Municipal" mandatos={mandatosAssembleia} />
          </div>
        </section>

        <p className="max-w-3xl text-sm text-apagado">
          Fonte: deliberações da Câmara e da Assembleia Municipal (mun-trofa.pt). Só entram as votações em que o documento
          diz como votou cada lista; nas eleições e designações por escrutínio secreto não há votos por lista. Para ver cada
          votação, abre a{" "}
          <Link href="/dados/camara" className="underline underline-offset-2 hover:text-tinta">
            Câmara
          </Link>{" "}
          ou a{" "}
          <Link href="/dados/assembleia" className="underline underline-offset-2 hover:text-tinta">
            Assembleia
          </Link>
          .
        </p>
      </div>
    </>
  );
}
