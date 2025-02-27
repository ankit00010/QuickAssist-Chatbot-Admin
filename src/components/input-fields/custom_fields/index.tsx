"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
interface CustomInputFieldProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string | number) => void;
  required?: boolean;
  errorMessage?: string;
  resetTrigger?: boolean;
  readonly?: boolean;
  textAreaHeight?: string;
  textAreaWidth?: string;
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  required = false,
  errorMessage = "",
  resetTrigger = false,
  readonly = false,
  textAreaHeight,
  textAreaWidth,
}) => {
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setTouched(false); // Reset touched when trigger changes
  }, [resetTrigger]);

  return (
    <div className="input-field-container">
      <label className="input-label">{label}</label>
      {type === "textarea" ? (
        <textarea
          className={`input-field ${
            touched && required && !value ? "input-error" : ""
          }`}
          style={{
            minHeight: `${textAreaHeight && textAreaHeight}`,
            minWidth: `${textAreaWidth && textAreaWidth}`,
          }}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
          required={required}
          readOnly={readonly}
        />
      ) : (
        <input
          className={`input-field ${
            touched && required && !value ? "input-error" : ""
          }`}
          placeholder={placeholder}
          value={value}
          onChange={(e) =>
            onChange(
              type === "number" ? Number(e.target.value) : e.target.value
            )
          }
          onBlur={() => setTouched(true)}
          required={required}
          readOnly={readonly}
        />
      )}
      {touched && required && !value && (
        <span className="error-text">{errorMessage}</span>
      )}
    </div>
  );
};

export default CustomInputField;
