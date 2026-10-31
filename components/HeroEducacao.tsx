import Link from "next/link";

// Degraus a subir: a Trofa para cima, até ao topo.
function Degraus() {
  const alturas = [28, 44, 60, 76, 92];
  return (
    <svg viewBox="0 0 300 130" role="img" aria-label="Cinco degraus a subir, com uma bandeira no topo" className="w-full max-w-sm">
      {alturas.map((h, i) => (
        <rect
          key={h}
          x={i * 60}
          y={130 - h}
          width="56"
          height={h}
          rx="6"
          fill={i === alturas.length - 1 ? "#ffd500" : "#ffffff"}
          opacity={i === alturas.length - 1 ? 1 : 0.2 + i * 0.12}
        />
      ))}
      <line x1="270" y1="38" x2="270" y2="2" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      <path d="M270 2 L296 10 L270 18 Z" fill="#e6007e" />
    </svg>
  );
}

export default function HeroEducacao({ locais, nacionais }: { locais: number; nacionais: number }) {
  return (
    <section className="px-4 pt-6 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#0088dc] via-[#0070cb] to-[#0056ae] text-white shadow-xl">
        <span
          aria-hidden
          className="font-display pointer-events-none absolute -right-4 -top-6 select-none text-[11rem] font-bold leading-none text-white/[0.07] sm:text-[15rem] md:text-[20rem]"
        >
          114.º
        </span>
        <div className="relative grid items-end gap-8 px-8 pb-14 pt-14 md:grid-cols-[1.2fr_1fr] md:px-16">
          <div className="self-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/85 sm:text-sm">
              Iniciativa Liberal · Núcleo da Trofa · Manifesto pela Educação
            </p>
            <h1 className="font-display mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              A Trofa no topo
              <span className="block text-sun">da Educação.</span>
            </h1>
            <p className="mt-6 text-lg font-medium italic text-white/90 md:text-xl">
              Liberdade para aprender, autonomia para crescer.
            </p>
            <p className="mt-4 max-w-xl text-white/85">
              {locais + nacionais} propostas saídas das Jornadas Liberais da Trofa: {locais} para fazer na Trofa e{" "}
              {nacionais} para exigir ao Governo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#propostas"
                className="rounded-full bg-white px-7 py-3 font-bold text-[#00558f] transition hover:bg-sun"
              >
                Ver as propostas →
              </a>
              <Link
                href="/eventos/lit"
                className="rounded-full border-2 border-white/50 px-7 py-3 font-bold transition hover:border-sun hover:text-sun"
              >
                As Jornadas Liberais
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <Degraus />
          </div>
        </div>
      </div>
    </section>
  );
}
