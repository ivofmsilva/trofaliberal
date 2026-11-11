"use client";

import { useRef } from "react";
import MailForm, { type Field } from "@/components/MailForm";
import { links } from "@/lib/site";

// Botão "Encomendar": abre uma janela com um pequeno formulário (tamanho, quantidade, nome e
// contacto) que envia o pedido ao núcleo por email, sem depender do programa de email de quem
// encomenda. Se o envio falhar, o formulário oferece o email como alternativa.
export default function OrderButton({
  produto,
  tamanhos,
  tamanhoLabel = "Tamanho",
  compacto = false,
}: {
  produto: string;
  tamanhos?: string[];
  tamanhoLabel?: string;
  compacto?: boolean;
}) {
  const janela = useRef<HTMLDialogElement>(null);

  const campos: Field[] = [
    ...(tamanhos
      ? [{ name: "tamanho", label: `${tamanhoLabel} *`, type: "select" as const, required: true, options: tamanhos, placeholder: "Escolhe o tamanho" }]
      : []),
    { name: "quantidade", label: "Quantidade *", type: "number", required: true, valorInicial: "1" },
    { name: "nome", label: "Nome *", required: true },
    { name: "contacto", label: "Telemóvel ou email *", required: true },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => janela.current?.showModal()}
        className={`rounded-full bg-pink font-bold text-white transition hover:bg-navy ${compacto ? "px-4 py-1.5 text-sm" : "px-4 py-2 text-sm sm:px-6 sm:py-2.5 sm:text-base"}`}
      >
        Encomendar
      </button>

      <dialog
        ref={janela}
        aria-label={`Encomendar: ${produto}`}
        onClick={(e) => {
          if (e.target === janela.current) janela.current?.close();
        }}
        className="m-auto w-[min(92vw,28rem)] rounded-2xl p-0 text-ink backdrop:bg-black/50"
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl font-bold leading-tight text-navy">Encomendar: {produto}</h3>
            <button
              type="button"
              onClick={() => janela.current?.close()}
              aria-label="Fechar"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-xl text-ink/60 transition hover:bg-mist hover:text-navy"
            >
              ✕
            </button>
          </div>
          <p className="mb-5 mt-2 text-sm text-ink/70">
            Deixa os teus dados e o núcleo entra em contacto contigo para combinar o pagamento e a entrega.
          </p>
          <MailForm
            to={links.email}
            subject={`Encomenda: ${produto}`}
            intro={`Produto: ${produto}`}
            submitLabel="Enviar encomenda"
            consent="Autorizo o núcleo da Iniciativa Liberal da Trofa a usar o meu nome e contacto apenas para tratar desta encomenda."
            fields={campos}
          />
        </div>
      </dialog>
    </>
  );
}
