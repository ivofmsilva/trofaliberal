import type { Metadata } from "next";
import { atualizado, indicadores } from "@/lib/dados/dados";

export const metadata: Metadata = { title: "Fontes e método" };

const fontes = [
  { nome: "INE", texto: "Demografia, economia, habitação, turismo, água e participação eleitoral." },
  { nome: "Portal de dados abertos da Trofa", texto: "A recolha de partida dos indicadores, dos contratos e dos fundos europeus vem deste portal, que continua disponível na primeira opção do menu \"Dados da Trofa\"." },
  { nome: "Pordata", texto: "Indicadores sem acesso público automático, como o poder de compra e o rendimento." },
  { nome: "dados.gov.pt", texto: "Contratos públicos (IMPIC / Portal BASE) e projetos de fundos europeus (Portugal 2020 e PRR)." },
  { nome: "mun-trofa.pt", texto: "Atas da Câmara e documentos da Assembleia Municipal, tal como o município os publica." },
];

export default function Fontes() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-apagado">Dados da Trofa</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-tinta md:text-5xl">Fontes e método</h1>
      <p className="mt-5 text-lg text-texto">
        Aqui só há números oficiais, sem interpretação. Cada indicador diz de onde vem e a que ano se refere.
      </p>

      <h2 className="mt-12 text-xl font-bold text-tinta">De onde vêm os números</h2>
      <ul className="mt-4 divide-y divide-linha border-y border-linha">
        {fontes.map((f) => (
          <li key={f.nome} className="py-4">
            <p className="font-semibold text-tinta">{f.nome}</p>
            <p className="mt-1 text-texto">{f.texto}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-xl font-bold text-tinta">O que quer dizer “sem interpretação”</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-texto marker:text-apagado">
        <li>Mostramos o número e a fonte, sem leitura política.</li>
        <li>Os indicadores desfavoráveis também se publicam.</li>
        <li>Os dados que não existem para o concelho ficam assinalados, não escondidos.</li>
        <li>Não arredondamos para enganar, não escolhemos só os anos convenientes e não estimamos além do que as fontes publicam.</li>
      </ul>

      <h2 className="mt-12 text-xl font-bold text-tinta">Como ler a variação</h2>
      <p className="mt-4 text-texto">
        A seta junto a cada valor (▲ sobe, ▼ desce, ＝ igual) é a variação em relação ao período anterior da série. Os
        gráficos de comparação usam como base 100 o primeiro valor de cada série, para se ver quem cresceu mais, quer o
        número seja grande ou pequeno.
      </p>

      <h2 className="mt-12 text-xl font-bold text-tinta">Atualização</h2>
      <p className="mt-4 text-texto">
        {indicadores.length} indicadores, na versão de {atualizado ?? "—"}. A maioria das fontes publica uma vez por
        ano, por isso muitos valores têm um ou dois anos de atraso.
      </p>
    </div>
  );
}
