const Header = () => {
  return (
    <header>
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
          <div className="text-[13px] px-[15px]">로그아웃</div>
          <div className="text-[13px] px-[15px]">알림</div>
          <div className="text-[13px] px-[15px]">내 상점</div>
        </div>
      </div>
      <div className="pt-[30px]">
        <div className="flex h-[40px] justify-between items-center">
          <img src="/logo.svg" />
          <div className="border-2 border-[#F72F33] px-[15px] w-[460px] h-[40px] flex justify-between items-center">
            <input
              className="outline-none h-[16px] w-full"
              placeholder="상품명, 지역명, @상점명 입력"
            />
            <img src="/icons/icon_search.png" />
          </div>
          <div className="flex h-[26px]">
            <div className="flex ml-[30px]">
              <img className="mr-[5px] " src="/icons/icon_resell.png" />
              <div>판매하기</div>
            </div>
            <div className="flex ml-[30px] relative">
              <div className="after-bar" />
              <img className="mr-[5px]" src="/icons/icon_my_shop.png" />
              <div>내상점</div>
            </div>
            <div className="flex ml-[30px] relative">
              <div className="after-bar" />
              <img className="mr-[5px]" src="/icons/icon_talk.png" />
              <div>번개톡</div>
            </div>
          </div>
        </div>
        <div className="h-[70px]" />
      </div>
    </header>
  );
};
export default Header;
