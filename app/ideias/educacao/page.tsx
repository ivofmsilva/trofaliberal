import type { Metadata } from "next";
import Link from "next/link";
import Galeria from "@/components/Galeria";
import HeroEducacao from "@/components/HeroEducacao";
import ItemCard from "@/components/ItemCard";
import PartilharBotao from "@/components/PartilharBotao";
import PropostasEducacao from "@/components/PropostasEducacao";
import { eixos, fotosJornadas, numeros, propostas } from "@/lib/educacao";
import { itens } from "@/lib/imprensa";

export const metadata: Metadata = {
  title: "Trofa no topo da Educação — Iniciativa Liberal Trofa",
  description: "Manifesto pela Educação: liberdade para aprender, autonomia para crescer.",
};

const etiqueta = "text-sm font-bold uppercase tracking-[0.25em]";

const principios = [
  {
    titulo: "Autonomia para as escolas",
    texto: "Menos tutela burocrática e mais responsabilidade local, porque as decisões não devem vir todas de Lisboa.",
  },
  {
    titulo: "Liberdade de escolha",
    texto: "Famílias informadas e projetos pedagógicos diversos, para que escolher não seja um privilégio de quem já sabe.",
  },
  {
    titulo: "Sociedade civil na educação",
    texto: "Abertura, cooperação e criatividade em vez de controlo e despesa sem fim.",
  },
  {
    titulo: "Mérito e apoio certo",
    texto:
      "Apoio social onde é preciso, temporário, bem direcionado e com resultados medidos, para que todos possam aprender e crescer.",
  },
];

const imprensaJornadas = itens.noticias.filter((n) => n.data?.startsWith("2026-03"));
const locais = propostas.filter((p) => eixos.find((e) => e.n === p.eixo)?.ambito === "local").length;
const nacionais = propostas.length - locais;

export default function Educacao() {
  return (
    <>
      <HeroEducacao locais={locais} nacionais={nacionais} />

      {/* Números */}
      <section className="mt-6 bg-mist py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className={`${etiqueta} text-cyan-dark`}>Onde estamos</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">
            Para chegar ao topo, é preciso saber de onde partimos
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {numeros.map((n) => (
              <li key={n.valor} className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="font-display text-5xl font-bold text-pink">{n.valor}</p>
                <p className="mt-3 font-bold leading-snug text-navy">{n.legenda}</p>
                <p className="mt-3 text-xs text-ink/60">{n.fonte}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* A abordagem liberal */}
      <section className="bg-navy py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className={`${etiqueta} text-sun`}>A nossa abordagem</p>
          <h2 className="font-display mt-3 text-4xl font-bold md:text-5xl">
            A educação é a chave de uma sociedade livre, exigente e próspera
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-white/85">
            Durante demasiado tempo, governos e autarquias trataram a educação como um sistema fechado e
            centralizado, onde as famílias têm pouca escolha, as escolas pouca autonomia e os alunos pouca
            margem para desenvolver o seu potencial. Na Trofa queremos mudar este cenário.
          </p>
          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {principios.map((p, i) => (
              <li key={p.titulo} className="rounded-2xl bg-navy-soft p-8">
                <span className="font-display text-sm font-bold text-sun">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display mt-2 text-2xl font-bold leading-tight">{p.titulo}</h3>
                <p className="mt-3 text-white/85">{p.texto}</p>
              </li>
            ))}
          </ol>
          <figure className="mt-10 max-w-3xl rounded-2xl border-l-8 border-pink bg-white p-6 text-navy md:p-8">
            <blockquote className="font-display text-lg font-bold leading-snug md:text-xl">
              “É tempo de dar um novo rumo à educação na Trofa: mais exigente, mais livre, mais próxima das
              pessoas.”
            </blockquote>
          </figure>
        </div>
      </section>

      {/* Propostas */}
      <section id="propostas" className="mx-auto max-w-5xl scroll-mt-24 px-4 py-20 sm:px-6">
        <p className={`${etiqueta} text-cyan-dark`}>O manifesto</p>
        <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
          {propostas.length} propostas em 4 eixos
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-ink/80">
          Três eixos são do que a Câmara Municipal pode fazer já. O quarto é o que exigimos ao Governo e
          à Assembleia da República. Carrega numa proposta para ver o porquê.
        </p>
        <div className="mt-10">
          <PropostasEducacao eixos={eixos} propostas={propostas} />
        </div>
      </section>

      {/* As Jornadas */}
      <section className="bg-mist py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className={`${etiqueta} text-cyan-dark`}>De onde vêm as propostas</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">
            Jornadas Liberais da Trofa: Educação
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-ink/85">
            Entre 23 e 28 de março de 2026, a IL Trofa visitou escolas e centros de formação do concelho
            para ouvir quem trabalha na educação todos os dias, e fechou a semana com um debate público no
            auditório da Escola Secundária da Trofa. Estas propostas nasceram daí.
          </p>
          <Galeria fotos={fotosJornadas} alt="Jornadas Liberais da Trofa, Educação" />
          <div className="mt-8">
            <Link
              href="/eventos/lit"
              className="inline-block rounded-full border-2 border-navy px-7 py-3 font-bold text-navy transition hover:bg-navy hover:text-white"
            >
              Ver as Jornadas →
            </Link>
          </div>

          {imprensaJornadas.length > 0 && (
            <>
              <h3 className="font-display mt-14 text-2xl font-bold text-navy">Na imprensa</h3>
              <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {imprensaJornadas.map((n) => (
                  <li key={n.href}>
                    <ItemCard item={n} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      {/* Fecho */}
      <section className="bg-sun py-16 text-navy">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-4xl font-bold">Queres a Trofa no topo da Educação?</h2>
          <p className="mt-3 text-lg font-medium">
            Estas propostas são um ponto de partida. Diz-nos o que falta e ajuda-nos a pô-las em prática.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/trofa-liberal/faz-te-membro"
              className="rounded-full bg-navy px-7 py-3 font-bold text-white transition hover:bg-pink"
            >
              Faz-te membro
            </Link>
            <Link
              href="/ideias/sugestao"
              className="rounded-full border-2 border-navy px-7 py-3 font-bold text-navy transition hover:bg-navy hover:text-white"
            >
              Tens uma ideia?
            </Link>
            <PartilharBotao
              titulo="Trofa no topo da Educação — Iniciativa Liberal Trofa"
              texto="Liberdade para aprender, autonomia para crescer. O manifesto da IL Trofa pela Educação."
            />
          </div>
        </div>
      </section>
    </>
  );
}
