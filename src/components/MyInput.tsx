import React from "react";
import { useState, Ref, ChangeEvent } from "react";
import { ReactNode } from "react";

interface MyInputProps {
  children?: ReactNode;
  placeholder?: string;
  textcenter?: string;
  onChange?: (val: string) => void;
  // ref: Ref<HTMLInputElement>; Typescript는 이렇게 하면 되긴 하는데 이렇게 하지말고
}

// 지금 내가 어떤거 한지 알겠어? 음... 알겠어.
// 그럼 이제 MyInput에 index에? onChange를 달면 거기서 입력값을 인자로 받을 수 있겠지?
const MyInput = (props: MyInputProps) => {
  const onChangeInputHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) props.onChange(evt.target.value);
  };

  const { children, placeholder, textcenter } = props;
  return (
    <div className="field">
      <label>
        <input
          onChange={onChangeInputHandler}
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
