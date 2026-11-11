import dados from "@/public/dados/data/assembleia-iniciativas.json";
import { numero } from "@/lib/dados/formatar";

type Iniciativa = {
  data: string;
  tipo: string;
  titulo: string;
  assunto: string;
  resultado: string;
  votacao: string;
  proponente: string;
  nota: string | null;
  fonte: string;
  ata: string | null;
  deliberacoes: string;
};

const todas = (dados as unknown as { iniciativas: Iniciativa[] }).iniciativas;

const COLUNAS = [
  { id: "pesar", rotulo: "Votos de pesar", tipos: ["Voto de pesar"] },
  { id: "votos", rotulo: "Outros votos", tipos: ["Voto de louvor", "Voto de congratulação", "Voto de protesto"] },
  { id: "mocoes", rotulo: "Moções", tipos: ["Moção"] },
  { id: "recomendacoes", rotulo: "Recomendações", tipos: ["Recomendação"] },
  { id: "propostas", rotulo: "Propostas", tipos: ["Proposta de deliberação"] },
];
const conta = (l: Iniciativa[], tipos: string[]) => l.filter((x) => tipos.includes(x.tipo)).length;

const PROPONENTES = [
  { id: "PS", rotulo: "PS" },
  { id: "PSD", rotulo: "PSD" },
  { id: "PSD e CDS-PP", rotulo: "PSD e CDS-PP, em conjunto" },
  { id: "CDS-PP", rotulo: "CDS-PP" },
  { id: "PCP-PEV", rotulo: "PCP-PEV (CDU)" },
  { id: "PAN", rotulo: "PAN" },
  { id: "Todos", rotulo: "Subscritas por todos os membros ou grupos" },
];

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const dataLonga = (iso: string) => {
  const [a, m, d] = iso.split("-").map(Number);
  return `${d} de ${MESES[m - 1]} de ${a}`;
};

export default function IniciativasAM() {
  // Todos os anos de 2015 a 2026, também os que não têm nenhuma.
  const anos = Array.from({ length: 12 }, (_, i) => String(2026 - i));
  const cabeca = "px-3 py-3 text-right font-medium";
  return (
    <div>
      <p className="max-w-2xl text-texto">
        Moções, votos e recomendações que foram a votos na Assembleia desde 2015. Estão aqui só as iniciativas votadas: não entram
        intervenções, perguntas, pedidos de informação nem propostas que não chegaram a ser votadas. O proponente de cada uma foi
        lido na ata da sessão.
      </p>

      <h3 className="mt-8 text-lg font-bold text-tinta">Por ano</h3>
      <div className="mt-3 overflow-x-auto rounded-xl border border-linha">
        <table className="w-full min-w-[34rem] text-sm">
          <thead className="bg-cinza text-left text-apagado">
            <tr>
              <th className="px-4 py-3 font-medium">Ano</th>
              {COLUNAS.map((c) => (
                <th key={c.id} className={cabeca}>
                  {c.rotulo}
                </th>
              ))}
              <th className={cabeca}>Total</th>
            </tr>
          </thead>
          <tbody>
            {anos.map((a) => {
              const l = todas.filter((x) => x.data.startsWith(a));
              return (
                <tr key={a} className="border-t border-linha tabular-nums">
                  <th scope="row" className="px-4 py-2.5 text-left font-semibold text-tinta">
                    {a}
                  </th>
                  {COLUNAS.map((c) => (
                    <td key={c.id} className="px-3 py-2.5 text-right text-texto">
                      {conta(l, c.tipos) || "—"}
                    </td>
                  ))}
                  <td className="px-3 py-2.5 text-right font-semibold text-tinta">{l.length}</td>
                </tr>
              );
            })}
            <tr className="border-t border-linha bg-cinza tabular-nums font-semibold text-tinta">
              <th scope="row" className="px-4 py-2.5 text-left">
                Total
              </th>
              {COLUNAS.map((c) => (
                <td key={c.id} className="px-3 py-2.5 text-right">
                  {conta(todas, c.tipos)}
                </td>
              ))}
              <td className="px-3 py-2.5 text-right">{todas.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 max-w-2xl text-sm text-apagado">
        No mandato atual (desde outubro de 2025) não há nas deliberações nenhuma moção, voto ou recomendação votados. A última, um
        voto de pesar, é de 5 de setembro de 2025, ainda do mandato anterior. Em 2018 também não há nenhuma.
      </p>

      <h3 className="mt-10 text-lg font-bold text-tinta">Por quem foram apresentadas</h3>
      <div className="mt-3 overflow-x-auto rounded-xl border border-linha">
        <table className="w-full min-w-[34rem] text-sm">
          <thead className="bg-cinza text-left text-apagado">
            <tr>
              <th className="px-4 py-3 font-medium">Apresentadas por</th>
              {COLUNAS.map((c) => (
                <th key={c.id} className={cabeca}>
                  {c.rotulo}
                </th>
              ))}
              <th className={cabeca}>Total</th>
            </tr>
          </thead>
          <tbody>
            {PROPONENTES.map((p) => {
              const l = todas.filter((x) => x.proponente === p.id);
              return (
                <tr key={p.id} className="border-t border-linha tabular-nums">
                  <th scope="row" className="px-4 py-2.5 text-left font-medium text-tinta">
                    {p.rotulo}
                  </th>
                  {COLUNAS.map((c) => (
                    <td key={c.id} className="px-3 py-2.5 text-right text-texto">
                      {conta(l, c.tipos) || "—"}
                    </td>
                  ))}
                  <td className="px-3 py-2.5 text-right font-semibold text-tinta">{l.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 max-w-2xl text-sm text-apagado">
        Os nomes são os dos grupos municipais de cada época (por exemplo o PAN só tem membro na Assembleia a partir de 2021 e a CDU
        é a coligação PCP-PEV). Uma iniciativa conta uma vez, para quem a apresentou. O número de iniciativas votadas não mede o
        trabalho de cada grupo: as intervenções, perguntas e pedidos de informação não aparecem aqui.
      </p>

      <details className="mt-8 rounded-xl border border-linha bg-fundo p-4">
        <summary className="cursor-pointer font-semibold text-tinta">Ver as {todas.length} iniciativas, uma a uma</summary>
        <ul className="mt-4 space-y-5">
          {todas.map((x) => (
            <li key={x.data + x.assunto} className="text-sm">
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-semibold text-tinta">{dataLonga(x.data)}</span>
                <span className="rounded-full border border-linha px-2 py-0.5 text-xs text-texto">{x.tipo}</span>
              </p>
              <p className="mt-1 text-tinta">{x.titulo}</p>
              <p className="mt-1 text-texto">
                Apresentada por{" "}
                <strong className="font-semibold text-tinta">{PROPONENTES.find((p) => p.id === x.proponente)?.rotulo ?? x.proponente}</strong>
                {" · "}
                {x.resultado === "rejeitada" ? "Não aprovada: " + x.votacao.replace(/^não aprovado: /, "") : "Aprovada " + x.votacao}
              </p>
              {x.nota && <p className="mt-1 text-apagado">{x.nota}</p>}
              <p className="mt-1 text-apagado">
                {x.ata && (
                  <a href={x.ata} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
                    Ata da sessão ↗
                  </a>
                )}
                {x.ata && " · "}
                <a href={x.deliberacoes} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
                  Deliberações ↗
                </a>
                {x.fonte !== "ata da sessão" && ` · Proponente: ${x.fonte}`}
              </p>
            </li>
          ))}
        </ul>
      </details>
      <p className="mt-4 max-w-2xl text-sm text-apagado">
        {numero(todas.length)} iniciativas, lidas das deliberações e das atas das sessões. Numa deliberação (o voto de protesto de 30 de
        setembro de 2016), o resultado publicado regista só a aceitação para discussão e não a votação final; usei o que a ata diz,
        e está indicado na iniciativa.
      </p>
    </div>
  );
}
