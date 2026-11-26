// Prepara as imagens das histórias do Instagram: uma cópia JPEG (960 px de largura) da imagem de cada data com
// página própria (e do Dia do Concelho), em assets/historias/<slug>.jpg. O next/og (app/historias/[slug]/route.tsx) não lê WebP.
// Correr outra vez sempre que uma data mude de imagem ou se junte uma data nova:
//   node scripts/historias-imagens.mjs
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";
import sharp from "sharp";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const jiti = createJiti(import.meta.url, { alias: { "@/": raiz.replaceAll("\\", "/") + "/" } });
const { comPaginaPropria } = await jiti.import(join(raiz, "lib/comemoracoes.ts"));

const pasta = join(raiz, "assets/historias");
await mkdir(pasta, { recursive: true });

// As que já têm rota própria (campo `historia`) ficam de fora; o Dia do Concelho tem página própria (app/dia-do-concelho).
const lista = comPaginaPropria.filter((c) => !c.historia).map((c) => [c.data.slug.slice(1), c.imagem.src]);
lista.push(["dia-do-concelho", "/images/concelho/assembleia-1998.webp"]);

for (const [slug, src] of lista) {
  const origem = join(raiz, "public", src);
  const destino = join(pasta, `${slug}.jpg`);
  await sharp(origem)
    .flatten({ background: "#ffffff" }) // PNG com transparência (cartazes, ilustrações)
    .resize({ width: 960, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(destino);
  console.log(`${slug}.jpg  ←  ${src}`);
}
console.log(`${lista.length} imagens em assets/historias/`);
