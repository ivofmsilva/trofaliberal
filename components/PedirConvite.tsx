import MailForm from "@/components/MailForm";
import { links } from "@/lib/site";

// Pedido de convite para o grupo de WhatsApp dos liberais trofenses.
// O link do grupo NÃO está no site: o núcleo recebe o pedido por email e envia o convite.
export default function PedirConvite() {
  return (
    <section id="whatsapp" className="scroll-mt-20 bg-mist py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">
            Comunidade no WhatsApp
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
            Queres fazer parte de uma comunidade de liberais trofenses?
          </h2>
          <p className="mt-6 text-lg text-ink/85">
            Pede convite e entra no nosso grupo de WhatsApp. Vais ficar a par dos factos, dar a tua
            opinião e contribuir para propostas liberais.
          </p>
          <p className="mt-4 text-ink/70">
            Deixa o teu nome e o teu número de telefone e nós enviamos-te o convite.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <MailForm
            to={links.email}
            subject="Pedido de convite — grupo de WhatsApp dos liberais trofenses"
            submitLabel="Pedir convite"
            consent="Autorizo o núcleo da Iniciativa Liberal da Trofa a usar o meu nome e o meu número de telefone apenas para me enviar o convite para o grupo de WhatsApp."
            fields={[
              { name: "nome", label: "Nome *", required: true },
              { name: "telefone", label: "Número de telefone *", type: "tel", required: true },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
