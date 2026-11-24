import type { Marco } from "@/components/Marcos";
import { plenario2026 } from "@/lib/equipa";

// Marcos do núcleo da IL Trofa (Quem Somos e página do aniversário do núcleo).
// Os quadrados com `foto` abrem-na ao clicar. Ficheiros em public/images/.
export const marcos: Marco[] = [
  {
    ano: "2021",
    titulo: "Primeiro encontro liberal na Trofa",
    texto: "Primeiro contacto entre simpatizantes e membros da IL no concelho.",
    foto: {
      src: "/images/geral/primeiro-encontro-liberais.jpg",
      alt: "Primeiro encontro de liberais na Trofa",
    },
  },
  {
    ano: "2022",
    titulo: "Deputados liberais eleitos pelo círculo do Porto",
    texto: "Primeira campanha liberal a passar na Trofa.",
    foto: {
      src: "/images/geral/sobre-acao-tenda.jpg",
      alt: "Ação de rua da Iniciativa Liberal na Trofa, com tenda e bandeiras",
    },
  },
  {
    ano: "2022",
    titulo: "Plenário fundador do núcleo",
    texto: "Primeiro grupo de coordenação eleito em São Romão do Coronado.",
    foto: {
      src: "/images/geral/plenario-2022-mesa.jpg",
      alt: "Mesa do plenário fundador do núcleo da IL Trofa, em 2022",
    },
  },
  {
    ano: "2024",
    titulo: "Primeiros Liberais Trofenses nas Listas à Assembleia da República",
    texto: "José Pedro Reis e Diamantino Costa integram as listas à Assembleia da República.",
    foto: {
      src: "/images/geral/marco-listas-ar-2024.jpg",
      alt: "Notícia: Trofenses na lista da Iniciativa Liberal ao Parlamento",
    },
  },
  {
    ano: "2024",
    titulo: "Plenário eletivo",
    texto: "Novo Grupo de Coordenação da IL Trofa eleito em Santiago de Bougado.",
    foto: {
      src: "/images/geral/plenario-2024-bougado.jpg",
      alt: "Plenário eletivo de 2024 no auditório da Junta de Freguesia de Bougado",
    },
  },
  {
    ano: "2025",
    titulo: "Primeiras autárquicas",
    texto:
      "Listas à Câmara e à Assembleia Municipal da Trofa e às juntas de freguesia de Bougado e Alvarelhos. A IL trouxe uma nova forma de fazer política às eleições.",
    foto: {
      src: "/images/geral/sobre-acao-camisolas.jpg",
      alt: "Liberais trofenses de t-shirt azul numa ação da campanha autárquica",
    },
  },
  {
    ano: "2026",
    titulo: "Representação no Conselho Municipal da Juventude",
    texto: "A IL passa a estar representada no Conselho pela primeira vez, com Duarte Pinheiro como membro efetivo e Afonso Couto como suplente.",
    foto: {
      src: "/images/geral/juventude-cmj.jpg",
      alt: "Representantes da Iniciativa Liberal no Conselho Municipal da Juventude",
    },
  },
  {
    ano: "2026",
    titulo: "Plenário eletivo",
    texto: plenario2026.realizado
      ? `Novo Grupo de Coordenação da IL Trofa eleito no ${plenario2026.local}, a ${plenario2026.data}.`
      : `Plenário eletivo da IL Trofa, no ${plenario2026.local}, para eleger o novo Grupo de Coordenação.`,
    foto: {
      src: "/images/geral/plenario-muro-2026.webp",
      alt: "Junta de Freguesia do Muro, com um expositor da Iniciativa Liberal à entrada",
    },
  },
];
