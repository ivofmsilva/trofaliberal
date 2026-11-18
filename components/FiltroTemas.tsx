"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ItemCard from "@/components/ItemCard";
import { TEMAS, type Item, type Tema } from "@/lib/imprensa";

// Lista dos artigos de opinião com botões discretos por tema. O tema escolhido vai no endereço
// (/imprensa/artigos?tema=impostos) para se poder partilhar a lista já filtrada.
export default function FiltroTemas({ lista }: { lista: Item[] }) {
  const inicial = useSearchParams().get("tema") as Tema | null;
  const [tema, setTema] = useState<Tema | null>(inicial && inicial in TEMAS ? inicial : null);

  const contagem = (t: Tema) => lista.filter((i) => i.temas?.includes(t)).length;
  const temas = (Object.keys(TEMAS) as Tema[]).filter((t) => contagem(t) > 0);
  const visiveis = tema ? lista.filter((i) => i.temas?.includes(tema)) : lista;

  const escolher = (t: Tema | null) => {
    setTema(t);
    const url = new URL(window.location.href);
    if (t) url.searchParams.set("tema", t);
    else url.searchParams.delete("tema");
    window.history.replaceState(null, "", url);
  };

  const botao = (ativo: boolean) =>
    `rounded-full px-3 py-1.5 text-sm font-bold transition ${
      ativo ? "bg-navy text-white" : "bg-mist text-navy hover:bg-navy/10"
    }`;

  return (
    <>
      <div role="group" aria-label="Filtrar por tema" className="mb-8 flex flex-wrap gap-2">
        <button type="button" onClick={() => escolher(null)} aria-pressed={!tema} className={botao(!tema)}>
          Todos ({lista.length})
        </button>
        {temas.map((t) => (
          <button key={t} type="button" onClick={() => escolher(t)} aria-pressed={tema === t} className={botao(tema === t)}>
            {TEMAS[t]} ({contagem(t)})
          </button>
        ))}
      </div>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visiveis.map((item) => (
          <li key={item.href}>
            <ItemCard item={item} />
          </li>
        ))}
      </ul>
    </>
  );
}
