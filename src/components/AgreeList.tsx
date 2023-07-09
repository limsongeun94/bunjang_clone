import { useState } from "react";
import { Agree } from "@/interface/index";
import MyCheckbox from "./MyCheckbox";

interface LayoutProps {
  accordionArr: Agree[];
}

const AgreeList = ({ accordionArr }: LayoutProps) => {
  const [allAgree, setAllAgree] = useState(false);

  const [agree, setAgree] = useState(false);

  const [accordion, setAccordion] = useState(false);

  return (
    <div>
      <button
        onClick={() => setAllAgree(!allAgree)}
        className={`flex justify-start items-center ${
          allAgree ? "border-[#d80c18]" : "#e5e5e5"
        } border-[1.4px] rounded-[5px] w-full px-[16px] py-[1rem] text-sm font-bold`}
      >
        <svg
          className="mr-[16px] mt-[2px]"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm5.056 6.275a.9.9 0 0 0-1.18.099l-5.17 5.332-2.704-2.787-.09-.082a.9.9 0 0 0-1.202 1.335l3.35 3.454.092.084a.9.9 0 0 0 1.2-.084l5.817-6 .079-.093a.9.9 0 0 0-.099-1.18z"
            fill={allAgree ? "#d80c18" : "#e5e5e5"}
            fill-rule="evenodd"
          ></path>
        </svg>
        <span>전체동의</span>
      </button>
      {accordionArr.map((el) => {
        return (
          <MyCheckbox title={el.title} contents={el.contents} id={el.id} />
        );
      })}
    </div>
  );
};

export default AgreeList;
