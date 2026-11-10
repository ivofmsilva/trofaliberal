// Como se arrumam os indicadores nas páginas. Para mudar a ordem, o nome de um tema ou levar um
// indicador para outro tema, basta editar esta lista (os "slugs" são os nomes em data/indicadores.json).
export type Tema = { id: string; titulo: string; texto: string; slugs: string[] };

export const temas: Tema[] = [
  {
    id: "demografia",
    titulo: "Demografia",
    texto: "Quantas pessoas vivem na Trofa e como está a mudar a população.",
    slugs: [
      "populacao_residente",
      "populacao_media_residente",
      "idade_mediana",
      "indice_envelhecimento",
      "indice_dependencia_idosos",
      "indice_dependencia_jovens",
      "indice_dependencia_total",
      "indice_longevidade",
      "proporcao_mulheres_idade_fertil",
      "relacao_masculinidade",
      "taxa_bruta_natalidade",
      "taxa_bruta_mortalidade",
    ],
  },
  {
    id: "economia",
    titulo: "Economia e emprego",
    texto: "Empresas, postos de trabalho e rendimento.",
    slugs: [
      "empresas",
      "pessoal_ao_servico",
      "populacao_empregada_residente",
      "indice_autossuficiencia_emprego",
      "poder_compra_per_capita",
      "rendimento_mediano",
      "vab",
      "volume_negocios",
    ],
  },
  {
    id: "habitacao",
    titulo: "Habitação, turismo e água",
    texto: "Preços da casa, crédito à habitação, dormidas turísticas e água.",
    slugs: [
      "valor_mediano_habitacao",
      "credito_habitacao_por_habitante",
      "taxa_credito_habitacao",
      "dormidas_por_100_habitantes",
      "agua_segura_percentagem",
    ],
  },
  {
    id: "receitas",
    titulo: "Receitas do município",
    texto: "De onde vem o dinheiro da Câmara.",
    slugs: [
      "receita_total_municipal",
      "receita_imi",
      "receita_imt",
      "receita_derrama",
      "receita_participacao_irs",
      "receita_iuc",
    ],
  },
  {
    id: "democracia",
    titulo: "Democracia",
    texto: "Participação nas eleições autárquicas.",
    slugs: [
      "populacao_inscrita_eleitoral",
      "taxa_abstencao_camaras_municipais",
      "partido_mais_votado_camara_municipal",
      "partido_mais_votado_assembleia_municipal",
      "votos_brancos_camara_municipal",
      "votos_brancos_assembleia_municipal",
      "votos_nulos_camara_municipal",
      "votos_nulos_assembleia_municipal",
    ],
  },
];

// Os números grandes no início da página inicial.
export const destaques = [
  "populacao_residente",
  "empresas",
  "indice_autossuficiencia_emprego",
  "poder_compra_per_capita",
  "agua_segura_percentagem",
  "receita_total_municipal",
];

export function temaDe(slug: string) {
  return temas.find((t) => t.slugs.includes(slug));
}
