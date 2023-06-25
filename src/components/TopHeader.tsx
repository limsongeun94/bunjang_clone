const TopHeader = () => {
  return (
    <header className=" bg-white h-auto">
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
    </header>
  );
};
export default TopHeader;