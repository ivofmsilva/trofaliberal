import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { hino } from "@/lib/autarquicas";
import { autarquicasNav, links } from "@/lib/site";

export const metadata: Metadata = { title: "Autárquicas 2025 — Iniciativa Liberal Trofa" };

const descricoes: Record<string, string> = {
  "/autarquicas-2025/programa": "O programa para o concelho e os das freguesias de Alvarelhos e Bougado.",
  "/autarquicas-2025/candidatos": "Quem se candidatou pela Iniciativa Liberal na Trofa.",
  "/autarquicas-2025/apresentacao-candidatura": "Vídeos e imagens da apresentação da candidatura.",
  "/autarquicas-2025/apresentacao-programa": "Fotos e vídeo da apresentação do programa eleitoral.",
  "/autarquicas-2025/diario": "Os 10 dias oficiais de campanha, um tema do programa em cada dia.",
  "/autarquicas-2025/brochuras": "As brochuras da campanha Trofa Para Cima.",
};

export default function Autarquicas() {
  return (
    <>
      <PageHero
        eyebrow="Autárquicas 2025"
        title="Trofa Para Cima!"
        image={{ src: "/images/geral/outdoor-campanha.jpg", alt: "Outdoor da campanha Trofa Para Cima", w: 1440, h: 960 }}
      >
        <p>
          A Trofa, tantas vezes referida como um diamante em bruto, é um concelho com enorme
          potencial económico, social e cultural — um potencial que continua sistematicamente
          desaproveitado.
        </p>
        <a
          href={hino}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-pink px-7 py-3 font-bold text-white transition hover:bg-navy"
        >
          Ouvir o hino de campanha ↗
        </a>
      </PageHero>

      <section className="mx-auto max-w-3xl space-y-5 px-4 py-20 text-lg text-ink/85 sm:px-6">
        <p>
          Localizada no coração de uma das zonas mais dinâmicas e exportadoras do país, a Trofa tem
          tudo para ser uma referência no desenvolvimento regional, mas precisa de liderança, visão
          e coragem para romper com o conformismo.
        </p>
        <p>
          A Iniciativa Liberal acredita numa Trofa mais livre, mais eficiente, mais próxima dos
          cidadãos, mais atrativa para famílias e empresas, e mais preparada para o futuro. Com mais
          oportunidades para todos, melhor qualidade de vida e onde o poder público serve e não
          atrapalha.
        </p>
        <p className="font-display text-2xl font-bold text-navy">
          Está na hora de libertar o potencial da Trofa. Está na hora de colocar a Trofa para cima.
        </p>
      </section>

      <section className="bg-mist py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-4xl font-bold text-navy md:text-5xl">Explora a campanha</h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {autarquicasNav.slice(1).map((i, n) => (
              <li key={i.href}>
                <Link
                  href={i.href}
                  className="group block h-full rounded-2xl bg-navy p-8 text-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/30"
                >
                  <span className="font-display text-sm font-bold text-sun">{String(n + 1).padStart(2, "0")}</span>
                  <h3 className="font-display mt-3 text-2xl font-bold leading-tight">{i.label}</h3>
                  <p className="mt-3 text-white/80">{descricoes[i.href]}</p>
                  <span className="mt-5 inline-block font-bold text-sun group-hover:underline">Abrir →</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-sun py-16 text-center text-navy">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-display text-4xl font-bold">Junta-te ao movimento liberal</h2>
          <p className="mt-3 text-lg font-medium">
            Estas propostas só se tornam realidade com o teu apoio. Vem fazer parte da mudança que a
            Trofa precisa.
          </p>
          <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-full bg-navy px-8 py-3 font-bold text-white transition hover:bg-pink">
            Aderir agora
          </a>
        </div>
      </section>
    </>
  );
}
