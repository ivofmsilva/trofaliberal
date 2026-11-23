import { dataCurta } from "@/lib/dados/formatar";
import type { Projeto } from "@/lib/dados/transparencia";
import pt2030 from "@/lib/dados/data/fundos-pt2030.json";

// Nota da fonte, igual nas três páginas dos fundos europeus. A data "até" do Portugal 2020 e do PRR é a conclusão mais
// recente registada nos ficheiros; a do Portugal 2030 é a data dos próprios ficheiros (scripts/recolher-pt2030.mjs).
export default function FonteFundos({ lista, className = "mt-10", children }: { lista: Projeto[]; className?: string; children?: React.ReactNode }) {
  const ultima =
    lista
      .filter((p) => p.programa !== "Portugal 2030")
      .map((p) => p.data_efetiva_conclusao)
      .filter((d): d is string => Boolean(d))
      .sort()
      .pop() ?? null;
  return (
    <p className={`${className} max-w-3xl text-sm text-apagado`}>
      Fonte: Portugal 2020, PRR e Portugal 2030, através dos ficheiros de dados.gov.pt. O valor mostrado é o valor aprovado
      atribuível a este território (nos projetos que abrangem vários concelhos, só a parte que cabe à Trofa); no Portugal 2020 e
      no Portugal 2030 é o fundo europeu aprovado, não o custo total do projeto.{children} O estado é o que a fonte regista, mesmo
      quando a data de conclusão já passou: há projetos que continuam “Em execução” nos ficheiros com a conclusão registada há
      anos. No Portugal 2030 há também “Aprovado” e “Aceite pela entidade”, ainda sem despesa executada. Dados até: os ficheiros
      do Portugal 2030 são de {dataCurta(pt2030.dados_ate)}; nos outros dois programas, a conclusão mais recente registada é de{" "}
      {dataCurta(ultima)}.
    </p>
  );
}
