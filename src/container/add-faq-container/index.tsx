"use client";
import WithLabelInputField from "@/components/input-field/withLabel-input";
import { AddFaqsType } from "@/types/add_faqs";
import React, { useState } from "react";
import "./style.css";

const AddFaqContainer = () => {
  const [faq, setFaq] = useState<AddFaqsType>({
    question: "",
    answer: "",
    keywords: [],
    context: "",
  });
  const [temp, setTemp] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(faq);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFaq((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [errors, setErrors] = useState<{
    question?: string;
    answer?: string;
    keywords?: string;
    context?: string;
  }>({});

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (temp.trim() !== "") {
      setFaq({
        ...faq,
        keywords: [...faq.keywords, temp],
      });
      setTemp("");
    }
  };

  const clearAll = () => {
    setFaq({
      question: "",
      answer: "",
      keywords: [],
      context: "",
    });
  };

  return (
    <div className="right_body">
      <div className="content">
        <h1 className="title">Add Faqs</h1>
        <span className="line">
          __________________________________________________________________________________________________________________________
        </span>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <p>Question</p>
              <WithLabelInputField
                placeholder="Enter Question"
                value={faq.question}
                name="question"
                id="faq.question"
                onChange={handleChange}
                error={errors.question}
              />
            </div>
            <div className="input-box">
              <p>Answer</p>
              <WithLabelInputField
                placeholder="Enter Answer"
                name="answer"
                value={faq.answer}
                onChange={handleChange}
                error={errors.answer}
              />
            </div>

            <div className="input-box-2-container input-box">
              <p>Keywords</p>
              <input
                type="text"
                name="temp"
                className="input-box-temp"
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                placeholder="Enter Keywords"
              />
              <button className="add-button" onClick={handleAddClick}>
                +
              </button>
            </div>

            <div className="keywords-list">
              {faq.keywords.map((item, index) => (
                <span key={index} className="keywords-item">
                  {item}
                </span>
              ))}
            </div>

            <div className="input-box">
              <p>Context</p>
              <WithLabelInputField
                placeholder="Enter Context"
                value={faq.context}
                onChange={handleChange}
                error={errors.context}
                name="context"
              />
            </div>

            <div className="form-submit-container">
              <button type="submit" className="submit-btn">
                Submit
              </button>
              <button className="clear-button" onClick={clearAll}>
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFaqContainer;
