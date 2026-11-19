import { areas } from "@/lib/propostas";

const pad = (n: number) => String(n).padStart(2, "0");

// As 10 áreas do programa autárquico de 2025, com as medidas de cada uma (abre-se uma a uma).
// Usado na página das Propostas e na do Programa eleitoral, para o texto ser o mesmo nas duas.
export default function PropostasTemas() {
  return (
    <>
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Propostas por temas</p>
      <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">10 áreas estratégicas de intervenção</h2>
      <p className="mt-4 max-w-3xl text-ink/80">
        Estas medidas vêm do programa com que nos apresentámos pela primeira vez a eleições autárquicas, em 2025.
        Juntam o que se pode fazer num mandato com uma visão de futuro para a Trofa: os novos equipamentos são
        objetivos de longo prazo para o concelho.
      </p>
      <ol className="mt-10 space-y-3">
        {areas.map((a, i) => (
          <li key={a.nome}>
            <details className="group rounded-2xl bg-white shadow-sm ring-1 ring-navy/5 open:shadow-lg">
              <summary className="flex cursor-pointer list-none items-center gap-5 p-6 [&::-webkit-details-marker]:hidden">
                <span className="font-display text-3xl font-bold text-sun">{pad(i + 1)}</span>
                <span className="flex-1">
                  <span className="font-display block text-xl font-bold text-navy">{a.nome}</span>
                  <span className="block text-sm text-ink/70">{a.lema}</span>
                </span>
                <span aria-hidden className="text-2xl font-bold text-navy transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <ul className="space-y-2 border-t-2 border-mist px-6 py-5 pl-20">
                {a.medidas.map((m) => (
                  <li key={m} className="list-disc text-ink/85 marker:text-sun">
                    {m}
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ol>
    </>
  );
}
