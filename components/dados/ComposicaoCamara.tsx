import Link from "next/link";
import { Legenda, Pontos, type Bancada } from "@/components/dados/Bancadas";

const FONTE_CAMARA =
  "https://mun-trofa.pt/upload_files/1/1/Munic%C3%ADpio/C%C3%A2mara%20Municipal/Reuni%C3%B5es%20de%20C%C3%A2mara/deliberacoes/2025/Deliberacoes_Ata_25_2025_29_outubro.pdf";

// 7 lugares (presidente + 6 vereadores), como a própria Câmara descreve a votação de 29 de outubro de 2025.
const camara: Bancada[] = [
  { nome: "Unidos pela Trofa (PSD/CDS-PP)", cor: "#e8812e", n: 3 },
  { nome: "Trofa em Primeiro (PS/PAN/L)", cor: "#d6457a", n: 2 },
  { nome: "TDT (A Trofa é de Todos)", cor: "#2f9e6b", n: 2 },
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
        <h3 className="text-lg font-bold text-tinta">Quantos lugares tem cada lista</h3>
        <div className="mt-4">
          <Pontos bancadas={camara} titulo="7 lugares na Câmara: 3 Unidos pela Trofa, 2 Trofa em Primeiro, 2 TDT" />
        </div>
        <Legenda bancadas={camara} />
        <p className="mt-3 text-sm text-texto">
          Presidente: <strong className="font-semibold text-tinta">Sérgio Araújo</strong>, da lista Unidos pela Trofa. Nenhuma
          lista tem sozinha a maioria dos 7 votos (são precisos 4).
        </p>
        <p className="mt-2 text-sm text-apagado">
          Fonte:{" "}
          <a href={FONTE_CAMARA} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
            deliberações da primeira reunião do mandato (29 de outubro de 2025) ↗
          </a>
          , que descreve os votos de cada lista. Os nomes dos vereadores estão em{" "}
          <a href="https://mun-trofa.pt/menu/80/vereacao" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
            mun-trofa.pt ↗
          </a>
          .
        </p>
      </div>
    </div>
  );
}
