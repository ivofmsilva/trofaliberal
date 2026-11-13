import Image from "next/image";
import type { Evento } from "@/lib/eventos";

// Cartão de um próximo evento (agenda da página inicial e página de eventos).
// Com cartaz, o cartão fica mais largo: o cartaz à esquerda (em cima, no telemóvel) e o texto ao lado.
export default function CartaoEvento({ evento: e }: { evento: Evento }) {
  const texto = (
    <div className="flex flex-col justify-center p-6 sm:p-8">
      <p className="text-sm font-bold uppercase tracking-widest text-sun">{e.data}</p>
      <h3 className="font-display mt-2 text-2xl font-bold">{e.titulo}</h3>
      {e.local && <p className="mt-2 text-white/80">{e.local}</p>}
      {e.texto && <p className="mt-3 text-white/80">{e.texto}</p>}
      {e.href && (
        <a href={e.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-bold text-sun hover:underline">
          Mais informação ↗
        </a>
      )}
    </div>
  );

  if (!e.imagem) return <li className="rounded-2xl bg-navy text-white">{texto}</li>;

  return (
    <li className="overflow-hidden rounded-2xl bg-navy text-white sm:grid sm:grid-cols-[240px_1fr] md:col-span-2">
      <a href={e.imagem} target="_blank" rel="noopener noreferrer" aria-label={`Abrir o cartaz: ${e.titulo}`}>
        <Image
          src={e.imagem}
          alt={`Cartaz: ${e.titulo}, ${e.data}`}
          width={1080}
          height={1440}
          sizes="(min-width: 640px) 240px, 100vw"
          className="aspect-[3/4] w-full object-cover"
        />
      </a>
      {texto}
    </li>
  );
}
