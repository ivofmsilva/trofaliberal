import { porAno, rotulo, type Documento } from "@/lib/dados/autarquia";

// Lista de PDF publicados pelo município, agrupados por ano (o mais recente aberto).
export default function DocumentosPorAno({ docs, nomeTipo }: { docs: Documento[]; nomeTipo: string }) {
  const grupos = porAno(docs);
  return (
    <div className="divide-y divide-linha border-y border-linha">
      {grupos.map((g, i) => (
        <details key={g.chave} open={i === 0} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
            <span className="text-lg font-bold text-tinta">{g.titulo}</span>
            <span className="flex items-center gap-3 text-sm text-apagado">
              {g.docs.length} {g.docs.length === 1 ? "documento" : "documentos"}
              <span aria-hidden className="text-xl font-bold text-tinta transition group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <ul className="pb-4">
            {g.docs.map((d) => {
              const r = rotulo(d, nomeTipo);
              return (
                <li key={d.url}>
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-baseline justify-between gap-4 rounded-lg px-3 py-2.5 text-texto transition hover:bg-suave hover:text-tinta"
                  >
                    <span>
                      <span className="font-medium text-tinta">{r.titulo}</span>
                      {r.ficheiro && <span className="ml-2 text-sm text-apagado">{r.ficheiro}</span>}
                    </span>
                    <span className="shrink-0 text-sm text-apagado">PDF ↗</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </details>
      ))}
    </div>
  );
}
