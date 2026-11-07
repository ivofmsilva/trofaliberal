// Edifício a subir piso a piso, com uma grua e uma bandeira no fim. Desenho próprio em SVG;
// os tempos estão em app/globals.css (classes obra-*).
const pisos = [0, 1, 2, 3, 4];

export default function ObraAnimada() {
  return (
    <figure className="w-full max-w-md">
      <svg
        viewBox="0 0 420 300"
        role="img"
        aria-label="Um edifício a ser construído piso a piso por uma grua, com uma bandeira no topo"
        className="w-full"
      >
        {/* chão */}
        <rect x="10" y="272" width="400" height="8" rx="4" fill="#fff" opacity="0.35" />

        {/* edifício: cada piso sobe à sua vez */}
        {pisos.map((i) => (
          <g key={i} className={`obra-piso-${i}`}>
            <rect x="80" y={232 - i * 40} width="170" height="38" rx="3" fill="#fff" opacity={0.95 - i * 0.08} />
            {[0, 1, 2].map((j) => (
              <rect
                key={j}
                x={96 + j * 50}
                y={242 - i * 40}
                width="26"
                height="18"
                rx="2"
                fill={(i + j) % 4 === 0 ? "#ffd500" : "#0a4fa0"}
              />
            ))}
          </g>
        ))}

        {/* bandeira no topo */}
        <g className="obra-bandeira">
          <line x1="165" y1="72" x2="165" y2="34" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <path d="M165 34 L202 43 L165 52 Z" fill="#e6007e" />
        </g>

        {/* grua */}
        <g stroke="#ffd500" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="318" y="34" width="12" height="238" />
          {[58, 106, 154, 202, 250].map((y) => (
            <path key={y} d={`M318 ${y} L330 ${y + 24} M330 ${y} L318 ${y + 24}`} strokeWidth="2" />
          ))}
          <line x1="324" y1="12" x2="190" y2="34" strokeWidth="2" />
          <line x1="324" y1="12" x2="388" y2="34" strokeWidth="2" />
        </g>
        <rect x="322" y="12" width="4" height="22" fill="#ffd500" />
        <rect x="180" y="34" width="215" height="8" rx="2" fill="#ffd500" />
        <rect x="362" y="42" width="30" height="16" rx="2" fill="#fff" opacity="0.9" />

        {/* carga pendurada */}
        <g className="obra-carga">
          <line x1="272" y1="42" x2="272" y2="96" stroke="#fff" strokeWidth="2" />
          <rect x="264" y="96" width="16" height="9" rx="2" fill="#ffd500" />
          <rect x="250" y="106" width="44" height="9" rx="2" fill="#fff" />
        </g>
      </svg>
      <figcaption className="font-display mt-3 text-center text-2xl font-black uppercase leading-tight text-sun sm:text-3xl">
        Liberal faz construir Portugal!
      </figcaption>
    </figure>
  );
}
