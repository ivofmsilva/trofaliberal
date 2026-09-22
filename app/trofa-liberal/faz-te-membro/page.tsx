import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import MailForm from "@/components/MailForm";
import { links } from "@/lib/site";

export const metadata: Metadata = { title: "Faz-te Membro — Iniciativa Liberal Trofa" };

const razoes = [
  "Participa ativamente na vida política local e nacional",
  "Contribui com as tuas ideias para as causas liberais",
  "Ajuda a construir uma Trofa mais livre, justa e próspera",
  "Faz parte de uma comunidade com garra e sentido de compromisso",
];

export default function FazteMembro() {
  return (
    <>
      <PageHero eyebrow="Faz-te Membro" title="Junta-te à Iniciativa Liberal Trofa!" image={{ src: "/images/geral/junta-te-forca-liberal.png", alt: "Cartaz: Junta-te à força liberal", w: 431, h: 537 }}>
        Torna-te membro e ajuda-nos a construir um futuro mais livre e justo para a Trofa e
        Portugal. Faz parte desta mudança — pela tua terra, salta do sofá.
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Porquê aderir</p>
          <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
            Junta-te a nós
          </h2>
          <ul className="mt-8 space-y-4">
            {razoes.map((r, i) => (
              <li key={r} className="flex gap-4 rounded-2xl bg-navy p-5 text-white">
                <span className="font-display text-xl font-bold text-sun">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-ink/75">
            Queres começar já a contribuir com ideias?{" "}
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-cyan-dark hover:underline"
            >
              Junta-te já ao nosso grupo de WhatsApp.
            </a>
          </p>
        </div>

        <div className="rounded-2xl border-2 border-mist p-8">
          <p className="mb-6 text-ink/75">
            Deixa os teus dados e serás contactado pelo núcleo da Trofa. Parabéns por teres
            iniciativa.
          </p>
          <MailForm
            to={links.email}
            subject="Quero ser membro da Iniciativa Liberal"
            submitLabel="Quero ser membro"
            consent={
              <>
                Li e aceito a{" "}
                <a
                  href="https://iniciativaliberal.pt/politica-privacidade-cookies/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-cyan-dark underline"
                >
                  Política de Privacidade
                </a>
                , e autorizo o tratamento dos meus dados para efeitos de contacto e envio do
                formulário de adesão, bem como o envio de comunicações da Iniciativa Liberal através
                dos seus canais de comunicação, podendo gerir as minhas preferências a qualquer
                momento.
              </>
            }
            fields={[
              { name: "nome", label: "Nome completo *", required: true },
              { name: "telefone", label: "Contacto telefónico *", type: "tel", required: true },
              { name: "email", label: "Email *", type: "email", required: true },
              { name: "freguesia", label: "Freguesia" },
            ]}
          />
        </div>
      </section>

      <section className="bg-mist py-16">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 sm:px-6 md:grid-cols-[280px_1fr]">
          <Image
            src="/images/geral/veste-a-camisola.jpg"
            alt="T-shirt da Iniciativa Liberal: Esquerda, Direita, Liberal — com Liberal marcado"
            width={1000}
            height={665}
            sizes="(min-width: 768px) 280px, 60vw"
            className="mx-auto w-56 rounded-2xl object-cover shadow-lg md:w-full"
          />
          <div className="text-center md:text-left">
            <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
              Veste a camisola liberal!
            </h2>
            <p className="mt-3 text-ink/75">
              Depois de te fazeres membro, passa pela loja e mostra o teu apoio com orgulho.
            </p>
            <Link
              href="/loja"
              className="mt-6 inline-block rounded-full bg-navy px-7 py-3 font-bold text-white transition hover:bg-pink"
            >
              Ver a loja →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
