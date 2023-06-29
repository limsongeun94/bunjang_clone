import { TopHeader, StickyHeader, Footer, Login } from "@/components";
import { ReactNode } from "react";
import { Category } from "@/interface";

interface LayoutProps {
  children?: ReactNode;
  categories: Array<Category>;
}

export default function MainLayout({ children, categories }: LayoutProps) {
  return (
    <div className="w-[1024px] mx-auto">
      <TopHeader />
      <StickyHeader categories={categories} />
      <Login />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
