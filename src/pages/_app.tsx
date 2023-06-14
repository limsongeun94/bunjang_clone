import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default ({ Component, pageProps }: any) => {
  return (
    <>
      <Layout>
        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};
