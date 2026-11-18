// "Rostos Liberais Trofenses": frases de membros, dos cartazes publicados no Instagram do núcleo (janeiro de 2022).
// As imagens estão em public/images/rostos (quadradas, com o mesmo azul dos cartazes).
// Ficam de fora, por serem da campanha das legislativas de 2022: José Pedro Reis (TAP) e Afonso Couto (voto útil);
// as imagens deles estão na pasta, basta acrescentá-los aqui.
export type Rosto = { nome: string; foto: string; frase: string };

export const rostos: Rosto[] = [
  {
    nome: "Duarte Lourenço",
    foto: "/images/rostos/duarte-lourenco.webp",
    frase: "Não quero viver noutro país. Quero viver noutro Portugal. Só com a Iniciativa Liberal podemos mudar o destino dos nossos jovens.",
  },
  {
    nome: "Diamantino Costa",
    foto: "/images/rostos/diamantino-costa.webp",
    frase:
      "Os impostos devem baixar, devem ser simplificados e descomplicados, para que estorvem menos o trabalho, o consumo, a poupança, o investimento, as contas e transações pessoais e comerciais.",
  },
  {
    nome: "Ruben Reis",
    foto: "/images/rostos/ruben-reis.webp",
    frase:
      "Mais liberdade de escolha na educação e um sistema de saúde que funcione quando é preciso. Portugal mais próspero, mais justo, mais liberal.",
  },
  {
    nome: "Carlos Dias",
    foto: "/images/rostos/carlos-dias.webp",
    frase:
      "Queremos um país que potencia a liberdade e a autorrealização, um Estado que, além de apoiar quem precisa, permite uma melhor integração e mais oportunidades para todos.",
  },
  {
    nome: "José Eduardo Brás",
    foto: "/images/rostos/jose-eduardo-bras.webp",
    frase:
      "Temos de acabar com esta cultura de cunhas e nepotismo, tornar os processos transparentes e promover o mérito como meio para se atingir a excelência. Só com a IL conseguimos este rigor.",
  },
  {
    nome: "Daniel Silva",
    foto: "/images/rostos/daniel-silva.webp",
    frase:
      "Só com liberdade alcançamos a nossa felicidade. Estamos fartos de restrições e imposições. Com a Iniciativa Liberal a liberdade não é posta em causa.",
  },
  {
    nome: "Gaspar Azevedo",
    foto: "/images/rostos/gaspar-azevedo.webp",
    frase:
      "Vais continuar a deixar a “bola” entrar e ficarmos para trás? Na Iniciativa Liberal defendemos os portugueses e atacamos a estagnação.",
  },
  {
    nome: "Ivo Silva",
    foto: "/images/rostos/ivo-silva.webp",
    frase:
      "A Iniciativa Liberal é um partido moderno e inovador, bem estruturado, que ao contrário de outros não se encontra em guerras internas ou desorientação, e que está preparado para os desafios que vão surgir em Portugal.",
  },
];
