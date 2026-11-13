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
  // Notícias da campanha autárquica 2025: aparecem também na página "Outros" das Autárquicas.
  tema?: "autarquicas";
};

export const categorias: Record<
  Categoria,
  { titulo: string; descricao: string; verTodos: string; vazio: string; nota?: string }
> = {
  noticias: {
    titulo: "Notícias",
    descricao: "Cobertura mediática da atividade do núcleo na imprensa local e nacional.",
    verTodos: "Ver todas",
    vazio: "Conteúdo em breve.",
  },
  artigos: {
    titulo: "Artigos de Opinião",
    descricao: "Textos de membros do núcleo sobre os temas que importam.",
    // Aparece no fim da lista dos artigos.
    nota: "Os artigos de opinião exprimem apenas a opinião de quem os assina e não vinculam o Núcleo da Trofa nem a Iniciativa Liberal.",
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
      titulo: "Diamantino Costa eleito para Conselho de Fiscalização da IL",
      fonte: "Jornal do Ave",
      data: "2025-02-03",
      href: "https://jornaldoave.sapo.pt/diamantino-costa-eleito-para-conselho-de-fiscalizacao-da-il/",
    },
    {
      titulo: "Entrevista a Diamantino Costa, candidato da Iniciativa Liberal à Câmara Municipal da Trofa",
      fonte: "Trofa TV",
      data: "2025-09-12",
      href: "https://trofatv.sapo.pt/entrevista-a-diamantino-costa-candidato-da-iniciativa-liberal-a-camara-municipal-da-trofa/",
      tema: "autarquicas",
    },
    {
      titulo: "IL da Trofa apresenta candidatos às autárquicas no sábado",
      fonte: "O Notícias da Trofa",
      data: "2025-07-30",
      href: "https://www.onoticiasdatrofa.pt/il-da-trofa-apresenta-candidatos-as-autarquicas-no-sabado/",
      tema: "autarquicas",
    },
    {
      titulo: "Mais uma força política. Iniciativa Liberal fundou núcleo",
      fonte: "O Notícias da Trofa",
      data: "2022-07-12",
      href: "https://www.onoticiasdatrofa.pt/mais-uma-forca-politica-iniciativa-liberal-fundou-nucleo/",
    },
    {
      titulo: "Presidente da Iniciativa Liberal na Trofa para a apresentação do programa eleitoral do partido para as autárquicas",
      fonte: "Trofa TV",
      data: "2025-09-11",
      href: "https://trofatv.sapo.pt/presidente-da-iniciativa-liberal-na-trofa-para-a-apresentacao-do-programa-eleitoral-do-partido-para-as-autarquicas/",
      tema: "autarquicas",
    },
    {
      titulo: "Iniciativa Liberal arranca Jornadas da Educação com visita ao CENFIM da Trofa",
      fonte: "Jornal do Ave",
      data: "2026-03-25",
      href: "https://jornaldoave.sapo.pt/iniciativa-liberal-arranca-jornadas-da-educacao-com-visita-ao-cenfim-da-trofa/",
    },
    {
      titulo: "Com novo líder, Iniciativa Liberal recolhe ideias para programa eleitoral autárquico",
      fonte: "O Notícias da Trofa",
      data: "2024-09-26",
      href: "https://www.onoticiasdatrofa.pt/com-novo-lider-iniciativa-liberal-recolhe-ideias-para-programa-eleitoral-autarquico/",
      tema: "autarquicas",
    },
    {
      titulo: "Oficializado núcleo da Iniciativa Liberal",
      fonte: "O Notícias da Trofa",
      data: "2022-04-20",
      href: "https://www.onoticiasdatrofa.pt/oficializado-nucleo-da-iniciativa-liberal/",
    },
    {
      titulo: "IL Trofa lança campanha para formar listas autárquicas",
      fonte: "O Notícias da Trofa",
      data: "2025-05-26",
      href: "https://www.onoticiasdatrofa.pt/il-trofa-lanca-campanha-para-formar-listas-autarquicas/",
      tema: "autarquicas",
    },
    {
      titulo: "Iniciativa Liberal entrega listas autárquicas para o concelho da Trofa",
      fonte: "O Notícias da Trofa",
      data: "2025-08-14",
      href: "https://www.onoticiasdatrofa.pt/iniciativa-liberal-entrega-listas-autarquicas-para-o-concelho-da-trofa/",
      tema: "autarquicas",
    },
    {
      titulo: "Iniciativa Liberal apresenta candidatos a 3 freguesias",
      fonte: "O Notícias da Trofa",
      data: "2025-06-26",
      href: "https://www.onoticiasdatrofa.pt/iniciativa-liberal-apresenta-candidatos-a-3-freguesias/",
      tema: "autarquicas",
    },
    {
      titulo: "Diamantino Costa é o candidato da Iniciativa Liberal à Câmara da Trofa",
      fonte: "O Notícias da Trofa",
      data: "2025-06-03",
      href: "https://www.onoticiasdatrofa.pt/diamantino-costa-e-o-candidato-da-iniciativa-liberal-a-camara-da-trofa/",
      tema: "autarquicas",
    },
    {
      titulo: "Iniciativa Liberal apresenta candidatos às autárquicas na Trofa",
      fonte: "Trofa TV",
      data: "2025-08-03",
      href: "https://www.facebook.com/trofatv/posts/iniciativa-liberal-apresenta-candidatos-%C3%A0s-aut%C3%A1rquicas-na-trofadecorreu-ontem-s%C3%A1/1328862002580673/",
      tema: "autarquicas",
    },
    {
      titulo: "Bruno Magalhães eleito coordenador da Iniciativa Liberal da Trofa",
      fonte: "O Notícias da Trofa",
      data: "2026-10-06",
      href: "https://www.onoticiasdatrofa.pt/bruno-magalhaes-eleito-coordenador-da-iniciativa-liberal-da-trofa/",
    },
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
      titulo: "Trofenses na lista da Iniciativa Liberal ao Parlamento",
      fonte: "O Notícias da Trofa",
      data: "2024-01-24",
      href: "https://www.onoticiasdatrofa.pt/trofenses-na-lista-da-iniciativa-liberal-ao-parlamento/",
    },
    {
      titulo: "Deputados da IL em Bougado",
      fonte: "O Notícias da Trofa",
      data: "2022-12-15",
      href: "https://www.onoticiasdatrofa.pt/deputados-da-il-em-bougado/",
    },
  ],
  // Artigos de opinião de Diamantino Costa n'O Notícias da Trofa (coluna "Folha Liberal" e seguintes).
  artigos: [
    {
      titulo: "Portugal já sabe o que está errado",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2026-10-10",
      href: "https://www.onoticiasdatrofa.pt/portugal-ja-sabe-o-que-esta-errado/",
    },
    {
      titulo: "A conta chega sempre",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2026-09-25",
      href: "https://www.onoticiasdatrofa.pt/a-conta-chega-sempre/",
    },
    {
      titulo: "O problema de Portugal não é saber. É fazer",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2026-09-15",
      href: "https://www.onoticiasdatrofa.pt/o-problema-de-portugal-nao-e-saber-e-fazer/",
    },
    {
      titulo: "A utopia de empobrecer para salvar o mundo",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2026-07-17",
      href: "https://www.onoticiasdatrofa.pt/a-utopia-de-empobrecer-para-salvar-o-mundo/",
    },
    {
      titulo: "O país que, afinal, era mais pobre do que pensávamos",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2026-07-08",
      href: "https://www.onoticiasdatrofa.pt/o-pais-que-afinal-era-mais-pobre-do-que-pensavamos/",
    },
    {
      titulo: "Gerir bem é importante. Mas pode não ser suficiente",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2026-06-23",
      href: "https://www.onoticiasdatrofa.pt/gerir-bem-e-importante-mas-pode-nao-ser-suficiente/",
    },
    {
      titulo: "Dependentes de Bruxelas",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2026-06-10",
      href: "https://www.onoticiasdatrofa.pt/dependentes-de-bruxelas/",
    },
    {
      titulo: "O conforto enganador das contas certas",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2026-05-09",
      href: "https://www.onoticiasdatrofa.pt/o-conforto-enganador-das-contas-certas/",
    },
    {
      titulo: "Portugal, a dívida e o bloqueio à inovação",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2026-04-11",
      href: "https://www.onoticiasdatrofa.pt/portugal-a-divida-e-o-bloqueio-a-inovacao/",
    },
    {
      titulo: "Menos ecrã, mais vida!",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2026-03-30",
      href: "https://www.onoticiasdatrofa.pt/menos-ecra-mais-vida/",
    },
    {
      titulo: "Acordos pós-eleitorais, governabilidade e transparência",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2025-12-16",
      href: "https://www.onoticiasdatrofa.pt/acordos-pos-eleitorais-governabilidade-e-transparencia/",
    },
    {
      titulo: "Um Estado que sufoca – e uma Câmara que o imita",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2025-07-25",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-um-estado-que-sufoca-e-uma-camara-que-o-imita/",
    },
    {
      titulo: "O labirinto eleitoral português: uma crítica à desproporcionalidade representativa",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2025-04-28",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-o-labirinto-eleitoral-portugues-uma-critica-a-desproporcionalidade-representativa/",
    },
    {
      titulo: "Perder, mas insistir!",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2025-04-01",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-perder-mas-insistir/",
    },
    {
      titulo: "Buracos e Cartazes!",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2025-03-15",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-buracos-e-cartazes/",
    },
    {
      titulo: "Liberalismo e Sindicalismo",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2025-03-08",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-liberalismo-e-sindicalismo/",
    },
    {
      titulo: "União de Freguesias em Portugal: Uma análise das Vantagens e Desvantagens",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2025-02-03",
      href: "https://www.onoticiasdatrofa.pt/uniao-de-freguesias-em-portugal-uma-analise-das-vantagens-e-desvantagens/",
    },
    {
      titulo: "Literacia Financeira: Um Investimento para o Futuro",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2025-01-19",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-literacia-financeira-um-investimento-para-o-futuro/",
    },
    {
      titulo: "Sistema fiscal português pouco competitivo",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2025-01-04",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-sistema-fiscal-portugues-pouco-competitivo/",
    },
    {
      titulo: "Atendimento na Saúde é atendimento telefónico?",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2024-12-23",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-atendimento-na-saude-e-atendimento-telefonico/",
    },
    {
      titulo: "A situação do INEM espelha a situação do país",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2024-11-23",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-a-situacao-do-inem-espelha-a-situacao-do-pais/",
    },
    {
      titulo: "Leis que não se cumprem e orçamentos escondidos!",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2024-11-08",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-leis-que-nao-se-cumprem-e-orcamentos-escondidos/",
    },
    {
      titulo: "É assim tão importante 1% de IRC?",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2024-10-30",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-e-assim-tao-importante-1-de-irc/",
    },
    {
      titulo: "Dizer que se dá com uma mão e tirar com as duas",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2024-09-28",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-dizer-que-se-da-com-uma-mao-e-tirar-com-as-duas/",
    },
    {
      titulo: "Não sei, não quero saber e não respondo",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2024-07-28",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-nao-sei-nao-quero-saber-e-nao-respondo/",
    },
    {
      titulo: "Estado grande",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2024-07-17",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-estado-grande/",
    },
    {
      titulo: "O relatório de gestão da Câmara da Trofa",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2024-07-03",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-o-relatorio-de-gestao-da-camara-da-trofa/",
    },
    {
      titulo: "As eleições europeias",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2024-06-14",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-as-eleicoes-europeias/",
    },
    {
      titulo: "De volta ao défice?",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2024-06-03",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-de-volta-ao-defice/",
    },
    {
      titulo: "O país das meias-verdades!",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2024-05-19",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-o-pais-das-meias-verdades/",
    },
    {
      titulo: "Viva a Europa!",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2024-05-03",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-viva-a-europa/",
    },
    {
      titulo: "Governo novo, vícios velhos",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2024-04-24",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-governo-novo-vicios-velhos/",
    },
    {
      titulo: "A política sem risco é uma chatice, mas sem ética é uma vergonha",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2024-04-10",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-a-politica-sem-risco-e-uma-chatice-mas-sem-etica-e-uma-vergonha/",
    },
    {
      titulo: "Copo meio cheio ou meio vazio!",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2024-03-26",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-copo-meio-cheio-ou-meio-vazio/",
    },
    {
      titulo: "Oportunidade de mudar para avançar!",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2024-01-29",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-oportunidade-de-mudar-para-avancar/",
    },
    {
      titulo: "Outra vez o IMI…",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2024-01-16",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-outra-vez-o-imi/",
    },
    {
      titulo: "Não há corrupção boa!",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-12-31",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-nao-ha-corrupcao-boa/",
    },
    {
      titulo: "A culpa é de Hondt…",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-12-18",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-a-culpa-e-de-hondt/",
    },
    {
      titulo: "Transparência Municipal na Trofa: Uma Análise Crítica",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-12-07",
      href: "https://www.onoticiasdatrofa.pt/trofa-liberal-transparencia-municipal-na-trofa-uma-analise-critica/",
    },
    {
      titulo: "Quando o sábio aponta para a lua, o tolo só vê o dedo",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-11-17",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-quando-o-sabio-aponta-para-a-luao-tolo-so-ve-o-dedo/",
    },
    {
      titulo: "Luzes… Câmara… distração!",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-11-04",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-luzes-camara-distracao/",
    },
    {
      titulo: "O Orçamento do Estado para 2024",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-10-25",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-o-orcamento-do-estado-para-2024/",
    },
    {
      titulo: "Afinal quem é que investe 8 milhões de euros na educação, na Trofa?",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-10-09",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-afinal-quem-e-que-investe-8-milhoes-de-euros-na-educacao-na-trofa/",
    },
    {
      titulo: "Para a Câmara não há “silly season”",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-09-12",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-para-a-camara-nao-ha-silly-season/",
    },
    {
      titulo: "O estado da nação",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-07-31",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-o-estado-da-nacao/",
    },
    {
      titulo: "Qual é melhor? Inflação alta ou juros baixos?",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-07-19",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-qual-e-melhor-inflacao-alta-ou-juros-baixos/",
    },
    {
      titulo: "A dificuldade do Governo em fazer cálculos",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-07-04",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-a-dificuldade-do-governo-em-fazer-calculos/",
    },
    {
      titulo: "Aviões, comboios, bicicletas e trotinetes",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-06-19",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-avioes-comboios-bicicletas-e-trotinetes/",
    },
    {
      titulo: "Portugal no topo… dos impostos mais altos",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-06-06",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-portugal-no-topo-dos-impostos-mais-altos/",
    },
    {
      titulo: "É por “patriotismo”…",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-05-22",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-e-por-patriotismo/",
    },
    {
      titulo: "Sociedade Civil e 25 de Abril",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-05-14",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-sociedade-civil-e-25-de-abril/",
    },
    {
      titulo: "Gestão pública e gestão privada",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-04-24",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-gestao-publica-e-gestao-privada/",
    },
    {
      titulo: "A taxa de participação no IRS na Trofa",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-04-09",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-a-taxa-de-participacao-no-irs-na-trofafolha-liberal/",
    },
    {
      titulo: "A Trofa tem mesmo a maior taxa de IMI da Área Metropolitana do Porto",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-03-25",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-a-trofa-tem-mesmo-a-maior-taxa-de-imi-da-area-metropolitana-do-porto/",
    },
    {
      titulo: "Com a verdade me enganas…",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-03-12",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-com-a-verdade-me-enganas/",
    },
    {
      titulo: "Trofa com grande audiência na Ribeira Grande",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-02-28",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-trofa-com-grande-audiencia-na-ribeira-grande/",
    },
    {
      titulo: "Cada vez mais dependentes do Estado",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-02-14",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-cada-vez-mais-dependentes-do-estado/",
    },
    {
      titulo: "A greve dos professores e a contratação municipal",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-01-29",
      href: "https://www.onoticiasdatrofa.pt/a-greve-dos-professores-e-a-contratacao-municipal/",
    },
    {
      titulo: "O IMI e o orçamento da Câmara da Trofa",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2023-01-13",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-o-imi-e-o-orcamento-da-camara-da-trofa/",
    },
    {
      titulo: "Estado social ao contrário",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2022-12-30",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-estado-social-ao-contrario/",
    },
    {
      titulo: "Orçamentos",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2022-12-16",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-orcamentos/",
    },
    {
      titulo: "Adeus Metro até à Trofa",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2022-12-08",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-adeus-metro-ate-a-trofa/",
    },
    {
      titulo: "Braços ao ar!",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2022-11-21",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-bracos-ao-ar/",
    },
    {
      titulo: "Não! Não era um orçamento liberal!",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2022-11-04",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-nao-nao-era-um-orcamento-liberal/",
    },
    {
      titulo: "O Orçamento de Estado",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2022-10-20",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-o-orcamento-de-estado/",
    },
    {
      titulo: "Contratações e equilíbrio orçamental",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2022-10-07",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-contratacoes-e-equilibrio-orcamental/",
    },
    {
      titulo: "Lucros excessivos",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2022-09-13",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-lucros-excessivos/",
    },
    {
      titulo: "Receita fiscal recorde! Serviços públicos mínimos",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2022-08-05",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-receita-fiscal-recorde-servicos-publicos-minimos/",
    },
    {
      titulo: "Salários (Parte 2)",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2022-07-22",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-salarios-parte-2/",
    },
    {
      titulo: "Salários",
      fonte: "Diamantino Costa · O Notícias da Trofa",
      data: "2022-07-07",
      href: "https://www.onoticiasdatrofa.pt/folha-liberal-salarios/",
    },
  ],
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
      titulo: "IL Trofa toma nota do acordo de maioria entre a Câmara e o PS",
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
