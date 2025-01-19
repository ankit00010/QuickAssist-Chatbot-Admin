"use client";

import  CancelIcon  from "@/public/icons/cancel.svg";
import "./style.css";
import {
  ChangeEvent,
  FunctionComponent,
  useState,
} from "react";

interface CustomFieldProps {
  id?: string;
  clear?: boolean;
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  readonly?: boolean;
  error?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClearField?: (id: string) => void;
  backgroundColor?: boolean;
}

const CustomField: FunctionComponent<CustomFieldProps> = ({
  id = "",
  clear = false,
  label = "Value",
  type = "text",
  placeholder = "Enter your value",
  value = "",
  readonly = false,
  error = "",
  onChange = () => {},
  onClearField = () => {},
  backgroundColor = false,
}) => {
  const [isEmpty, setIsEmpty] = useState(value.length === 0 ? true : false);
  const [isFocus, setIsFocus] = useState(value.length === 0 ? false : true);

  const onFieldFocus = () => {
    if (isEmpty === true) setIsFocus(true);
  };

  const onFieldBlur = () => {
    if (isEmpty === true) setIsFocus(false);
  };

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);

    if (event.target.value.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      setIsFocus(true);
    }
  };

  const clearField = () => {
    setIsEmpty(true);
    setIsFocus(false);
    onClearField(id);
  };

  return (
    <div className="custom-field">
      <label
        className={
          backgroundColor
            ? `custom-field-label visible-for-login ${isFocus && "focus"}`
            : `custom-field-label ${isFocus && "focus"}`
        }
      >
        {label}
      </label>
      <input
        id={id}
        className={
          backgroundColor ? "custom-text-field with-bg" : "custom-text-field"
        }
        type={type}
        placeholder={placeholder}
        onFocus={onFieldFocus}
        onBlur={onFieldBlur}
        onChange={onFieldChange}
        value={value}
        readOnly={readonly}
      />
      {clear && (
        <span
          id={`${id}-close`}
          onClick={clearField}
          className="custom-field-close"
        >
          <CancelIcon />
        </span>
      )}
      <div
        className={`custom-field-error-message ${
          error.length !== 0 && "custom-field-error-display"
        }`}
      >
        {/* <CircleExclamation /> */}
        {error}
      </div>
    </div>
  );
};

export default CustomField;
