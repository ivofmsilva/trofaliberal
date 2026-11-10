// Lista de barras horizontais simples (valor relativo ao maior).
export type ItemBarra = { rotulo: string; valor: number; texto: string; extra?: string };

export default function Barras({ itens, titulo }: { itens: ItemBarra[]; titulo: string }) {
  const max = Math.max(...itens.map((i) => i.valor), 1);
  return (
    <ul aria-label={titulo} className="space-y-3">
      {itens.map((i) => (
        <li key={i.rotulo}>
          <div className="flex items-baseline justify-between gap-4 text-sm">
            <span className="font-medium text-tinta">{i.rotulo}</span>
            <span className="whitespace-nowrap tabular-nums text-texto">
              {i.texto}
              {i.extra && <span className="ml-2 text-apagado">{i.extra}</span>}
            </span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-linha">
            <div className="h-full rounded-full bg-tinta" style={{ width: `${Math.max((i.valor / max) * 100, 0.8)}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}
