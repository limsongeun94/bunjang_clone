import { StickyHeader, Footer } from "@/components";
import TestHeader from "@/components/TestHeader"
import { ReactNode } from "react";
import { Category } from "@/interface";

interface LayoutProps {
  children?: ReactNode;
  categories: Array<Category>;
}

export default function TestLayout({ children, categories }: LayoutProps) {

  return (
    // 이 div를 렐러티브로, floa
    <div className="relative">
      <TestHeader />
      <StickyHeader categories={categories} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
