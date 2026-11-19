"use client";

import { useEffect, useRef, useState } from "react";
import { milhoes, numero, sufixo, valor as fmtValor } from "@/lib/dados/formatar";
import { ROTULO_GRUPO, ROTULO_GRUPO_LONGO } from "@/lib/dados/rotulos";

export type Serie = { nome: string; valores: (number | null)[] };

// Cada série tem o seu traço. A Trofa é sempre a linha violeta e grossa; as comparações são cinzentas e distinguem-se
// também pelo traço (e pelo nome escrito no fim da linha), para não depender só da cor.
// Ordem das colunas: Trofa, Área Metropolitana do Porto, Ave e concelhos vizinhos (Trofa e vizinhos, 8 concelhos), Portugal.
const ESTILOS = [
  { cor: "#6b3fd4", largura: 3, tracejado: "" },
  { cor: "#7d8794", largura: 2, tracejado: "6 4" },
  { cor: "#5f6b7a", largura: 2, tracejado: "" },
  { cor: "#7d8794", largura: 2, tracejado: "2 4" },
];
const ROTULOS: Record<string, string> = { "Ave e concelhos vizinhos": ROTULO_GRUPO, "Área Metropolitana do Porto": "AMP" };

function bonitos(min: number, max: number, n = 4) {
  if (min === max) return [min];
  const bruto = (max - min) / n;
  const pot = Math.pow(10, Math.floor(Math.log10(bruto)));
  const f = bruto / pot;
  const passo = (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) * pot;
  const ini = Math.floor(min / passo) * passo;
  const fim = Math.ceil(max / passo) * passo;
  const out: number[] = [];
  for (let v = ini; v <= fim + passo / 2; v += passo) out.push(Number(v.toFixed(10)));
  return out;
}

// Casas decimais de que um eixo precisa para que duas marcas seguidas não fiquem com o mesmo texto
// (marcas de 0,05 em 0,05 pedem duas casas; de 2 em 2, nenhuma).
function casasDoPasso(passo: number) {
  if (!(passo > 0)) return 0;
  return Math.min(6, Math.max(0, -Math.floor(Math.log10(passo) + 1e-9)));
}

export default function Grafico({
  periodos,
  series,
  unidade,
  semComparar = false,
  casas,
  emMilhoes = false,
  nivel = false,
}: {
  periodos: string[];
  series: Serie[];
  unidade: string;
  semComparar?: boolean;
  casas?: number;
  // Valores em euros que se leem em milhões (M€) na caixa que aparece ao passar o rato.
  emMilhoes?: boolean;
  // As colunas comparam-se diretamente (taxas, por habitante, medianas); se não, a comparação é da evolução (índice).
  nivel?: boolean;
}) {
  const caixa = useRef<HTMLDivElement>(null);
  const [larguraCaixa, setLarguraCaixa] = useState(720);
  const [rolavel, setRolavel] = useState(false);
  // Abre já na comparação: é o que dá sentido ao número da Trofa.
  const [modo, setModo] = useState<"valores" | "comparar">("comparar");
  const [ativo, setAtivo] = useState<number | null>(null);

  // O gráfico desenha-se à largura da caixa, também no telemóvel: com muitos anos, escrevem-se menos anos no eixo.
  // (Antes tinha 600 px no mínimo e deslizava, e abria sem os números do eixo à vista.)
  const LARGURA_MINIMA = 0;
  const largura = Math.max(larguraCaixa, LARGURA_MINIMA);

  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    const medir = () => {
      setLarguraCaixa(Math.max(280, Math.round(el.clientWidth)));
      setRolavel(el.clientWidth < LARGURA_MINIMA);
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, [LARGURA_MINIMA]);

  // Quando o gráfico passa a deslizar, começa à direita (anos mais recentes).
  const jaRolou = useRef(false);
  useEffect(() => {
    const el = caixa.current;
    if (rolavel && el && !jaRolou.current && el.scrollWidth > el.clientWidth) {
      el.scrollLeft = el.scrollWidth;
      jaRolou.current = true;
    }
  }, [rolavel, largura]);

  // Comparar a evolução (índice) não tem leitura quando a Trofa tem zeros ou valores negativos (um saldo, uma despesa
  // que nalguns anos é zero): aí fica só a Trofa, e a comparação faz-se nas barras dos 8 concelhos.
  // No índice, todas as linhas partem do mesmo ano: o primeiro em que todas as que têm dados têm valor.
  const comAlgum = series.filter((s) => s.valores.some((v) => v !== null));
  const iBase = periodos.findIndex((_, i) => comAlgum.every((s) => s.valores[i] !== null && (s.valores[i] as number) > 0));
  const semIndice = !nivel && (series[0].valores.some((v) => v !== null && v <= 0) || iBase < 0 || iBase >= periodos.length - 1);
  const podeComparar = !semComparar && !semIndice && series.length > 1 && series[0].valores.filter((v) => v !== null).length >= 3;
  const modoEfetivo = podeComparar ? modo : "valores";

  // No modo "comparar": os valores tal como são, quando se comparam diretamente; senão, cada série vira índice
  // (100 = primeiro valor), para se ver quem cresce mais sem misturar um concelho com uma soma de concelhos.
  const emIndice = modoEfetivo === "comparar" && !nivel;
  const visiveis: Serie[] =
    modoEfetivo === "valores"
      ? semComparar
        ? series
        : [series[0]]
      : nivel
        ? series
        : comAlgum.map((s) => {
            const base = iBase >= 0 ? (s.valores[iBase] as number) : null;
            return { nome: s.nome, valores: s.valores.map((v, i) => (v === null || !base || i < iBase ? null : (v / base) * 100)) };
          });
  const estiloDe = (nome: string) => ESTILOS[Math.max(0, series.findIndex((s) => s.nome === nome))] ?? ESTILOS[1];

  const todos = visiveis.flatMap((s) => s.valores.filter((v): v is number => v !== null));
  if (todos.length === 0) return null;
  let min = Math.min(...todos);
  let max = Math.max(...todos);
  if (min === max) {
    min -= Math.abs(min) * 0.05 || 1;
    max += Math.abs(max) * 0.05 || 1;
  }
  const pad = (max - min) * 0.08;
  // A folga não leva o eixo para onde os valores não podem estar: abaixo de zero, ou acima de 100 numa percentagem.
  const baixo = min >= 0 ? Math.max(0, min - pad) : min - pad;
  const cima = !emIndice && unidade.startsWith("%") && max <= 100 ? Math.min(100, max + pad) : max + pad;
  const ticks = bonitos(baixo, cima, 4);
  const yMin = Math.min(ticks[0], min);
  const yMax = Math.max(ticks[ticks.length - 1], max);

  const anos = periodos.map(Number);
  const numerico = anos.every((a) => Number.isFinite(a));
  const xMin = numerico ? Math.min(...anos) : 0;
  const xMax = numerico ? Math.max(...anos) : periodos.length - 1;

  // As marcas do eixo escrevem-se todas com as mesmas casas decimais, as que o intervalo entre elas pede.
  const passoEixo = ticks.length > 1 ? ticks[1] - ticks[0] : 0;
  const eixoEmMilhoes = !emIndice && unidade === "€" && ticks.some((t) => Math.abs(t) >= 1_000_000);
  const fmtEixo = (v: number) =>
    eixoEmMilhoes
      ? numero(v / 1_000_000, casasDoPasso(passoEixo / 1_000_000)) + " M€"
      : casas !== undefined && !emIndice
        ? numero(v, Math.max(casas, casasDoPasso(passoEixo))) + sufixo(unidade)
        : numero(v, casasDoPasso(passoEixo));

  const altura = larguraCaixa < 520 ? 230 : 340;
  // Com várias linhas, guarda-se espaço à direita para escrever o nome de cada uma no fim: tanto quanto o nome mais
  // comprido (cerca de 6,7 px por letra a 11,5 px), para nenhum ficar cortado.
  // Nomes compridos (os das Finanças, por exemplo) não cabem ao lado: aí fica só a legenda por baixo.
  const maiorRotulo = Math.max(0, ...visiveis.map((s) => (ROTULOS[s.nome] ?? s.nome).length));
  const comRotulos = visiveis.length > 1 && maiorRotulo <= 20 && larguraCaixa >= 520;
  // À esquerda, espaço para o número mais comprido do eixo (cerca de 6,3 px por algarismo a 11 px).
  const maiorMarca = Math.max(0, ...ticks.map((t) => fmtEixo(t).length));
  const m = { e: Math.max(larguraCaixa < 520 ? 44 : 56, Math.ceil(12 + maiorMarca * 6.3)), d: comRotulos ? Math.ceil(14 + maiorRotulo * 6.7) : 18, t: 16, b: 30 };
  const w = largura - m.e - m.d;
  const h = altura - m.t - m.b;
  const X = (i: number) => m.e + (xMax === xMin ? w / 2 : (((numerico ? anos[i] : i) - xMin) / (xMax - xMin)) * w);
  const Y = (v: number) => m.t + h - ((v - yMin) / (yMax - yMin)) * h;


  const comDados = periodos.map((_, i) => i).filter((i) => visiveis.some((s) => s.valores[i] !== null));
  const passoRotulo = Math.max(1, Math.ceil(comDados.length / Math.max(2, Math.floor(w / 56))));

  function aoMover(e: React.PointerEvent<SVGSVGElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - r.left;
    let melhor = comDados[0];
    let dist = Infinity;
    for (const i of comDados) {
      const d = Math.abs(X(i) - px);
      if (d < dist) {
        dist = d;
        melhor = i;
      }
    }
    setAtivo(melhor);
  }

  const tip = ativo !== null ? ativo : null;
  const tipEsquerda = tip !== null && X(tip) > largura * 0.6;

  return (
    <div>
      {podeComparar && (
        <div role="group" aria-label="Tipo de gráfico" className="mb-4 inline-flex rounded-full border border-linha bg-suave p-1 text-sm font-medium">
          {(
            [
              ["comparar", nivel ? "Comparar" : "Comparar a evolução"],
              ["valores", "Só a Trofa"],
            ] as const
          ).map(([id, rotulo]) => (
            <button
              key={id}
              type="button"
              aria-pressed={modo === id}
              onClick={() => setModo(id)}
              className={`rounded-full px-4 py-1.5 transition ${modo === id ? "bg-tinta text-white" : "text-texto hover:text-tinta"}`}
            >
              {rotulo}
            </button>
          ))}
        </div>
      )}

      <div ref={caixa} className="w-full overflow-x-auto overflow-y-hidden pb-1 [scrollbar-width:thin]">
       <div className="relative" style={{ width: largura }}>
        <svg
          width={largura}
          height={altura}
          role="img"
          aria-label={`Gráfico de evolução: ${visiveis.map((s) => (s.nome === "Ave e concelhos vizinhos" ? ROTULO_GRUPO_LONGO : s.nome)).join(", ")}. Os valores estão na tabela abaixo.`}
          onPointerMove={aoMover}
          onPointerDown={aoMover}
          onPointerLeave={() => setAtivo(null)}
          style={{ touchAction: "pan-x pan-y" }}
          className="block overflow-visible"
        >
          {ticks.map((t) => (
            <g key={t}>
              <line x1={m.e} x2={largura - m.d} y1={Y(t)} y2={Y(t)} stroke="#e4e4e0" strokeWidth="1" />
              <text x={m.e - 8} y={Y(t) + 4} textAnchor="end" fontSize="12" fill="#666">
                {fmtEixo(t)}
              </text>
            </g>
          ))}
          {emIndice && yMin < 100 && yMax > 100 && (
            <line x1={m.e} x2={largura - m.d} y1={Y(100)} y2={Y(100)} stroke="#9a9a96" strokeWidth="1" strokeDasharray="2 3" />
          )}
          {comDados
            .filter((_, k) => k === comDados.length - 1 || (k % passoRotulo === 0 && X(comDados[comDados.length - 1]) - X(comDados[k]) >= 48))
            .map((i) => (
              <text key={i} x={X(i)} y={altura - 8} textAnchor="middle" fontSize="12" fill="#666">
                {periodos[i]}
              </text>
            ))}

          {tip !== null && <line x1={X(tip)} x2={X(tip)} y1={m.t} y2={m.t + h} stroke="#9a9a96" strokeWidth="1" />}

          {[...visiveis].reverse().map((s) => {
            const est = estiloDe(s.nome);
            const pts = s.valores.map((v, i) => (v === null ? null : ([X(i), Y(v)] as const)));
            let d = "";
            let aberto = false;
            for (const p of pts) {
              if (!p) {
                aberto = false;
                continue;
              }
              d += `${aberto ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)} `;
              aberto = true;
            }
            const mostraPontos = est === ESTILOS[0] || s.valores.filter((v) => v !== null).length <= 4;
            return (
              <g key={s.nome}>
                <path d={d} fill="none" stroke={est.cor} strokeWidth={est.largura} strokeDasharray={est.tracejado} strokeLinejoin="round" strokeLinecap="round" />
                {mostraPontos &&
                  pts.map((p, i) => (p ? <circle key={i} cx={p[0]} cy={p[1]} r={est === ESTILOS[0] ? 3.5 : 2.5} fill="#fff" stroke={est.cor} strokeWidth="2" /> : null))}
              </g>
            );
          })}
          {tip !== null &&
            visiveis.map((s) => {
              const v = s.valores[tip];
              return v === null ? null : <circle key={s.nome} cx={X(tip)} cy={Y(v)} r="5" fill={estiloDe(s.nome).cor} stroke="#fff" strokeWidth="2" />;
            })}
          {comRotulos &&
            (() => {
              // Nome de cada linha junto ao seu último ponto; se dois ficarem em cima um do outro, afastam-se 13 px.
              const fins = visiveis
                .map((s) => {
                  let k = s.valores.length - 1;
                  while (k >= 0 && s.valores[k] === null) k--;
                  return k < 0 ? null : { nome: s.nome, x: X(k), y: Y(s.valores[k] as number), trofa: estiloDe(s.nome) === ESTILOS[0] };
                })
                .filter((f): f is { nome: string; x: number; y: number; trofa: boolean } => f !== null)
                .sort((a, b) => a.y - b.y);
              for (let k = 1; k < fins.length; k++) if (fins[k].y - fins[k - 1].y < 13) fins[k].y = fins[k - 1].y + 13;
              // Sem passar para baixo do eixo (onde estão os anos): se o último sair, sobem todos o que for preciso.
              const limite = m.t + h - 4;
              if (fins.length && fins[fins.length - 1].y > limite) {
                fins[fins.length - 1].y = limite;
                for (let k = fins.length - 2; k >= 0; k--) if (fins[k + 1].y - fins[k].y < 13) fins[k].y = fins[k + 1].y - 13;
              }
              return fins.map((f) => (
                <text key={f.nome} x={f.x + 8} y={f.y + 4} fontSize="11.5" fontWeight={f.trofa ? 700 : 500} fill={f.trofa ? "#1d2136" : "#4a5066"}>
                  {ROTULOS[f.nome] ?? f.nome}
                </text>
              ));
            })()}
        </svg>

        {tip !== null && (
          <div
            className="pointer-events-none absolute top-2 z-10 min-w-40 rounded-lg border border-linha bg-fundo px-3 py-2 text-xs shadow-lg"
            style={tipEsquerda ? { right: largura - X(tip) + 12 } : { left: X(tip) + 12 }}
          >
            <p className="mb-1 font-semibold text-tinta">{periodos[tip]}</p>
            {visiveis.map((s) => {
              const v = s.valores[tip];
              const original = series.find((o) => o.nome === s.nome)?.valores[tip] ?? null;
              return (
                <p key={s.nome} className="flex items-center justify-between gap-4 text-texto">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-0.5 w-3" style={{ background: estiloDe(s.nome).cor }} />
                    {ROTULOS[s.nome] ?? s.nome}
                  </span>
                  <span className="font-medium tabular-nums text-tinta">
                    {v === null ? "—" : emIndice ? `${emMilhoes ? milhoes(original) : fmtValor(original, unidade)} (${numero(v, 1)})` : emMilhoes ? milhoes(original) : fmtValor(original, unidade)}
                  </span>
                </p>
              );
            })}
          </div>
        )}
       </div>
      </div>
      {rolavel && <p className="mt-1 text-xs text-apagado">Desliza o gráfico para o lado para ver todos os anos.</p>}
      {emIndice && iBase >= 0 && (
        <p className="mt-2 text-sm text-apagado">
          Evolução de cada linha desde {periodos[iBase]} ({periodos[iBase]} = 100). Mostra quem cresceu mais, não quem tem mais; os
          valores estão na tabela.
        </p>
      )}
      {semIndice && !semComparar && series.length > 1 && (
        <p className="mt-2 text-sm text-apagado">A comparação com os outros concelhos está nas barras dos 8 concelhos, mais abaixo.</p>
      )}

      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-texto">
        {visiveis.map((s) => {
          const est = estiloDe(s.nome);
          return (
            <li key={s.nome} className="flex items-center gap-2">
              <svg width="22" height="8" aria-hidden>
                <line x1="0" y1="4" x2="22" y2="4" stroke={est.cor} strokeWidth={est.largura} strokeDasharray={est.tracejado} />
              </svg>
              {s.nome === "Ave e concelhos vizinhos" ? ROTULO_GRUPO_LONGO : s.nome}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
