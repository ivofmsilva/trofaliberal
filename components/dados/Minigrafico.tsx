// Linha pequena de evolução, só desenho (sem texto): a Trofa a violeta e, se houver, Trofa e vizinhos (os 8 concelhos) a cinzento tracejado.
// Quando os dois não têm a mesma ordem de grandeza (o grupo é uma soma), desenham-se como índice (primeiro valor = 100),
// para se comparar a evolução e não o tamanho.
export default function Minigrafico({
  pontos,
  grupo,
  mesmaEscala = false,
  largura = 120,
  altura = 36,
}: {
  pontos: (number | null)[];
  grupo?: (number | null)[];
  mesmaEscala?: boolean;
  largura?: number;
  altura?: number;
}) {
  const indice = (s: (number | null)[]) => {
    const base = s.find((v) => v !== null && v !== 0);
    return s.map((v) => (v === null || !base ? null : (v / base) * 100));
  };
  const temGrupo = Boolean(grupo && grupo.filter((v) => v !== null).length >= 3);
  const t = temGrupo && !mesmaEscala ? indice(pontos) : pontos;
  const g = temGrupo && grupo ? (mesmaEscala ? grupo : indice(grupo)) : [];
  if (t.filter((v) => v !== null).length < 3) return null;
  const todos = [...t, ...g].filter((v): v is number => v !== null);
  const min = Math.min(...todos);
  const max = Math.max(...todos);
  const margem = 3;
  const dx = (largura - margem * 2) / (Math.max(t.length, 2) - 1);
  const escala = max === min ? 0 : (altura - margem * 2) / (max - min);
  const Y = (v: number) => altura - margem - (v - min) * escala;
  const caminho = (s: (number | null)[]) => {
    let d = "";
    let aberto = false;
    s.forEach((v, i) => {
      if (v === null) {
        aberto = false;
        return;
      }
      d += `${aberto ? "L" : "M"}${(margem + i * dx).toFixed(1)} ${Y(v).toFixed(1)} `;
      aberto = true;
    });
    return d;
  };
  let ult = t.length - 1;
  while (ult > 0 && t[ult] === null) ult--;
  return (
    <svg width={largura} height={altura} viewBox={`0 0 ${largura} ${altura}`} aria-hidden className="shrink-0">
      {temGrupo && (
        <path d={caminho(g)} fill="none" stroke="var(--cmp-2)" strokeWidth="1.5" strokeDasharray="4 3" strokeLinejoin="round" strokeLinecap="round" />
      )}
      <path d={caminho(t)} fill="none" stroke="var(--trofa)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={margem + ult * dx} cy={Y(t[ult] as number)} r="3" fill="var(--trofa)" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}
