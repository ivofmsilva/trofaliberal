import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EntradaBloco from "@/components/EntradaBloco";
import OrderButton from "@/components/OrderButton";
import PageHero from "@/components/PageHero";
import { merchandising, packsNatal } from "@/lib/loja";

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

      <EntradaBloco
        itens={[
          { titulo: "Loja", detalhe: "Artigos da Trofa", texto: "O pin, a caneca e as t-shirts da campanha Trofa para cima.", href: "/loja#produtos" },
          { titulo: "Packs de Natal", detalhe: "Novidade", texto: "Camisola, cachecol e gorro de malha. Disponível: “O Natal é liberal”, a 50 € o conjunto.", href: "/loja#natal" },
          { titulo: "Donativos", detalhe: "Apoiar o núcleo", texto: "Como apoiar o núcleo por Multibanco ou MB WAY. Só donativos de pessoas singulares.", href: "/loja/donativos" },
        ]}
      />

      <section id="natal" className="scroll-mt-24 bg-mist py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Natal</p>
          <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Packs de Natal</h2>
          <p className="mt-4 max-w-2xl text-lg text-ink/80">
            Camisola, cachecol e gorro de malha, para vestir o Natal com estilo. Três versões. De
            momento só está disponível “O Natal é liberal”, por 50€ o conjunto.
          </p>
          <ul className="mt-10 grid gap-6 lg:grid-cols-3">
            {packsNatal.map((p) => (
              <li key={p.id} className={`flex flex-col overflow-hidden rounded-2xl bg-navy text-white ${p.disponivel ? "" : "opacity-80"}`}>
                <Image
                  src={p.imagem}
                  alt={p.alt}
                  width={1200}
                  height={675}
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className={`aspect-video w-full object-cover ${p.disponivel ? "" : "grayscale-[50%]"}`}
                />
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="font-display text-2xl font-bold leading-tight">{p.nome}</h3>
                  <p className="mt-3 text-white/80">{p.texto}</p>
                  <div className="mt-auto space-y-4 pt-6">
                    {p.disponivel ? (
                      <>
                        <p className="font-display text-3xl font-bold text-sun">{p.preco}</p>
                        <OrderButton produto={p.nome} tamanhos={p.tamanhos} tamanhoLabel="Tamanho da camisola" />
                      </>
                    ) : (
                      <span className="inline-block text-sm font-bold text-white/70">Indisponível de momento</span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink/60">Imagens ilustrativas.</p>
        </div>
      </section>

      <section id="produtos" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Produtos</p>
        <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
          Artigos da Trofa
        </h2>
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
          A encomenda é enviada ao núcleo, que entra em contacto contigo para combinar o pagamento e a entrega.
        </p>
      </section>

      <section className="bg-mist py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Produtos</p>
          <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
            Artigos nacionais
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {merchandising.map((p) => (
              <li key={p.id} className="flex flex-row overflow-hidden rounded-2xl bg-navy text-white sm:flex-col">
                <Image
                  src={`/images/loja-nacional/${p.id}.webp`}
                  alt={p.nome}
                  width={512}
                  height={512}
                  sizes="(min-width: 1024px) 280px, 50vw"
                  className="aspect-square w-28 shrink-0 self-start bg-white object-contain p-2 sm:w-full sm:p-3"
                />
                <div className="flex flex-1 flex-col p-4 sm:p-6">
                  <h3 className="font-display text-lg font-bold leading-tight sm:text-xl">{p.nome}</h3>
                  {p.nota && <p className="mt-2 text-sm text-white/80">{p.nota}</p>}
                  <div className="mt-auto space-y-4 pt-5">
                    <p className="font-display text-2xl font-bold text-sun">{p.preco}</p>
                    <OrderButton produto={p.nome} tamanhos={p.tamanhos} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
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
