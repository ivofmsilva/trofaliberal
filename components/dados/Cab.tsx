// Cabeçalho de coluna que ordena a tabela ao clicar.
export default function Cab({
  ativo,
  desc,
  onClick,
  children,
  className = "",
}: {
  ativo: boolean;
  desc: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Ordenar por ${children}`}
      className={`flex items-center gap-1 text-left font-medium hover:text-tinta ${ativo ? "text-tinta" : ""} ${className}`}
    >
      {children}
      <span aria-hidden className="text-xs">
        {ativo ? (desc ? "↓" : "↑") : "⇅"}
      </span>
    </button>
  );
}
