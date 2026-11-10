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
  { label: "Programa eleitoral", href: "/autarquicas-2025/programa" },
  { label: "Candidatos", href: "/autarquicas-2025/candidatos" },
  { label: "Apresentação da candidatura", href: "/autarquicas-2025/apresentacao-candidatura" },
  { label: "Apresentação do programa", href: "/autarquicas-2025/apresentacao-programa" },
  { label: "Diário de campanha", href: "/autarquicas-2025/diario" },
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
  { label: "Quem somos", href: "/trofa-liberal" },
  {
    label: "Dados da Trofa",
    href: links.dados,
    external: true,
    children: [
      { label: "Portal original", href: links.dados, external: true },
      { label: "Nova versão IL Trofa", href: "/dados" },
    ],
  },
  {
    label: "Ideias",
    href: "/ideias",
    children: [
      { label: "Propostas", href: "/ideias" },
      { label: "Metro para a Trofa", href: "/ideias/metro" },
      { label: "Trofa no topo da Educação", href: "/ideias/educacao" },
      { label: "Construir para o Futuro", href: "/ideias/habitacao" },
      { label: "Cartazes", href: "/ideias/cartazes" },
    ],
  },
  {
    label: "Imprensa e Eventos",
    href: "/imprensa",
    children: [
      { label: "Eventos", href: "/imprensa?t=eventos" },
      { label: "Notícias", href: "/imprensa?t=noticias" },
      { label: "Comunicados", href: "/imprensa?t=comunicados" },
      { label: "Autárquicas 2025", href: "/autarquicas-2025" },
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
      { label: "Faz-te membro", href: "/participa?t=membro" },
      { label: "Tens uma ideia?", href: "/participa?t=ideia" },
      { label: "Denúncia", href: "/participa?t=denuncia" },
      { label: "Contactos", href: "/participa?t=contactos" },
    ],
  },
];
