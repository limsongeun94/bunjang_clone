import MyInput from "@/components/MyInput";

export default () => {
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
        <div className="floating-label">
          <select className="floating-select bottom-0 text-[100%] leading-[1.15] text-[#191919]">
            <option className="hidden" value="" />
            <option value="skt">SKT</option>
            <option value="kt">KT</option>
            <option value="lg">LG U+</option>
            <option value="skt_alddle">SKT 알뜰폰</option>
            <option value="kt_alddle">KT 알뜰폰</option>
            <option value="lg_alddle">LG U+ 알뜰폰</option>
          </select>
          <label>통신사</label>
        </div>
        {/* <MyInput>통신사</MyInput> */}
      </div>
    </div>
  );
};
