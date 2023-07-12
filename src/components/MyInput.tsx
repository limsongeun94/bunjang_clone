import React from "react";
import { useState, Ref, ChangeEvent } from "react";
import { ReactNode } from "react";

interface MyInputProps {
  children?: ReactNode;
  placeholder?: string;
  textcenter?: string;
  onChange: (value: string) => void;
  maxlenght?: number;
}

// 지금 내가 어떤거 한지 알겠어? 음... 알겠어.
// 그럼 이제 MyInput에 index에? onChange를 달면 거기서 입력값을 인자로 받을 수 있겠지?
const MyInput = (props: MyInputProps) => {
  const { children, placeholder, textcenter, maxlenght, onChange } = props;
  const onchangehandler = (value: string): void => {
    onChange(value);
  };
  return (
    <div className="field">
      <label>
        <input
          className={`${textcenter} field_input`}
          type="text"
          placeholder={placeholder}
          maxLength={maxlenght}
          onChange={(e) => onchangehandler(e.target.value)}
        />
        <p>{children}</p>
      </label>
    </div>
  );
};
export default MyInput;
