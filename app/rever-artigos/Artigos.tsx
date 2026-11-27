"use client";

import { useEffect, useState } from "react";

// Mostra os artigos para rever. O texto está cifrado no site (cifrado.ts) e a chave vem no fim do link (#k=...),
// que o navegador nunca envia ao servidor: sem o link certo, a página não mostra nada.
// Cada artigo tem o texto original e, à parte, as sugestões de revisão (versão revista, o que muda e porquê, o que confirmar).
type Bloco = { p: string } | { h: string } | { tabela: string[][] } | { fontes: [string, string][] };
type Sugestao = { original: string; proposta: string; porque: string };
type Artigo = {
  tema: string;
  titulo: string;
  blocos: Bloco[];
  proposta?: { titulos?: string[]; blocos: Bloco[] };
  sugestoes?: Sugestao[];
  confirmar?: string[];
};

const base64 = (s: string) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0));

async function decifrar(cifrado: { iv: string; dados: string }, chave: string): Promise<Artigo[]> {
  const k = await crypto.subtle.importKey("raw", base64(chave), "AES-GCM", false, ["decrypt"]);
  const texto = await crypto.subtle.decrypt({ name: "AES-GCM", iv: base64(cifrado.iv) }, k, base64(cifrado.dados));
  return JSON.parse(new TextDecoder().decode(texto));
}

// ⟦...⟧ = valor ainda por preencher ou confirmar, a amarelo.
function Texto({ t }: { t: string }) {
  return (
    <>
      {t.split(/⟦(.*?)⟧/).map((x, i) =>
        i % 2 ? (
          <mark key={i} className="rounded bg-sun/60 px-1">
            {x}
          </mark>
        ) : (
          x
        ),
      )}
    </>
  );
}

function Blocos({ blocos }: { blocos: Bloco[] }) {
  return (
    <div className="space-y-5 text-lg leading-relaxed text-ink/85">
      {blocos.map((b, j) => {
        if ("p" in b)
          return (
            <p key={j}>
              <Texto t={b.p} />
            </p>
          );
        if ("h" in b)
          return (
            <h3 key={j} className="font-display pt-3 text-2xl font-bold text-navy">
              {b.h}
            </h3>
          );
        if ("tabela" in b)
          return (
            <div key={j} className="overflow-x-auto">
              <table className="w-full min-w-[28rem] border-collapse text-base">
                <thead>
                  <tr>
                    {b.tabela[0].map((c) => (
                      <th key={c} className="border-b-2 border-navy/20 px-3 py-2 text-left font-bold text-navy">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.tabela.slice(1).map((linha) => (
                    <tr key={linha[0]}>
                      {linha.map((c, k) => (
                        <td key={k} className="border-b border-navy/10 px-3 py-2">
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        return (
          <div key={j} className="rounded-2xl bg-mist p-5 text-base">
            <p className="font-bold text-navy">Fontes</p>
            <ul className="mt-2 space-y-1">
              {b.fontes.map(([texto, url]) => (
                <li key={url} className="ml-5 list-disc marker:text-pink">
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-cyan-dark underline">
                    {texto}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function Sugestoes({ a }: { a: Artigo }) {
  return (
    <div className="space-y-10">
      <p className="rounded-2xl bg-sun/30 px-5 py-4 text-base text-ink/85">
        Sugestões de revisão, feitas com ajuda de IA e conferidas com os factos que se conseguiram confirmar. Nada está decidido: o
        autor escolhe o que fica. A amarelo, o que falta confirmar ou escolher.
      </p>
      {a.proposta && (
        <div>
          <h3 className="font-display text-2xl font-bold text-navy">Versão revista</h3>
          {a.proposta.titulos && (
            <p className="mt-2 text-base text-ink/70">
              Títulos possíveis: {a.proposta.titulos.map((t, i) => (
                <span key={t}>
                  {i > 0 && " · "}«{t}»
                </span>
              ))}
            </p>
          )}
          <div className="mt-5 border-l-4 border-cyan pl-5">
            <Blocos blocos={a.proposta.blocos} />
          </div>
        </div>
      )}
      {a.sugestoes && (
        <div>
          <h3 className="font-display text-2xl font-bold text-navy">O que muda e porquê</h3>
          <ol className="mt-5 space-y-5">
            {a.sugestoes.map((s, i) => (
              <li key={i} className="rounded-2xl border border-navy/10 p-5 text-base leading-relaxed">
                <p className="text-ink/60">
                  <span className="mr-2 font-bold text-navy">{i + 1}.</span>
                  <span className="line-through decoration-pink/60">{s.original}</span>
                </p>
                <p className="mt-2 font-semibold text-navy">
                  → <Texto t={s.proposta} />
                </p>
                <p className="mt-2 text-ink/75">{s.porque}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
      {a.confirmar && (
        <div>
          <h3 className="font-display text-2xl font-bold text-navy">A confirmar antes de publicar</h3>
          <ul className="mt-4 space-y-2 text-base">
            {a.confirmar.map((c) => (
              <li key={c} className="ml-5 list-disc marker:text-pink">
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Artigos({ cifrado }: { cifrado: { iv: string; dados: string } }) {
  const [artigos, setArtigos] = useState<Artigo[] | null>(null);
  const [erro, setErro] = useState(false);
  const [vista, setVista] = useState<Record<number, "original" | "sugestoes">>({});

  useEffect(() => {
    // A chave vem no link; fica guardada nesta sessão, para a página continuar a abrir se o fim do link se perder.
    let chave = new URLSearchParams(window.location.hash.slice(1)).get("k");
    try {
      if (chave) sessionStorage.setItem("rever-artigos", chave);
      else chave = sessionStorage.getItem("rever-artigos");
    } catch {}
    if (!chave) {
      setErro(true);
      return;
    }
    decifrar(cifrado, chave).then(setArtigos, () => setErro(true));
  }, [cifrado]);

  if (erro)
    return <p className="text-lg text-ink/80">Este link não tem a chave dos artigos. Abre o link completo que te enviaram.</p>;
  if (!artigos) return <p className="text-lg text-ink/70">A abrir os artigos…</p>;

  const ir = (i: number) => document.getElementById(`artigo-${i + 1}`)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <ol className="space-y-2">
        {artigos.map((a, i) => (
          <li key={a.titulo}>
            <button
              type="button"
              onClick={() => ir(i)}
              className="w-full rounded-2xl bg-mist px-5 py-4 text-left transition hover:bg-navy hover:text-white"
            >
              <span className="block text-xs font-bold uppercase tracking-widest text-pink">
                Artigo {i + 1} · {a.tema}
              </span>
              <span className="font-display mt-1 block text-lg font-bold">{a.titulo}</span>
            </button>
          </li>
        ))}
      </ol>

      {artigos.map((a, i) => {
        const temSugestoes = !!(a.proposta || a.sugestoes || a.confirmar);
        const v = vista[i] ?? "original";
        return (
          <article key={a.titulo} id={`artigo-${i + 1}`} className="scroll-mt-24 border-t-4 border-navy/10 pt-10 mt-14">
            <p className="text-xs font-bold uppercase tracking-widest text-pink">
              Artigo {i + 1} de {artigos.length} · {a.tema}
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold leading-tight text-navy md:text-4xl">{a.titulo}</h2>
            {temSugestoes && (
              <div role="tablist" aria-label="Ver" className="mt-5 inline-flex rounded-full bg-mist p-1 text-sm font-bold">
                {(
                  [
                    ["original", "Texto original"],
                    ["sugestoes", "Sugestões"],
                  ] as const
                ).map(([id, nome]) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={v === id}
                    onClick={() => setVista((x) => ({ ...x, [i]: id }))}
                    className={`rounded-full px-4 py-2 transition ${v === id ? "bg-navy text-white" : "text-navy hover:bg-white"}`}
                  >
                    {nome}
                  </button>
                ))}
              </div>
            )}
            <div className="mt-6">{v === "sugestoes" ? <Sugestoes a={a} /> : <Blocos blocos={a.blocos} />}</div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-8 text-sm font-bold text-cyan-dark hover:underline"
            >
              ↑ Voltar à lista
            </button>
          </article>
        );
      })}
    </>
  );
}
