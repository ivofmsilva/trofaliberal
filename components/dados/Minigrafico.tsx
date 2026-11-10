// Linha pequena de evolução, só desenho (sem texto).
export default function Minigrafico({ pontos, largura = 120, altura = 36 }: { pontos: number[]; largura?: number; altura?: number }) {
  if (pontos.length < 3) return null;
  const min = Math.min(...pontos);
  const max = Math.max(...pontos);
  const margem = 3;
  const dx = (largura - margem * 2) / (pontos.length - 1);
  const escala = max === min ? 0 : (altura - margem * 2) / (max - min);
  const xy = pontos.map((p, i) => [margem + i * dx, altura - margem - (p - min) * escala] as const);
  const linha = xy.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const [ux, uy] = xy[xy.length - 1];
  return (
    <svg width={largura} height={altura} viewBox={`0 0 ${largura} ${altura}`} aria-hidden className="shrink-0">
      <path d={linha} fill="none" stroke="#9a9a96" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={ux} cy={uy} r="2.5" fill="#151515" />
    </svg>
  );
}
