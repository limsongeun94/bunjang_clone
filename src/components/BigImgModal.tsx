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
      } z-50 w-full h-full fixed top-0 left-0 bg-black/90 flex justify-center items-center`}
      onClick={() => setImgModal(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ marginLeft: `calc((50% - 275px) - ${imgIndex * 570}px)` }}
        className={`flex overflow-hidden`}
      >
        {img_arr.map((el, i) => {
          return (
            <div
              key={i}
              onClick={() => setImgIndex(i)}
              className="big_img_div grow-0 shrink-0 basis-[550px] "
            >
              <img className="w-full h-full object-cover" src={el} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BigImgModal;
