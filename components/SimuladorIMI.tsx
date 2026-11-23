"use client";

import { useState } from "react";

// O teu IMI: valor patrimonial × taxa da Câmara, menos a dedução do IMI familiar (só na habitação própria e permanente),
// comparado com a taxa mínima da lei (0,30%), que é a proposta da Iniciativa Liberal.
const grupos = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
const eur = (v: number) => `${grupos(Math.round(v))} €`;
const pct = (v: number) => v.toFixed(2).replace(".", ",");

export default function SimuladorIMI({
  taxa,
  minimo,
  ano,
  deducoes,
}: {
  taxa: number; // em %, por exemplo 0.39
  minimo: number; // 0.3
  ano: number;
  deducoes: { um: number; dois: number; tres: number } | null;
}) {
  const [vpt, setVpt] = useState(100000);
  const [dep, setDep] = useState(0);
  const [hpp, setHpp] = useState(true);

  const deducao = !deducoes || !hpp || dep === 0 ? 0 : dep === 1 ? deducoes.um : dep === 2 ? deducoes.dois : deducoes.tres;
  const pagas = Math.max(0, (vpt * taxa) / 100 - deducao);
  const comMinimo = Math.max(0, (vpt * minimo) / 100 - deducao);
  const poupanca = pagas - comMinimo;

  return (
    <div className="rounded-3xl bg-mist p-6 md:p-10">
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Simulador</p>
      <h3 className="font-display mt-2 text-2xl font-bold text-navy md:text-3xl">O teu IMI</h3>

      <label className="mt-6 block font-bold text-navy" htmlFor="vpt">
        Valor patrimonial da casa (VPT): <span className="tabular-nums">{eur(vpt)}</span>
      </label>
      <input
        id="vpt"
        type="range"
        min={20000}
        max={500000}
        step={1000}
        value={vpt}
        onChange={(e) => setVpt(Number(e.target.value))}
        className="mt-3 w-full accent-pink"
      />
      <div className="mt-1 flex justify-between text-xs text-ink/70">
        <span>20 000 €</span>
        <span>500 000 €</span>
      </div>
      <p className="mt-2 text-sm text-ink/70">Está na caderneta predial e na nota de cobrança do IMI.</p>

      <fieldset className="mt-6">
        <legend className="font-bold text-navy">Dependentes no agregado</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {[0, 1, 2, 3].map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={dep === n}
              onClick={() => setDep(n)}
              className={`rounded-full border-2 px-4 py-1.5 text-sm font-bold transition ${dep === n ? "border-navy bg-navy text-white" : "border-navy/20 bg-white text-navy hover:border-navy"}`}
            >
              {n === 3 ? "3 ou mais" : n}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="mt-4 flex items-center gap-2 text-sm text-ink/80">
        <input type="checkbox" checked={hpp} onChange={(e) => setHpp(e.target.checked)} className="h-4 w-4 accent-pink" />
        É a habitação própria e permanente (só aí se aplica a redução por dependentes)
      </label>

      <dl className="mt-8 grid gap-3">
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-white p-5">
          <dt className="text-sm font-bold text-navy">Pagas por ano, com a taxa da Câmara ({pct(taxa)}%)</dt>
          <dd className="font-display shrink-0 whitespace-nowrap text-3xl font-bold tabular-nums text-navy">{eur(pagas)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-white p-5">
          <dt className="text-sm font-bold text-navy">Com a taxa mínima da lei ({pct(minimo)}%), a nossa proposta</dt>
          <dd className="font-display shrink-0 whitespace-nowrap text-3xl font-bold tabular-nums text-navy">{eur(comMinimo)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-pink p-5 text-white">
          <dt className="text-sm font-bold">
            Ficavas com mais por ano
            <span className="block font-normal">{eur(poupanca * 10)} em 10 anos</span>
          </dt>
          <dd className="font-display shrink-0 whitespace-nowrap text-3xl font-bold tabular-nums">{eur(poupanca)}</dd>
        </div>
      </dl>

      <details className="mt-6 text-sm text-ink/80">
        <summary className="cursor-pointer font-bold text-cyan-dark">Como calculamos</summary>
        <p className="mt-2">
          IMI = valor patrimonial × taxa. A taxa dos prédios urbanos em {ano} é {pct(taxa)}%, fixada pela
          Assembleia Municipal; a lei permite entre 0,30% e 0,45%.
          {deducoes
            ? ` Na habitação própria e permanente, o IMI familiar desconta ${deducoes.um} € com 1 dependente, ${deducoes.dois} € com 2 e ${deducoes.tres} € com 3 ou mais.`
            : ""}{" "}
          É uma estimativa: não conta isenções nem o adicional ao IMI.
        </p>
      </details>
    </div>
  );
}
