import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { links } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade e Cookies — Iniciativa Liberal Trofa",
  description: "Como o Núcleo da Trofa da Iniciativa Liberal trata os dados pessoais recolhidos neste site.",
};

const POLITICA_PARTIDO = "https://iniciativaliberal.pt/politica-de-privacidade-e-de-protecao-de-dados-pessoais/";
const COOKIES_PARTIDO = "https://iniciativaliberal.pt/politica-de-cookies/";
const CNPD = "https://www.cnpd.pt";
const EPD = "epd@liberal.pt";

const formularios: { nome: string; dados: string; para: string }[] = [
  {
    nome: "Faz-te membro (“Prefiro falar com alguém primeiro”)",
    dados: "Nome, telefone, email e freguesia (opcional).",
    para: "Contactar-te para explicar como aderir. A adesão em si faz-se no site da Iniciativa Liberal. Só se assinalares essa opção, à parte, passas também a receber comunicações da Iniciativa Liberal.",
  },
  { nome: "Tens uma ideia?", dados: "Nome, email, tema (opcional) e o texto da ideia.", para: "Ler a ideia e responder-te." },
  {
    nome: "Denúncia (problemas na rua, na freguesia…)",
    dados: "Freguesia, morada ou referência, descrição e, se quiseres, nome e contacto.",
    para: "Perceber o problema e encaminhá-lo para a entidade competente.",
  },
  { nome: "Convite para o grupo de WhatsApp", dados: "Nome e número de telefone.", para: "Enviar-te o convite para o grupo." },
  { nome: "Contacto através do site", dados: "Nome, email e a mensagem.", para: "Responder à tua mensagem." },
  {
    nome: "Encomendas da loja",
    dados: "Produto, tamanho e quantidade, nome e telemóvel ou email.",
    para: "Combinar contigo o pagamento e a entrega. O pagamento não se faz no site.",
  },
];

const indice: [string, string][] = [
  ["introducao", "Introdução"],
  ["responsavel", "Responsável pelo tratamento de dados pessoais"],
  ["principios", "Princípios"],
  ["consentimento", "Consentimento"],
  ["recolha", "Dados que recolhemos neste site"],
  ["finalidades", "Finalidades"],
  ["licitude", "Licitude do tratamento"],
  ["cookies", "Cookies e medição de visitas"],
  ["conservacao", "Prazo de conservação dos dados"],
  ["terceiros", "Subcontratantes e cedência de dados a terceiros"],
  ["direitos", "Direitos dos titulares dos dados"],
  ["epd", "Encarregado de Proteção de Dados"],
  ["autoridade", "Autoridade de controlo"],
  ["loja", "Loja e encomendas"],
  ["dados-trofa", "Portal Dados da Trofa"],
  ["responsabilidade", "Exoneração de responsabilidade"],
  ["reserva", "Direito de reserva"],
];

function Secao({ id, titulo, children }: { id: string; titulo: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-mist py-8 first:border-t-0 first:pt-0">
      <h2 className="font-display text-2xl font-bold text-navy">{titulo}</h2>
      <div className="mt-3 space-y-3 text-ink/80">{children}</div>
    </section>
  );
}

const ligacao = "font-bold text-cyan-dark underline";

export default function Privacidade() {
  return (
    <>
      <PageHero eyebrow="Privacidade" title="Política de Privacidade e Cookies">
        Como tratamos os dados pessoais que nos dás neste site.
      </PageHero>

      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <nav aria-label="Índice" className="rounded-2xl bg-mist p-5">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-dark">Índice</p>
          <ol className="mt-3 columns-1 gap-8 text-sm sm:columns-2">
            {indice.map(([id, titulo]) => (
              <li key={id} className="py-0.5">
                <a href={`#${id}`} className="text-navy underline-offset-2 hover:underline">
                  {titulo}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10">
          <Secao id="introducao" titulo="Introdução">
            <p>
              A Iniciativa Liberal (doravante, IL), inscrita no Tribunal Constitucional em 13 de dezembro de 2017, com a denominação
              Iniciativa Liberal e a sigla IL, conforme Acórdão n.º 826/2017, com sede na Avenida do Bessa, 158 E, 4100-012 Porto,
              pode ter necessidade de recolher e tratar dados pessoais no âmbito da sua atividade, incluindo através das páginas web
              que gere. Este site é gerido pelo Núcleo da Trofa da IL.
            </p>
            <p>
              Este documento explica o que acontece aos dados que nos fornecem através deste site, à luz do Regulamento Geral de
              Proteção de Dados (RGPD) e da Lei n.º 58/2019, de 8 de agosto. Para tudo o que respeita ao partido em geral, vale a{" "}
              <a href={POLITICA_PARTIDO} target="_blank" rel="noopener noreferrer" className={ligacao}>
                Política de Privacidade e de Proteção de Dados Pessoais da Iniciativa Liberal ↗
              </a>
              , que este documento acompanha.
            </p>
          </Secao>

          <Secao id="responsavel" titulo="Responsável pelo tratamento de dados pessoais">
            <p>
              Para efeitos dos artigos 4.º e 24.º do RGPD, o responsável pelo tratamento é a IL, com sede na Avenida do Bessa, 158 E,
              4100-012 Porto. As mensagens enviadas por este site chegam ao Núcleo da Trofa, no endereço{" "}
              <a href={`mailto:${links.email}`} className={ligacao}>
                {links.email}
              </a>
              .
            </p>
          </Secao>

          <Secao id="principios" titulo="Princípios">
            <p>
              Os princípios do artigo 5.º do RGPD aplicam-se a toda a informação relativa a uma pessoa singular identificada ou
              identificável. Tratamos os dados de forma restrita, limitando-nos ao necessário, adequado e pertinente para as nossas
              finalidades, e adotamos medidas de segurança adequadas.
            </p>
          </Secao>

          <Secao id="consentimento" titulo="Consentimento">
            <p>
              Os dados são fornecidos por ti, quando preenches e envias um formulário deste site. O consentimento dá-se nesse
              momento, por uma manifestação de vontade livre, específica, informada e explícita, para os fins indicados em cada
              formulário. Podes retirá-lo a qualquer momento, tão facilmente como o deste.
            </p>
            <p>
              Tratamos apenas os dados apropriados, relevantes e não excessivos para esses fins. Os campos marcados com * são
              necessários para podermos responder; os restantes são opcionais.
            </p>
          </Secao>

          <Secao id="recolha" titulo="Dados que recolhemos neste site">
            <p>Só recolhemos o que escreves nos formulários. Este site não tem contas nem registo de utilizadores.</p>
            <ul className="mt-2 space-y-3">
              {formularios.map((f) => (
                <li key={f.nome} className="rounded-xl bg-mist p-4 text-sm">
                  <p className="font-bold text-navy">{f.nome}</p>
                  <p className="mt-1">
                    <strong>Dados:</strong> {f.dados}
                  </p>
                  <p>
                    <strong>Para quê:</strong> {f.para}
                  </p>
                </li>
              ))}
            </ul>
            <p>
              Não pedimos dados especialmente sensíveis. Ainda assim, um pedido para aderir a um partido revela uma opção
              política: tratamos esses contactos com reserva e só para o fim indicado. Se escreveres dados sensíveis no texto (por exemplo, numa denúncia), usamo-los só para
              tratar o assunto que nos expões; evita incluir dados de terceiros que não sejam necessários. A denúncia por este
              formulário <strong>não é anónima</strong>: quem a recebe vê o que escreveste, mas podes deixar o nome e o contacto
              em branco.
            </p>
          </Secao>

          <Secao id="finalidades" titulo="Finalidades">
            <p>Os dados recolhidos neste site destinam-se a:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>tratar e responder a pedidos de contacto e de informação;</li>
              <li>contactar quem quer aderir à IL ou ser convidado para o grupo de WhatsApp do núcleo;</li>
              <li>enviar comunicações da IL a quem o tiver aceitado expressamente, à parte do pedido de contacto;</li>
              <li>ler as ideias que nos enviam e responder, quando pedido;</li>
              <li>receber, analisar e encaminhar denúncias para a entidade competente (por exemplo, a Câmara ou a Junta de Freguesia);</li>
              <li>combinar o pagamento e a entrega das encomendas da loja;</li>
              <li>gerir os donativos feitos através do formulário de donativos.</li>
            </ul>
            <p>
              O tratamento é feito no âmbito das finalidades para as quais os dados foram recolhidos ou de finalidades compatíveis.
            </p>
          </Secao>

          <Secao id="licitude" titulo="Licitude do tratamento">
            <p>Consoante o caso, o tratamento assenta:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                no <strong>consentimento</strong> (alínea a) do n.º 1 do artigo 6.º do RGPD), por exemplo nos pedidos de contacto,
                de adesão, de convite para o grupo de WhatsApp, nas ideias e nas denúncias;
              </li>
              <li>
                na <strong>execução de um contrato</strong> ou em diligências a pedido do titular (alínea b)), nas encomendas da
                loja;
              </li>
              <li>
                no <strong>cumprimento de obrigações jurídicas</strong> (alínea c)), por exemplo no processamento dos donativos e na
                prestação de contas do partido.
              </li>
            </ul>
            <p>
              A IL não adota decisões individuais automatizadas, incluindo definição de perfis, que produzam efeitos na tua esfera
              jurídica.
            </p>
          </Secao>

          <Secao id="cookies" titulo="Cookies e medição de visitas">
            <p>
              Os cookies são pequenos ficheiros que identificam o teu computador (não a ti) nos servidores. O próprio site{" "}
              <strong>não coloca cookies</strong> nem guarda informação no teu navegador para te seguir.
            </p>
            <p>
              Medimos as visitas com o <strong>Vercel Web Analytics</strong>, que conta páginas vistas, a origem da visita (por
              exemplo, uma rede social), o tipo de aparelho e o país, sem cookies e sem identificar quem visita. O alojamento
              (Vercel) regista, como qualquer servidor, os endereços de acesso durante um curto período, por razões de segurança.
            </p>
            <p>
              Algumas páginas incorporam conteúdos de terceiros, que podem colocar cookies e recolher dados quando os carregas: os
              vídeos do <strong>YouTube</strong>, as publicações do <strong>Instagram</strong> e o formulário de donativos da{" "}
              <strong>EuPago</strong>. Nesses casos aplicam-se as regras desses serviços. Se não quiseres, não carregues nesses
              conteúdos; o resto do site funciona na mesma. Podes também apagar ou bloquear cookies nas definições do teu
              navegador, o que pode afetar algumas funcionalidades desses serviços.
            </p>
            <p>
              Mais informação sobre os cookies no site do partido, na{" "}
              <a href={COOKIES_PARTIDO} target="_blank" rel="noopener noreferrer" className={ligacao}>
                Política de Cookies da Iniciativa Liberal ↗
              </a>
              .
            </p>
          </Secao>

          <Secao id="conservacao" titulo="Prazo de conservação dos dados">
            <p>
              Este site <strong>não guarda</strong> as mensagens: passa-as ao email do núcleo. Aí, os dados são conservados pelo
              prazo que resultar de normas legais ou regulamentares aplicáveis ou, não havendo exigência específica, pelo período
              necessário para a finalidade que motivou a recolha, findo o qual são eliminados.
            </p>
            <p>
              Podem ser conservados enquanto não decorrer o prazo de prescrição dos respetivos direitos, para comprovar o
              cumprimento de obrigações, e para fins de arquivo de interesse público, investigação histórica ou estatística, com
              medidas adequadas à salvaguarda dos teus direitos.
            </p>
          </Secao>

          <Secao id="terceiros" titulo="Subcontratantes e cedência de dados a terceiros">
            <p>
              A IL não vende nem cede os teus dados a terceiros, exceto quando seja necessário para prestar o serviço que pediste ou
              para cumprir obrigações legais e regulamentares. Para entregar as mensagens deste site recorremos a um{" "}
              <strong>serviço de envio de email</strong> (hoje o FormSubmit ou o Resend), que as recebe apenas para as reencaminhar
              para o núcleo e que pode estar fora da União Europeia. Nos donativos, os dados de pagamento são tratados pela{" "}
              <strong>EuPago</strong> e pela IL; este site não os recebe nem os guarda.
            </p>
            <p>
              Se o envio da mensagem falhar, o site prepara-a para a enviares tu, pelo teu programa de email. Nesse caso ela só
              passa pelo teu fornecedor de email.
            </p>
            <p>
              No exercício das suas atribuições como partido, a IL pode ter de ceder informações pessoais a outras entidades, como
              tribunais, a Entidade das Contas e Financiamentos Políticos, câmaras municipais, juntas de freguesia e outras
              instituições públicas. Por exemplo, uma denúncia pode ser encaminhada para a Câmara ou para a Junta, sem o teu nome
              se não nos autorizares a incluí-lo.
            </p>
            <p>
              Quando há transferência de dados para fora da União Europeia, a IL apoia-se numa decisão de adequação da Comissão
              Europeia ou, na falta dela, em garantias adequadas (como as cláusulas contratuais-tipo).
            </p>
          </Secao>

          <Secao id="direitos" titulo="Direitos dos titulares dos dados">
            <p>Enquanto titular dos dados, tens direito a:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <strong>acesso:</strong> saber se tratamos os teus dados, aceder-lhes e obter cópia;
              </li>
              <li>
                <strong>retificação:</strong> corrigir ou completar dados incorretos ou incompletos;
              </li>
              <li>
                <strong>apagamento:</strong> pedir que os dados sejam apagados, nos casos previstos na lei;
              </li>
              <li>
                <strong>limitação do tratamento:</strong> pedir que o tratamento seja suspenso em certas situações;
              </li>
              <li>
                <strong>portabilidade:</strong> receber os dados que nos deste num formato estruturado e de leitura automática;
              </li>
              <li>
                <strong>oposição</strong> ao tratamento, por motivos relacionados com a tua situação particular;
              </li>
              <li>
                <strong>retirar o consentimento</strong> a qualquer momento, sem prejuízo do que já foi feito;
              </li>
              <li>
                <strong>não ficar sujeito a decisões individuais automatizadas.</strong>
              </li>
            </ul>
            <p>
              Podes exercê-los por email, para o Encarregado de Proteção de Dados da IL (
              <a href={`mailto:${EPD}`} className={ligacao}>
                {EPD}
              </a>
              ) ou para o núcleo (
              <a href={`mailto:${links.email}`} className={ligacao}>
                {links.email}
              </a>
              ). Respondemos no prazo de um mês, que pode ser prorrogado até dois meses quando o pedido for complexo; avisamos se
              isso acontecer. Podemos pedir informação para confirmar a tua identidade, por segurança. O exercício destes direitos
              pode ser limitado por direitos de terceiros, obrigações legais ou interesses legítimos prevalecentes.
            </p>
          </Secao>

          <Secao id="epd" titulo="Encarregado de Proteção de Dados">
            <p>
              A IL tem um Encarregado de Proteção de Dados (EPD), com o estatuto e as funções dos artigos 38.º e 39.º do RGPD e dos
              artigos 9.º a 11.º da Lei n.º 58/2019. Contacto:{" "}
              <a href={`mailto:${EPD}`} className={ligacao}>
                {EPD}
              </a>
              .
            </p>
          </Secao>

          <Secao id="autoridade" titulo="Autoridade de controlo">
            <p>
              Tens o direito de reclamar junto da autoridade de controlo, a Comissão Nacional de Proteção de Dados, Av. D. Carlos I,
              134, 1.º, 1200-651 Lisboa (
              <a href={CNPD} target="_blank" rel="noopener noreferrer" className={ligacao}>
                www.cnpd.pt ↗
              </a>
              ). Em caso de violação de dados pessoais, a IL notifica a CNPD e, se houver risco elevado, os titulares afetados.
            </p>
          </Secao>

          <Secao id="loja" titulo="Loja e encomendas">
            <p>
              O vendedor dos artigos da loja é a Iniciativa Liberal, partido político com sede na Avenida do Bessa, 158 E,
              4100-012 Porto. As encomendas feitas neste site são tratadas pelo Núcleo da Trofa: depois de receber o pedido,
              o núcleo contacta-te para combinar o pagamento e a entrega. O pagamento não se faz no site e as receitas
              entram nas contas do partido, que emite o respetivo comprovativo.
            </p>
            <p>
              Se o artigo tiver defeito ou não for o que pediste, escreve para{" "}
              <a href={`mailto:${links.email}`} className={ligacao}>
                {links.email}
              </a>{" "}
              e trocamo-lo ou devolvemos o valor. Nas compras feitas à distância tens ainda o direito de devolução no prazo
              de 14 dias depois da entrega, previsto na lei.
            </p>
          </Secao>

          <Secao id="dados-trofa" titulo="Portal Dados da Trofa">
            <p>
              Os{" "}
              <Link href="/dados" className={ligacao}>
                Dados da Trofa
              </Link>{" "}
              vêm de fontes públicas (INE, Pordata, Portal BASE, relatórios e deliberações do município). Nos contratos públicos não
              mostramos o nome de pessoas singulares: aparecem como “Pessoa singular”, com ligação ao Portal BASE, onde o nome é
              público. Aparecem os nomes dos eleitos locais, porque exercem funções públicas. Se achas que algum dado teu não devia
              estar ali, escreve-nos.
            </p>
          </Secao>

          <Secao id="responsabilidade" titulo="Exoneração de responsabilidade">
            <p>
              A IL não pode ser responsabilizada por danos decorrentes da utilização, correta ou incorreta, deste site e dos seus
              conteúdos, incluindo o acesso indevido ao computador do utilizador por terceiros. O site tem conteúdos e serviços de
              entidades terceiras, que lhes cabe atualizar, e ligações para sítios sobre os quais não temos controlo nem
              assumimos responsabilidade.
            </p>
            <p>
              A leitura de disposições legais neste documento não dispensa a consulta das normas oficialmente publicadas, em
              particular no Diário da República e no Jornal Oficial da União Europeia.
            </p>
          </Secao>

          <Secao id="reserva" titulo="Direito de reserva">
            <p>
              A IL reserva-se o direito de atualizar este documento a qualquer momento. Convém consultá-lo com regularidade; as
              alterações que afetem os teus direitos ou interesses serão divulgadas.
            </p>
            <p className="text-sm text-ink/60">Última revisão: 11 de novembro de 2026.</p>
          </Secao>
        </div>
      </article>
    </>
  );
}
