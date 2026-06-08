import { ReactNode } from "react";

type DesktopShellProps = {
  center: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
};

export function DesktopShell({ center, left, right }: DesktopShellProps) {
  return (
    <div className="hidden lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-[17rem_minmax(0,1fr)_18rem] lg:gap-6 lg:px-8 lg:py-6 xl:grid-cols-[18rem_minmax(0,1fr)_20rem]">
      <aside className="min-w-0">{left}</aside>
      <main className="min-w-0">{center}</main>
      <aside className="min-w-0">{right}</aside>
    </div>
  );
}
