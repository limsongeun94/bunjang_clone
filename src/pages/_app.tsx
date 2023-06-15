import "@/styles/globals.css";
import { Noto_Sans_KR } from "next/font/google";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";

export const cls = (...classnames: string[]) => {
  return classnames.join(" ");
};

const notoSansKr = Noto_Sans_KR({
  // preload: true, 기본값
  subsets: ["latin"], // 또는 preload: false
  weight: ["100", "400", "700", "900"], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
});

const inter = Inter({ subsets: ["latin"] });

// export default ({ Component, pageProps }: any) => {
//   return (
//     <div className={Noto_Sans_KR.className}>
//       <Layout>
//         <Component {...pageProps} />
//       </Layout>
//     </div>
//   );
// };

export default ({ Component, pageProps }: any) => {
  return (
    <div>
      <Layout>
        <style jsx global>{`
          html {
            font-family: ${notoSansKr.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
};
