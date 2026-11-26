import type { MetadataRoute } from "next";
import { candidatos, diario } from "@/lib/autarquicas";
import { comPaginaPropria } from "@/lib/comemoracoes";
import { indicadores } from "@/lib/dados/dados";
import { autarquicasNav } from "@/lib/site";
import { siteUrl } from "@/lib/url";

const paginas = [
  "/",
  "/trofa-liberal",
  "/ideias",
  "/ideias/metro",
  "/ideias/educacao",
  "/ideias/habitacao",
  "/ideias/impostos",
  "/ideias/cartazes",
  "/dados",
  "/dados/indicadores",
  "/dados/contratos",
  "/dados/fundos-europeus",
  "/dados/fundos-europeus/concelho",
  "/dados/fundos-europeus/municipio",
  "/dados/camara",
  "/dados/assembleia",
  "/dados/atas",
  "/dados/contratos/ajustes-diretos",
  "/dados/financas",
  "/dados/fontes",
  "/imprensa",
  "/imprensa/noticias",
  "/imprensa/artigos",
  "/imprensa/comunicados",
  "/imprensa/comunicados/metro-ligeiro-ate-a-trofa",
  "/eventos/lit",
  "/dia-do-concelho",
  "/25-de-novembro",
  "/datas",
  "/festas-da-nossa-terra",
  "/a-nossa-historia",
  ...comPaginaPropria.map((c) => c.data.slug),
  "/eventos/aqui-ha-parlamento",
  "/participa",
  "/loja",
  "/loja/donativos",
  "/privacidade",
  ...autarquicasNav.map((i) => i.href),
  // páginas geradas a partir dos dados: os candidatos, os dias do diário da campanha e cada indicador
  ...candidatos.map((c) => `/autarquicas-2025/candidatos/${c.slug}`),
  ...diario.map((d) => `/autarquicas-2025/diario/${d.dia}`),
  ...indicadores.map((i) => `/dados/indicadores/${i.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...new Set(paginas)].map((p) => ({ url: `${siteUrl}${p}`, lastModified: new Date() }));
}
