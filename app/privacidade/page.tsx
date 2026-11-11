import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { links } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacidade e cookies — Iniciativa Liberal Trofa",
  description: "Que dados recolhe este site, para quê, com quem são partilhados, quanto tempo se guardam e como exercer os teus direitos.",
};

const POLITICA_PARTIDO = "https://iniciativaliberal.pt/politica-privacidade-cookies/";
const CNPD = "https://www.cnpd.pt";

const tabela: { formulario: string; dados: string; para: string }[] = [
  { formulario: "Faz-te membro (“Prefiro falar com alguém primeiro”)", dados: "Nome, telefone, email e freguesia (opcional).", para: "Contactar-te para te explicar como aderir. A adesão em si faz-se no site da Iniciativa Liberal." },
  { formulario: "Tens uma ideia?", dados: "Nome, email (opcional) e o texto da ideia.", para: "Ler a ideia e, se pedires, responder-te." },
  { formulario: "Denúncia (problemas na rua, na freguesia…)", dados: "Freguesia, morada ou referência, descrição e, se quiseres, nome e contacto.", para: "Perceber o problema e encaminhá-lo para a entidade competente." },
  { formulario: "Convite para o grupo de WhatsApp", dados: "Nome e número de telefone.", para: "Enviar-te o convite para o grupo. Não usamos o número para mais nada." },
  { formulario: "Contacto através do site", dados: "Nome, email e a mensagem.", para: "Responder à tua mensagem." },
  { formulario: "Encomendas da loja", dados: "Produto, tamanho e quantidade, nome e telemóvel ou email.", para: "Combinar contigo o pagamento e a entrega. O pagamento não se faz no site." },
];

function Secao({ id, titulo, children }: { id?: string; titulo: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-mist py-9 first:border-t-0 first:pt-0">
      <h2 className="font-display text-2xl font-bold text-navy">{titulo}</h2>
      <div className="mt-3 space-y-3 text-ink/80">{children}</div>
    </section>
  );
}

export default function Privacidade() {
  return (
    <>
      <PageHero eyebrow="Privacidade" title="Privacidade e cookies">
        O que fazemos com os dados que nos dás neste site, em linguagem simples.
      </PageHero>

      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <p className="text-sm text-ink/60">Última atualização: 11 de novembro de 2026.</p>

        <div className="mt-6">
          <Secao titulo="Quem trata os dados">
            <p>
              Este site é gerido pelo núcleo territorial da Trofa da Iniciativa Liberal. Quando nos escreves por aqui, a tua
              mensagem chega ao núcleo, no endereço{" "}
              <a href={`mailto:${links.email}`} className="font-bold text-cyan-dark underline">
                {links.email}
              </a>
              . Para os dados de membros e do partido em geral, a Iniciativa Liberal tem a sua própria política de privacidade:{" "}
              <a href={POLITICA_PARTIDO} target="_blank" rel="noopener noreferrer" className="font-bold text-cyan-dark underline">
                Política de Privacidade e Cookies da Iniciativa Liberal ↗
              </a>
              .
            </p>
          </Secao>

          <Secao titulo="Que dados recolhemos e para quê">
            <p>Só recolhemos o que escreves nos formulários. Não há registo de utilizadores nem contas.</p>
            <ul className="mt-2 space-y-3">
              {tabela.map((t) => (
                <li key={t.formulario} className="rounded-xl bg-mist p-4 text-sm">
                  <p className="font-bold text-navy">{t.formulario}</p>
                  <p className="mt-1">
                    <strong>Dados:</strong> {t.dados}
                  </p>
                  <p>
                    <strong>Para quê:</strong> {t.para}
                  </p>
                </li>
              ))}
            </ul>
            <p>
              Os campos marcados com * são necessários para podermos responder. Os restantes são opcionais. Não pedimos dados
              especialmente sensíveis; se os escreveres no texto (por exemplo numa denúncia), usamo-los só para tratar o assunto
              que nos expões. Evita, por isso, incluir dados de terceiros que não sejam necessários.
            </p>
          </Secao>

          <Secao titulo="Como são enviados e com quem são partilhados">
            <p>
              Quando carregas em “enviar”, o site passa a mensagem para o email do núcleo. O site <strong>não a guarda</strong>. Para
              a entregar usa um serviço de envio de email (hoje o FormSubmit ou o Resend), que a recebe só para a reencaminhar e
              pode estar fora da União Europeia. Se o envio falhar, o site prepara a mensagem para a enviares tu pelo teu programa de
              email, e nesse caso ela só passa pelo teu fornecedor de email.
            </p>
            <p>
              A denúncia por este formulário <strong>não é anónima</strong>: chega ao núcleo por email, e quem a recebe vê o que
              escreveste. Podes deixar o nome e o contacto em branco. Podemos encaminhá-la para a entidade competente (por exemplo
              a Câmara ou a Junta de Freguesia), sem o teu nome se não nos autorizares a incluí-lo.
            </p>
            <p>
              <strong>Donativos:</strong> o formulário de donativos (Multibanco ou MB WAY) é da EuPago e aparece dentro da nossa
              página. Os dados de pagamento são tratados pela EuPago e pela Iniciativa Liberal; este site não os recebe nem os guarda.
            </p>
            <p>Não vendemos nem cedemos dados a terceiros para publicidade.</p>
          </Secao>

          <Secao titulo="Quanto tempo guardamos">
            <p>
              O site não guarda mensagens. No email do núcleo, guardamos a mensagem o tempo necessário para tratar o teu pedido.
              Depois disso apagamo-la, exceto se a lei nos obrigar a conservá-la ou se pedires para continuarmos a contactar-te.
            </p>
          </Secao>

          <Secao titulo="Fundamento legal">
            <p>
              Tratamos os teus dados com o teu consentimento (quando escreves e submetes o formulário, e quando aceitas receber
              comunicações) e para responder ao pedido que nos fazes. Podes retirar o consentimento a qualquer momento, sem
              prejuízo do que já foi feito.
            </p>
          </Secao>

          <Secao titulo="Os teus direitos">
            <p>
              Podes pedir-nos o acesso aos teus dados, a correção, o apagamento, a limitação ou a oposição ao tratamento, e a
              portabilidade quando se aplicar. Escreve para{" "}
              <a href={`mailto:${links.email}`} className="font-bold text-cyan-dark underline">
                {links.email}
              </a>{" "}
              e respondemos o mais depressa possível. Se achares que os teus direitos não foram respeitados, podes reclamar na{" "}
              <a href={CNPD} target="_blank" rel="noopener noreferrer" className="font-bold text-cyan-dark underline">
                Comissão Nacional de Proteção de Dados (CNPD) ↗
              </a>
              .
            </p>
          </Secao>

          <Secao id="cookies" titulo="Cookies e medição de visitas">
            <p>
              O próprio site <strong>não coloca cookies</strong> nem guarda informação no teu navegador para te seguir. Mas algumas
              páginas incorporam conteúdos de terceiros (vídeos do YouTube, publicações do Instagram e o formulário de donativos da
              EuPago), que podem colocar cookies e recolher dados quando os carregas. Nessas páginas, aplicam-se as regras desses
              serviços.
            </p>
            <p>
              Medimos as visitas com o Vercel Web Analytics, que conta páginas vistas, de onde vem a visita (por exemplo, uma rede
              social), tipo de aparelho e país, sem cookies e sem identificar quem visita. O alojamento (Vercel) regista, como
              qualquer servidor, os endereços de acesso durante um curto período por razões de segurança.
            </p>
            <p>
              As ligações para o Facebook, o Instagram, o WhatsApp e o site da Iniciativa Liberal levam-te para serviços de
              terceiros, que têm as suas próprias regras.
            </p>
          </Secao>

          <Secao titulo="Portal de dados (Dados da Trofa)">
            <p>
              Os{" "}
              <Link href="/dados" className="font-bold text-cyan-dark underline">
                dados da Trofa
              </Link>{" "}
              vêm de fontes públicas (INE, Pordata, Portal BASE, relatórios e deliberações do município). Nos contratos públicos, não
              mostramos o nome de pessoas singulares: aparecem como “Pessoa singular”, com ligação ao Portal BASE, onde o nome é
              público. Aparecem os nomes dos eleitos locais, porque exercem funções públicas. Se achas que algum dado teu não devia
              estar ali, escreve-nos.
            </p>
          </Secao>

          <Secao titulo="Alterações">
            <p>
              Se mudarmos alguma coisa no que fazemos com os dados (por exemplo, o serviço de envio), atualizamos esta página e a
              data no topo.
            </p>
          </Secao>
        </div>
      </article>
    </>
  );
}
