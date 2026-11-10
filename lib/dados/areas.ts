// Do código CPV (o vocabulário europeu do que se compra) para áreas que se leiam bem.
// Para mudar a arrumação, edita as listas de divisões (os 2 primeiros algarismos do CPV).
export const AREAS: { id: string; nome: string; divisoes: string[] }[] = [
  { id: "obras", nome: "Obras e construção", divisoes: ["45", "44", "43", "71", "70"] },
  { id: "manutencao", nome: "Manutenção e reparação", divisoes: ["50", "51"] },
  { id: "ambiente", nome: "Ambiente, resíduos e limpeza", divisoes: ["90", "77", "41"] },
  { id: "energia", nome: "Energia, combustíveis e eletricidade", divisoes: ["09", "65", "76"] },
  { id: "alimentacao", nome: "Alimentação e refeições", divisoes: ["15", "55"] },
  { id: "educacao", nome: "Educação e formação", divisoes: ["80"] },
  { id: "cultura", nome: "Cultura, desporto e eventos", divisoes: ["92", "37"] },
  { id: "saude", nome: "Saúde e ação social", divisoes: ["85", "33", "98"] },
  { id: "informatica", nome: "Informática e comunicações", divisoes: ["30", "32", "48", "72", "64"] },
  { id: "consultoria", nome: "Consultoria e serviços profissionais", divisoes: ["79", "73", "75", "66"] },
  { id: "transportes", nome: "Transportes e veículos", divisoes: ["34", "60", "63"] },
  { id: "seguranca", nome: "Segurança e proteção civil", divisoes: ["35"] },
  { id: "equipamento", nome: "Equipamento e materiais", divisoes: ["03", "14", "16", "18", "19", "22", "24", "31", "38", "39", "42"] },
];
export const OUTRAS = { id: "outras", nome: "Outras / sem classificação" };

export const DIVISOES: Record<string, string> = {
  "03": "Produtos agrícolas, da silvicultura e da pesca",
  "09": "Combustíveis, eletricidade e outras fontes de energia",
  "14": "Produtos das indústrias extrativas",
  "15": "Produtos alimentares e bebidas",
  "16": "Máquinas agrícolas",
  "18": "Vestuário, calçado e bagagem",
  "19": "Couro e têxteis",
  "22": "Impressos e produtos conexos",
  "24": "Produtos químicos",
  "30": "Material informático e de escritório",
  "31": "Máquinas e material elétrico",
  "32": "Equipamento de rádio, televisão e comunicações",
  "33": "Equipamento médico e produtos de higiene",
  "34": "Equipamento de transporte",
  "35": "Equipamento de segurança, incêndios e polícia",
  "37": "Instrumentos musicais, desporto e jogos",
  "38": "Equipamento de laboratório e de precisão",
  "39": "Mobiliário e equipamento doméstico",
  "41": "Água captada e depurada",
  "42": "Máquinas industriais",
  "43": "Máquinas para construção e minas",
  "44": "Estruturas e materiais de construção",
  "45": "Trabalhos de construção",
  "48": "Pacotes de software e sistemas de informação",
  "50": "Serviços de reparação e manutenção",
  "51": "Serviços de instalação",
  "55": "Hotelaria e restauração",
  "60": "Serviços de transporte",
  "63": "Serviços de apoio aos transportes",
  "64": "Serviços postais e de telecomunicações",
  "65": "Serviços públicos (eletricidade, água, gás)",
  "66": "Serviços financeiros e de seguros",
  "70": "Serviços imobiliários",
  "71": "Arquitetura, engenharia e inspeção",
  "72": "Serviços de informática",
  "73": "Investigação e desenvolvimento",
  "75": "Serviços da administração pública",
  "76": "Serviços da indústria petrolífera",
  "77": "Serviços agrícolas e florestais",
  "79": "Serviços às empresas (consultoria, publicidade, formação)",
  "80": "Ensino e formação",
  "85": "Saúde e ação social",
  "90": "Esgotos, resíduos, limpeza e ambiente",
  "92": "Lazer, cultura e desporto",
  "98": "Outros serviços comunitários e pessoais",
};

export function areaDe(cpv: string | null | undefined): { id: string; nome: string } {
  const div = (cpv ?? "").slice(0, 2);
  return AREAS.find((a) => a.divisoes.includes(div)) ?? OUTRAS;
}

export function divisaoNome(cpv: string | null | undefined): string | null {
  const div = (cpv ?? "").slice(0, 2);
  return DIVISOES[div] ?? null;
}
