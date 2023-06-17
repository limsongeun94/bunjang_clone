"use client";

import React, { useState, useEffect } from "react";

const StickyHeader = () => {
  // position: sticky는 부모 내에서만 작동한다.
  // 따라서 부모가 body여야지 sticky가 어디에서든 작동을 한다.
  // TopHeader와 StickyHeader 컴포넌트를 분리한 이유이다.

  const [position, setPosition] = useState(0);
  const [menuHeightClass, setMenuHeightClass] = useState("");

  function onScroll() {
    setPosition(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const setMenuHeight = () => {
    if (position < 40) {
      setMenuHeightClass("h-[calc(100vh-180px)]");
    } else {
      setMenuHeightClass("h-[calc(100vh-140px)]");
    }
  };

  useEffect(() => {
    setMenuHeight();
  });

  return (
    <header className="bg-white sticky top-0 z-50 pt-[30px]">
      <div className="flex h-[40px] justify-between items-center">
        <img src="/logo.svg" />
        <div className="border-2 border-[#F72F33] px-[15px] w-[460px] h-[40px] flex justify-between items-center">
          <input
            className="outline-none h-[16px] w-full"
            placeholder="상품명, 지역명, @상점명 입력"
          />
          <img src="/icons/icon_search.png" />
        </div>
        <div className="flex h-[26px]">
          <div className="flex ml-[30px]">
            <img className="mr-[5px] " src="/icons/icon_resell.png" />
            <div>판매하기</div>
          </div>
          <div className="flex ml-[30px] relative">
            <div className="after-bar-header" />
            <img className="mr-[5px]" src="/icons/icon_my_shop.png" />
            <div>내상점</div>
          </div>
          <div className="flex ml-[30px] relative">
            <div className="after-bar-header" />
            <img className="mr-[5px]" src="/icons/icon_talk.png" />
            <div>번개톡</div>
          </div>
        </div>
      </div>
      <div className="h-[70px] flex flex-row align-middle relative">
        <img
          src="/icons/icon_hamburger.png"
          width="20px"
          height="16px"
          className=" object-contain mr-[20px]"
        />
        <div>
          <b className="text-sm leading-[70px] ml-[10px]">
            번개장터 판매자센터
          </b>
        </div>
        <div>
          <div
            className={`absolute top-[70px] left-0  bg-white border-[1px] border-[#eeeeee] w-[239px] ${menuHeightClass}`}
          >
            <div className="w-full h-[40px] font-bold text-sm leading-[40px] pl-[30px] border-b-[1px] border-[#eeeeee]">
              전체카테고리
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;
