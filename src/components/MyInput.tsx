import React from "react";
import { useState, Ref, ChangeEvent } from "react";
import { ReactNode } from "react";

interface MyInputProps {
  children?: ReactNode;
  placeholder?: string;
  textcenter?: string;
<<<<<<< HEAD
  inputType: string;
  onChange?: (val: string) => void;
  // ref: Ref<HTMLInputElement>; Typescript는 이렇게 하면 되긴 하는데 이렇게 하지말고
=======
  onChange: (value: string) => void;
  maxlenght?: number;
>>>>>>> e0a7431a4fa19e20fb501d8b537f1a7012d91823
}

// 지금 내가 어떤거 한지 알겠어? 음... 알겠어.
// 그럼 이제 MyInput에 index에? onChange를 달면 거기서 입력값을 인자로 받을 수 있겠지?
const MyInput = (props: MyInputProps) => {
  const { children, placeholder, textcenter, maxlenght, onChange } = props;
  const onchangehandler = (value: string): void => {
    onChange(value);
  };
<<<<<<< HEAD

  const { children, placeholder, textcenter, inputType } = props;
=======
>>>>>>> e0a7431a4fa19e20fb501d8b537f1a7012d91823
  return (
    <div className="field">
      <label>
        <input
          className={`${textcenter} field_input`}
          type={inputType}
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
