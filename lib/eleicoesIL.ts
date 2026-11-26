import type { DataAnual } from "@/lib/datasAnuais";

// As eleições da Iniciativa Liberal e da IL Trofa, na página "A nossa história" (app/a-nossa-historia), ano a ano, e no
// calendário das datas (/datas). Não têm banner: só a fundação, a chegada ao Parlamento e o núcleo (lib/comemoracoes.ts).
// As legislativas de 2019 são a "chegada ao Parlamento", com texto próprio.
//
// Factos (confirmados a 26/11/2026): resultados nacionais na Wikipédia em português e em inglês, que batem nas
// percentagens e nos eleitos (os votos diferem por causa das repetições no círculo da Europa, por isso não os pomos);
// deputados pelo círculo do Porto na Wikipédia em português; eurodeputada Ana Vasconcelos Martins (eleita em 2024).
// Autárquicas de 2021: 0 presidentes de câmara e dezenas de eleitos nas assembleias (26 a 30 municipais e 45 a 58 de
// freguesia, conforme a fonte), por isso o texto fica em "dezenas".
export const PAGINA_HISTORIA = "/a-nossa-historia";

export type Eleicao = { id: string; data: DataAnual; titulo: string; texto: string[]; link?: { texto: string; href: string } };

const data = (id: string, titulo: string, dia: [number, number], desde: number): DataAnual => ({
  slug: `${PAGINA_HISTORIA}#${id}`,
  titulo,
  dia,
  desde,
});

export const eleicoesIL: Eleicao[] = [
  {
    id: "europeias-2019",
    data: data("europeias-2019", "Primeiras eleições da Iniciativa Liberal", [5, 26], 2019),
    titulo: "As primeiras eleições",
    texto: [
      "A 26 de maio de 2019, a Iniciativa Liberal foi a votos pela primeira vez, nas eleições para o Parlamento Europeu, com Ricardo Arroja como cabeça de lista. Teve 0,88% dos votos e não elegeu ninguém.",
      "Nas europeias, o país inteiro é um só círculo: Portugal elege 21 eurodeputados.",
    ],
  },
  {
    id: "autarquicas-2021",
    data: data("autarquicas-2021", "Primeiras autárquicas da Iniciativa Liberal", [9, 26], 2021),
    titulo: "As primeiras autárquicas",
    texto: [
      "A 26 de setembro de 2021, a Iniciativa Liberal concorreu pela primeira vez às eleições autárquicas, em vários concelhos do país. Não elegeu presidentes de câmara, mas passou a ter dezenas de eleitos nas assembleias municipais e de freguesia.",
      "Nas autárquicas, cada eleitor vota em três boletins: câmara municipal, assembleia municipal e assembleia de freguesia.",
    ],
  },
  {
    id: "legislativas-2022",
    data: data("legislativas-2022", "Legislativas de 2022: oito deputados liberais", [1, 30], 2022),
    titulo: "De um para oito deputados",
    texto: [
      "A 30 de janeiro de 2022, a Iniciativa Liberal teve 4,91% dos votos e passou de um para oito deputados. Foi a quarta força mais votada.",
      "Dois foram eleitos pelo círculo do Porto, onde votam os trofenses: Carlos Guimarães Pinto e Patrícia Gilvaz.",
    ],
  },
  {
    id: "legislativas-2024",
    data: data("legislativas-2024", "Legislativas de 2024", [3, 10], 2024),
    titulo: "Oito deputados outra vez",
    texto: [
      "A 10 de março de 2024, a Iniciativa Liberal teve 4,94% dos votos e manteve os oito deputados. Pelo Porto, voltaram a ser eleitos Carlos Guimarães Pinto e Patrícia Gilvaz.",
    ],
  },
  {
    id: "europeias-2024",
    data: data("europeias-2024", "Os primeiros eurodeputados liberais", [6, 9], 2024),
    titulo: "Os primeiros eurodeputados",
    texto: [
      "A 9 de junho de 2024, a Iniciativa Liberal elegeu os seus primeiros eurodeputados: João Cotrim de Figueiredo e Ana Vasconcelos Martins. Teve 9,07% dos votos. Cinco anos antes, nas primeiras europeias, tinha tido 0,88%.",
    ],
  },
  {
    id: "legislativas-2025",
    data: data("legislativas-2025", "Legislativas de 2025: nove deputados liberais", [5, 18], 2025),
    titulo: "Nove deputados",
    texto: [
      "A 18 de maio de 2025, a Iniciativa Liberal teve 5,36% dos votos e elegeu nove deputados, o maior grupo parlamentar da sua história. Pelo Porto, foram eleitos Carlos Guimarães Pinto e Miguel Rangel.",
    ],
  },
  {
    id: "autarquicas-2025",
    data: data("autarquicas-2025", "Primeiras autárquicas da IL Trofa", [10, 12], 2025),
    titulo: "As primeiras autárquicas na Trofa",
    texto: [
      "A 12 de outubro de 2025, a IL Trofa foi a votos pela primeira vez, com listas à Câmara, à Assembleia Municipal e às freguesias de Bougado e de Alvarelhos.",
    ],
    link: { texto: "As nossas listas e propostas →", href: "/autarquicas-2025" },
  },
];
