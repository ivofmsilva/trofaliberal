import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import MailForm from "@/components/MailForm";
import { links } from "@/lib/site";

export const metadata: Metadata = { title: "Canal de Denúncias — Iniciativa Liberal Trofa" };

const passos = [
  { titulo: "Indica a freguesia", texto: "Diz-nos onde ocorre o problema." },
  {
    titulo: "Descreve o problema",
    texto: "Uma breve descrição e, se possível, a morada.",
  },
  {
    titulo: "Junta uma foto",
    texto:
      "Uma imagem com um ponto de referência ajuda-nos a identificar o local. Anexa-a ao email que se abre ao submeter.",
  },
];

export default function Denuncia() {
  return (
    <>
      <PageHero eyebrow="Canal de Denúncias" title="Dá voz às tuas denúncias" image={{ src: "/images/geral/denuncia-orador.jpeg", alt: "Orador da IL Trofa", w: 375, h: 563 }}>
        Estradas em mau estado, espaços públicos abandonados, serviços que não funcionam? Reporta
        tudo de forma simples e rápida.
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">
            Como participar
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
            Juntos melhoramos a Trofa
          </h2>
          <ol className="mt-8 space-y-4">
            {passos.map((p, i) => (
              <li key={p.titulo} className="flex gap-4 rounded-2xl bg-navy p-5 text-white">
                <span className="font-display text-xl font-bold text-sun">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="font-display block text-lg font-bold">{p.titulo}</span>
                  <span className="text-white/75">{p.texto}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-ink/75">
            Todas as denúncias serão levadas a sério e encaminhadas para as entidades competentes. A
            tua participação é essencial para transformar a Trofa num lugar melhor para todos.
          </p>
        </div>

        <div className="rounded-2xl border-2 border-mist p-8">
          <MailForm
            to={links.email}
            subject="Denúncia — Canal de Denúncias"
            submitLabel="Submeter denúncia"
            fields={[
              { name: "freguesia", label: "Freguesia *", required: true },
              { name: "morada", label: "Morada / referência" },
              { name: "descricao", label: "Descrição do problema *", type: "textarea", required: true },
              { name: "contacto", label: "Nome e contacto (opcional)" },
            ]}
          />
        </div>
      </section>
    </>
  );
}
