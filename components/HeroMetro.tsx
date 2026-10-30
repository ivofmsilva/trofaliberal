import Link from "next/link";

// Elétrico de metro ligeiro, desenhado à mão em SVG (ilustração própria).
function Eletrico() {
  return (
    <svg
      viewBox="0 0 620 190"
      role="img"
      aria-label="Elétrico de metro ligeiro com destino à Trofa"
      className="w-full drop-shadow-[0_18px_18px_rgba(0,30,70,0.35)]"
    >
      <defs>
        <linearGradient id="corpo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#cdd7e0" />
        </linearGradient>
        <linearGradient id="vidro" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d5f8f" />
          <stop offset="1" stopColor="#0c2b45" />
        </linearGradient>
      </defs>

      {/* pantógrafo */}
      <path d="M250 46 L282 24 L318 24 L350 46" fill="none" stroke="#5d6f7e" strokeWidth="4" strokeLinejoin="round" />
      <rect x="270" y="20" width="60" height="5" rx="2" fill="#3b4b58" />

      {/* carroçaria */}
      <path
        d="M30 72 Q30 46 58 46 H498 Q556 50 586 98 L596 138 Q598 156 580 156 H48 Q30 156 30 138 Z"
        fill="url(#corpo)"
      />
      {/* teto */}
      <path d="M30 72 Q30 46 58 46 H498 Q528 48 546 62 H30 Z" fill="#b4c2ce" />

      {/* janelas */}
      {[50, 116, 246, 312, 378].map((x) => (
        <rect key={x} x={x} y="68" width="58" height="40" rx="6" fill="url(#vidro)" />
      ))}
      {/* portas */}
      {[188, 446].map((x) => (
        <g key={x}>
          <rect x={x} y="64" width="46" height="82" rx="6" fill="#e9eff4" stroke="#9fb0bf" strokeWidth="2" />
          <rect x={x + 4} y="68" width="17" height="64" rx="4" fill="url(#vidro)" />
          <rect x={x + 25} y="68" width="17" height="64" rx="4" fill="url(#vidro)" />
        </g>
      ))}
      {/* cabine */}
      <path d="M506 66 H556 Q574 82 584 108 H506 Z" fill="url(#vidro)" />
      <path d="M512 72 H548 L560 92 H512 Z" fill="#ffffff" opacity="0.12" />
      {/* destino */}
      <rect x="518" y="52" width="46" height="11" rx="3" fill="#0c2b45" />
      <text x="541" y="61" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffd500" fontFamily="Arial, sans-serif">
        TROFA
      </text>

      {/* faixa azul e linha amarela */}
      <path d="M30 118 H590 L593 130 H30 Z" fill="#00abe4" />
      <rect x="30" y="131" width="565" height="3" fill="#ffd500" />

      {/* farol */}
      <circle cx="586" cy="124" r="4" fill="#fff6b0" />

      {/* saia e rodas */}
      <rect x="44" y="142" width="536" height="13" rx="4" fill="#6f808e" />
      {[118, 198, 402, 482].map((x) => (
        <g key={x}>
          <circle cx={x} cy="160" r="15" fill="#25343f" />
          <circle cx={x} cy="160" r="5.5" fill="#8fa0ad" />
        </g>
      ))}
    </svg>
  );
}

export default function HeroMetro() {
  return (
    <section className="px-4 pt-6 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#0088dc] via-[#0070cb] to-[#0056ae] text-white shadow-xl">
        {/* linha de metro a contornar o cartão */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-9 left-8 right-8 top-12 rounded-br-[56px] border-b-[7px] border-r-[7px] border-sun"
        />
        <span
          aria-hidden
          className="absolute bottom-[39px] left-8 h-7 w-7 -translate-x-1/2 translate-y-1/2 rounded-full border-[6px] border-[#003e7a] bg-white"
        />
        <span
          aria-hidden
          className="absolute right-[35px] top-12 h-7 w-7 translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] border-[#003e7a] bg-white"
        />

        <div className="relative grid items-end gap-6 px-12 pb-16 pt-14 md:grid-cols-[1fr_1.1fr] md:px-16">
          <div className="self-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/85 sm:text-sm">
              Iniciativa Liberal · Núcleo da Trofa · Mobilidade
            </p>
            <h1 className="font-display mt-5 text-3xl font-bold leading-[1.08] sm:text-4xl lg:text-5xl">
              Esperámos mais de 9000 dias.
              <span className="mt-2 block text-sun">A Trofa merece metro, não transbordo.</span>
            </h1>
            <p className="mt-6 text-lg font-medium italic text-white/90 md:text-xl">
              Metro ligeiro até à Trofa. Pela Trofa. Pelo futuro.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#posicao"
                className="rounded-full bg-white px-7 py-3 font-bold text-[#00558f] transition hover:bg-sun"
              >
                A nossa posição →
              </a>
              <Link
                href="/imprensa/comunicados/metro-ligeiro-ate-a-trofa"
                className="rounded-full border-2 border-white/50 px-7 py-3 font-bold transition hover:border-sun hover:text-sun"
              >
                Ler o comunicado
              </Link>
            </div>
          </div>
          <div className="-mb-[2.15rem] md:-ml-16">
            <Eletrico />
          </div>
        </div>
      </div>
    </section>
  );
}
