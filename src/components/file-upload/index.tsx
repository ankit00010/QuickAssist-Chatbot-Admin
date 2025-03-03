import React, { useContext, useRef, useState } from "react";
import "./style.css";
import CustomButton from "../buttons";
import * as XLSX from "xlsx";
import { AdminContext, AdminContextType } from "@/context/admin_context";
import { SyncLoader } from "react-spinners";
import { FaqsTypeList } from "@/types/faq_type";
interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const { handleMultipleFaqs } = useContext(AdminContext) as AdminContextType;
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const handleUpload = () => {
    fileRef.current?.click();
  };
  const [excelData, setExcelData] = useState<Record<string, string>[]>([]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      console.log("Failed to receive file");
      return;
    }
    onFileSelect(file);

    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryString = e.target?.result;
      if (!binaryString) {
        console.error("Failed to get the binary string");
        return;
      }

      //Reading the excel file
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      //Converting to JSON with headers as keys

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (jsonData.length > 1) {
        const headers: string[] = jsonData[0] as string[];

        const rowsData: string[][] = jsonData.slice(1) as string[][];
        const rows = rowsData.map((row: string[]) => {
          return headers.reduce<Record<string, string>>((acc, key, index) => {
            acc[key] = row[index] ? String(row[index]) : "";
            return acc;
          }, {});
        });

        setExcelData(rows);

        // console.log("Extracted Data:", rows);
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setExcelData([]);
    onFileSelect(null);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const transformedFAQs: FaqsTypeList = excelData.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
      keywords: faq.keywords.split(",").map((kw) => kw.trim()),
      context: faq.context,
    }));

    setLoading(true);
    await handleMultipleFaqs(transformedFAQs);
    setLoading(false);

    handleReset(e);

    console.log("Excel Data result is ", transformedFAQs);
    return;
  };

  return (
    <div className="upload-btn-container">
      <input
        ref={fileRef}
        type="file"
        accept=".xls,.xlsx"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {!loading &&
        (excelData.length === 0 ? (
          <button className="file-upload-btn" onClick={handleUpload}>
            Upload File
          </button>
        ) : (
          <CustomButton type="submit" text="Submit" onClick={handleSubmit} />
        ))}
      
      {!loading && (
        <CustomButton type="reset" text="Clear File" onClick={handleReset} />
      )}
      <div style={{padding:"5px"}}>
        <SyncLoader loading={loading} size={10} color={"#258d8f"} />
      </div>
    </div>
  );
};

export default FileUpload;
