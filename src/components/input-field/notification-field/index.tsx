import "./style.css";
import { FunctionComponent } from "react";

interface NotificationFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  word_limit?: number;
}

const NotificationField: FunctionComponent<NotificationFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  word_limit = undefined,
}) => {
  return (
    <div className="notification-field">
      <div className="notification-field-title">
        <label className="notification-field-title-label">{label}</label>
        {word_limit && (
          <span className="notification-field-title-word-limit">
            {value.length}/{word_limit}
          </span>
        )}
      </div>
      <input
        type="text"
        className="notification-field-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={word_limit}
      />
    </div>
  );
};

export default NotificationField;