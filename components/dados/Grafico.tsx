"use client";

import { useEffect, useRef, useState } from "react";
import { milhoes, numero, sufixo, valor as fmtValor } from "@/lib/dados/formatar";

export type Serie = { nome: string; valores: (number | null)[] };

// Cada série tem o seu traço. A Trofa é sempre a linha escura e grossa.
const ESTILOS = [
  { cor: "#151515", largura: 2.75, tracejado: "" },
  { cor: "#8c8c87", largura: 1.75, tracejado: "" },
  { cor: "#b7b7b1", largura: 1.75, tracejado: "" },
  { cor: "#5c5c58", largura: 1.75, tracejado: "5 4" },
];

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
}: {
  periodos: string[];
  series: Serie[];
  unidade: string;
  semComparar?: boolean;
  casas?: number;
  // Valores em euros que se leem em milhões (M€) na caixa que aparece ao passar o rato.
  emMilhoes?: boolean;
}) {
  const caixa = useRef<HTMLDivElement>(null);
  const [larguraCaixa, setLarguraCaixa] = useState(720);
  const [rolavel, setRolavel] = useState(false);
  const [modo, setModo] = useState<"valores" | "comparar">("valores");
  const [ativo, setAtivo] = useState<number | null>(null);

  // No telemóvel o gráfico não se aperta: fica com uma largura mínima e desliza-se para o lado (começa nos anos mais recentes).
  // Com poucos períodos cabe sempre, e não precisa de deslizar.
  const LARGURA_MINIMA = periodos.length > 8 ? 600 : 0;
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

  const podeComparar = !semComparar && series.length > 1 && series[0].valores.filter((v) => v !== null).length >= 3;
  const modoEfetivo = podeComparar ? modo : "valores";

  // No modo "comparar" cada série vira índice (100 = primeiro valor), para se ver quem cresce mais.
  const visiveis: Serie[] =
    modoEfetivo === "valores"
      ? semComparar
        ? series
        : [series[0]]
      : series.map((s) => {
          const base = s.valores.find((v) => v !== null);
          return { nome: s.nome, valores: s.valores.map((v) => (v === null || !base ? null : (v / base) * 100)) };
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
  const cima = modoEfetivo === "valores" && unidade.startsWith("%") && max <= 100 ? Math.min(100, max + pad) : max + pad;
  const ticks = bonitos(baixo, cima, 4);
  const yMin = Math.min(ticks[0], min);
  const yMax = Math.max(ticks[ticks.length - 1], max);

  const anos = periodos.map(Number);
  const numerico = anos.every((a) => Number.isFinite(a));
  const xMin = numerico ? Math.min(...anos) : 0;
  const xMax = numerico ? Math.max(...anos) : periodos.length - 1;

  const altura = larguraCaixa < 520 ? 230 : 340;
  const m = { e: larguraCaixa < 520 ? 50 : 62, d: 18, t: 16, b: 30 };
  const w = largura - m.e - m.d;
  const h = altura - m.t - m.b;
  const X = (i: number) => m.e + (xMax === xMin ? w / 2 : (((numerico ? anos[i] : i) - xMin) / (xMax - xMin)) * w);
  const Y = (v: number) => m.t + h - ((v - yMin) / (yMax - yMin)) * h;

  // As marcas do eixo escrevem-se todas com as mesmas casas decimais, as que o intervalo entre elas pede.
  const passoEixo = ticks.length > 1 ? ticks[1] - ticks[0] : 0;
  const eixoEmMilhoes = modoEfetivo === "valores" && unidade === "€" && ticks.some((t) => Math.abs(t) >= 1_000_000);
  const fmtEixo = (v: number) =>
    eixoEmMilhoes
      ? numero(v / 1_000_000, casasDoPasso(passoEixo / 1_000_000)) + " M€"
      : casas !== undefined && modoEfetivo === "valores"
        ? numero(v, Math.max(casas, casasDoPasso(passoEixo))) + sufixo(unidade)
        : numero(v, casasDoPasso(passoEixo));

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
        <div role="tablist" aria-label="Tipo de gráfico" className="mb-4 inline-flex rounded-full border border-linha bg-suave p-1 text-sm font-medium">
          {(
            [
              ["valores", "Valores da Trofa"],
              ["comparar", "Comparar com outros"],
            ] as const
          ).map(([id, rotulo]) => (
            <button
              key={id}
              role="tab"
              aria-selected={modo === id}
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
          aria-label={`Gráfico de evolução: ${visiveis.map((s) => s.nome).join(", ")}`}
          onPointerMove={aoMover}
          onPointerDown={aoMover}
          onPointerLeave={() => setAtivo(null)}
          style={{ touchAction: "pan-x pan-y" }}
          className="block overflow-visible"
        >
          {ticks.map((t) => (
            <g key={t}>
              <line x1={m.e} x2={largura - m.d} y1={Y(t)} y2={Y(t)} stroke="#e4e4e0" strokeWidth="1" />
              <text x={m.e - 8} y={Y(t) + 4} textAnchor="end" fontSize="11" fill="#777">
                {fmtEixo(t)}
              </text>
            </g>
          ))}
          {modoEfetivo === "comparar" && yMin < 100 && yMax > 100 && (
            <line x1={m.e} x2={largura - m.d} y1={Y(100)} y2={Y(100)} stroke="#9a9a96" strokeWidth="1" strokeDasharray="2 3" />
          )}
          {comDados
            .filter((_, k) => k % passoRotulo === 0 || k === comDados.length - 1)
            .map((i) => (
              <text key={i} x={X(i)} y={altura - 8} textAnchor="middle" fontSize="11" fill="#777">
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
                    {s.nome}
                  </span>
                  <span className="font-medium tabular-nums text-tinta">
                    {v === null ? "—" : modoEfetivo === "comparar" ? numero(v, 1) : emMilhoes ? milhoes(original) : fmtValor(original, unidade)}
                  </span>
                </p>
              );
            })}
          </div>
        )}
       </div>
      </div>
      {rolavel && <p className="mt-1 text-xs text-apagado">Desliza o gráfico para o lado para ver todos os anos.</p>}

      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-texto">
        {visiveis.map((s) => {
          const est = estiloDe(s.nome);
          return (
            <li key={s.nome} className="flex items-center gap-2">
              <svg width="22" height="8" aria-hidden>
                <line x1="0" y1="4" x2="22" y2="4" stroke={est.cor} strokeWidth={est.largura} strokeDasharray={est.tracejado} />
              </svg>
              {s.nome}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
