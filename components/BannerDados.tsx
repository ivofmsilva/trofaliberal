import { links } from "@/lib/site";

// Gráfico simples e decorativo: barras a subir com uma linha por cima.
function Grafico() {
  const alturas = [34, 52, 44, 70, 62, 88, 78, 104];
  return (
    <svg viewBox="0 0 320 140" aria-hidden className="w-full max-w-[180px] sm:max-w-xs">
      {alturas.map((h, i) => (
        <rect
          key={i}
          x={8 + i * 38}
          y={130 - h}
          width="26"
          height={h}
          rx="4"
          fill={i === alturas.length - 1 ? "#ffd500" : "#ffffff"}
          opacity={i === alturas.length - 1 ? 1 : 0.25 + i * 0.07}
        />
      ))}
      <polyline
        points={alturas.map((h, i) => `${21 + i * 38},${122 - h}`).join(" ")}
        fill="none"
        stroke="#e6007e"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Portal de dados abertos da Trofa, no mesmo estilo dos outros banners da página inicial.
// O cartaz inteiro é uma ligação para o portal (noutro separador).
export default function BannerDados() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <a
        href={links.dados}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Dados da Trofa: a Trofa em números. Abrir o portal de dados"
        className="group grid overflow-hidden rounded-3xl bg-[#0e82da] text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl md:grid-cols-[1.05fr_1fr]"
      >
        <div className="relative flex flex-col items-start gap-3 px-6 py-6 sm:px-8 md:gap-5 md:px-12 md:py-12">
          <span className="-skew-x-12 bg-pink px-6 py-1.5">
            <span className="block skew-x-12 text-lg font-black uppercase italic tracking-[0.32em] text-sun">
              Trofa
            </span>
          </span>
          <p className="font-display text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-7xl">
            A Trofa
            <span className="block text-sun">em números</span>
          </p>
          <p className="max-w-md text-lg font-bold leading-snug sm:text-xl md:text-2xl">
            Os dados oficiais do concelho, abertos a todos.
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-4 pt-2 md:pt-4">
            <span className="rounded-full bg-sun px-6 py-3 font-bold text-navy transition group-hover:bg-white">
              Ver os dados ↗
            </span>
            <p className="font-display hidden text-lg font-black uppercase leading-tight sm:block">Dados da Trofa</p>
          </div>
        </div>

        <div className="order-first flex flex-col justify-between gap-5 bg-[#0a4fa0] px-6 py-5 sm:px-8 md:order-none md:gap-8 md:px-10 md:py-12">
          <div className="flex justify-center">
            <Grafico />
          </div>
          <div className="hidden flex-row flex-wrap items-center gap-2 sm:flex">
            {["Demografia", "Economia", "Contratos públicos", "Orçamento municipal"].map((t) => (
              <span key={t} className="bg-pink px-3 py-1 text-base font-black uppercase text-sun sm:px-3.5 sm:py-1.5 sm:text-lg">
                {t}
              </span>
            ))}
          </div>
        </div>
      </a>
    </section>
  );
}
