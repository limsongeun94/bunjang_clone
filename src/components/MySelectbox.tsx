import { ReactNode } from "react";
import { SelectBox } from "@/interface/index";
import { useState } from "react";

interface LayoutProps {
  children?: ReactNode;
  selectArr: SelectBox[];
}

const MySelectbox = ({ children, selectArr }: LayoutProps) => {
  const [floatingClass, setFloatingClass] = useState("");
  const changeFloatingClass = (value: string) => {
    if (value) {
      setFloatingClass("floating_label_selectbox");
      console.log(floatingClass);
    } else {
      setFloatingClass("");
      console.log(floatingClass);
    }
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
