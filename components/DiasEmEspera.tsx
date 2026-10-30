"use client";

import { useSyncExternalStore } from "react";
import { diasDesde } from "@/lib/metro";

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60 * 60 * 1000);
  return () => clearInterval(id);
}

// Contador de dias à espera do metro. `inicial` é o valor calculado no servidor
// (evita diferenças na hidratação); no browser passa a usar a data de hoje.
export default function DiasEmEspera({ desde, inicial }: { desde: string; inicial: number }) {
  const dias = useSyncExternalStore(
    subscribe,
    () => diasDesde(desde),
    () => inicial,
  );
  const anos = Math.floor(dias / 365.25);

  return (
    <div>
      <p
        className="font-display text-7xl font-bold leading-none text-pink sm:text-8xl"
        aria-label={`${dias} dias`}
      >
        {dias.toLocaleString("pt-PT")}
      </p>
      <p className="font-display mt-2 text-2xl font-bold text-navy">dias à espera do metro</p>
      <p className="mt-1 text-ink/70">mais de {anos} anos, desde fevereiro de 2002</p>
    </div>
  );
}
