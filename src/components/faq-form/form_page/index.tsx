"use client";
import CustomInputField from "@/components/input-fields/custom_fields";
import { AdminContext, AdminContextType } from "@/context/admin_context";
import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import CustomButton from "@/components/buttons";
import { useRouter } from "next/navigation";
import { FAQsDataType } from "@/types/faqs_data_type";
interface FormPageProps {
  id?: string;
  buttonText: string;
  values?: string;
}

const FaqFormPage: React.FC<FormPageProps> = ({ id, buttonText, values }) => {
  const { faqs, setFaqs, addFAQS, faqData, editAPI } = useContext(
    AdminContext
  ) as AdminContextType;
  const router = useRouter();
  // const [loading, setLoading] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);
  // const handleInputChange = (field: string, value: string | number) => {
  //   setFaqs({ ...faqs, [field]: value });
  // };

  const handleInputChange = (field: keyof FAQsDataType[0], value: string) => {
    setFaqs((prevFaqs) => {
      // Ensure `prevFaqs` is always an array
      const updatedFaqs =
        Array.isArray(prevFaqs) && prevFaqs.length > 0
          ? [...prevFaqs]
          : [{ question: "", answer: "", context: "", keywords: "" }];

      // Modify the first object safely
      updatedFaqs[0] = {
        ...updatedFaqs[0],
        [field]: value,
      };

      return updatedFaqs;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents page reload

    // setLoading(true);

    // Determine whether to edit or add new FAQ
    if (values === "edit" && id) {
      await editAPI(id);
    } else {
      await addFAQS();
    }

    // setLoading(false);

    // Reset the form fields and trigger any required state updates
    setFaqs([{ question: "", answer: "", context: "", keywords: "" }]);
    setResetTrigger((prev) => !prev);
  };

  const resetFaqForm = () => {
    setFaqs([
      {
        question: "",
        answer: "",
        context: "",
        keywords: "",
      },
    ]);
    setResetTrigger((prev) => !prev);
  };
  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    resetFaqForm();
  };

  useEffect(() => {
    if (id) {
      const result = faqData.find((item) => item.faq_id === id);

      if (!result) {
        alert("Something Went Wrong While Fetching the Data");
        return router.push("/faqs");
      }

      setFaqs([
        {
          question: result.question || "",
          answer: result.answer || "",
          context: result.context || "",
          keywords: Array.isArray(result.keywords)
            ? result.keywords.join(", ")
            : result.keywords || "",
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div className="faq-form-container">
      <form onSubmit={handleSubmit}>
        <CustomInputField
          label="Question"
          type="text"
          placeholder="Enter Your Question"
          value={faqs[0]?.question || ""}
          onChange={(value) => handleInputChange("question", String(value))}
          required
          errorMessage="Question is required"
          resetTrigger={resetTrigger}
        />
        <CustomInputField
          label="Answer"
          type="textarea"
          placeholder="Enter the answer"
          value={faqs[0]?.answer || ""}
          onChange={(value) => handleInputChange("answer", String(value))}
          required
          errorMessage="Answer is required"
          resetTrigger={resetTrigger}
        />

        <CustomInputField
          label="Keywords"
          type="textarea"
          placeholder="Enter related keywords (comma-separated)"
          value={faqs[0]?.keywords || ""}
          onChange={(value) => handleInputChange("keywords", String(value))}
          required
          errorMessage="Keywords is required"
          resetTrigger={resetTrigger}
        />

        <CustomInputField
          label="Context"
          type="text"
          placeholder="Context of the FAQ"
          value={faqs[0]?.context || ""}
          onChange={(value) => handleInputChange("context", String(value))}
          required
          errorMessage="Context is required"
          resetTrigger={resetTrigger}
        />
        <div className="button-container">
          <CustomButton text={buttonText} variant="primary" />
          <CustomButton
            text="Clear All"
            variant="primary"
            type="reset"
            onClick={(e) => handleReset(e)}
          />
        </div>
      </form>
    </div>
  );
};

export default FaqFormPage;
