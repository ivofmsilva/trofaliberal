import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import OrderButton from "@/components/OrderButton";
import PageHero from "@/components/PageHero";
import { merchandising, packsNatal } from "@/lib/loja";

export const metadata: Metadata = { title: "Loja — Iniciativa Liberal Trofa" };

type Produto = {
  id?: string;
  nome: string;
  texto: string;
  preco: string;
  imagem: { src: string; w: number; h: number };
  tamanhos?: string[];
  tamanhoLabel?: string;
  cobrir?: boolean;
};

const produtosBase: Produto[] = [
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
];

// O pack de Natal ocupa o lugar da t-shirt "Acelerar a Trofa".
// Só aparecem os packs disponíveis; os outros ficam guardados em lib/loja.ts.
const packs: Produto[] = packsNatal
  .filter((p) => p.disponivel)
  .map((p) => ({
    id: "natal",
    nome: p.nome,
    texto: p.texto,
    preco: p.preco,
    imagem: { src: p.imagem, w: 1200, h: 675 },
    tamanhos: p.tamanhos,
    tamanhoLabel: "Tamanho da camisola",
    cobrir: true,
  }));

const produtos = [...produtosBase, ...packs];

// Artigos nacionais, por grupos (ids do portal; ver lib/loja.ts).
const grupos: { titulo: string; ids: number[] }[] = [
  { titulo: "Roupa", ids: [28, 41, 30, 33, 34, 39, 38, 52, 51] },
];
const LOJA_NACIONAL = "https://portal.liberal.pt/shop";

export default function Loja() {
  return (
    <>
      <PageHero
        eyebrow="Loja"
        title="Bem-vind@ à nossa loja!"
        image={{ src: "/images/loja/hero.jpeg", alt: "Apoiantes da IL Trofa com bandeiras", w: 730, h: 912 }}
      >
        Pins, canecas, t-shirts e malhas de Natal: tudo para mostrares, com orgulho, de que lado da liberdade
        estás.
      </PageHero>

      <section id="produtos" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Produtos</p>
        <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
          Artigos da Trofa
        </h2>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {produtos.map((p) => (
            <li key={p.nome} id={p.id} className="flex scroll-mt-24 flex-col overflow-hidden rounded-2xl bg-navy text-white">
              <Image
                src={p.imagem.src}
                alt={p.nome}
                width={p.imagem.w}
                height={p.imagem.h}
                sizes="(min-width: 1024px) 300px, 50vw"
                className={`aspect-[3/2] w-full ${p.cobrir ? "object-cover" : "bg-white object-contain"}`}
              />
              <div className="flex flex-1 flex-col p-4 sm:p-8">
                <h3 className="font-display text-base font-bold leading-tight sm:text-2xl">{p.nome}</h3>
                <p className="mt-2 text-sm text-white/80 sm:mt-3 sm:text-base">{p.texto}</p>
                <div className="mt-auto space-y-3 pt-4 sm:space-y-4 sm:pt-6">
                  <p className="font-display text-2xl font-bold text-sun sm:text-3xl">{p.preco}</p>
                  <OrderButton produto={p.nome} tamanhos={p.tamanhos} tamanhoLabel={p.tamanhoLabel} />
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink/60">
          A encomenda é enviada ao núcleo, que entra em contacto contigo para combinar o pagamento e a entrega.
          {packs.length > 0 && " Imagem do pack ilustrativa."} O vendedor é a Iniciativa Liberal; vê as{" "}
          <Link href="/privacidade#loja" className="underline underline-offset-2 hover:text-ink">
            condições da loja
          </Link>
          .
        </p>
      </section>

      <section id="nacionais" className="scroll-mt-24 bg-mist py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Produtos</p>
              <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Artigos Nacionais</h2>
            </div>
            <a
              href={LOJA_NACIONAL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-navy px-6 py-2.5 text-sm font-bold text-navy transition hover:bg-navy hover:text-white"
            >
              Ver na loja nacional ↗
            </a>
          </div>

          {grupos.map((g) => (
            <div key={g.titulo} className="mt-10">
              {grupos.length > 1 && <h3 className="font-display text-2xl font-bold text-navy">{g.titulo}</h3>}
              <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
                {g.ids
                  .map((id) => merchandising.find((p) => p.id === id))
                  .filter((p): p is NonNullable<typeof p> => Boolean(p))
                  .map((p) => (
                    <li key={p.id} className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-navy/10">
                      <Image
                        src={`/images/loja-nacional/${p.id}.webp`}
                        alt={p.nome}
                        width={512}
                        height={512}
                        sizes="(min-width: 1024px) 220px, 45vw"
                        className="aspect-square w-full bg-white object-contain p-3"
                      />
                      <div className="flex flex-1 flex-col border-t border-navy/10 p-4">
                        <h4 className="text-sm font-bold leading-snug text-navy sm:text-base">{p.nome}</h4>
                        {p.nota && <p className="mt-1 text-xs text-ink/70">{p.nota}</p>}
                        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
                          <p className="font-display text-lg font-bold text-navy">{p.preco}</p>
                          <OrderButton produto={p.nome} tamanhos={p.tamanhos} compacto />
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sun py-16 text-center text-navy">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-display text-4xl font-bold">Apoia a Causa Liberal na Trofa</h2>
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
