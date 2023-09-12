import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface IndexProps {
  tab: string;
}

export default ({ tab }: IndexProps) => {
  const router = useRouter();

  const [tabSelect, setTabSelect] = useState("");
  useEffect(() => {
    setTabSelect(tab);
  }, []);

  const onClickNewTap = () => {
    const aTag = document.createElement("a");
    aTag.setAttribute("href", "/products/transaction?tab=purchases");
    aTag.setAttribute("target", "_blank");
    aTag.click();
  };

  return (
    <div className="h-[4rem] border-b border-[#f4f4fa] flex items-center text-[13px]">
      <div
        onClick={() => router.push("/products/new")}
        className={`${
          tabSelect === "new" ? "text-[#ff5058]" : ""
        } cursor-pointer mr-[2rem] after:content-[''] after:w-[1px] after:h-[14px] after:border-r after:ml-[2rem]`}
      >
        상품등록
      </div>
      <div
        onClick={() => router.push("/products/manage")}
        className={`${
          tabSelect === "manage" ? "text-[#ff5058]" : ""
        } cursor-pointer mr-[2rem] after:content-[''] after:w-[1px] after:h-[14px] after:border-r after:ml-[2rem]`}
      >
        상품관리
      </div>
      <div onClick={onClickNewTap} className="cursor-pointer mr-[2rem] ">
        구매/판매 내역
      </div>
    </div>
  );
};
