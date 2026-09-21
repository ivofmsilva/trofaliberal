import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import MailForm from "@/components/MailForm";
import { links } from "@/lib/site";

export const metadata: Metadata = { title: "Contacta-nos — Iniciativa Liberal Trofa" };

const redes = [
  { label: "Facebook", href: links.facebook },
  { label: "Instagram", href: links.instagram },
  { label: "WhatsApp", href: links.whatsapp },
];

export default function Contactos() {
  return (
    <>
      <PageHero eyebrow="Contacta-nos" title="Liga-te ao Núcleo da Iniciativa Liberal da Trofa!">
        Queremos ouvir-te e partilhar a nossa visão. Envia-nos uma mensagem ou junta-te à conversa
        nas redes sociais.
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-2xl bg-navy p-8 text-white">
            <h2 className="font-display text-2xl font-bold">Email</h2>
            <a href={`mailto:${links.email}`} className="mt-3 inline-block font-bold text-sun hover:underline">
              {links.email}
            </a>
          </div>
          <div className="rounded-2xl bg-navy p-8 text-white">
            <h2 className="font-display text-2xl font-bold">WhatsApp</h2>
            <p className="mt-2 text-white/75">Junta-te ao nosso grupo e conversa connosco em tempo real.</p>
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-bold text-sun hover:underline"
            >
              Entrar no grupo →
            </a>
          </div>
          <div className="rounded-2xl bg-navy p-8 text-white">
            <h2 className="font-display text-2xl font-bold">Redes sociais</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {redes.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full border-2 border-white/30 px-5 py-2 text-sm font-bold transition hover:border-cyan hover:text-sun"
                  >
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-mist p-8">
          <MailForm
            to={links.email}
            subject="Contacto através do site"
            submitLabel="Enviar mensagem"
            fields={[
              { name: "nome", label: "Nome *", required: true },
              { name: "email", label: "Email *", type: "email", required: true },
              { name: "assunto", label: "Assunto" },
              { name: "mensagem", label: "Mensagem *", type: "textarea", required: true },
            ]}
          />
        </div>
      </section>
    </>
  );
}
