import React, { useState } from "react";
import CustomButton from "../buttons";
import CustomInputField from "../input-fields/custom_fields";
import "./style.css";

const ModuleBody = () => {
  const [details, setDetails] = useState({
    total_questions: 0,
    user_Id: "",
    limit: 0,
    assigned_questions: 0,
  });

  // const [isDownload, setIsDownload] = useState(false);

  const handleChange = (field: string, value: string | number) => {
    setDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="modulebody-container">
      {/* Section 1: Question & User Info */}
      <div className="modulebody-part1">
        <div className="info-box">
          <p>Total Questions:</p>
          <span>{details.total_questions}</span>
        </div>

        <div className="input-group">
          <label>Enter User ID:</label>
          <CustomInputField
            value={details.user_Id}
            onChange={(value) => handleChange("user_Id", value)}
          />
        </div>

        <div className="input-group">
          <label>Total Questions to Train:</label>
          <CustomInputField
            value={details.limit}
            onChange={(value) => handleChange("limit", value)}
          />
        </div>

        <div className="info-box">
          <p>Assigned Questions:</p>
          <span>{details.assigned_questions}</span>
        </div>
        <div className="upload-btn">

        <CustomButton text="Upload" variant="success" />
        </div>
      </div>

      {/* Section 2: Action Buttons */}
      <div className="modulebody-part2">
        {details.user_Id !== "" && details.limit !== 0 && details.limit && (
          <CustomButton text="Submit" variant="primary" />
        )}
        {/* {isDownload && <CustomButton text="Download" variant="secondary" />} */}
        {details.assigned_questions !== 0 && (
          <CustomButton text="Delete" variant="danger" />
        )}
      </div>
    </div>
  );
};

export default ModuleBody;
