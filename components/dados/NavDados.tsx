"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu do portal de dados. `base` é "" no portal à parte e "/dados" quando está dentro do site.
// No telemóvel os itens passam para linhas seguintes (nada fica escondido à direita) e o separador atual fica a escuro.
const ITENS = [
  { rotulo: "Indicadores", caminho: "", ancora: "#temas", exato: true },
  { rotulo: "Contratos e fundos", caminho: "/contratos", tambem: ["/fundos-europeus"] },
  { rotulo: "Finanças", caminho: "/financas" },
  { rotulo: "Câmara Municipal", caminho: "/camara" },
  { rotulo: "Assembleia Municipal", caminho: "/assembleia" },
  { rotulo: "Fontes", caminho: "/fontes" },
];

export default function NavDados({ base = "" }: { base?: string }) {
  const pathname = usePathname() ?? "";
  const atual = (i: (typeof ITENS)[number]) => {
    if (i.exato) return pathname === base || pathname === base + "/" || pathname.startsWith(base + "/indicadores");
    return [i.caminho, ...(i.tambem ?? [])].some((c) => pathname.startsWith(base + c));
  };
  return (
    <nav aria-label="Dados da Trofa" className="flex flex-wrap gap-1.5 text-sm font-medium">
      {ITENS.map((i) => (
        <Link
          key={i.rotulo}
          href={`${base || "/"}${i.caminho}${i.ancora ?? ""}`.replace("//", "/")}
          aria-current={atual(i) ? "page" : undefined}
          className={`rounded-full border px-3.5 py-1.5 transition ${
            atual(i) ? "border-tinta bg-tinta text-fundo" : "border-linha bg-fundo text-texto hover:border-apagado hover:text-tinta"
          }`}
        >
          {i.rotulo}
        </Link>
      ))}
    </nav>
  );
}
