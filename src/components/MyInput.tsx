import React from "react";
import { useState, Ref, ChangeEvent } from "react";
import { ReactNode } from "react";

interface MyInputProps {
  children?: ReactNode;
  placeholder?: string;
  textcenter?: string;
  maxlenght?: number;
  inputType: string;
  onChange?: (val: string) => void;
  name?: string;
}

const MyInput = (props: MyInputProps) => {
  const {
    children,
    placeholder,
    textcenter,
    maxlenght,
    inputType,
    onChange,
    name,
  } = props;
  const onchangehandler = (value: string): void => {
    if (onChange) {
      onChange(value);
    }
  };

  const setMaxLength = (e: ChangeEvent<HTMLInputElement>) => {
    if (maxlenght) {
      if (e.target.value.length > e.target.maxLength) {
        e.target.value = e.target.value.slice(0, e.target.maxLength);
      }
    }
  };

  return (
    <div className="field">
      <label>
        <input
          name={name}
          className={`${textcenter} field_input`}
          type={inputType}
          placeholder={placeholder}
          maxLength={maxlenght}
          onChange={(e) => onchangehandler(e.target.value)}
          onInput={(e: ChangeEvent<HTMLInputElement>) => setMaxLength(e)}
        />
        <p>{children}</p>
      </label>
    </div>
  );
};
export default MyInput;
