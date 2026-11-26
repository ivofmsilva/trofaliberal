// Desenho comum das histórias do Instagram das datas (1080×1920), no estilo da do 25 de Novembro: etiqueta, título,
// a imagem da data ao meio (inteira, com cantos redondos), a frase, o endereço e o logótipo. Se a foto vier do
// Wikimedia Commons, leva o autor e a licença por baixo (a licença obriga).
// Usado por app/historias/[slug]/route.tsx e app/dia-do-concelho/historia/route.tsx.
// As áreas de cima (250 px) e de baixo (260 px) ficam livres: o Instagram põe lá o perfil e a caixa de resposta.
import { ImageResponse } from "next/og";
import type { Credito } from "@/lib/comemoracoes";
import { fontesHistoria, logoHistoria, TAMANHO_HISTORIA } from "@/lib/historia";

export type Historia = {
  etiqueta: string;
  titulo: string;
  frase: string;
  endereco: string; // sem o domínio, ex.: "/natal"
  imagem: { jpeg: Buffer; w: number; h: number; credito?: Credito };
};

const LARGURA = 920; // 1080 menos as margens
const ALTURA_UTIL = 1920 - 250 - 260;

// Uma estimativa das linhas que um texto ocupa (as letras têm ~0,52 da altura de largura; 0,6 dá folga para as quebras de linha).
const linhas = (texto: string, tamanho: number, largura = LARGURA) =>
  Math.max(1, Math.ceil((texto.length * tamanho * 0.6) / largura));

const tamanhoTitulo = (t: string) => (t.length <= 26 ? 112 : t.length <= 44 ? 96 : t.length <= 70 ? 80 : 68);
const licencaPt = (l: string) => (/^public domain$/i.test(l) ? "Domínio público" : l);

export function desenharHistoria(h: Historia) {
  const tt = tamanhoTitulo(h.titulo);
  const tf = h.frase.length > 110 ? 44 : 52;
  const endereco = `trofaliberal.pt${h.endereco}`;
  // A "pílula" do endereço tem de caber ao lado do logótipo (~700 px).
  const te = Math.min(40, Math.floor(700 / (endereco.length * 0.6)));

  // Espaço que sobra para a imagem: tira-se o que os textos ocupam e as folgas entre blocos.
  const cima = 34 + 26 + linhas(h.titulo, tt) * tt * 1.02;
  const baixo = linhas(h.frase, tf) * tf * 1.25 + 56 + 150;
  const credito = h.imagem.credito ? 46 : 0;
  const caixa = Math.max(360, Math.min(820, ALTURA_UTIL - cima - baixo - credito - 2 * 56));

  // A imagem fica inteira: ocupa a largura toda, ou a altura da caixa se for vertical.
  let w = LARGURA;
  let alt = Math.round((LARGURA * h.imagem.h) / h.imagem.w);
  if (alt > caixa) {
    alt = Math.round(caixa);
    w = Math.round((caixa * h.imagem.w) / h.imagem.h);
  }
  const src = `data:image/jpeg;base64,${h.imagem.jpeg.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 48, // nunca encostados, mesmo com títulos de 3 linhas
          padding: "250px 80px 260px",
          background: "linear-gradient(170deg, #0074b8 0%, #0062b9 45%, #0b2540 100%)",
          color: "#ffffff",
          fontFamily: "Jakarta",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 800, letterSpacing: 6, color: "#ffd500" }}>
            {h.etiqueta.toUpperCase()}
          </div>
          <div style={{ display: "flex", marginTop: 26, fontFamily: "Grotesk", fontSize: tt, lineHeight: 1.02, letterSpacing: -2 }}>
            {h.titulo}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src={src} width={w} height={alt} style={{ borderRadius: 32, objectFit: "contain" }} />
          {h.imagem.credito && (
            <div style={{ display: "flex", marginTop: 14, fontSize: 22, fontWeight: 500, color: "#c9dcef", textAlign: "center" }}>
              {`Foto: ${h.imagem.credito.autor} · ${licencaPt(h.imagem.credito.licenca)}`}
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: tf, fontWeight: 800, lineHeight: 1.25 }}>{h.frase}</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 56 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 30, fontWeight: 500, color: "#dbe9f7" }}>Lê mais em</div>
              <div
                style={{
                  display: "flex",
                  marginTop: 10,
                  fontSize: te,
                  fontWeight: 800,
                  color: "#0b2540",
                  background: "#ffd500",
                  borderRadius: 999,
                  padding: "14px 30px",
                }}
              >
                {endereco}
              </div>
            </div>
            <img src={logoHistoria} width={150} height={150} style={{ borderRadius: 999 }} />
          </div>
        </div>
      </div>
    ),
    { ...TAMANHO_HISTORIA, fonts: fontesHistoria },
  );
}
