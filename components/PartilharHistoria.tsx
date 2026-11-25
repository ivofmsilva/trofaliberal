"use client";

import { useEffect, useRef, useState } from "react";

// Botão para partilhar uma imagem vertical (1080×1920) na história do Instagram: no telemóvel abre o menu de partilha
// com a imagem (escolhe-se Instagram → História); no computador descarrega a imagem. A imagem é carregada antes do
// toque, porque alguns telemóveis (iPhone) só deixam abrir o menu de partilha logo a seguir ao toque.
export default function PartilharHistoria({ src, nome, titulo, endereco }: { src: string; nome: string; titulo: string; endereco: string }) {
  const ficheiro = useRef<File | null>(null);
  const [estado, setEstado] = useState<"" | "erro" | "descarregada">("");

  useEffect(() => {
    let ativo = true;
    fetch(src)
      .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(String(r.status)))))
      .then((b) => {
        if (ativo) ficheiro.current = new File([b], nome, { type: b.type || "image/png" });
      })
      .catch(() => {});
    return () => {
      ativo = false;
    };
  }, [src, nome]);

  async function partilhar() {
    setEstado("");
    try {
      let f = ficheiro.current;
      if (!f) {
        const b = await fetch(src).then((r) => r.blob());
        f = new File([b], nome, { type: b.type || "image/png" });
      }
      if (navigator.canShare?.({ files: [f] })) {
        await navigator.share({ files: [f], title: titulo });
        return;
      }
      const a = document.createElement("a");
      a.href = URL.createObjectURL(f);
      a.download = nome;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      setEstado("descarregada");
    } catch (e) {
      if ((e as Error).name !== "AbortError") setEstado("erro");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={partilhar}
        className="rounded-full bg-pink px-7 py-3 font-bold text-white transition hover:bg-navy"
      >
        Partilhar na história do Instagram
      </button>
      <p className="mt-2 max-w-xl text-sm text-ink/70">
        {estado === "erro"
          ? "Não foi possível abrir a partilha. Tenta outra vez."
          : estado === "descarregada"
            ? "A imagem foi descarregada: publica-a na história a partir do telemóvel."
            : `No telemóvel, escolhe Instagram → História. Para a ligação, junta o autocolante «Link» com ${endereco}.`}
      </p>
    </div>
  );
}
