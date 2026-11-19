import { agendados } from "@/lib/eventos";
import { links } from "@/lib/site";
import { siteUrl } from "@/lib/url";

// Fichas "para máquinas" (schema.org, JSON-LD): dizem ao Google quem somos e que eventos temos.
// Não se veem na página. Os eventos só entram quando têm `inicio` em lib/eventos.ts.
const nucleo = {
  "@type": "Organization",
  "@id": `${siteUrl}/#nucleo`,
  name: "Iniciativa Liberal Trofa",
  alternateName: ["IL Trofa", "Trofa Liberal", "Núcleo Territorial da Trofa da Iniciativa Liberal"],
  description: "Núcleo territorial da Iniciativa Liberal no concelho da Trofa.",
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
  email: links.email,
  sameAs: [links.facebook, links.instagram],
  areaServed: { "@type": "AdministrativeArea", name: "Trofa, Portugal" },
  parentOrganization: { "@type": "PoliticalParty", name: "Iniciativa Liberal", url: "https://iniciativaliberal.pt" },
};

function json(dados: object) {
  // "<" escapado para o texto nunca fechar a etiqueta <script>.
  return { __html: JSON.stringify(dados).replace(/</g, "\\u003c") };
}

export function DadosNucleo() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={json({ "@context": "https://schema.org", ...nucleo })} />;
}

export function DadosEventos() {
  const eventos = agendados()
    .filter((e) => e.inicio)
    .map((e) => ({
      "@type": "Event",
      name: e.titulo,
      startDate: e.inicio,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      ...(e.texto ? { description: e.texto } : {}),
      ...(e.imagem ? { image: [`${siteUrl}${e.imagem}`] } : {}),
      ...(e.local
        ? {
            location: {
              "@type": "Place",
              name: e.local.split(",")[0].trim(),
              address: { "@type": "PostalAddress", addressLocality: e.local.split(",").slice(1).join(",").trim() || e.local, addressCountry: "PT" },
            },
          }
        : {}),
      organizer: { "@id": `${siteUrl}/#nucleo`, name: nucleo.name, url: siteUrl },
    }));
  if (!eventos.length) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={json({ "@context": "https://schema.org", "@graph": eventos })} />;
}
