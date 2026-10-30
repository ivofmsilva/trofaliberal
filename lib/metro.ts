// Dados da página "Metro para a Trofa" (/ideias/metro).
// O texto da nossa visão vem do comunicado em lib/imprensa.ts.

// Participação da IL Trofa na consulta pública (Participa.pt), entregue a 12 de outubro de 2026.
export const participacao = {
  pdf: "/metro/resposta-participa.pdf",
  processo: "Processo de AIA n.º 3950 · Linha LT ISMAI–Paradela",
  assinatura: "Bruno Magalhães, coordenador do núcleo",
  data: "12 de outubro de 2026",
  posicao:
    "Defendemos metro ligeiro em toda a linha, até ao Interface da Trofa. É a posição do núcleo desde a sua fundação. A linha foi desativada em 2002 com a promessa do metro e, vinte e quatro anos depois, o projeto serve o centro da Trofa com autocarro, sem que essa escolha tenha sido comparada com o metro.",
  pedidos: [
    "Avaliar o metro ligeiro até ao Interface da Trofa face à solução proposta: procura, tempos de viagem, efeitos ambientais e custo a 30 anos.",
    "Publicar os estudos que fundamentam o metrobus, com dados atualizados, e reabrir a participação pública.",
    "Garantir que o troço ISMAI–Muro avança no calendário previsto, sem depender desta reavaliação.",
    "Se, contra a nossa posição, a solução metrobus vier a ser aprovada, impor na Declaração de Impacte Ambiental que viadutos, túnel, canal e cais sejam dimensionados para metro ligeiro, com o custo de conversão publicado e uma data (ou um patamar de procura) para a desencadear.",
    "Detalhar a integração no Interface e aproximar as estações das zonas residenciais, dos serviços e do comércio.",
  ],
};

export const consulta = {
  nome: "Estudo de Impacte Ambiental da Linha ISMAI–Paradela (Metro do Porto até à Trofa)",
  inicio: "31 de agosto de 2026",
  fim: "12 de outubro de 2026",
  portal: "https://participa.pt/pt/consulta/linha-lt-ismai-paradela-do-metro-do-porto",
};

// Início da contagem de dias à espera (a mesma data da imagem da "senha 9000").
// As fontes divergem entre 23 e 24 de fevereiro de 2002; a página diz só "fevereiro de 2002".
export const esperaDesde = "2002-02-23";

export function diasDesde(iso: string, agora: number = Date.now()): number {
  return Math.floor((agora - new Date(`${iso}T00:00:00`).getTime()) / 86_400_000);
}

// ---- O projeto atual -------------------------------------------------------
// Proporção do desenho: ≈3 km de metro ligeiro e ≈7 km de metrobus (30% / 70%).
export const projeto = {
  metroKm: "≈ 3 km",
  busKm: "≈ 7 km",
  fonte: {
    titulo: "Trofa TV",
    href: "https://trofatv.sapo.pt/estudo-de-impacte-ambiental-do-metro-ate-a-trofa-entra-em-consulta-publica-com-2-alternativas-para-o-atravessamento-da-en14/",
  },
};

// ---- História --------------------------------------------------------------
// Regra: cada facto tem no máximo UMA fonte e nenhuma fonte aparece em dois factos.
export type Fonte = { nome: string; href: string };

export type Facto = {
  quando: string;
  titulo: string;
  texto: string;
  fonte?: Fonte;
  // Ligação interna (ex.: "#participacao") em vez de fonte externa.
  ligacao?: { nome: string; href: string };
};

export const cronologia: Facto[] = [
  {
    quando: "1996",
    titulo: "O primeiro projeto: a Trofa na 1.ª fase do metro",
    texto:
      "A linha da Trofa é uma das quatro da primeira fase da rede do Metro do Porto, projetada em 1996.",
    fonte: {
      nome: "Público (2020)",
      href: "https://www.publico.pt/2020/01/23/local/noticia/presidente-camara-trofa-pede-saida-governo-ministro-alucinado-ambiente-1901445",
    },
  },
  {
    quando: "Fevereiro de 2002",
    titulo: "O comboio sai para dar lugar ao metro",
    texto:
      "O serviço ferroviário até à Trofa é suprimido para dar lugar ao metro. Os carris do metro nunca chegaram a ser assentes e os autocarros ocuparam o lugar do comboio.",
    fonte: {
      nome: "O Notícias da Trofa (2019)",
      href: "https://www.onoticiasdatrofa.pt/foi-ha-quase-duas-decadas-que-a-trofa-ficou-mais-pobre/",
    },
  },
  {
    quando: "Março de 2006",
    titulo: "O metro chega ao ISMAI e pára",
    texto:
      "A Linha C fica concluída até ao ISMAI, na Maia. Daí até à Trofa, nada. É também em 2006 que começa o protesto da população do Muro.",
  },
  {
    quando: "1 de outubro de 2008",
    titulo: "O segundo projeto: 8 estações, 140 milhões, abertura em 2012",
    texto:
      "A Metro do Porto apresenta o prolongamento do ISMAI à Trofa: 10,7 km, com estações em Ribela, Muro, Serra, Bougado, Pateiras, Senhora das Dores, Trofa e Paradela, e entrada em funcionamento em 2012.",
    fonte: {
      nome: "Metro do Porto, 2.ª e 3.ª fases da rede",
      href: "https://www.metrodoporto.pt/uploads/document/file/69/2__e_3__fases_da_rede_do_Metro_do_Porto.pdf",
    },
  },
  {
    quando: "2010",
    titulo: "O projeto sai do plano",
    texto:
      "A Metro do Porto retira o prolongamento à Trofa do seu plano de atividades.",
    fonte: {
      nome: "JPN (2012)",
      href: "https://www.jpn.up.pt/2012/12/07/10-anos-do-metro-do-porto-a-trofa-ainda-espera-pela-linha-verde/",
    },
  },
  {
    quando: "2011 a 2016",
    titulo: "A população protesta: petição e boicotes no Muro",
    texto:
      "Em 2011, 8206 subscritores fazem chegar à Presidência da República uma petição a pedir a construção da linha “com a máxima urgência”. Nesse ano e nos seguintes, o Muro responde nas urnas: as mesas de voto não abrem nas presidenciais de 2011, nas europeias de 2014 e nas presidenciais de 2016, em protesto pelo atraso do metro.",
    fonte: {
      nome: "TVI (2016)",
      href: "https://tvi.iol.pt/noticias/politica/eleicoes/mesas-de-voto-encerradas-em-freguesia-da-trofa",
    },
  },
  {
    quando: "14 de julho de 2017",
    titulo: "A Câmara leva o Estado e a Metro do Porto a tribunal",
    texto:
      "Poucas semanas depois, o município processa o Estado e a Metro do Porto no tribunal de Penafiel por não ter sido feita a extensão do metro à Trofa.",
    fonte: {
      nome: "Observador (2020)",
      href: "https://observador.pt/2020/01/23/metro-do-porto-estuda-solucao-para-antigo-corredor-ferroviario-da-trofa/",
    },
  },
  {
    quando: "10 de julho de 2021",
    titulo: "“O túnel não foi acautelado”",
    texto:
      "Sérgio Humberto, presidente da Câmara e candidato do PSD, diz que “não faz sentido passar no centro da Alameda, desfazendo o parque Nossa Senhora das Dores, quando o túnel não foi acautelado”.",
    fonte: {
      nome: "Jornal de Notícias (2021)",
      href: "https://www.jn.pt/pais/artigo/duas-decadas-a-espera-que-a-linha-de-metro-da-trofa-saia-do-papel/13926272",
    },
  },
  {
    quando: "26 de outubro de 2023",
    titulo: "A IL denuncia: “não é uma extensão de metro até à Trofa”",
    texto:
      "Em comunicado, os liberais alertam que o projeto combina metro e autocarro, com transbordo na estação do Muro.",
    fonte: {
      nome: "Correio da Manhã / Lusa (2023)",
      href: "https://www.cmjornal.pt/sociedade/detalhe/il-critica-expansao-do-metro-do-porto-e-recurso-a-metrobus-nas-novas-linhas",
    },
  },
  {
    quando: "18 de agosto de 2025",
    titulo: "A Metro do Porto admite o problema do transbordo",
    texto:
      "O presidente da Metro do Porto reconhece que mudar de veículo no Muro pode prejudicar a qualidade do serviço.",
    fonte: {
      nome: "Público / Lusa (2025)",
      href: "https://www.publico.pt/2025/08/18/local/noticia/concursos-metro-chegar-gondomar-brt-trofa-lancados-inicio-2026-2144227",
    },
  },
  {
    quando: "31 de janeiro de 2026",
    titulo: "Metro até ao Muro, metrobus até Paradela",
    texto:
      "Confirma-se o desenho do projeto, com arranque previsto em 2026. O projeto é contestado por movimentos da região.",
    fonte: {
      nome: "Rádio Metropolitana Porto (2026)",
      href: "https://www.radiometropolitanaporto.pt/trofa-tera-metro-ate-ao-muro-e-ligacao-em-metrobus-ate-paradela-a-partir-de-2026/",
    },
  },
  {
    quando: "31 de agosto a 12 de outubro de 2026",
    titulo: "Consulta pública do projeto",
    texto:
      "O Estudo de Impacte Ambiental esteve em consulta pública no Participa.pt. A IL Trofa respondeu, defendendo o metro ligeiro até ao Interface da Trofa.",
    ligacao: { nome: "Ver a nossa participação", href: "#participacao" },
  },
  {
    quando: "Hoje",
    titulo: "0 km de metro no concelho da Trofa",
    texto: "Mais de duas décadas depois, o comboio não voltou e o metro ainda não chegou.",
  },
];

// ---- Uma causa mal gerida ---------------------------------------------------
// Resumo dos factos da cronologia (sem novas fontes): ninguém fica de fora.
export const gestao = {
  intro:
    "Não é uma questão de cores. Em vinte e quatro anos, vários governos prometeram, adiaram, desenharam e redesenharam o metro da Trofa, e o metro continua por chegar.",
  blocos: [
    {
      titulo: "O Estado tirou o comboio e não deu o metro",
      texto:
        "A Trofa estava no projeto inicial da Metro do Porto. Em 2002 tiram o comboio. Em 2008 o novo projeto promete a abertura em 2012. Em 2010 o prolongamento já tinha saído do plano da Metro do Porto. Os governos seguintes continuam a adiar. Foram vários os avanços e recuos.",
    },
    {
      titulo: "A Câmara fez obras no centro sem acautelar o metro",
      texto:
        "O Parque N. Senhora das Dores foi requalificado em 2015, a Alameda da Estação inaugurada em 2017 e os novos Paços do Concelho em 2022, projetados e executados por vários executivos da Câmara. Em 2021, Sérgio Humberto admitiu que “o túnel não foi acautelado”.",
    },
    {
      titulo: "No fim, quem paga são os trofenses",
      texto:
        "Em 2011, 2014 e 2016 o Muro deixou as urnas vazias para se fazer ouvir. Vinte e quatro anos depois da promessa, o projeto em consulta leva o metro só até ao Muro e entrega o resto a autocarro: quem vive na Trofa continua a ter de mudar de veículo a meio do caminho para seguir viagem.",
    },
  ],
  // Frase do documento do projeto da Metro do Porto (fotografia enviada pelo núcleo; sem ligação).
  destaque: {
    frase:
      "…após a intervenção na área do novo edifício dos Paços do Concelho e Parque Nossa Senhora das Dores, que inviabilizaram o percurso original.",
    fonte: "Documento do projeto da Metro do Porto (Ayesa Grid), sobre a decisão de redefinir o projeto",
  },
};

// Frase da nossa participação, em destaque na página.
export const destaqueParticipacao =
  "O metro deve chegar ao nó que liga a Trofa ao Norte, e não obrigar a mudar de veículo a meio do caminho. Fazer bem agora custa menos do que corrigir depois.";

// ---- Porque o metro até ao Interface (da nossa participação) ----------------
export const argumentos = [
  {
    titulo: "O metro pára antes do nó",
    texto:
      "No Interface da Trofa param os comboios das linhas de Braga e de Guimarães e os autocarros, e convergem os principais acessos ao concelho. Com metro até lá, cada pessoa muda uma vez, no sítio certo. Com o projeto atual, quem chega de comboio e segue para a Maia muda duas vezes.",
  },
  {
    titulo: "Viagem direta",
    texto:
      "Do Interface à Trindade sem mudar de veículo, na Linha C. Cada transbordo custa tempo e afasta passageiros, e esse efeito devia ter sido quantificado.",
  },
  {
    titulo: "Mais capacidade",
    texto:
      "O metro tem uma capacidade muito superior à do metrobus. Isso evita esperas desnecessárias, a necessidade de pôr mais autocarros na estrada e os problemas de lotação nas horas de ponta.",
  },
  {
    titulo: "Um sistema, não dois",
    texto:
      "O metrobus obrigaria a manter uma frota à parte, com carregadores, circuito de inversão no Muro, manutenção e motoristas próprios. Esses custos têm de ser contabilizados.",
  },
  {
    titulo: "Infraestrutura para décadas",
    texto:
      "A via e os veículos de metro duram décadas e os autocarros são substituídos muito antes. O metrobus custa menos a construir, mas, ao longo de toda a vida útil e por lugar oferecido, os custos aproximam-se. O custo a 30 anos das duas soluções nunca foi apresentado.",
  },
  {
    titulo: "Efeito estruturante",
    texto:
      "Uma linha de metro fixa habitação, emprego e investimento, e mais gente troca o carro pelo metro, com mais conforto e melhor ambiente. Um corredor de autocarros não dá a mesma garantia.",
  },
];

// ---- Campanha --------------------------------------------------------------
// Cartazes e materiais da campanha sobre o metro (ficheiros em public/images/cartazes/).
export const cartazesMetro = [
  {
    src: "/images/cartazes/cartaz-57.jpeg",
    w: 712,
    h: 956,
    legenda: "Metro para a Trofa já! Bus não é solução.",
  },
  {
    src: "/images/cartazes/cartaz-54.png",
    w: 532,
    h: 510,
    legenda: "O Muro perdeu o comboio. Não deixes que perca o metro. #MetroParaATrofaJá",
  },
  {
    src: "/images/cartazes/cartaz-58.jpeg",
    w: 502,
    h: 502,
    legenda: "Metro pelo centro! Mobilidade para servir a população.",
  },
  {
    src: "/images/cartazes/cartaz-56.jpeg",
    w: 533,
    h: 667,
    legenda: "Querias o Andante, dão-te o Atrasante.",
  },
];
