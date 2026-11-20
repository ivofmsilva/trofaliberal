// Festas das freguesias: uma página com todas (/festas-da-nossa-terra) e um banner para cada uma, à volta do dia.
// As datas seguem as regras tradicionais (Infopédia, artigo "Trofa", e a lista do Ivo) e calculam-se sozinhas.
// Antes de cada festa convém confirmar no programa da comissão de festas ou da Junta.
// Banner: nas festas de domingo aparece de sexta a domingo; nas de dia fixo, na véspera, no dia e no dia seguinte.

import type { Img } from "@/lib/comemoracoes";
import { nesimo, pascoa, somarDias, ultimo, type DataAnual } from "@/lib/datasAnuais";
import { fotosDatas as F } from "@/lib/fotosDatas";

export type Festa = {
  id: string; // âncora na página
  nome: string;
  freguesia: string;
  data: DataAnual;
  texto?: string;
  imagem?: Img;
};

const PAGINA = "/festas-da-nossa-terra";
// Foto de cada festa (do Commons): a igreja ou um sítio da freguesia. Covelas e Guidões ainda não têm.
const FOTO: Record<string, string> = {
  "senhora-do-desterro": "igreja-santiago",
  "espirito-santo": "santeiros",
  "senhora-do-rosario": "igreja-santiago",
  "senhora-da-livracao": "igreja-santiago",
  "s-cristovao": "igreja-muro",
  "santiago": "igreja-santiago",
  "s-pantaleao": "igreja-muro",
  "senhora-das-dores": "capela-dores",
  "s-roque": "castro-alvarelhos",
  "s-gens": "sao-gens",
  "santa-eufemia": "castro-alvarelhos",
  "s-martinho": "igreja-sao-martinho"
};
const DOMINGO: [number, number] = [2, 0];

function festa(id: string, nome: string, freguesia: string, quando: string, regra: DataAnual["regra"], extra: Partial<Festa> = {}, fixa = false): Festa {
  return {
    id,
    nome,
    freguesia,
    data: { slug: `${PAGINA}#${id}`, titulo: nome, regra, quando, janela: fixa ? [1, 1] : DOMINGO },
    imagem: FOTO[id] ? F[FOTO[id]] : undefined,
    ...extra,
  };
}

export const festas: Festa[] = [
  festa("s-goncalo", "S. Gonçalo", "Covelas", "penúltimo domingo de janeiro", (a) => somarDias(a, ultimo(a, 1, 0), -7), {
    texto: "A primeira festa do ano no concelho, com o rojão à mesa.",
  }),
  festa("senhora-do-desterro", "Senhora do Desterro", "Bougado (Santiago)", "4.º domingo de abril", (a) => nesimo(a, 4, 0, 4)),
  festa("espirito-santo", "Divino Espírito Santo", "Coronado (S. Mamede)", "domingo de Pentecostes", (a) => somarDias(a, pascoa(a), 49)),
  festa("s-joao", "S. João Batista", "Guidões", "24 de junho", () => [6, 24], {}, true),
  festa("senhora-do-rosario", "Senhora do Rosário", "Bougado (Santiago)", "4.º domingo de junho", (a) => nesimo(a, 6, 0, 4)),
  festa("senhora-da-livracao", "Senhora da Livração", "Bougado (Santiago)", "2.º domingo de julho", (a) => nesimo(a, 7, 0, 2)),
  festa("s-cristovao", "S. Cristóvão", "Muro", "25 de julho", () => [7, 25], {}, true),
  festa("santiago", "Santiago", "Bougado (Santiago)", "último domingo de julho", (a) => ultimo(a, 7, 0)),
  festa("s-pantaleao", "S. Pantaleão", "Muro", "domingo a seguir a 25 de julho", (a) => somarDias(a, [7, 25], 7 - new Date(Date.UTC(a, 6, 25)).getUTCDay() || 7)),
  festa("senhora-das-dores", "Nossa Senhora das Dores", "Bougado (S. Martinho)", "3.º domingo de agosto", (a) => nesimo(a, 8, 0, 3), {
    texto: "As Festas da Trofa, com os carros alegóricos.",
  }),
  festa("s-roque", "S. Roque", "Alvarelhos", "último domingo de agosto", (a) => ultimo(a, 8, 0)),
  festa("s-gens", "S. Gens", "Bougado (Santiago)", "1.º domingo de setembro", (a) => nesimo(a, 9, 0, 1)),
  festa("santa-eufemia", "Santa Eufémia", "Alvarelhos", "3.º domingo de setembro", (a) => nesimo(a, 9, 0, 3)),
  festa("s-martinho", "S. Martinho", "Bougado (S. Martinho)", "11 de novembro", () => [11, 11], {}, true),
];

export const paginaFestas = PAGINA;

// Foto dos banners das festas que ainda não têm foto própria.
export const fotoDasFestas: Img = F["trofa-vista"];
