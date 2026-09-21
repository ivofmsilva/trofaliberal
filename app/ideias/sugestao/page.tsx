import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import MailForm from "@/components/MailForm";
import { areas } from "@/lib/propostas";
import { links } from "@/lib/site";

export const metadata: Metadata = { title: "Tens uma ideia? — Iniciativa Liberal Trofa" };

export default function Sugestao() {
  return (
    <>
      <PageHero eyebrow="Ideias · Tens uma ideia?" title="Partilha a tua ideia connosco" image={{ src: "/images/geral/sugestao-evento.jpeg", alt: "Evento da IL Trofa ao ar livre", w: 614, h: 921 }}>
        As melhores propostas nascem de quem vive a Trofa todos os dias. Conta-nos a tua.
      </PageHero>

      <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
        <div className="rounded-2xl border-2 border-mist p-8">
          <MailForm
            to={links.email}
            subject="Ideia para a Trofa"
            submitLabel="Enviar ideia"
            fields={[
              { name: "nome", label: "Nome *", required: true },
              { name: "email", label: "Email *", type: "email", required: true },
              {
                name: "tema",
                label: "Tema",
                type: "select",
                options: [...areas.map((a) => a.nome), "Outro"],
              },
              { name: "ideia", label: "A tua ideia *", type: "textarea", required: true },
            ]}
          />
        </div>
      </section>
    </>
  );
}
