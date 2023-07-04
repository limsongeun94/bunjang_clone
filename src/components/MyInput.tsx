import { ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode;
  placeholder?: string;
  textcenter?: string;
}

const MyInput = ({ children, placeholder, textcenter }: LayoutProps) => {
  return (
    <div className="field">
      <label>
        <input
          className={`${textcenter} field_input`}
          type="text"
          placeholder={placeholder}
        />
        <p>{children}</p>
      </label>
    </div>
  );
};
export default MyInput;
