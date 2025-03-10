import React, { useContext, useState } from "react";
import CustomButton from "../buttons";
import CustomInputField from "../input-fields/custom_fields";
import "./style.css";
import { AdminContext, AdminContextType } from "@/context/admin_context";
import FileUpload from "../file-upload";
import * as XLSX from "xlsx";
const ModuleBody = () => {
  const {
    getQuestionsData,
    details,
    setDetails,
    deletePreviousQuestions,
    trainingData,
    dashboard,
  } = useContext(AdminContext) as AdminContextType;

  const [isDownload, setIsDownload] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const handleChange = (field: string, value: string | number) => {
    setDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleFileUpload = (file: File | null) => {
    setUploadedFile(file);
    console.log("File uploaded:", file);
  };
  const handleSubmitBtn = async (limit: number, id: string) => {
    const result = await getQuestionsData(limit, id);
    if (result) {
      setIsDownload(true);
    } else {
      setIsDownload(false);
    }
  };

  const handleDeleteBtn = async () => {
    const result = await deletePreviousQuestions();

    if (result) {
      console.log("The previous questions are deleted");
    } else {
      console.log("The previous questions are NOT deleted");
    }
  };
  const handleDownloadButton = () => {
    const isDataValid =
      trainingData.length > 0 &&
      trainingData.every(
        (data) =>
          data.question.trim() !== "" &&
          data.question_id.trim() !== "" &&
          data.lockedBy.trim() !== ""
      );

    if (isDataValid) {
      //Formated the data into excel first
      const excelData = trainingData.map((data) => ({
        question: data.question,
        answer: "",
        keywords: "",
        context: "",
      }));

      //Created a worksheet where excel data is passed
      const worksheet = XLSX.utils.json_to_sheet(excelData);

      //Created a new workbook and appended the sheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Training Data");

      //Filename based on the user training it
      const filename = `TrainingData_By_${trainingData[0].lockedBy || "Admin"}.xlsx`;

      // Proceed with download
      XLSX.writeFile(workbook, filename);
    } else {
      // Handle invalid data
      alert("Something went wrong while downloading the file");
    }
  };
  return (
    <div className="modulebody-container">
      {/* Section 1: Question & User Info */}
      <div className="modulebody-part1">
        <div className="info-box">
          <p>Total Questions:</p>
          <span>{dashboard.totalUnAnsweredQuestions}</span>
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
          <FileUpload onFileSelect={handleFileUpload} />
          {uploadedFile && <p>File Selected: {uploadedFile.name}</p>}
        </div>
      </div>

      {/* Section 2: Action Buttons */}
      <div className="modulebody-part2">
        {details.user_Id !== "" && details.limit !== 0 && details.limit && (
          <CustomButton
            text="Submit"
            variant="primary"
            onClick={() => handleSubmitBtn(details.limit, details.user_Id)}
          />
        )}
        {isDownload && (
          <CustomButton
            onClick={() => handleDownloadButton()}
            text="Download"
            variant="secondary"
          />
        )}
        {details.assigned_questions !== 0 && (
          <CustomButton
            text="Delete"
            variant="danger"
            onClick={() => handleDeleteBtn()}
          />
        )}
      </div>
    </div>
  );
};

export default ModuleBody;
