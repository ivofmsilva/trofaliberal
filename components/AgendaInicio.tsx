import Link from "next/link";
import CartaoEvento from "@/components/CartaoEvento";
import { DadosEventos } from "@/components/DadosEstruturados";
import { agendados } from "@/lib/eventos";

// Agenda na página inicial: só os próximos eventos (lib/eventos.ts) e a ligação para a página dos eventos, onde estão
// também os encontros que o núcleo faz ao longo do ano. Sem eventos marcados, fica uma frase curta com essa ligação.
export default function AgendaInicio() {
  const proximos = agendados();
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
      <DadosEventos />
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Agenda</p>
      <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Encontra-nos ao vivo</h2>

      {proximos.length > 0 ? (
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {proximos.map((e) => (
            <CartaoEvento key={`${e.titulo}-${e.data}`} evento={e} />
          ))}
        </ul>
      ) : (
        <p className="mt-6 max-w-xl text-lg text-ink/75">Sem eventos marcados de momento. Vê os encontros que fazemos ao longo do ano.</p>
      )}

      <Link href="/imprensa?t=eventos" className="mt-4 inline-block py-2 font-bold text-cyan-dark hover:underline sm:mt-6">
        Ver todos os eventos →
      </Link>
    </section>
  );
}
