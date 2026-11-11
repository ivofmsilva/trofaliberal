"use client";

import { useEffect, useMemo, useState } from "react";
import Cab from "./Cab";
import { areaDe, AREAS, OUTRAS, divisaoNome } from "@/lib/dados/areas";
import { numero } from "@/lib/dados/formatar";
import type { Contrato } from "@/lib/dados/transparencia";

type Campo = "data" | "valor" | "objeto" | "adjudicatario";

const semAcentos = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const eur = (v: number) => numero(v, Number.isInteger(v) ? 0 : 2) + " €";
const data = (iso: string | null) => (iso ? iso.split("-").reverse().join("/") : "—");

function empresa(texto: string) {
  const m = texto.match(/^\s*(\d{8,9})\s*-\s*(.*)$/);
  return m ? { nome: m[2].trim(), nif: m[1] } : { nome: texto.replace(/^[-\s]+/, "").trim(), nif: null };
}

export default function TabelaContratos() {
  const [lista, setLista] = useState<Contrato[] | null>(null);
  const [erro, setErro] = useState(false);
  const [q, setQ] = useState("");
  const [ano, setAno] = useState("");
  const [proc, setProc] = useState("");
  const [area, setArea] = useState("");
  const [campo, setCampo] = useState<Campo>("data");
  const [desc, setDesc] = useState(true);
  const [porPagina, setPorPagina] = useState(30);
  const [pagina, setPagina] = useState(0);
  const [aberto, setAberto] = useState<string | null>(null);

  useEffect(() => {
    fetch("/dados/data/contratos.json")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setLista)
      .catch(() => setErro(true));
  }, []);

  const anos = useMemo(() => [...new Set((lista ?? []).map((c) => c.ano))].sort((a, b) => b - a), [lista]);
  const procs = useMemo(() => [...new Set((lista ?? []).map((c) => c.tipoprocedimento))].sort(), [lista]);

  const filtrada = useMemo(() => {
    if (!lista) return [];
    const t = semAcentos(q.trim());
    const out = lista.filter(
      (c) =>
        (!ano || String(c.ano) === ano) &&
        (!proc || c.tipoprocedimento === proc) &&
        (!area || areaDe(c.cpv).id === area) &&
        (!t || semAcentos(c.objeto + " " + c.adjudicatario).includes(t)),
    );
    const dir = desc ? -1 : 1;
    out.sort((a, b) => {
      if (campo === "valor") return (a.valor_contratual - b.valor_contratual) * dir;
      if (campo === "data") return a.data_celebracao.localeCompare(b.data_celebracao) * dir;
      if (campo === "objeto") return a.objeto.localeCompare(b.objeto, "pt") * dir;
      return empresa(a.adjudicatario).nome.localeCompare(empresa(b.adjudicatario).nome, "pt") * dir;
    });
    return out;
  }, [lista, q, ano, proc, area, campo, desc]);

  const total = filtrada.reduce((s, c) => s + c.valor_contratual, 0);
  const paginas = Math.max(1, Math.ceil(filtrada.length / porPagina));
  const pg = Math.min(pagina, paginas - 1);
  const visiveis = filtrada.slice(pg * porPagina, pg * porPagina + porPagina);

  function ordenar(c: Campo) {
    if (campo === c) setDesc(!desc);
    else {
      setCampo(c);
      setDesc(c === "valor" || c === "data");
    }
    setPagina(0);
  }

  const campoCls =
    "rounded-lg border border-linha bg-fundo px-3 py-2 text-base text-tinta outline-none focus:border-tinta md:text-sm";

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
        <label>
          <span className="sr-only">Pesquisar contratos</span>
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPagina(0);
            }}
            placeholder="Pesquisar objeto ou empresa…"
            className={`${campoCls} w-full bg-suave`}
          />
        </label>
        <label>
          <span className="sr-only">Ano</span>
          <select value={ano} onChange={(e) => (setAno(e.target.value), setPagina(0))} className={`${campoCls} w-full`}>
            <option value="">Todos os anos</option>
            {anos.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Área</span>
          <select value={area} onChange={(e) => (setArea(e.target.value), setPagina(0))} className={`${campoCls} w-full`}>
            <option value="">Todas as áreas</option>
            {[...AREAS, OUTRAS].map((a) => (
              <option key={a.id} value={a.id}>
                {a.nome}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Tipo de procedimento</span>
          <select value={proc} onChange={(e) => (setProc(e.target.value), setPagina(0))} className={`${campoCls} w-full`}>
            <option value="">Todos os procedimentos</option>
            {procs.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-texto" aria-live="polite">
        {lista === null ? (
          erro ? "Não foi possível carregar os contratos." : "A carregar…"
        ) : (
          <>
            <strong className="text-tinta">{numero(filtrada.length)}</strong> contratos ·{" "}
            <strong className="text-tinta">{eur(total)}</strong> no total
          </>
        )}
      </p>

      <div className="mt-3 overflow-hidden rounded-xl border border-linha">
        <div className="hidden grid-cols-[96px_1fr_230px_140px] gap-4 bg-cinza px-4 py-3 text-sm text-apagado md:grid">
          <Cab ativo={campo === "data"} desc={desc} onClick={() => ordenar("data")}>Data</Cab>
          <Cab ativo={campo === "objeto"} desc={desc} onClick={() => ordenar("objeto")}>Objeto</Cab>
          <Cab ativo={campo === "adjudicatario"} desc={desc} onClick={() => ordenar("adjudicatario")}>Adjudicatário</Cab>
          <Cab ativo={campo === "valor"} desc={desc} onClick={() => ordenar("valor")} className="justify-end text-right">
            Valor
          </Cab>
        </div>
        <ul>
          {visiveis.map((c) => {
            const e = empresa(c.adjudicatario);
            const open = aberto === c.idcontrato;
            return (
              <li key={c.idcontrato} className="border-t border-linha">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setAberto(open ? null : c.idcontrato)}
                  className="grid w-full gap-x-4 gap-y-1 px-4 py-3 text-left transition hover:bg-suave md:grid-cols-[96px_1fr_230px_140px]"
                >
                  <span className="text-sm tabular-nums text-apagado">{data(c.data_celebracao)}</span>
                  <span className="text-sm font-medium text-tinta">{c.objeto}</span>
                  <span className="text-sm text-texto">{e.nome}</span>
                  <span className="text-sm font-semibold tabular-nums text-tinta md:text-right">{eur(c.valor_contratual)}</span>
                </button>
                {open && (
                  <dl className="grid gap-x-8 gap-y-3 bg-suave px-4 py-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <dt className="text-apagado">Procedimento</dt>
                      <dd className="text-tinta">{c.tipoprocedimento}</dd>
                    </div>
                    <div>
                      <dt className="text-apagado">O que se compra (CPV)</dt>
                      <dd className="text-tinta">{c.cpv ? `${divisaoNome(c.cpv) ?? c.cpvd ?? c.cpv}${c.cpvd && divisaoNome(c.cpv) ? " · " + c.cpvd : ""}` : "—"}</dd>
                    </div>
                    {c.fund && (
                      <div>
                        <dt className="text-apagado">Fundamentação legal</dt>
                        <dd className="text-tinta">{c.fund.replace(" do Código dos Contratos Públicos", "")}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-apagado">Tipo de contrato</dt>
                      <dd className="text-tinta">{c.tipo_contrato}</dd>
                    </div>
                    <div>
                      <dt className="text-apagado">NIF do adjudicatário</dt>
                      <dd className="text-tinta">{e.nif ?? "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-apagado">Concorrentes</dt>
                      <dd className="text-tinta">{c.n_concorrentes ?? "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-apagado">Prazo de execução</dt>
                      <dd className="text-tinta">{c.prazo_execucao != null ? `${c.prazo_execucao} dias` : "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-apagado">Fecho do contrato</dt>
                      <dd className="text-tinta">{data(c.data_fecho)}</dd>
                    </div>
                    <div className="sm:col-span-2 lg:col-span-3">
                      <a href={`https://www.base.gov.pt/Base4/pt/detalhe/?type=contratos&id=${c.idcontrato}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-acento underline underline-offset-2">
                        Ver no Portal BASE ↗
                      </a>
                    </div>
                    {c.link_pecas_proc && (
                      <div className="sm:col-span-2 lg:col-span-3">
                        <a href={c.link_pecas_proc} target="_blank" rel="noopener noreferrer" className="font-semibold text-acento underline underline-offset-2">
                          Peças do procedimento ↗
                        </a>
                      </div>
                    )}
                  </dl>
                )}
              </li>
            );
          })}
          {lista && visiveis.length === 0 && <li className="px-4 py-12 text-center text-apagado">Sem resultados.</li>}
        </ul>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <label className="flex items-center gap-2 text-texto">
          Por página
          <select value={porPagina} onChange={(e) => (setPorPagina(Number(e.target.value)), setPagina(0))} className={campoCls}>
            {[10, 30, 50, 100].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPagina(Math.max(0, pg - 1))}
            disabled={pg === 0}
            className="rounded-full border border-linha px-4 py-2 font-medium disabled:opacity-40"
          >
            ← Anterior
          </button>
          <span className="tabular-nums text-apagado">
            {pg + 1} / {paginas}
          </span>
          <button
            type="button"
            onClick={() => setPagina(Math.min(paginas - 1, pg + 1))}
            disabled={pg >= paginas - 1}
            className="rounded-full border border-linha px-4 py-2 font-medium disabled:opacity-40"
          >
            Seguinte →
          </button>
        </div>
      </div>
    </div>
  );
}
