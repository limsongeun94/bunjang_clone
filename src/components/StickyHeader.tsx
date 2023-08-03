import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Category } from "@/interface";
import dynamic from "next/dynamic";

interface LayoutProps {
  categories: Array<Category>;
}

const FloatingMenu = dynamic(() => import("@/components/FloatingMenu"), {
  ssr: false,
});

const StickyHeader = ({ categories }: LayoutProps) => {
  // position: sticky는 부모 내에서만 작동한다.
  // 따라서 부모가 body여야지 sticky가 어디에서든 작동을 한다.
  // TopHeader와 StickyHeader 컴포넌트를 분리한 이유이다.

  const router = useRouter();

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

  const [menuOpenState, setMenuOpenState] = useState<boolean>(false);

  const [currentMainMenu, setCurrentMainMenu] = useState<string>("");
  const [currentSubMenu, setCurrentSubMenu] = useState<string>("");
  const menuCategories = categories.find((el) => el.id === currentMainMenu);
  const subMenuCategories = menuCategories
    ? menuCategories.categories
      ? menuCategories.categories.find((el) => el.id === currentSubMenu)
      : ""
    : "";

  return (
    <header className="bg-white sticky top-0 z-30 pt-[30px]">
      <div className="relative w-[1024px] mx-auto">
        <FloatingMenu />
      </div>
      <div className="w-[1024px] mx-auto flex h-[40px] justify-between items-center">
        <img
          src="/logo.svg"
          onClick={() => router.push("/")}
          className="cursor-pointer"
        />
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
      <div className="w-[1024px] mx-auto h-[70px] border-b border-[#eeeeee] flex flex-row align-middle relative">
        <div
          className="flex items-center after:absolute after:w-[60px] after:h-[90px] after:top-0 after:left-[-13px] after:content-['']"
          onMouseEnter={() => setMenuOpenState(true)}
          onMouseLeave={() => setMenuOpenState(false)}
        >
          <img
            src="/icons/icon_hamburger.png"
            width="20px"
            height="16px"
            className="object-contain mr-[20px]"
          />
        </div>
        <div>
          <b className="text-sm leading-[70px] ml-[10px]">
            번개장터 판매자센터
          </b>
        </div>
        <div
          onMouseEnter={() => setMenuOpenState(true)}
          onMouseLeave={() => {
            setMenuOpenState(false);
            setCurrentMainMenu("");
          }}
          className={menuOpenState ? "block" : "hidden"}
        >
          <div
            className={` absolute top-[70px] left-0  bg-white border-l-[1px] border-t-[1px] border-[#eeeeee] w-[239px] ${menuHeightClass}`}
          >
            <div className="w-full h-[40px] font-bold text-sm leading-[40px] pl-[30px] border-r-[1px] border-b-[1px] border-[#eeeeee]">
              전체카테고리
            </div>
            <div className="pt-[20px] pb-[25px] border-r-[1px] overflow-y-auto h-full after:content-[''] after:block after:h-[25px] after:w-full">
              {categories.map((el) => {
                return (
                  <a
                    key={el.id}
                    onMouseEnter={() => setCurrentMainMenu(el.id)}
                    className="block pl-[30px] pr-[30px] no-underline text-[#212121] text-sm h-[30px] cursor-pointer"
                  >
                    {el.title}
                  </a>
                );
              })}
            </div>
          </div>
          <div
            className={`${
              menuCategories ? "block" : "hidden"
            } absolute top-[70px] left-[238px]  bg-white border-l-[1px] border-t-[1px] border-[#eeeeee] w-[239px] ${menuHeightClass}`}
          >
            <div className="w-full h-[40px] font-bold text-sm leading-[40px] pl-[30px] border-b-[1px] border-[#eeeeee]">
              {menuCategories ? menuCategories.title : ""}
            </div>
            <div className="pt-[20px] pb-[25px] flex flex-col justify-start border-r-[1px] ">
              {menuCategories
                ? menuCategories.categories
                  ? menuCategories.categories.map((el) => {
                      return (
                        <a
                          onMouseEnter={() => setCurrentSubMenu(el.id)}
                          className="pl-[30px] pr-[30px] no-underline text-[#212121] text-sm h-[30px] cursor-pointer"
                        >
                          {el.title}
                        </a>
                      );
                    })
                  : ""
                : ""}
            </div>
          </div>
          <div
            className={`${
              subMenuCategories ? "block" : "hidden"
            } absolute top-[70px] left-[476px]  bg-white border-l-[1px] border-t-[1px] border-[#eeeeee] w-[239px] ${menuHeightClass}`}
          >
            <div className="w-full h-[40px] font-bold text-sm leading-[40px] pl-[30px] border-b-[1px] border-[#eeeeee]">
              {subMenuCategories ? subMenuCategories.title : ""}
            </div>
            <div className="pt-[20px] pb-[25px] flex flex-col justify-start border-r-[1px] ">
              {subMenuCategories
                ? subMenuCategories.categories
                  ? subMenuCategories.categories.map((el) => {
                      return (
                        <a className="pl-[30px] pr-[30px] no-underline text-[#212121] text-sm h-[30px] cursor-pointer">
                          {el.title}
                        </a>
                      );
                    })
                  : ""
                : ""}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;
