// Calculadora: para fazer as contas ao que se paga de IMI e de IRS municipal.
export function Calculadora() {
  const teclas = Array.from({ length: 12 }, (_, i) => i);
  return (
    <svg viewBox="0 0 220 280" role="img" aria-label="Uma calculadora com o símbolo do euro no visor" className="w-full max-w-[15rem]">
      <rect x="10" y="10" width="200" height="260" rx="26" fill="#ffffff" opacity="0.18" />
      <rect x="10" y="10" width="200" height="260" rx="26" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="3" />
      <rect x="32" y="34" width="156" height="58" rx="12" fill="#ffd500" />
      <text x="170" y="78" textAnchor="end" fontSize="38" fontWeight="800" fill="#00468a" fontFamily="sans-serif">
        €
      </text>
      {teclas.map((i) => {
        const col = i % 3;
        const lin = Math.floor(i / 3);
        const rosa = i === 11;
        return (
          <rect
            key={i}
            x={32 + col * 54}
            y={110 + lin * 40}
            width="44"
            height="30"
            rx="8"
            fill={rosa ? "#e6007e" : "#ffffff"}
            opacity={rosa ? 1 : 0.55}
          />
        );
      })}
    </svg>
  );
}

export default function HeroImpostos() {
  return (
    <section className="px-4 pt-6 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#0088dc] via-[#0070cb] to-[#0056ae] text-white shadow-xl">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-pink/25 blur-3xl" />
        <div className="relative grid items-center gap-10 px-8 py-14 md:grid-cols-[1.3fr_1fr] md:px-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/90 sm:text-sm">
              Iniciativa Liberal · Núcleo da Trofa · Fiscalidade
            </p>
            <h1 className="font-display mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Impostos
              <span className="block text-sun">na Trofa.</span>
            </h1>
            <p className="mt-6 text-lg font-medium italic text-white/90 md:text-xl">Menos impostos, mais liberdade.</p>
            <p className="mt-4 max-w-xl text-white/90">
              Quanto a Câmara cobra em impostos e taxas, quanto pagas tu de IMI e de IRS municipal e o que propomos.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contas" className="rounded-full bg-white px-7 py-3 font-bold text-[#00558f] transition hover:bg-sun">
                Faz as contas →
              </a>
              <a
                href="#propostas"
                className="rounded-full border-2 border-white/50 px-7 py-3 font-bold transition hover:border-sun hover:text-sun"
              >
                O que propomos
              </a>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <Calculadora />
          </div>
        </div>
      </div>
    </section>
  );
}
