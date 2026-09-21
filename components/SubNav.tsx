"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type SubItem = { label: string; href: string };

export default function SubNav({ items }: { items: SubItem[] }) {
  const pathname = usePathname();
  const ativo = (href: string) =>
    href === items[0].href ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav aria-label="Secção" className="sticky top-16 z-40 border-b border-navy/10 bg-white/95 backdrop-blur">
      <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden">
        {items.map((i) => (
          <li key={i.href} className="shrink-0">
            <Link
              href={i.href}
              aria-current={ativo(i.href) ? "page" : undefined}
              className={`block rounded-full px-4 py-1.5 text-sm font-bold transition ${
                ativo(i.href) ? "bg-pink text-white" : "bg-mist text-navy hover:bg-navy hover:text-white"
              }`}
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
