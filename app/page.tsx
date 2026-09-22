import Image from "next/image";
import Link from "next/link";
import InstagramImage from "@/components/InstagramImage";
import { links } from "@/lib/site";
import { ultimasPublicacoes } from "@/lib/publicacoes";

const principios = [
  {
    titulo: "Liberdade social, política e económica",
    texto: "Defendemos a liberdade de cada pessoa fazer as suas próprias escolhas.",
  },
  {
    titulo: "Igualdade de oportunidades",
    texto: "Um concelho onde as oportunidades são maximizadas para todos.",
  },
  {
    titulo: "Mais crescimento económico / menos impostos",
    texto:
      "Acreditamos que a livre iniciativa e a concorrência geram prosperidade e inovação para todos.",
  },
  {
    titulo: "Combate ao excesso do Estado e à burocracia",
    texto:
      "O Estado deve focar-se nas suas funções essenciais, deixando espaço para a sociedade civil florescer.",
  },
  {
    titulo: "Sustentabilidade e futuro",
    texto:
      "Melhorar o presente sem condicionar o futuro. Responsabilidade na gestão e na utilização de recursos.",
  },
  {
    titulo: "Sociedade civil forte",
    texto: "Onde a iniciativa é valorizada e incentivada.",
  },
];

const atalhos = [
  {
    titulo: "Agenda Liberal",
    texto: "Não percas os nossos eventos.",
    href: "/eventos",
    cta: "Ver agenda",
  },
  {
    titulo: "Conhece a equipa",
    texto: "As pessoas que dão a cara por uma Trofa mais livre.",
    href: "/trofa-liberal/equipa",
    cta: "Ver equipa",
  },
  {
    titulo: "Propostas",
    texto: "As medidas que fazem a diferença.",
    href: "/ideias",
    cta: "Ver propostas",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0088dc] via-[#0070cb] to-[#0056ae] text-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-pink/25 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.1fr_1fr]">
          <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/90">
            Núcleo territorial da Trofa
          </p>
          <h1 className="font-display mt-6 max-w-4xl text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl">
            Uma Trofa com mais <span className="text-sun">liberdade</span> começa aqui!
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-white/80 md:text-xl">
            Um concelho onde cada trofense pode viver de forma livre, com mais oportunidades e futuro.
          </p>
          <p className="font-display mt-4 text-xl font-bold text-sun">
            Somos a energia que a Trofa precisa!
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/trofa-liberal/faz-te-membro"
              className="rounded-full bg-pink px-8 py-3 font-bold text-white transition hover:bg-navy"
            >
              Faz-te Membro
            </Link>
            <Link
              href="/ideias"
              className="rounded-full border-2 border-white/40 px-8 py-3 font-bold transition hover:border-cyan hover:text-sun"
            >
              Ver propostas
            </Link>
          </div>
          </div>
          <Image
            src="/images/geral/bandeiras-no-ar.jpeg"
            alt="Liberais trofenses a agitar bandeiras da Iniciativa Liberal"
            width={626}
            height={782}
            priority
            sizes="(min-width: 1024px) 420px, 100vw"
            className="mx-auto max-h-[560px] w-auto max-w-full rounded-3xl object-cover shadow-2xl shadow-black/30 ring-4 ring-white/30"
          />
        </div>
      </section>

      <section className="bg-mist py-6 text-center">
        <p className="mx-auto max-w-3xl px-4 font-semibold text-navy">
          Bem-vindo à página oficial do núcleo territorial da Iniciativa Liberal da Trofa
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">
              No Instagram
            </p>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
              Últimas publicações
            </h2>
          </div>
          <a
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-cyan-dark hover:underline"
          >
            Ver mais no Instagram ↗
          </a>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {ultimasPublicacoes.map((p) => (
            <li key={p.id}>
              <InstagramImage
                src={`/images/instagram/${p.id}.jpg`}
                alt={p.alt}
                href={`https://www.instagram.com/p/${p.id}/`}
                w={p.w}
                h={p.h}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">
          Os nossos valores
        </p>
        <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
          O que defendemos?
        </h2>
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principios.map((p, i) => (
            <li
              key={p.titulo}
              className="group relative overflow-hidden rounded-2xl bg-navy p-8 text-white transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan/20"
            >
              <span
                aria-hidden
                className="font-display absolute -right-2 -top-4 text-8xl font-bold text-white/5 transition group-hover:text-sun/20"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-sm font-bold text-sun">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-3 text-2xl font-bold leading-tight">{p.titulo}</h3>
              <p className="mt-4 text-white/75">{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-navy-soft py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold">Acompanha o núcleo</h2>
            <p className="mt-3 text-white/75">Segue-nos nas redes sociais.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-white/30 px-6 py-2 font-bold transition hover:border-cyan hover:text-sun"
              >
                Facebook
              </a>
              <a
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-white/30 px-6 py-2 font-bold transition hover:border-cyan hover:text-sun"
              >
                Instagram
              </a>
            </div>
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold">Grupo de WhatsApp</h2>
            <p className="mt-3 text-white/75">
              Entra também no grupo de WhatsApp dos liberais trofenses.
            </p>
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-pink px-8 py-3 font-bold text-white transition hover:bg-navy"
            >
              Entrar no grupo
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <ul className="grid gap-6 md:grid-cols-3">
          {atalhos.map((a) => (
            <li key={a.titulo} className="rounded-2xl border-2 border-mist p-8 transition hover:border-cyan">
              <h3 className="font-display text-2xl font-bold text-navy">{a.titulo}</h3>
              <p className="mt-3 text-ink/75">{a.texto}</p>
              <Link href={a.href} className="mt-6 inline-block font-bold text-cyan-dark hover:underline">
                {a.cta} →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-sun py-16 text-navy">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 sm:px-6 md:grid-cols-[1fr_220px]">
          <div className="text-center md:text-left">
            <h2 className="font-display text-4xl font-bold md:text-5xl">Faz-te Membro</h2>
            <p className="mt-4 text-lg font-medium">
              Ajuda-nos a construir um futuro mais livre para a Trofa.
            </p>
            <Link
              href="/trofa-liberal/faz-te-membro"
              className="mt-8 inline-block rounded-full bg-navy px-8 py-3 font-bold text-white transition hover:bg-pink"
            >
              Quero fazer parte
            </Link>
          </div>
          <Image
            src="/images/geral/junta-te-onda-liberal.png"
            alt="Cartaz: Junta-te à onda liberal"
            width={288}
            height={358}
            className="mx-auto w-44 rounded-2xl shadow-xl md:w-full"
          />
        </div>
      </section>
    </>
  );
}
