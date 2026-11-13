import Image from "next/image";
import Link from "next/link";
import CartaoEvento from "@/components/CartaoEvento";
import { outros, proximos } from "@/lib/eventos";

// Agenda na página inicial. Mostra os próximos eventos quando os há (lib/eventos.ts) e, mesmo
// sem datas marcadas, os encontros do núcleo ao longo do ano, para a agenda nunca parecer vazia.
export default function AgendaInicio() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Agenda</p>
      <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Encontra-nos ao Vivo</h2>

      {proximos.length > 0 ? (
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {proximos.map((e) => (
            <CartaoEvento key={`${e.titulo}-${e.data}`} evento={e} />
          ))}
        </ul>
      ) : null}

      {proximos.length > 0 && <h3 className="font-display mt-12 text-2xl font-bold text-navy">Ao Longo do Ano</h3>}
      <ul className={`${proximos.length > 0 ? "mt-6" : "mt-8 sm:mt-10"} -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5 [&::-webkit-scrollbar]:hidden`}>
        {outros.map((o) => (
          <li key={o.titulo} className="w-[78%] shrink-0 snap-start overflow-hidden rounded-2xl border-2 border-mist transition hover:border-pink sm:w-auto">
            <div className="relative">
              <Image
                src={o.imagem}
                alt={o.titulo}
                width={480}
                height={320}
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                className="aspect-[3/2] w-full object-cover"
              />
              <span className="absolute left-3 top-3 bg-pink px-3 py-1 text-xs font-black uppercase tracking-wider text-sun">
                {o.quando.startsWith("Está") ? "Sem data fixa" : o.quando}
              </span>
            </div>
            <div className="p-5">
              <h4 className="font-display text-xl font-bold text-navy">{o.titulo}</h4>
              <p className="mt-2 text-sm text-ink/75">{o.texto}</p>
            </div>
          </li>
        ))}
      </ul>
      <Link href="/imprensa?t=eventos" className="mt-2 inline-block py-2 font-bold text-cyan-dark hover:underline sm:mt-6">
        Ver todos os eventos →
      </Link>
    </section>
  );
}
