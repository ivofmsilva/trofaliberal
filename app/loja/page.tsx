import type { Metadata } from "next";
import Image from "next/image";
import OrderButton from "@/components/OrderButton";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Loja e Donativos — Iniciativa Liberal Trofa" };

const produtos = [
  {
    nome: "Pin Trofa para cima",
    texto: "O símbolo liberal ao peito, discreto e com atitude.",
    preco: "5€",
    imagem: { src: "/images/loja/pin.png", w: 191, h: 127 },
  },
  {
    nome: "Caneca Trofa para cima",
    texto: "Começa o dia como deve ser.",
    preco: "10€",
    imagem: { src: "/images/loja/caneca.png", w: 303, h: 202 },
  },
  {
    nome: "T-shirt Trofa para cima",
    texto: "A t-shirt oficial da campanha autárquica 2025. Veste a camisola liberal!",
    preco: "15€",
    imagem: { src: "/images/loja/tshirt.png", w: 473, h: 243 },
    tamanhos: ["S", "M", "L", "XL", "XXL"],
  },
  {
    nome: "T-shirt Acelerar a Trofa",
    texto: "Uma nova frase, a mesma atitude.",
    breve: true,
  },
];

export default function Loja() {
  return (
    <>
      <PageHero eyebrow="Loja e Donativos" title="Bem-vind@ à nossa loja!" image={{ src: "/images/loja/hero.jpeg", alt: "Apoiantes da IL Trofa com bandeiras", w: 730, h: 912 }}>
        Estás na montra liberal da Trofa — aqui encontras produtos com estilo, atitude e propósito.
        Veste a causa. Usa com orgulho.
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Produtos</p>
        <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
          Escolhe os teus favoritos
        </h2>
        <p className="mt-3 text-ink/75">Ajuda-nos a levar mais longe as ideias da liberdade.</p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {produtos.map((p) => (
            <li key={p.nome} className="flex flex-col overflow-hidden rounded-2xl bg-navy text-white">
              {p.imagem ? (
                <Image src={p.imagem.src} alt={p.nome} width={p.imagem.w} height={p.imagem.h} sizes="(min-width: 1024px) 300px, 50vw" className="aspect-[3/2] w-full bg-white object-contain" />
              ) : (
                <div className="flex aspect-[3/2] items-center justify-center bg-navy-soft font-display text-2xl font-bold text-sun">Acelerar a Trofa</div>
              )}
              <div className="flex flex-1 flex-col p-8">
              <h3 className="font-display text-2xl font-bold leading-tight">{p.nome}</h3>
              <p className="mt-3 text-white/75">{p.texto}</p>
              <div className="mt-auto space-y-4 pt-6">
                {p.breve ? (
                  <span className="text-sm font-bold text-white/50">Em breve</span>
                ) : (
                  <>
                    <p className="font-display text-3xl font-bold text-sun">{p.preco}</p>
                    <OrderButton produto={p.nome} tamanhos={p.tamanhos} />
                  </>
                )}
              </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink/60">
          A encomenda abre o teu programa de email, dirigida ao núcleo.
        </p>
      </section>

      <section id="donativos" className="scroll-mt-16 bg-mist py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Donativos</p>
          <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
            Donativos Iniciativa Liberal Trofa
          </h2>
          <div className="mt-8 space-y-4 text-lg text-ink/85">
            <p className="font-bold text-navy">
              Obrigado por apoiares o Núcleo da Iniciativa Liberal da Trofa!
            </p>
            <p>
              O sucesso das nossas iniciativas também depende do teu apoio financeiro. Cada donativo
              permite-nos continuar a lutar por uma Trofa mais livre e próspera. Garantimos total
              transparência: as nossas contas são públicas e auditadas pelo Departamento Financeiro
              da Iniciativa Liberal, fiscalizado pelo Tribunal Constitucional, nos termos do Artigo
              27.º da Lei Orgânica n.º 2/2005, de 10 de janeiro.
            </p>
            <p className="rounded-2xl border-l-4 border-cyan bg-white p-5 text-base">
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
        </div>
      </section>
    </>
  );
}
