export type Categoria = "noticias" | "artigos" | "comunicados";

export type Bloco = { titulo?: string; paragrafos: string[] };

export type Item = {
  titulo: string;
  fonte?: string;
  // ISO (AAAA-MM-DD). Sem data, o item vai para o fim da lista.
  data?: string;
  // Link externo, ou caminho interno (ex.: /imprensa/comunicados/slug) quando há página própria.
  href: string;
  // Página própria com o texto completo:
  slug?: string;
  corpo?: Bloco[];
  documento?: string; // link para o PDF do documento original
};

export const categorias: Record<
  Categoria,
  { titulo: string; descricao: string; verTodos: string; vazio: string }
> = {
  noticias: {
    titulo: "Notícias",
    descricao: "Cobertura mediática da atividade do núcleo na imprensa local e nacional.",
    verTodos: "Ver todas",
    vazio: "Conteúdo em breve.",
  },
  artigos: {
    titulo: "Artigos de opinião",
    descricao: "Textos de membros do núcleo sobre os temas que importam à Trofa.",
    verTodos: "Ver todos",
    vazio: "Conteúdo em breve.",
  },
  comunicados: {
    titulo: "Comunicados",
    descricao: "Posições e comunicados oficiais da Iniciativa Liberal Trofa.",
    verTodos: "Ver todos",
    vazio: "Conteúdo em breve.",
  },
};

// Acrescentar novos itens aqui. A ordem não importa: são ordenados por data.
export const itens: Record<Categoria, Item[]> = {
  noticias: [
    {
      titulo: "Carlos Guimarães Pinto arranca Jornadas Liberais da Educação na Trofa",
      fonte: "Rádio Festival",
      data: "2026-03-24",
      href: "https://radiofestival.com.pt/noticia/2464448/carlos-guimaraes-pinto-arranca-jornadas-liberais-da-educacao-na-trofa",
    },
    {
      titulo: "Iniciativa Liberal da Trofa repensa o futuro da educação local",
      fonte: "Rádio Festival",
      data: "2026-03-18",
      href: "https://radiofestival.com.pt/noticia/2443845/iniciativa-liberal-da-trofa-repensa-o-futuro-da-educacao-local",
    },
    {
      titulo: "Jornadas Liberais na Trofa debatem sistema educativo",
      fonte: "Trofa TV",
      data: "2026-03-18",
      href: "https://trofatv.sapo.pt/jornadas-liberais-na-trofa-debatem-sistema-educativo/",
    },
    {
      titulo: "Deputados da IL em Bougado",
      fonte: "O Notícias da Trofa",
      data: "2022-12-15",
      href: "https://www.onoticiasdatrofa.pt/deputados-da-il-em-bougado/",
    },
  ],
  artigos: [],
  comunicados: [
    {
      titulo: "A Iniciativa Liberal da Trofa reafirma a defesa do Metro ligeiro até à Trofa",
      fonte: "Comunicado",
      slug: "metro-ligeiro-ate-a-trofa",
      href: "/imprensa/comunicados/metro-ligeiro-ate-a-trofa",
      documento: "https://drive.google.com/file/d/18maEmy2VDbClEd6jUgvitJkUQsZOqz3P/view",
      corpo: [
        {
          paragrafos: [
            "A Iniciativa Liberal da Trofa defende, desde a fundação do núcleo, a chegada do Metro ligeiro à Trofa. Esta posição consta do documento de orientação política e do nosso programa eleitoral. Perante a atual situação do projeto, reafirmamos esta posição.",
            "A Linha de Metro da Trofa, consagrada no projeto inicial do Metro do Porto, seria construída sobre o ramal existente da antiga linha estreita, desativada em 2002 com essa mesma promessa. Mais de duas décadas depois, a promessa continua por cumprir. O projeto atual aproxima o Metro da Trofa, mas deixa os últimos quilómetros dependentes de uma ligação em Metrobus, com transbordo no Muro.",
            "O Metro para a Trofa é uma causa que sempre uniu a população. Cabe à Câmara Municipal unir esforços, da mesma forma, junto das forças políticas do concelho, em torno de uma posição comum e de uma exigência conjunta perante o Governo e a Metro do Porto.",
          ],
        },
        {
          titulo: "Projeto atual",
          paragrafos: [
            "O traçado atualmente previsto não é, para nós, o melhor para a Trofa. Defendemos o traçado que mais serve a população: que aproxima o Metro das zonas residenciais, dos serviços e do comércio local, com impacto positivo na vida quotidiana dos trofenses.",
            "Sobre o traçado, podemos discutir. Sobre o tipo de transporte, não: a Iniciativa Liberal da Trofa não pode aceitar a opção de Metrobus entre o Muro e a Interface da Trofa.",
            "O troço tem cerca de 7 km. Para um percurso desta dimensão, consideramos injustificável criar um sistema que obrigue os passageiros a sair de um veículo e a mudar para outro na estação do Muro, quando o objetivo deve ser proporcionar uma ligação simples, direta e competitiva. O transbordo no Muro faz exatamente o oposto: acrescenta tempo e complexidade, retirando atratividade a uma viagem que devia ser rápida e cómoda.",
          ],
        },
        {
          titulo: "Interface da Trofa como grande nó intermodal",
          paragrafos: [
            "A criação deste transbordo penaliza toda a linha, mas retira especial importância à Interface da Trofa, local que poderia assumir-se como uma porta de entrada na AMP a norte, servindo não apenas a Trofa, mas toda a região envolvente.",
            "É precisamente aí que devemos concentrar a capacidade de ligação entre diferentes modos de transporte, criando uma rede verdadeiramente integrada que no futuro possa receber ainda mais operadores, já presentes nas principais cidades do país.",
          ],
        },
        {
          titulo: "Investir para décadas",
          paragrafos: [
            "Existe ainda uma questão que não pode ser ignorada: a escala da infraestrutura e do investimento previsto, que inclui a construção de um túnel de grandes dimensões. Não faz sentido limitar desde já essa infraestrutura a um sistema de autocarros.",
            "Acompanhamos a urgência de resolver este problema, mas a Iniciativa Liberal da Trofa não aceita uma solução provisória, com mais promessas, para um problema estrutural. Adiar a decisão certa só vai encarecer a solução final. Defendemos uma solução definitiva, pensada para o futuro da Trofa e da região, capaz de tornar o transporte coletivo verdadeiramente atrativo.",
            "A nossa posição é simples: Metro ligeiro até à Trofa. Pela Trofa. Pelo futuro.",
          ],
        },
      ],
    },
    {
      titulo: "Comunicado da IL Trofa",
      fonte: "Instagram",
      href: "https://www.instagram.com/p/DRc-eUEjIQ-/",
    },
  ],
};

export function ordenados(cat: Categoria): Item[] {
  // Ordenação estável: itens com a mesma data (ou sem data) mantêm a ordem em que estão acima.
  return [...itens[cat]].sort((a, b) => (b.data ?? "").localeCompare(a.data ?? ""));
}

export function formatarData(iso?: string): string | null {
  if (!iso) return null;
  return new Intl.DateTimeFormat("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
