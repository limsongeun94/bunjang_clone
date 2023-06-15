import Header from "./Header";
<<<<<<< HEAD
import Footer from "./Footer";
=======
import { ReactNode } from "react"
>>>>>>> a976f96ec95030efe48111d6e2a07efce4ac348b

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-[1024px] mx-auto">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
