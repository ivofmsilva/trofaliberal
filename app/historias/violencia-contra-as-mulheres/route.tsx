// Imagem para a história do Instagram do Dia contra a Violência sobre as Mulheres (25 de novembro): a mensagem e os
// números de ajuda, sobre o laranja da campanha da ONU. As áreas de cima e de baixo ficam livres (perfil e resposta).
import { ImageResponse } from "next/og";
import { fontesHistoria, logoHistoria, TAMANHO_HISTORIA } from "@/lib/historia";

export const revalidate = 86400;

const numeros = [
  ["800 202 148", "Gratuito, confidencial, 24 horas"],
  ["SMS 3060", "Se não puderes ligar"],
  ["112", "Em perigo"],
];

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "250px 80px 260px",
          background: "linear-gradient(165deg, #f6a03a 0%, #ee7a22 45%, #d9531a 100%)",
          color: "#ffffff",
          fontFamily: "Jakarta",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 800, letterSpacing: 5 }}>25 DE NOVEMBRO</div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 40, fontWeight: 800, lineHeight: 1.2 }}>
            Dia contra a Violência sobre as Mulheres
          </div>
          <div style={{ display: "flex", marginTop: 60, fontFamily: "Grotesk", fontSize: 132, lineHeight: 0.98, letterSpacing: -2 }}>
            Não estás sozinha.
          </div>
          <div style={{ display: "flex", marginTop: 30, fontSize: 48, fontWeight: 500, lineHeight: 1.25 }}>
            Nenhuma mulher devia viver com medo.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          {numeros.map(([n, t]) => (
            <div
              key={n}
              style={{
                display: "flex",
                flexDirection: "column",
                background: "rgba(255,255,255,0.16)",
                border: "3px solid rgba(255,255,255,0.55)",
                borderRadius: 28,
                padding: "24px 36px",
              }}
            >
              <div style={{ display: "flex", fontFamily: "Grotesk", fontSize: 76, lineHeight: 1 }}>{n}</div>
              <div style={{ display: "flex", marginTop: 10, fontSize: 30, fontWeight: 800 }}>{t}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 30, fontWeight: 800 }}>Partilha: pode chegar a quem precisa.</div>
            <div style={{ display: "flex", marginTop: 12, fontSize: 28, fontWeight: 500 }}>trofaliberal.pt/violencia-contra-as-mulheres</div>
          </div>
          <img src={logoHistoria} width={130} height={130} style={{ borderRadius: 999 }} />
        </div>
      </div>
    ),
    { ...TAMANHO_HISTORIA, fonts: fontesHistoria },
  );
}
