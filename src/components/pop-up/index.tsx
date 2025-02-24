import React from "react";
import "./style.css";
interface PopupProps {
  message: string;
  confirmStatus?: string;
  handleStatus?: (status: boolean) => void;
  action1?: string;
  action2?: string;
}

const PopUp: React.FC<PopupProps> = ({
  message,
  confirmStatus,
  handleStatus,
  action1,
  action2,
}) => {
  return (
    <div className="popup-container">
      <div>
        <span className="popup-message">{message}</span>
      </div>

      {handleStatus && (
        <div className="popup-actions">
          <button onClick={() => handleStatus(true)}>{action1}</button>
          <button
            onClick={() => {
              handleStatus(false);
            }}
          >
            {action2}
          </button>
        </div>
      )}
    </div>
  );
};

export default PopUp;
