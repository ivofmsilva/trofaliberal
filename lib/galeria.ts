import fs from "node:fs";
import path from "node:path";

// Lê as fotos de public/images/eventos/<pasta>/. Para acrescentar fotos a uma
// galeria basta copiar os ficheiros para essa pasta e voltar a publicar.
export function fotos(pasta: string): string[] {
  const dir = path.join(process.cwd(), "public", "images", "eventos", pasta);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, "pt", { numeric: true }))
    .map((f) => `/images/eventos/${pasta}/${f}`);
}
