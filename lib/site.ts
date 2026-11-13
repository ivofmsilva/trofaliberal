// Adesão: faz-se no site da Iniciativa Liberal; o núcleo aprova o pedido.
export const aderir = {
  href: "https://iniciativaliberal.pt/aderir/",
  quotaAnual: 40,
  quotaJovem: 25,
};

export const links = {
  facebook: "https://www.facebook.com/TrofaLiberal",
  instagram: "https://www.instagram.com/liberaltrofa/",
  // O link do grupo de WhatsApp não está no site: as pessoas pedem convite aqui.
  convite: "/participa?t=contactos",
  email: "trofa@liberal.pt",
  nacionais: "https://iniciativaliberal.pt/ideias/",
  // Portal de dados abertos da Trofa (alojado na Cloudflare Pages).
  dados: "https://ae5aedd6.white-mode-f771.pages.dev/",
};

export const autarquicasNav = [
  { label: "Trofa Para Cima", href: "/autarquicas-2025" },
  { label: "Programa Eleitoral", href: "/autarquicas-2025/programa" },
  { label: "Candidatos", href: "/autarquicas-2025/candidatos" },
  { label: "Apresentação da Candidatura", href: "/autarquicas-2025/apresentacao-candidatura" },
  { label: "Apresentação do Programa", href: "/autarquicas-2025/apresentacao-programa" },
  { label: "Diário de Campanha", href: "/autarquicas-2025/diario" },
  { label: "Outros", href: "/autarquicas-2025/brochuras" },
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

// Menu principal. Cada bloco abre na sua primeira página, que tem as ligações para o resto.
export const nav: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Quem Somos", href: "/trofa-liberal" },
  {
    label: "Dados da Trofa",
    href: links.dados,
    external: true,
    children: [
      { label: "Portal Original", href: links.dados, external: true },
      { label: "Nova Versão IL Trofa", href: "/dados" },
    ],
  },
  {
    label: "Ideias",
    href: "/ideias",
    children: [
      { label: "Metro para a Trofa", href: "/ideias/metro" },
      { label: "Trofa no Topo da Educação", href: "/ideias/educacao" },
      { label: "Construir para o Futuro", href: "/ideias/habitacao" },
      { label: "Cartazes", href: "/ideias/cartazes" },
      { label: "Programa Autárquico ’25", href: "/autarquicas-2025/programa" },
    ],
  },
  {
    label: "Imprensa e Eventos",
    href: "/imprensa",
    children: [
      { label: "Eventos", href: "/imprensa?t=eventos" },
      { label: "Notícias e Comunicados", href: "/imprensa?t=noticias" },
      { label: "Artigos de Opinião", href: "/imprensa?t=artigos" },
      { label: "Arquivo: Autárquicas ’25", href: "/autarquicas-2025" },
    ],
  },
  {
    label: "Loja e Donativos",
    href: "/loja",
    children: lojaNav,
  },
  {
    label: "Participa",
    href: "/participa",
    children: [
      { label: "Faz-te Membro", href: "/participa?t=membro" },
      { label: "Tens uma Ideia?", href: "/participa?t=ideia" },
      { label: "Denúncia", href: "/participa?t=denuncia" },
      { label: "Contactos", href: "/participa?t=contactos" },
    ],
  },
];

// As 6 freguesias do concelho da Trofa (para os formulários).
export const freguesias = [
  "Alvarelhos",
  "Bougado (São Martinho e Santiago)",
  "Coronado (São Romão e São Mamede)",
  "Covelas",
  "Guidões",
  "Muro",
];
