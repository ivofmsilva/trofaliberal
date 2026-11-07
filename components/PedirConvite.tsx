import Link from "next/link";

// Convite para o grupo de WhatsApp dos liberais trofenses.
// O link do grupo NÃO está no site: o pedido faz-se nos Contactos (Participa), por email.
export default function PedirConvite() {
  return (
    <section className="bg-mist py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Comunidade no WhatsApp</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">
            Queres fazer parte de uma comunidade de liberais trofenses?
          </h2>
          <p className="mt-4 text-lg text-ink/85">
            Pede convite e entra no nosso grupo de WhatsApp. Vais ficar a par dos factos, dar a tua opinião e
            contribuir para propostas liberais.
          </p>
        </div>
        <Link
          href="/participa?t=contactos"
          className="shrink-0 rounded-full bg-pink px-8 py-3 font-bold text-white transition hover:bg-navy"
        >
          Pedir convite →
        </Link>
      </div>
    </section>
  );
}
