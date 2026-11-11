import Image from "next/image";
import Link from "next/link";
import { links, nav } from "@/lib/site";

// Rodapé compacto: no telemóvel as ligações ficam em duas colunas e as redes sociais numa só linha.
export default function Footer() {
  const ligacao = "inline-block py-1 hover:text-sun";
  return (
    <footer className="bg-navy text-white/80">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-[1.2fr_1.4fr_1fr] md:gap-10 md:py-10">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/il-trofa-mark.png" alt="" width={32} height={32} className="rounded-full" />
            <span className="font-display text-base font-bold text-white">Iniciativa Liberal Trofa</span>
          </div>
          <p className="mt-3 text-sm">Núcleo territorial da Trofa. Somos a energia que a Trofa precisa!</p>
          <a href={`mailto:${links.email}`} className="mt-1 inline-block py-1 text-sm font-bold text-sun">
            {links.email}
          </a>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 text-sm">
          {nav.map((item) => (
            <li key={item.label}>
              {item.external ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className={ligacao}>
                  {item.label} ↗
                </a>
              ) : (
                <Link href={item.href} className={ligacao}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className="text-sm">
          <p className="font-bold text-white">Segue-nos</p>
          <ul className="mt-1 flex flex-wrap gap-x-5 md:block">
            <li>
              <a className={ligacao} href={links.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a className={ligacao} href={links.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <Link className={ligacao} href={links.convite}>
                WhatsApp (pede convite)
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-3 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Iniciativa Liberal — Núcleo da Trofa ·{" "}
        <Link href="/privacidade" className="underline underline-offset-2 hover:text-white">
          Privacidade e cookies
        </Link>
      </div>
    </footer>
  );
}
