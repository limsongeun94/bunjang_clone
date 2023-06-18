import TopHeader from "./TopHeader";
import StickyHeader from "./StickyHeader";
import Footer from "./Footer";
import { ReactNode } from "react";
import axios from "@/libs/axios";

interface LayoutProps {
  children: ReactNode;
  init: any;
}

export default function Layout({ children, init }: LayoutProps) {
  return (
    <div className="w-[1024px] mx-auto">
      <TopHeader />
      <StickyHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export const getServerSideProps = async () => {
  const init = (await axios.get("/landing")).data;
  return { props: { data: { init } } };
};
