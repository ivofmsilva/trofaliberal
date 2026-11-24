"use client";

// Caixa de procura nas atas da Câmara e da Assembleia. Pergunta ao servidor (/atas/procurar) e mostra as atas com os excertos.
// O endereço guarda a pesquisa (?q=…), para se poder partilhar.
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Excerto = { texto: string; marcas: [number, number][] };
type Resultado = { orgao: "C" | "A"; data: string | null; ano: number | null; numero: string | number | null; url: string; vezes: number; excertos: Excerto[] };
type Resposta = { gerado: string; total: number; atasNoIndice: number; anos: number[]; resultados: Resultado[] };

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const dataLonga = (iso: string) => {
  const [a, m, d] = iso.split("-").map(Number);
  return `${d} de ${MESES[m - 1]} de ${a}`;
};
const EXEMPLOS = ["metro", "Alvarelhos", "IMI", "\"parque das azenhas\"", "estacionamento"];

function Marcado({ e }: { e: Excerto }) {
  const partes: React.ReactNode[] = [];
  let pos = 0;
  e.marcas.forEach(([i, f], k) => {
    if (i < pos) return;
    partes.push(e.texto.slice(pos, i));
    partes.push(
      <mark key={k} className="rounded bg-amber-200 px-0.5 text-tinta">
        {e.texto.slice(i, f)}
      </mark>,
    );
    pos = f;
  });
  partes.push(e.texto.slice(pos));
  return <>{partes}</>;
}

export default function PesquisaAtas() {
  const base = usePathname().startsWith("/dados") ? "/dados" : "";
  const [q, setQ] = useState("");
  const [orgao, setOrgao] = useState("");
  const [ano, setAno] = useState("");
  const [resp, setResp] = useState<Resposta | null>(null);
  const [lista, setLista] = useState<Resultado[]>([]);
  const [aCarregar, setACarregar] = useState(false);
  const [erro, setErro] = useState(false);
  const pedido = useRef(0);

  // pesquisa que vem no endereço
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("q")) setQ(p.get("q") ?? "");
    if (p.get("orgao")) setOrgao(p.get("orgao") ?? "");
    if (p.get("ano")) setAno(p.get("ano") ?? "");
  }, []);

  function buscar(inicio: number) {
    const n = ++pedido.current;
    const params = new URLSearchParams({ q: q.trim(), inicio: String(inicio) });
    if (orgao) params.set("orgao", orgao);
    if (ano) params.set("ano", ano);
    setACarregar(true);
    setErro(false);
    fetch(`${base}/atas/procurar?${params}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((r: Resposta) => {
        if (n !== pedido.current) return;
        setResp(r);
        setLista((antes) => (inicio === 0 ? r.resultados : [...antes, ...r.resultados]));
      })
      .catch(() => n === pedido.current && setErro(true))
      .finally(() => n === pedido.current && setACarregar(false));
  }

  useEffect(() => {
    const t = setTimeout(() => {
      buscar(0);
      const p = new URLSearchParams();
      if (q.trim()) p.set("q", q.trim());
      if (orgao) p.set("orgao", orgao);
      if (ano) p.set("ano", ano);
      const s = p.toString();
      window.history.replaceState(null, "", s ? `?${s}` : window.location.pathname);
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, orgao, ano]);

  const campo = "rounded-lg border border-linha bg-fundo px-3 py-2 text-base text-tinta outline-none focus:border-tinta md:text-sm";
  const temPesquisa = q.trim().length >= 2;

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <label>
          <span className="sr-only">Procurar nas atas</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Procurar nas atas (ex.: metro, Alvarelhos, IMI)…"
            className={`${campo} w-full bg-suave`}
          />
        </label>
        <label>
          <span className="sr-only">Órgão</span>
          <select value={orgao} onChange={(e) => setOrgao(e.target.value)} className={`${campo} w-full`}>
            <option value="">Câmara e Assembleia</option>
            <option value="C">Só a Câmara</option>
            <option value="A">Só a Assembleia</option>
          </select>
        </label>
        <label>
          <span className="sr-only">Ano</span>
          <select value={ano} onChange={(e) => setAno(e.target.value)} className={`${campo} w-full`}>
            <option value="">Todos os anos</option>
            {(resp?.anos ?? []).map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>
      </form>

      {!temPesquisa && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-texto">
          <span>Experimenta:</span>
          {EXEMPLOS.map((x) => (
            <button key={x} type="button" onClick={() => setQ(x)} className="rounded-full border border-linha px-3 py-1 transition hover:border-tinta hover:text-tinta">
              {x}
            </button>
          ))}
        </div>
      )}

      <p className="mt-4 text-sm text-texto" aria-live="polite">
        {erro
          ? "Não foi possível procurar agora. Tenta outra vez daqui a pouco."
          : !temPesquisa
            ? resp
              ? `${resp.atasNoIndice} atas, de 2011 até hoje. Escreve pelo menos duas letras.`
              : ""
            : aCarregar && !resp
              ? "A procurar…"
              : resp
                ? resp.total === 0
                  ? "Nenhuma ata tem todas estas palavras."
                  : `${resp.total} ${resp.total === 1 ? "ata tem" : "atas têm"} ${q.trim().includes(" ") ? "todas as palavras" : "esta palavra"}, da mais recente para a mais antiga.`
                : ""}
      </p>

      {temPesquisa && (
        <ol className="mt-4 space-y-4">
          {lista.map((r) => (
            <li key={r.url} className="rounded-xl border border-linha bg-fundo p-4 md:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-semibold text-tinta">
                  {r.orgao === "C" ? "Câmara Municipal" : "Assembleia Municipal"} ·{" "}
                  {r.data ? dataLonga(r.data) : r.ano ?? "sem data"}
                  {r.numero != null && <span className="font-normal text-apagado"> · Ata n.º {r.numero}</span>}
                </h3>
                <span className="text-sm text-apagado">{r.vezes === 1 ? "1 vez" : `${r.vezes} vezes`}</span>
              </div>
              <ul className="mt-2 space-y-2">
                {r.excertos.map((e, i) => (
                  <li key={i} className="text-sm leading-relaxed text-texto">
                    <Marcado e={e} />
                  </li>
                ))}
              </ul>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-medium text-tinta underline underline-offset-2">
                Abrir a ata no site do município (PDF) ↗
              </a>
            </li>
          ))}
        </ol>
      )}

      {temPesquisa && resp && lista.length < resp.total && (
        <button
          type="button"
          onClick={() => buscar(lista.length)}
          disabled={aCarregar}
          className="mt-4 rounded-full border border-tinta px-5 py-2 text-sm font-medium text-tinta transition hover:bg-tinta hover:text-fundo disabled:opacity-50"
        >
          {aCarregar ? "A carregar…" : `Mostrar mais (${resp.total - lista.length})`}
        </button>
      )}
    </div>
  );
}
