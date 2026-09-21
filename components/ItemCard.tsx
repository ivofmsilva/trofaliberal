import Link from "next/link";
import { formatarData, type Item } from "@/lib/imprensa";

const classe =
  "group block rounded-2xl bg-navy p-6 text-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/30";

export default function ItemCard({ item }: { item: Item }) {
  const data = formatarData(item.data);
  const interno = item.href.startsWith("/");
  const conteudo = (
    <>
      <p className="text-xs font-bold uppercase tracking-widest text-sun">
        {[item.fonte, data].filter(Boolean).join(" · ")}
      </p>
      <h3 className="font-display mt-3 text-xl font-bold leading-snug">{item.titulo}</h3>
      <span className="mt-4 inline-block text-sm font-bold text-sun group-hover:underline">
        {interno ? "Ler →" : "Ler ↗"}
      </span>
    </>
  );
  return interno ? (
    <Link href={item.href} className={classe}>
      {conteudo}
    </Link>
  ) : (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={classe}>
      {conteudo}
    </a>
  );
}
