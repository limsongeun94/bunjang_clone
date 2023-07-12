import { ReactNode } from "react";
import { SelectBox } from "@/interface/index";
import { useState } from "react";

interface LayoutProps {
  children?: ReactNode;
  selectArr: SelectBox[];
  onChange: (value: string) => void;
}

const MySelectbox = ({ children, selectArr, onChange }: LayoutProps) => {
  const [floatingClass, setFloatingClass] = useState("");
  const changeFloatingClass = (value: string) => {
    if (value) {
      setFloatingClass("floating_label_selectbox");
    } else {
      setFloatingClass("");
    }
    onChange(value);
  };

  return (
    <div className="field">
      <label>
        <select
          onChange={(e) => changeFloatingClass(e.target.value)}
          className="field_input"
        >
          <option className="hidden" value="" />
          {selectArr.map((el, i) => {
            return (
              <option key={i} className="text-base" value={el.value}>
                {el.title}
              </option>
            );
          })}
        </select>
        <p className={`${floatingClass}`}>{children}</p>
      </label>
    </div>
  );
};

export default MySelectbox;
