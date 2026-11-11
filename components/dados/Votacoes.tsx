"use client";

import { useEffect, useMemo, useState } from "react";

type Totais = { favor: number; contra: number; abstencoes: number; brancos: number };
type Sentidos = Record<string, number>;
type Ponto = {
  num?: number | null;
  area?: string | null;
  gruposLista?: { favor: string[]; contra: string[]; abstencoes: string[] } | null;
  seccao: "antes" | "ordem";
  assunto: string;
  resultado: "aprovado" | "rejeitado" | "informação" | "outro";
  tipo: "unanimidade" | "maioria" | "escrutínio secreto" | null;
  totais: Totais | null;
  grupos: { favor: Sentidos; contra: Sentidos; abstencoes: Sentidos; brancos: Sentidos } | null;
  nota: string | null;
  texto: string;
  ilegivel?: boolean;
};
type Sessao = { data: string | null; ano?: number; tipo: string; url: string; semTexto?: boolean; ocr?: boolean; lacunas?: number[]; itens: Ponto[] };

const semAcentos = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const dataLonga = (iso: string | null, ano?: number) => {
  if (!iso) return ano ? `Reunião de ${ano}` : "Data desconhecida";
  const [a, m, d] = iso.split("-").map(Number);
  return `${d} de ${MESES[m - 1]} de ${a}`;
};

const NOMES: Record<string, string> = {
  "PSD/CDS-PP": "Unidos pela Trofa",
  PSD: "PSD",
  "CDS-PP": "CDS-PP",
  "PS-PAN-L": "Trofa em Primeiro",
  PS: "PS",
  PAN: "PAN",
  TDT: "TDT",
  CH: "Chega",
  "PCP/PEV": "PCP/PEV",
  IPM: "IPM",
  BE: "BE",
};

const SENTIDOS = [
  { id: "favor", rotulo: "A favor", cor: "#151515" },
  { id: "contra", rotulo: "Contra", cor: "#8c8c87" },
  { id: "abstencoes", rotulo: "Abstenções", cor: "#c9c9c3" },
  { id: "brancos", rotulo: "Brancos", cor: "#e4e4e0" },
] as const;

function Voto({ p }: { p: Ponto }) {
  if (!p.totais) return null;
  const t = p.totais;
  const soma = t.favor + t.contra + t.abstencoes + t.brancos;
  if (soma === 0) return null;
  return (
    <div className="mt-3">
      <div className="flex h-2.5 overflow-hidden rounded-full bg-linha" role="img" aria-label={`${t.favor} a favor, ${t.contra} contra, ${t.abstencoes} abstenções, ${t.brancos} brancos`}>
        {SENTIDOS.map((s) => {
          const n = t[s.id];
          return n > 0 ? <div key={s.id} style={{ width: `${(n / soma) * 100}%`, background: s.cor }} /> : null;
        })}
      </div>
      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm tabular-nums text-texto">
        {SENTIDOS.filter((s) => t[s.id] > 0).map((s) => (
          <span key={s.id} className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm border border-linha" style={{ background: s.cor }} />
            {s.rotulo}: <strong className="text-tinta">{t[s.id]}</strong>
          </span>
        ))}
      </p>
      {p.grupos ? (
        <dl className="mt-3 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
          {SENTIDOS.map((s) => {
            const g = p.grupos![s.id];
            const entradas = Object.entries(g ?? {});
            if (!entradas.length) return null;
            return (
              <div key={s.id}>
                <dt className="text-apagado">{s.rotulo}</dt>
                <dd className="text-tinta">{entradas.map(([nome, n]) => `${NOMES[nome] ?? nome} ${n}`).join(" · ")}</dd>
              </div>
            );
          })}
        </dl>
      ) : p.gruposLista ? (
        <dl className="mt-3 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
          {(["favor", "contra", "abstencoes"] as const).map((k) => {
            const l = p.gruposLista![k];
            if (!l.length) return null;
            return (
              <div key={k}>
                <dt className="text-apagado">{SENTIDOS.find((x) => x.id === k)!.rotulo}</dt>
                <dd className="text-tinta">{l.join(" · ")}</dd>
              </div>
            );
          })}
        </dl>
      ) : (
        p.tipo === "maioria" &&
        t.brancos === 0 && <p className="mt-2 text-xs text-apagado">A divisão por grupo não consta de forma clara no documento original; lê o texto abaixo.</p>
      )}
    </div>
  );
}

export default function Votacoes({ ficheiro = "assembleia-votos", sessao = "sessão" }: { ficheiro?: string; sessao?: string }) {
  const [sessoes, setSessoes] = useState<Sessao[] | null>(null);
  const [erro, setErro] = useState(false);
  const [q, setQ] = useState("");
  const [soDivididas, setSoDivididas] = useState(false);
  const [comInfo, setComInfo] = useState(false);
  const [ano, setAno] = useState("");
  const [aberta, setAberta] = useState<string | null>(null);
  const [limite, setLimite] = useState(10);
  const [cobertura, setCobertura] = useState<Record<string, { publicadas: number; reunioes: number; faltam: number[] }> | null>(null);

  useEffect(() => {
    fetch(`/dados/data/${ficheiro}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => {
        setSessoes(j.sessoes);
        setCobertura(j.cobertura ?? null);
      })
      .catch(() => setErro(true));
  }, [ficheiro]);

  const anos = useMemo(
    () => [...new Set((sessoes ?? []).map((s) => s.data?.slice(0, 4) ?? (s.ano ? String(s.ano) : "")).filter(Boolean))].sort().reverse(),
    [sessoes],
  );

  const visiveis = useMemo(() => {
    if (!sessoes) return [];
    const t = semAcentos(q.trim());
    return sessoes
      .filter((s) => !ano || (s.data?.slice(0, 4) ?? String(s.ano ?? "")) === ano)
      .map((s) => ({
        ...s,
        itens: s.itens.filter(
          (p) =>
            (comInfo || p.tipo || p.ilegivel || p.resultado === "aprovado" || p.resultado === "rejeitado") &&
            (!soDivididas || p.tipo === "maioria" || (p.totais && (p.totais.contra > 0 || p.totais.abstencoes > 0))) &&
            (!t || semAcentos(p.assunto).includes(t)),
        ),
      }))
      .filter((s) => s.itens.length > 0 || (s.semTexto && !q.trim() && !soDivididas));
  }, [sessoes, q, soDivididas, comInfo, ano]);

  const totalPontos = visiveis.reduce((n, s) => n + s.itens.length, 0);
  // A lista é longa: mostram-se as mais recentes e o resto expande-se (com pesquisa, filtro ou ano escolhido mostra-se tudo).
  const completa = Boolean(q.trim()) || soDivididas || Boolean(ano);
  const mostradas = completa ? visiveis : visiveis.slice(0, limite);
  const restantes = visiveis.length - mostradas.length;
  const campo = "rounded-lg border border-linha bg-fundo px-3 py-2 text-base text-tinta outline-none focus:border-tinta md:text-sm";

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <label>
          <span className="sr-only">Pesquisar nas votações</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Pesquisar assunto (ex.: IMI, orçamento, empréstimo)…" className={`${campo} w-full bg-suave`} />
        </label>
        <label>
          <span className="sr-only">Ano</span>
          <select value={ano} onChange={(e) => setAno(e.target.value)} className={`${campo} w-full`}>
            <option value="">Todos os anos</option>
            {anos.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-3 flex flex-col gap-2 text-sm text-texto sm:flex-row sm:gap-6">
        <label className="flex cursor-pointer items-start gap-2">
          <input type="checkbox" checked={soDivididas} onChange={(e) => setSoDivididas(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-black" />
          Só as votações em que houve votos contra ou abstenções
        </label>
        <label className="flex cursor-pointer items-start gap-2">
          <input type="checkbox" checked={comInfo} onChange={(e) => setComInfo(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-black" />
          Mostrar também as informações e comunicações (sem votação)
        </label>
      </div>

      <p className="mt-4 text-sm text-texto" aria-live="polite">
        {sessoes === null ? (erro ? "Não foi possível carregar as votações." : "A carregar…") : (
          <>
            <strong className="text-tinta">{totalPontos}</strong> {comInfo ? "pontos" : "pontos votados"} em <strong className="text-tinta">{visiveis.length}</strong> {sessao === "reunião" ? "reuniões" : "sessões"}
          </>
        )}
      </p>

      <div className="mt-3 divide-y divide-linha border-y border-linha">
        {mostradas.map((s) => {
          const id = s.url;
          const open = aberta === id || Boolean(q.trim());
          return (
            <section key={id} className="py-1">
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setAberta(aberta === id ? null : id)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span>
                  <span className="text-lg font-bold text-tinta">{dataLonga(s.data, s.ano)}</span>
                  <span className="ml-3 text-sm text-apagado">{sessao} {s.tipo}</span>
                </span>
                <span className="flex items-center gap-3 text-sm text-apagado">
                  {s.semTexto ? "só digitalizada" : `${s.itens.length} pontos`}
                  <span aria-hidden className={`text-xl font-bold text-tinta transition ${open ? "rotate-45" : ""}`}>
                    +
                  </span>
                </span>
              </button>
              {open && (
                <div className="pb-5">
                  {s.semTexto && (
                    <p className="mb-3 text-sm text-texto">
                      Este documento é uma digitalização, sem texto que se possa ler automaticamente. Abre o PDF para ver as deliberações.
                    </p>
                  )}
                  {s.ocr && (
                    <p className="mb-3 rounded-lg bg-suave px-3 py-2 text-sm text-texto">
                      Este documento é uma digitalização: o texto foi lido por reconhecimento automático e pode ter falhas.
                      {s.itens.some((p) => p.ilegivel) && " Os pontos marcados como “não legível” não puderam ser lidos."}
                      {s.lacunas && s.lacunas.length > 0 && ` Não foi possível ler o ponto ${s.lacunas.join(", ")}.`} Confere sempre com o PDF.
                    </p>
                  )}
                  <ul className="space-y-3">
                    {s.itens.map((p, i) => (
                      <li key={i} className="rounded-xl border border-linha bg-fundo p-4">
                        <p className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-apagado">
                          <span>
                            {p.num ? `Ponto ${p.num} · ` : ""}
                            {p.seccao === "antes" ? "Antes da ordem do dia" : "Ordem do dia"}
                            {p.area ? ` · ${p.area}` : ""}
                          </span>
                          {p.ilegivel && <span className="rounded-full border border-linha px-2 py-0.5 normal-case tracking-normal text-texto">Voto não legível na digitalização</span>}
                          {!p.ilegivel && p.resultado !== "outro" && (
                            <span className="rounded-full border border-linha px-2 py-0.5 normal-case tracking-normal text-texto">
                              {p.resultado === "informação" ? "Informação" : p.resultado === "rejeitado" ? "Rejeitado" : "Aprovado"}
                              {p.tipo ? (p.tipo === "escrutínio secreto" ? " em escrutínio secreto" : ` por ${p.tipo}`) : ""}
                            </span>
                          )}
                        </p>
                        <p className="mt-2 text-tinta">{p.assunto}</p>
                        <Voto p={p} />
                        {p.nota && <p className="mt-2 text-xs text-apagado">{p.nota}</p>}
                        {p.texto && (p.totais || p.tipo === "maioria" || p.tipo === "escrutínio secreto" || p.resultado === "outro") && (
                          <details className="mt-3 text-sm">
                            <summary className="cursor-pointer text-apagado hover:text-tinta">Texto original</summary>
                            <p className="mt-2 text-texto">{p.texto}</p>
                          </details>
                        )}
                      </li>
                    ))}
                  </ul>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-tinta underline underline-offset-2">
                    Abrir o PDF original ↗
                  </a>
                </div>
              )}
            </section>
          );
        })}
        {sessoes && visiveis.length === 0 && <p className="py-12 text-center text-apagado">Sem resultados.</p>}
      </div>
      {restantes > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={() => setLimite((l) => l + 10)} className="rounded-full border border-linha bg-fundo px-5 py-2.5 text-sm font-semibold text-tinta transition hover:border-tinta">
            Mostrar mais {Math.min(10, restantes)} {sessao === "reunião" ? "reuniões" : "sessões"}
          </button>
          <button type="button" onClick={() => setLimite(visiveis.length)} className="rounded-full px-3 py-2.5 text-sm text-apagado underline underline-offset-2 hover:text-tinta">
            Mostrar todas ({restantes} em falta)
          </button>
        </div>
      )}

      {cobertura && (
        <details className="mt-6 rounded-xl border border-linha bg-suave p-4 text-sm">
          <summary className="cursor-pointer font-semibold text-tinta">Reuniões sem deliberações publicadas</summary>
          <p className="mt-3 max-w-2xl text-texto">
            A Câmara não publica as deliberações de todas as reuniões. Pelo número da ata no nome dos ficheiros, estas são as reuniões de cada ano
            de que não há deliberações no site do município (por isso não aparecem aqui). Nos anos de 2017 e 2018 os nomes não trazem número.
          </p>
          <ul className="mt-3 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {Object.entries(cobertura)
              .sort((a, b) => Number(b[0]) - Number(a[0]))
              .map(([a, c]) => (
                <li key={a} className="text-texto">
                  <strong className="text-tinta">{a}:</strong> {c.publicadas} de {c.reunioes}
                  {c.faltam.length > 0 ? ` (sem as das reuniões n.º ${c.faltam.join(", ")})` : ""}
                </li>
              ))}
          </ul>
        </details>
      )}
    </div>
  );
}
