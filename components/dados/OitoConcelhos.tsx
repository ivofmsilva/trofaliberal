import { milhoes, valor } from "@/lib/dados/formatar";

// Os 8 concelhos de "Trofa e vizinhos" no último período com os 8 valores: barras ordenadas da maior para a menor, a Trofa
// a violeta e os outros a cinzento. Cada barra tem o nome e o valor escritos, por isso não precisa de legenda nem de dica.
// O valor tem largura fixa, para as calhas terem todas o mesmo comprimento (e as barras a mesma escala).
const CURTO: Record<string, string> = { "Vila Nova de Famalicão": "V. N. de Famalicão" };

function posicao(lista: [string, number][]): string | null {
  const n = lista.length;
  const v = lista.find(([nome]) => nome === "Trofa")?.[1];
  if (v === undefined) return null;
  const iguais = lista.filter(([nome, x]) => nome !== "Trofa" && x === v).map(([nome]) => nome);
  const acima = lista.filter(([, x]) => x > v).length;
  const pos = acima + 1;
  const empate = iguais.length ? ` (igual a ${iguais.length === 1 ? iguais[0] : iguais.slice(0, -1).join(", ") + " e " + iguais.at(-1)})` : "";
  if (pos === 1) return `A Trofa tem o valor mais alto dos ${n}${empate}.`;
  if (pos + iguais.length === n) return `A Trofa tem o valor mais baixo dos ${n}${empate}.`;
  return `A Trofa é a ${pos}.ª dos ${n}, do valor mais alto para o mais baixo${empate}.`;
}

export default function OitoConcelhos({
  periodo,
  concelhos,
  unidade,
  emMilhoes = false,
}: {
  periodo: string;
  concelhos: Record<string, number | null>;
  unidade: string;
  emMilhoes?: boolean;
}) {
  const lista = Object.entries(concelhos)
    .filter((x): x is [string, number] => x[1] !== null)
    .sort((a, b) => b[1] - a[1]);
  if (lista.length < 2) return null;
  const frase = posicao(lista);
  // escala com o zero sempre à vista (há indicadores com valores negativos, como o saldo migratório)
  const min = Math.min(0, ...lista.map(([, v]) => v));
  const max = Math.max(0, ...lista.map(([, v]) => v));
  const amplitude = max - min || 1;
  const zero = ((0 - min) / amplitude) * 100;
  const formata = (v: number) => (emMilhoes ? milhoes(v) : valor(v, unidade));

  return (
    <section aria-label="Os 8 concelhos de Trofa e vizinhos" className="mt-12">
      <h2 className="text-lg font-bold text-tinta">Os 8 concelhos em {periodo}</h2>
      {frase && <p className="mt-1 text-sm text-apagado">{frase}</p>}
      <ol className="mt-4 grid gap-2">
        {lista.map(([nome, v]) => {
          const trofa = nome === "Trofa";
          const inicio = v >= 0 ? zero : ((v - min) / amplitude) * 100;
          const largura = (Math.abs(v) / amplitude) * 100;
          return (
            <li key={nome} className="grid grid-cols-[minmax(0,8.5rem)_1fr_5.5rem] items-center gap-3 text-sm sm:grid-cols-[12rem_1fr_7rem]">
              <span className={`truncate ${trofa ? "font-bold text-trofa" : "text-texto"}`}>
                {CURTO[nome] ? (
                  <>
                    <span className="sm:hidden">{CURTO[nome]}</span>
                    <span className="hidden sm:inline">{nome}</span>
                  </>
                ) : (
                  nome
                )}
              </span>
              <span className="relative h-3 rounded-full bg-[#eeedf3]">
                <span
                  className="absolute inset-y-0 rounded-full"
                  style={{
                    left: `${inicio}%`,
                    width: `${Math.max(largura, 0.8)}%`,
                    background: trofa ? "var(--trofa)" : "var(--cmp-2)",
                  }}
                />
              </span>
              <span className={`whitespace-nowrap text-right tabular-nums ${trofa ? "font-bold text-trofa" : "font-medium text-tinta"}`}>{formata(v)}</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
