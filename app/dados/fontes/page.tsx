import type { Metadata } from "next";
import { atualizado, indicadores, ultimo } from "@/lib/dados/dados";

export const metadata: Metadata = {
  title: "Fontes e método",
  description: "De onde vêm os números dos Dados da Trofa: INE, Portal BASE, dados.gov.pt, Portugal 2020, PRR e os documentos do município.",
};

type Fonte = { nome: string; texto: string; ligacoes: { nome: string; url: string }[] };

const fontes: Fonte[] = [
  {
    nome: "INE",
    texto: "Demografia, economia, habitação, turismo, água e participação eleitoral.",
    ligacoes: [{ nome: "ine.pt", url: "https://www.ine.pt/" }],
  },
  {
    nome: "Portal de dados abertos da Iniciativa Liberal de Lousada",
    texto:
      "A recolha de partida dos indicadores, dos contratos e dos fundos europeus vem duma adaptação do portal de dados abertos da Iniciativa Liberal de Lousada, adaptado ao município da Trofa. As colunas de comparação (Área Metropolitana do Porto, “Ave e concelhos vizinhos” e Portugal) vêm já calculadas desse portal.",
    ligacoes: [],
  },
  {
    nome: "Portal BASE e dados.gov.pt",
    texto: "Contratos públicos (IMPIC / Portal BASE), a partir dos ficheiros publicados em dados.gov.pt.",
    ligacoes: [
      { nome: "base.gov.pt", url: "https://www.base.gov.pt/" },
      { nome: "dados.gov.pt", url: "https://dados.gov.pt/" },
    ],
  },
  {
    nome: "Portugal 2020 e PRR",
    texto: "Projetos de fundos europeus, também a partir dos ficheiros publicados em dados.gov.pt.",
    ligacoes: [
      { nome: "portugal2020.pt", url: "https://portugal2020.pt/" },
      { nome: "recuperarportugal.gov.pt", url: "https://recuperarportugal.gov.pt/" },
    ],
  },
  {
    nome: "Município da Trofa",
    texto: "Atas da Câmara e documentos da Assembleia Municipal, relatórios de gestão e contas e orçamento, tal como o município os publica.",
    ligacoes: [{ nome: "mun-trofa.pt", url: "https://mun-trofa.pt/" }],
  },
];

export default function Fontes() {
  // Último ano com valor para a Trofa, indicador a indicador: quantos indicadores param em cada ano.
  const porAno = new Map<string, number>();
  for (const i of indicadores) {
    const u = ultimo(i);
    if (u) porAno.set(u.periodo, (porAno.get(u.periodo) ?? 0) + 1);
  }
  const anos = [...porAno.entries()].sort((a, b) => b[0].localeCompare(a[0]));

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-apagado">Dados da Trofa</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-tinta md:text-5xl">Fontes e método</h1>
      <p className="mt-5 text-lg text-texto">
        Cada indicador indica a fonte e o ano a que se refere.
      </p>

      <h2 className="mt-12 text-xl font-bold text-tinta">De onde vêm os números</h2>
      <ul className="mt-4 divide-y divide-linha border-y border-linha">
        {fontes.map((f) => (
          <li key={f.nome} className="py-4">
            <p className="font-semibold text-tinta">{f.nome}</p>
            <p className="mt-1 text-texto">{f.texto}</p>
            {f.ligacoes.length > 0 && (
              <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {f.ligacoes.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
                    {l.nome} ↗
                  </a>
                ))}
              </p>
            )}
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-xl font-bold text-tinta">Como ler a variação</h2>
      <p className="mt-4 text-texto">
        A seta junto a cada valor (▲ sobe, ▼ desce, ＝ igual) é a variação em relação ao período anterior da série, em
        percentagem. Quando o indicador já é uma percentagem (a abstenção, por exemplo), a variação vem em pontos
        percentuais (p.p.): de 37,7% para 32% são 5,7 p.p. Os gráficos de comparação usam como base 100 o primeiro valor
        de cada série, para se ver quem cresceu mais, quer o número seja grande ou pequeno.
      </p>

      <h2 className="mt-12 text-xl font-bold text-tinta">Atualização</h2>
      <p className="mt-4 text-texto">
        {indicadores.length} indicadores, na versão de {atualizado ?? "—"}. A maioria das fontes publica uma vez por ano
        e com atraso, e algumas só de vários em vários anos (os Censos, de dez em dez), por isso o último ano com dados
        muda de indicador para indicador: {anos.map(([ano, n]) => `${ano} (${n} ${n === 1 ? "indicador" : "indicadores"})`).join(", ")}.
      </p>
    </div>
  );
}
