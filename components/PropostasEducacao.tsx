"use client";

import { useState } from "react";
import type { Ambito, Eixo, Proposta } from "@/lib/educacao";

type Filtro = "todas" | Ambito;

const etiquetaAmbito: Record<Ambito, { texto: string; classe: string }> = {
  local: { texto: "Na Trofa", classe: "bg-cyan/15 text-cyan-dark" },
  nacional: { texto: "No país", classe: "bg-pink/10 text-pink" },
};

// Filtro "Todas / Na Trofa / No país" e propostas que se abrem ao toque, agrupadas por eixo.
export default function PropostasEducacao({ eixos, propostas }: { eixos: Eixo[]; propostas: Proposta[] }) {
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [abertas, setAbertas] = useState<Set<string>>(new Set());

  const ambitoDe = (p: Proposta): Ambito => eixos.find((e) => e.n === p.eixo)?.ambito ?? "local";
  const visiveis = propostas.filter((p) => filtro === "todas" || ambitoDe(p) === filtro);
  const total = (f: Filtro) => propostas.filter((p) => f === "todas" || ambitoDe(p) === f).length;

  function alternar(id: string) {
    setAbertas((a) => {
      const n = new Set(a);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }

  const todasAbertas = visiveis.length > 0 && visiveis.every((p) => abertas.has(p.id));

  const filtros: { chave: Filtro; nome: string }[] = [
    { chave: "todas", nome: "Todas" },
    { chave: "local", nome: "Na Trofa" },
    { chave: "nacional", nome: "No país" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        {filtros.map((f) => (
          <button
            key={f.chave}
            type="button"
            onClick={() => setFiltro(f.chave)}
            aria-pressed={filtro === f.chave}
            className={`rounded-full px-6 py-3 font-bold transition ${
              filtro === f.chave
                ? "bg-navy text-white"
                : "border-2 border-navy text-navy hover:bg-navy hover:text-white"
            }`}
          >
            {f.nome} <span className="opacity-70">({total(f.chave)})</span>
          </button>
        ))}
        <button
          type="button"
          onClick={() =>
            setAbertas((a) => {
              const n = new Set(a);
              for (const p of visiveis) {
                if (todasAbertas) n.delete(p.id);
                else n.add(p.id);
              }
              return n;
            })
          }
          className="ml-auto text-sm font-bold text-cyan-dark hover:underline"
        >
          {todasAbertas ? "Fechar todas" : "Abrir todas"}
        </button>
      </div>

      <div className="mt-10 space-y-14">
        {eixos.map((e) => {
          const doEixo = visiveis.filter((p) => p.eixo === e.n);
          if (!doEixo.length) return null;
          const etq = etiquetaAmbito[e.ambito];
          return (
            <section key={e.n} id={`eixo-${e.n}`} className="scroll-mt-24">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-display text-sm font-bold text-pink">Eixo {e.n}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${etq.classe}`}>
                  {etq.texto}
                </span>
              </div>
              <h3 className="font-display mt-2 text-2xl font-bold text-navy md:text-3xl">{e.titulo}</h3>
              <p className="mt-1 text-ink/75">{e.lema}</p>
              <ul className="mt-6 space-y-3">
                {doEixo.map((p) => {
                  const aberta = abertas.has(p.id);
                  return (
                    <li key={p.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-2 ring-transparent transition hover:ring-pink/40">
                      <button
                        type="button"
                        onClick={() => alternar(p.id)}
                        aria-expanded={aberta}
                        aria-controls={`prop-${p.id}`}
                        className="flex w-full items-start gap-4 p-5 text-left md:p-6"
                      >
                        <span className="font-display pt-1 text-sm font-bold text-pink">{p.id}</span>
                        <span className="flex-1">
                          <span className="font-display block text-xl font-bold leading-snug text-navy">{p.titulo}</span>
                          <span className="mt-1 block text-ink/80">{p.resumo}</span>
                        </span>
                        <span
                          aria-hidden
                          className={`mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mist text-xl font-bold text-navy transition ${
                            aberta ? "rotate-45" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>
                      {aberta && (
                        <div id={`prop-${p.id}`} className="border-t-2 border-mist bg-mist/60 px-5 py-5 md:px-6 md:pl-[4.25rem]">
                          <p className="text-xs font-bold uppercase tracking-widest text-cyan-dark">Porquê</p>
                          <p className="mt-2 text-ink/85">{p.porque}</p>
                          {p.itens && (
                            <ul className="mt-4 space-y-2">
                              {p.itens.map((i) => (
                                <li key={i} className="flex gap-3 text-ink/85">
                                  <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-pink" />
                                  <span>{i}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
