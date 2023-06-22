import { TopHeader, StickyHeader, Footer } from "@/components"
import { ReactNode } from "react";
import { Category } from '@/interface'

interface LayoutProps {
  children?: ReactNode;
  categories: Array<Category>
}

export default function MainLayout({ children, categories }: LayoutProps) {

  console.log('layout', categories)
  return (
    <div className="w-[1024px] mx-auto">
      <TopHeader />
      <StickyHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
