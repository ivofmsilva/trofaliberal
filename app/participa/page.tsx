import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import MailForm from "@/components/MailForm";
import PageHero from "@/components/PageHero";
import ParticipaTabs, { type Separador } from "@/components/ParticipaTabs";
import { areas } from "@/lib/propostas";
import { links } from "@/lib/site";

export const metadata: Metadata = {
  title: "Participa — Iniciativa Liberal Trofa",
  description: "Faz-te membro, partilha uma ideia, faz uma denúncia ou fala connosco.",
};

const razoes = [
  "Participa ativamente na vida política local e nacional",
  "Contribui com as tuas ideias para as causas liberais",
  "Ajuda a construir uma Trofa mais livre, justa e próspera",
  "Faz parte de uma comunidade com garra e sentido de compromisso",
];

const passosDenuncia = [
  { titulo: "Indica a freguesia", texto: "Diz-nos onde ocorre o problema." },
  { titulo: "Descreve o problema", texto: "Uma breve descrição e, se possível, a morada." },
  {
    titulo: "Junta fotos ou documentos (opcional)",
    texto: `Neste formulário não é possível anexar ficheiros: anexa-os ao email que se abre ao submeter ou envia-os para ${links.email}, a indicar a freguesia e a morada.`,
  },
];

const redes = [
  { label: "Facebook", href: links.facebook },
  { label: "Instagram", href: links.instagram },
];

const caixa = "rounded-2xl border-2 border-mist p-8";

const separadores: Separador[] = [
  {
    id: "membro",
    label: "Faz-te membro",
    resumo: "Junta-te à Iniciativa Liberal da Trofa e ajuda a construir o concelho.",
    conteudo: (
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Junta-te a nós</h2>
          <p className="mt-3 text-ink/75">
            Torna-te membro e ajuda-nos a construir um futuro mais livre, próspero e justo para a
            Trofa e Portugal.
          </p>
          <ul className="mt-6 space-y-3">
            {razoes.map((r, i) => (
              <li key={r} className="flex gap-4 rounded-2xl bg-navy p-5 text-white">
                <span className="font-display text-xl font-bold text-sun">{String(i + 1).padStart(2, "0")}</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-ink/75">
            Queres começar já a contribuir com ideias?{" "}
            <Link href={links.convite} className="font-bold text-cyan-dark hover:underline">
              Pede convite para o nosso grupo de WhatsApp.
            </Link>
          </p>
        </div>
        <div className={caixa}>
          <p className="mb-6 text-ink/75">
            Deixa os teus dados e serás contactado pelo núcleo da Trofa. Parabéns por teres iniciativa.
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
      </div>
    ),
  },
  {
    id: "ideia",
    label: "Tens uma ideia?",
    resumo: "Diz-nos o que mudavas na Trofa.",
    conteudo: (
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Partilha a tua ideia</h2>
        <p className="mt-3 text-ink/75">
          As melhores propostas nascem de quem vive a Trofa todos os dias. Conta-nos a tua.
        </p>
        <div className={`mt-6 ${caixa}`}>
          <MailForm
            to={links.email}
            subject="Ideia para a Trofa"
            submitLabel="Enviar ideia"
            fields={[
              { name: "nome", label: "Nome *", required: true },
              { name: "email", label: "Email *", type: "email", required: true },
              { name: "tema", label: "Tema", type: "select", options: [...areas.map((a) => a.nome), "Outro"] },
              { name: "ideia", label: "A tua ideia *", type: "textarea", required: true },
            ]}
          />
        </div>
      </div>
    ),
  },
  {
    id: "denuncia",
    label: "Denúncia",
    resumo: "Um problema na tua rua ou na tua freguesia? Conta-nos onde e o quê.",
    conteudo: (
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Dá voz às tuas denúncias</h2>
          <p className="mt-3 text-ink/75">
            Estradas em mau estado, espaços públicos abandonados, serviços que não funcionam?
            Reporta tudo de forma simples e rápida.
          </p>
          <ol className="mt-6 space-y-3">
            {passosDenuncia.map((p, i) => (
              <li key={p.titulo} className="flex gap-4 rounded-2xl bg-navy p-5 text-white">
                <span className="font-display text-xl font-bold text-sun">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="font-display block text-lg font-bold">{p.titulo}</span>
                  <span className="text-white/75">{p.texto}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-ink/75">
            Todas as denúncias serão levadas a sério e encaminhadas para as entidades competentes.
          </p>
        </div>
        <div className={caixa}>
          <p className="mb-6 text-ink/75">
            Ao submeter, preparamos a denúncia no teu email, pronta a enviar para{" "}
            <a href={`mailto:${links.email}`} className="font-bold text-cyan-dark hover:underline">
              {links.email}
            </a>
            . Podes anexar fotos ou documentos antes de a enviar.
          </p>
          <MailForm
            to={links.email}
            subject="Denúncia — Canal de Denúncias"
            submitLabel="Submeter denúncia"
            anexos
            fields={[
              { name: "freguesia", label: "Freguesia *", required: true },
              { name: "morada", label: "Morada / referência" },
              { name: "descricao", label: "Descrição do problema *", type: "textarea", required: true },
              { name: "contacto", label: "Nome e contacto (opcional)" },
            ]}
          />
        </div>
      </div>
    ),
  },
  {
    id: "contactos",
    label: "Contactos",
    resumo: "Email, WhatsApp, redes sociais, ou escreve-nos diretamente.",
    conteudo: (
      <div className="grid gap-14 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-2xl bg-navy p-8 text-white">
            <h2 className="font-display text-2xl font-bold">Email</h2>
            <a href={`mailto:${links.email}`} className="mt-3 inline-block font-bold text-sun hover:underline">
              {links.email}
            </a>
          </div>
          <div className="rounded-2xl bg-navy p-8 text-white">
            <h2 className="font-display text-2xl font-bold">WhatsApp</h2>
            <p className="mt-2 text-white/75">
              Queres fazer parte da comunidade de liberais trofenses? Pede convite para o nosso grupo.
            </p>
            <Link href={links.convite} className="mt-4 inline-block font-bold text-sun hover:underline">
              Pedir convite →
            </Link>
          </div>
          <div className="rounded-2xl bg-navy p-8 text-white">
            <h2 className="font-display text-2xl font-bold">Redes sociais</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {redes.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full border-2 border-white/30 px-5 py-2 text-sm font-bold transition hover:border-cyan hover:text-sun"
                  >
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={caixa}>
          <MailForm
            to={links.email}
            subject="Contacto através do site"
            submitLabel="Enviar mensagem"
            fields={[
              { name: "nome", label: "Nome *", required: true },
              { name: "email", label: "Email *", type: "email", required: true },
              { name: "assunto", label: "Assunto" },
              { name: "mensagem", label: "Mensagem *", type: "textarea", required: true },
            ]}
          />
        </div>
      </div>
    ),
  },
];

export default function Participa() {
  return (
    <>
      <PageHero
        eyebrow="Participa"
        title="Salta do sofá. A Trofa faz-se contigo."
        image={{ src: "/images/geral/junta-te-forca-liberal.png", alt: "Cartaz: Junta-te à força liberal", w: 431, h: 537 }}
      >
        Faz-te membro, partilha uma ideia, denuncia um problema ou fala connosco: escolhe abaixo.
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Suspense>
          <ParticipaTabs separadores={separadores} />
        </Suspense>
      </section>
    </>
  );
}
