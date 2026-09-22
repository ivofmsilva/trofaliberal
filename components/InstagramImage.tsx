import Image from "next/image";

// Mostra só a imagem de uma publicação do Instagram (sem cabeçalho do
// perfil, "Ver perfil" nem ícones de gosto/comentário/partilha), a abrir a
// publicação real ao clicar.
export default function InstagramImage({
  src,
  alt,
  href,
  w,
  h,
}: {
  src: string;
  alt: string;
  href: string;
  w: number;
  h: number;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-2xl ring-2 ring-transparent transition hover:ring-pink"
    >
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        sizes="(min-width: 768px) 33vw, 100vw"
        className="aspect-square w-full object-cover transition group-hover:scale-105"
      />
    </a>
  );
}
