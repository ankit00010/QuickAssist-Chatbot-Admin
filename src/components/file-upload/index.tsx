import React, { useRef } from "react";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
      onFileSelect(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Manually open file picker
    }
  };

  return (
    <div className="upload-btn">
      <input
        ref={fileInputRef}
        type="file"
        accept=".xls,.xlsx"
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple={false} // Prevent multiple files
      />
      <button type="button" className="upload-button" onClick={handleButtonClick}>
        Upload File
      </button>
    </div>
  );
};

export default FileUpload;
