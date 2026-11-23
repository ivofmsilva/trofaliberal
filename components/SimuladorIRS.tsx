"use client";

import { useState } from "react";

// O teu IRS municipal: a Câmara pode ficar com até 5% do IRS dos residentes; o que não fica volta ao contribuinte como
// dedução ao imposto. Com a taxa atual da Trofa e com a proposta da Iniciativa Liberal.
const grupos = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
const eur = (v: number) => `${grupos(Math.round(v))} €`;
const pct = (v: number) => String(v).replace(".", ",");

export default function SimuladorIRS({ taxa, proposta, anoRendimentos }: { taxa: number; proposta: number; anoRendimentos: number }) {
  const [coleta, setColeta] = useState(2000);
  const camara = (coleta * taxa) / 100;
  const devolvido = (coleta * (5 - taxa)) / 100;
  const ganhoProposta = (coleta * (taxa - proposta)) / 100;

  return (
    <div className="rounded-3xl bg-mist p-6 md:p-10">
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Simulador</p>
      <h3 className="font-display mt-2 text-2xl font-bold text-navy md:text-3xl">O teu IRS que fica na Câmara</h3>

      <label className="mt-6 block font-bold text-navy" htmlFor="coleta">
        IRS do teu agregado no ano: <span className="tabular-nums">{eur(coleta)}</span>
      </label>
      <input
        id="coleta"
        type="range"
        min={0}
        max={20000}
        step={50}
        value={coleta}
        onChange={(e) => setColeta(Number(e.target.value))}
        className="mt-3 w-full accent-pink"
      />
      <div className="mt-1 flex justify-between text-xs text-ink/70">
        <span>0 €</span>
        <span>20 000 €</span>
      </div>
      <p className="mt-2 text-sm text-ink/70">É a coleta líquida da nota de liquidação do IRS.</p>

      <dl className="mt-8 grid gap-3">
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-white p-5">
          <dt className="text-sm font-bold text-navy">Fica na Câmara ({pct(taxa)}%)</dt>
          <dd className="font-display shrink-0 whitespace-nowrap text-3xl font-bold tabular-nums text-navy">{eur(camara)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-white p-5">
          <dt className="text-sm font-bold text-navy">Volta para ti ({pct(Math.round((5 - taxa) * 10) / 10)}%)</dt>
          <dd className="font-display shrink-0 whitespace-nowrap text-3xl font-bold tabular-nums text-navy">{eur(devolvido)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-pink p-5 text-white">
          <dt className="text-sm font-bold">
            Com a proposta da IL ({pct(proposta)}%), ficavas com mais por ano
            <span className="block font-normal">{eur(ganhoProposta * 10)} em 10 anos</span>
          </dt>
          <dd className="font-display shrink-0 whitespace-nowrap text-3xl font-bold tabular-nums">{eur(ganhoProposta)}</dd>
        </div>
      </dl>

      <details className="mt-6 text-sm text-ink/80">
        <summary className="cursor-pointer font-bold text-cyan-dark">Como calculamos</summary>
        <p className="mt-2">
          Cada câmara pode ficar com até 5% do IRS dos residentes no concelho (a participação variável no IRS). A Trofa fixou
          {" "}{pct(taxa)}% para os rendimentos de {anoRendimentos}. A parte que a Câmara não fica é descontada no IRS de cada
          agregado. Calcula-se sobre a coleta líquida; é uma estimativa.
        </p>
      </details>
    </div>
  );
}
