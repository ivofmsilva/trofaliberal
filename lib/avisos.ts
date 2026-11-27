import type { Img } from "@/lib/comemoracoes";
import { hojeEmLisboa } from "@/lib/datasAnuais";
import { fotosDatas as F } from "@/lib/fotosDatas";

// Avisos de um dia só (ex.: sessões da Assembleia Municipal): banner na página inicial apenas nesse dia (data de
// Lisboa), com link para fora. A página inicial volta a ser gerada de hora a hora, por isso entram e saem sozinhos.
export type Aviso = {
  id: string;
  dia: [number, number, number]; // [ano, mês, dia]
  etiqueta: string;
  titulo: string;
  frase: string;
  href: string;
  botao: string;
  imagem: Img;
};

export const avisos: Aviso[] = [
  {
    // Pedido do Ivo (27/11/2026). Fonte: notícia do Município (sexta-feira, 27 de novembro, 21h00).
    id: "assembleia-municipal-2026-11-27",
    dia: [2026, 11, 27],
    etiqueta: "Hoje · 21h00",
    titulo: "Assembleia Municipal",
    frase: "Sessão ordinária no auditório do Fórum Trofa XXI. É aberta ao público e transmitida em direto no Facebook do Município.",
    href: "https://mun-trofa.pt/26311/assembleia-municipal-da-trofa-reune-em-sessao-ordinaria",
    botao: "Ver a notícia",
    imagem: F["trofa-vista"],
  },
];

export function avisosDeHoje(agora?: Date) {
  const h = hojeEmLisboa(agora);
  return avisos.filter((a) => a.dia[0] === h.ano && a.dia[1] === h.mes && a.dia[2] === h.dia);
}
