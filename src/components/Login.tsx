const Login = () => {
  return (
    <div className="z-50 w-full h-full fixed top-0 left-0 bg-black/60 flex justify-center items-center">
      <div className="bg-[#f7f7f7] w-[420px] h-[506px] relative">
        <button className="absolute right-[20px] top-[20px] w-[24px] h-[24px]">
          <img src="/icons/icon_close.png" width="24px" />
        </button>
        <div className="text-center pt-[40px]">
          <img
            className="mx-auto mb-[10px]"
            src="/icons/icon_app_download.svg"
            width="30px"
          />
          <div className="text-xl">번개장터로 중고거래 시작하기</div>
          <div>간편하게 가입하고 상품을 확인하세요</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
