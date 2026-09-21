import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import OrderButton from "@/components/OrderButton";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Loja — Iniciativa Liberal Trofa" };

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
      <PageHero
        eyebrow="Loja"
        title="Bem-vind@ à nossa loja!"
        image={{ src: "/images/loja/hero.jpeg", alt: "Apoiantes da IL Trofa com bandeiras", w: 730, h: 912 }}
      >
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
                <Image
                  src={p.imagem.src}
                  alt={p.nome}
                  width={p.imagem.w}
                  height={p.imagem.h}
                  sizes="(min-width: 1024px) 300px, 50vw"
                  className="aspect-[3/2] w-full bg-white object-contain"
                />
              ) : (
                <div className="font-display flex aspect-[3/2] items-center justify-center bg-navy-soft text-2xl font-bold text-sun">
                  Acelerar a Trofa
                </div>
              )}
              <div className="flex flex-1 flex-col p-8">
                <h3 className="font-display text-2xl font-bold leading-tight">{p.nome}</h3>
                <p className="mt-3 text-white/80">{p.texto}</p>
                <div className="mt-auto space-y-4 pt-6">
                  {p.breve ? (
                    <span className="text-sm font-bold text-white/60">Em breve</span>
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

      <section className="bg-sun py-16 text-center text-navy">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-display text-4xl font-bold">Apoia a causa liberal na Trofa</h2>
          <p className="mt-3 text-lg font-medium">
            Cada donativo ajuda-nos a levar as ideias da liberdade a mais trofenses.
          </p>
          <Link
            href="/loja/donativos"
            className="mt-6 inline-block rounded-full bg-navy px-8 py-3 font-bold text-white transition hover:bg-pink"
          >
            Fazer um donativo
          </Link>
        </div>
      </section>
    </>
  );
}
