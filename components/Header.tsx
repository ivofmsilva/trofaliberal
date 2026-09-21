"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { nav, type NavItem } from "@/lib/site";

function ItemLink({ item, className }: { item: NavItem; className?: string }) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {item.label} ↗
      </a>
    );
  }
  return (
    <Link href={item.href} className={className}>
      {item.label}
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy text-white shadow-lg shadow-black/20">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/il-trofa-mark.png" alt="" width={36} height={36} className="rounded-full" />
          <span className="font-display leading-none">
            <span className="block text-sm font-bold">Iniciativa Liberal</span>
            <span className="block text-xs font-bold tracking-widest text-sun">TROFA</span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <div key={item.label} className="group relative">
              <ItemLink
                item={item}
                className="block rounded px-3 py-2 text-xs font-bold uppercase tracking-wide text-white/85 transition hover:text-sun"
              />
              {item.children && (
                <div className="invisible absolute left-0 top-full min-w-56 translate-y-1 rounded-lg bg-navy-soft p-2 opacity-0 shadow-xl transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((child) => (
                    <ItemLink
                      key={child.label}
                      item={child}
                      className="block rounded px-3 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-sun"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <Link
          href="/trofa-liberal/faz-te-membro"
          className="hidden rounded-full bg-pink px-5 py-2 text-sm font-bold text-white transition hover:bg-navy lg:inline-block"
        >
          Faz-te Membro
        </Link>

        <button
          type="button"
          className="rounded p-2 lg:hidden"
          aria-expanded={open}
          aria-controls="menu-movel"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block h-0.5 w-6 bg-white" />
          <span className="mt-1.5 block h-0.5 w-6 bg-white" />
          <span className="mt-1.5 block h-0.5 w-6 bg-white" />
        </button>
      </div>

      {open && (
        <nav
          id="menu-movel"
          aria-label="Principal"
          className="max-h-[80vh] overflow-y-auto border-t border-white/10 bg-navy px-4 pb-6 lg:hidden"
        >
          <ul className="space-y-1 pt-3">
            {nav.map((item) => (
              <li key={item.label}>
                <div onClick={() => !item.children && setOpen(false)}>
                  <ItemLink item={item} className="block py-2 text-sm font-bold uppercase tracking-wide" />
                </div>
                {item.children && (
                  <ul className="mb-2 ml-3 border-l border-cyan/40 pl-3">
                    {item.children.map((child) => (
                      <li key={child.label} onClick={() => setOpen(false)}>
                        <ItemLink item={child} className="block py-1.5 text-sm text-white/80" />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link
            href="/trofa-liberal/faz-te-membro"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-pink px-5 py-3 text-center font-bold text-white"
          >
            Faz-te Membro
          </Link>
        </nav>
      )}
    </header>
  );
}
