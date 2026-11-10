// Pontos de cor, um por lugar, agrupados por bancada, e a legenda com o número de lugares de cada uma.
export type Bancada = { nome: string; cor: string; n: number; nota?: string };

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
    <div className="mt-5 overflow-hidden rounded-xl border border-linha">
      <table className="w-full text-sm">
        <tbody>
          {bancadas.map((b) => (
            <tr key={b.nome} className="border-t border-linha first:border-t-0">
              <th scope="row" className="px-4 py-3 text-left font-medium text-tinta">
                <span className="mr-3 inline-block h-3.5 w-3.5 rounded-full align-[-2px]" style={{ backgroundColor: b.cor }} />
                {b.nome}
                {b.nota && <span className="ml-2 font-normal text-apagado">({b.nota})</span>}
              </th>
              <td className="px-4 py-3 text-right text-lg font-bold tabular-nums text-tinta">{b.n}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
