import type { NextConfig } from "next";

// Páginas que foram juntadas a outras: os endereços antigos continuam a funcionar.
const antigas: [string, string][] = [
  ["/trofa-liberal/equipa", "/trofa-liberal#equipa"],
  ["/trofa-liberal/juventude", "/trofa-liberal#juventude"],
  ["/trofa-liberal/faz-te-membro", "/participa?t=membro"],
  ["/trofa-liberal/contactos", "/participa?t=contactos"],
  ["/denuncia", "/participa?t=denuncia"],
  ["/ideias/sugestao", "/participa?t=ideia"],
  ["/eventos", "/imprensa?t=eventos"],
  ["/dados/taxas", "/dados/financas#taxas"],
  ["/dados/votos", "/dados/camara#como-votam"],
  ["/dados/orgaos", "/dados/camara#composicao"],
];

// Endereços curtos para cartazes e redes: cada subdomínio leva a uma página do site.
// O dados.trofaliberal.pt mantém o caminho (dados.trofaliberal.pt/financas → /dados/financas).
const SITE = "https://www.trofaliberal.pt";
const subdominios: { host: string; destino: string; mantemCaminho?: boolean }[] = [
  { host: "metro.trofaliberal.pt", destino: "/ideias/metro" },
  { host: "educacao.trofaliberal.pt", destino: "/ideias/educacao" },
  { host: "habitacao.trofaliberal.pt", destino: "/ideias/habitacao" },
  { host: "dados.trofaliberal.pt", destino: "/dados", mantemCaminho: true },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...subdominios.map(({ host, destino, mantemCaminho }) => ({
        source: "/:caminho*",
        has: [{ type: "host" as const, value: host }],
        destination: `${SITE}${destino}${mantemCaminho ? "/:caminho*" : ""}`,
        permanent: false,
      })),
      ...antigas.map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },
};

export default nextConfig;
