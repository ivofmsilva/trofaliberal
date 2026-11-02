"use client";

// Botão que leva até uma proposta do manifesto e a abre (ver PropostasEducacao).
export default function AbrirProposta({ id, titulo }: { id: string; titulo: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("abrir-proposta", { detail: id }))}
      className="flex w-full gap-3 rounded-xl bg-white/10 px-4 py-3 text-left text-sm font-bold text-white transition hover:bg-white/20"
    >
      <span className="font-display text-sun">{id}</span>
      <span className="flex-1">{titulo}</span>
      <span aria-hidden className="text-sun">
        →
      </span>
    </button>
  );
}
