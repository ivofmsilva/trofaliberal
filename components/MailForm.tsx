"use client";

import { useId, useState } from "react";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select" | "number";
  required?: boolean;
  options?: string[];
  // Texto da primeira opção de uma lista (por defeito, "Escolhe um tema").
  placeholder?: string;
  // Valor com que o campo começa.
  valorInicial?: string;
};

const inputClass =
  "mt-1 w-full rounded-lg border-2 border-mist bg-white px-4 py-3 text-ink outline-none transition focus:border-cyan";

type Pronto = { mailto: string; gmail: string; texto: string };

// Envia a mensagem para o núcleo por email, através de /api/enviar (o site não a guarda).
// Se o envio falhar, cai no que havia antes: prepara a mensagem e abre o programa de email
// do utilizador, com "Abrir no Gmail" e "Copiar texto" para quem não tem programa configurado.
// Não é possível anexar ficheiros por aqui: com `anexos`, avisa-se o utilizador para os anexar
// ao email (ou enviar para o mesmo endereço).
export default function MailForm({
  to,
  subject,
  fields,
  consent,
  submitLabel,
  anexos,
  intro,
}: {
  to: string;
  subject: string;
  fields: Field[];
  consent?: React.ReactNode;
  submitLabel: string;
  anexos?: boolean;
  // Linha(s) que vão no início da mensagem (por exemplo, o produto de uma encomenda).
  intro?: string;
}) {
  const uid = useId();
  const [pronto, setPronto] = useState<Pronto | null>(null);
  const [copiado, setCopiado] = useState(false);
  const [estado, setEstado] = useState<"parado" | "a-enviar" | "enviado">("parado");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    let body = (intro ? `${intro}\n` : "") + fields
      .map((f) => `${f.label.replace(" *", "")}: ${String(data.get(f.name) ?? "").trim()}`)
      .join("\n");
    // O aviso sobre anexos só serve quando a mensagem é preparada no programa de email de quem escreve.
    const textoEnviado = body;
    if (anexos) body += "\n\n(Se tiveres fotos ou documentos, anexa-os a este email.)";
    const assunto = String(data.get("assunto") ?? "").trim() || subject;
    const mailto = `mailto:${to}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(body)}`;
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(assunto)}&body=${encodeURIComponent(body)}`;
    const alternativa = { mailto, gmail, texto: `Para: ${to}\nAssunto: ${assunto}\n\n${body}` };
    setCopiado(false);
    setPronto(null);
    setEstado("a-enviar");
    try {
      const r = await fetch("/api/enviar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assunto,
          texto: textoEnviado,
          nome: String(data.get("nome") ?? ""),
          email: String(data.get("email") ?? ""),
          hp: String(data.get("site") ?? ""),
        }),
      });
      if (!r.ok) throw new Error("falhou");
      setEstado("enviado");
      form.reset();
    } catch {
      setEstado("parado");
      setPronto(alternativa);
      window.location.href = mailto;
    }
  }

  async function copiar() {
    if (!pronto) return;
    try {
      await navigator.clipboard.writeText(pronto.texto);
      setCopiado(true);
    } catch {
      setCopiado(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Armadilha para robôs: as pessoas não veem nem preenchem. */}
      <input type="text" name="site" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={`${uid}-${f.name}`} className="text-sm font-bold text-navy">
            {f.label}
          </label>
          {f.type === "textarea" ? (
            <textarea id={`${uid}-${f.name}`} name={f.name} rows={5} required={f.required} className={inputClass} />
          ) : f.type === "select" ? (
            <select id={`${uid}-${f.name}`} name={f.name} required={f.required} className={inputClass} defaultValue={f.valorInicial ?? ""}>
              <option value="">{f.placeholder ?? "Escolhe um tema"}</option>
              {f.options?.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={`${uid}-${f.name}`}
              name={f.name}
              type={f.type ?? "text"}
              required={f.required}
              defaultValue={f.valorInicial}
              min={f.type === "number" ? 1 : undefined}
              inputMode={f.type === "number" ? "numeric" : undefined}
              className={inputClass}
            />
          )}
        </div>
      ))}
      {consent && (
        <label className="flex items-start gap-3 text-sm text-ink/75">
          <input type="checkbox" required className="mt-1 h-4 w-4 accent-cyan" />
          <span>{consent}</span>
        </label>
      )}
      <button
        type="submit"
        disabled={estado === "a-enviar"}
        className="rounded-full bg-pink px-8 py-3 font-bold text-white transition hover:bg-navy hover:text-white disabled:opacity-60"
      >
        {estado === "a-enviar" ? "A enviar…" : submitLabel}
      </button>
      <p className="text-xs text-ink/60">
        A mensagem segue por email para o núcleo, através de um serviço de envio. O site não a guarda.
      </p>

      {estado === "enviado" && (
        <div role="status" className="rounded-2xl bg-mist p-5 text-ink/85">
          <p className="font-bold text-navy">Mensagem enviada. Obrigado!</p>
          <p className="mt-1 text-sm">O núcleo recebeu a tua mensagem e responde assim que possível.</p>
        </div>
      )}

      {pronto && (
        <div role="status" className="space-y-3 rounded-2xl bg-mist p-5 text-sm text-ink/85">
          <p className="font-bold text-navy">Não conseguimos enviar a mensagem por aqui.</p>
          <p>
            Abrimos o teu programa de email com a mensagem pronta para <strong>{to}</strong>. Se não
            abriu, usa uma destas opções:
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={pronto.gmail}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-navy px-5 py-2 font-bold text-white transition hover:bg-pink"
            >
              Abrir no Gmail ↗
            </a>
            <a
              href={pronto.mailto}
              className="rounded-full border-2 border-navy px-5 py-2 font-bold text-navy transition hover:bg-navy hover:text-white"
            >
              Abrir no programa de email
            </a>
            <button
              type="button"
              onClick={copiar}
              className="rounded-full border-2 border-navy px-5 py-2 font-bold text-navy transition hover:bg-navy hover:text-white"
            >
              {copiado ? "Copiado ✓" : "Copiar texto"}
            </button>
          </div>
          <p>
            Com o texto copiado, podes colá-lo num email para <strong>{to}</strong> em qualquer
            aplicação.
          </p>
          {anexos && (
            <p className="rounded-lg bg-white p-3">
              <strong>Fotos ou documentos?</strong> Anexa-os ao email antes de o enviar. Se não
              conseguires, envia-os para <strong>{to}</strong> a indicar a freguesia e a morada.
            </p>
          )}
        </div>
      )}
    </form>
  );
}
