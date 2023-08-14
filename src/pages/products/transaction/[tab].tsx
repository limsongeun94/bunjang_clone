import { useState, useEffect } from "react";

export default () => {
  const [filter, setFilter] = useState(false);

  return (
    <div className="h-full">
      <div className="w-[640px] h-full m-auto">
        <header className="h-[3.125rem] leading-[3.125rem] relative">
          <h1 className="text-[1.125rem] font-semibold text-center">
            거래내역
          </h1>
          <button className="absolute right-[0.625rem] top-[50%] translate-y-[-50%] w-[30px] h-[30px]">
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="#1e1d29"
              viewBox="0 0 20 20"
            >
              <path
                d="M11.414 10l6.293 6.292a.999.999 0 11-1.414 1.414L10 11.413l-6.293 6.293a1 1 0 01-1.414-1.414L8.586 10 2.293 3.707a1 1 0 111.414-1.414L10 8.585l6.293-6.292a1 1 0 011.414 1.414l-6.293 6.292z"
                fill="#1e1d29"
                fill-rule="evenodd"
              ></path>
            </svg>
          </button>
        </header>
        <div className="overflow-scroll h-[calc(100%-3.125rem)]">
          <nav className="flex">
            <div className="w-4/12 h-[2.875rem] leading-[2.875rem] text-center text-[1.125rem] font-semibold border-b-[2px] border-[#1e1d29]">
              구매
            </div>
            <div className="w-4/12 h-[2.875rem] leading-[2.875rem] text-center text-[1.125rem] text-[#72707f] border-b border-[#eae9f1]">
              판매
            </div>
            <div className="w-4/12 h-[2.875rem] leading-[2.875rem] text-center text-[1.125rem] text-[#72707f] border-b border-[#eae9f1]">
              정산
            </div>
          </nav>
          <div>
            <nav className="pl-[1rem] h-[4rem] flex justify-between items-center">
              <div className="flex">
                <div className="px-[0.5rem] h-[1.5rem] leading-[1.5rem] rounded-[12px] text-center text-[13px] text-white bg-[#ff5058]">
                  전체 상태
                </div>
                <div className="ml-[10px] px-[0.5rem] h-[1.5rem] leading-[1.5rem] rounded-[12px] text-center text-[13px] text-[#9b99a9] bg-[#f4f4fa]">
                  진행중
                </div>
                <div className="ml-[10px] px-[0.5rem] h-[1.5rem] leading-[1.5rem] rounded-[12px] text-center text-[13px] text-[#9b99a9] bg-[#f4f4fa]">
                  완료
                </div>
                <div className="ml-[10px] px-[0.5rem] h-[1.5rem] leading-[1.5rem] rounded-[12px] text-center text-[13px] text-[#9b99a9] bg-[#f4f4fa]">
                  취소/환불
                </div>
              </div>
              <button
                onClick={() => setFilter(true)}
                className="w-[4rem] h-[4rem] flex items-center justify-center"
              >
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#fffef"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M0 3a1 1 0 011-1h3.185A2.995 2.995 0 017 0a2.995 2.995 0 012.815 2H19a1 1 0 010 2H9.815A2.995 2.995 0 017 6a2.995 2.995 0 01-2.815-2H1a1 1 0 01-1-1zm20 14a1 1 0 01-1 1H9.815A2.995 2.995 0 017 20a2.995 2.995 0 01-2.815-2H1a1 1 0 010-2h3.185A2.995 2.995 0 017 14a2.995 2.995 0 012.815 2H19a1 1 0 011 1zm0-7a1 1 0 01-1 1h-3.185A2.995 2.995 0 0113 13a2.995 2.995 0 01-2.815-2H1a1 1 0 010-2h9.185A2.995 2.995 0 0113 7a2.995 2.995 0 012.815 2H19a1 1 0 011 1zM6 3a1 1 0 102 0 1 1 0 00-2 0zm2 14a1 1 0 10-2 0 1 1 0 002 0zm6-7a1 1 0 10-2 0 1 1 0 002 0z"
                    fill="#fffef"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </nav>
            <div>
              <div className="mt-[16px] px-[1rem] ">
                <div className="flex items-center ">
                  <div className="h-[96px] w-[96px] relative">
                    <img src="/무제1.jpg" width="96px" height="96px" />
                    <span className="absolute left-0 top-0 w-full h-full flex flex-col justify-center items-center bg-[#1e1d29]/50 text-[0.875rem] font-semibold text-white">
                      <img
                        src="https://assets.bunjang.co.kr/img/trade/ic-circle-tick@3x.png"
                        width="20px"
                        height="20px"
                        className="mb-[0.25rem]"
                      />
                      거래완료
                    </span>
                  </div>
                  <div className="flex flex-col justify-center ml-[0.5rem] ">
                    <span className="text-[0.875rem]">
                      노리다케 바튼 바톤 찻찬 티잔
                    </span>
                    <span className="text-[0.8125rem] leading-[0.8125rem] py-[4px]">
                      <strong className="mr-[2px] font-semibold text-[1rem]">
                        12,000
                      </strong>
                      원
                    </span>
                    <span className="text-[0.75rem] leading-[1rem]">
                      Rarina / 번개페이 안전결제
                    </span>
                    <span className="text-[0.75rem] leading-[1rem]">
                      2023.07.27 (오전 09:02)
                    </span>
                  </div>
                </div>
                <button className="mt-[0.5rem] w-full leading-[3rem] text-[0.875rem] text-center font-semibold border-[1px] border-[#dcdbe4] rounded-[2px]">
                  후기 작성
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => setFilter(false)}
        className={`${
          filter ? "" : "hidden"
        }  z-30 w-full h-full fixed top-0 left-0 bg-black/60 flex `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white fixed left-[50%] translate-x-[-50%] bottom-0 w-[640px] rounded-t-[1rem] pt-[0.5rem] pb-[1.5rem]"
        >
          <h3 className="h-[3.5rem] leading-[3.5rem] text-center text-[1.125rem] font-semibold relative">
            거래유형
            <button
              onClick={() => setFilter(false)}
              className="w-[2.5rem] h-[2.5rem] absolute top-[0.5rem] right-[0.875rem]"
            >
              <svg
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                fill="#1e1d29"
                viewBox="0 0 20 20"
              >
                <path
                  d="M11.414 10l6.293 6.292a.999.999 0 11-1.414 1.414L10 11.413l-6.293 6.293a1 1 0 01-1.414-1.414L8.586 10 2.293 3.707a1 1 0 111.414-1.414L10 8.585l6.293-6.292a1 1 0 011.414 1.414l-6.293 6.292z"
                  fill="#1e1d29"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
          </h3>
          <div>
            <div className="leading-[3rem] text-center cursor-pointer">
              전체거래
            </div>
            <div className="leading-[3rem] text-center cursor-pointer">
              번개페이 안전결제
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
