import { ReactNode } from "react";
import { AppHeader } from "./AppHeader";
import { DesktopShell } from "./DesktopShell";
import { MobileShell } from "./MobileShell";

type ResponsiveAppLayoutProps = {
  center: ReactNode;
  left?: ReactNode;
  mobile: ReactNode;
  right?: ReactNode;
};

export function ResponsiveAppLayout({ center, left, mobile, right }: ResponsiveAppLayoutProps) {
  return (
    <section className="min-h-screen bg-[#f7f8fb] text-slate-950">
      <AppHeader />
      <MobileShell>{mobile}</MobileShell>
      <DesktopShell center={center} left={left} right={right} />
    </section>
  );
}
