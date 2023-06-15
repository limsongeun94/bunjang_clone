import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="w-[1024px] mx-auto">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
