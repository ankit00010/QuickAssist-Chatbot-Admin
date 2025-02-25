"use client";
import FaqFormPage from "@/components/faq-form/form_page";
import Title from "@/components/header/title";
import { BadgePlus } from "lucide-react";
import React from "react";


const AddFaqContainerProps = () => {
  return (
    <div>
      <Title
        header="ADD FAQs"
        context="Create and manage FAQs to assist users."
        icon={<BadgePlus size={30} />}
      />
      <FaqFormPage buttonText="Submit" />
    </div>
  );
};

export default AddFaqContainerProps;
