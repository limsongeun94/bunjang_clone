import Header from "./Header";
import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-[1024px] mx-auto">
      <Header />
      <main>{children}</main>
    </div>
  );
}
