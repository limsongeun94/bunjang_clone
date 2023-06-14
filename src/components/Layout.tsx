import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="w-[1024px] mx-auto">
      <Header />
      <main>{children}</main>
    </div>
  );
}
