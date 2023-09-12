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
      <div className="absolute left-[20px] top-[20px] text-indigo-700">
        해당 사이트는 포트폴리오용 카피 사이트입니다.
      </div>
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
