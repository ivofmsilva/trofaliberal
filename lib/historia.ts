// O que as imagens das histórias do Instagram (1080×1920) partilham: as letras do site e o logótipo.
// As imagens são rotas que devolvem um PNG (app/25-de-novembro/historia, app/historias/...), usadas pelo botão
// "Partilhar na história do Instagram" (components/PartilharHistoria.tsx). Caminhos escritos por extenso, para a
// Vercel só levar estes ficheiros.
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const [grotesk, jakartaMedio, jakartaForte, logo] = await Promise.all([
  readFile(join(process.cwd(), "assets/fonts/SpaceGrotesk-Bold.ttf")),
  readFile(join(process.cwd(), "assets/fonts/PlusJakartaSans-Medium.ttf")),
  readFile(join(process.cwd(), "assets/fonts/PlusJakartaSans-ExtraBold.ttf")),
  readFile(join(process.cwd(), "public/il-trofa-logo.png")),
]);

export const TAMANHO_HISTORIA = { width: 1080, height: 1920 };
export const fontesHistoria = [
  { name: "Grotesk", data: grotesk, weight: 700 as const, style: "normal" as const },
  { name: "Jakarta", data: jakartaMedio, weight: 500 as const, style: "normal" as const },
  { name: "Jakarta", data: jakartaForte, weight: 800 as const, style: "normal" as const },
];
export const logoHistoria = `data:image/png;base64,${logo.toString("base64")}`;
