import { useState, useEffect, useRef } from "react";
import { ChangeEvent } from "react";

interface LayoutProps {
  addressModal: boolean;
  setAddressModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTradeLocation: React.Dispatch<React.SetStateAction<string>>;
}

export default ({
  addressModal,
  setAddressModal,
  setTradeLocation,
}: LayoutProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const onClickSetValue = () => {
    inputRef.current && setValue(inputRef.current.value); // && 연산자 사용해서 type narrowing. 앞이 거짓이면 앞에서 끝, 앞이 참이어야 뒤까지 가므로 if문 대신 사용
  };

  return (
    <div
      className={`${
        addressModal ? "block" : "hidden"
      } z-50 w-full h-full fixed top-0 left-0 bg-black/60 flex justify-center items-center`}
      onClick={() => setAddressModal(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[30rem] bg-white rounded-[2px]"
      >
        <div className=" leading-[4.5rem] text-[1.5rem] mx-[1.5rem] border-b-[2px] border-[#1e1d29] font-medium flex items-center justify-between">
          주소검색
          <button
            onClick={() => setAddressModal(false)}
            className="bg-center bg-no-repeat bg-[length:20px_20px] bg-[url('/icons/address_search_modal_x.svg')] w-[2rem] h-[3rem]"
          ></button>
        </div>
        <div className="p-[1.5rem] box-border	relative">
          <input
            className="px-[1rem] border-[1px] border-[#c3c2cc] w-full h-[3.5rem] focus-visible:outline-0 focus:border-[#1e1d29]"
            placeholder="동(읍/면/리) 입력해주세요."
            ref={inputRef}
          />
          <button
            onClick={onClickSetValue}
            className="absolute right-[2rem] top-[50%] translate-y-[-50%] bg-center bg-no-repeat bg-[length:20px_20px] bg-[url('/icons/address_search_modal_search.svg')] w-[2rem] h-[3rem] p-[0.5rem]"
          ></button>
        </div>

        {value ? (
          <div className="py-[0.5rem] h-[20rem] overflow-y-auto mt-[-1rem] list-none">
            <li className="h-[3rem] px-[1rem]">
              <button
                onClick={() => {
                  setTradeLocation(`${value} 제1동`);
                  setAddressModal(false);
                }}
                className="px-[1.5rem]"
              >
                {value} 제1동
              </button>
            </li>
            <li className="h-[3rem] px-[1rem]">
              <button
                onClick={() => {
                  setTradeLocation(`${value} 제2동`);
                  setAddressModal(false);
                }}
                className="px-[1.5rem]"
              >
                {value} 제2동
              </button>
            </li>
            <li className="h-[3rem] px-[1rem]">
              <button
                onClick={() => {
                  setTradeLocation(`${value} 제3동`);
                  setAddressModal(false);
                }}
                className="px-[1.5rem]"
              >
                {value} 제3동
              </button>
            </li>
            <li className="h-[3rem] px-[1rem]">
              <button
                onClick={() => {
                  setTradeLocation(`${value} 제4동`);
                  setAddressModal(false);
                }}
                className="px-[1.5rem]"
              >
                {value} 제4동
              </button>
            </li>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
