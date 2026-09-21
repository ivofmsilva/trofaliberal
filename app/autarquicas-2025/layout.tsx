import SubNav from "@/components/SubNav";
import { autarquicasNav } from "@/lib/site";

export default function AutarquicasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubNav items={autarquicasNav} />
      {children}
    </>
  );
}
