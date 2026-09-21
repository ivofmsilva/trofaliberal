// Pré-visualização de um post do Instagram (vídeo, foto ou carrossel) sem sair do site.
export const igId = (href: string) => href.match(/\/(?:p|reel)\/([^/?#]+)/)?.[1] ?? "";

export default function InstagramEmbed({
  id,
  titulo,
  altura = 640,
}: {
  id: string;
  titulo: string;
  altura?: number;
}) {
  return (
    <div>
      <iframe
        src={`https://www.instagram.com/p/${id}/embed/`}
        title={titulo}
        loading="lazy"
        allowFullScreen
        style={{ height: altura }}
        className="w-full rounded-2xl border-2 border-mist bg-white"
      />
      <a
        href={`https://www.instagram.com/p/${id}/`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-sm font-bold text-cyan-dark hover:underline"
      >
        Abrir no Instagram ↗
      </a>
    </div>
  );
}
