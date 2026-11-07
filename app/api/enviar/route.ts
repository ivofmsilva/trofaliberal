import { NextResponse } from "next/server";
import { links } from "@/lib/site";

// Recebe as mensagens dos formulários do site e envia-as por email ao núcleo.
// O destinatário é sempre links.email: o pedido nunca escolhe para onde vai.
//
// Serviço de envio:
//  - com RESEND_API_KEY (e, se houver domínio próprio, RESEND_FROM) usa o Resend;
//  - sem chave usa o FormSubmit, que não precisa de conta: a primeira mensagem enviada
//    pede, por email, para ativar o endereço (é só clicar na ligação).
// Em ambos os casos o site não guarda as mensagens.

const JANELA_MS = 10 * 60_000;
const MAXIMO_POR_JANELA = 5;
const tentativas = new Map<string, number[]>();

function limitado(ip: string) {
  const agora = Date.now();
  const recentes = (tentativas.get(ip) ?? []).filter((t) => agora - t < JANELA_MS);
  recentes.push(agora);
  tentativas.set(ip, recentes);
  return recentes.length > MAXIMO_POR_JANELA;
}

type Pedido = { assunto?: unknown; texto?: unknown; nome?: unknown; email?: unknown; hp?: unknown };

export async function POST(req: Request) {
  let corpo: Pedido;
  try {
    corpo = await req.json();
  } catch {
    return NextResponse.json({ erro: "Pedido inválido." }, { status: 400 });
  }

  // Campo escondido: só os robôs o preenchem. Finge que correu bem.
  if (corpo.hp) return NextResponse.json({ ok: true });

  const assunto = String(corpo.assunto ?? "").trim().slice(0, 200);
  const texto = String(corpo.texto ?? "").trim();
  const nome = String(corpo.nome ?? "").trim().slice(0, 120);
  const email = String(corpo.email ?? "").trim().slice(0, 200);
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!assunto || texto.length < 3 || texto.length > 8000) {
    return NextResponse.json({ erro: "Mensagem inválida." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "desconhecido";
  if (limitado(ip)) {
    return NextResponse.json({ erro: "Demasiadas mensagens seguidas. Tenta daqui a pouco." }, { status: 429 });
  }

  try {
    const chave = process.env.RESEND_API_KEY;
    const r = chave
      ? await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${chave}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: process.env.RESEND_FROM ?? "IL Trofa <onboarding@resend.dev>",
            to: [links.email],
            subject: assunto,
            text: texto,
            ...(emailValido ? { reply_to: email } : {}),
          }),
        })
      : await fetch(`${process.env.FORMSUBMIT_URL ?? "https://formsubmit.co/ajax"}/${links.email}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: assunto,
            _captcha: "false",
            _template: "box",
            name: nome || "Visitante do site",
            ...(emailValido ? { email } : {}),
            message: texto,
          }),
        });

    if (!r.ok) {
      const resposta = await r.text().catch(() => "");
      throw new Error(`${r.status} ${resposta.slice(0, 300)}`);
    }
    if (!chave) {
      const j = await r.json().catch(() => null);
      if (j && (j.success === false || j.success === "false")) throw new Error("O serviço recusou a mensagem");
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    // O detalhe vem do serviço de envio (nunca inclui a chave) e ajuda a perceber o que falhou.
    const detalhe = e instanceof Error ? e.message : "erro desconhecido";
    console.error("Falha no envio do formulário:", detalhe);
    return NextResponse.json(
      { erro: "Não foi possível enviar agora.", via: process.env.RESEND_API_KEY ? "resend" : "formsubmit", detalhe },
      { status: 502 },
    );
  }
}
