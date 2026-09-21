import { formatarData, type Item } from "@/lib/imprensa";

export default function ItemCard({ item }: { item: Item }) {
  const data = formatarData(item.data);
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl bg-navy p-6 text-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan/20"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-sun">
        {[item.fonte, data].filter(Boolean).join(" · ")}
      </p>
      <h3 className="font-display mt-3 text-xl font-bold leading-snug">{item.titulo}</h3>
      <span className="mt-4 inline-block text-sm font-bold text-sun group-hover:underline">
        Ler ↗
      </span>
    </a>
  );
}
