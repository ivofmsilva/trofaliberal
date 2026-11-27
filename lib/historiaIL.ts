import type { Img } from "@/lib/comemoracoes";
import { anoDe, proximaVez, type DataAnual } from "@/lib/datasAnuais";

// Os momentos da Iniciativa Liberal e da IL Trofa na página "A nossa história" (app/a-nossa-historia), ano a ano:
// eleições, convenções e presidenciais. Regra do Ivo (26/11/2026): só têm banner e entram no calendário (/datas) o
// aniversário da IL (26 nov), o primeiro deputado (6 out), o aniversário do núcleo (25 jun) — os três em
// lib/comemoracoes.ts, com banner só no próprio dia — e a convenção que vem aí (campo banner, só nos dias dela). O resto
// fica só nesta página.
//
// Regionais: Açores 25/10/2020, 1,93%, Nuno Barata pelo círculo de compensação; Madeira 24/9/2023, 2,62%, Nuno Morna
// (Wikipédia em inglês e em português; em 2019 a IL concorreu na Madeira e não elegeu).
//
// Factos (confirmados a 26/11/2026):
// - Eleições: resultados nacionais na Wikipédia em português e em inglês, que batem nas percentagens e nos eleitos (os
//   votos diferem por causa das repetições no círculo da Europa, por isso não os pomos); deputados pelo Porto na
//   Wikipédia em português. Autárquicas de 2021: 0 presidentes de câmara e dezenas de eleitos nas assembleias (26 a 30
//   municipais e 45 a 58 de freguesia, conforme a fonte), por isso o texto fica em "dezenas".
// - II Convenção, 13/10/2018, Montemor-o-Velho: ECO (19/10/2018), Sábado; Miguel Ferreira da Silva demitiu-se em agosto.
// - III Convenção, 8/12/2019, Pombal (Biblioteca Municipal): Sábado, Observador (candidato único, 96%).
// - VII Convenção, 21-22/1/2023, Lisboa: Rui Rocha 51,7%, Carla Castro 44%, José Cardoso 4,3% (DN, RTP, Observador);
//   a primeira disputa da liderança com mais de um candidato.
// - IX Convenção, 1-2/2/2025, Loures: Rui Rocha 73,4%, Rui Malheiro 26,6% (Renascença, RTP, ECO).
// - Rui Rocha deixou a presidência a 31/5/2025; X Convenção, 19/7/2025, Alcobaça: Mariana Leitão candidata única,
//   73% (DN, ECO, RTP). O "sem votos contra" das notícias não está certo, segundo o Ivo (26/11/2026): não pôr.
// - Presidenciais: 24/1/2021 Tiago Mayan Gonçalves, 3,2%; 18/1/2026 João Cotrim de Figueiredo, 16%, 3.º lugar.
// - XI Convenção, 30-31/1/2027, região de Lisboa (SOL/Lusa, 26/11/2026). Nomes só quando as candidaturas forem oficiais.
export const PAGINA_HISTORIA = "/a-nossa-historia";

export type Momento = {
  id: string;
  data: DataAnual;
  tipo: string; // por cima do título: "Eleições legislativas", "Convenção Nacional"...
  titulo: string;
  texto: string[];
  quando?: string; // a data por extenso, quando não é um só dia (ex.: "30 e 31 de janeiro de 2027")
  // Só as convenções que vêm aí: banner na página inicial nos dias da convenção e entrada no calendário (/datas) até lá.
  banner?: { etiqueta: string; titulo: string; frase: string; imagem: Img };
  link?: { texto: string; href: string };
};

const data = (id: string, titulo: string, dia: [number, number], desde: number): DataAnual => ({
  slug: `${PAGINA_HISTORIA}#${id}`,
  titulo,
  dia,
  desde,
});

export const momentosIL: Momento[] = [
  {
    id: "convencao-2018",
    data: data("convencao-2018", "Carlos Guimarães Pinto eleito presidente da IL", [10, 13], 2018),
    tipo: "Convenção Nacional",
    titulo: "Carlos Guimarães Pinto, o segundo presidente",
    texto: [
      "A 13 de outubro de 2018, na II Convenção Nacional, em Montemor-o-Velho (distrito de Coimbra), Carlos Guimarães Pinto foi eleito presidente da Iniciativa Liberal. Sucedeu a Miguel Ferreira da Silva.",
    ],
  },
  {
    id: "europeias-2019",
    data: data("europeias-2019", "Primeiras eleições da Iniciativa Liberal", [5, 26], 2019),
    tipo: "Eleições europeias",
    titulo: "As primeiras eleições",
    texto: [
      "A 26 de maio de 2019, a Iniciativa Liberal foi a votos pela primeira vez, nas eleições para o Parlamento Europeu, com Ricardo Arroja como cabeça de lista. Teve 0,88% dos votos.",
    ],
  },
  {
    id: "convencao-2019",
    data: data("convencao-2019", "João Cotrim de Figueiredo eleito presidente da IL", [12, 8], 2019),
    tipo: "Convenção Nacional",
    titulo: "João Cotrim de Figueiredo, o terceiro presidente",
    texto: [
      "Depois das legislativas, Carlos Guimarães Pinto deixou a presidência. A 8 de dezembro de 2019, na III Convenção Nacional, em Pombal (distrito de Leiria), o primeiro deputado do partido, João Cotrim de Figueiredo, foi eleito presidente, com 96% dos votos.",
    ],
  },
  {
    id: "acores-2020",
    data: data("acores-2020", "Primeiro deputado liberal nos Açores", [10, 25], 2020),
    tipo: "Eleições regionais",
    titulo: "O primeiro deputado nos Açores",
    texto: [
      "A 25 de outubro de 2020, a Iniciativa Liberal elegeu o seu primeiro deputado na Assembleia Legislativa dos Açores: Nuno Barata, pelo círculo de compensação. Teve 1,93% dos votos.",
    ],
  },
  {
    id: "presidenciais-2021",
    data: data("presidenciais-2021", "Primeiras presidenciais da Iniciativa Liberal", [1, 24], 2021),
    tipo: "Eleições presidenciais",
    titulo: "As primeiras presidenciais",
    texto: [
      "A 24 de janeiro de 2021, nas eleições para Presidente da República, a Iniciativa Liberal apoiou Tiago Mayan Gonçalves, que teve 3,2% dos votos.",
    ],
  },
  {
    id: "autarquicas-2021",
    data: data("autarquicas-2021", "Primeiras autárquicas da Iniciativa Liberal", [9, 26], 2021),
    tipo: "Eleições autárquicas",
    titulo: "As primeiras autárquicas",
    texto: [
      "A 26 de setembro de 2021, a Iniciativa Liberal concorreu pela primeira vez às eleições autárquicas, em vários concelhos do país. Não elegeu presidentes de câmara, mas passou a ter dezenas de eleitos nas assembleias municipais e de freguesia.",
    ],
  },
  {
    id: "legislativas-2022",
    data: data("legislativas-2022", "Legislativas de 2022: oito deputados liberais", [1, 30], 2022),
    tipo: "Eleições legislativas",
    titulo: "De um para oito deputados",
    texto: [
      "A 30 de janeiro de 2022, a Iniciativa Liberal teve 4,91% dos votos e passou de um para oito deputados. Foi a quarta força mais votada.",
      "Dois foram eleitos pelo círculo do Porto, onde votam os trofenses: Carlos Guimarães Pinto e Patrícia Gilvaz.",
    ],
  },
  {
    id: "convencao-2023",
    data: data("convencao-2023", "Rui Rocha eleito presidente da IL", [1, 22], 2023),
    tipo: "Convenção Nacional",
    titulo: "Rui Rocha, o quarto presidente",
    texto: [
      "A 22 de janeiro de 2023, na VII Convenção Nacional, em Lisboa, Rui Rocha foi eleito presidente, com 51,7% dos votos, contra Carla Castro (44%) e José Cardoso (4,3%). Foi a primeira vez que mais de um candidato disputou a liderança do partido.",
    ],
  },
  {
    id: "madeira-2023",
    data: data("madeira-2023", "Primeiro deputado liberal na Madeira", [9, 24], 2023),
    tipo: "Eleições regionais",
    titulo: "O primeiro deputado na Madeira",
    texto: [
      "A 24 de setembro de 2023, a Iniciativa Liberal elegeu o seu primeiro deputado na Assembleia Legislativa da Madeira: Nuno Morna. Teve 2,62% dos votos.",
    ],
  },
  {
    id: "legislativas-2024",
    data: data("legislativas-2024", "Legislativas de 2024", [3, 10], 2024),
    tipo: "Eleições legislativas",
    titulo: "Oito deputados outra vez",
    texto: [
      "A 10 de março de 2024, a Iniciativa Liberal teve 4,94% dos votos e manteve os oito deputados. Pelo Porto, voltaram a ser eleitos Carlos Guimarães Pinto e Patrícia Gilvaz.",
    ],
  },
  {
    id: "europeias-2024",
    data: data("europeias-2024", "Os primeiros eurodeputados liberais", [6, 9], 2024),
    tipo: "Eleições europeias",
    titulo: "Os primeiros eurodeputados",
    texto: [
      "A 9 de junho de 2024, a Iniciativa Liberal elegeu os seus primeiros eurodeputados: João Cotrim de Figueiredo e Ana Vasconcelos Martins. Teve 9,07% dos votos. Cinco anos antes, nas primeiras europeias, tinha tido 0,88%.",
    ],
  },
  {
    id: "convencao-2025-fevereiro",
    data: data("convencao-2025-fevereiro", "Rui Rocha reeleito presidente da IL", [2, 2], 2025),
    tipo: "Convenção Nacional",
    titulo: "Rui Rocha reeleito",
    texto: [
      "A 2 de fevereiro de 2025, na IX Convenção Nacional, em Loures, Rui Rocha foi reeleito presidente, com 73,4% dos votos, contra Rui Malheiro (26,6%).",
    ],
  },
  {
    id: "legislativas-2025",
    data: data("legislativas-2025", "Legislativas de 2025: nove deputados liberais", [5, 18], 2025),
    tipo: "Eleições legislativas",
    titulo: "Nove deputados",
    texto: [
      "A 18 de maio de 2025, a Iniciativa Liberal teve 5,36% dos votos e elegeu nove deputados, o maior grupo parlamentar da sua história. Pelo Porto, foram eleitos Carlos Guimarães Pinto e Miguel Rangel.",
    ],
  },
  {
    id: "convencao-2025-julho",
    data: data("convencao-2025-julho", "Mariana Leitão eleita presidente da IL", [7, 19], 2025),
    tipo: "Convenção Nacional",
    titulo: "Mariana Leitão, a primeira presidente",
    texto: [
      "A 31 de maio, Rui Rocha deixou a presidência. A 19 de julho de 2025, na X Convenção Nacional, em Alcobaça, Mariana Leitão foi eleita presidente, com 73% dos votos. É a primeira mulher a liderar o partido.",
    ],
  },
  {
    id: "autarquicas-2025",
    data: data("autarquicas-2025", "Primeiras autárquicas da IL Trofa", [10, 12], 2025),
    tipo: "Eleições autárquicas",
    titulo: "As primeiras autárquicas na Trofa",
    texto: [
      "A 12 de outubro de 2025, a IL Trofa foi a votos pela primeira vez, com listas à Câmara, à Assembleia Municipal e às freguesias de Bougado e de Alvarelhos.",
    ],
    link: { texto: "As nossas listas e propostas →", href: "/autarquicas-2025" },
  },
  {
    id: "presidenciais-2026",
    data: data("presidenciais-2026", "Presidenciais de 2026: João Cotrim de Figueiredo", [1, 18], 2026),
    tipo: "Eleições presidenciais",
    titulo: "Terceiro lugar nas presidenciais",
    texto: [
      "A 18 de janeiro de 2026, João Cotrim de Figueiredo foi candidato a Presidente da República, com o apoio da Iniciativa Liberal. Ficou em terceiro lugar, com 16% dos votos.",
    ],
  },
  {
    id: "convencao-2027",
    data: { ...data("convencao-2027", "XI Convenção Nacional da IL", [1, 30], 2027), janela: [0, 1] }, // banner a 30 e 31
    tipo: "Convenção Nacional",
    titulo: "A próxima convenção",
    quando: "30 e 31 de janeiro de 2027",
    banner: {
      etiqueta: "30 e 31 de janeiro",
      titulo: "XI Convenção Nacional",
      frase: "A Iniciativa Liberal escolhe a nova liderança do partido.",
      imagem: {
        src: "/images/datas/convencao-fundadora-2017.webp",
        w: 1023,
        h: 585,
        alt: "Os participantes na Convenção Fundadora da Iniciativa Liberal, em 2017, numa fotografia de grupo à entrada do edifício, no Porto",
      },
    },
    texto: [
      "A 30 e 31 de janeiro de 2027, a XI Convenção Nacional, na região de Lisboa, vai escolher a nova liderança do partido. Os candidatos ficam aqui quando as candidaturas forem oficiais.",
    ],
  },
];

// As convenções não se repetem todos os anos: o banner só conta no ano dela e o calendário só a mostra até lá.
export type MomentoComBanner = Momento & { banner: NonNullable<Momento["banner"]> };
const temBanner = (m: Momento): m is MomentoComBanner => !!m.banner;
export const comBanner = (agora?: Date) => momentosIL.filter(temBanner).filter((m) => anoDe(m.data, agora) === m.data.desde);
export const noCalendario = (agora?: Date) => momentosIL.filter(temBanner).filter((m) => proximaVez(m.data, agora).ano === m.data.desde);
