import { useRouter } from "next/router";
import TestModal from "./TestModal";
import { useState } from 'react'


const TopHeader = () => {

  const [hoverKakao, setHoverKakao] = useState<string>("/icons/kakaotalk.png");
  const [hoverFacebook, setHoverFacebook] = useState("/icons/facebook.png");
  const [hoverNaver, setHoverNaver] = useState("/icons/naver.png");
  const [hoverAuth, setHoverAuth] = useState("/icons/authentication.svg");

  const [showLoginModal, setShowLoginModal] = useState(false)

  const router = useRouter()

  return (
    <>
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
              className="text-[13px] px-[15px] cursor-pointer"
              onClick={() => setShowLoginModal(true)}
            >
              로그인/회원가입
            </div>
            <div className="text-[13px] px-[15px] cursor-pointer">내 상점</div>
          </div>
        </div>
      </div>

      <TestModal show={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <div className="bg-[#f7f7f7] w-[420px] h-[506px] relative">
          <button
            onClick={() => setShowLoginModal(false)}
            className="absolute right-[20px] top-[20px] w-[24px] h-[24px]"
          >
            <img src="/icons/icon_close.png" width="24px" />
          </button>
          <div className="text-center pt-[40px]">
            <img
              className="mx-auto mb-[10px]"
              src={"/icons/icon_app_download.svg"}
              width="30px"
            />
            <div className="text-[#212121] text-xl mb-[15px] font-bold">
              번개장터로 중고거래 시작하기
            </div>
            <div className=" text-[#212121] text-sm mb-[35px]">
              간편하게 가입하고 상품을 확인하세요
            </div>
            <div>
              <button
                onMouseEnter={() => setHoverKakao("/icons/kakaotalk_white.png")}
                onMouseLeave={() => setHoverKakao("/icons/kakaotalk.png")}
                className="bg-white  hover:text-white hover:font-bold relative text-[#212121] w-[280px] h-[38px] mb-[15px]  text-center leading-[38px] text-sm "
              >
                <div className="hover:bg-[#3b1e1e]">
                  <img
                    src={hoverKakao}
                    width="24px"
                    className="absolute top-[7px] left-[35px]"
                  />
                  카카오로 이용하기
                </div>
              </button>
              <button
                onMouseEnter={() => setHoverFacebook("/icons/facebook_white.png")}
                onMouseLeave={() => setHoverFacebook("/icons/facebook.png")}
                className="hover:text-white hover:font-bold relative text-[#212121] w-[280px] h-[38px] mb-[15px] bg-white text-center leading-[38px] text-sm"
              >
                <div className="hover:bg-[#3a5ca9]">
                  <img
                    src={hoverFacebook}
                    width="24px"
                    className="absolute top-[7px] left-[35px]"
                  />
                  페이스북으로 이용하기
                </div>
              </button>
              <button
                onMouseEnter={() => setHoverNaver("/icons/naver_white.png")}
                onMouseLeave={() => setHoverNaver("/icons/naver.png")}
                className="hover:text-white hover:font-bold relative text-[#212121] w-[280px] h-[38px] mb-[15px] bg-white text-center leading-[38px] text-sm"
              >
                <div className="hover:bg-[#1ec800]">
                  <img
                    src={hoverNaver}
                    width="24px"
                    className="absolute top-[7px] left-[35px]"
                  />
                  네이버로 이용하기
                </div>
              </button>
              <button
                onMouseEnter={() =>
                  setHoverAuth("/icons/authentication_white.svg")
                }
                onMouseLeave={() => setHoverAuth("/icons/authentication.svg")}
                className="hover:text-white hover:font-bold relative text-[#212121] w-[280px] h-[38px]  bg-white text-center leading-[38px] text-sm"
              >
                <div
                  onClick={() => router.push("/signup")}
                  className="hover:bg-[#9b99a9]"
                >
                  <img
                    src={hoverAuth}
                    className="absolute top-[11px] left-[39px]"
                  />
                  본인인증으로 이용하기
                </div>
              </button>
            </div>
            <div className="text-left px-[32px] pt-[56px] pb-[24px]">
              <p className="text-xs text-[#999999] border-t-[1px] border-[#e5e5e5] pt-[16px]">
                도움이 필요하면{" "}
                <a href="mailto:help@bunjang.co.kr" className="text-[#999999]">
                  이메일
                </a>
                또는 고객센터<b>1670-2910</b>로 문의 부탁드립니다.
                <br />
                고객센터 운영시간: 09~18시 (점심시간 12~13시, 주말/공휴일 제외)
              </p>
            </div>
          </div>
        </div>
      </TestModal>
    </>
  );
};
export default TopHeader;
