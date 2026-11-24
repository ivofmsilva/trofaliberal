"use client";

import { useEffect, useState } from "react";

// Contador do que a Câmara já terá cobrado no ano em impostos (com a parte do IRS) e taxas, ao ritmo do orçamento aprovado: o total anual
// dividido pelos segundos do ano, a contar de 1 de janeiro (hora de Portugal continental). Depois de acabar o ano do
// orçamento fica parado no total.
const fmt = (v: number, casas = 2) => {
  const [i, d] = v.toFixed(casas).split(".");
  return i.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0") + (d ? "," + d : "");
};

export default function Taxometro({ totalAno, ano }: { totalAno: number; ano: number }) {
  const inicio = Date.parse(`${ano}-01-01T00:00:00Z`);
  const fim = Date.parse(`${ano + 1}-01-01T00:00:00Z`);
  const porSegundo = totalAno / ((fim - inicio) / 1000);
  const [agora, setAgora] = useState<number | null>(null);

  useEffect(() => {
    setAgora(Date.now());
    const t = setInterval(() => setAgora(Date.now()), 100);
    return () => clearInterval(t);
  }, []);

  const decorrido = agora === null ? 0 : Math.min(Math.max(agora - inicio, 0), fim - inicio) / 1000;
  const valor = decorrido * porSegundo;
  const acabou = agora !== null && agora >= fim;

  return (
    <div className="rounded-3xl bg-navy p-8 text-white md:p-12">
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-sun">Taxómetro da Trofa</p>
      <h2 className="font-display mt-3 text-2xl font-bold md:text-3xl">
        {acabou ? `O que a Câmara previa cobrar em ${ano}` : `O que a Câmara já terá cobrado este ano`}
      </h2>
      <p className="font-display mt-6 text-4xl font-bold tabular-nums tracking-tight text-white sm:text-5xl md:text-7xl" aria-live="off">
        {agora === null ? "…" : `${fmt(valor)} €`}
      </p>
      <p className="mt-4 text-sm font-bold uppercase tracking-widest text-sun">
        ≈ {fmt(porSegundo)} € por segundo · IMI, IMT, IUC, derrama, parte do IRS e taxas
      </p>
      <p className="mt-6 max-w-3xl text-white/85">
        Impostos, parte do IRS e taxas municipais previstos no orçamento de {ano} ({fmt(totalAno, 0)} € no ano), ao ritmo do
        orçamento, a contar de 1 de janeiro.
      </p>
    </div>
  );
}
