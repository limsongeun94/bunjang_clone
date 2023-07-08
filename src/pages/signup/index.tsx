import MyInput from "@/components/MyInput";
import MySelectbox from "@/components/MySelectbox";
import { useState } from "react";
import { SelectBox } from "@/interface/index";

export default () => {
  const selectArr: SelectBox[] = [
    {
      title: "SKT",
      value: "skt",
    },
    {
      title: "KT",
      value: "kt",
    },
    {
      title: "LG U+",
      value: "lg",
    },
    {
      title: "SKT 알뜰폰",
      value: "skt_alddle",
    },
    {
      title: "KT 알뜰폰",
      value: "kt_alddle",
    },
    {
      title: "LG U+ 알뜰폰",
      value: "lg_alddle",
    },
  ];

  return (
    <div className="bg-[#f9f9f9] py-[100px]">
      <div className="bg-white m-auto w-[450px] h-[927px] p-[60px] rounded-md shadow-[0px_3px_6px_rgba(0,0,0,0.1)] box-content">
        <h1 className="font-black text-3xl text-[#3f3f3f] mb-[45px]">
          본인 정보를 입력해주세요
        </h1>
        <MyInput placeholder={"예시: 홍길동"}>이름</MyInput>
        <div className="flex w-full items-baseline">
          <div className="w-[212px]">
            <MyInput placeholder={"예시: 900101"}>생년월일</MyInput>
          </div>
          —
          <div className="w-[212px] flex items-baseline">
            <div className="w-[34px]">
              <MyInput textcenter={"text-center"}></MyInput>
            </div>
            <div className="text-[#666666] tracking-[1px] text-lg">●●●●●●</div>
          </div>
        </div>
        <MyInput placeholder={"예시: 01012345678"}>휴대폰번호</MyInput>
        <MySelectbox selectArr={selectArr} />
        <div>
          <div className="flex justify-start items-center border-[1.4px] rounded-[5px] px-[16px] py-[1rem] ">
            <svg
              className="mr-[16px] mt-[2px]"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm5.056 6.275a.9.9 0 0 0-1.18.099l-5.17 5.332-2.704-2.787-.09-.082a.9.9 0 0 0-1.202 1.335l3.35 3.454.092.084a.9.9 0 0 0 1.2-.084l5.817-6 .079-.093a.9.9 0 0 0-.099-1.18z"
                fill="#e5e5e5"
                fill-rule="evenodd"
              ></path>
            </svg>
            <span>전체동의</span>
          </div>
        </div>
      </div>
    </div>
  );
};
