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
];

const nextConfig: NextConfig = {
  async redirects() {
    return antigas.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
