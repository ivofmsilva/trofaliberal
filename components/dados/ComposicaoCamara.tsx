import Link from "next/link";
import { Legenda, Pontos, type Bancada } from "@/components/dados/Bancadas";

const FONTE_POSSE = "https://mun-trofa.pt/25279/sergio-araujo-tomou-posse-como-presidente-da-camara-municipal-da-trofa";
const FONTE_CAMARA =
  "https://mun-trofa.pt/upload_files/1/1/Munic%C3%ADpio/C%C3%A2mara%20Municipal/Reuni%C3%B5es%20de%20C%C3%A2mara/deliberacoes/2025/Deliberacoes_Ata_25_2025_29_outubro.pdf";

// 7 lugares (presidente + 6 vereadores). Nomes e listas: notícia da tomada de posse, 24 de outubro de 2025, em mun-trofa.pt.
// António Azevedo suspendeu o mandato de 28 de setembro a 31 de dezembro de 2026 e foi substituído por Lina Ramos, a seguinte na lista TDT.
const camara: Bancada[] = [
  {
    nome: "Unidos pela Trofa",
    cor: "#e8812e",
    n: 3,
    nota: "PSD/CDS-PP, os 3 do PSD",
    membros: [{ nome: "Sérgio Araújo", cargo: "presidente da Câmara" }, { nome: "João Marques", cargo: "vice-presidente" }, { nome: "Isabel Cruz" }],
  },
  { nome: "Trofa em Primeiro", cor: "#d6457a", n: 2, nota: "PS/PAN/Livre, os 2 do PS", membros: [{ nome: "Amadeu Dias" }, { nome: "Luís Cameirão" }] },
  {
    nome: "TDT (A Trofa é de Todos)",
    cor: "#2f9e6b",
    n: 2,
    membros: [{ nome: "Luís Sousa" }, { nome: "Lina Ramos", cargo: "substitui António Azevedo até 31 de dezembro de 2026" }],
  },
];

export default function ComposicaoCamara() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <p className="max-w-xl text-texto">
          É o órgão executivo: põe em prática as decisões e gere o município. Tem 7 membros, eleitos de quatro em quatro anos
          (mandato 2025–2029, eleito a 12 de outubro de 2025). O cabeça de lista da lista mais votada é o presidente, e os
          restantes eleitos são os vereadores.
        </p>
        <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-apagado">O que faz</h3>
        <ul className="mt-3 max-w-xl list-disc space-y-1.5 pl-5 text-texto marker:text-apagado">
          <li>Prepara o orçamento e o plano do município e propõe-nos à Assembleia.</li>
          <li>Executa o que a Assembleia aprova.</li>
          <li>Decide obras, urbanismo e licenciamentos, ação social, educação, cultura e desporto.</li>
          <li>
            Faz as compras e contratos públicos do município (veja os{" "}
            <Link href="/dados/contratos" className="underline underline-offset-2 hover:text-tinta">
              contratos
            </Link>
            ).
          </li>
          <li>O presidente pode entregar áreas (pelouros) a vereadores, mas todos os 7 votam nas reuniões.</li>
        </ul>
        <p className="mt-4 max-w-xl text-sm text-apagado">Reúne de quinze em quinze dias, em reunião pública, e as deliberações ficam publicadas.</p>
      </div>
      <div>
        <h3 className="text-lg font-bold text-tinta">Quantos lugares tem cada lista e quem são</h3>
        <div className="mt-4">
          <Pontos bancadas={camara} titulo="7 lugares na Câmara: 3 Unidos pela Trofa, 2 Trofa em Primeiro, 2 TDT" />
        </div>
        <Legenda bancadas={camara} />
        <p className="mt-3 text-sm text-texto">
          Nenhuma lista tem sozinha a maioria dos 7 votos (são precisos 4). Os nomes aparecem pelo primeiro e último.
        </p>
        <p className="mt-2 text-sm text-apagado">
          Fontes:{" "}
          <a href={FONTE_POSSE} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
            tomada de posse (24 de outubro de 2025) ↗
          </a>
          ,{" "}
          <a href={FONTE_CAMARA} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
            primeira reunião, que descreve os votos de cada lista ↗
          </a>{" "}
          e a{" "}
          <a href="https://mun-trofa.pt/menu/80/vereacao" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
            página da vereação ↗
          </a>
          . A suspensão do mandato de António Azevedo consta das deliberações de 23 de abril, 7 de maio, 24 de setembro e 8 de outubro de 2026.
        </p>
      </div>
    </div>
  );
}
