import { TopHeader, StickyHeader, Footer, LoginModal } from "@/components";
import { ReactNode } from "react";
import { Category } from "@/interface";
import { useState, useEffect } from "react";

interface LayoutProps {
  children?: ReactNode;
  categories: Array<Category>;
}

export default function MainLayout({ children, categories }: LayoutProps) {
  const [loginModal, setLoginModal] = useState(false);

  useEffect(() => {
    if (loginModal) {
      document.body.style.cssText = `overflow: hidden`;
    } else {
      document.body.style.cssText = `overflow: auto`;
    }
  }, [loginModal]);

  return (
    <div className="w-[1024px] mx-auto">
      <TopHeader setLoginModal={setLoginModal} />
      <StickyHeader categories={categories} />
      <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
