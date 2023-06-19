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

  type HoverMune = "mainClass" | "subClass" | "subsubClass" | "";
  const [menuHoverClass, setMenuHoverClass] = useState<HoverMune>("");
  const timeOutClass = () => {
    setTimeout(() => {
      console.log("셋타임아웃");
      setMenuHoverClass("");
    }, 500);
  };

  // 만약 햄버거메뉴를 마우스오버하면 메인메뉴 block
  // 메인메뉴의 a태그를 마우스오버하면 메인메뉴, 서브메뉴의 block
  // 서브메뉴의 a태그를 마우스오버함현 메인메뉴, 서브메뉴, 서브서브메뉴의 block

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
          onMouseEnter={() => setMenuHoverClass("mainClass")}
          // onMouseLeave={() => setMenuHoverClass("")}
          // onMouseLeave={timeOutClass}
        />
        <div>
          <b className="text-sm leading-[70px] ml-[10px]">
            번개장터 판매자센터
          </b>
        </div>
        <div>
          <div
            onMouseEnter={() => setMenuHoverClass("mainClass")}
            // onMouseLeave={() => setMenuHoverClass("")}
            onMouseLeave={timeOutClass}
            className={`${
              menuHoverClass === "mainClass" ||
              menuHoverClass === "subClass" ||
              menuHoverClass === "subsubClass"
                ? "block"
                : "hidden"
            } absolute top-[70px] left-0  bg-white border-l-[1px] border-t-[1px] border-[#eeeeee] w-[239px] ${menuHeightClass}`}
          >
            <div className="w-full h-[40px] font-bold text-sm leading-[40px] pl-[30px] border-r-[1px] border-b-[1px] border-[#eeeeee]">
              전체카테고리
            </div>
            <div className="pt-[20px] pb-[25px] border-r-[1px]  flex flex-col justify-start ">
              <a
                onMouseEnter={() => setMenuHoverClass("subClass")}
                onMouseLeave={() => setMenuHoverClass("")}
                className="pl-[30px] pr-[30px] no-underline text-[#212121] text-sm h-[30px] cursor-pointer"
              >
                여성의류
              </a>
              <a
                onMouseEnter={() => setMenuHoverClass("subClass")}
                onMouseLeave={() => setMenuHoverClass("")}
                className="pl-[30px] pr-[30px] no-underline text-[#212121] text-sm h-[30px] cursor-pointer"
              >
                남성의류
              </a>
            </div>
          </div>
          <div
            onMouseEnter={() => setMenuHoverClass("subClass")}
            onMouseLeave={() => setMenuHoverClass("")}
            className={`${
              menuHoverClass === "subClass" || menuHoverClass === "subsubClass"
                ? "block"
                : "hidden"
            } absolute top-[70px] left-[238px]  bg-white border-l-[1px] border-t-[1px] border-[#eeeeee] w-[239px] ${menuHeightClass}`}
          >
            <div className="w-full h-[40px] font-bold text-sm leading-[40px] pl-[30px] border-b-[1px] border-[#eeeeee]">
              여성의류
            </div>
            <div className="pt-[20px] pb-[25px] flex flex-col justify-start border-r-[1px] ">
              <a
                onMouseEnter={() => setMenuHoverClass("subsubClass")}
                onMouseLeave={() => setMenuHoverClass("")}
                className="pl-[30px] pr-[30px] no-underline text-[#212121] text-sm h-[30px] cursor-pointer"
              >
                아우터
              </a>
              <a
                onMouseEnter={() => setMenuHoverClass("subsubClass")}
                onMouseLeave={() => setMenuHoverClass("")}
                className="pl-[30px] pr-[30px] no-underline text-[#212121] text-sm h-[30px] cursor-pointer"
              >
                상의
              </a>
            </div>
          </div>
          <div
            onMouseEnter={() => setMenuHoverClass("subsubClass")}
            onMouseLeave={() => setMenuHoverClass("")}
            className={`${
              menuHoverClass === "subsubClass" ? "block" : "hidden"
            } absolute top-[70px] left-[476px]  bg-white border-l-[1px] border-t-[1px] border-[#eeeeee] w-[239px] ${menuHeightClass}`}
          >
            <div className="w-full h-[40px] font-bold text-sm leading-[40px] pl-[30px] border-b-[1px] border-[#eeeeee]">
              아우터
            </div>
            <div className="pt-[20px] pb-[25px] flex flex-col justify-start border-r-[1px] ">
              <a className="pl-[30px] pr-[30px] no-underline text-[#212121] text-sm h-[30px] cursor-pointer">
                패딩
              </a>
              <a className="pl-[30px] pr-[30px] no-underline text-[#212121] text-sm h-[30px] cursor-pointer">
                점퍼
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;
