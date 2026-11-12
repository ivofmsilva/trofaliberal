import SubNav from "@/components/SubNav";
import { autarquicasNav } from "@/lib/site";

export default function AutarquicasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubNav items={autarquicasNav} />
      <p className="bg-mist px-4 py-2 text-center text-sm text-ink/75">
        Arquivo da campanha autárquica de outubro de 2025. Os textos mantêm-se como foram publicados na altura.
      </p>
      {children}
    </>
  );
}
