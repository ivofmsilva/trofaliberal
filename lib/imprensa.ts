export type Categoria = "noticias" | "artigos" | "comunicados";

export type Item = {
  titulo: string;
  fonte?: string;
  // ISO (AAAA-MM-DD). Sem data, o item vai para o fim da lista.
  data?: string;
  href: string;
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
      titulo: "Comunicado da IL Trofa",
      fonte: "Instagram",
      href: "https://www.instagram.com/p/DRc-eUEjIQ-/",
    },
  ],
};

export function ordenados(cat: Categoria): Item[] {
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
