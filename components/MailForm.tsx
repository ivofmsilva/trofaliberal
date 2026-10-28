"use client";

import { useState } from "react";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  options?: string[];
};

const inputClass =
  "mt-1 w-full rounded-lg border-2 border-mist bg-white px-4 py-3 text-ink outline-none transition focus:border-cyan";

type Pronto = { mailto: string; gmail: string; texto: string };

// Sem servidor de email: o formulário prepara a mensagem e abre o programa de email
// do utilizador, dirigida ao núcleo. Como nem toda a gente tem um programa de email
// configurado, mostra também "Abrir no Gmail" e "Copiar texto". Nada é guardado nem
// enviado para terceiros. Não é possível anexar ficheiros por aqui: com `anexos`,
// avisa-se o utilizador para os anexar ao email (ou enviar para o mesmo endereço).
export default function MailForm({
  to,
  subject,
  fields,
  consent,
  submitLabel,
  anexos,
}: {
  to: string;
  subject: string;
  fields: Field[];
  consent?: React.ReactNode;
  submitLabel: string;
  anexos?: boolean;
}) {
  const [pronto, setPronto] = useState<Pronto | null>(null);
  const [copiado, setCopiado] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let body = fields
      .map((f) => `${f.label.replace(" *", "")}: ${String(data.get(f.name) ?? "").trim()}`)
      .join("\n");
    if (anexos) body += "\n\n(Se tiveres fotos ou documentos, anexa-os a este email.)";
    const assunto = String(data.get("assunto") ?? "").trim() || subject;
    const mailto = `mailto:${to}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(body)}`;
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(assunto)}&body=${encodeURIComponent(body)}`;
    setPronto({ mailto, gmail, texto: `Para: ${to}\nAssunto: ${assunto}\n\n${body}` });
    setCopiado(false);
    window.location.href = mailto;
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
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="text-sm font-bold text-navy">
            {f.label}
          </label>
          {f.type === "textarea" ? (
            <textarea id={f.name} name={f.name} rows={5} required={f.required} className={inputClass} />
          ) : f.type === "select" ? (
            <select id={f.name} name={f.name} required={f.required} className={inputClass} defaultValue="">
              <option value="">Escolhe um tema</option>
              {f.options?.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={f.name}
              name={f.name}
              type={f.type ?? "text"}
              required={f.required}
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
        className="rounded-full bg-pink px-8 py-3 font-bold text-white transition hover:bg-navy hover:text-white"
      >
        {submitLabel}
      </button>

      {pronto && (
        <div role="status" className="space-y-3 rounded-2xl bg-mist p-5 text-sm text-ink/85">
          <p className="font-bold text-navy">Está quase! Falta só enviares o email.</p>
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
