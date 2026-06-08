import { ReactNode } from "react";
import { MobileBottomNav } from "./MobileBottomNav";

type MobileShellProps = {
  children: ReactNode;
};

export function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="min-h-screen pb-28 lg:hidden">
      {children}
      <MobileBottomNav />
    </div>
  );
}
