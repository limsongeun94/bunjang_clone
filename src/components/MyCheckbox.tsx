import { Agree } from "@/interface/index";
import { useState } from "react";

interface LayoutProps {
  accordionArr: Agree[];
  setAccordionArr: React.Dispatch<React.SetStateAction<Agree[]>>;
  index: number;
  handleAgreeCheck: (value: string) => void;
}

const MyCheckbox = (props: LayoutProps) => {
  const { accordionArr, setAccordionArr, handleAgreeCheck, index } = props;

  const [accordion, setAccordion] = useState(false);
  return (
    <div className=" my-[20px] pl-[16px] pr-[11px] text-sm text-[#7f7f7f] font-medium">
      <div className="flex justify-between items-center">
        <div className="w-full">
          <label
            htmlFor={accordionArr[index].id}
            className="flex justify-start items-center relative pl-[36px] w-full"
          >
            <input
              id={accordionArr[index].id}
              type="checkbox"
              className="absolute top-0 left-[36px] opacity-0"
              defaultChecked={accordionArr[index].agree}
              onChange={() => handleAgreeCheck(accordionArr[index].id)}
            />
            <span>{accordionArr[index].title}</span>
            <svg
              className="absolute top-0 left-0"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.326 16.674a.897.897 0 0 0 1.273 0L18.737 5.536a.9.9 0 1 0-1.273-1.272L6.963 14.765l-4.426-4.426a.9.9 0 1 0-1.273 1.273l5.062 5.062z"
                fill={`${accordionArr[index].agree ? "#d80c18" : "#e5e5e5"}`}
                fillRule="evenodd"
              ></path>
            </svg>
          </label>
        </div>
        <div
          onClick={() => {
            setAccordion(!accordion);
          }}
        >
          <svg
            className={`${
              accordion ? "" : "rotate-180"
            } transition-[transform] duration-300 ease-in delay-0`}
            width="14px"
            height="14px"
            viewBox="0 0 14 14"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            role="img"
          >
            <title>E311C035-759D-4EB5-BD86-939BB9992164</title>
            <g
              id="\uD68C\uC6D0\uAC00\uC785-\uAC00\uC774\uB4DC"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="\uD68C\uC6D0\uAC00\uC785-\uC57D\uAD00\uB3D9\uC758"
                transform="translate(-311.000000, -599.000000)"
                fill="#B2B2B2"
              >
                <g id="Group-10" transform="translate(0.000000, 383.000000)">
                  <g
                    id="\uC57D\uAD00s"
                    transform="translate(0.000000, 159.000000)"
                  >
                    <g
                      id="Group-10"
                      transform="translate(52.000000, 54.000000)"
                    >
                      <g
                        id="Icon-(\uC544\uC774\uCF58)/-ic_chevron-down"
                        transform="translate(258.999772, 3.000000)"
                      >
                        <path
                          d="M12.7852383,3.68403 L6.91363834,9.53883 L1.07633834,3.68473 C0.83133834,3.43903 0.43233834,3.43763 0.18523834,3.68403 C-0.0611616599,3.92973 -0.0618616599,4.32873 0.18383834,4.57513 L6.46633834,10.87513 C6.58463834,10.99343 6.74423834,11.05993 6.91153834,11.05993 L6.91223834,11.05993 C7.07953834,11.05993 7.23913834,10.99413 7.35743834,10.87583 L13.6749383,4.57583 C13.9213383,4.33013 13.9220383,3.93183 13.6763383,3.68473 C13.4313383,3.43903 13.0323383,3.43763 12.7852383,3.68403"
                          id="Fill-1"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div
        className={`${
          accordion
            ? "max-h-[2.25rem] overflow-hidden pt-[18px]"
            : "max-h-0 overflow-hidden"
        } transition-[all] duration-700  delay-0 pl-[36px] `}
      >
        {accordionArr[index].contents}
      </div>
    </div>
  );
};

export default MyCheckbox;
