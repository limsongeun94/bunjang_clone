import "@/styles/globals.css";

// export const cls = (...classnames: string[]) => {
//   return classnames.join(" ");
// };

// const notoSansKr = Noto_Sans_KR({
//   // preload: true, 기본값
//   subsets: ["latin"], // 또는 preload: false
//   weight: ["100", "400", "700", "900"], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
// });

// const inter = Inter({ subsets: ["latin"] });

export default ({ Component, pageProps }: any) => {
  return (
    <div className="font-['Noto-Sans']">
      <Component {...pageProps} />
    </div>
  );
};
