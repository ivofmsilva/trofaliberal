export const links = {
  facebook: "https://www.facebook.com/TrofaLiberal",
  instagram: "https://www.instagram.com/liberaltrofa/",
  whatsapp: "https://chat.whatsapp.com/BRWLlS46VKiLC4WKCdLRdr",
  email: "trofa@liberal.pt",
  nacionais: "https://iniciativaliberal.pt/ideias/",
};

export const autarquicasNav = [
  { label: "Trofa Para Cima", href: "/autarquicas-2025" },
  { label: "Programa eleitoral", href: "/autarquicas-2025/programa" },
  { label: "Candidatos", href: "/autarquicas-2025/candidatos" },
  { label: "Apresentação da candidatura", href: "/autarquicas-2025/apresentacao-candidatura" },
  { label: "Apresentação do programa", href: "/autarquicas-2025/apresentacao-programa" },
  { label: "Diário de campanha", href: "/autarquicas-2025/diario" },
  { label: "Brochuras", href: "/autarquicas-2025/brochuras" },
];

export const lojaNav = [
  { label: "Loja", href: "/loja" },
  { label: "Donativos", href: "/loja/donativos" },
];

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
};

export const nav: NavItem[] = [
  { label: "Início", href: "/" },
  {
    label: "Trofa Liberal",
    href: "/trofa-liberal",
    children: [
      { label: "Sobre a IL Trofa", href: "/trofa-liberal" },
      { label: "Equipa", href: "/trofa-liberal/equipa" },
      { label: "Faz-te Membro", href: "/trofa-liberal/faz-te-membro" },
      { label: "Juventude", href: "/trofa-liberal/juventude" },
      { label: "Contacta-nos", href: "/trofa-liberal/contactos" },
    ],
  },
  {
    label: "Ideias",
    href: "/ideias",
    children: [
      { label: "Propostas", href: "/ideias" },
      { label: "Cartazes", href: "/ideias/cartazes" },
      { label: "Tens uma ideia?", href: "/ideias/sugestao" },
      { label: "Documentos Nacionais", href: links.nacionais, external: true },
    ],
  },
  { label: "Denúncia", href: "/denuncia" },
  {
    label: "Na Imprensa",
    href: "/imprensa",
    children: [
      { label: "Notícias", href: "/imprensa#noticias" },
      { label: "Artigos de opinião", href: "/imprensa#artigos" },
      { label: "Comunicados", href: "/imprensa#comunicados" },
    ],
  },
  {
    label: "Eventos",
    href: "/eventos",
    children: [
      { label: "Calendário", href: "/eventos" },
      { label: "LIT — Jornadas Liberais", href: "/eventos/lit" },
      { label: "Aqui há Parlamento", href: "/eventos/aqui-ha-parlamento" },
      { label: "Outros eventos", href: "/eventos#outros" },
    ],
  },
  {
    label: "Autárquicas 2025",
    href: "/autarquicas-2025",
    children: autarquicasNav,
  },
  {
    label: "Loja e Donativos",
    href: "/loja",
    children: lojaNav,
  },
];
