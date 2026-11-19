import type { Metadata } from "next";
import { atualizado, indicadores, ultimo } from "@/lib/dados/dados";

export const metadata: Metadata = {
  title: "Fontes e método",
  description:
    "De onde vêm os números dos Dados da Trofa (INE, IEFP, DGAL, DGEG, APA, Portal BASE, dados.gov.pt, Portugal 2020, PRR e o município) e como se calculam as comparações.",
};

type Fonte = { nome: string; texto: string; ligacoes: { nome: string; url: string }[] };

// Os 8 concelhos da coluna de comparação "8 concelhos próximos" (nos dados: "Ave e concelhos vizinhos").
const GRUPO_8 = ["Trofa", "Santo Tirso", "Maia", "Vila do Conde", "Vila Nova de Famalicão", "Guimarães", "Vizela", "Fafe"];

export default function Fontes() {
  // Último ano com valor para a Trofa, indicador a indicador: quantos indicadores param em cada ano.
  const porAno = new Map<string, number>();
  for (const i of indicadores) {
    const u = ultimo(i);
    if (u) porAno.set(u.periodo, (porAno.get(u.periodo) ?? 0) + 1);
  }
  const anos = [...porAno.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  const nossos = indicadores.filter((i) => i.origem && i.origem !== "portal").length;
  const doPortal = indicadores.length - nossos;
  const conta = (n: number) => `${n} ${n === 1 ? "indicador" : "indicadores"}`;

  const fontes: Fonte[] = [
    {
      nome: "INE — Instituto Nacional de Estatística",
      texto:
        "Demografia, economia, habitação, educação, saúde, segurança, ambiente, turismo, cultura, finanças do município e eleições. Recolhemos os valores diretamente da base de dados do INE, para a Trofa, os outros 7 concelhos do grupo, a Área Metropolitana do Porto e Portugal.",
      ligacoes: [{ nome: "ine.pt", url: "https://www.ine.pt/" }],
    },
    {
      nome: "IEFP — Instituto do Emprego e Formação Profissional",
      texto:
        "Desemprego registado nos centros de emprego, em dezembro de cada ano (total, jovens com menos de 25 anos e inscritos há um ano ou mais). Nestes indicadores a coluna Portugal é só o Continente: as estatísticas concelhias do IEFP não incluem os Açores e a Madeira.",
      ligacoes: [{ nome: "iefp.pt", url: "https://www.iefp.pt/estatisticas" }],
    },
    {
      nome: "DGAL, DGEG e APA",
      texto:
        "Dívida, limite da dívida e prazo médio de pagamentos do município (Direção-Geral das Autarquias Locais, Portal Autárquico), consumo de eletricidade (Direção-Geral de Energia e Geologia) e emissões de poluentes e de gases com efeito de estufa por concelho (Agência Portuguesa do Ambiente).",
      ligacoes: [
        { nome: "portalautarquico.dgal.gov.pt", url: "https://portalautarquico.dgal.gov.pt/" },
        { nome: "dgeg.gov.pt", url: "https://www.dgeg.gov.pt/" },
        { nome: "apambiente.pt", url: "https://apambiente.pt/" },
      ],
    },
    {
      nome: "Portal de dados abertos da Iniciativa Liberal de Lousada",
      texto: `A recolha de partida dos indicadores, dos contratos e dos fundos europeus vem duma adaptação do portal de dados abertos da Iniciativa Liberal de Lousada ao município da Trofa. Hoje, ${conta(nossos)} são recolhidos diretamente por nós ao INE e ao IEFP. Os outros ${doPortal} vêm desse portal, que também já usa estes 8 concelhos: os da DGAL, da DGEG e da APA, alguns calculados a partir de outros indicadores e os que ainda não recolhemos.`,
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

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-apagado">Dados da Trofa</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-tinta md:text-5xl">Fontes e método</h1>
      <p className="mt-5 text-lg text-texto">
        Cada indicador diz a fonte e o ano a que se refere. Aqui explicamos de onde vêm os números e como se fazem as
        comparações.
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

      <h2 className="mt-12 text-xl font-bold text-tinta">Com quem se compara a Trofa</h2>
      <p className="mt-4 text-texto">Cada indicador mostra a Trofa ao lado de três comparações:</p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-texto">
        <li>
          <b className="text-tinta">8 concelhos próximos</b>, a Trofa e mais 7: {GRUPO_8.slice(0, -1).join(", ")} e {GRUPO_8.at(-1)};
        </li>
        <li>
          <b className="text-tinta">Área Metropolitana do Porto</b>, a que a Trofa pertence (17 concelhos);
        </li>
        <li>
          <b className="text-tinta">Portugal</b>.
        </li>
      </ul>
      <p className="mt-4 text-texto">
        Os valores da Área Metropolitana e de Portugal são os que a fonte publica. O dos 8 concelhos próximos é calculado por nós a
        partir dos valores dos 8 concelhos:
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-texto">
        <li>
          <b className="text-tinta">contagens e euros</b> (habitantes, empresas, receitas): a soma dos 8;
        </li>
        <li>
          <b className="text-tinta">taxas, percentagens e valores por habitante</b>: a média dos 8 pesada pela população
          de cada concelho. Nos valores por habitante, dá o valor do conjunto, como o INE faz para a Área Metropolitana e
          para o país. Nas percentagens das eleições, o peso são os eleitores inscritos. Nos índices em que a divisão não é
          pela população (o de envelhecimento divide pelos jovens, os de dependência pelas pessoas dos 15 aos 64 anos), é
          uma aproximação. A densidade é exata: o total de habitantes dos 8 a dividir pela área dos 8;
        </li>
        <li>
          <b className="text-tinta">medianas</b> (rendas, preço da habitação, rendimento, idade): a média simples das 8
          medianas. A mediana do conjunto só se pode calcular com os dados individuais, que não são públicos, por isso este
          valor é uma aproximação;
        </li>
        <li>
          <b className="text-tinta">indicadores calculados a partir de outros</b> (a despesa em cultura por habitante, a
          percentagem de alunos no ensino privado, o desemprego de longa duração em percentagem do total): a soma dos 8
          numeradores a dividir pela soma dos 8 denominadores.
        </li>
      </ul>
      <p className="mt-4 text-texto">
        Na página de cada indicador está escrito qual destas contas se usou.
      </p>
      <p className="mt-4 text-texto">
        Se faltar o valor de um dos 8 concelhos num ano, o conjunto fica sem valor nesse ano. Nos indicadores que ainda
        vêm do portal de origem, o valor dos 8 concelhos próximos é o calculado nesse portal: nos totais é a soma dos 8 e nas
        taxas é o total dos 8 a dividir pelo total dos 8, a mesma conta que fazemos. A exceção é o prazo médio de
        pagamentos, em que não sabemos que conta o portal fez para os três valores de comparação.
      </p>

      <h2 className="mt-12 text-xl font-bold text-tinta">Séries que mudaram</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-texto">
        <li>
          O INE passou muitos indicadores para a nova divisão territorial (NUTS 2024), com códigos novos que muitas vezes
          só começam em 2021. Os anos anteriores vêm da série antiga do mesmo indicador, depois de confirmarmos que os
          valores coincidem.
        </li>
        <li>
          As rendas da habitação (valor mediano e número de novos contratos) passaram em 2026 para um método novo do INE
          (&quot;Metodologia 2026&quot;), e a série antiga acabou em 2024. Usamos a série nova, de 2020 em diante. Os
          valores não se comparam com os publicados antes pelo método antigo.
        </li>
        <li>
          O INE revê com frequência os anos anteriores (as estimativas da população, por exemplo). Mostramos sempre os
          valores que o INE publica hoje, mesmo que sejam diferentes dos que publicou na altura.
        </li>
      </ul>

      <h2 className="mt-12 text-xl font-bold text-tinta">Como ler a variação</h2>
      <p className="mt-4 text-texto">
        A seta junto a cada valor (▲ sobe, ▼ desce, ＝ igual) é a variação em relação ao período anterior da série, em
        percentagem. Quando o indicador já é uma percentagem (a abstenção, por exemplo), a variação vem em pontos
        percentuais (p.p.): de 37,7% para 32% são 5,7 p.p. Quando as comparações têm ordens de grandeza muito diferentes
        (a população da Trofa e a do país, por exemplo), os gráficos comparam a evolução, com o primeiro valor de cada
        série igual a 100.
      </p>

      <h2 className="mt-12 text-xl font-bold text-tinta">Atualização</h2>
      <p className="mt-4 text-texto">
        {indicadores.length} indicadores, na versão de {atualizado ?? "—"}. A maioria das fontes publica uma vez por ano
        e com atraso, e algumas só de vários em vários anos (os Censos, de dez em dez), por isso o último ano com dados
        muda de indicador para indicador: {anos.map(([ano, n]) => `${ano} (${conta(n)})`).join(", ")}.
      </p>
    </div>
  );
}
