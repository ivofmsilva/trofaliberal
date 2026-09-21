const ig = (id: string) => `https://www.instagram.com/p/${id}/`;

export const hino = "https://www.youtube.com/watch?v=I_ooMSUA6Ds";

export const programas = [
  {
    titulo: "Programa Trofa Para Cima",
    texto: "O programa autárquico completo para o concelho: menos burocracia, mais liberdade, e uma Trofa mais próspera para todos.",
    href: "/programas/programa-trofa-para-cima.pdf",
  },
  {
    titulo: "Programa Alvarelhos Liberal",
    texto: "Propostas específicas para a freguesia de Alvarelhos, mais próximas, mais presentes e mais proativas.",
    href: "/programas/programa-alvarelhos.pdf",
  },
  {
    titulo: "Programa Bougado Liberal",
    texto: "Um plano de ação para Bougado, com ideias concretas para melhorar o dia a dia da freguesia.",
    href: "/programas/programa-bougado.pdf",
  },
];

export type Candidato = {
  slug: string;
  nome: string;
  cargo: string;
  frase: string;
  bio: string[];
  citacao?: string;
  funcoes: string[];
  extraTitulo?: string;
  extra?: string[];
  video: string; // id do post no Instagram
  programa?: string;
  perfilNacional?: string;
};

export const candidatos: Candidato[] = [
  {
    slug: "diamantino-costa",
    nome: "Diamantino Costa",
    cargo: "Candidato à Câmara Municipal",
    frase: "Se a Trofa é um diamante, então precisa do Diamantino!",
    bio: [
      "Com um sólido perfil técnico e uma vasta experiência empresarial, Diamantino Costa é uma voz firme na defesa do liberalismo no concelho da Trofa e em toda a região do Ave.",
      "Contabilista certificado há mais de 25 anos, é atualmente diretor-geral da Sparkes & Sparkes LDA, empresa de referência no setor automóvel, área que é também uma das suas grandes paixões. Paralelamente, integra a direção da ARAN — Associação Nacional do Ramo Automóvel, contribuindo ativamente para a modernização do setor em Portugal.",
      "Pai e avô, acredita que Portugal precisa de se tornar um país mais simples e competitivo para que os jovens possam aqui permanecer, crescer e ser felizes. Ao longo dos anos, tem participado em diversos projetos locais com esse objetivo.",
      "Na Iniciativa Liberal, colaborou no Gabinete de Estudos e mantém-se ativo no iLab, na área de finanças e fiscalidade, a sua especialidade, contribuindo para a elaboração das propostas do partido. Foi ainda cabeça de lista ao Conselho de Fiscalização da IL, onde foi eleito e exerce funções até hoje.",
      "Há três anos assina a crónica “Folha Liberal” num jornal local, onde explica e descomplica as propostas liberais de forma simples mas sempre rigorosa. É também o membro mais antigo da IL na Trofa, já tendo desempenhado os cargos de vice-coordenador e tesoureiro por duas vezes.",
    ],
    citacao:
      "Diz-se só mais uma voz liberal, mas certamente terá uma grande importância no futuro do nosso concelho. Se a Trofa é um diamante, então precisa do Diamantino!",
    funcoes: [
      "Diretor-geral da Sparkes & Sparkes LDA",
      "Membro da direção da ARAN — Associação Nacional do Ramo Automóvel",
      "Membro do Conselho de Fiscalização da Iniciativa Liberal",
      "Membro do iLab — Gabinete de Estudos da Iniciativa Liberal",
      "Contabilista certificado há mais de 25 anos",
      "Cronista no jornal local há 3 anos",
      "Colaborador ativo em vários projetos sociais locais",
    ],
    video: "DMkY9gnpGxv",
    programa: "/programas/programa-trofa-para-cima.pdf",
    perfilNacional: "https://iniciativaliberal.pt/partido/candidatos-2025/diamantino-costa/",
  },
  {
    slug: "jose-pedro-reis",
    nome: "José Pedro Reis",
    cargo: "Candidato à Assembleia Municipal",
    frase: "Um verdadeiro “homem dos sete ofícios” — e pronto para assumir o oitavo!",
    bio: [
      "Professor de História e historiador, José Pedro Reis alia à paixão pelo ensino uma longa experiência como bombeiro voluntário na Associação Humanitária dos Bombeiros Voluntários Tirsenses, além de árbitro e dirigente de futebol. É também investigador na Faculdade de Letras da Universidade do Porto.",
      "Ao longo da sua carreira docente, percorreu várias regiões do país, lecionando em locais tão distintos como Barrancos, Portimão, Vila Nova de Cerveira, Vila das Aves, Moncorvo, São Romão do Coronado e Ribeirão, experiência que lhe deu uma visão abrangente da diversidade de realidades nacionais.",
      "Com uma curiosidade insaciável e a convicção de que “o saber não ocupa espaço”, continua a investir na sua formação académica: está a concluir uma pós-graduação em Fogos Rurais, um mestrado em Geografia e Proteção Civil e um doutoramento em História.",
      "Autor de quatro livros, entre os quais “Trofa um passado de progresso” (2020) e a biografia “Heliodoro Salgado — Um Homem de Lutas”, escreve há oito anos uma crónica no jornal O Notícias da Trofa, onde partilha episódios e memórias da Trofa de outros tempos, aproximando a comunidade da sua identidade e património cultural.",
      "Em 2022 foi um dos fundadores do núcleo da Iniciativa Liberal na Trofa, tendo sido eleito o seu primeiro coordenador. Na Convenção Nacional da IL de julho de 2025, apresentou a moção “Desburocratizar, transformar e modernizar os bombeiros em Portugal”, aprovada pelos delegados, que defende a criação de carreira para bombeiros voluntários e a simplificação de regras burocráticas.",
    ],
    citacao:
      "É urgente repensar o sistema de proteção civil em Portugal. O salvamento não pode continuar a ser concebido como tem sido há praticamente século e meio.",
    funcoes: [
      "Professor de História e investigador na Faculdade de Letras da Universidade do Porto",
      "Historiador e autor de 4 livros sobre a Trofa",
      "Bombeiro voluntário na Associação Humanitária dos Bombeiros Voluntários Tirsenses",
      "Cronista no jornal O Notícias da Trofa (há 8 anos)",
      "Vice-coordenador do núcleo da Iniciativa Liberal da Trofa",
      "Porta-voz da Iniciativa Liberal no município da Trofa",
    ],
    video: "DMs-QG5vb7L",
  },
  {
    slug: "pedro-rebelo",
    nome: "Pedro Rebelo",
    cargo: "Candidato à Junta de Freguesia de Bougado",
    frase: "Ideias, visão e energia para melhorar Bougado.",
    bio: [
      "Assistente Técnico desde 1999 até à presente data, exerceu funções na DREN — Direção Regional de Educação Norte — e, desde 2007, no Agrupamento de Escolas da Trofa, pertencendo ao Ministério da Educação. Desde 2023 pertence aos quadros do Município da Trofa.",
      "Está também ligado ao desporto concelhio, sendo Presidente do Conselho Fiscal do Atlético Clube Bougadense desde 2019.",
      "Cidadão comum sem passado político, é uma pessoa que identifica as oportunidades de melhoria e toma a iniciativa de as concretizar. Acredita que as experiências que enfrentou na vida, os lugares que conheceu e as pessoas com quem conviveu o ajudaram a melhorar a sua visão de comunidade, e quer agora retribuir à terra que tão bem o acolheu.",
      "Apresenta-se a esta candidatura de forma honesta, para melhorar Bougado, com ideias, visão e energia. É independente, mas identifica-se com a visão liberal e acredita que um Bougado mais liberal será um Bougado mais desenvolvido, com melhores condições de vida para todos.",
    ],
    citacao:
      "Queremos ser uma alternativa positiva e credível, com ideias claras para melhorar a qualidade de vida dos bougadenses.",
    funcoes: [
      "Assistente Técnico no Município da Trofa (desde 2023)",
      "Ex-DREN e Agrupamento de Escolas da Trofa",
      "Presidente do Conselho Fiscal do Atlético Clube Bougadense (desde 2019)",
      "Candidato independente em lista liberal",
    ],
    extraTitulo: "Prioridades locais",
    extra: [
      "Reforço da educação no 1.º ciclo",
      "Valorização dos espaços públicos",
      "Melhoria da limpeza urbana",
    ],
    video: "DNDZRdINsSv",
    programa: "/programas/programa-bougado.pdf",
  },
  {
    slug: "bruno-magalhaes",
    nome: "Bruno Magalhães",
    cargo: "Candidato à Junta de Freguesia de Alvarelhos",
    frase: "Trazer uma nova vida à Junta.",
    bio: [
      "Bruno Silva Magalhães, nascido a 5 de novembro de 1992, é natural de Alvarelhos, freguesia onde cresceu e sempre viveu, tal como a sua mãe. O pai chegou à freguesia aos 9 anos e por cá ficou, reforçando a ligação da família à terra.",
      "Profissionalmente, é técnico especializado em máquinas CNC na área metalúrgica, habituado ao rigor, à precisão e à responsabilidade. São essas qualidades que quer agora colocar ao serviço da comunidade.",
      "Durante mais de meia década, integrou o Grupo de Jovens de Alvarelhos, onde aprendeu o valor da participação ativa, do trabalho em equipa e da dedicação à terra que o viu crescer. É membro ativo da Iniciativa Liberal há vários anos, participando nas campanhas e eventos locais.",
      "Candidato à Junta de Freguesia de Alvarelhos pela Iniciativa Liberal, apresenta-se com um objetivo claro: trazer uma nova vida à junta. Quer pôr fim a uma gestão adormecida e passiva, substituindo-a por uma Junta mais próxima, mais presente e mais proativa — capaz de antecipar problemas, ouvir as pessoas e agir com transparência, rapidez e bom senso.",
    ],
    citacao:
      "O nosso objetivo não é conquistar cargos. É honrar Alvarelhos, melhorar a vida de quem cá vive e retribuir com o que a terra nos deu.",
    funcoes: [
      "Técnico especializado em máquinas CNC na área metalúrgica",
      "Membro ativo da Iniciativa Liberal há vários anos",
      "Ex-membro do Grupo de Jovens de Alvarelhos",
      "Natural e residente em Alvarelhos",
    ],
    extraTitulo: "Eixos da campanha",
    extra: ["Dinamismo", "Transparência", "Modernização", "Justiça Social"],
    video: "DMvjCwxhGEJ",
    programa: "/programas/programa-alvarelhos.pdf",
  },
];

export type Link = { titulo: string; href: string };

export const campanha = {
  candidatura: {
    evento: "https://www.facebook.com/events/4075416729399915?active_tab=about",
    videos: [
      "DM-_wr-vgAY",
      "DNIcFHtxudV",
      "DNqxIFWh8Oi",
      "DNv60vx2o-v",
      "DN8yru2ivPY",
      "DN_Xpvoj_y0",
      "DOB8blDEqIC",
      "DOT9-xECcF1",
      "DOja186Dn2v",
      "DOrJPL1ghEl",
    ].map((id, i): Link => ({ titulo: `Vídeo ${i + 1}`, href: ig(id) })),
    imagens: [{ titulo: "Imagens da apresentação", href: `${ig("DNEFm6ToO5b")}?img_index=4` }] as Link[],
  },
  programa: {
    fotos: [{ titulo: "Fotos da apresentação do programa", href: `${ig("DOjNSFSCJVu")}?img_index=1` }] as Link[],
    videos: [{ titulo: "Vídeo da apresentação do programa", href: ig("DOn0Yx8jVCM") }] as Link[],
  },
  programaMovel: [
    { titulo: "Programa eleitoral móvel (1)", href: `${ig("DPmDsSPDIre")}?img_index=1` },
    { titulo: "Programa eleitoral móvel (2)", href: ig("DPGSNdhgt00") },
  ] as Link[],
};

export type Dia = {
  dia: number;
  tema: string;
  paragrafos: string[];
  href: string;
};

export const diario: Dia[] = [
  {
    dia: 1,
    tema: "Ação e Coesão Social",
    href: `${ig("DPRA393DBQG")}?img_index=1`,
    paragrafos: [
      "Ontem demos início oficial à reta final da campanha, com um dia totalmente dedicado ao tema da Ação e Coesão Social.",
      "A manhã começou com uma ação de campanha pela Barca e Finzes, onde partilhámos as nossas propostas nesta área fundamental.",
      "Seguiu-se uma visita aos Bombeiros da Trofa, onde o nosso candidato Diamantino Costa felicitou a corporação por mais um ano de serviço exemplar à comunidade.",
      "Foram também colocados os monopostes com as mensagens da nossa candidatura, levando as nossas ideias a mais pontos do concelho, antes de um almoço convívio em Bairros.",
      "Durante a tarde, estivemos no Lar Padre Joaquim Ribeiro, conhecendo de perto os projetos e a enorme dedicação de quem trabalha todos os dias em prol da comunidade trofense. Reforçámos o compromisso da IL Trofa: a Câmara tem o dever de apoiar e facilitar o trabalho das instituições sociais que tanto contribuem para melhorar a vida dos cidadãos.",
      "O dia terminou no Muro, numa reunião com a associação ARJM, onde ouvimos os projetos e desafios que têm pela frente.",
      "Um primeiro dia de campanha marcado por proximidade, diálogo e compromisso com a nossa comunidade.",
    ],
  },
  {
    dia: 2,
    tema: "Cultura e Juventude",
    href: `${ig("DPTlyomDebY")}?img_index=1`,
    paragrafos: [
      "Depois de um primeiro dia intenso, que terminou no Muro com a visita à associação ARJM, a campanha seguiu para Alvarelhos, onde começámos a manhã com uma ação de rua junto da população. A proximidade é a base do nosso trabalho e foi esse o espírito com que partilhámos as propostas da Iniciativa Liberal para a Cultura e Juventude.",
      "Visitámos o Castro de Alvarelhos e o Santuário de Santa Eufémia, dois marcos históricos que testemunham a riqueza cultural do concelho e que merecem maior valorização.",
      "A jornada prosseguiu em São Mamede do Coronado, terra dos santeiros, onde continuámos o diálogo próximo com os cidadãos.",
      "No Dia Mundial da Música, marcámos presença na Casa da Cultura, assistindo à atuação inspiradora dos Meninos Cantores da Trofa e visitando a exposição “Do Sentir ao Fluir” de Daniela Carvalho.",
      "O dia terminou em ambiente descontraído, com um “fino liberal” no Desperados Bar. Um momento de convívio que serviu também para debater a escassa oferta cultural da Trofa e o abandono a que o centro da cidade tem sido votado.",
      "Nesse mesmo dia, o Instituto Mais Liberdade divulgou um estudo que coloca a Trofa em 182.º lugar entre 186 municípios com mais de 10 mil habitantes no tema da Cultura — um dado que reforça, de forma clara, a urgência de mudança.",
      "Cultura, juventude e dinamismo são pilares fundamentais para uma Trofa mais viva e com futuro.",
    ],
  },
  {
    dia: 3,
    tema: "Educação",
    href: `${ig("DPWtMdMjCnq")}?img_index=1`,
    paragrafos: [
      "O terceiro dia de campanha foi dedicado a um dos pilares mais importantes para o futuro da Trofa: a Educação.",
      "Começámos com um Café Liberal em frente à Escola Secundária da Trofa, onde debatemos os desafios atuais do sistema educativo e apresentámos as nossas soluções liberais — centradas na inovação, liberdade de escolha e ligação ao mundo real.",
      "Seguiu-se uma ação de contacto direto pelas ruas da cidade até ao centro da Trofa. Distribuímos flyers, ouvimos preocupações e partilhámos as nossas propostas, sempre de portas abertas ao diálogo.",
      "Após um almoço de proximidade na zona da Nova Trofa, visitámos a Escola Profissional do Infante, conhecendo de perto os projetos que têm marcado a diferença na formação dos jovens.",
      "Passámos ainda pela antiga escola de Cidai, encerrada há vários anos, para reforçar a importância de dar nova vida a equipamentos públicos. Espaços assim não podem ficar ao abandono — devem ser colocados ao serviço das associações e da comunidade.",
      "Um dos momentos simbólicos do dia foi a visita ao miradouro de São Gens, o mais alto do concelho. Foi lá que reforçámos o compromisso de colocar a Educação da Trofa num patamar de excelência. Os números não mentem: no ranking de competitividade autárquica de 2025, a Trofa está apenas em 114.º lugar em Educação (entre 186 municípios). É um alerta claro: temos de fazer muito melhor.",
      "O dia terminou na Escola Secundária da Trofa, com a participação do nosso candidato, Diamantino Costa, numa sessão de esclarecimentos organizada pela FAPTrofa, ao lado de outros candidatos. Um debate aberto e construtivo, onde ficou claro que a Iniciativa Liberal tem propostas sérias e realistas para transformar a Educação no concelho.",
      "Porque o futuro da Trofa começa nas salas de aula, nos professores e nos jovens. E nós estamos determinados a criar as condições para que cada aluno tenha mais oportunidades de aprender, crescer e sonhar.",
    ],
  },
  {
    dia: 4,
    tema: "Mobilidade",
    href: `${ig("DPYvarSCMx_")}?img_index=1`,
    paragrafos: [
      "O quarto dia de campanha foi dedicado a uma das principais lacunas desde a formação do concelho: Mobilidade.",
      "Começámos com um Café Liberal em Guidões, onde falámos sobre o dinamismo industrial que a zona apresenta e que pode ser ainda maior com uma ligação à A7 e travessia sobre o Ave.",
      "Seguiu-se uma ação de campanha em frente à antiga estação do Muro para reafirmar o nosso compromisso com a luta pelo metro até à Trofa, uma promessa antiga mas que continua por cumprir.",
      "A campanha seguiu para São Romão do Coronado, onde foi realizado um contacto com a população e distribuição de flyers.",
      "Após o almoço na estação de comboios, foi realizada uma ação de campanha sobre a falta de coberturas e bancos de muitas paragens de autocarros.",
      "A campanha seguiu pela nova variante, que apresenta vários pontos de melhoria.",
      "Mais tarde, a comitiva liberal esteve em frente à estação de comboios da Trofa, local onde seria feito o transbordo entre metro e comboio.",
      "Foi ainda abordado o problema dos estacionamentos na variante e foram ouvidas sugestões dos moradores da zona.",
      "No final do dia, visitámos a zona industrial da Carriça no Muro que, apesar da mega operação de remendos das estradas verificada nos últimos meses, foi esquecida, apresentando crateras ótimas para… jogar golfe. Difícil seria falhar o buraco.",
    ],
  },
  {
    dia: 5,
    tema: "Saúde e Desporto",
    href: `${ig("DPbvpodDtXR")}?img_index=1`,
    paragrafos: [
      "O quinto dia de campanha arrancou na Feira da Trofa, onde a Iniciativa Liberal visitou todas as bancas, ouviu as preocupações dos comerciantes e comprometeu-se a revitalizar este espaço emblemático. A candidatura foi acolhida com entusiasmo, recebendo várias mensagens de apoio, e promete dar destaque à feira durante o mandato.",
      "De seguida, realizámos uma Caminhada Liberal, promovendo a saúde preventiva, com destino ao centro da Trofa.",
      "Reforçámos a importância de melhorar as respostas à população, complementando o trabalho do Hospital de Famalicão, onde recentemente constatámos os desafios nas urgências.",
      "A manhã terminou com passagem pela Alameda e pela Rua Conde São Bento, em contacto próximo com a comunidade.",
      "Após o almoço, próximo ao Estádio do Trofense, montámos uma barraca interativa onde os adeptos puderam “marcar golos contra os impostos” e receber brindes e t-shirts da campanha. Esta ação criativa foi um sucesso, com grande adesão do público.",
      "Durante a tarde reunimo-nos com a direção do Grupo Desportivo Covelas, ouvindo os seus projetos, desafios e ambições para o futuro.",
      "O dia encerrou com um Fino Liberal no Murphy’s Sports Bar, na companhia de Gaspar Azevedo, uma figura histórica da Trofa. Gaspar partilhou os seus projetos desportivos e o seu compromisso diário com a comunidade, num momento de convívio e troca de ideias.",
    ],
  },
  {
    dia: 6,
    tema: "Modernização da Câmara",
    href: `${ig("DPe2vC6ijh3")}?img_index=1`,
    paragrafos: [
      "A campanha liberal segue a todo vapor pelas ruas do concelho! Neste dia, a candidatura liberal mostrou como irá transformar a Câmara Municipal num espaço mais aberto, transparente e colaborativo.",
      "Foram apresentadas as propostas para modernizar e acelerar a câmara municipal, reforçando o compromisso da IL: a Trofa terá mais participação dos trofenses nas decisões do concelho e total transparência na informação pública.",
      "Seguiu-se a distribuição de flyers e colocação de monopostos com mensagens que carregam a visão liberal para o futuro.",
    ],
  },
  {
    dia: 7,
    tema: "Ambiente e Planeamento",
    href: `${ig("DPhbfe9DKWL")}?img_index=1`,
    paragrafos: [
      "O sétimo dia de campanha da Iniciativa Liberal arrancou cedo em Covelas, com a equipa a percorrer as ruas, ouvir as preocupações dos moradores e apresentar propostas para transformar Covelas num exemplo de equilíbrio entre habitação, qualidade de vida e preservação ambiental.",
      "Mobilidade em foco: a falta de acessos da variante a Covelas, um projeto esquecido no papel, foi um dos temas referidos, assim como a necessidade de uma gestão territorial mais eficiente e planeada.",
      "Em São Mamede do Coronado, a candidatura destacou a urgência de reforçar a proteção civil e a segurança na região, apresentando medidas concretas para garantir um socorro mais rápido e eficaz.",
      "A manhã terminou em Alvarelhos, com a distribuição de flyers e um diálogo próximo com a população, seguido de um almoço em Lantemil, reforçando o contacto direto com a comunidade.",
      "À tarde, reunimos com a Associação Humanitária dos Bombeiros Voluntários da Trofa, onde conhecemos os seus projetos e os desafios que enfrentam, reafirmando o nosso compromisso em apoiar estas instituições vitais.",
      "No Parque das Azenhas, apresentámos as nossas soluções para tornar o rio mais limpo e cuidado, comparando a sua transparência com a da Câmara Municipal.",
      "Ambiente em ação: sublinhámos a importância de investir em educação ambiental e aumentar ainda mais o número de ecopontos no concelho. A Trofa é um dos municípios da região com menores taxas de reciclagem, o que resulta na acumulação de resíduos em aterros — uma realidade que queremos mudar.",
      "O dia terminou na zona das Pateiras, frequentemente afetada por inundações no inverno. Referimos as propostas para minimizar este problema.",
    ],
  },
  {
    dia: 8,
    tema: "Fiscalidade Local",
    href: `${ig("DPkFsc-jMjd")}?img_index=1`,
    paragrafos: [
      "O oitavo dia de campanha foi dedicado aos impostos e à fiscalidade local, começando com a colocação dos últimos monopostes com as nossas mensagens na cidade da Trofa.",
      "Propostas para alívio fiscal: na freguesia de Bougado, percorremos várias localidades para apresentar as nossas propostas de redução de impostos, incluindo o IMI, o IRS municipal e a Derrama. O objetivo? Devolver aos trofenses o que é dos trofenses.",
      "Calculadora de poupança: mostrámos uma Calculadora de IRS Municipal, permitindo aos munícipes visualizar quanto podem poupar com uma gestão liberal na Câmara.",
      "Água a preço justo: em Paradela e Abelheira, destacámos a necessidade de reduzir as faturas de água, saneamento e resíduos, que hoje estão “a peso de ouro”. A Câmara deve fazer mais para aliviar estes custos.",
      "A manhã terminou com um almoço na zona. À tarde, distribuímos flyers pelo centro da Trofa e realizámos uma ação de campanha no Parque Nossa Senhora das Dores. Com brindes, a atividade “Chuto ao Imposto” e a divulgação do nosso programa eleitoral, conectámo-nos com os trofenses de forma dinâmica e próxima.",
      "Apesar dos vários alertas do nosso candidato Diamantino Costa relativamente às contas do município, a resposta tem sido de que está tudo ótimo. No entanto, o Instituto Mais Liberdade colocou agora a Trofa no 173.º lugar entre 186 municípios na categoria de Fiscalidade e Endividamento Autárquico.",
      "A Trofa precisa de mudar, e para mudar precisa de Iniciativa.",
    ],
  },
  {
    dia: 9,
    tema: "Economia e Emprego",
    href: `${ig("DPm4WQ9iAT1")}?img_index=1`,
    paragrafos: [
      "O dia começou em Santiago de Bougado, onde foi feita uma ação de campanha para dar a conhecer as propostas liberais, com foco na Economia e no Emprego.",
      "A candidatura liberal seguiu para Guidões, uma zona com forte projeção industrial, onde foi referida a necessidade de acessos e ligação à A7 para acompanhar o crescimento verificado.",
      "Os liberais passaram depois por Lantemil e ainda pelo Muro, falando da necessidade de novas zonas industriais no concelho com ligação a transportes como o metro e a vias de circulação como a variante e a A3, e que permitam fixar novas empresas.",
      "Durante a tarde a comitiva liberal reuniu-se com a Difmold, uma empresa de metalomecânica cujos sócios, bem como grande parte dos trabalhadores, são trofenses. Contaram que sentiram, como vários outros empresários, a necessidade de se fixarem em Ribeirão por não encontrarem na Trofa as condições para o seu projeto.",
      "A candidatura liberal ouviu os seus projetos futuros e discutiu os entraves burocráticos que podem ser simplificados pela câmara, deixando uma certeza: uma Trofa liberal terá uma visão empresarial e de inovação bem estruturada que irá inverter esta tendência em que a Trofa caminha para ser um dormitório.",
      "Mais tarde, no centro da Trofa, foi possível contactar com lojistas e cidadãos, e perceber que quer os centros comerciais, quer as ruas de comércio local se encontram sem vida ou dinâmica, e por isso a Iniciativa Liberal será rápida a tomar ações para inverter esta tendência, cada vez mais evidente na feira da Trofa também.",
      "É urgente devolver à Trofa o seu cunho empreendedor e liberal que sempre a caracterizou. É urgente estimular e acelerar a economia trofense.",
    ],
  },
  {
    dia: 10,
    tema: "Habitação",
    href: `${ig("DPooU0GDPXr")}?img_index=1`,
    paragrafos: [
      "Um dos grandes problemas que a Trofa enfrenta é o da falta de habitação, pelo que a candidatura liberal deu especial importância ao tema no seu programa eleitoral.",
      "O dia começou em frente à estação de comboios de São Romão do Coronado, onde a Iniciativa Liberal divulgou as várias propostas que permitirão aumentar a oferta, acelerar licenciamentos e estimular o mercado.",
      "“Aqui podia morar gente”: foram abordadas as várias zonas do concelho onde a habitação deverá ser potenciada, permitindo complementar habitação, mobilidade e qualidade de vida.",
      "Seguiu-se uma ação de campanha no largo da Feira Nova em São Mamede do Coronado, seguido de um almoço na zona.",
      "Após uma passagem por Covelas, a comitiva liberal reuniu-se com a Cruz Vermelha em Bougado, conhecendo o extraordinário trabalho que têm feito pela comunidade.",
      "Foi depois feita a última ação de campanha cuja mensagem refere que é a Iniciativa Liberal quem tem a chave para resolver o problema da habitação na Trofa.",
      "No final do dia, os liberais participaram numa reunião com a Associação de Futebol Popular da Trofa, onde foi reafirmado o compromisso liberal com a prática desportiva na Trofa.",
      "Acabou assim o último dia de uma campanha que teve em cada dia um capítulo do programa eleitoral em destaque. Uma campanha diferente, uma campanha liberal.",
    ],
  },
];
