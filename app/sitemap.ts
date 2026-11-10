import type { MetadataRoute } from "next";
import { autarquicasNav } from "@/lib/site";
import { siteUrl } from "@/lib/url";

const paginas = [
  "/",
  "/trofa-liberal",
  "/ideias",
  "/ideias/metro",
  "/ideias/educacao",
  "/ideias/habitacao",
  "/ideias/cartazes",
  "/dados",
  "/dados/contratos",
  "/dados/fundos-europeus",
  "/dados/camara",
  "/dados/assembleia",
  "/dados/contratos/ajustes-diretos",
  "/dados/taxas",
  "/dados/votos",
  "/dados/orgaos",
  "/dados/fontes",
  "/imprensa",
  "/imprensa/noticias",
  "/imprensa/comunicados",
  "/imprensa/comunicados/metro-ligeiro-ate-a-trofa",
  "/eventos/lit",
  "/eventos/aqui-ha-parlamento",
  "/participa",
  "/loja",
  "/loja/donativos",
  ...autarquicasNav.map((i) => i.href),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...new Set(paginas)].map((p) => ({ url: `${siteUrl}${p}`, lastModified: new Date() }));
}
