// Textos das datas que celebramos: uma página curta por data (/<slug>) e um banner na página inicial à volta do dia.
// O Dia do Concelho e o 25 de Novembro têm páginas próprias (app/dia-do-concelho, app/25-de-novembro).
// As festas das freguesias estão em lib/festas.ts.
//
// Nos textos, {anos}, {ano} e {anoAnterior} trocam-se sozinhos (os anos contam-se a partir de `desde`).
// Uma data pode juntar outras palavras com `extra` (ex.: o Dia da Libertação dos Impostos).
// Fotos: em public/images/datas/; as que vêm do Wikimedia Commons levam o autor e a licença em `credito`.

import { anoDe, anosDe, MESES, nesimo, type DataAnual } from "@/lib/datasAnuais";

export type Credito = { autor: string; licenca: string; url: string };
export type Img = { src: string; w: number; h: number; alt: string; credito?: Credito };

export type Bloco =
  | string // parágrafo
  | { lista: string[] }
  | { destaque: string } // frase grande, a azul
  | { imagem: Img; legenda?: string }
  | { link: string; href: string }
  | { nota: string } // letra pequena (ex.: como se faz uma conta)
  | { marcos: true }; // linha do tempo do núcleo (lib/nucleo.ts)

export type Comemoracao = {
  data: DataAnual & { slug: string };
  etiqueta: string; // por cima do título
  titulo: string;
  subtitulo: string;
  descricao: string; // para o Google e as partilhas
  abertura: string;
  blocos: Bloco[];
  fecho?: string;
  imagem: Img; // a do banner e das partilhas
  banner: { etiqueta: string; titulo: string; frase: string };
  partilhar: string;
  extra?: (ano: number) => Record<string, string>;
};

// ---- Dia da Libertação dos Impostos: a conta ----
// Carga fiscal = impostos e contribuições sociais em % do PIB (INE). Atualizar quando o INE publicar o ano seguinte
// (março e setembro, nas notificações do procedimento dos défices excessivos).
export const CARGA_FISCAL = { ano: 2025, pct: 35.3, fonte: "INE, notificação de setembro de 2026" };

const diasNoAno = (ano: number) => (ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0) ? 366 : 365);
const diaDoAno = (ano: number, n: number): [number, number] => {
  const t = new Date(Date.UTC(ano, 0, n));
  return [t.getUTCMonth() + 1, t.getUTCDate()];
};
// Dias que se trabalham para pagar impostos (arredondados para cima) e o dia seguinte, o da libertação.
export function contaImpostos(ano: number) {
  const exato = (CARGA_FISCAL.pct / 100) * diasNoAno(ano);
  const dias = Math.ceil(exato);
  return { exato, dias, fim: diaDoAno(ano, dias), libertacao: diaDoAno(ano, dias + 1) };
}
const porExtenso = ([m, d]: [number, number]) => `${d} de ${MESES[m - 1]}`;

// ---- Fotos que se repetem ----
const fotos = {
  urna: { src: "/images/geral/propostas-urna.jpeg", w: 767, h: 815, alt: "Urna com as propostas da Iniciativa Liberal Trofa para as autárquicas, com a frase Aproxima-te das nossas medidas" },
  plenarioFundador: { src: "/images/geral/plenario-fundador-2022.jpg", w: 1440, h: 968, alt: "Plenário fundador do núcleo da IL Trofa, a 25 de junho de 2022, no Coronado" },
  grupoNucleo: { src: "/images/geral/grupo-nucleo.jpg", w: 1440, h: 1440, alt: "Membros da IL Trofa junto a uma bandeira da Iniciativa Liberal" },
  aniversario: { src: "/images/geral/aniversario-4-anos-faixa.webp", w: 3200, h: 800, alt: "Colagem de fotos dos primeiros quatro anos do núcleo da IL Trofa" },
  natal: { src: "/images/eventos/feliz-natal-liberais.webp", w: 985, h: 694, alt: "Membros da IL Trofa com gorros de Natal: Feliz Natal Liberais" },
  packsNatal: { src: "/images/loja/banner-natal.webp", w: 1400, h: 875, alt: "Camisolas de Natal de malha da IL Trofa" },
  custoImposto: { src: "/images/cartazes-nacionais/custo-real-imposto.webp", w: 810, h: 540, alt: "Cartaz da Iniciativa Liberal: o custo real e o imposto" },
  impostopoly: { src: "/images/cartazes-nacionais/impostopoly.webp", w: 840, h: 471, alt: "Cartaz da Iniciativa Liberal: Impostopoly, liberta-te do socialismo" },
} satisfies Record<string, Img>;

export const comemoracoes: Comemoracao[] = [
  // ---------------- DEZEMBRO ----------------
  {
    data: { slug: "/restauracao-da-independencia", titulo: "Restauração da Independência", dia: [12, 1], desde: 1640 },
    etiqueta: "1 de dezembro · 1640",
    titulo: "{anos} anos da Restauração da Independência",
    subtitulo: "O dia em que Portugal voltou a decidir o seu destino.",
    descricao: "1 de dezembro de 1640: Portugal recuperou a independência. Independência é poder decidir por nós próprios.",
    abertura: "A 1 de dezembro de 1640, Portugal voltou a ser independente.",
    blocos: [
      "Desde 1580 que o país tinha os mesmos reis que Espanha. Nessa manhã, um grupo de nobres, os Conjurados, entrou no Paço da Ribeira, em Lisboa, afastou o governo de Madrid e proclamou rei o Duque de Bragança, D. João IV.",
      "A independência ainda custou 28 anos de guerra. Só em 1668, com o Tratado de Lisboa, a Espanha a reconheceu.",
      { destaque: "Independência é isto: poder decidir por nós próprios. Vale para um país e vale para uma terra. A Trofa sabe-o bem desde 1998." },
      "O 1.º de Dezembro chegou a deixar de ser feriado entre 2013 e 2015. Voltou em 2016, e ainda bem: há datas que não se esquecem.",
    ],
    fecho: "Viva Portugal!",
    imagem: fotos.grupoNucleo,
    banner: { etiqueta: "1640 · {anos} anos", titulo: "Restauração da Independência", frase: "Há {anos} anos, Portugal voltou a decidir o seu próprio destino." },
    partilhar: "1 de dezembro de 1640: o dia em que Portugal voltou a decidir o seu destino.",
  },
  {
    data: { slug: "/direitos-humanos", titulo: "Declaração Universal dos Direitos Humanos", dia: [12, 10], desde: 1948 },
    etiqueta: "10 de dezembro · 1948",
    titulo: "Declaração Universal dos Direitos Humanos",
    subtitulo: "Todos nascemos livres e iguais em dignidade e em direitos.",
    descricao: "10 de dezembro de 1948: as Nações Unidas aprovaram a Declaração Universal dos Direitos Humanos.",
    abertura: "A 10 de dezembro de 1948, as Nações Unidas aprovaram a Declaração Universal dos Direitos Humanos.",
    blocos: [
      "Foi em Paris, três anos depois do fim da Segunda Guerra Mundial. Depois dos campos de concentração e das ditaduras que esmagaram milhões de pessoas, o mundo escreveu os direitos que nenhum governo pode tirar a ninguém.",
      { destaque: "“Todos os seres humanos nascem livres e iguais em dignidade e em direitos.” (artigo 1.º)" },
      "A Declaração protege a vida e a liberdade, proíbe a escravatura e a tortura, e garante a liberdade de expressão, de reunião e de religião, o direito a um julgamento justo e o direito à propriedade.",
      "Portugal, que em 1948 vivia em ditadura, só a publicou no Diário da República em 1978, já em democracia.",
      "Para os liberais, estes direitos não são favores do Estado. São de cada pessoa, e o Estado existe para os proteger, não para os dar a quem lhe convém.",
    ],
    fecho: "Os direitos humanos são de todos.",
    imagem: fotos.grupoNucleo,
    banner: { etiqueta: "1948 · {anos} anos", titulo: "Direitos Humanos", frase: "Todos nascemos livres e iguais em dignidade e em direitos." },
    partilhar: "10 de dezembro: Declaração Universal dos Direitos Humanos. Todos nascemos livres e iguais.",
  },
  {
    data: { slug: "/poder-local", titulo: "Primeiras eleições autárquicas", dia: [12, 12], desde: 1976 },
    etiqueta: "12 de dezembro · 1976",
    titulo: "{anos} anos de poder local eleito",
    subtitulo: "O dia em que o poder local passou a ser escolhido pelo voto.",
    descricao: "12 de dezembro de 1976: as primeiras eleições autárquicas em democracia. A Trofa votou pela primeira vez para a sua Câmara em 2001.",
    abertura: "A 12 de dezembro de 1976, os portugueses elegeram pela primeira vez em democracia as câmaras municipais, as assembleias municipais e as assembleias de freguesia.",
    blocos: [
      "Durante a ditadura, os presidentes de câmara eram nomeados pelo Governo. Depois do 25 de Abril, e até estas eleições, as câmaras e as juntas foram geridas por comissões administrativas. Em dezembro de 1976, quase dois em cada três eleitores foram votar.",
      "Nessa altura, a Trofa ainda não era concelho. As nossas freguesias votaram para a Câmara de Santo Tirso. Só em 2001, três anos depois da criação do concelho, os trofenses elegeram pela primeira vez a sua própria Câmara.",
      "O poder local é a política mais perto de nós. É na câmara e na junta que se decide a rua, a escola, a licença da casa ou do negócio. Por isso, quem governa deve prestar contas de perto: mostrar o que decide, o que gasta e o que contrata.",
      { destaque: "Votar é o primeiro passo. O seguinte é acompanhar e participar." },
      "Foi com essa ideia que lançámos o portal Dados da Trofa, com os números do concelho ao alcance de todos.",
      { link: "Ver o portal Dados da Trofa →", href: "/dados" },
    ],
    fecho: "Viva o poder local democrático!",
    imagem: fotos.urna,
    banner: { etiqueta: "1976 · {anos} anos", titulo: "{anos} anos de poder local eleito", frase: "Há {anos} anos, escolhemos pela primeira vez, em liberdade, quem governa a nossa terra." },
    partilhar: "12 de dezembro de 1976: pela primeira vez, escolhemos em liberdade quem governa a nossa terra.",
  },
  {
    data: { slug: "/aniversario-iniciativa-liberal", titulo: "Aniversário da Iniciativa Liberal", dia: [12, 13], desde: 2017 },
    etiqueta: "13 de dezembro · 2017",
    titulo: "{anos} anos de Iniciativa Liberal",
    subtitulo: "Um partido nascido de cidadãos que acreditavam que Portugal podia ser mais livre.",
    descricao: "A história da Iniciativa Liberal: de um manifesto de cidadãos, em 2016, ao Parlamento e à Trofa.",
    abertura: "A 13 de dezembro de 2017, a Iniciativa Liberal passou a ser um partido político.",
    blocos: [
      "Tudo começou em setembro de 2016, com uma associação de cidadãos e um manifesto, o “Portugal Mais”. Queriam um país com mais liberdade para trabalhar, criar, escolher e viver.",
      "A 26 de novembro de 2017, a convenção fundadora, no Porto, elegeu o primeiro presidente, Miguel Ferreira da Silva. Semanas depois, a 13 de dezembro, o Tribunal Constitucional legalizou o partido.",
      {
        lista: [
          "2019: chega ao Parlamento. João Cotrim de Figueiredo é eleito deputado por Lisboa.",
          "2022: o grupo parlamentar passa a oito deputados.",
          "2024: mantém os oito deputados e elege os primeiros dois eurodeputados.",
          "2025: elege nove deputados. Mariana Leitão torna-se a quinta presidente do partido e a primeira mulher no cargo.",
          "2026: João Cotrim de Figueiredo candidata-se a Presidente da República e tem 16% dos votos.",
        ],
      },
      "Os presidentes: Miguel Ferreira da Silva, Carlos Guimarães Pinto, João Cotrim de Figueiredo, Rui Rocha e Mariana Leitão.",
      { imagem: fotos.plenarioFundador, legenda: "Plenário fundador do núcleo da Trofa, a 25 de junho de 2022." },
      "Na Trofa, o núcleo nasceu a 25 de junho de 2022, no Coronado, com a presença de Rui Rocha. Em 2025 apresentou pela primeira vez listas às autárquicas: à Câmara, à Assembleia Municipal e às juntas de Bougado e Alvarelhos.",
      { destaque: "{anos} anos depois, a ideia é a mesma: um país onde cada pessoa tem mais liberdade para decidir a sua vida." },
      { link: "Conhece o núcleo da Trofa →", href: "/trofa-liberal" },
    ],
    fecho: "Parabéns, Iniciativa Liberal!",
    imagem: fotos.grupoNucleo,
    banner: { etiqueta: "2017 · {anos} anos", titulo: "{anos} anos de Iniciativa Liberal", frase: "{anos} anos a defender a liberdade em Portugal. Na Trofa, desde 2022." },
    partilhar: "{anos} anos de Iniciativa Liberal: de um manifesto de cidadãos ao Parlamento.",
  },
  {
    data: { slug: "/natal", titulo: "Natal", dia: [12, 25], janela: [5, 1] },
    etiqueta: "Natal {ano}",
    titulo: "Feliz Natal",
    subtitulo: "Da IL Trofa para todas as famílias da Trofa.",
    descricao: "Feliz Natal da Iniciativa Liberal Trofa para todas as famílias da nossa terra.",
    abertura: "O Natal é tempo de estar com quem mais gostamos.",
    blocos: [
      "É também quando se vê o melhor da nossa terra: as associações, os voluntários, os vizinhos que ajudam sem ninguém lhes pedir. Uma comunidade forte não nasce de decretos. Nasce de pessoas livres que escolhem ajudar-se umas às outras.",
      "Neste Natal lembramo-nos também de quem o passa sozinho, de quem está longe e de quem trabalha nestes dias para que os outros possam estar com a família.",
      { imagem: fotos.natal },
      "No núcleo, o Natal tem as suas tradições: o jantar com os núcleos do distrito e o Porto Liberal, com pão de ló e vinho do Porto, que não falha desde 2021.",
      { link: "Ver os packs de Natal da loja →", href: "/loja#natal" },
    ],
    fecho: "Feliz Natal e boas festas!",
    imagem: fotos.natal,
    banner: { etiqueta: "Natal", titulo: "Feliz Natal, Trofa!", frase: "Da Iniciativa Liberal Trofa para todas as famílias da nossa terra." },
    partilhar: "Feliz Natal da Iniciativa Liberal Trofa para todas as famílias da nossa terra.",
  },

  // ---------------- JANEIRO A MAIO ----------------
  {
    data: { slug: "/ano-novo", titulo: "Ano Novo", dia: [1, 1], janela: [1, 5] },
    etiqueta: "1 de janeiro",
    titulo: "Bom {ano}, Trofa!",
    subtitulo: "Os nossos desejos para o ano que começa.",
    descricao: "Bom ano, Trofa! Os desejos da Iniciativa Liberal Trofa para o novo ano e os anos de Portugal na Europa.",
    abertura: "Obrigado a todos os que estiveram connosco em {anoAnterior}.",
    blocos: [
      "Para {ano}, desejamos uma Trofa com uma Câmara mais transparente, que mostre o que decide e o que gasta; com o Metro mais perto; com escolas com mais autonomia; e com menos burocracia para quem quer construir casa, investir ou abrir um negócio.",
      "E desejamos, acima de tudo, um bom ano a cada trofense: saúde, trabalho e liberdade para fazer da sua vida o que quiser.",
      "A 1 de janeiro lembramos também outro passo importante: em 1986, Portugal entrou na Comunidade Económica Europeia, hoje União Europeia. Faz {anosCEE} anos. A Europa abriu-nos mercados e deu-nos a liberdade de viver, estudar e trabalhar em qualquer país da União.",
    ],
    fecho: "Feliz {ano}!",
    imagem: fotos.grupoNucleo,
    banner: { etiqueta: "{ano}", titulo: "Bom ano, Trofa!", frase: "Os nossos desejos para {ano}, e os {anosCEE} anos de Portugal na Europa." },
    partilhar: "Bom {ano}, Trofa! Os nossos desejos para o ano que começa.",
    extra: (ano) => ({ anosCEE: String(ano - 1986) }),
  },
  {
    data: { slug: "/feira-de-marco", titulo: "Feira de Março", regra: (ano) => nesimo(ano, 3, 6, 1), quando: "1.º fim de semana de março", janela: [2, 1] },
    etiqueta: "Feira de Março · {ano}",
    titulo: "Grande Feira Anual da Trofa",
    subtitulo: "A Feira de Março: tradição, negócio e encontro.",
    descricao: "A Grande Feira Anual da Trofa, no primeiro fim de semana de março: gado, cavalos, máquinas agrícolas, comércio e concertos.",
    abertura: "Todos os anos, no início de março, a Trofa tem encontro marcado na Grande Feira Anual.",
    blocos: [
      "No recinto do Mercado e Feira da Trofa juntam-se gado, cavalos, máquinas agrícolas, comércio e, nos últimos anos, concertos que enchem o recinto.",
      "É uma montra de quem faz a Trofa crescer: agricultores, criadores, comerciantes e empresas da terra.",
      { destaque: "Quem cria emprego e riqueza merece menos burocracia e mais liberdade para trabalhar." },
      "Visita a feira, compra no comércio local e aproveita o fim de semana.",
    ],
    fecho: "Boa feira!",
    imagem: fotos.grupoNucleo,
    banner: { etiqueta: "Feira de Março", titulo: "Boa feira, Trofa!", frase: "A Grande Feira Anual da Trofa é este fim de semana." },
    partilhar: "A Grande Feira Anual da Trofa: tradição, negócio e encontro.",
  },
  {
    data: { slug: "/dia-do-estudante", titulo: "Dia do Estudante", dia: [3, 24], desde: 1962 },
    etiqueta: "24 de março",
    titulo: "Dia do Estudante",
    subtitulo: "Liberdade para aprender, autonomia para crescer.",
    descricao: "24 de março, Dia do Estudante: a coragem dos estudantes de 1962 e as nossas propostas para a educação na Trofa.",
    abertura: "A 24 de março celebra-se o Dia do Estudante.",
    blocos: [
      "A data lembra a crise académica de 1962. Nesse ano, o governo de Salazar proibiu as comemorações do Dia do Estudante. Os estudantes não se calaram: a 24 de março, a polícia de choque carregou sobre milhares deles na Cidade Universitária, em Lisboa, e seguiram-se o luto académico e as greves. Eram jovens a enfrentar uma ditadura.",
      "Em 1987, a Assembleia da República fez do 24 de março o Dia Nacional do Estudante.",
      { destaque: "Hoje, a liberdade de um estudante mede-se pelas oportunidades que tem: aprender bem, escolher o seu caminho e não ter de sair da terra para o seguir." },
      { imagem: { src: "/images/eventos/lit/lit-02.jpg", w: 1066, h: 1600, alt: "Público no debate das Jornadas Liberais da Educação, na Trofa" }, legenda: "Debate das Jornadas Liberais da Educação, em março de 2026." },
      "A IL Trofa criou as Jornadas Liberais da Trofa. Para a primeira edição, dedicada à Educação, escolheu de propósito a semana do Dia do Estudante, para assinalar a importância deste dia e da educação. Entre 23 e 28 de março de 2026, visitámos escolas e centros de formação do concelho, para ouvir quem trabalha na educação todos os dias, e fechámos com um debate público na Escola Secundária da Trofa.",
      "Daí nasceu o nosso manifesto: mais autonomia para as escolas, liberdade de escolha para as famílias e apoio certo para que nenhum aluno fique para trás.",
      { link: "Lê as nossas propostas para a Educação →", href: "/ideias/educacao" },
      "Estudas na Trofa? Queremos ouvir-te. Diz-nos o que mudavas na tua escola.",
      { link: "Dá a tua ideia →", href: "/participa?t=ideia" },
    ],
    fecho: "Bom Dia do Estudante!",
    imagem: { src: "/images/eventos/lit/lit-02.jpg", w: 1066, h: 1600, alt: "Público no debate das Jornadas Liberais da Educação, na Trofa" },
    banner: { etiqueta: "24 de março", titulo: "Dia do Estudante", frase: "Liberdade para aprender, autonomia para crescer." },
    partilhar: "24 de março, Dia do Estudante: liberdade para aprender, autonomia para crescer.",
  },
  {
    data: { slug: "/constituicao", titulo: "Constituição de 1976", dia: [4, 2], desde: 1976 },
    etiqueta: "2 de abril · 1976",
    titulo: "{anos} anos da Constituição",
    subtitulo: "A lei fundamental, aprovada por deputados eleitos em liberdade.",
    descricao: "2 de abril de 1976: a Assembleia Constituinte aprovou a Constituição da República Portuguesa.",
    abertura: "A 2 de abril de 1976, a Assembleia Constituinte aprovou a Constituição da República Portuguesa.",
    blocos: [
      "Os deputados tinham sido eleitos um ano antes, nas primeiras eleições livres. A Constituição entrou em vigor a 25 de abril de 1976. É ela que garante os nossos direitos e organiza o poder: quem governa, quem fiscaliza e quem julga.",
      "Desde então, foi revista sete vezes: acabou com o Conselho da Revolução (1982), permitiu as privatizações (1989) e adaptou o país à União Europeia (1992).",
      "Mas o preâmbulo ainda diz que o objetivo é “abrir caminho para uma sociedade socialista”. A Iniciativa Liberal propôs trocar essa frase por uma referência à democracia liberal.",
      { destaque: "Uma Constituição deve ser de todos, e não de uma ideologia." },
    ],
    imagem: fotos.grupoNucleo,
    banner: { etiqueta: "1976 · {anos} anos", titulo: "A Constituição faz {anos} anos", frase: "Aprovada por deputados eleitos em liberdade. Revista sete vezes. Pronta para mais uma." },
    partilhar: "2 de abril de 1976: a Assembleia Constituinte aprovou a Constituição.",
  },
  {
    data: { slug: "/25-de-abril", titulo: "25 de Abril", dia: [4, 25], desde: 1974 },
    etiqueta: "25 de abril · 1974",
    titulo: "{anos} anos do 25 de Abril",
    subtitulo: "O dia em que Portugal voltou a ser livre.",
    descricao: "25 de abril de 1974: o fim de 48 anos de ditadura. Abril deu-nos a liberdade política; falta cumprir a liberdade económica.",
    abertura: "A 25 de abril de 1974, acabaram 48 anos de ditadura.",
    blocos: [
      "Nessa madrugada, os militares do Movimento das Forças Armadas derrubaram o regime. As pessoas saíram à rua, os cravos chegaram às espingardas e Portugal voltou a ser livre.",
      "Com Abril acabaram a censura, a polícia política e a guerra colonial. Vieram a liberdade de expressão, os partidos e os sindicatos livres. Um ano depois, a 25 de abril de 1975, mais de 90% dos eleitores foram votar, em liberdade, para eleger a Assembleia Constituinte.",
      { destaque: "Abril deu-nos a liberdade política. Falta cumprir a liberdade económica." },
      "Liberdade para trabalhar e ficar com o fruto do trabalho, para criar uma empresa sem pedir licença a cada passo, para escolher a escola dos filhos e o médico. É por essa parte de Abril que continuamos a lutar.",
    ],
    fecho: "Viva o 25 de Abril! Viva a liberdade!",
    imagem: fotos.grupoNucleo,
    banner: { etiqueta: "1974 · {anos} anos", titulo: "25 de Abril", frase: "Há {anos} anos, Portugal voltou a ser livre." },
    partilhar: "25 de abril de 1974: o dia em que Portugal voltou a ser livre.",
  },
  {
    data: { slug: "/1-de-maio", titulo: "Dia do Trabalhador", dia: [5, 1] },
    etiqueta: "1 de maio",
    titulo: "Dia do Trabalhador",
    subtitulo: "Quem trabalha deve ficar com mais do que ganha.",
    descricao: "1 de maio, Dia do Trabalhador: quem trabalha deve ficar com mais do que ganha.",
    abertura: "O 1.º de Maio é o dia de quem trabalha.",
    blocos: [
      "Lembra as greves de 1886 em Chicago, pela jornada de oito horas. Em Portugal, uma semana depois do 25 de Abril, o 1.º de Maio de 1974 voltou a ser celebrado em liberdade e passou a ser feriado.",
      "Hoje, entre IRS e contribuições, uma boa parte do que se ganha nunca chega ao bolso de quem trabalha. E quem quer trabalhar mais, mudar de emprego ou abrir o seu negócio encontra demasiadas barreiras.",
      { destaque: "Queremos salários maiores, com menos impostos sobre o trabalho, e mais liberdade para cada um fazer o seu caminho." },
      { link: "Até que dia trabalhamos para pagar impostos? →", href: "/libertacao-dos-impostos" },
    ],
    fecho: "Bom 1.º de Maio a todos os que trabalham!",
    imagem: fotos.custoImposto,
    banner: { etiqueta: "1 de maio", titulo: "Dia do Trabalhador", frase: "Quem trabalha deve ficar com mais do que ganha." },
    partilhar: "1.º de Maio: quem trabalha deve ficar com mais do que ganha.",
  },
  {
    data: { slug: "/dia-da-europa", titulo: "Dia da Europa", dia: [5, 9], desde: 1950 },
    etiqueta: "9 de maio · 1950",
    titulo: "Dia da Europa",
    subtitulo: "A Europa da liberdade e das oportunidades.",
    descricao: "9 de maio, Dia da Europa: paz, liberdade e um mercado aberto.",
    abertura: "A 9 de maio de 1950, Robert Schuman propôs que países que tinham estado em guerra pusessem em comum o carvão e o aço.",
    blocos: [
      "Cinco anos depois do fim da Segunda Guerra Mundial, o ministro francês dos Negócios Estrangeiros apresentou a ideia que deu origem à União Europeia: fazer com que uma guerra entre a França e a Alemanha se tornasse “não apenas impensável, mas materialmente impossível”.",
      "Portugal entrou em 1986. Desde então, os portugueses podem viver, estudar e trabalhar em qualquer país da União, e as empresas portuguesas vendem para um mercado de centenas de milhões de pessoas.",
      { destaque: "Queremos uma Europa de liberdade e de oportunidades, não de burocracia." },
      "A paz entre vizinhos, a liberdade de circular e um mercado aberto são conquistas a defender todos os dias.",
    ],
    fecho: "Feliz Dia da Europa!",
    imagem: fotos.grupoNucleo,
    banner: { etiqueta: "9 de maio", titulo: "Dia da Europa", frase: "Paz, liberdade e um mercado aberto: a Europa que queremos." },
    partilhar: "9 de maio, Dia da Europa: paz, liberdade e um mercado aberto.",
  },
  {
    data: {
      slug: "/libertacao-dos-impostos",
      titulo: "Dia da Libertação dos Impostos",
      regra: (ano) => contaImpostos(ano).libertacao,
      quando: "muda todos os anos",
    },
    etiqueta: "Dia da Libertação dos Impostos · {ano}",
    titulo: "Em {ano}, trabalhamos até {fim} para pagar impostos",
    subtitulo: "Só a partir de {libertacao} o que ganhamos é para nós.",
    descricao: "O Dia da Libertação dos Impostos: até que dia do ano trabalhamos só para pagar impostos e contribuições.",
    abertura: "Em {anoCarga}, os impostos e as contribuições pagos ao Estado valeram {pct}% de toda a riqueza produzida em Portugal.",
    blocos: [
      "É a carga fiscal, calculada pelo INE. Se a passarmos para os dias do ano, é como se cada português trabalhasse os primeiros {dias} dias só para pagar impostos e contribuições: de 1 de janeiro a {fim}.",
      "A {libertacao} começamos, finalmente, a trabalhar para nós. É o Dia da Libertação dos Impostos.",
      "A conta é uma média: cada pessoa paga de maneira diferente, conforme o que ganha e o que consome. Mas mostra bem o peso do Estado na vida de todos.",
      { imagem: fotos.custoImposto, legenda: "Cartaz da Iniciativa Liberal." },
      { destaque: "Quanto mais cedo chega este dia, mais fica no bolso de quem trabalha. Queremos que chegue cada vez mais cedo." },
      { nota: "Como fazemos a conta: carga fiscal de {anoCarga} ({pct}% do PIB; {fonte}) × {diasAno} dias = {exato} dias, arredondados para {dias}." },
    ],
    imagem: fotos.custoImposto,
    banner: { etiqueta: "Libertação dos Impostos", titulo: "Até {fim}, trabalhamos para o Estado", frase: "Em {ano}, só a partir de {libertacao} o que ganhamos é para nós." },
    partilhar: "Em {ano}, trabalhamos até {fim} só para pagar impostos e contribuições.",
    extra: (ano) => {
      const c = contaImpostos(ano);
      return {
        dias: String(c.dias),
        exato: c.exato.toFixed(1).replace(".", ","),
        fim: porExtenso(c.fim),
        libertacao: porExtenso(c.libertacao),
        pct: String(CARGA_FISCAL.pct).replace(".", ","),
        anoCarga: String(CARGA_FISCAL.ano),
        fonte: CARGA_FISCAL.fonte,
        diasAno: String(diasNoAno(ano)),
      };
    },
  },
  {
    data: { slug: "/trofa-vila", titulo: "Trofa vila", dia: [5, 16], desde: 1984 },
    etiqueta: "16 de maio · 1984",
    titulo: "{anos} anos da Trofa vila",
    subtitulo: "O primeiro passo da Trofa: de povoação a vila.",
    descricao: "16 de maio de 1984: a Assembleia da República aprovou a elevação da Trofa a vila.",
    abertura: "A 16 de maio de 1984, a Assembleia da República aprovou a elevação da Trofa a vila.",
    blocos: [
      "A lei, a n.º 19/84, foi publicada a 28 de junho desse ano: “A povoação de Trofa, no concelho de Santo Tirso, é elevada à categoria de vila.”",
      "Foi o primeiro de três passos. Em 1993, a Trofa passou a cidade e, em 1998, conquistou o seu próprio concelho.",
      { destaque: "Cada passo foi conquistado pelos trofenses, que nunca desistiram de decidir o seu próprio caminho." },
      { link: "A Trofa cidade, em 1993 →", href: "/trofa-cidade" },
      { link: "O concelho, em 1998 →", href: "/dia-do-concelho" },
    ],
    fecho: "Parabéns, Trofa!",
    imagem: fotos.grupoNucleo,
    banner: { etiqueta: "1984 · {anos} anos", titulo: "Trofa vila", frase: "Há {anos} anos, a Trofa passou a vila." },
    partilhar: "16 de maio de 1984: a Trofa passou a vila.",
  },
  {
    data: { slug: "/trofa-cidade", titulo: "Trofa cidade", dia: [5, 27], desde: 1993 },
    etiqueta: "27 de maio · 1993",
    titulo: "{anos} anos da Trofa cidade",
    subtitulo: "De vila a cidade, em nove anos.",
    descricao: "27 de maio de 1993: a Assembleia da República aprovou a elevação da vila da Trofa a cidade.",
    abertura: "A 27 de maio de 1993, a Assembleia da República aprovou a elevação da vila da Trofa a cidade.",
    blocos: [
      "A lei, a n.º 29/93, foi publicada a 2 de julho de 1993: “A vila da Trofa, do concelho de Santo Tirso, é elevada à categoria de cidade.”",
      "Nove anos depois de ser vila, a Trofa era cidade. Faltava um passo: o concelho, que chegou em 1998.",
      { destaque: "Uma cidade é feita das pessoas que lá vivem, trabalham e criam. É nelas que confiamos." },
      { link: "A Trofa vila, em 1984 →", href: "/trofa-vila" },
      { link: "O concelho, em 1998 →", href: "/dia-do-concelho" },
    ],
    fecho: "Parabéns, Trofa!",
    imagem: fotos.grupoNucleo,
    banner: { etiqueta: "1993 · {anos} anos", titulo: "Trofa cidade", frase: "Há {anos} anos, a Trofa passou a cidade." },
    partilhar: "27 de maio de 1993: a Trofa passou a cidade.",
  },

  // ---------------- JUNHO A NOVEMBRO ----------------
  {
    data: { slug: "/dia-do-ambiente", titulo: "Dia Mundial do Ambiente", dia: [6, 5], desde: 1972 },
    etiqueta: "5 de junho",
    titulo: "Dia Mundial do Ambiente",
    subtitulo: "Cuidar da nossa terra, com inteligência e sem empobrecer.",
    descricao: "5 de junho, Dia Mundial do Ambiente: cuidar do rio Ave, dos montes e dos parques da Trofa, com soluções que funcionam.",
    abertura: "A 5 de junho celebra-se o Dia Mundial do Ambiente.",
    blocos: [
      "As Nações Unidas criaram-no em 1972, no ano da primeira grande conferência mundial sobre o ambiente, em Estocolmo, que abriu precisamente a 5 de junho.",
      "Na Trofa, o ambiente está à porta de casa: o rio Ave, o monte de S. Gens, os parques e as margens que todos queremos limpos e bem cuidados.",
      { destaque: "Proteger o ambiente não é proibir e taxar tudo. É inovar, cuidar do que é de todos e dar a cada um razões para fazer melhor." },
      "Acreditamos em soluções que funcionam: reciclar mais e melhor, cuidar dos rios e das florestas, apostar na tecnologia e premiar quem polui menos, em vez de empobrecer as famílias.",
      { link: "Os números do ambiente no concelho →", href: "/dados#ambiente" },
    ],
    fecho: "Cuidar da Trofa é cuidar de todos nós.",
    imagem: fotos.grupoNucleo,
    banner: { etiqueta: "5 de junho", titulo: "Dia do Ambiente", frase: "Cuidar da nossa terra, com inteligência e sem empobrecer." },
    partilhar: "5 de junho, Dia Mundial do Ambiente: cuidar da nossa terra, com inteligência e sem empobrecer.",
  },
  {
    data: { slug: "/dia-de-portugal", titulo: "Dia de Portugal", dia: [6, 10] },
    etiqueta: "10 de junho",
    titulo: "Dia de Portugal",
    subtitulo: "Dia de Portugal, de Camões e das Comunidades Portuguesas.",
    descricao: "10 de junho, Dia de Portugal, de Camões e das Comunidades Portuguesas.",
    abertura: "O 10 de Junho lembra a morte de Luís de Camões, em 1580, e celebra Portugal e os portugueses espalhados pelo mundo.",
    blocos: [
      "Camões escreveu Os Lusíadas, publicados em 1572: a grande epopeia de um país pequeno que foi ver o mundo.",
      "Hoje há milhões de portugueses e lusodescendentes fora do país. Muitos trofenses também partiram à procura de uma vida melhor, e muitos voltam todos os verões.",
      { destaque: "Queremos um país onde os jovens não tenham de emigrar para ter oportunidades." },
    ],
    fecho: "Viva Portugal!",
    imagem: fotos.grupoNucleo,
    banner: { etiqueta: "10 de junho", titulo: "Dia de Portugal", frase: "Orgulho no que somos, ambição para o que podemos ser." },
    partilhar: "10 de junho, Dia de Portugal: orgulho no que somos, ambição para o que podemos ser.",
  },
  {
    data: { slug: "/vila-do-coronado", titulo: "Vila do Coronado", dia: [6, 20], desde: 1997 },
    etiqueta: "20 de junho · 1997",
    titulo: "{anos} anos da Vila do Coronado",
    subtitulo: "São Romão e São Mamede, juntos numa vila.",
    descricao: "20 de junho de 1997: a Assembleia da República aprovou a elevação de São Romão e São Mamede a Vila do Coronado.",
    abertura: "A 20 de junho de 1997, a Assembleia da República aprovou a elevação das povoações de São Romão e São Mamede à categoria de Vila do Coronado.",
    blocos: [
      "A lei, a n.º 82/97, foi publicada a 24 de julho de 1997. Eram ainda terras do concelho de Santo Tirso: no ano seguinte, passaram a fazer parte do novo concelho da Trofa.",
      "Em 2013, as duas freguesias juntaram-se numa só: Coronado (São Romão e São Mamede).",
      "O Coronado tem um lugar especial na nossa história. Foi lá, a 25 de junho de 2022, no auditório da Junta de Freguesia (Polo de São Romão), que nasceu o núcleo da Iniciativa Liberal na Trofa.",
      { link: "A história do núcleo →", href: "/aniversario-do-nucleo" },
    ],
    fecho: "Parabéns, Vila do Coronado!",
    imagem: fotos.plenarioFundador,
    banner: { etiqueta: "1997 · {anos} anos", titulo: "Vila do Coronado", frase: "Há {anos} anos, São Romão e São Mamede passaram a Vila do Coronado." },
    partilhar: "20 de junho de 1997: São Romão e São Mamede passaram a Vila do Coronado.",
  },
  {
    data: { slug: "/aniversario-do-nucleo", titulo: "Aniversário do núcleo da IL Trofa", dia: [6, 25], desde: 2022 },
    etiqueta: "25 de junho · 2022",
    titulo: "{anos} anos de IL Trofa",
    subtitulo: "Desde 2022 a lutar por um bolo maior para todos.",
    descricao: "25 de junho de 2022: nasceu o núcleo da Iniciativa Liberal na Trofa. A história, os marcos e as pessoas.",
    abertura: "A 25 de junho de 2022, nasceu o núcleo da Iniciativa Liberal na Trofa.",
    blocos: [
      "O plenário fundador foi no auditório da Junta de Freguesia do Coronado (Polo de São Romão), com a presença de Rui Rocha, então deputado e mais tarde presidente da IL. Foi eleito o primeiro grupo de coordenação, com José Pedro Reis como coordenador.",
      "Desde então, o núcleo foi às listas da Assembleia da República, concorreu pela primeira vez às autárquicas e levou propostas para a Educação, a Habitação e o Metro.",
      { marcos: true },
      "Os coordenadores: José Pedro Reis (2022–2024), Ivo Silva (2024–2026) e Bruno Magalhães (desde 2026).",
      { destaque: "{anos} anos depois, a vontade é a mesma: uma Trofa com mais liberdade e mais oportunidades." },
      { link: "Conhece a equipa →", href: "/trofa-liberal" },
    ],
    fecho: "Parabéns a todos os que fazem a IL Trofa!",
    imagem: fotos.plenarioFundador,
    banner: { etiqueta: "2022 · {anos} anos", titulo: "{anos} anos de IL Trofa", frase: "Desde 2022 a lutar por um bolo maior para todos." },
    partilhar: "{anos} anos de IL Trofa: desde 2022 a lutar por um bolo maior para todos.",
  },
  {
    data: { slug: "/vitimas-dos-totalitarismos", titulo: "Memória das vítimas dos totalitarismos", dia: [8, 23] },
    etiqueta: "23 de agosto",
    titulo: "Em memória das vítimas dos totalitarismos",
    subtitulo: "Nunca esquecer: a liberdade não está garantida.",
    descricao: "23 de agosto: Dia Europeu em memória das vítimas dos regimes totalitários, nazis e comunistas.",
    abertura: "A 23 de agosto lembramos os milhões de vítimas dos regimes totalitários do século XX, nazis e comunistas.",
    blocos: [
      "A data recorda o 23 de agosto de 1939, quando a Alemanha nazi e a União Soviética assinaram o Pacto Molotov-Ribbentrop e dividiram entre si a Europa de Leste. Uma semana depois, começava a Segunda Guerra Mundial.",
      "O Parlamento Europeu propôs esta data em 2008 e, em 2009, pediu que fosse assinalada em toda a Europa, em memória das vítimas de todos os regimes totalitários e autoritários.",
      "Em 1989, no 50.º aniversário do pacto, cerca de dois milhões de pessoas deram as mãos ao longo de mais de 600 quilómetros, na Estónia, na Letónia e na Lituânia: a Via Báltica. Dois anos depois, os três países eram livres.",
      { destaque: "Campos de concentração, gulags, perseguições: nunca esquecer. A liberdade defende-se todos os dias." },
    ],
    fecho: "Nunca mais.",
    imagem: fotos.grupoNucleo,
    banner: { etiqueta: "23 de agosto", titulo: "Nunca esquecer", frase: "Em memória das vítimas dos regimes totalitários, nazis e comunistas." },
    partilhar: "23 de agosto: em memória das vítimas dos regimes totalitários, nazis e comunistas.",
  },
  {
    data: { slug: "/revolucao-liberal", titulo: "Revolução Liberal de 1820", dia: [8, 24], desde: 1820 },
    etiqueta: "24 de agosto · 1820",
    titulo: "{anos} anos da Revolução Liberal",
    subtitulo: "Foi no Porto que Portugal começou a ser liberal.",
    descricao: "24 de agosto de 1820: a Revolução Liberal do Porto, que deu a Portugal a sua primeira Constituição.",
    abertura: "A 24 de agosto de 1820, no Porto, militares e civis revoltaram-se contra o absolutismo.",
    blocos: [
      "O rei, D. João VI, vivia no Brasil desde 1808, e o reino era governado por uma regência sob forte influência britânica. A revolta foi preparada pelo Sinédrio, uma associação secreta fundada no Porto em 1818 por Manuel Fernandes Tomás e outros liberais.",
      "Exigiam Cortes eleitas e uma Constituição, e conseguiram as duas. Em 1822, Portugal teve a sua primeira Constituição. Dizia que a soberania reside na Nação e que o seu fim era manter a liberdade, a segurança e a propriedade de todos os portugueses.",
      { destaque: "O poder vem dos cidadãos e existe para proteger a sua liberdade, não para mandar nela." },
      "Mais de dois séculos depois, a ideia continua atual.",
    ],
    fecho: "Viva a liberdade!",
    imagem: fotos.grupoNucleo,
    banner: { etiqueta: "1820 · {anos} anos", titulo: "Revolução Liberal", frase: "Foi no Porto que Portugal começou a ser liberal." },
    partilhar: "24 de agosto de 1820: foi no Porto que Portugal começou a ser liberal.",
  },
  {
    data: { slug: "/11-de-setembro", titulo: "11 de Setembro", dia: [9, 11], desde: 2001 },
    etiqueta: "11 de setembro · 2001",
    titulo: "11 de Setembro",
    subtitulo: "Em memória das vítimas do terrorismo.",
    descricao: "11 de setembro de 2001: em memória das vítimas. A liberdade é mais forte do que o terror.",
    abertura: "A 11 de setembro de 2001, terroristas da Al-Qaeda desviaram quatro aviões nos Estados Unidos.",
    blocos: [
      "Dois foram lançados contra as Torres Gémeas, em Nova Iorque, e um contra o Pentágono, em Washington. O quarto caiu na Pensilvânia, depois de os passageiros enfrentarem os sequestradores. Morreram 2977 pessoas.",
      "Lembramos as vítimas, as suas famílias e todos os que arriscaram a vida para salvar outros.",
      { destaque: "O terrorismo ataca o que somos: sociedades livres, abertas e tolerantes. A melhor resposta é não abdicar da liberdade." },
    ],
    fecho: "Nunca esquecer.",
    imagem: fotos.grupoNucleo,
    banner: { etiqueta: "2001 · {anos} anos", titulo: "11 de Setembro", frase: "Em memória das vítimas. A liberdade é mais forte do que o terror." },
    partilhar: "11 de setembro: em memória das vítimas. A liberdade é mais forte do que o terror.",
  },
  {
    data: { slug: "/dia-da-democracia", titulo: "Dia Internacional da Democracia", dia: [9, 15] },
    etiqueta: "15 de setembro",
    titulo: "Dia Internacional da Democracia",
    subtitulo: "A democracia não acaba no voto.",
    descricao: "15 de setembro, Dia Internacional da Democracia: votar é o primeiro passo, participar é o seguinte.",
    abertura: "As Nações Unidas criaram em 2007 o Dia Internacional da Democracia, assinalado a 15 de setembro desde 2008.",
    blocos: [
      "Em Portugal, a democracia tem pouco mais de 50 anos. Há muitas pessoas que ainda se lembram de quando não se podia votar livremente nem dizer o que se pensava.",
      "Mas a democracia não acaba no voto. Vive de cidadãos que acompanham o que se decide, que fazem perguntas, que propõem e que participam.",
      { destaque: "Votar é o primeiro passo. Participar é o seguinte." },
      "Tens uma ideia para a Trofa? Queres saber o que se decide na Câmara? Começa aqui.",
      { link: "Dá-nos uma ideia →", href: "/participa?t=ideia" },
      { link: "Vê os números do concelho →", href: "/dados" },
    ],
    imagem: fotos.urna,
    banner: { etiqueta: "15 de setembro", titulo: "Dia da Democracia", frase: "Votar é o primeiro passo. Participar é o seguinte." },
    partilhar: "Dia Internacional da Democracia: votar é o primeiro passo, participar é o seguinte.",
  },
  {
    data: { slug: "/implantacao-da-republica", titulo: "Implantação da República", dia: [10, 5], desde: 1910 },
    etiqueta: "5 de outubro · 1910",
    titulo: "{anos} anos da República",
    subtitulo: "Cidadãos, não súbditos.",
    descricao: "5 de outubro de 1910: a implantação da República em Portugal.",
    abertura: "Na manhã de 5 de outubro de 1910, a República foi proclamada da varanda da Câmara Municipal de Lisboa.",
    blocos: [
      "Acabavam quase oito séculos de monarquia. O rei D. Manuel II partiu para o exílio e Portugal passou a ser uma república.",
      "A Primeira República durou até 1926 e foi um tempo muito instável. A democracia só chegaria com o 25 de Abril.",
      "A ideia de fundo continua atual: ninguém governa por nascimento. O poder pertence aos cidadãos.",
      "Tal como o 1.º de Dezembro, o 5 de Outubro deixou de ser feriado entre 2013 e 2015 e voltou em 2016.",
      { destaque: "Cidadãos, não súbditos." },
    ],
    imagem: fotos.grupoNucleo,
    banner: { etiqueta: "1910 · {anos} anos", titulo: "Implantação da República", frase: "Cidadãos, não súbditos." },
    partilhar: "5 de outubro de 1910: cidadãos, não súbditos.",
  },
  {
    data: { slug: "/queda-do-muro-de-berlim", titulo: "Queda do Muro de Berlim", dia: [11, 9], desde: 1989 },
    etiqueta: "9 de novembro · 1989",
    titulo: "{anos} anos da queda do Muro de Berlim",
    subtitulo: "O dia em que a liberdade passou o muro.",
    descricao: "9 de novembro de 1989: caiu o Muro de Berlim. Caiu porque as pessoas queriam ser livres.",
    abertura: "Na noite de 9 de novembro de 1989, caiu o Muro de Berlim.",
    blocos: [
      "O Muro foi construído em 1961 pelo regime comunista da Alemanha de Leste, para impedir que as pessoas fugissem para o Ocidente. Durante 28 anos separou famílias, amigos e uma cidade inteira. Pelo menos 140 pessoas morreram junto ao Muro.",
      "Nessa noite, depois de um anúncio confuso do governo de Leste, milhares de berlinenses juntaram-se nas passagens. Os guardas acabaram por abrir as portas, e as pessoas subiram ao Muro e começaram a derrubá-lo.",
      "Menos de um ano depois, a 3 de outubro de 1990, a Alemanha voltou a ser um só país. E por toda a Europa de Leste, os regimes comunistas caíram, um após outro.",
      { destaque: "O Muro não caiu sozinho. Caiu porque as pessoas queriam ser livres." },
    ],
    fecho: "Viva a liberdade!",
    imagem: fotos.grupoNucleo,
    banner: { etiqueta: "1989 · {anos} anos", titulo: "Queda do Muro de Berlim", frase: "O Muro não caiu sozinho. Caiu porque as pessoas queriam ser livres." },
    partilhar: "9 de novembro de 1989: o Muro não caiu sozinho. Caiu porque as pessoas queriam ser livres.",
  },
];

export const comemoracaoDe = (slug: string) => comemoracoes.find((c) => c.data.slug === `/${slug}`);

// Troca {anos}, {ano}, {anoAnterior} e as palavras de `extra`.
export function preencher(texto: string, valores: Record<string, string>) {
  return texto.replace(/\{(\w+)\}/g, (m, k: string) => valores[k] ?? m);
}

// Os valores a trocar nos textos de uma data: {anos}, {ano}, {anoAnterior} e os de `extra`.
export function valoresDe(c: Comemoracao, agora?: Date): Record<string, string> {
  const ano = anoDe(c.data, agora);
  return {
    ano: String(ano),
    anoAnterior: String(ano - 1),
    anos: String(anosDe(c.data, agora)),
    ...(c.extra ? c.extra(ano) : {}),
  };
}
