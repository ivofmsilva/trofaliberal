import Link from "next/link";

// Elétrico de metro ligeiro (articulado, com pantógrafo), desenhado em SVG: ilustração própria.
// As rodas ficam escondidas sob as saias, como num metro ligeiro.
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
      <path d="M118 50 L150 26 L186 26 L218 50" fill="none" stroke="#5d6f7e" strokeWidth="4" strokeLinejoin="round" />
      <rect x="138" y="21" width="60" height="5" rx="2" fill="#3b4b58" />

      {/* módulo traseiro */}
      <path d="M30 76 Q30 50 58 50 H296 V164 H48 Q30 164 30 146 Z" fill="url(#corpo)" />
      {/* módulo da frente */}
      <path d="M326 50 H498 Q556 54 586 100 L596 142 Q598 164 580 164 H326 Z" fill="url(#corpo)" />
      {/* tetos */}
      <path d="M30 76 Q30 50 58 50 H296 V64 H30 Z" fill="#b4c2ce" />
      <path d="M326 50 H498 Q528 52 546 66 H326 Z" fill="#b4c2ce" />

      {/* articulação */}
      <rect x="294" y="52" width="34" height="112" rx="5" fill="#44525e" />
      {[300, 306, 312, 318, 324].map((x) => (
        <line key={x} x1={x} y1="56" x2={x} y2="160" stroke="#2c3842" strokeWidth="2" />
      ))}

      {/* janelas */}
      {[50, 114, 244, 340, 398].map((x) => (
        <rect key={x} x={x} y="72" width={x === 244 ? 46 : 52} height="40" rx="6" fill="url(#vidro)" />
      ))}
      {/* portas */}
      {[176, 456].map((x) => (
        <g key={x}>
          <rect x={x} y="68" width="48" height="86" rx="6" fill="#e9eff4" stroke="#9fb0bf" strokeWidth="2" />
          <rect x={x + 4} y="72" width="18" height="66" rx="4" fill="url(#vidro)" />
          <rect x={x + 26} y="72" width="18" height="66" rx="4" fill="url(#vidro)" />
        </g>
      ))}
      {/* cabine */}
      <path d="M508 70 H556 Q574 86 584 112 H508 Z" fill="url(#vidro)" />
      <path d="M514 76 H548 L560 96 H514 Z" fill="#ffffff" opacity="0.12" />
      {/* destino */}
      <rect x="520" y="55" width="46" height="11" rx="3" fill="#0c2b45" />
      <text x="543" y="64" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffd500" fontFamily="Arial, sans-serif">
        TROFA
      </text>

      {/* faixa azul e linha amarela */}
      <path d="M30 122 H326 V134 H30 Z" fill="#00abe4" />
      <path d="M326 122 H590 L594 134 H326 Z" fill="#00abe4" />
      <rect x="30" y="135" width="296" height="3" fill="#ffd500" />
      <rect x="326" y="135" width="269" height="3" fill="#ffd500" />

      {/* farol */}
      <circle cx="587" cy="128" r="4" fill="#fff6b0" />

      {/* saias: escondem as rodas */}
      <path d="M44 146 H290 V176 H62 Q44 176 44 160 Z" fill="#6f808e" />
      <path d="M332 146 H574 V160 Q574 176 556 176 H332 Z" fill="#6f808e" />
      <rect x="44" y="146" width="246" height="4" fill="#8696a3" />
      <rect x="332" y="146" width="242" height="4" fill="#8696a3" />
    </svg>
  );
}

export default function HeroMetro() {
  return (
    <section className="px-4 pt-6 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#0088dc] via-[#0070cb] to-[#0056ae] text-white shadow-xl">
        {/* "9000" em marca de água, atrás do elétrico */}
        <span
          aria-hidden
          className="font-display pointer-events-none absolute -right-4 -top-6 select-none text-[11rem] font-bold leading-none text-white/[0.07] sm:text-[15rem] md:text-[20rem]"
        >
          9000
        </span>

        {/* a velha linha do comboio: balastro, travessas e carris onde o metro nunca chegou */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-9 bg-[#003e7a]/60 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.18)_0_10px,transparent_10px_34px)]"
        >
          <div className="absolute inset-x-0 top-0 h-[5px] bg-white/80" />
          <div className="absolute inset-x-0 top-[14px] h-[5px] bg-white/45" />
        </div>

        <div className="relative grid items-end gap-6 px-8 pb-16 pt-14 md:grid-cols-[1fr_1.1fr] md:px-16">
          <div className="self-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/85 sm:text-sm">
              Iniciativa Liberal · Núcleo da Trofa · Mobilidade
            </p>
            <h1 className="font-display mt-5 text-3xl font-bold leading-[1.08] sm:text-4xl lg:text-5xl">
              Esperámos mais de 9000 dias.
              <span className="mt-2 block text-sun">A Trofa merece o metro, não um transbordo.</span>
            </h1>
            <p className="mt-6 text-lg font-medium italic text-white/90 md:text-xl">
              Metro ligeiro até à Trofa. Pela Trofa. Pelo futuro.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#participacao"
                className="rounded-full bg-white px-7 py-3 font-bold text-[#00558f] transition hover:bg-sun"
              >
                A nossa participação →
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
