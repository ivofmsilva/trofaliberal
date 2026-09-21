import SubNav from "@/components/SubNav";
import { lojaNav } from "@/lib/site";

export default function LojaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubNav items={lojaNav} />
      {children}
    </>
  );
}
