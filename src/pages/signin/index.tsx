import { useState, useEffect } from "react";
import MyInput from "@/components/MyInput";

export default () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const [activeBtnClass, setActiveBtnClass] = useState(false);

  useEffect(() => {
    if (info.email !== "" && info.password !== "") {
      setActiveBtnClass(true);
    }
  }, [info]);

  return (
    <div className="bg-[#f9f9f9] py-[100px]">
      <form
        action="/api/login"
        method="POST"
        className="bg-white m-auto w-[450px] p-[60px] rounded-md shadow-[0px_3px_6px_rgba(0,0,0,0.1)] box-content"
      >
        <h1 className="font-black text-3xl text-[#3f3f3f] mb-[45px]">
          로그인 정보를 입력해주세요
        </h1>
        <MyInput
          placeholder={"예시: bunjang@gmail.com"}
          inputType={"text"}
          name={"email"}
          onChange={(value: string): void => {
            setInfo({ ...info, email: value });
          }}
        >
          이메일
        </MyInput>
        <MyInput
          placeholder={"예시: psword098!!"}
          inputType={"password"}
          name={"password"}
          onChange={(value: string): void => {
            setInfo({ ...info, password: value });
          }}
        >
          비밀번호
        </MyInput>
        <button
          type="submit"
          disabled={activeBtnClass ? false : true}
          className={`${
            activeBtnClass ? "" : "opacity-30 cursor-not-allowed"
          } bg-[#d80c18] w-full h-[72px] rounded-[6px] text-lg text-white text-center`}
        >
          제출
        </button>
      </form>
    </div>
  );
};
