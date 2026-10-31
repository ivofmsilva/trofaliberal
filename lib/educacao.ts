// Manifesto pela Educação: Trofa no Topo da Educação.
// Texto a partir do relatório "Liberdade para aprender, Autonomia para crescer" das
// 1.as Jornadas Liberais da Trofa (Educação), com a escrita corrigida.

export type Ambito = "local" | "nacional";

export type Eixo = {
  n: number;
  titulo: string;
  curto: string;
  ambito: Ambito;
  lema: string;
};

export type Proposta = {
  id: string; // ex.: "1.2"
  eixo: number;
  titulo: string;
  resumo: string;
  porque: string;
  itens?: string[];
};

export const eixos: Eixo[] = [
  {
    n: 1,
    titulo: "Rede escolar municipal",
    curto: "Rede escolar",
    ambito: "local",
    lema: "Escolas, creches e apoios à medida da Trofa de hoje.",
  },
  {
    n: 2,
    titulo: "Políticas públicas com dados e envolvimento da comunidade",
    curto: "Dados e comunidade",
    ambito: "local",
    lema: "Decidir com dados, e com quem vive a educação todos os dias.",
  },
  {
    n: 3,
    titulo: "Mais formação e ligação ao trabalho",
    curto: "Formação e trabalho",
    ambito: "local",
    lema: "Ligar o ensino, a economia e o território.",
  },
  {
    n: 4,
    titulo: "Educação moderna com mais oportunidades",
    curto: "O que exigimos ao Governo",
    ambito: "nacional",
    lema: "Temas que ultrapassam o concelho e que defendemos na Assembleia da República.",
  },
];

export const propostas: Proposta[] = [
  {
    id: "1.1",
    eixo: 1,
    titulo: "Atualizar a rede escolar do 1.º ciclo",
    resumo:
      "Melhorar as condições de aprendizagem, combater a subutilização dos espaços e as turmas mistas, e libertar espaços para creches, biblioteca municipal e salas de estudo.",
    porque:
      "A rede escolar da Trofa foi desenhada para uma realidade demográfica e de mobilidade que já não existe. As turmas mistas, com alunos de anos diferentes na mesma sala, são um dos sintomas. Reorganizar os agrupamentos, com rigor e dados, elimina-as, melhora a aprendizagem e liberta espaços para as necessidades crescentes do concelho. A carta educativa pode ser o ponto de partida de uma discussão pública sobre a rede escolar, alinhada com as mudanças estruturais que o Ministério da Educação prepara.",
  },
  {
    id: "1.2",
    eixo: 1,
    titulo: "Resolver o problema das creches",
    resumo: "Saber as reais necessidades de creche do concelho e criar uma resposta conjunta e eficaz.",
    porque:
      "Os primeiros anos de vida são a fase de maior impacto no desenvolvimento cognitivo, emocional e social, como mostra a investigação de James Heckman. Faltam vagas para a procura das famílias trofenses. O ponto de partida é uma discussão pública com todos os operadores, para saber vagas, listas de espera e necessidades atuais e futuras. Depois, perceber a disponibilidade dos operadores e que instituições públicas podem receber vagas nas suas instalações, eliminando entraves burocráticos ao licenciamento de novas creches. A Câmara garante diretamente as vagas só se os operadores não tiverem disponibilidade: o município não tem de construir tudo nem operar sozinho.",
  },
  {
    id: "1.3",
    eixo: 1,
    titulo: "Mais componentes educativas",
    resumo: "Desporto, artes, apoio psicológico e novas competências para todos os alunos.",
    porque:
      "A prática desportiva regular na infância é determinante para a saúde, o equilíbrio emocional e o rendimento escolar. O bullying, as redes sociais, a IA e a falta de psicólogos estão no centro da experiência escolar de muitos jovens. O município pode usar a sua influência e recursos, em articulação com os agrupamentos, para que nenhum jovem fique sem apoio por falta de meios.",
    itens: [
      "Desporto escolar de grande qualidade logo no 1.º ciclo, com bons espaços desportivos em todas as escolas.",
      "Protocolos formais para as AEC de artes, para que o ensino artístico chegue a todas as crianças.",
      "Mais psicólogos nas escolas públicas e promoção do Gabinete Municipal de Apoio Psicológico e Pedagógico.",
      "Incentivo a projetos de literacia financeira, cívica, digital e ambiental.",
      "Apoio a alunos com necessidades educativas especiais: terapias ocupacionais, musicais, psicológicas ou médicas, sempre que fundamentado.",
      "Apoio escolar à integração de crianças migrantes, não falantes de português, institucionalizadas ou de meios desfavorecidos.",
    ],
  },
  {
    id: "1.4",
    eixo: 1,
    titulo: "Biblioteca municipal e salas de estudo",
    resumo: "Uma biblioteca municipal de excelência, com salas de estudo 24 horas acessíveis por cartão.",
    porque:
      "A Trofa é dos poucos concelhos da Área Metropolitana do Porto sem uma biblioteca municipal digna desse nome, num território com mais de 38 000 habitantes e duas escolas secundárias. Uma biblioteca moderna reduz o abandono escolar e apoia quem não tem condições em casa para estudar, minimizando as diferenças sociais. Aproveitar infraestrutura escolar já existente torna a medida mais eficiente e sustentável.",
  },
  {
    id: "1.5",
    eixo: 1,
    titulo: "Ensino superior na Trofa",
    resumo: "Estudar e envolver os agentes na criação de um polo de ensino superior no concelho.",
    porque:
      "A Trofa está em 114.º lugar no ranking de competitividade municipal (+Liberdade), penalizada precisamente pela ausência de ensino superior. Tem empresas de metalomecânica com um nível de inovação muito elevado, que precisam de mão de obra especializada, e um centro de formação de referência nacional. Um polo de ensino superior nas áreas estratégicas da economia local fixaria talento, elevaria as qualificações da população adulta, hoje abaixo da média nacional, e faria da Trofa, por exemplo, a capital portuguesa da metalomecânica. Pode ser complementado com uma residência para estudantes.",
  },
  {
    id: "1.6",
    eixo: 1,
    titulo: "Bolsas de mérito",
    resumo:
      "Reforçar as bolsas de mérito e garantir bolsas de ensino superior a alunos desfavorecidos com bom aproveitamento, recorrendo preferencialmente a mecenas.",
    porque:
      "Nenhum aluno com bom aproveitamento deve abandonar o ensino por razões económicas. As bolsas de mérito reconhecem o esforço, não a origem social: o futuro de um jovem da Trofa deve depender do talento e do empenho, não do sítio onde nasceu.",
  },
  {
    id: "2.1",
    eixo: 2,
    titulo: "Elevar o Conselho Municipal de Educação",
    resumo: "Mais discussão, mais transparência e mais especialistas no debate.",
    porque:
      "No anterior mandato o conselho foi raramente convocado e produziu pouca discussão. Um conselho mais ativo traz ao debate os especialistas em educação do concelho, permite aos agentes educativos maior coordenação e complementaridade, e deixa os munícipes acompanhar o trabalho.",
  },
  {
    id: "2.2",
    eixo: 2,
    titulo: "Divulgar os projetos educativos e criar uma mostra anual de formação",
    resumo: "Dar a conhecer os projetos e as ofertas de todas as escolas, para uma escolha informada.",
    porque:
      "Uma escolha informada é uma escolha livre. Muitos encarregados de educação desconhecem os projetos pedagógicos, as instalações, as atividades extracurriculares e as ofertas formativas das escolas públicas da Trofa. Uma mostra anual de formação de todas as escolas do concelho, integrada também em eventos como o Belive e a Expotrofa, resolve a falta de visibilidade a um custo mínimo e dá orientação vocacional neutra, que inclui todas as vias de ensino e todas as instituições do concelho.",
  },
  {
    id: "2.3",
    eixo: 2,
    titulo: "Apoiar a sociedade civil e o mecenato educativo",
    resumo: "Protocolos, infraestruturas e reconhecimento para quem melhora a educação no concelho.",
    porque:
      "A Câmara deve apoiar e facilitar o trabalho das entidades da sociedade civil, com protocolos formais, acesso a infraestrutura municipal e reconhecimento, sem cheques em branco e com resultados mensuráveis. O aluno está no centro da ação educativa. O mecenato educativo, a criação de tutores e o envolvimento das empresas locais trazem a sociedade civil para a educação do concelho, em benefício dos alunos.",
  },
  {
    id: "3.1",
    eixo: 3,
    titulo: "Uma ponte entre as empresas e a formação",
    resumo:
      "A Câmara como mediadora entre as necessidades das empresas do concelho e a oferta de escolas e centros de formação.",
    porque:
      "A Trofa tem empresas com falta de mão de obra qualificada e, ao mesmo tempo, centros de formação com lugares vazios. Esta desconexão é um desperdício económico e social. A Câmara está em posição privilegiada para mapear as necessidades de qualificação do tecido empresarial e articulá-las com a oferta formativa, para que a formação responda às necessidades reais do território.",
  },
  {
    id: "3.2",
    eixo: 3,
    titulo: "Formação para quem educa",
    resumo: "Formação contínua dos profissionais de educação e dos pais e encarregados de educação.",
    porque:
      "A educação muda constantemente, e a qualidade de uma creche mede-se também pela competência e motivação de quem trabalha com as crianças. Apoiar a formação contínua é uma medida de custo reduzido e impacto elevado, e o programa eleitoral já previa parcerias entre o município, as escolas e os operadores privados. Os pais são os primeiros educadores e têm direito a informação rigorosa para exercerem esse papel.",
    itens: [
      "Apoiar a formação dos profissionais de educação de todos os graus de ensino do concelho.",
      "Sessões de sensibilização para pais e encarregados de educação, com os agrupamentos, os centros de saúde e especialistas locais.",
      "Promover a identidade local na educação: estudar as freguesias da Trofa e visitar locais de interesse cultural.",
    ],
  },
  {
    id: "3.3",
    eixo: 3,
    titulo: "Escolas abertas e estágios de verão",
    resumo:
      "Abrir escolas e bibliotecas fora do horário letivo e criar estágios de verão no município e nas empresas locais.",
    porque:
      "Quanto mais contacto com o mundo do trabalho, maior a motivação e a preparação dos jovens. Abrir as escolas e bibliotecas ao exterior depois das aulas, com regras simples e claras, aproveita espaços que já existem. Os estágios de verão dão aos jovens do concelho o primeiro contacto com o mercado de trabalho.",
  },
  {
    id: "4.1",
    eixo: 4,
    titulo: "Igualar as regras das escolas profissionais públicas e privadas",
    resumo: "Acabar com a assimetria no número mínimo de alunos por turma.",
    porque:
      "A Trofa tem um dos melhores centros de metalomecânica do país, com taxa de empregabilidade superior a 90% e parceria com a Airbus. No entanto, precisa de 20 formandos para abrir uma turma, enquanto as escolas profissionais do Ministério da Educação podem funcionar com 12 (meia turma). Esta assimetria não tem justificação pedagógica: é burocracia que penaliza a qualidade.",
  },
  {
    id: "4.2",
    eixo: 4,
    titulo: "Formação profissional logo a seguir ao 9.º ano, sem barreiras de idade",
    resumo:
      "Rever as regras que travam o acesso dos jovens de 15 e 16 anos aos cursos de aprendizagem.",
    porque:
      "Um jovem que termina o 9.º ano com 15 ou 16 anos e quer entrar numa formação profissional de qualidade não deve ficar dependente de autorizações excecionais nem de normas administrativas desatualizadas. Fica privado de uma via formativa de excelência no momento mais crítico das suas escolhas. Rever estas regras tem impacto direto na empregabilidade jovem e na captação de talento para o ensino profissional.",
  },
  {
    id: "4.3",
    eixo: 4,
    titulo: "Autonomia para abrir cursos profissionais",
    resumo:
      "As escolas do Ministério da Educação devem poder abrir cursos sem aprovação ministerial prévia, com base na procura local e em parcerias com empresas.",
    porque:
      "Uma escola profissional não pode abrir um curso que o mercado local pede sem aprovação de Lisboa. Esta rigidez burocrática impede respostas rápidas às necessidades reais do território. Um sistema educativo moderno precisa dessa autonomia.",
  },
  {
    id: "4.4",
    eixo: 4,
    titulo: "Mais autonomia para as escolas públicas",
    resumo: "Dar às escolas públicas mais autonomia na gestão do orçamento e do plano curricular.",
    porque:
      "A investigação internacional mostra que as escolas com mais autonomia e responsabilidade local produzem melhores resultados. Portugal tem um dos sistemas mais centralizados da OCDE, e os resultados vêem-se. A Trofa tem realidades educativas bastante distintas no seu território e precisa de mais autonomia para as superar: escolas mais ágeis, inovadoras e responsáveis.",
  },
  {
    id: "4.5",
    eixo: 4,
    titulo: "Manuais escolares: pelas possibilidades, não pelo tipo de escola",
    resumo:
      "Acabar com a injustiça de a gratuitidade dos manuais depender de a escola ser pública ou privada, e não das possibilidades da família.",
    porque:
      "Para algumas famílias, o valor dos manuais escolares é uma barreira real ao acesso à educação. Que a gratuitidade dependa da escola frequentada, e não das condições económicas, é uma injustiça que o Estado mantém sem justificação. A medida tem um custo orçamental modesto e um impacto de equidade significativo: nenhuma família escolhe a escola pelo custo dos manuais, e sim pelo projeto educativo que melhor serve os seus filhos.",
  },
  {
    id: "4.6",
    eixo: 4,
    titulo: "Atualizar a Lei de Bases do Sistema Educativo",
    resumo: "Incluir percursos flexíveis, várias literacias e o reconhecimento formal do ensino dual.",
    porque:
      "A Lei de Bases data de 1986. Décadas de transformações sociais, económicas e tecnológicas tornaram-na obsoleta em pontos cruciais. Atualizá-la, com o reconhecimento formal do ensino dual, os percursos flexíveis e várias literacias, é uma reforma estrutural indispensável que o país tem adiado demasiado tempo.",
  },
  {
    id: "4.7",
    eixo: 4,
    titulo: "Creches no Ministério da Educação",
    resumo:
      "Passar as creches (0 a 3 anos), hoje sob tutela do Ministério do Trabalho, para o Ministério da Educação, como já acontece no pré-escolar.",
    porque:
      "Que as creches dependam do Ministério do Trabalho enquanto o pré-escolar (3 a 5 anos) pertence ao da Educação é uma divisão administrativa sem fundamento científico. A investigação em neurodesenvolvimento infantil é clara: os primeiros três anos de vida são o período de maior plasticidade cerebral e de maior impacto das experiências formativas. Tratar as creches como assistência social, e não como a primeira etapa do percurso educativo, é um erro de paradigma.",
  },
];

export const numeros = [
  {
    valor: "114.º",
    legenda: "lugar da Trofa em Educação, entre 186 municípios",
    fonte: "Ranking de competitividade autárquica 2025 (+Liberdade)",
  },
  {
    valor: "20 / 12",
    legenda: "formandos para abrir uma turma no centro de formação da Trofa e nas escolas profissionais do Estado",
    fonte: "Relatório das Jornadas Liberais",
  },
  {
    valor: "+90%",
    legenda: "de empregabilidade no CENFIM da Trofa, com parceria com a Airbus",
    fonte: "Jornadas Liberais da Trofa",
  },
  {
    valor: "1986",
    legenda: "o ano da Lei de Bases do Sistema Educativo, que continua em vigor",
    fonte: "Relatório das Jornadas Liberais",
  },
];

// Fotos das Jornadas (public/images/eventos/lit/).
export const fotosJornadas = [
  "lit-87.jpeg",
  "lit-88.jpeg",
  "lit-04.jpg",
  "lit-10.jpg",
  "lit-09.jpg",
  "lit-19.jpg",
  "lit-02.jpg",
  "lit-12.jpg",
].map((f) => `/images/eventos/lit/${f}`);
