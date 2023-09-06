import { useEffect, useState } from "react";

interface LayoutProps {
  imgModal: boolean;
  setImgModal: React.Dispatch<React.SetStateAction<boolean>>;
  img_arr: string[];
}

const BigImgModal = ({ imgModal, setImgModal, img_arr }: LayoutProps) => {
  const [imgIndex, setImgIndex] = useState(0);
  return (
    <div
      className={`${
        imgModal ? "block" : "hidden"
      } z-50 w-full h-full fixed top-0 left-0 bg-black/90 flex flex-col justify-center`}
      onClick={() => setImgModal(false)}
    >
      <div className="absolute top-[40px] right-[40px] cursor-pointer">
        <img src="/icons/icon_close.png" />
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ marginLeft: `calc((50% - 275px) - ${imgIndex * 570}px)` }}
        className={`flex overflow-hidden mt-[100px]`}
      >
        {img_arr.map((el, i) => {
          return (
            <div
              key={i}
              onClick={() => setImgIndex(i)}
              className="cursor-pointer big_img_div grow-0 shrink-0 basis-[550px] "
            >
              <img className="w-full h-full object-cover" src={el} />
            </div>
          );
        })}
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex my-[40px] mx-auto"
      >
        {img_arr.map((el, i) => {
          return (
            <div
              onClick={() => setImgIndex(i)}
              className={`cursor-pointer w-[15px] h-[15px] mx-[2px] after:content-[''] relative after:w-[9px] after:h-[9px] after:rounded-[50%] ${
                i === imgIndex ? "after:bg-white" : "after:bg-white/40"
              }  after:absolute after:top-[3px] after:left-[3px]`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BigImgModal;
