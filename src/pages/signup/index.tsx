import MyInput from "@/components/MyInput";
import MySelectbox from "@/components/MySelectbox";
import AgreeList from "@/components/AgreeList";
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

  const accordionArr: Agree[] = [
    {
      title: "번개장터 이용약관 (필수)",
      contents: "번개장터 이용약관",
    },
    {
      title: "개인정보 수집 이용 동의 (필수)",
      contents: "개인정보 수집 이용 동의",
    },
    {
      title: "휴대폰 본인확인서비스 (필수)",
    },
    {
      title: "휴대폰 개인정보 분리보관 동의 (필수)",
      contents: "휴대폰 개인정보 분리보관 동의",
    },
    {
      title: "위치정보 이용약관 동의 (필수)",
      contents: "위치정보 이용약관 동의",
    },
    {
      title: "개인정보 수집 이용 동의 (선택)",
      contents: "개인정보 수집 이용 동의",
    },
    {
      title: "마케팅 수신 동의 (선택)",
      contents: "이메일, SMS, PUSH 수신 동의",
    },
    {
      title: "개인정보 광고 활용 동의 (선택)",
      contents: "개인정보 광고 활용 동의",
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
        <AgreeList accordionArr={accordionArr} />
      </div>
    </div>
  );
};
