"use client";

import { useEffect, useMemo, useState } from "react";
import Cab from "./Cab";
import { numero, tituloProjeto } from "@/lib/dados/formatar";
import type { Projeto } from "@/lib/dados/transparencia";

type Campo = "valor" | "titulo" | "programa";

const semAcentos = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const eur = (v: number) => numero(v, Number.isInteger(v) ? 0 : 2) + " €";
const data = (iso: string | null) => (iso ? iso.split("-").reverse().join("/") : "—");

function curto(t: string, n = 150) {
  const um = t.replace(/\s+/g, " ").trim();
  if (um.length <= n) return um;
  const corte = um.slice(0, n);
  return corte.slice(0, Math.max(corte.lastIndexOf(" "), n - 30)) + "…";
}

export default function TabelaFundos({ ficheiro, mostrarBeneficiario }: { ficheiro: "fundos-municipio" | "fundos-concelho"; mostrarBeneficiario: boolean }) {
  const [lista, setLista] = useState<Projeto[] | null>(null);
  const [erro, setErro] = useState(false);
  const [q, setQ] = useState("");
  const [programa, setPrograma] = useState("");
  const [estado, setEstado] = useState("");
  const [campo, setCampo] = useState<Campo>("valor");
  const [desc, setDesc] = useState(true);
  const [porPagina, setPorPagina] = useState(30);
  const [pagina, setPagina] = useState(0);
  const [aberto, setAberto] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/dados/data/${ficheiro}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setLista)
      .catch(() => setErro(true));
  }, [ficheiro]);

  const hoje = new Date().toISOString().slice(0, 10);
  const programas = useMemo(() => [...new Set((lista ?? []).map((p) => p.programa))].sort(), [lista]);
  const estados = useMemo(() => [...new Set((lista ?? []).map((p) => p.estado))].sort(), [lista]);

  const filtrada = useMemo(() => {
    if (!lista) return [];
    const t = semAcentos(q.trim());
    const out = lista.filter(
      (p) =>
        (!programa || p.programa === programa) &&
        (!estado || p.estado === estado) &&
        (!t || semAcentos(p.titulo + " " + p.beneficiario + " " + p.codigo_projeto).includes(t)),
    );
    const dir = desc ? -1 : 1;
    out.sort((a, b) => {
      if (campo === "valor") return (a.valor_aprovado_municipio - b.valor_aprovado_municipio) * dir;
      if (campo === "programa") return a.programa.localeCompare(b.programa, "pt") * dir;
      return tituloProjeto(a.titulo).localeCompare(tituloProjeto(b.titulo), "pt") * dir;
    });
    return out;
  }, [lista, q, programa, estado, campo, desc]);

  const total = filtrada.reduce((s, p) => s + p.valor_aprovado_municipio, 0);
  const paginas = Math.max(1, Math.ceil(filtrada.length / porPagina));
  const pg = Math.min(pagina, paginas - 1);
  const visiveis = filtrada.slice(pg * porPagina, pg * porPagina + porPagina);

  function ordenar(c: Campo) {
    if (campo === c) setDesc(!desc);
    else {
      setCampo(c);
      setDesc(c === "valor");
    }
    setPagina(0);
  }

  const campoCls =
    "rounded-lg border border-linha bg-fundo px-3 py-2 text-base text-tinta outline-none focus:border-tinta md:text-sm";
  const cols = mostrarBeneficiario ? "md:grid-cols-[110px_1fr_220px_130px]" : "md:grid-cols-[110px_1fr_130px]";

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <label>
          <span className="sr-only">Pesquisar projetos</span>
          <input
            type="search"
            value={q}
            onChange={(e) => (setQ(e.target.value), setPagina(0))}
            placeholder="Pesquisar projeto ou beneficiário…"
            className={`${campoCls} w-full bg-suave`}
          />
        </label>
        <label>
          <span className="sr-only">Programa</span>
          <select value={programa} onChange={(e) => (setPrograma(e.target.value), setPagina(0))} className={`${campoCls} w-full`}>
            <option value="">Todos os programas</option>
            {programas.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Estado</span>
          <select value={estado} onChange={(e) => (setEstado(e.target.value), setPagina(0))} className={`${campoCls} w-full`}>
            <option value="">Todos os estados</option>
            {estados.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-texto" aria-live="polite">
        {lista === null ? (
          erro ? "Não foi possível carregar os projetos." : "A carregar…"
        ) : (
          <>
            <strong className="text-tinta">{numero(filtrada.length)}</strong> projetos ·{" "}
            <strong className="text-tinta">{eur(total)}</strong> de valor aprovado neste território
          </>
        )}
      </p>

      <div className="mt-3 overflow-hidden rounded-xl border border-linha">
        <div className={`hidden gap-4 bg-cinza px-4 py-3 text-sm text-apagado md:grid ${cols}`}>
          <Cab ativo={campo === "programa"} desc={desc} onClick={() => ordenar("programa")}>Programa</Cab>
          <Cab ativo={campo === "titulo"} desc={desc} onClick={() => ordenar("titulo")}>Projeto</Cab>
          {mostrarBeneficiario && <span className="font-medium">Beneficiário</span>}
          <Cab ativo={campo === "valor"} desc={desc} onClick={() => ordenar("valor")} className="justify-end text-right">
            Valor aprovado
          </Cab>
        </div>
        <ul>
          {visiveis.map((p) => {
            const open = aberto === p.codigo_projeto;
            return (
              <li key={p.codigo_projeto} className="border-t border-linha">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setAberto(open ? null : p.codigo_projeto)}
                  className={`grid w-full gap-x-4 gap-y-1 px-4 py-3 text-left transition hover:bg-suave ${cols}`}
                >
                  <span className="text-sm text-apagado">
                    {p.programa}
                    <span className="block text-xs">{p.estado}</span>
                  </span>
                  <span className="text-sm font-medium text-tinta">{curto(tituloProjeto(p.titulo))}</span>
                  {mostrarBeneficiario && <span className="text-sm text-texto">{curto(p.beneficiario, 70)}</span>}
                  <span className="text-sm font-semibold tabular-nums text-tinta md:text-right">{eur(p.valor_aprovado_municipio)}</span>
                </button>
                {open && (
                  <div className="space-y-4 bg-suave px-4 py-4 text-sm">
                    <p className="whitespace-pre-line text-texto">{tituloProjeto(p.titulo)}</p>
                    <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <dt className="text-apagado">{p.n_beneficiarios > 1 ? `Beneficiários (${p.n_beneficiarios})` : "Beneficiário"}</dt>
                        <dd className="text-tinta">{p.beneficiario}</dd>
                      </div>
                      <div>
                        <dt className="text-apagado">Código do projeto</dt>
                        <dd className="text-tinta">{p.codigo_projeto}</dd>
                      </div>
                      <div>
                        <dt className="text-apagado">Execução neste território</dt>
                        <dd className="text-tinta">{numero(p.percentagem_localizacao_municipio, 1)}%</dd>
                      </div>
                      <div>
                        <dt className="text-apagado">Estado</dt>
                        <dd className="text-tinta">{p.estado}</dd>
                      </div>
                      <div>
                        <dt className="text-apagado">Conclusão efetiva</dt>
                        <dd className="text-tinta">{data(p.data_efetiva_conclusao)}</dd>
                      </div>
                    </dl>
                    {p.estado === "Em execução" && p.data_efetiva_conclusao && p.data_efetiva_conclusao < hoje && (
                      <p className="text-xs text-apagado">
                        O estado é o que a fonte regista: o projeto continua “Em execução” nos ficheiros, apesar de a data de conclusão já ter passado.
                      </p>
                    )}
                  </div>
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
          <button type="button" onClick={() => setPagina(Math.max(0, pg - 1))} disabled={pg === 0} className="rounded-full border border-linha px-4 py-2 font-medium disabled:opacity-40">
            ← Anterior
          </button>
          <span className="tabular-nums text-apagado">
            {pg + 1} / {paginas}
          </span>
          <button type="button" onClick={() => setPagina(Math.min(paginas - 1, pg + 1))} disabled={pg >= paginas - 1} className="rounded-full border border-linha px-4 py-2 font-medium disabled:opacity-40">
            Seguinte →
          </button>
        </div>
      </div>
    </div>
  );
}
