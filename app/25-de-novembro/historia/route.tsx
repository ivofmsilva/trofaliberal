// Imagem para a história do Instagram do 25 de Novembro (1080×1920): título, o cartaz "As conquistas do 25 de
// Novembro", a frase da página e o endereço. O botão "Partilhar na história" da página abre-a no menu de partilha do
// telemóvel (o Instagram não deixa um site publicar sozinho na história; a ligação junta-se com o autocolante "Link").
// As áreas de cima e de baixo ficam livres, porque o Instagram põe lá o perfil e a barra de resposta.
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { anosDe, vinteCincoNovembro } from "@/lib/datasAnuais";

export const revalidate = 86400;

// Caminhos escritos por extenso (e não numa função), para a Vercel só levar estes ficheiros.
const [grotesk, jakartaMedio, jakartaForte, cartaz, logo] = await Promise.all([
  readFile(join(process.cwd(), "assets/fonts/SpaceGrotesk-Bold.ttf")),
  readFile(join(process.cwd(), "assets/fonts/PlusJakartaSans-Medium.ttf")),
  readFile(join(process.cwd(), "assets/fonts/PlusJakartaSans-ExtraBold.ttf")),
  readFile(join(process.cwd(), "assets/historias/25-novembro-conquistas.jpg")),
  readFile(join(process.cwd(), "public/il-trofa-logo.png")),
]);
const dataUri = (b: Buffer, tipo: string) => `data:${tipo};base64,${b.toString("base64")}`;

export async function GET() {
  const anos = anosDe(vinteCincoNovembro);
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
          background: "linear-gradient(170deg, #0074b8 0%, #0062b9 45%, #0b2540 100%)",
          color: "#ffffff",
          fontFamily: "Jakarta",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 800, letterSpacing: 6, color: "#ffd500" }}>25 DE NOVEMBRO · 1975</div>
          <div style={{ display: "flex", marginTop: 26, fontFamily: "Grotesk", fontSize: 112, lineHeight: 1, letterSpacing: -2 }}>
            {`${anos} anos do 25 de Novembro`}
          </div>
        </div>

        <img src={dataUri(cartaz, "image/jpeg")} width={920} height={690} style={{ borderRadius: 32, objectFit: "cover" }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 54, fontWeight: 500, lineHeight: 1.25 }}>Abril deu-nos a liberdade.</div>
          <div style={{ display: "flex", fontSize: 54, fontWeight: 800, lineHeight: 1.25, color: "#ffd500" }}>Novembro garantiu que ela ficava.</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 56 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 30, fontWeight: 500, color: "#dbe9f7" }}>Lê mais em</div>
              <div style={{ display: "flex", marginTop: 10, fontSize: 40, fontWeight: 800, color: "#0b2540", background: "#ffd500", borderRadius: 999, padding: "14px 30px" }}>
                trofaliberal.pt/25-de-novembro
              </div>
            </div>
            <img src={dataUri(logo, "image/png")} width={150} height={150} style={{ borderRadius: 999 }} />
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
      fonts: [
        { name: "Grotesk", data: grotesk, weight: 700, style: "normal" },
        { name: "Jakarta", data: jakartaMedio, weight: 500, style: "normal" },
        { name: "Jakarta", data: jakartaForte, weight: 800, style: "normal" },
      ],
    },
  );
}
