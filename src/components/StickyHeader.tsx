import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Category, User } from "@/interface";
import dynamic from "next/dynamic";
import { KeyboardEvent, MouseEvent } from "react";

interface LayoutProps {
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Array<Category>;
  user: User;
}

const FloatingMenu = dynamic(() => import("@/components/FloatingMenu"), {
  ssr: false,
});

const StickyHeader = ({ categories, user, setLoginModal }: LayoutProps) => {
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

  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    if (user) {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  }, [user]);

  const [menuOpenState, setMenuOpenState] = useState<boolean>(false); // 메뉴 열지 말지 선택하는 state

  const [currentMainMenu, setCurrentMainMenu] = useState<string>(""); // 선택한 메인메뉴의 id
  const [currentSubMenu, setCurrentSubMenu] = useState<string>(""); // 선택한 2nd메뉴의 id
  const [current3rdMenu, setCurrent3rdMenu] = useState<string>(""); // 선택한 3rd메뉴의 id
  const menuCategories = categories.find((el) => el.id === currentMainMenu);
  const subMenuCategories = menuCategories
    ? menuCategories.categories
      ? menuCategories.categories.find((el) => el.id === currentSubMenu)
      : ""
    : "";

  const [searchValue, setSearchValue] = useState("");
  const onSearch = (
    e: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLImageElement>
  ) => {
    const { key } = e as React.KeyboardEvent<HTMLInputElement>;
    const { button } = e as MouseEvent<HTMLImageElement>;
    if (key === "Enter") {
      router.push("/search/product?page=1&q=" + searchValue);
    } else if (button === 0) {
      router.push("/search/product?page=1&q=" + searchValue);
    }
  };

  let timeoutId = useRef<number | null>(null);

  const handleOnMouseEnterMainMenu = (id: string) => {
    timeoutId.current = window.setTimeout(() => {
      setCurrentMainMenu(id);
    }, 150);
  };

  const handleOnMouseLeaveMainMenu = () => {
    if (timeoutId.current) {
      window.clearTimeout(timeoutId.current as number);
    }
  };

  let timeoust2ndId = useRef<number | null>(null);

  const handleOnMouseEnter2ndMenu = (id: string) => {
    timeoust2ndId.current = window.setTimeout(() => {
      setCurrentSubMenu(id);
    }, 150);
  };

  const handleOnMouseLeave2ndMenu = () => {
    if (timeoust2ndId.current) {
      window.clearTimeout(timeoust2ndId.current as number);
    }
  };

  let timeoust3rdId = useRef<number | null>(null);

  const handleOnMouseEnter3rdMenu = (id: string) => {
    timeoust3rdId.current = window.setTimeout(() => {
      setCurrent3rdMenu(id);
    }, 150);
  };

  const handleOnMouseLeave3rdMenu = () => {
    if (timeoust3rdId.current) {
      window.clearTimeout(timeoust3rdId.current as number);
    }
  };

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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyUp={onSearch}
          />
          <img
            onClick={onSearch}
            src="/icons/icon_search.png"
            className="cursor-pointer"
          />
        </div>
        <div className="flex h-[26px]">
          <div
            onClick={
              loginState
                ? () => router.push("/products/new")
                : () => setLoginModal(true)
            }
            className="flex ml-[30px] cursor-pointer"
          >
            <img className="mr-[5px] " src="/icons/icon_resell.png" />
            <div>판매하기</div>
          </div>
          <div
            onClick={
              loginState
                ? () => router.push("/shop/" + user.id + "/products")
                : () => setLoginModal(true)
            }
            className="flex ml-[30px] relative cursor-pointer"
          >
            <div className="after-bar-header" />
            <img className="mr-[5px]" src="/icons/icon_my_shop.png" />
            <div>내상점</div>
          </div>
          <div className="flex ml-[30px] relative cursor-not-allowed">
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
            // handleOnMouseLeaveMainMenu();
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
                    onClick={() =>
                      router.push("/categories/" + el.id + "?page=1")
                    }
                    // onMouseEnter={() => setCurrentMainMenu(el.id)}
                    onMouseEnter={() => handleOnMouseEnterMainMenu(el.id)}
                    onMouseLeave={handleOnMouseLeaveMainMenu}
                    className={`flex items-center pl-[30px] pr-[30px] no-underline text-[#212121] text-sm h-[30px] cursor-pointer 
                       ${
                         el.id == currentMainMenu
                           ? "bg-red-500 text-white"
                           : null
                       }`}
                  >
                    {el.title}
                  </a>
                );
              })}
            </div>
          </div>
          <div
            className={`${
              menuCategories?.categories ? "block" : "hidden"
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
                          key={el.id}
                          onClick={() =>
                            router.push("/categories/" + el.id + "?page=1")
                          }
                          onMouseEnter={() => handleOnMouseEnter2ndMenu(el.id)}
                          onMouseLeave={handleOnMouseLeave2ndMenu}
                          className={`pl-[30px] pr-[30px] no-underline text-[#212121] text-sm h-[30px] cursor-pointer
                             ${
                               el.id == currentSubMenu
                                 ? "text-red-600 !underline"
                                 : null
                             }`}
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
              subMenuCategories?.categories ? "block" : "hidden"
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
                        <a
                          key={el.id}
                          onClick={() =>
                            router.push("/categories/" + el.id + "?page=1")
                          }
                          onMouseEnter={() => handleOnMouseEnter3rdMenu(el.id)}
                          onMouseLeave={handleOnMouseLeave3rdMenu}
                          className={`${
                            el.id == current3rdMenu
                              ? "text-red-600 !underline"
                              : null
                          } pl-[30px] pr-[30px] no-underline text-[#212121] text-sm h-[30px] cursor-pointer`}
                        >
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
