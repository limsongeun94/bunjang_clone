import { TopHeader, StickyHeader, Footer, LoginModal } from "@/components";
import { ReactNode } from "react";
import type { Category, User } from "@/interface";
import { useState, useEffect } from "react";

interface LayoutProps {
  children?: ReactNode;
  categories: Array<Category>;
  user: User;
}

export default function MainLayout({
  children,
  categories,
  user,
}: LayoutProps) {
  const [loginModal, setLoginModal] = useState(false);

  useEffect(() => {
    if (loginModal) {
      document.body.style.cssText = `overflow: hidden`;
    } else {
      document.body.style.cssText = `overflow: auto`;
    }
    return () => {
      document.body.style.cssText = `overflow: auto`;
    };
  }, [loginModal]);

  return (
    // 이 div를 렐러티브로, floa
    <div className="relative">
      <TopHeader setLoginModal={setLoginModal} user={user} />
      <StickyHeader
        categories={categories}
        user={user}
        setLoginModal={setLoginModal}
      />
      <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
