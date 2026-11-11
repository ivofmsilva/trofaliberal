import { numero } from "@/lib/dados/formatar";
import { anosAssembleia, anosCamara, mandatosAssembleia, mandatosCamara, type LinhaAno } from "@/lib/dados/votos";

// Os mesmos nomes na Câmara e na Assembleia.
const NOMES_LISTA: Record<string, string> = { "PSD/CDS-PP": "Unidos pela Trofa", "PS-PAN-L": "Trofa em Primeiro", CH: "Chega" };
const nomeLista = (n: string) => NOMES_LISTA[n] ?? n;

const pct = (a: number, b: number) => (b === 0 ? "—" : `${numero((a / b) * 100, 0)}%`);

function total(l: LinhaAno[]) {
  return l.reduce((a, x) => ({ votados: a.votados + x.votados, unanimes: a.unanimes + x.unanimes, maioria: a.maioria + x.maioria }), { votados: 0, unanimes: 0, maioria: 0 });
}

// Quantas decisões são unânimes e, nas que não são, como votou cada lista. Serve a Câmara e a Assembleia.
export default function ComoVotam({ corpo }: { corpo: "camara" | "assembleia" }) {
  const linhas = corpo === "camara" ? anosCamara : anosAssembleia;
  const mandatos = corpo === "camara" ? mandatosCamara : mandatosAssembleia;
  const t = total(linhas);
  return (
    <div>
      <p className="max-w-2xl text-texto">
        <strong className="font-semibold text-tinta">{pct(t.unanimes, t.votados)}</strong> dos {numero(t.votados)} pontos votados desde{" "}
        {linhas[0]?.ano} foram aprovados por unanimidade. Só entram os pontos que foram a votos (os que apenas se tomaram
        conhecimento não contam).
      </p>

      <h3 className="mt-8 text-lg font-bold text-tinta">Ano a ano</h3>
      <div className="mt-3 overflow-x-auto rounded-xl border border-linha">
        <table className="w-full text-sm">
          <thead className="bg-cinza text-left text-apagado">
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
      {corpo === "camara" && <p className="mt-3 text-sm text-apagado">Só contam as reuniões de que a Câmara publicou as deliberações (a lista das que faltam está em Deliberações). Os documentos digitalizados foram lidos por reconhecimento de texto e os pontos em que o voto não se leu ficam de fora das contas.</p>}

      <h3 className="mt-10 text-lg font-bold text-tinta">Nas votações por maioria</h3>
      <p className="mt-2 max-w-2xl text-texto">
        Quantas vezes cada lista votou a favor, contra ou se absteve nas votações que não foram unânimes. Uma lista conta
        em dois sentidos numa votação quando os seus membros se dividiram.
        {corpo === "camara" && " Na Câmara a lista conta uma vez por sentido, qualquer que seja o número de vereadores."}
      </p>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
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
                  <thead className="bg-cinza text-left text-apagado">
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
                          {nomeLista(l.lista)}
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
      <p className="mt-4 max-w-2xl text-sm text-apagado">
        Só entram as votações em que o documento diz como votou cada lista; nas eleições e designações por escrutínio secreto
        não há votos por lista.
      </p>
    </div>
  );
}
