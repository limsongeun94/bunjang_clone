import { useState } from "react";
import MyInput from "@/components/MyInput";
import MySelectbox from "@/components/MySelectbox";
import MyCheckbox from "@/components/MyCheckbox";
import { SelectBox, Agree } from "@/interface/index";

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

  const [accordionArr, setAccordionArr] = useState<Agree[]>([
    {
      id: "isTermsAgreed",
      title: "번개장터 이용약관 (필수)",
      contents: "번개장터 이용약관",
      agree: false,
    },
    {
      id: "isCollectionPrivacyPolicyAgreed",
      title: "개인정보 수집 이용 동의 (필수)",
      contents: "개인정보 수집 이용 동의",
      agree: false,
    },
    {
      id: "isPhoneIdentificationAgreed",
      title: "휴대폰 본인확인서비스 (필수)",
      agree: false,
    },
    {
      id: "isPrivacyArchivingAgreed",
      title: "휴대폰 개인정보 분리보관 동의 (필수)",
      contents: "휴대폰 개인정보 분리보관 동의",
      agree: false,
    },
    {
      id: "isLocationInfoAgreed",
      title: "위치정보 이용약관 동의 (필수)",
      contents: "위치정보 이용약관 동의",
      agree: false,
    },
    {
      id: "isPrivacyAgreed",
      title: "개인정보 수집 이용 동의 (선택)",
      contents: "개인정보 수집 이용 동의",
      agree: false,
    },
    {
      id: "isEventAgreed",
      title: "마케팅 수신 동의 (선택)",
      contents: "이메일, SMS, PUSH 수신 동의",
      agree: false,
    },
    {
      id: "isAdUtilizationAgreed",
      title: "개인정보 광고 활용 동의 (선택)",
      contents: "개인정보 광고 활용 동의",
      agree: false,
    },
  ]);

  const [allAgree, setAllAgree] = useState(false);

  const [agree, setAgree] = useState(false);

  const [accordion, setAccordion] = useState(false);

  const handleAllAgree = () => {
    // 전체동의 버튼 제어
    setAllAgree(!allAgree);
    if (!allAgree) {
      const copy_allAgree = accordionArr.map((el) => {
        el.agree = true;
        return el;
      });
      setAccordionArr(copy_allAgree);
    } else {
      const copy_allAgree = accordionArr.map((el) => {
        el.agree = false;
        return el;
      });
      setAccordionArr(copy_allAgree);
    }
  };

  const handleAgreeCheck = (value: string): void => {
    // 각각 체크박스 제어
    const i = accordionArr.findIndex((el) => el.id == value);
    accordionArr[i].agree = !accordionArr[i].agree;
    setAccordionArr([...accordionArr]);
  };

  // accordionArr의 agree가 false가 있는지 체크
  // => true이면(false가 있으면) setAllAgree false
  // => false이면(false가 없으면 == true만 있으면) setAllAgree true
  const 아이름못짓겠다 = (): void => {
    const condition = accordionArr.some((el) => el.agree === false);
    if (condition) {
      setAllAgree(false);
    } else {
      setAllAgree(true);
    }
  };

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
          <button
            onClick={handleAllAgree}
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
                fillRule="evenodd"
              ></path>
            </svg>
            <span>전체동의</span>
          </button>
          <MyCheckbox
            accordionArr={accordionArr}
            handleAgreeCheck={handleAgreeCheck}
            아이름못짓겠다={아이름못짓겠다}
            index={0}
          />
          <MyCheckbox
            accordionArr={accordionArr}
            handleAgreeCheck={handleAgreeCheck}
            아이름못짓겠다={아이름못짓겠다}
            index={1}
          />
          <MyCheckbox
            accordionArr={accordionArr}
            handleAgreeCheck={handleAgreeCheck}
            아이름못짓겠다={아이름못짓겠다}
            index={2}
          />
          <MyCheckbox
            accordionArr={accordionArr}
            handleAgreeCheck={handleAgreeCheck}
            아이름못짓겠다={아이름못짓겠다}
            index={3}
          />
          <MyCheckbox
            accordionArr={accordionArr}
            handleAgreeCheck={handleAgreeCheck}
            아이름못짓겠다={아이름못짓겠다}
            index={4}
          />
          <MyCheckbox
            accordionArr={accordionArr}
            handleAgreeCheck={handleAgreeCheck}
            아이름못짓겠다={아이름못짓겠다}
            index={5}
          />
          <MyCheckbox
            accordionArr={accordionArr}
            handleAgreeCheck={handleAgreeCheck}
            아이름못짓겠다={아이름못짓겠다}
            index={6}
          />
          <MyCheckbox
            accordionArr={accordionArr}
            handleAgreeCheck={handleAgreeCheck}
            아이름못짓겠다={아이름못짓겠다}
            index={7}
          />
        </div>
      </div>
    </div>
  );
};
