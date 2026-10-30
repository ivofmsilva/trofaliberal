"use client";

import { useEffect, useRef, useState } from "react";
import { diasDesde } from "@/lib/metro";

const HORA = 3_600_000;
const DIA = 24 * HORA;

const dois = (n: number) => String(n).padStart(2, "0");

// Contador de dias à espera do metro. `inicial` é o valor calculado no servidor
// (evita diferenças na hidratação). No browser, o número sobe até ao valor real quando
// aparece no ecrã e depois passa a contar as horas, minutos e segundos em direto.
export default function DiasEmEspera({ desde, inicial }: { desde: string; inicial: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [agora, setAgora] = useState<number | null>(null);
  const [animado, setAnimado] = useState<number | null>(null);

  useEffect(() => {
    const arranque = setTimeout(() => setAgora(Date.now()), 0);
    const id = setInterval(() => setAgora(Date.now()), 1000);
    return () => {
      clearTimeout(arranque);
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const alvo = diasDesde(desde);
        const t0 = Date.now();
        const duracao = 2400;
        timer = setInterval(() => {
          const p = Math.min((Date.now() - t0) / duracao, 1);
          setAnimado(p < 1 ? Math.round(alvo * (1 - Math.pow(1 - p, 3))) : null);
          if (p >= 1) clearInterval(timer);
        }, 40);
      },
      { threshold: 0.6 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      clearInterval(timer);
    };
  }, [desde]);

  const dias = agora === null ? inicial : diasDesde(desde, agora);
  const anos = Math.floor(dias / 365.25);

  let relogio = "";
  if (agora !== null) {
    const resto = (agora - new Date(`${desde}T00:00:00`).getTime()) % DIA;
    relogio = `${dois(Math.floor(resto / HORA))} h ${dois(Math.floor((resto % HORA) / 60_000))} min ${dois(
      Math.floor((resto % 60_000) / 1000),
    )} s`;
  }

  return (
    <div ref={ref}>
      <p
        className="font-display text-7xl font-bold leading-none tabular-nums text-pink sm:text-8xl"
        aria-label={`${dias} dias`}
      >
        <span aria-hidden>{(animado ?? dias).toLocaleString("pt-PT")}</span>
      </p>
      <p className="font-display mt-2 text-2xl font-bold text-navy">dias à espera do metro</p>
      <p
        aria-hidden
        className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-bold tabular-nums text-navy shadow-sm"
      >
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-pink" />
        {relogio ? `e a contar: ${relogio}` : "e a contar…"}
      </p>
      <p className="mt-3 text-ink/70">mais de {anos} anos, desde fevereiro de 2002</p>
    </div>
  );
}
