// Imagem para a história do Instagram do Dia do Concelho (1080×1920), com a foto de 1998 em frente à Assembleia da
// República. Desenho comum em lib/desenharHistoria.tsx; a foto é uma cópia JPEG em assets/historias (o next/og não
// lê WebP), feita por scripts/historias-imagens.mjs. Os anos contam-se sozinhos.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { anosDoConcelho } from "@/lib/datasAnuais";
import { desenharHistoria } from "@/lib/desenharHistoria";

export const revalidate = 86400;

const foto = await readFile(join(process.cwd(), "assets/historias/dia-do-concelho.jpg"));

export async function GET() {
  return desenharHistoria({
    etiqueta: "19 de novembro · 1998",
    titulo: `${anosDoConcelho()} anos de Concelho da Trofa`,
    frase: "Em 1998 fomos a Lisboa e trouxemos o concelho para casa.",
    endereco: "/dia-do-concelho",
    imagem: { jpeg: foto, w: 1080, h: 792 },
  });
}
