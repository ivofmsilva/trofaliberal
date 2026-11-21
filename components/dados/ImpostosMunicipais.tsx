"use client";

import { useState } from "react";
import Link from "next/link";
import Grafico from "@/components/dados/Grafico";
import type { ReceitaImposto } from "@/lib/dados/financas";

// Um gráfico por imposto, com a escolha entre o total (só a Trofa) e o valor por habitante (a Trofa ao lado da Área
// Metropolitana do Porto, dos 8 concelhos próximos e de Portugal).
export default function ImpostosMunicipais({ impostos }: { impostos: ReceitaImposto[] }) {
  const [modo, setModo] = useState<"total" | "habitante">("total");
  return (
    <div>
      <div role="group" aria-label="Mostrar" className="flex flex-wrap gap-2">
        {(
          [
            ["total", "Total"],
            ["habitante", "Por habitante"],
          ] as const
        ).map(([id, rotulo]) => (
          <button
            key={id}
            type="button"
            aria-pressed={modo === id}
            onClick={() => setModo(id)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              modo === id ? "border-tinta bg-tinta text-fundo" : "border-linha text-texto hover:border-tinta hover:text-tinta"
            }`}
          >
            {rotulo}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {impostos.map((i) => (
          <div key={i.slug}>
            <h4 className="font-bold text-tinta">
              {i.nome}{" "}
              <Link href={`/dados/indicadores/${i.slug}`} className="text-sm font-normal text-apagado underline underline-offset-2 hover:text-tinta">
                ver o indicador
              </Link>
            </h4>
            <div className="mt-3">
              {modo === "total" ? (
                <Grafico periodos={i.periodos} series={[{ nome: i.colunas[0], valores: i.total }]} unidade="€" emMilhoes semComparar nivel />
              ) : (
                <Grafico
                  periodos={i.periodos}
                  series={i.colunas.map((c, k) => ({ nome: c, valores: i.porHabitante[k] }))}
                  unidade="€"
                  casas={0}
                  semComparar
                  nivel
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
