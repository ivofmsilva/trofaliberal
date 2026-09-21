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

// Sem servidor de email: o formulário abre o cliente de email do utilizador
// com a mensagem preenchida, dirigida ao núcleo.
export default function MailForm({
  to,
  subject,
  fields,
  consent,
  submitLabel,
}: {
  to: string;
  subject: string;
  fields: Field[];
  consent?: React.ReactNode;
  submitLabel: string;
}) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = fields
      .map((f) => `${f.label.replace(" *", "")}: ${String(data.get(f.name) ?? "").trim()}`)
      .join("\n");
    const assunto = String(data.get("assunto") ?? "").trim() || subject;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(body)}`;
    setSent(true);
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
      {sent && (
        <p role="status" className="text-sm text-ink/70">
          Abrimos o teu programa de email com a mensagem preenchida. Basta enviares.
        </p>
      )}
    </form>
  );
}
