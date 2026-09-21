import Image from "next/image";
import Link from "next/link";
import { links, nav } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/il-trofa-mark.png" alt="" width={40} height={40} className="rounded-full" />
            <span className="font-display text-lg font-bold text-white">Iniciativa Liberal Trofa</span>
          </div>
          <p className="mt-4 text-sm">Núcleo territorial da Trofa. Somos a energia que a Trofa precisa!</p>
          <a href={`mailto:${links.email}`} className="mt-3 inline-block text-sm font-bold text-sun">
            {links.email}
          </a>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {nav.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="hover:text-sun">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-sm">
          <p className="font-bold text-white">Segue-nos</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a className="hover:text-sun" href={links.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a className="hover:text-sun" href={links.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a className="hover:text-sun" href={links.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Iniciativa Liberal — Núcleo da Trofa
      </div>
    </footer>
  );
}
