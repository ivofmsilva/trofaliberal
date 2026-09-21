import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Juventude — Iniciativa Liberal Trofa" };

export default function Juventude() {
  return (
    <>
      <PageHero eyebrow="Conselho Municipal da Juventude" title="A tua voz na juventude trofense" image={{ src: "/images/geral/juventude-cmj.jpg", alt: "Duarte Pinheiro e Afonso Couto no Conselho Municipal da Juventude", w: 1438, h: 920 }}>
        Duarte Pinheiro e Afonso Couto representam a Iniciativa Liberal no Conselho Municipal da
        Juventude da Trofa.
      </PageHero>

      <section className="mx-auto max-w-3xl space-y-6 px-4 py-20 text-lg text-ink/85 sm:px-6">
        <p>
          O Conselho Municipal da Juventude (CMJ) da Trofa iniciou um novo mandato a 7 de fevereiro
          de 2026, contando pela primeira vez com representação da Iniciativa Liberal, através do
          Duarte Pinheiro e do Afonso Couto.
        </p>
        <p>
          Alinhado com a proposta apresentada no programa autárquico liberal, o executivo decidiu
          expandir o Conselho, reforçando a voz e a representatividade dos jovens trofenses. O CMJ
          tem como missão a definição de um programa anual de Juventude ambicioso e transformador
          para o concelho.
        </p>
        <p>
          Duarte Pinheiro foi ainda escolhido como um dos dois representantes do CMJ da Trofa no
          Grupo Estratégico Metropolitano da Juventude (GEMJ) da Área Metropolitana do Porto.
        </p>
        <p>
          A Iniciativa Liberal será uma voz ativa, construtiva e sem medo de propor o que é melhor
          para os jovens trofenses.
        </p>
        <p className="font-display text-2xl font-bold text-navy">
          Vamos trabalhar em conjunto para fazer da Trofa um concelho cada vez mais jovem, dinâmico
          e à altura das vossas ambições!
        </p>
      </section>

      <section className="bg-sun py-14 text-center text-navy">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Tens uma ideia? Partilha connosco.</h2>
          <Link
            href="/ideias/sugestao"
            className="mt-6 inline-block rounded-full bg-navy px-8 py-3 font-bold text-white transition hover:bg-white hover:text-navy"
          >
            Partilhar ideia
          </Link>
        </div>
      </section>
    </>
  );
}
