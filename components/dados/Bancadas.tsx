// Pontos de cor, um por lugar, agrupados por bancada, e a legenda com o número de lugares e os nomes de cada bancada.
export type Membro = { nome: string; cargo?: string };
export type Bancada = { nome: string; cor: string; n: number; nota?: string; membros?: Membro[] };

export function Pontos({ bancadas, titulo }: { bancadas: Bancada[]; titulo: string }) {
  return (
    <div role="img" aria-label={titulo} className="flex flex-wrap gap-x-4 gap-y-3">
      {bancadas.map((b) => (
        <span key={b.nome} className="inline-flex gap-1.5">
          {Array.from({ length: b.n }).map((_, i) => (
            <span key={i} className="h-5 w-5 rounded-full" style={{ backgroundColor: b.cor }} />
          ))}
        </span>
      ))}
    </div>
  );
}

export function Legenda({ bancadas }: { bancadas: Bancada[] }) {
  return (
    <div className="mt-5 divide-y divide-linha overflow-hidden rounded-xl border border-linha bg-fundo">
      {bancadas.map((b) => (
        <div key={b.nome} className="px-4 py-3">
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-medium text-tinta">
              <span className="mr-3 inline-block h-3.5 w-3.5 rounded-full align-[-2px]" style={{ backgroundColor: b.cor }} />
              {b.nome}
              {b.nota && <span className="ml-2 text-sm font-normal text-apagado">({b.nota})</span>}
            </p>
            <p className="text-lg font-bold tabular-nums text-tinta">{b.n}</p>
          </div>
          {b.membros && (
            <ul className="mt-2 grid gap-x-6 gap-y-1 text-sm text-texto sm:grid-cols-2">
              {b.membros.map((m) => (
                <li key={m.nome}>
                  {m.nome}
                  {m.cargo && <span className="text-apagado"> · {m.cargo}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
