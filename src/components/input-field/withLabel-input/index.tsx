"use client";
import { FC, ChangeEvent } from "react";
import "./style.css";

interface WithLabelInputFieldProps {
  id?: string;
  value?: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  placeholder?: string;
  type?: string;
  error?: string;
  view_only?: boolean;
  label: string;
  className?: string; // Changed from `class` to `className`
}

const WithLabelInputField: FC<WithLabelInputFieldProps> = ({
  id = "",
  placeholder = "Enter a value",
  value = "",
  error = "",
  view_only = false,
  type = "text",
  label,
  onChange,
  className // Changed from `class` to `className`
}) => {
  return (
    <div className={`with-label-main-section ${className || ""}`}> 
      <label htmlFor={id} className="with-label-label-text">
        {label}
      </label>
      <input
        id={id}
        className={`with-label-input-field ${view_only ? "disabled" : ""}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={view_only}
        // onChange={onChange}
      />
      {error && <p className="with-label-error-text">{error}</p>}
    </div>
  );
};

export default WithLabelInputField;
