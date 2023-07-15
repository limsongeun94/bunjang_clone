import { useState, useEffect } from "react";

const FlotingMenu = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });

  console.log(innerWidth);

  return (
    <div
      className={`z-[-10] w-[90px] box-border leading-none fixed top-[102px] ${
        innerWidth > 1280
          ? "right-[calc(50%-617px)]"
          : "right-[calc(640px-617px)]"
      } `}
    >
      <div className="border-[#666666] border-[1px]  p-[10px] mb-[6px]">
        <div className="text-xs font-semibold text-[#666666] text-center mb-[8px]  leading-none">
          찜한상품
        </div>
        <div className="flex justify-center items-center">
          <img
            src="/icons/zzim_heart.png"
            width="9px"
            height="9px"
            className=" leading-none"
          />
          <span className="text-[#cccccc] text-xs font-semibold  leading-none">
            0
          </span>
        </div>
      </div>
      <div className="border-[#cccccc] border-[1px] p-[10px] mb-[6px]">
        <div className="text-xs font-semibold text-[#666666] text-center">
          최근본상품
        </div>
        <div className="text-xs font-semibold text-[#666666] text-center">
          ………
        </div>
      </div>
      <div className="border-[#e5e5e5] border-[1px] p-[10px] mb-[6px] text-[13px] font-semibold text-[#666666] text-center">
        TOP
      </div>
    </div>
  );
};
export default FlotingMenu;
