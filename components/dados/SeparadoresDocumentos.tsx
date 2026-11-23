"use client";

import { useEffect, useState } from "react";

// Um botão por tipo de documento; ao clicar abre essa lista (e fecha a outra), ao clicar outra vez fecha. Começa tudo
// fechado, para a página não ficar enorme. Um endereço com #atas, #ordens ou #deliberacoes abre logo essa lista.
// As listas vêm já feitas do servidor (children de cada painel), por isso os dados não vão para o navegador em JSON.
export type Painel = { id: string; titulo: string; n: number; conteudo: React.ReactNode };

export default function SeparadoresDocumentos({ paineis }: { paineis: Painel[] }) {
  const [aberto, setAberto] = useState<string | null>(null);

  useEffect(() => {
    const abrirPeloEndereco = () => {
      const h = window.location.hash.slice(1);
      if (paineis.some((p) => p.id === h)) {
        setAberto(h);
        document.getElementById("documentos")?.scrollIntoView();
      }
    };
    abrirPeloEndereco();
    window.addEventListener("hashchange", abrirPeloEndereco);
    return () => window.removeEventListener("hashchange", abrirPeloEndereco);
  }, [paineis]);

  return (
    <>
      <div role="group" aria-label="Escolher os documentos" className="flex flex-wrap gap-2">
        {paineis.map((p) => {
          const ativo = aberto === p.id;
          return (
            <button
              key={p.id}
              type="button"
              aria-expanded={ativo}
              aria-controls={`painel-${p.id}`}
              onClick={() => setAberto(ativo ? null : p.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                ativo ? "border-tinta bg-tinta text-fundo" : "border-linha bg-fundo text-texto hover:border-tinta hover:text-tinta"
              }`}
            >
              {p.titulo} <span className={ativo ? "opacity-80" : "text-apagado"}>({p.n})</span>
            </button>
          );
        })}
      </div>
      {paineis.map((p) => (
        <div key={p.id} id={`painel-${p.id}`} hidden={aberto !== p.id} className="mt-6">
          {p.conteudo}
        </div>
      ))}
    </>
  );
}
