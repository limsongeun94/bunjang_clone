import TopHeader from "./TopHeader";
import StickyHeader from "./StickyHeader";
import Footer from "./Footer";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-[1024px] mx-auto">
      <TopHeader />
      <StickyHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
