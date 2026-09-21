"use client";

import { useState } from "react";
import { links } from "@/lib/site";

export default function OrderButton({
  produto,
  tamanhos,
}: {
  produto: string;
  tamanhos?: string[];
}) {
  const [tamanho, setTamanho] = useState(tamanhos?.[0] ?? "");

  const corpo = tamanho ? `Produto: ${produto}\nTamanho: ${tamanho}\nQuantidade: 1\n\nNome:\nContacto:` : `Produto: ${produto}\nQuantidade: 1\n\nNome:\nContacto:`;
  const href = `mailto:${links.email}?subject=${encodeURIComponent(`Encomenda: ${produto}`)}&body=${encodeURIComponent(corpo)}`;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {tamanhos && (
        <label className="text-sm font-bold text-white/80">
          Tamanho{" "}
          <select
            value={tamanho}
            onChange={(e) => setTamanho(e.target.value)}
            className="ml-1 rounded-lg bg-white px-3 py-2 text-navy"
          >
            {tamanhos.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      )}
      <a
        href={href}
        className="rounded-full bg-pink px-6 py-2 font-bold text-white transition hover:bg-navy"
      >
        Encomendar
      </a>
    </div>
  );
}
