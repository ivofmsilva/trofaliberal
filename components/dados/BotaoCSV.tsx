"use client";

// Descarregar a tabela de um indicador em CSV, pronto a abrir no Excel português: colunas separadas por ";", vírgula nos
// decimais e marca UTF-8 no início (para os acentos aparecerem bem).
export default function BotaoCSV({ nome, cabecalho, linhas }: { nome: string; cabecalho: string[]; linhas: (string | number | null)[][] }) {
  function descarregar() {
    const celula = (x: string | number | null) => {
      if (x === null) return "";
      const t = typeof x === "number" ? String(x).replace(".", ",") : x;
      return /[;"\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
    };
    const texto = "﻿" + [cabecalho, ...linhas].map((l) => l.map(celula).join(";")).join("\r\n");
    const url = URL.createObjectURL(new Blob([texto], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `trofa-${nome}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
  return (
    <button
      type="button"
      onClick={descarregar}
      className="inline-flex items-center gap-2 rounded-full border border-linha bg-fundo px-4 py-2 text-sm font-semibold text-tinta transition hover:border-trofa hover:text-trofa"
    >
      <span aria-hidden>↓</span> Descarregar a tabela (CSV)
    </button>
  );
}
