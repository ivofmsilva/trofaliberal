// Merchandising da Iniciativa Liberal nacional, vendido também na loja do núcleo pelos mesmos
// preços (lista de preços públicos de portal.liberal.pt/shop). As imagens estão em
// public/images/loja-nacional/<id>.webp, onde <id> é o número do produto no portal.
export type ProdutoNacional = {
  id: number;
  nome: string;
  preco: string;
  tamanhos?: string[];
  nota?: string;
};

const roupa = ["XS", "S", "M", "L", "XL", "XXL"];

export const merchandising: ProdutoNacional[] = [
  // Roupa primeiro, depois os restantes artigos.
  { id: 28, nome: "T-Shirt Institucional", preco: "10,00 €", tamanhos: roupa },
  { id: 41, nome: "T-Shirt Temática “Esquerda, Direita, Liberal”", preco: "12,50 €", tamanhos: roupa },
  { id: 30, nome: "T-Shirt Temática “Sou um bom partido”", preco: "12,50 €", tamanhos: roupa },
  { id: 33, nome: "Polo Institucional", preco: "15,00 €", tamanhos: roupa },
  { id: 34, nome: "Hoodie Institucional", preco: "30,00 €", tamanhos: roupa },
  { id: 39, nome: "Casaco Institucional", preco: "45,00 €", tamanhos: roupa },
  { id: 38, nome: "Boné Liberal", preco: "10,00 €" },
  { id: 52, nome: "Meias brancas “i”", preco: "8,00 €", tamanhos: ["36-40", "41-46"] },
  { id: 51, nome: "Meias azul “i”", preco: "8,00 €", tamanhos: ["36-40", "41-46"] },
  { id: 74, nome: "Bloco de Notas Iniciativa Liberal 14x21", preco: "8,00 €" },
  { id: 73, nome: "Bloco de Notas “Portugal a Crescer” 14x21", preco: "8,00 €" },
  { id: 56, nome: "Caderno IL (Sebentas)", preco: "3,00 €" },
  { id: 54, nome: "Saco de pano Ecobag Institucional Azul", preco: "5,00 €" },
  { id: 44, nome: "Saco de pano Ecobag Institucional", preco: "5,00 €" },
  { id: 50, nome: "Bandeira, sem vara", preco: "5,00 €", nota: "60 × 100 cm" },
  { id: 48, nome: "Cantil Liberal", preco: "10,00 €" },
  { id: 45, nome: "Caneca", preco: "8,00 €" },
  { id: 43, nome: "Porta-Chaves", preco: "2,00 €" },
  { id: 8, nome: "Caneta", preco: "1,50 €" },
  {
    id: 9,
    nome: "Crachá IL",
    preco: "desde 0,50 €",
    tamanhos: ["Pequeno (0,50 €)", "Médio (1,50 €)"],
    nota: "Fundo branco, azul ou rosa: diz-nos qual na mensagem.",
  },
  { id: 6, nome: "Fitas de pescoço", preco: "3,00 €" },
];
