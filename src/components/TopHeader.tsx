import type { User } from "@/interface";
import { useEffect, useState } from "react";

interface LayoutProps {
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}

const TopHeader = ({ setLoginModal, user }: LayoutProps) => {
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    if (user) {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  }, [user]);

  return (
    <div className=" w-[1024px] mx-auto  bg-white h-auto">
      <div className="flex justify-between items-center h-[40px] border-b-[1px]">
        <div className="flex">
          <div className="flex  px-[15px]">
            <img className="mr-[5px]" src="/icons/icon_app_download.svg" />
            <div className="text-[13px]">앱다운로드</div>
          </div>
          <div className="flex px-[15px]">
            <img className="mr-[5px]" src="/icons/icon_favorite.svg" />
            <div className="text-[13px]">즐겨찾기</div>
          </div>
        </div>
        <div className="flex">
          <div
            onClick={() => setLoginModal(true)}
            className={`${
              loginState ? "hidden" : ""
            } text-[13px] px-[15px] cursor-pointer`}
          >
            로그인/회원가입
          </div>
          <div className="text-[13px] px-[15px] cursor-pointer">내 상점</div>
          <form
            method="POST"
            action="/api/logout"
            className={`${
              loginState ? "" : "hidden"
            } text-[13px] px-[15px] cursor-pointer`}
          >
            <button type="submit">로그아웃</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default TopHeader;
