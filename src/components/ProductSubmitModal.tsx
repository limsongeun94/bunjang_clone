import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

interface LayoutProps {
  productSubmitModal: boolean;
  setProductSubmitModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default ({ productSubmitModal, setProductSubmitModal }: LayoutProps) => {
  const router = useRouter();

  return (
    <div
      className={`
      ${productSubmitModal ? "block" : "hidden"}
      z-50 w-full h-full fixed top-0 left-0 bg-black/60 flex justify-center items-center`}
      onClick={() => router.push("/products/manage")}
    >
      <div
        className="bg-white pt-[50px] pb-[30px] px-[24px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => router.push("/products/manage")}
          className="absolute right-[24px] top-[20px]"
        >
          <img src="/icons/icon_close.png" width="24px" height="24px" />
        </button>
        <h2 className="text-xl font-bold text-center">상품 등록 완료</h2>
        <div className="text-center text-[#888888]">
          번개장터 앱을 설치하면 <br />
          판매 상황을 실시간으로 받아볼 수 있어요
        </div>
        <button
          onClick={() => router.push("/products/1")}
          className="mt-[16px] w-full h-[2.3rem] rounded-[3px] text-white text-lg bg-[#ff5058]"
        >
          등록 상품 보기
        </button>
      </div>
    </div>
  );
};
