import type { ReactNode } from "react";
import { useEffect } from "react";

interface TestModalProps {
  show: boolean;
  children: ReactNode
  onClose?: () => void
}

const TestModal = ({ show, onClose, children }: TestModalProps) => {

  useEffect(() => {
    if (show) {
      document.body.style.cssText = `overflow: hidden`;
    } else {
      document.body.style.cssText = `overflow: auto`;
    }
    return () => {
      document.body.style.cssText = `overflow: auto`;
    };
  }, [show]);

  return (
    <div
      className={`${
        show ? "block" : "hidden"
      } z-50 w-full h-full fixed top-0 left-0 bg-black/60 flex justify-center items-center`}
    >
      {children}
      {/* <div className="bg-[#f7f7f7] w-[420px] h-[506px] relative">
        <button
          onClick={onClose}
          className="absolute right-[20px] top-[20px] w-[24px] h-[24px]"
        >
          <img src="/icons/icon_close.png" width="24px" />
        </button>
        { children }
      </div> */}
    </div>
  );
};

export default TestModal;
