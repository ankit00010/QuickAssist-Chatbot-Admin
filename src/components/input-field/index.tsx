"use client";
import { FC, ChangeEvent } from "react";
import "./style.css";

interface InputFieldProps {
  id?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  view_only?: boolean;
}

const InputField: FC<InputFieldProps> = ({
  id = "",
  placeholder ,
  value = "",
  error = "",
  onChange,
  view_only = false,
  type = "text",
}) => {
  return (
    <div className="input-field-container">
      <input
        id={id}
        className={`input-field ${view_only ? "disabled" : ""}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={view_only}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default InputField;
