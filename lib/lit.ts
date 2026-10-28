// LIT — Jornadas Liberais da Trofa, 1.ª edição (Educação).

// Resumo da semana. Acrescenta aqui outras visitas quando tiveres os detalhes
// (instituição, dia, quem foi) — aparecem sozinhas por ordem.
export const resumoSemana = [
  {
    quando: "23 a 27 de março",
    titulo: "Semana de visitas a escolas e centros de formação",
    texto:
      "A IL Trofa visitou estabelecimentos de ensino do concelho, cobrindo as várias vertentes do sistema educativo, para conhecer a realidade de cada instituição e ouvir diretamente os seus responsáveis.",
  },
  {
    quando: "24 de março",
    titulo: "CENFIM — Centro de Formação Profissional da Indústria Metalomecânica",
    texto:
      "A visita do deputado Carlos Guimarães Pinto marcou o arranque das jornadas. Foi destacada a parceria com a Airbus e a taxa de empregabilidade superior a 90%.",
  },
  {
    quando: "28 de março, 15h",
    titulo: "Debate público — Auditório da Escola Secundária da Trofa",
    texto:
      "Evento final, aberto à comunidade, com apresentação de dados sobre o ensino na Trofa e em Portugal e as intervenções de José Pedro Reis (professor e historiador trofense), Matilde Rocha (vereadora da Educação da Câmara do Porto) e Sandra Maia (psicóloga trofense).",
  },
];

// Material das apresentações: PDFs. Copia o ficheiro para public/lit/ e junta uma
// linha, por exemplo:
//   { titulo: "Dados sobre o ensino na Trofa", href: "/lit/dados-ensino-trofa.pdf" },
export const apresentacoes: { titulo: string; href: string }[] = [];

// Relatório das jornadas: quando existir, copia o PDF para public/lit/ e escreve o
// caminho aqui, por exemplo "/lit/relatorio-lit-educacao.pdf".
export const relatorio: string | null = null;
