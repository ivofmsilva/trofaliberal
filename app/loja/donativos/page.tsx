import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Donativos — Iniciativa Liberal Trofa" };

export default function Donativos() {
  return (
    <>
      <PageHero eyebrow="Donativos" title="Donativos Iniciativa Liberal Trofa">
        Obrigado por apoiares o Núcleo da Iniciativa Liberal da Trofa!
      </PageHero>

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div className="space-y-4 text-lg text-ink/85">
          <p>
            O sucesso das nossas iniciativas também depende do teu apoio financeiro. Cada donativo
            permite-nos continuar a lutar por uma Trofa mais livre e próspera. Garantimos total
            transparência: as nossas contas são públicas e auditadas pelo Departamento Financeiro da
            Iniciativa Liberal, fiscalizado pelo Tribunal Constitucional, nos termos do Artigo 27.º
            da Lei Orgânica n.º 2/2005, de 10 de janeiro.
          </p>
          <p className="rounded-2xl border-l-4 border-pink bg-mist p-5 text-base">
            Lembra-te que todas as transferências devem obrigatoriamente ser feitas por pessoas
            singulares e de contas bancárias pessoais. Transferências de contas empresariais são
            ilegais e terão de ser devolvidas.
          </p>
          <p>
            Podes efetuar o teu donativo diretamente através do formulário abaixo, escolhendo o
            método de pagamento (Multibanco ou MB WAY) e selecionando <strong>NT TROFA</strong> como
            beneficiário.
          </p>
        </div>
        <iframe
          src="https://www.eupago.pt/lp/il_donativos/index.php"
          title="Formulário de donativos da Iniciativa Liberal"
          loading="lazy"
          className="mt-8 h-[900px] w-full rounded-2xl border-2 border-mist bg-white"
        />
        <a
          href="https://www.eupago.pt/lp/il_donativos/index.php"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block font-bold text-cyan-dark hover:underline"
        >
          Abrir o formulário numa página própria ↗
        </a>
      </section>
    </>
  );
}
