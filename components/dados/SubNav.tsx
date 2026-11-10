import Link from "next/link";

// Barra comum às páginas de Contratos e Fundos europeus: no menu é um só separador.
export default function SubNav({ atual }: { atual: "contratos" | "ajustes" | "fundos" }) {
  const itens = [
    { id: "contratos", nome: "Contratos públicos", href: "/dados/contratos" },
    { id: "ajustes", nome: "Ajustes diretos", href: "/dados/contratos/ajustes-diretos" },
    { id: "fundos", nome: "Fundos europeus", href: "/dados/fundos-europeus" },
  ] as const;
  return (
    <nav aria-label="Contratos e fundos europeus" className="border-b border-linha bg-fundo">
      <ul className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 py-3 sm:px-6">
        {itens.map((i) => (
          <li key={i.id}>
            <Link
              href={i.href}
              aria-current={i.id === atual ? "page" : undefined}
              className={`inline-block rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                i.id === atual ? "border-tinta bg-tinta text-fundo" : "border-linha text-texto hover:border-tinta hover:text-tinta"
              }`}
            >
              {i.nome}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
