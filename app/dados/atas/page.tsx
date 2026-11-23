import type { Metadata } from "next";
import Link from "next/link";
import PesquisaAtas from "@/components/dados/PesquisaAtas";

export const metadata: Metadata = {
  title: "Procurar nas atas",
  description: "Procura qualquer assunto em todas as atas da Câmara Municipal e da Assembleia Municipal da Trofa, desde 2011.",
};

export default function Atas() {
  return (
    <>
      <section className="topo-escuro">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-apagado">Autarquia</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-tinta md:text-5xl">Procurar nas atas</h1>
          <p className="mt-4 max-w-2xl text-lg text-texto">
            Todas as vezes que um assunto foi falado nas reuniões da Câmara e nas sessões da Assembleia Municipal, desde 2011.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <PesquisaAtas />
        <div className="mt-10 max-w-2xl space-y-2 border-t border-linha pt-6 text-sm text-apagado">
          <p>
            A procura ignora os acentos e as maiúsculas. Com várias palavras, mostra as atas que têm todas. Para uma expressão
            exata, usa aspas: “parque das azenhas”.
          </p>
          <p>
            Nas intervenções do público, os nomes, as moradas e os contactos dos cidadãos aparecem como [nome], [morada] e
            [contacto]. Os eleitos e os funcionários aparecem como nas atas.
          </p>
          <p>
            Quase todas as atas são digitalizações: o texto foi lido por reconhecimento automático e pode ter erros. Confirma
            sempre no PDF oficial. As atas estão também, por ano, nas páginas da{" "}
            <Link href="/dados/camara#documentos" className="underline underline-offset-2 hover:text-tinta">
              Câmara
            </Link>{" "}
            e da{" "}
            <Link href="/dados/assembleia#documentos" className="underline underline-offset-2 hover:text-tinta">
              Assembleia
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
